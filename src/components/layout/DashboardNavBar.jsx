import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const DashboardNavBar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="w-full bg-white shadow-md px-6 py-3 mb-4 rounded-lg">
            <div className="flex items-center justify-between">

                {/* BRAND */}
                <div className="text-xl font-bold text-green-600 flex items-center gap-2">
                    <span></span>
                    <span>MaziwaSync</span>
                </div>

                {/* USER SECTION */}
                <div className="flex items-center gap-4">

                    {/* USER INFO */}
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="text-gray-800 font-semibold">
                            {user?.username}
                        </span>

                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                            {user?.role}
                        </span>
                    </div>

                    {/* LOGOUT BUTTON */}
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md border border-red-500 text-red-600 hover:bg-red-500 hover:text-white transition"
                    >
                         Logout
                    </button>

                </div>
            </div>
        </nav>
    );
};

export default DashboardNavBar;