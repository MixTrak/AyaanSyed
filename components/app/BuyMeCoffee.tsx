
"use client";

import { useState } from "react";
import { Coffee, X, QrCode, Smartphone, Loader2, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface OrderResponse {
    code: number;
    status: string;
    message: string;
    data?: {
        uroPayOrderId: string;
        orderStatus: string;
        upiString: string;
        qrCode: string;
        amountInRupees: string;
    };
    error?: string;
}

export default function BuyMeCoffee() {
    const [isOpen, setIsOpen] = useState(false);
    const [amount, setAmount] = useState("50");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [orderData, setOrderData] = useState<OrderResponse["data"] | null>(null);
    const [error, setError] = useState("");

    const presets = process.env.NEXT_PUBLIC_DONATION_PRESETS
        ? process.env.NEXT_PUBLIC_DONATION_PRESETS.split(",")
        : ["50", "100", "500"];

    const handlePay = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setOrderData(null);

        try {
            const res = await fetch("/api/uropay/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount,
                    customerName: name || "Anonymous Grateful User",
                    customerEmail: email || "anonymous@example.com",
                }),
            });

            const data: OrderResponse = await res.json();

            if (res.ok && data.status === "success" && data.data) {
                setOrderData(data.data);
            } else {
                setError(data.error || data.message || "Payment generation failed");
            }
        } catch (err) {
            setError("Something went wrong. please try again.");
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setIsOpen(false);
        setOrderData(null);
        setError("");
        setLoading(false);
        // Keep name/email for convenience? No, let's clear or keep as per preference. 
        // Clearing is safer for multiple users on same device, keeping is better for UX.
        // Let's keep them.
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 bg-yellow-500 hover:bg-yellow-400 text-white p-4 rounded-full shadow-lg flex items-center gap-2 font-bold transition-colors"
                title="Buy Me A Coffee"
            >
                <Coffee size={24} />
                <span className="hidden md:inline">Buy me a coffee</span>
            </motion.button>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) reset();
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-base-100 p-6 rounded-2xl shadow-xl w-full max-w-md relative border border-white/10"
                        >
                            <button
                                onClick={reset}
                                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex flex-col items-center mb-6">
                                <div className="bg-yellow-100 p-3 rounded-full mb-3 text-yellow-600">
                                    <Coffee size={32} />
                                </div>
                                <h3 className="text-2xl font-bold">Buy me a coffee</h3>
                                <p className="text-gray-500 text-sm text-center">
                                    Support my work with a small contribution!
                                </p>
                            </div>

                            {!orderData ? (
                                <form onSubmit={handlePay} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Select Amount (₹)</label>
                                        <div className="flex gap-2 mb-2">
                                            {presets.map((p) => (
                                                <button
                                                    key={p}
                                                    type="button"
                                                    onClick={() => setAmount(p)}
                                                    className={`flex-1 py-2 rounded-lg border transition-all ${amount === p
                                                        ? "bg-yellow-500 text-white border-yellow-500 font-bold"
                                                        : "border-gray-700 hover:border-yellow-500 text-gray-300"
                                                        }`}
                                                >
                                                    ₹{p}
                                                </button>
                                            ))}
                                        </div>
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="Custom Amount"
                                            className="w-full bg-base-200 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            required
                                            min="1"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Name <span className="text-xs text-gray-500">(Optional)</span></label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="John Doe"
                                                className="w-full bg-base-200 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Email <span className="text-xs text-gray-500">(Receipt)</span></label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="john@example.com"
                                                className="w-full bg-base-200 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="p-3 bg-red-900/20 border border-red-500/50 rounded-lg text-red-500 text-sm">
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? <Loader2 className="animate-spin" /> : "Proceed to Pay"}
                                    </button>
                                </form>
                            ) : (
                                <OrderSuccessView
                                    orderData={orderData}
                                    onReset={reset}
                                    customerName={name || "Anonymous Grateful User"}
                                />
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function OrderSuccessView({
    orderData,
    onReset,
    customerName,
}: {
    orderData: NonNullable<OrderResponse["data"]>;
    onReset: () => void;
    customerName: string;
}) {
    const [step, setStep] = useState<"scan" | "verify" | "success">("scan");
    const [refNum, setRefNum] = useState("");
    const [verifying, setVerifying] = useState(false);
    const [error, setError] = useState("");

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setVerifying(true);
        setError("");

        try {
            const res = await fetch("/api/uropay/order", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    uroPayOrderId: orderData.uroPayOrderId,
                    referenceNumber: refNum,
                    amount: orderData.amountInRupees,
                    customerName: customerName,
                }),
            });

            const data = await res.json();

            if (res.ok && data.status === "success") {
                setStep("success");
            } else {
                setError(data.error || data.message || "Verification failed");
            }
        } catch (err) {
            setError("Verification failed. Check your internet.");
        } finally {
            setVerifying(false);
        }
    };

    if (step === "success") {
        return (
            <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h3>
                <p className="text-gray-500 mb-6">Thank you for your generous support.</p>
                <button
                    onClick={onReset}
                    className="btn btn-primary w-full"
                >
                    Close
                </button>
            </div>
        );
    }

    if (step === "verify") {
        return (
            <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4">
                <h3 className="text-xl font-bold mb-4">Verify Payment</h3>
                <p className="text-gray-500 text-sm text-center mb-6">
                    Enter the 12-digit UPI Reference Number from your payment app (e.g., GPay, PhonePe).
                </p>

                <form onSubmit={handleVerify} className="w-full space-y-4">
                    <div>
                        <input
                            type="text"
                            value={refNum}
                            onChange={(e) => setRefNum(e.target.value)}
                            placeholder="Enter 12-digit Ref Number"
                            className="w-full bg-base-200 border border-gray-700 rounded-lg px-4 py-3 text-center tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            required
                            minLength={12}
                            maxLength={16} // Sometimes banks have longer refs
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center bg-red-900/10 p-2 rounded">
                            {error}
                        </div>
                    )}

                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setStep("scan")}
                            className="flex-1 btn btn-ghost"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            disabled={verifying || refNum.length < 10}
                            className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {verifying ? <Loader2 className="animate-spin" /> : "Verify"}
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4">
            <div className="w-full bg-green-900/20 border border-green-500/30 p-3 rounded-lg mb-4 flex items-center gap-2 text-green-400 text-sm">
                <CheckCircle size={16} />
                Order Generated! Scan or Click below.
            </div>

            <div className="bg-white p-2 rounded-xl mb-4 shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={orderData.qrCode}
                    alt="Payment QR Code"
                    className="w-48 h-48 object-contain"
                />
            </div>

            <p className="font-mono text-xl mb-6 font-bold">₹{parseFloat(orderData.amountInRupees).toFixed(2)}</p>

            <div className="w-full space-y-3">
                <a
                    href={orderData.upiString}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                    <Smartphone size={20} /> Pay via UPI
                </a>

                <button
                    onClick={() => setStep("verify")}
                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-3 rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
                >
                    I have paid
                </button>

                <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mt-2">
                    <QrCode size={16} />
                    <span>Scan using any UPI App</span>
                </div>
            </div>
        </div>
    );
}
