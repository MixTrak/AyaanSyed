
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { amount, customerName, customerEmail } = body;

        if (!amount || !customerName || !customerEmail) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const apiKey = process.env.UROPAY_API_KEY;
        const secret = process.env.UROPAY_SECRET;
        const upiId = process.env.UROPAY_UPI_ID;

        if (!apiKey || !secret || !upiId) {
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        // Hash the secret using SHA-512
        const sha512 = crypto.createHash("sha512");
        sha512.update(secret);
        const hashedSecret = sha512.digest("hex");

        const merchantOrderId = `ORDER_${Date.now()}_${Math.floor(
            Math.random() * 1000
        )}`;

        // Amount should be in paise (e.g., 100 INR = 10000 paise)
        const amountInPaise = Math.round(parseFloat(amount) * 100);

        const payload = {
            vpa: upiId,
            vpaName: "Ayaan Syed", // You might want to make this configurable too
            amount: amountInPaise,
            merchantOrderId: merchantOrderId,
            customerName: customerName,
            customerEmail: customerEmail,
            transactionNote: "Buy Me A Coffee",
        };

        const response = await fetch("https://api.uropay.me/order/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-API-KEY": apiKey,
                Authorization: `Bearer ${hashedSecret}`,
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("UroPay API Error:", data);
            return NextResponse.json(
                { error: data.message || "Failed to generate order" },
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Internal Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

import mongoose from "mongoose";
import PaymentLog from "@/lib/models/PaymentLog";

const connectDB = async () => {
    if (mongoose.connections[0].readyState) return;
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
    } catch (error) {
        console.error("DB Connection Error:", error);
    }
};

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { uroPayOrderId, referenceNumber, amount, customerName, vpa } = body;

        if (!uroPayOrderId || !referenceNumber) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const apiKey = process.env.UROPAY_API_KEY;
        const secret = process.env.UROPAY_SECRET;

        if (!apiKey || !secret) {
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        const sha512 = crypto.createHash("sha512");
        sha512.update(secret);
        const hashedSecret = sha512.digest("hex");

        // Documentation inconsistency: Request Header says PATCH, Example says PUT.
        // Trying PATCH as it matches the endpoint definition.
        const response = await fetch("https://api.uropay.me/order/update", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-API-KEY": apiKey,
                Authorization: `Bearer ${hashedSecret}`,
            },
            body: JSON.stringify({
                uroPayOrderId,
                referenceNumber,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("UroPay Update Error:", data);
            return NextResponse.json(
                { error: data.message || "Failed to update order" },
                { status: response.status }
            );
        }

        // SIMULATE WEBHOOK FOR LOCALHOST / DIRECT LOGGING
        // Since localhost webhooks fail, we log the payment here if we have the details.
        // Even for production, this acts as a fallback or immediate confirmation.
        if (amount) { // Check if we have simulation data
            await connectDB();
            const existingLog = await PaymentLog.findOne({ referenceNumber });

            if (!existingLog) {
                await PaymentLog.create({
                    referenceNumber,
                    amount, // Frontend should send this as string or number? Model typicaly expects string or number. Let's check model.
                    // Assuming Model expects String or Number. Webhook sends String.
                    from: customerName || "Anonymous",
                    vpa: vpa || process.env.UROPAY_UPI_ID,
                    date: new Date(),
                });
                console.log("Payment Logged (Simulation):", referenceNumber);
            }
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Internal Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
