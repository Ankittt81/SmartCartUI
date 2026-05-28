import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

import Navbar from "./Navbar";

function DashboardLayout({

                             title,
                             sidebarItems

                         }) {

    return (

        <div className="min-h-screen bg-gray-100 flex">

            <Sidebar
                title={title}
                items={sidebarItems}
            />



            <div className="flex-1 flex flex-col">

                <Navbar />



                <div className="p-8">

                    <Outlet />

                </div>

            </div>

        </div>
    );
}

export default DashboardLayout;