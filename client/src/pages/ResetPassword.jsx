import { useEffect, useState } from "react";
import {
    ShieldCheck,
    Lock,
    LoaderCircle,
    ArrowLeft,
} from "lucide-react";
import {
    Link,
    useLocation,
    useNavigate,
} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || "";

    const [otp, setOtp] = useState("");
    const [resetToken, setResetToken] = useState("");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!email) {
            navigate("/forgot-password", {
                replace: true,
            });
        }
    }, [email, navigate]);

    const handleVerifyOtp = async (e) => {
        e.preventDefault();

        if (otp.length !== 6) {
            toast.error("Enter a valid 6 digit OTP");
            return;
        }

        try {
            setLoading(true);

            const { data } = await axios.post(
                `${BASE_URL}/api/users/verify-reset-otp`,
                {
                    email,
                    otp,
                }
            );

            setResetToken(data.resetToken);

            toast.success("OTP verified");
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                "Unable to verify OTP"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (newPassword.length < 8) {
            toast.error(
                "Password must be at least 8 characters"
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            const { data } = await axios.post(
                `${BASE_URL}/api/users/reset-password`,
                {
                    resetToken,
                    newPassword,
                }
            );

            toast.success(data.message);

            navigate("/login?state=login", {
                replace: true,
            });
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                "Unable to reset password"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-green-50 via-white to-slate-50 px-4">
            <form
                onSubmit={
                    resetToken
                        ? handleResetPassword
                        : handleVerifyOtp
                }
                className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-2xl shadow-green-100"
            >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500">
                    {resetToken ? (
                        <Lock className="h-7 w-7 text-white" />
                    ) : (
                        <ShieldCheck className="h-7 w-7 text-white" />
                    )}
                </div>

                {!resetToken ? (
                    <>
                        <h1 className="mt-5 text-2xl font-bold text-slate-900">
                            Verify OTP
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            Enter the 6-digit OTP sent to
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-700">
                            {email}
                        </p>

                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            value={otp}
                            onChange={(e) =>
                                setOtp(
                                    e.target.value.replace(
                                        /\D/g,
                                        ""
                                    )
                                )
                            }
                            placeholder="Enter OTP"
                            className="mt-7 h-12 w-full rounded-full border border-slate-200 bg-slate-50 px-5 text-center text-lg font-semibold tracking-[0.35em] outline-none focus:border-green-500"
                        />

                        <button
                            type="submit"
                            disabled={
                                loading ||
                                otp.length !== 6
                            }
                            className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-green-500 font-semibold text-white hover:bg-green-600 disabled:opacity-60"
                        >
                            {loading && (
                                <LoaderCircle className="h-4 w-4 animate-spin" />
                            )}

                            {loading
                                ? "Verifying..."
                                : "Verify OTP"}
                        </button>
                    </>
                ) : (
                    <>
                        <h1 className="mt-5 text-2xl font-bold text-slate-900">
                            Create new password
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            Enter a new password for your account.
                        </p>

                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) =>
                                setNewPassword(e.target.value)
                            }
                            placeholder="New password"
                            className="mt-7 h-12 w-full rounded-full border border-slate-200 bg-slate-50 px-5 text-sm outline-none focus:border-green-500"
                        />

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(
                                    e.target.value
                                )
                            }
                            placeholder="Confirm password"
                            className="mt-3 h-12 w-full rounded-full border border-slate-200 bg-slate-50 px-5 text-sm outline-none focus:border-green-500"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-green-500 font-semibold text-white hover:bg-green-600 disabled:opacity-60"
                        >
                            {loading && (
                                <LoaderCircle className="h-4 w-4 animate-spin" />
                            )}

                            {loading
                                ? "Updating..."
                                : "Reset Password"}
                        </button>
                    </>
                )}

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

export default ResetPassword;