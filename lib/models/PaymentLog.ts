import { Schema, model, models } from "mongoose";

const PaymentLogSchema = new Schema({
    referenceNumber: { type: String, required: true, unique: true },
    amount: { type: String, required: true },
    from: { type: String },
    vpa: { type: String },
    date: { type: Date, default: Date.now },
});

export default models.PaymentLog || model("PaymentLog", PaymentLogSchema);
