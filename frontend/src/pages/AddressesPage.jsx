import { useState } from "react";

function AddressesPage() {

    const [addresses, setAddresses] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        mobile: "",
        alternateMobile: "",
        houseNo: "",
        area: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
        addressType: "HOME",
        customLabel: ""
    });

    // =====================================================
    // 🔥 HANDLE INPUT
    // =====================================================

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // =====================================================
    // 🔥 SAVE ADDRESS
    // =====================================================

    const handleSaveAddress = (e) => {

        e.preventDefault();

        const newAddress = {
            id: Date.now(),
            ...form
        };

        setAddresses([...addresses, newAddress]);

        // reset form
        setForm({
            fullName: "",
            mobile: "",
            alternateMobile: "",
            houseNo: "",
            area: "",
            landmark: "",
            city: "",
            state: "",
            pincode: "",
            addressType: "HOME",
            customLabel: ""
        });

        setShowModal(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-6xl mx-auto">

                {/* ================================================= */}
                {/* 🔥 HEADER */}
                {/* ================================================= */}

                <div className="flex items-center justify-between mb-6">

                    <div>

                        <h1 className="text-3xl font-bold">
                            My Addresses 🏠
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Manage your delivery addresses
                        </p>

                    </div>

                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-500 text-white px-5 py-3 rounded-xl hover:bg-blue-600 transition"
                    >
                        + Add New Address
                    </button>

                </div>

                {/* ================================================= */}
                {/* 🔥 EMPTY STATE */}
                {/* ================================================= */}

                {addresses.length === 0 ? (

                    <div className="bg-white rounded-2xl shadow p-14 text-center">

                        <div className="text-6xl mb-4">
                            📭
                        </div>

                        <h2 className="text-2xl font-semibold mb-2">
                            No Addresses Found
                        </h2>

                        <p className="text-gray-500 mb-6">
                            Add your first delivery address
                        </p>

                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition"
                        >
                            Add Address
                        </button>

                    </div>

                ) : (

                    /* ================================================= */
                    /* 🔥 ADDRESS LIST */
                    /* ================================================= */

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {addresses.map((address) => (

                            <div
                                key={address.id}
                                className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
                            >

                                {/* TOP */}
                                <div className="flex justify-between items-start mb-4">

                                    <div>

                                        <h2 className="text-lg font-semibold">
                                            {address.fullName}
                                        </h2>

                                        <p className="text-gray-500 text-sm">
                                            {address.mobile}
                                        </p>

                                    </div>

                                    <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">

                                        {address.addressType === "OTHER"
                                            ? address.customLabel
                                            : address.addressType}

                                    </span>

                                </div>

                                {/* ADDRESS */}
                                <div className="text-gray-700 leading-7">

                                    <p>{address.houseNo}</p>

                                    <p>{address.area}</p>

                                    {address.landmark && (
                                        <p>
                                            Landmark: {address.landmark}
                                        </p>
                                    )}

                                    <p>
                                        {address.city}, {address.state}
                                    </p>

                                    <p>{address.pincode}</p>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>

            {/* ===================================================== */}
            {/* 🔥 MODAL */}
            {/* ===================================================== */}

            {showModal && (

                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

                    <div className="bg-white rounded-3xl w-full max-w-4xl p-8 shadow-2xl overflow-y-auto max-h-[90vh]">

                        {/* HEADER */}
                        <div className="flex justify-between items-center mb-8">

                            <h2 className="text-3xl font-bold">
                                Add New Address
                            </h2>

                            <button
                                onClick={() => setShowModal(false)}
                                className="text-2xl text-gray-500 hover:text-black"
                            >
                                ✕
                            </button>

                        </div>

                        {/* FORM */}
                        <form onSubmit={handleSaveAddress}>

                            {/* ================================================= */}
                            {/* 🔥 CONTACT DETAILS */}
                            {/* ================================================= */}

                            <h3 className="text-xl font-semibold mb-5">
                                Contact Details
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

                                {/* FULL NAME */}
                                <div>

                                    <label className="block mb-2 font-medium">
                                        Full Name
                                        <span className="text-red-500 ml-1">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        name="fullName"
                                        value={form.fullName}
                                        onChange={handleChange}
                                        placeholder="Enter full name"
                                        className="w-full border p-3 rounded-xl"
                                        required
                                    />

                                </div>

                                {/* MOBILE */}
                                <div>

                                    <label className="block mb-2 font-medium">
                                        Mobile Number
                                        <span className="text-red-500 ml-1">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        name="mobile"
                                        value={form.mobile}
                                        onChange={handleChange}
                                        placeholder="Enter mobile number"
                                        className="w-full border p-3 rounded-xl"
                                        required
                                    />

                                </div>

                                {/* ALTERNATE MOBILE */}
                                <div>

                                    <label className="block mb-2 font-medium">
                                        Alternate Mobile
                                    </label>

                                    <input
                                        type="text"
                                        name="alternateMobile"
                                        value={form.alternateMobile}
                                        onChange={handleChange}
                                        placeholder="Optional"
                                        className="w-full border p-3 rounded-xl"
                                    />

                                </div>

                            </div>

                            {/* ================================================= */}
                            {/* 🔥 ADDRESS DETAILS */}
                            {/* ================================================= */}

                            <h3 className="text-xl font-semibold mb-5">
                                Address Details
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

                                {/* HOUSE */}
                                <div>

                                    <label className="block mb-2 font-medium">
                                        House No / Building Name
                                        <span className="text-red-500 ml-1">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        name="houseNo"
                                        value={form.houseNo}
                                        onChange={handleChange}
                                        placeholder="Flat, House no, Building"
                                        className="w-full border p-3 rounded-xl"
                                        required
                                    />

                                </div>

                                {/* AREA */}
                                <div>

                                    <label className="block mb-2 font-medium">
                                        Area / Road / Colony
                                        <span className="text-red-500 ml-1">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        name="area"
                                        value={form.area}
                                        onChange={handleChange}
                                        placeholder="Area or locality"
                                        className="w-full border p-3 rounded-xl"
                                        required
                                    />

                                </div>

                                {/* LANDMARK */}
                                <div>

                                    <label className="block mb-2 font-medium">
                                        Landmark
                                    </label>

                                    <input
                                        type="text"
                                        name="landmark"
                                        value={form.landmark}
                                        onChange={handleChange}
                                        placeholder="Nearby landmark"
                                        className="w-full border p-3 rounded-xl"
                                    />

                                </div>

                                {/* CITY */}
                                <div>

                                    <label className="block mb-2 font-medium">
                                        City
                                        <span className="text-red-500 ml-1">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        name="city"
                                        value={form.city}
                                        onChange={handleChange}
                                        placeholder="Enter city"
                                        className="w-full border p-3 rounded-xl"
                                        required
                                    />

                                </div>

                                {/* STATE */}
                                <div>

                                    <label className="block mb-2 font-medium">
                                        State
                                        <span className="text-red-500 ml-1">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        name="state"
                                        value={form.state}
                                        onChange={handleChange}
                                        placeholder="Enter state"
                                        className="w-full border p-3 rounded-xl"
                                        required
                                    />

                                </div>

                                {/* PINCODE */}
                                <div>

                                    <label className="block mb-2 font-medium">
                                        Pincode
                                        <span className="text-red-500 ml-1">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        name="pincode"
                                        value={form.pincode}
                                        onChange={handleChange}
                                        placeholder="Enter pincode"
                                        className="w-full border p-3 rounded-xl"
                                        required
                                    />

                                </div>

                            </div>

                            {/* ================================================= */}
                            {/* 🔥 ADDRESS TYPE */}
                            {/* ================================================= */}

                            <h3 className="text-xl font-semibold mb-5">
                                Address Type
                            </h3>

                            <div className="flex gap-4 mb-6 flex-wrap">

                                {/* HOME */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setForm({
                                            ...form,
                                            addressType: "HOME",
                                            customLabel: ""
                                        })
                                    }
                                    className={`px-5 py-2 rounded-full border transition ${
                                        form.addressType === "HOME"
                                            ? "bg-blue-500 text-white"
                                            : "bg-white"
                                    }`}
                                >
                                    Home
                                </button>

                                {/* WORK */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setForm({
                                            ...form,
                                            addressType: "WORK",
                                            customLabel: ""
                                        })
                                    }
                                    className={`px-5 py-2 rounded-full border transition ${
                                        form.addressType === "WORK"
                                            ? "bg-blue-500 text-white"
                                            : "bg-white"
                                    }`}
                                >
                                    Work
                                </button>

                                {/* OTHER */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setForm({
                                            ...form,
                                            addressType: "OTHER"
                                        })
                                    }
                                    className={`px-5 py-2 rounded-full border transition ${
                                        form.addressType === "OTHER"
                                            ? "bg-blue-500 text-white"
                                            : "bg-white"
                                    }`}
                                >
                                    Other
                                </button>

                            </div>

                            {/* CUSTOM LABEL */}
                            {form.addressType === "OTHER" && (

                                <div className="mb-8">

                                    <label className="block mb-2 font-medium">
                                        Custom Address Label
                                        <span className="text-red-500 ml-1">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        name="customLabel"
                                        value={form.customLabel}
                                        onChange={handleChange}
                                        placeholder="Example: Hostel, Parents, Farmhouse"
                                        className="w-full border p-3 rounded-xl"
                                        required
                                    />

                                </div>
                            )}

                            {/* ================================================= */}
                            {/* 🔥 BUTTONS */}
                            {/* ================================================= */}

                            <div className="flex justify-end gap-4">

                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-6 py-3 border rounded-xl hover:bg-gray-100 transition"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
                                >
                                    Save Address
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

        </div>
    );
}

export default AddressesPage;