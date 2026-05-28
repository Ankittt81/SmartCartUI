function StatCard({ title, value, subtitle }) {

    return (

        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">

            <p className="text-sm text-gray-500 mb-2">
                {title}
            </p>

            <h2 className="text-3xl font-bold">
                {value}
            </h2>

            <p className="text-sm text-gray-400 mt-2">
                {subtitle}
            </p>

        </div>
    );
}

export default StatCard;