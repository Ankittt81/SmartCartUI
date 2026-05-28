import DashboardLayout from "../../components/dashboard/DashboardLayout";

import StatCard from "../../components/dashboard/StatCard";

function SellerDashboard() {

    const sidebarItems = [

        {
            label: "Dashboard",
            path: "/seller/dashboard"
        },

        {
            label: "Products",
            path: "/seller/products"
        },

        {
            label: "Add Product",
            path: "/seller/add-product"
        },

        {
            label: "Inventory",
            path: "/seller/inventory"
        },

        {
            label: "Orders",
            path: "/seller/orders"
        }
    ];

    const topProducts = [

        {
            name: "Gaming Laptop",
            stock: 12,
            sales: 142,
            revenue: "₹12.4L"
        },

        {
            name: "iPhone 15",
            stock: 4,
            sales: 98,
            revenue: "₹8.7L"
        },

        {
            name: "Mechanical Keyboard",
            stock: 2,
            sales: 66,
            revenue: "₹1.9L"
        }
    ];

    return (

        <DashboardLayout
            title="Seller Hub"
            sidebarItems={sidebarItems}
        >

            {/* HEADER */}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">

                <div>

                    <h1 className="text-4xl font-bold">

                        Seller Dashboard

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Manage products, inventory and orders.

                    </p>

                </div>

                <button className="bg-emerald-600 text-white px-6 py-3 rounded-2xl hover:bg-emerald-700 transition">

                    + Add Product

                </button>

            </div>

            {/* STATS */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-10">

                <StatCard
                    title="Total Products"
                    value="48"
                    subtitle="Listed products"
                />

                <StatCard
                    title="Active Products"
                    value="41"
                    subtitle="Visible to buyers"
                />

                <StatCard
                    title="Low Stock"
                    value="5"
                    subtitle="Needs refill"
                />

                <StatCard
                    title="Orders Received"
                    value="326"
                    subtitle="This month"
                />

                <StatCard
                    title="Revenue"
                    value="₹22.1L"
                    subtitle="Monthly earnings"
                />

            </div>

            {/* PRODUCT TABLE */}

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">

                <div className="flex items-center justify-between mb-8">

                    <h2 className="text-2xl font-semibold">

                        Top Performing Products

                    </h2>

                    <button className="text-emerald-600 font-medium">

                        Manage Inventory

                    </button>

                </div>

                <div className="overflow-x-auto">

                    <table className="w-full text-left">

                        <thead>

                        <tr className="border-b border-gray-200 text-gray-500 text-sm">

                            <th className="pb-4">
                                Product
                            </th>

                            <th className="pb-4">
                                Stock
                            </th>

                            <th className="pb-4">
                                Sales
                            </th>

                            <th className="pb-4">
                                Revenue
                            </th>

                        </tr>

                        </thead>

                        <tbody>

                        {topProducts.map((product) => (

                            <tr
                                key={product.name}
                                className="border-b border-gray-100"
                            >

                                <td className="py-5 font-medium">

                                    {product.name}

                                </td>

                                <td className="py-5">

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm ${
                                            product.stock <= 5
                                                ? "bg-red-100 text-red-600"
                                                : "bg-green-100 text-green-600"
                                        }`}
                                    >

                                        {product.stock} left

                                    </span>

                                </td>

                                <td className="py-5">

                                    {product.sales}

                                </td>

                                <td className="py-5 font-semibold">

                                    {product.revenue}

                                </td>

                            </tr>

                        ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </DashboardLayout>
    );
}

export default SellerDashboard;