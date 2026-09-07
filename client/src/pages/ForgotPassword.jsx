import { useState } from "react";
import {
    Mail,
    ArrowLeft,
    LoaderCircle,
    KeyRound,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cleanEmail = email.trim().toLowerCase();

        if (!cleanEmail) {
            toast.error("Please enter your email");
            return;
        }

        try {
            setLoading(true);

            const { data } = await axios.post(
                `${BASE_URL}/api/users/forgot-password`,
                {
                    email: cleanEmail,
                }
            );

            toast.success(data.message);

            navigate("/reset-password", {
                state: {
                    email: cleanEmail,
                },
            });
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                    "Unable to send OTP"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-green-50 via-white to-slate-50 px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-2xl shadow-green-100"
            >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500">
                    <KeyRound className="h-7 w-7 text-white" />
                </div>

                <h1 className="mt-5 text-2xl font-bold text-slate-900">
                    Forgot password?
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    Enter your email and we'll send you a verification code.
                </p>

                <div className="mt-7 flex h-12 items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-5 focus-within:border-green-500">
                    <Mail className="h-4 w-4 text-slate-400" />

                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                        className="w-full bg-transparent text-sm outline-none"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-green-500 font-semibold text-white hover:bg-green-600 disabled:opacity-60"
                >
                    {loading && (
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                    )}

                    {loading
                        ? "Sending..."
                        : "Send OTP"}
                </button>

                <Link
                    to="/login?state=login"
                    className="mt-6 flex items-center justify-center gap-1 text-sm text-slate-500 hover:text-green-600"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to login
                </Link>
            </form>
        </div>
    );
};

export default ForgotPassword;