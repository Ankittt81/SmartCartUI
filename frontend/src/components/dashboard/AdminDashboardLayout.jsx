import DashboardLayout
    from "./DashboardLayout";

import { adminSidebarItems }
    from "../../config/sidebar/adminSidebarItems";

function AdminDashboardLayout() {

    return (

        <DashboardLayout
            title="Admin Panel"
            sidebarItems={adminSidebarItems}
        />

    );
}

export default AdminDashboardLayout;