import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        otp: {
            type: String,
            select: false,
        },
        otpExpiry: {
            type: Date,
            select: false,
        },
        otpAttempts: {
            type: Number,
            default: 0,
            select: false,
        },
        lastOtpSentAt: {
            type: Date,
            select: false,
        },
        resetOtp: {
            type: String,
            select: false,
        },
        resetOtpExpiry: {
            type: Date,
            select: false,
        },
        resetOtpAttempts: {
            type: Number,
            default: 0,
            select: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);