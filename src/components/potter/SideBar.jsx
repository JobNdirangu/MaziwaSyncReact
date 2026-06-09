import { NavLink } from "react-router-dom";

const SideBar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      isActive
        ? "bg-green-600 text-white"
        : "text-gray-200 hover:bg-white/10"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-br from-green-800 to-blue-900 text-white">
      <div className="p-5">
        <h2 className="text-2xl font-bold mb-8">
          MaziwaSync
        </h2>

        <nav className="space-y-2">
          <NavLink to="/porter" end className={linkClass}>
            <i className="bi bi-speedometer2"></i>
            Dashboard
          </NavLink>

          <NavLink to="/porter/collect-milk" className={linkClass}>
            <i className="bi bi-plus-circle"></i>
            Collect Milk
          </NavLink>

          <NavLink to="/porter/collections" className={linkClass}>
            <i className="bi bi-list-check"></i>
            My Collections
          </NavLink>

          <NavLink to="/porter/farmers" className={linkClass}>
            <i className="bi bi-people"></i>
            Assigned Farmers
          </NavLink>

          <NavLink to="/porter/notices" className={linkClass}>
            <i className="bi bi-megaphone"></i>
            Notices
          </NavLink>

          <NavLink to="/porter/profile" className={linkClass}>
            <i className="bi bi-person-circle"></i>
            Profile
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;