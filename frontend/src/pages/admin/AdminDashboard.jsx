import StatCard from "../../components/dashboard/StatCard";

function AdminDashboard() {

    const recentActivities = [

        "New seller registration pending approval",

        "12 new products added today",

        "3 users reported payment issues",

        "Revenue increased by 18% this week"
    ];

    return (

        <div>

            {/* HEADER */}

            <div className="mb-10">

                <h1 className="text-4xl font-bold">

                    Admin Dashboard

                </h1>

                <p className="text-gray-500 mt-2">

                    Monitor and manage marketplace operations.

                </p>

            </div>



            {/* STATS */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

                <StatCard
                    title="Total Users"
                    value="12,482"
                    subtitle="Registered customers"
                />

                <StatCard
                    title="Total Sellers"
                    value="328"
                    subtitle="Active sellers"
                />

                <StatCard
                    title="Products"
                    value="18,204"
                    subtitle="Marketplace listings"
                />

                <StatCard
                    title="Revenue"
                    value="₹1.8Cr"
                    subtitle="This month"
                />

            </div>



            {/* ACTIVITIES */}

            <div className="bg-white rounded-3xl border border-gray-100 p-8">

                <h2 className="text-2xl font-semibold mb-6">

                    Recent Activities

                </h2>

                <div className="space-y-4">

                    {recentActivities.map((activity, index) => (

                        <div
                            key={index}
                            className="border border-gray-100 rounded-2xl p-5"
                        >

                            {activity}

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;