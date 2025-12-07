
import { NextResponse } from "next/server";
import crypto from "crypto";
import mongoose from "mongoose";
import PaymentLog from "@/lib/models/PaymentLog";

// Ensure DB connection
const connectDB = async () => {
    if (mongoose.connections[0].readyState) return;
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
    } catch (error) {
        console.error("DB Connection Error:", error);
    }
};

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const headers = req.headers;

        const signature = headers.get("x-uropay-signature");
        const secret = process.env.UROPAY_SECRET;

        if (!signature || !secret) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 1. Hash the secret with SHA-512
        const sha512 = crypto.createHash("sha512");
        sha512.update(secret);
        const hashedSecret = sha512.digest("hex");

        // 2. Sort the data keys
        // The documentation says: "transaction data". The body IS the transaction data + environment?
        // Wait, the doc says: Signature = HMAC-SHA-256(hashed-secret, JSON.stringify(transactionData + environment))
        // And "transaction data" is the JSON object received.
        // And header "X-Uropay-Environment" contains the environment string.

        // Let's look closer at the doc provided in uropay.txt:
        // "For consistent signature, the transaction data should be sorted before generating the signature. For example: const sortedData = Object.fromEntries( Object.entries(data).sort(([a], [b]) => a.localeCompare(b)) ); const payload = {...sortedData, environment: environment};"

        // So we need to:
        // 1. Take the body (data).
        // 2. Sort it.
        // 3. Add 'environment' key from header X-Uropay-Environment.
        // 4. JSON.stringify that combined object.
        // 5. Calculate HMAC-SHA-256 using hashedSecret.

        const environment = headers.get("x-uropay-environment");

        // Sort the body keys
        const sortedData = Object.fromEntries(
            Object.entries(body).sort(([a], [b]) => a.localeCompare(b))
        );

        const payloadToSign = { ...sortedData, environment: environment };
        const stringifiedPayload = JSON.stringify(payloadToSign);

        const hmac = crypto.createHmac("sha256", hashedSecret);
        hmac.update(stringifiedPayload);
        const generatedSignature = hmac.digest("hex");

        if (generatedSignature !== signature) {
            console.error("Signature mismatch", { generated: generatedSignature, received: signature });
            // For debugging initially we might want to log this but return 200 to avoid blocking simple tests if signature logic is tricky. 
            // But for security, we should reject.
            // Given the complexity of exact stringify matching, debugging might be needed.
            // I'll assume exact match for now.
            return NextResponse.json({ error: "Invalid Signature" }, { status: 403 });
        }

        await connectDB();

        // Check if referenceNumber exists
        // Doc says: "referenceNumber to match the payment in your system"
        // And "webhook call will happen more than once".

        const existingLog = await PaymentLog.findOne({ referenceNumber: body.referenceNumber });
        if (!existingLog) {
            await PaymentLog.create({
                referenceNumber: body.referenceNumber,
                amount: body.amount,
                from: body.from,
                vpa: body.vpa,
                date: new Date(),
            });
            console.log("Payment Logged:", body.referenceNumber);
        } else {
            console.log("Payment already logged:", body.referenceNumber);
        }

        return NextResponse.json({ status: "success" });

    } catch (error) {
        console.error("Webhook Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
