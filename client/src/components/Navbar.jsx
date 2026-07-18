import { FileText, LogOut, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/features/authSlice";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);

    const handleLogout = () => {
        dispatch(logout());

        navigate("/", {
            replace: true,
        });
    };

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
                <Link to="/" className="flex items-center gap-2">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-green-500 shadow-lg shadow-green-500/25">
                        <FileText className="h-5 w-5 text-white" />

                        <Sparkles className="absolute -right-1 -top-1 h-4 w-4 text-green-200" />
                    </div>

                    <span className="text-xl font-bold text-slate-900">
                        Resume
                    </span>
                </Link>

                <div className="flex items-center gap-4">
                    <p className="hidden text-sm text-slate-600 sm:block">
                        Hi,{" "}
                        <span className="font-semibold text-slate-900">
                            {user?.name || "User"}
                        </span>
                    </p>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;