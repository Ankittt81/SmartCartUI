import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { sampleProductDetails } from "../assets/sampleProductDetail";
import { addToCart } from "../utils/cart";

function ProductDetailPage() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [variants, setVariants] = useState([]);
    const [selectedVariant, setSelectedVariant] = useState(null);

    // ✅ Only one useEffect
    useEffect(() => {
        console.log("Loading product for id:", id);

        const data = sampleProductDetails[Number(id)];

        if (data) {
            setProduct(data.product);
            setVariants(data.variants);
            setSelectedVariant(data.variants[0]);
        } else {
            console.log("No product found for id:", id);
        }
    }, [id]);

    if (!product) return <p className="p-6">Loading...</p>;

    const getAttributes = (variant) => {
        try {
            return JSON.parse(variant.attributes);
        } catch {
            return {};
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6 flex gap-10">

                {/* LEFT IMAGE */}
                <div className="w-1/2">
                    <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full rounded-lg"
                    />
                </div>

                {/* RIGHT SIDE */}
                <div className="w-1/2">

                    <h1 className="text-2xl font-bold mb-2">
                        {product.title}
                    </h1>

                    <p className="text-sm text-gray-400 mb-2">
                        Category: {product.category?.title}
                    </p>

                    <p className="text-gray-600 mb-4">
                        {product.description}
                    </p>

                    <p className="text-2xl text-blue-600 font-bold mb-4">
                        ₹{selectedVariant?.price || product.basePrice}
                    </p>

                    {/* VARIANTS */}
                    <div className="mb-4">
                        <h3 className="font-semibold mb-2">Select Variant:</h3>

                        <div className="flex flex-wrap gap-2">
                            {variants.map((variant) => {
                                const attrs = getAttributes(variant);

                                return (
                                    <button
                                        key={variant.sku}
                                        onClick={() => setSelectedVariant(variant)}
                                        className={`px-3 py-1 border rounded ${
                                            selectedVariant?.sku === variant.sku
                                                ? "bg-blue-500 text-white"
                                                : "bg-white"
                                        }`}
                                    >
                                        {Object.values(attrs).map((val, i) => (
                                            <span key={i} className="mr-1">
                                                {val}
                                            </span>
                                        ))}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <p className="text-sm mb-4">
                        Status: {selectedVariant?.status || product.status}
                    </p>

                    <button
                        onClick={() => {
                            addToCart({
                                sku: selectedVariant.sku,
                                title: product.title,
                                price: selectedVariant.price,
                                image: product.imageUrl
                            });
                            alert("Added to cart ✅");
                        }}
                        className="w-full bg-blue-500 text-white p-3 rounded-lg"
                    >
                        Add to Cart 🛒
                    </button>

                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;