import { useEffect, useState } from "react";
import {
    Mail,
    ShieldCheck,
    LoaderCircle,
    ArrowLeft,
} from "lucide-react";
import {
    Link,
    useLocation,
    useNavigate,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { login } from "../app/features/authSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const VerifyOtp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const email = location.state?.email || "";

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [timer, setTimer] = useState(60);

    useEffect(() => {
        if (!email) {
            navigate("/login?state=register", {
                replace: true,
            });
        }
    }, [email, navigate]);

    useEffect(() => {
        if (timer <= 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const handleVerify = async (e) => {
        e.preventDefault();

        if (otp.length !== 6) {
            toast.error("Please enter 6 digit OTP.");
            return;
        }

        try {
            setLoading(true);

            const { data } = await axios.post(
                `${BASE_URL}/api/users/verify-otp`,
                {
                    email,
                    otp,
                }
            );

            localStorage.setItem("token", data.token);

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            dispatch(
                login({
                    token: data.token,
                    user: data.user,
                })
            );

            toast.success(
                data.message || "Email verified successfully"
            );

            navigate("/app", {
                replace: true,
            });
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                    "OTP verification failed"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (timer > 0 || resending) return;

        try {
            setResending(true);

            const { data } = await axios.post(
                `${BASE_URL}/api/users/resend-otp`,
                {
                    email,
                }
            );

            toast.success(
                data.message || "New OTP sent"
            );

            setTimer(60);
            setOtp("");
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                    "Unable to resend OTP"
            );
        } finally {
            setResending(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-green-50 via-white to-slate-50 px-4">
            <form
                onSubmit={handleVerify}
                className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-2xl shadow-green-100 sm:p-9"
            >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500 shadow-lg shadow-green-500/20">
                    <ShieldCheck className="h-7 w-7 text-white" />
                </div>

                <h1 className="mt-5 text-2xl font-bold text-slate-900">
                    Verify your email
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    We sent a 6-digit verification code to
                </p>

                <div className="mt-2 flex items-center justify-center gap-2 text-sm font-medium text-slate-700">
                    <Mail className="h-4 w-4 text-green-500" />
                    {email}
                </div>

                <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => {
                        const value = e.target.value.replace(
                            /\D/g,
                            ""
                        );

                        setOtp(value);
                    }}
                    placeholder="Enter 6 digit OTP"
                    className="mt-7 h-12 w-full rounded-full border border-slate-200 bg-slate-50 px-5 text-center text-lg font-semibold tracking-[0.35em] text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />

                <button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-green-500 font-semibold text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading && (
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                    )}

                    {loading
                        ? "Verifying..."
                        : "Verify Email"}
                </button>

                <div className="mt-5 text-sm text-slate-500">
                    Didn't receive the code?{" "}
                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={timer > 0 || resending}
                        className="font-medium text-green-600 hover:underline disabled:cursor-not-allowed disabled:text-slate-400"
                    >
                        {resending
                            ? "Sending..."
                            : timer > 0
                                ? `Resend in ${timer}s`
                                : "Resend OTP"}
                    </button>
                </div>

                <Link
                    to="/login?state=login"
                    className="mt-6 flex items-center justify-center gap-1 text-sm text-slate-500 transition hover:text-green-600"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to login
                </Link>
            </form>
        </div>
    );
};

export default VerifyOtp;