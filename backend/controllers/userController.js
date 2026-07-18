import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Resume from "../models/Resume.js";

const generateToken = (userId) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured");
    }

    return jwt.sign(
        {
            userId: userId.toString(),
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};

const createSafeUser = (userDocument) => {
    const user = userDocument.toObject();

    delete user.password;

    return user;
};

// POST: /api/users/register
export const registerUser = async (req, res) => {
    try {
        let { name, email, password } = req.body;

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

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must contain at least 8 characters",
            });
        }

        const existingUser = await User.findOne({
            email,
        });

        if (existingUser) {
            return res.status(409).json({
                message: "An account with this email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            12
        );

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = generateToken(newUser._id);
        const user = createSafeUser(newUser);

        return res.status(201).json({
            message: "User created successfully",
            token,
            user,
        });
    } catch (error) {
        console.error("Register user error:", error);

        if (error.code === 11000) {
            return res.status(409).json({
                message: "An account with this email already exists",
            });
        }

        return res.status(500).json({
            message: "Unable to create account",
        });
    }
};

// POST: /api/users/login
export const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;

        email = email?.trim().toLowerCase();

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        /*
         * Keep .select("+password") if your User schema has:
         * password: { select: false }
         */
        const existingUser = await User.findOne({
            email,
        }).select("+password");

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

// GET: /api/users/data
export const getUserById = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        const user = await User.findById(userId).select(
            "-password"
        );

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

// GET: /api/users/resumes
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

// userController.js
export const getUserData = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json({ user });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};