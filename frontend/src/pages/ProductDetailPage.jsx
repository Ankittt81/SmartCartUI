import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import {
    getSingleProduct
} from "../services/productService";
import {
    addItemToCart
} from "../services/cartService";
import {
    getVariantsByProductId
} from "../services/variantService";

function ProductDetailPage() {

    // =====================================================
    // ROUTE PARAM
    // =====================================================

    const { id } = useParams();



    // =====================================================
    // STATE
    // =====================================================

    const [product, setProduct] =
        useState(null);

    const [variants, setVariants] =
        useState([]);

    const [selectedAttributes, setSelectedAttributes] =
        useState({});

    const [selectedVariant, setSelectedVariant] =
        useState(null);

    const [loading, setLoading] =
        useState(true);



    // =====================================================
    // FETCH PRODUCT
    // =====================================================

    useEffect(() => {

        fetchProduct();

    }, [id]);



    const fetchProduct = async () => {

        try {

            const [

                productData,

                variantData

            ] = await Promise.all([

                getSingleProduct(id),

                getVariantsByProductId(id)
            ]);



            setProduct(productData);

            setVariants(variantData || []);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);
        }
    };



    // =====================================================
    // EXTRACT VARIANT OPTIONS
    // =====================================================

    const extractVariantOptions = () => {

        const options = {};



        variants.forEach(variant => {

            Object.entries(
                variant.attributes
            ).forEach(([key, value]) => {

                if (!options[key]) {

                    options[key] = new Set();
                }

                options[key].add(value);
            });
        });



        Object.keys(options).forEach(key => {

            options[key] = Array.from(
                options[key]
            );
        });



        return options;
    };



    // =====================================================
    // AUTO SELECT FIRST VARIANT
    // =====================================================

    useEffect(() => {

        if (variants.length === 0) {

            return;
        }



        // already selected
        if (
            Object.keys(
                selectedAttributes
            ).length > 0
        ) {

            return;
        }



        const firstVariant =
            variants[0];



        setSelectedAttributes(
            firstVariant.attributes
        );

    }, [variants]);



    // =====================================================
    // MATCH SELECTED VARIANT
    // =====================================================

    useEffect(() => {

        if (variants.length === 0) {

            return;
        }



        const matchedVariant =
            variants.find(variant => {

                return Object.entries(

                    selectedAttributes

                ).every(([key, value]) => {

                    return (
                        variant.attributes[key]
                        === value
                    );
                });
            });



        setSelectedVariant(
            matchedVariant || null
        );

    }, [

        selectedAttributes,

        variants
    ]);



    // =====================================================
    // VARIANT OPTIONS
    // =====================================================

    const variantOptions =
        extractVariantOptions();



    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                <div className="text-2xl font-semibold">

                    Loading Product...

                </div>

            </div>
        );
    }



    // =====================================================
    // NO PRODUCT
    // =====================================================

    if (!product) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                <div className="text-2xl font-semibold">

                    Product Not Found

                </div>

            </div>
        );
    }

    const handleAddToCart =
        async () => {

            try {

                if(!selectedVariant){

                    alert(
                        "Please select variant"
                    );

                    return;
                }



                await addItemToCart(

                    selectedVariant.variantId,

                    1
                );



                alert(
                    "Added to cart"
                );

            } catch (err) {

                console.error(err);

                alert(
                    "Failed to add item"
                );
            }
        };


    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="min-h-screen bg-gray-100 py-10 px-6">

            <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-sm overflow-hidden">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-10">

                    {/* ========================================= */}
                    {/* IMAGE SECTION */}
                    {/* ========================================= */}

                    <div className="bg-gray-50 rounded-3xl p-10 flex items-center justify-center min-h-[600px]">

                        <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="max-h-[500px] max-w-full object-contain hover:scale-105 transition duration-300"
                        />

                    </div>



                    {/* ========================================= */}
                    {/* PRODUCT INFO */}
                    {/* ========================================= */}

                    <div className="flex flex-col">

                        {/* CATEGORY */}

                        <span className="text-sm text-gray-500 uppercase tracking-wide">

                            {product.categoryTitle}

                        </span>



                        {/* TITLE */}

                        <h1 className="text-5xl font-bold mt-4 leading-tight">

                            {product.title}

                        </h1>



                        {/* PRICE */}

                        <div className="mt-8">

                            <span className="text-4xl font-bold">

                                ₹ {
                                selectedVariant
                                    ? selectedVariant.price
                                    : product.basePrice
                            }

                            </span>

                        </div>



                        {/* STATUS */}

                        <div className="mt-5">

                            <span
                                className={`px-4 py-2 rounded-full text-sm font-medium ${
                                    product.status === "ACTIVE"

                                        ? "bg-green-100 text-green-600"

                                        : "bg-red-100 text-red-600"
                                }`}
                            >

                                {product.status}

                            </span>

                        </div>



                        {/* DESCRIPTION */}

                        <div className="mt-10">

                            <h2 className="text-2xl font-semibold mb-4">

                                Description

                            </h2>

                            <p className="text-gray-600 leading-relaxed text-lg">

                                {product.description}

                            </p>

                        </div>



                        {/* VARIANT OPTIONS */}

                        {Object.entries(variantOptions).length > 0 && (

                            <div className="mt-10 space-y-8">

                                {Object.entries(variantOptions).map(

                                    ([attributeName, values]) => (

                                        <div
                                            key={attributeName}
                                        >

                                            {/* ATTRIBUTE TITLE */}

                                            <h2 className="text-2xl font-semibold mb-4 capitalize">

                                                {attributeName}

                                            </h2>



                                            {/* OPTIONS */}

                                            <div className="flex flex-wrap gap-4">

                                                {values.map(value => {

                                                    const isSelected =
                                                        selectedAttributes[
                                                            attributeName
                                                            ] === value;



                                                    return (

                                                        <button
                                                            key={value}
                                                            onClick={() => {

                                                                setSelectedAttributes(prev => ({

                                                                    ...prev,

                                                                    [attributeName]:
                                                                    value
                                                                }));
                                                            }}
                                                            className={`px-6 py-3 rounded-2xl border transition font-medium ${
                                                                isSelected

                                                                    ? "bg-black text-white border-black"

                                                                    : "bg-white hover:bg-gray-100"
                                                            }`}
                                                        >

                                                            {value}

                                                        </button>
                                                    );
                                                })}

                                            </div>

                                        </div>
                                    )
                                )}

                            </div>
                        )}



                        {/* SELECTED VARIANT */}

                        {selectedVariant && (

                            <div className="mt-8 bg-gray-50 border rounded-2xl p-5">

                                <h2 className="text-xl font-semibold mb-3">

                                    Selected Configuration

                                </h2>



                                <div className="space-y-2 text-gray-700">

                                    <p>

                                        <span className="font-medium">

                                            SKU:

                                        </span>

                                        {" "}

                                        {selectedVariant.sku}

                                    </p>



                                    <p>

                                        <span className="font-medium">

                                            Price:

                                        </span>

                                        {" "}

                                        ₹ {selectedVariant.price}

                                    </p>

                                </div>

                            </div>
                        )}



                        {/* SELLER */}

                        <div className="mt-10">

                            <h2 className="text-2xl font-semibold mb-4">

                                Seller Information

                            </h2>

                            <p className="text-gray-600">

                                Seller ID:
                                {" "}
                                {product.sellerId}

                            </p>

                        </div>



                        {/* ACTION BUTTONS */}

                        <div className="flex gap-4 mt-12">

                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-black text-white py-5 rounded-2xl text-lg font-medium hover:opacity-90 transition"
                            >

                                Add To Cart

                            </button>



                            <button
                                className="flex-1 border border-black py-5 rounded-2xl text-lg font-medium hover:bg-black hover:text-white transition"
                            >

                                Buy Now

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ProductDetailPage;