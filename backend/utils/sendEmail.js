import nodemailer from "nodemailer";

console.log("sendEmail.js loaded");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

transporter.verify((error) => {
    if (error) {
        console.log("EMAIL CONFIG ERROR:", error.message);
    } else {
        console.log("EMAIL SERVER READY");
    }
});

export const sendOtpEmail = async (email, otp) => {
    try {
        console.log("sendOtpEmail called");
        console.log("Sending OTP to:", email);
        console.log("EMAIL_USER:", process.env.EMAIL_USER);
        console.log("OTP:", otp);

        const info = await transporter.sendMail({
            from: `"Resume Builder" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Verify your email",
            html: `
                <div style="font-family:Arial,sans-serif">
                    <h2>Email Verification</h2>
                    <p>Your OTP is:</p>
                    <h1>${otp}</h1>
                    <p>This OTP expires in 10 minutes.</p>
                </div>
            `,
        });

        console.log("EMAIL SENT:", info.messageId);

        return info;
    } catch (error) {
        console.log("EMAIL SEND ERROR:", error.message);
        throw error;
    }
};

export const sendPasswordResetOtp = async (email, otp) => {
    try {
        console.log("Sending reset OTP to:", email);

        const info = await transporter.sendMail({
            from: `"Resume Builder" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Reset your password",
            html: `
                <div style="font-family:Arial,sans-serif">
                    <h2>Password Reset</h2>
                    <p>Your password reset OTP is:</p>
                    <h1>${otp}</h1>
                    <p>This OTP will expire in 10 minutes.</p>
                    <p>If you didn't request this, ignore this email.</p>
                </div>
            `,
        });

        console.log("RESET EMAIL SENT:", info.messageId);

        return info;
    } catch (error) {
        console.log("RESET EMAIL ERROR:", error.message);
        throw error;
    }
};