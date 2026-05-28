import DashboardLayout
    from "./DashboardLayout";

import { sellerSidebarItems }
    from "../../config/sidebar/sellerSidebarItems";

function SellerDashboardLayout() {

    return (

        <DashboardLayout
            title="Seller Panel"
            sidebarItems={sellerSidebarItems}
        />

    );
}

export default SellerDashboardLayout;