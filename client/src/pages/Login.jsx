import { useEffect, useState } from "react";
import {
    FileText,
    Mail,
    Lock,
    User,
    Sparkles,
    LoaderCircle,
} from "lucide-react";
import {
    Link,
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { login } from "../app/features/authSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const INITIAL_FORM = {
    name: "",
    email: "",
    password: "",
};

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();

    const urlState = searchParams.get("state");
    const state = urlState === "register" ? "register" : "login";

    const [formData, setFormData] = useState(INITIAL_FORM);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Keep the URL's "state" param valid (defaults to login)
    useEffect(() => {
        if (urlState !== "login" && urlState !== "register") {
            setSearchParams(
                { state: "login" },
                { replace: true }
            );
        }
    }, [urlState, setSearchParams]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) {
            return;
        }

        // Guard against missing env config in production
        if (!BASE_URL) {
            toast.error("Server URL is not configured. Please contact support.");
            return;
        }

        const trimmedEmail = formData.email.trim().toLowerCase();
        const trimmedName = formData.name.trim();

        if (state === "register" && trimmedName.length < 2) {
            toast.error("Please enter your full name.");
            return;
        }

        if (formData.password.length < 8) {
            toast.error("Password must be at least 8 characters.");
            return;
        }

        try {
            setIsSubmitting(true);

            const payload =
                state === "register"
                    ? {
                        name: trimmedName,
                        email: trimmedEmail,
                        password: formData.password,
                    }
                    : {
                        email: trimmedEmail,
                        password: formData.password,
                    };

            const { data } = await axios.post(
                `${BASE_URL}/api/users/${state}`,
                payload
            );

            try {
                localStorage.setItem("token", data.token);
            } catch (storageError) {
                // localStorage can throw in private/incognito mode or when full
                console.error("Failed to persist token:", storageError);
            }

            dispatch(
                login({
                    token: data.token,
                    user: data.user,
                })
            );

            toast.success(data.message);

            navigate("/app", {
                replace: true,
            });
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                (error?.request
                    ? "Unable to reach the server. Please check your connection."
                    : error.message) ||
                "Authentication failed";

            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleStateChange = () => {
        const nextState = state === "login" ? "register" : "login";

        setSearchParams({ state: nextState });

        setFormData((prev) => ({
            name: "",
            email: prev.email,
            password: "",
        }));
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-green-50 via-white to-slate-50 px-4 py-8 sm:px-5">
            <form
                onSubmit={handleSubmit}
                noValidate
                className="relative z-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white px-5 py-7 text-center shadow-2xl shadow-green-100 sm:rounded-3xl sm:px-8 sm:py-10"
            >
                <Link
                    to="/"
                    className="mx-auto mb-5 flex w-fit items-center gap-2"
                    aria-label="Go to homepage"
                >
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500 shadow-lg shadow-green-500/25 sm:h-14 sm:w-14">
                        <FileText className="h-6 w-6 text-white sm:h-7 sm:w-7" />
                        <Sparkles className="absolute -right-1 -top-1 h-4 w-4 text-green-200" />
                    </div>
                </Link>

                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                    {state === "login" ? "Welcome back" : "Create account"}
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    {state === "login"
                        ? "Login to continue building your resume"
                        : "Sign up to create your first AI resume"}
                </p>

                <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
                    {state === "register" && (
                        <div className="flex h-12 items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-5 transition focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100">
                            <User className="h-4 w-4 text-slate-400" aria-hidden="true" />
                            <label htmlFor="name" className="sr-only">
                                Full name
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Full name"
                                value={formData.name}
                                onChange={handleChange}
                                minLength={2}
                                maxLength={100}
                                autoComplete="name"
                                required
                                disabled={isSubmitting}
                                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
                            />
                        </div>
                    )}

                    <div className="flex h-12 items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-5 transition focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100">
                        <Mail className="h-4 w-4 text-slate-400" aria-hidden="true" />
                        <label htmlFor="email" className="sr-only">
                            Email address
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Email address"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                            required
                            disabled={isSubmitting}
                            className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div className="flex h-12 items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-5 transition focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100">
                        <Lock className="h-4 w-4 text-slate-400" aria-hidden="true" />
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            minLength={8}
                            autoComplete={
                                state === "login" ? "current-password" : "new-password"
                            }
                            required
                            disabled={isSubmitting}
                            className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
                        />
                    </div>
                </div>

                {state === "login" && (
                    <div className="mt-4 text-left">
                        <button
                            type="button"
                            disabled={isSubmitting}
                            className="text-sm text-green-600 transition hover:text-green-700 hover:underline disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            Forgot password?
                        </button>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-green-500 text-sm font-semibold text-white shadow-lg shadow-green-500/25 transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSubmitting && (
                        <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                    )}

                    {isSubmitting
                        ? state === "login"
                            ? "Logging in..."
                            : "Creating account..."
                        : state === "login"
                            ? "Login"
                            : "Sign up"}
                </button>

                <p className="mt-5 text-sm text-slate-500">
                    {state === "login"
                        ? "Don't have an account?"
                        : "Already have an account?"}

                    <button
                        type="button"
                        onClick={handleStateChange}
                        disabled={isSubmitting}
                        className="ml-1 font-medium text-green-600 transition hover:text-green-700 hover:underline disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {state === "login" ? "Sign up" : "Login"}
                    </button>
                </p>
            </form>

            <div className="pointer-events-none fixed inset-0 -z-0">
                <div className="absolute left-1/2 top-16 h-80 w-80 -translate-x-1/2 rounded-full bg-green-300/30 blur-3xl" />
                <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
                <div className="absolute bottom-20 left-10 h-72 w-72 rounded-full bg-teal-200/30 blur-3xl" />
            </div>

            <div className="pointer-events-none absolute bottom-3 hidden items-center gap-2 text-xs text-slate-500 sm:flex lg:bottom-8">
                <Sparkles className="h-4 w-4 text-green-500" />
                AI-powered resume builder
            </div>
        </div>
    );
};

export default Login;