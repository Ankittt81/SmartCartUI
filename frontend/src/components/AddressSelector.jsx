import { useState, useEffect } from "react";
import { getAddresses, addAddress, deleteAddress } from "../utils/address";

function AddressSelector({ onSelect }) {
    const [addresses, setAddresses] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [newAddress, setNewAddress] = useState("");

    useEffect(() => {
        const data = getAddresses();
        setAddresses(data);

        if (data.length > 0) {
            setSelectedId(data[0].id);
            onSelect(data[0]);
        }
    }, []);

    const handleAdd = () => {
        if (!newAddress.trim()) return;

        const added = addAddress({ text: newAddress });

        const updated = [...addresses, added];
        setAddresses(updated);
        setNewAddress("");
    };

    return (
        <div>

            <h3 className="font-semibold mb-3">Select Address</h3>

            {/* Address List */}
            {addresses.map((addr) => (
                <div
                    key={addr.id}
                    className="border p-3 rounded mb-2 flex justify-between"
                >
                    <div>
                        <input
                            type="radio"
                            checked={selectedId === addr.id}
                            onChange={() => {
                                setSelectedId(addr.id);
                                onSelect(addr);
                            }}
                        />
                        <span className="ml-2">{addr.text}</span>
                    </div>

                    <button
                        onClick={() => {
                            deleteAddress(addr.id);
                            setAddresses(getAddresses());
                        }}
                        className="text-red-500 text-sm"
                    >
                        Delete
                    </button>
                </div>
            ))}

            {/* Add New */}
            <div className="mt-4">
        <textarea
            placeholder="Add new address"
            className="w-full border p-2 rounded"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
        />

                <button
                    onClick={handleAdd}
                    className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
                >
                    Add Address
                </button>
            </div>

        </div>
    );
}

export default AddressSelector;