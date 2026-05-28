import DashboardLayout
    from "./DashboardLayout";

import { userSidebarItems }
    from "../../config/sidebar/userSidebarItems";

function UserDashboardLayout() {

    return (

        <DashboardLayout
            title="My Account"
            sidebarItems={userSidebarItems}
        />

    );
}

export default UserDashboardLayout;