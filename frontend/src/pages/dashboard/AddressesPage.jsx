import { useState, useEffect } from "react";

import {
    getAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress
} from "../../services/addressService.js";

function AddressesPage() {

    // =====================================================
    // 🔥 STATES
    // =====================================================

    const [addresses, setAddresses] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState("");

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

    useEffect(() => {

        if (message) {

            const timer = setTimeout(() => {
                setMessage("");
            }, 7000);

            return () => clearTimeout(timer);
        }

    }, [message]);

    // =====================================================
    // 🔥 FETCH ADDRESSES
    // =====================================================

    const fetchAddresses = async () => {

        try {

            const res = await getAddresses();

            setAddresses(res.data);

        } catch (err) {

            console.error(err);
        }
    };

    useEffect(() => {

        fetchAddresses();

    }, []);

    const handleSetDefault = async (id) => {

        try {

            await setDefaultAddress(id);

            // refresh latest data
            await fetchAddresses();

        } catch (err) {

            console.error(err);
        }
    };

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
    // 🔥 SAVE / UPDATE ADDRESS
    // =====================================================

    const handleSaveAddress = async (e) => {
        setError("");
        e.preventDefault();

        try {

            if (editingId) {

                await updateAddress(
                    editingId,
                    form
                );

            } else {

                await addAddress(form);
            }

            // refresh latest addresses
            await fetchAddresses();

            // reset edit state
            setEditingId(null);

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

            // close modal
            setShowModal(false);

        } catch (err) {

            console.error(err);

            setMessage(
                err.response?.data
                || "Failed to save address"
            );
        }
    };

    // =====================================================
    // 🔥 DELETE ADDRESS
    // =====================================================

    const handleDelete = async (id) => {

        try {

            await deleteAddress(id);

            await fetchAddresses();

        } catch (err) {

            console.error(err);
        }
    };

    // =====================================================
    // 🔥 EDIT ADDRESS
    // =====================================================

    const handleEdit = (address) => {

        setEditingId(address.id);

        setForm({
            fullName: address.fullName,
            mobile: address.mobile,
            alternateMobile: address.alternateMobile,
            houseNo: address.houseNo,
            area: address.area,
            landmark: address.landmark,
            city: address.city,
            state: address.state,
            pincode: address.pincode,
            addressType: address.addressType,
            customLabel: address.customLabel || ""
        });

        setShowModal(true);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {message && (

                <div className="fixed top-5 right-5 z-[100] bg-red-500 text-white px-6 py-4 rounded-xl shadow-lg">

                    {message}

                </div>
            )}

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
                        onClick={() => {
                            setEditingId(null);

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

                            setShowModal(true);
                        }}
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

                                {/* ACTION BUTTONS */}
                                <div className="flex items-center justify-between mt-5">

                                    {/* LEFT SIDE */}
                                    <div>

                                        {address.isDefault ? (

                                            <div className="bg-green-100 text-green-600 px-4 py-2 rounded-lg text-sm font-medium">

                                                ✓ Default Address

                                            </div>

                                        ) : (

                                            <button
                                                onClick={() => handleSetDefault(address.id)}
                                                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                                            >
                                                Set as Default
                                            </button>
                                        )}

                                    </div>

                                    {/* RIGHT SIDE */}
                                    <div className="flex gap-3">

                                        <button
                                            onClick={() => handleEdit(address)}
                                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(address.id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                        >
                                            Delete
                                        </button>

                                    </div>

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

                                {editingId
                                    ? "Edit Address"
                                    : "Add New Address"}

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

                            {/* CONTACT DETAILS */}

                            <h3 className="text-xl font-semibold mb-5">
                                Contact Details
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

                                <div>

                                    <label className="block mb-2 font-medium">
                                        Full Name
                                        <span className="text-red-500 ml-1">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="fullName"
                                        value={form.fullName}
                                        onChange={handleChange}
                                        className="w-full border p-3 rounded-xl"
                                        required
                                    />

                                </div>

                                <div>

                                    <label className="block mb-2 font-medium">
                                        Mobile Number
                                        <span className="text-red-500 ml-1">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="mobile"
                                        value={form.mobile}
                                        onChange={handleChange}
                                        className="w-full border p-3 rounded-xl"
                                        required
                                    />

                                </div>

                                <div>

                                    <label className="block mb-2 font-medium">
                                        Alternate Mobile
                                    </label>

                                    <input
                                        type="text"
                                        name="alternateMobile"
                                        value={form.alternateMobile}
                                        onChange={handleChange}
                                        className="w-full border p-3 rounded-xl"
                                    />

                                </div>

                            </div>

                            {/* ADDRESS DETAILS */}

                            <h3 className="text-xl font-semibold mb-5">
                                Address Details
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

                                <div>

                                    <label className="block mb-2 font-medium">
                                        House No / Building Name
                                        <span className="text-red-500 ml-1">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="houseNo"
                                        value={form.houseNo}
                                        onChange={handleChange}
                                        className="w-full border p-3 rounded-xl"
                                        required
                                    />

                                </div>

                                <div>

                                    <label className="block mb-2 font-medium">
                                        Area / Road / Colony
                                        <span className="text-red-500 ml-1">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="area"
                                        value={form.area}
                                        onChange={handleChange}
                                        className="w-full border p-3 rounded-xl"
                                        required
                                    />

                                </div>

                                <div>

                                    <label className="block mb-2 font-medium">
                                        Landmark
                                    </label>

                                    <input
                                        type="text"
                                        name="landmark"
                                        value={form.landmark}
                                        onChange={handleChange}
                                        className="w-full border p-3 rounded-xl"
                                    />

                                </div>

                                <div>

                                    <label className="block mb-2 font-medium">
                                        City
                                        <span className="text-red-500 ml-1">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="city"
                                        value={form.city}
                                        onChange={handleChange}
                                        className="w-full border p-3 rounded-xl"
                                        required
                                    />

                                </div>

                                <div>

                                    <label className="block mb-2 font-medium">
                                        State
                                        <span className="text-red-500 ml-1">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="state"
                                        value={form.state}
                                        onChange={handleChange}
                                        className="w-full border p-3 rounded-xl"
                                        required
                                    />

                                </div>

                                <div>

                                    <label className="block mb-2 font-medium">
                                        Pincode
                                        <span className="text-red-500 ml-1">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="pincode"
                                        value={form.pincode}
                                        onChange={handleChange}
                                        className="w-full border p-3 rounded-xl"
                                        required
                                    />

                                </div>

                            </div>

                            {/* ADDRESS TYPE */}

                            <h3 className="text-xl font-semibold mb-5">
                                Address Type
                            </h3>

                            <div className="flex gap-4 mb-6 flex-wrap">

                                {["HOME", "WORK", "OTHER"].map((type) => (

                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() =>
                                            setForm({
                                                ...form,
                                                addressType: type,
                                                customLabel:
                                                    type !== "OTHER"
                                                        ? ""
                                                        : form.customLabel
                                            })
                                        }
                                        className={`px-5 py-2 rounded-full border transition ${
                                            form.addressType === type
                                                ? "bg-blue-500 text-white"
                                                : "bg-white"
                                        }`}
                                    >
                                        {type}
                                    </button>
                                ))}

                            </div>

                            {/* CUSTOM LABEL */}

                            {form.addressType === "OTHER" && (

                                <div className="mb-8">

                                    <label className="block mb-2 font-medium">
                                        Custom Address Label
                                        <span className="text-red-500 ml-1">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="customLabel"
                                        value={form.customLabel}
                                        onChange={handleChange}
                                        className="w-full border p-3 rounded-xl"
                                        required
                                    />

                                </div>
                            )}


                            {/* BUTTONS */}

                            <div className="flex justify-end gap-4">

                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-6 py-3 border rounded-xl hover:bg-gray-100"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
                                >
                                    {editingId
                                        ? "Update Address"
                                        : "Save Address"}
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