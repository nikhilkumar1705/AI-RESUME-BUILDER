import { FileText, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/features/authSlice";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);

    const handleLogout = () => {
        dispatch(logout());

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/", {
            replace: true,
        });
    };

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
                <Link
                    to="/"
                    className="flex items-center gap-2.5"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600">
                        <FileText className="h-5 w-5 text-white" />
                    </div>

                    <span className="text-lg font-semibold tracking-tight text-slate-950">
                        Resume
                    </span>
                </Link>

                <div className="flex items-center gap-3">
                    <div className="hidden items-center gap-2 sm:flex">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold uppercase text-slate-700">
                            {user?.name?.charAt(0) || "U"}
                        </div>

                        <div className="leading-tight">
                            <p className="text-xs text-slate-400">
                                Signed in as
                            </p>

                            <p className="max-w-[150px] truncate text-sm font-medium text-slate-800">
                                {user?.name || "User"}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                    >
                        <LogOut className="h-4 w-4" />
                        <span className="hidden sm:inline">
                            Logout
                        </span>
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;