import User from "../models/User.js";
import Resume from "../models/Resume.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendOtpEmail, sendPasswordResetOtp } from "../utils/sendEmail.js"


const generateToken = (userId) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured");
    }

    return jwt.sign(
        { userId: userId.toString() },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

const createSafeUser = (userDocument) => {
    const user = userDocument.toObject();

    delete user.password;
    delete user.otp;
    delete user.otpExpiry;
    delete user.otpAttempts;
    delete user.lastOtpSentAt;

    return user;
};

const generateOtp = () => {
    return crypto.randomInt(100000, 1000000).toString();
};

// POST /api/users/register
export const registerUser = async (req, res) => {
    try {
        let { name, email, password } = req.body;

        console.log("REGISTER API HIT");
        console.log("BODY:", req.body);

        name = name?.trim();
        email = email?.trim().toLowerCase();

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required",
            });
        }

        if (name.length < 2) {
            return res.status(400).json({
                message: "Name must contain at least 2 characters",
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Please enter a valid email address",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must contain at least 8 characters",
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            if (existingUser.isVerified) {
                return res.status(409).json({
                    message: "An account with this email already exists",
                });
            }

            await User.deleteOne({
                _id: existingUser._id,
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            12
        );

        const otp = generateOtp();

        const hashedOtp = await bcrypt.hash(
            otp,
            10
        );

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            isVerified: false,
            otp: hashedOtp,
            otpExpiry: new Date(
                Date.now() + 10 * 60 * 1000
            ),
            otpAttempts: 0,
            lastOtpSentAt: new Date(),
        });

        console.log("User created:", newUser.email);
        console.log("Sending OTP to:", email);
        console.log("Generated OTP:", otp);

        try {
            await sendOtpEmail(email, otp);

            console.log("OTP email sent successfully");
        } catch (emailError) {
            console.error(
                "Send OTP error:",
                emailError
            );

            await User.deleteOne({
                _id: newUser._id,
            });

            return res.status(500).json({
                message:
                    "Unable to send verification email",
            });
        }

        return res.status(201).json({
            message:
                "OTP sent to your email. Please verify your account.",
            email: newUser.email,
            requiresVerification: true,
        });
    } catch (error) {
        console.error(
            "Register user error:",
            error
        );

        if (error.code === 11000) {
            return res.status(409).json({
                message:
                    "An account with this email already exists",
            });
        }

        return res.status(500).json({
            message: "Unable to create account",
        });
    }
};

// POST /api/users/verify-otp
export const verifyOtp = async (req, res) => {
    try {
        let { email, otp } = req.body;

        email = email?.trim().toLowerCase();
        otp = otp?.trim();

        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required",
            });
        }

        if (!/^\d{6}$/.test(otp)) {
            return res.status(400).json({
                message: "OTP must be 6 digits",
            });
        }

        const user = await User.findOne({ email }).select(
            "+password +otp +otpExpiry +otpAttempts"
        );

        if (!user) {
            return res.status(400).json({
                message: "Invalid verification request",
            });
        }

        if (user.isVerified) {
            return res.status(400).json({
                message: "Email is already verified",
            });
        }

        if (!user.otp || !user.otpExpiry) {
            return res.status(400).json({
                message: "Please request a new OTP",
            });
        }

        if (user.otpExpiry.getTime() < Date.now()) {
            user.otp = undefined;
            user.otpExpiry = undefined;
            user.otpAttempts = 0;

            await user.save();

            return res.status(400).json({
                message: "OTP expired. Please request a new OTP",
            });
        }

        if (user.otpAttempts >= 5) {
            user.otp = undefined;
            user.otpExpiry = undefined;
            user.otpAttempts = 0;

            await user.save();

            return res.status(429).json({
                message: "Too many incorrect attempts. Request a new OTP",
            });
        }

        const isOtpCorrect = await bcrypt.compare(otp, user.otp);

        if (!isOtpCorrect) {
            user.otpAttempts += 1;
            await user.save();

            return res.status(400).json({
                message: "Invalid OTP",
            });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        user.otpAttempts = 0;
        user.lastOtpSentAt = undefined;

        await user.save();

        const token = generateToken(user._id);
        const safeUser = createSafeUser(user);

        return res.status(200).json({
            message: "Email verified successfully",
            token,
            user: safeUser,
        });
    } catch (error) {
        console.error("Verify OTP error:", error);

        return res.status(500).json({
            message: "Unable to verify OTP",
        });
    }
};

// POST /api/users/resend-otp
export const resendOtp = async (req, res) => {
    try {
        let { email } = req.body;

        email = email?.trim().toLowerCase();

        if (!email) {
            return res.status(400).json({
                message: "Email is required",
            });
        }

        const user = await User.findOne({ email }).select(
            "+otp +otpExpiry +otpAttempts +lastOtpSentAt"
        );

        if (!user) {
            return res.status(400).json({
                message: "Invalid request",
            });
        }

        if (user.isVerified) {
            return res.status(400).json({
                message: "Email is already verified",
            });
        }

        if (
            user.lastOtpSentAt &&
            Date.now() - user.lastOtpSentAt.getTime() < 60 * 1000
        ) {
            return res.status(429).json({
                message: "Please wait 60 seconds before requesting another OTP",
            });
        }

        const otp = generateOtp();
        const hashedOtp = await bcrypt.hash(otp, 10);

        user.otp = hashedOtp;
        user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        user.otpAttempts = 0;
        user.lastOtpSentAt = new Date();

        await user.save();

        try {
            await sendOtpEmail(email, otp);
        } catch (emailError) {
            console.error("Resend OTP email error:", emailError);

            return res.status(500).json({
                message: "Unable to send OTP",
            });
        }

        return res.status(200).json({
            message: "New OTP sent successfully",
        });
    } catch (error) {
        console.error("Resend OTP error:", error);

        return res.status(500).json({
            message: "Unable to resend OTP",
        });
    }
};

// POST /api/users/login
export const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;

        email = email?.trim().toLowerCase();

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        const existingUser = await User.findOne({ email }).select("+password");

        if (!existingUser) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        if (!existingUser.isVerified) {
            return res.status(403).json({
                message: "Please verify your email before logging in",
                requiresVerification: true,
                email: existingUser.email,
            });
        }

        const token = generateToken(existingUser._id);
        const user = createSafeUser(existingUser);

        return res.status(200).json({
            message: "Login successful",
            token,
            user,
        });
    } catch (error) {
        console.error("Login user error:", error);

        return res.status(500).json({
            message: "Unable to login",
        });
    }
};

// GET /api/users/data
export const getUserById = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json({
            user,
        });
    } catch (error) {
        console.error("Get user error:", error);

        return res.status(500).json({
            message: "Unable to retrieve user",
        });
    }
};

// GET /api/users/resumes
export const getUserResumes = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        const resumes = await Resume.find({
            userId,
        }).sort({
            createdAt: -1,
        });

        return res.status(200).json({
            resumes,
        });
    } catch (error) {
        console.error("Get resumes error:", error);

        return res.status(500).json({
            message: "Unable to retrieve resumes",
        });
    }
};

// GET /api/users/data
export const getUserData = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json({
            user,
        });
    } catch (error) {
        console.error("Get user data error:", error);

        return res.status(500).json({
            message: "Unable to retrieve user",
        });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        let { email } = req.body;

        email = email?.trim().toLowerCase();

        if (!email) {
            return res.status(400).json({
                message: "Email is required",
            });
        }

        const user = await User.findOne({ email }).select(
            "+resetOtp +resetOtpExpiry +resetOtpAttempts"
        );

        if (!user) {
            return res.status(200).json({
                message: "If an account exists with this email, an OTP has been sent",
            });
        }

        const otp = generateOtp();
        const hashedOtp = await bcrypt.hash(otp, 10);

        user.resetOtp = hashedOtp;
        user.resetOtpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        user.resetOtpAttempts = 0;

        await user.save();

        await sendPasswordResetOtp(email, otp);

        return res.status(200).json({
            message: "Password reset OTP sent successfully",
        });
    } catch (error) {
        console.error("Forgot password error:", error);

        return res.status(500).json({
            message: "Unable to send password reset OTP",
        });
    }
};

export const verifyResetOtp = async (req, res) => {
    try {
        let { email, otp } = req.body;

        email = email?.trim().toLowerCase();
        otp = otp?.trim();

        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required",
            });
        }

        if (!/^\d{6}$/.test(otp)) {
            return res.status(400).json({
                message: "OTP must be 6 digits",
            });
        }

        const user = await User.findOne({ email }).select(
            "+resetOtp +resetOtpExpiry +resetOtpAttempts"
        );

        if (
            !user ||
            !user.resetOtp ||
            !user.resetOtpExpiry
        ) {
            return res.status(400).json({
                message: "Invalid password reset request",
            });
        }

        if (user.resetOtpExpiry.getTime() < Date.now()) {
            user.resetOtp = undefined;
            user.resetOtpExpiry = undefined;
            user.resetOtpAttempts = 0;

            await user.save();

            return res.status(400).json({
                message: "OTP expired. Please request a new OTP",
            });
        }

        if (user.resetOtpAttempts >= 5) {
            user.resetOtp = undefined;
            user.resetOtpExpiry = undefined;
            user.resetOtpAttempts = 0;

            await user.save();

            return res.status(429).json({
                message: "Too many incorrect attempts. Request a new OTP",
            });
        }

        const isOtpCorrect = await bcrypt.compare(
            otp,
            user.resetOtp
        );

        if (!isOtpCorrect) {
            user.resetOtpAttempts += 1;
            await user.save();

            return res.status(400).json({
                message: "Invalid OTP",
            });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not configured");
        }

        const resetToken = jwt.sign(
            {
                userId: user._id.toString(),
                purpose: "password-reset",
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "10m",
            }
        );

        return res.status(200).json({
            message: "OTP verified successfully",
            resetToken,
        });
    } catch (error) {
        console.error("Verify reset OTP error:", error);

        return res.status(500).json({
            message: "Unable to verify OTP",
        });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { resetToken, newPassword } = req.body;

        if (!resetToken || !newPassword) {
            return res.status(400).json({
                message: "Reset token and new password are required",
            });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({
                message: "Password must contain at least 8 characters",
            });
        }

        let decoded;

        try {
            decoded = jwt.verify(
                resetToken,
                process.env.JWT_SECRET
            );
        } catch {
            return res.status(401).json({
                message: "Reset session expired. Please try again",
            });
        }

        if (decoded.purpose !== "password-reset") {
            return res.status(401).json({
                message: "Invalid reset token",
            });
        }

        const user = await User.findById(decoded.userId).select(
            "+password +resetOtp +resetOtpExpiry +resetOtpAttempts"
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        if (!user.resetOtp || !user.resetOtpExpiry) {
            return res.status(400).json({
                message: "Password reset request is no longer valid",
            });
        }

        if (user.resetOtpExpiry.getTime() < Date.now()) {
            return res.status(400).json({
                message: "Password reset request expired",
            });
        }

        user.password = await bcrypt.hash(
            newPassword,
            12
        );

        user.resetOtp = undefined;
        user.resetOtpExpiry = undefined;
        user.resetOtpAttempts = 0;

        await user.save();

        return res.status(200).json({
            message: "Password reset successfully",
        });
    } catch (error) {
        console.error("Reset password error:", error);

        return res.status(500).json({
            message: "Unable to reset password",
        });
    }
};