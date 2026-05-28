import { NavLink } from "react-router-dom";

function Sidebar({ title, items }) {

    return (

        <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-6 hidden lg:block">

            <h1 className="text-2xl font-bold mb-10">
                {title}
            </h1>

            <div className="space-y-3">

                {items.map((item) => (

                    <NavLink
                        key={item.label}
                        to={item.path}
                        className={({ isActive }) =>
                            `block px-4 py-3 rounded-xl transition ${
                                isActive
                                    ? "bg-blue-100 text-blue-600 font-medium"
                                    : "hover:bg-gray-100 text-gray-700"
                            }`
                        }
                    >
                        {item.label}
                    </NavLink>

                ))}

            </div>

        </div>
    );
}

export default Sidebar;