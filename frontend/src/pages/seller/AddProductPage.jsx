import { useEffect, useState } from "react";

import { createProduct }
    from "../../services/productService";

import { getLeafCategories }
    from "../../services/categoryService.js";

function AddProductPage() {

    // =====================================================
    // PRODUCT STATE
    // =====================================================

    const [product, setProduct] = useState({

        title: "",

        description: "",

        basePrice: "",

        categoryId: ""
    });



    // =====================================================
    // IMAGE
    // =====================================================

    const [image, setImage] = useState(null);



    // =====================================================
    // CATEGORIES
    // =====================================================

    const [categories, setCategories] = useState([]);




    // =====================================================
    // VARIANTS
    // =====================================================

    const [variants, setVariants] = useState([

        {
            sku: "",

            price: "",

            stockQuantity: "",

            attributes: [
                {
                    key: "",
                    value: ""
                }
            ]
        }
    ]);



    // =====================================================
    // FETCH CATEGORIES
    // =====================================================

    useEffect(() => {

        fetchCategories();

    }, []);

    const fetchCategories = async () => {

        try {

            const data =
                await getLeafCategories();

            setCategories(data);

        } catch (err) {

            console.error(err);
        }
    };



    // =====================================================
    // PRODUCT CHANGE
    // =====================================================

    const handleProductChange = (e) => {

        const { name, value } = e.target;

        setProduct(prev => ({

            ...prev,

            [name]: value
        }));

        console.log(name, value);
    };



    // =====================================================
    // VARIANT CHANGE
    // =====================================================

    const handleVariantChange = (

        index,

        field,

        value

    ) => {

        const updated = [...variants];

        updated[index][field] = value;

        setVariants(updated);
    };



    // =====================================================
    // ATTRIBUTE CHANGE
    // =====================================================

    const handleAttributeChange = (

        variantIndex,

        attrIndex,

        field,

        value

    ) => {

        const updated = [...variants];

        updated[variantIndex]
            .attributes[attrIndex][field] = value;

        setVariants(updated);
    };



    // =====================================================
    // ADD ATTRIBUTE
    // =====================================================

    const addAttribute = (variantIndex) => {

        const updated = [...variants];

        updated[variantIndex].attributes.push({

            key: "",

            value: ""
        });

        setVariants(updated);
    };



    // =====================================================
    // ADD VARIANT
    // =====================================================

    const addVariant = () => {

        setVariants(prev => ([

            ...prev,

            {
                sku: "",

                price: "",

                stockQuantity: "",

                attributes: [
                    {
                        key: "",
                        value: ""
                    }
                ]
            }
        ]));
    };



    // =====================================================
    // FORMAT VARIANTS
    // =====================================================

    const formatVariants = () => {

        return variants.map(variant => {

            const attributesMap = {};



            variant.attributes.forEach(attr => {

                if (

                    attr.key.trim() &&
                    attr.value.trim()

                ) {

                    attributesMap[attr.key] =
                        attr.value;
                }
            });



            return {

                sku: variant.sku,

                price:
                    Number(variant.price),

                stockQuantity:
                    Number(
                        variant.stockQuantity
                    ),

                attributes:
                attributesMap
            };
        });
    };



    // =====================================================
    // SUBMIT
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            // ============================================
            // FORMAT VARIANTS
            // ============================================

            const formattedVariants =
                formatVariants();




            // ============================================
            // FINAL PAYLOAD
            // ============================================

            const payload = {

                title: product.title,

                description:
                product.description,

                basePrice:
                    Number(product.basePrice),

                categoryId:
                    parseInt(product.categoryId),

                variants:
                formattedVariants
            };



            // ============================================
            // DEBUG
            // ============================================

            console.log(payload);

            console.log(image);




            // ============================================
            // CREATE PRODUCT
            // ============================================

            await createProduct(

                payload,

                image
            );




            // ============================================
            // SUCCESS
            // ============================================

            alert(
                "Product Created Successfully"
            );



        } catch (err) {

            console.error(err);

            alert(
                "Failed to create product"
            );
        }
    };



    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="max-w-6xl mx-auto">

            <h1 className="text-4xl font-bold mb-10">

                Add Product

            </h1>



            <form
                onSubmit={handleSubmit}
                className="space-y-10"
            >

                {/* ================================================= */}
                {/* PRODUCT INFO */}
                {/* ================================================= */}

                <div className="bg-white rounded-3xl border p-8">

                    <h2 className="text-2xl font-semibold mb-6">

                        Product Information

                    </h2>



                    <div className="grid grid-cols-2 gap-6">

                        <div>

                            <label className="block mb-2">

                                Product Title

                            </label>

                            <input
                                type="text"
                                name="title"
                                value={product.title}
                                onChange={
                                    handleProductChange
                                }
                                className="w-full border rounded-xl px-4 py-3"
                                required
                            />

                        </div>



                        <div>

                            <label className="block mb-2">

                                Base Price

                            </label>

                            <input
                                type="number"
                                name="basePrice"
                                value={product.basePrice}
                                onChange={
                                    handleProductChange
                                }
                                className="w-full border rounded-xl px-4 py-3"
                                required
                            />

                        </div>

                    </div>



                    <div className="mt-6">

                        <label className="block mb-2">

                            Description

                        </label>

                        <textarea
                            name="description"
                            value={product.description}
                            onChange={
                                handleProductChange
                            }
                            rows="5"
                            className="w-full border rounded-xl px-4 py-3"
                        />

                    </div>



                    <div className="mt-6">

                        <label className="block mb-2">

                            Category

                        </label>

                        <select
                            name="categoryId"
                            value={product.categoryId}
                            onChange={
                                handleProductChange
                            }
                            className="w-full border rounded-xl px-4 py-3"
                            required
                        >

                            <option value="">

                                Select Category

                            </option>

                            {categories.map(category => (

                                <option
                                    key={category.categoryId}
                                    value={category.categoryId}
                                >

                                    {category.title}

                                </option>

                            ))}

                        </select>

                    </div>



                    <div className="mt-6">

                        <label className="block mb-2">

                            Product Image

                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>

                                setImage(
                                    e.target.files[0]
                                )
                            }
                            required
                        />

                    </div>

                </div>



                {/* ================================================= */}
                {/* VARIANTS */}
                {/* ================================================= */}

                <div className="bg-white rounded-3xl border p-8">

                    <div className="flex items-center justify-between mb-8">

                        <h2 className="text-2xl font-semibold">

                            Product Variants

                        </h2>

                        <button
                            type="button"
                            onClick={addVariant}
                            className="bg-black text-white px-5 py-3 rounded-xl"
                        >

                            + Add Variant

                        </button>

                    </div>



                    <div className="space-y-8">

                        {variants.map((variant, index) => (

                            <div
                                key={index}
                                className="border rounded-2xl p-6"
                            >

                                <h3 className="text-xl font-semibold mb-5">

                                    Variant {index + 1}

                                </h3>



                                <div className="grid grid-cols-3 gap-4">

                                    <input
                                        type="text"
                                        placeholder="SKU"
                                        value={variant.sku}
                                        onChange={(e) =>
                                            handleVariantChange(
                                                index,
                                                "sku",
                                                e.target.value
                                            )
                                        }
                                        className="border rounded-xl px-4 py-3"
                                    />



                                    <input
                                        type="number"
                                        placeholder="Price"
                                        value={variant.price}
                                        onChange={(e) =>
                                            handleVariantChange(
                                                index,
                                                "price",
                                                e.target.value
                                            )
                                        }
                                        className="border rounded-xl px-4 py-3"
                                    />



                                    <input
                                        type="number"
                                        placeholder="Stock"
                                        value={
                                            variant.stockQuantity
                                        }
                                        onChange={(e) =>
                                            handleVariantChange(
                                                index,
                                                "stockQuantity",
                                                e.target.value
                                            )
                                        }
                                        className="border rounded-xl px-4 py-3"
                                    />

                                </div>



                                {/* ATTRIBUTES */}

                                <div className="mt-6">

                                    <div className="flex items-center justify-between mb-4">

                                        <h4 className="font-medium">

                                            Attributes

                                        </h4>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                addAttribute(index)
                                            }
                                            className="text-blue-600"
                                        >

                                            + Add Attribute

                                        </button>

                                    </div>



                                    <div className="space-y-3">

                                        {variant.attributes.map(

                                            (attr, attrIndex) => (

                                                <div
                                                    key={attrIndex}
                                                    className="grid grid-cols-2 gap-4"
                                                >

                                                    <input
                                                        type="text"
                                                        placeholder="Attribute Name"
                                                        value={attr.key}
                                                        onChange={(e) =>
                                                            handleAttributeChange(
                                                                index,
                                                                attrIndex,
                                                                "key",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="border rounded-xl px-4 py-3"
                                                    />



                                                    <input
                                                        type="text"
                                                        placeholder="Value"
                                                        value={attr.value}
                                                        onChange={(e) =>
                                                            handleAttributeChange(
                                                                index,
                                                                attrIndex,
                                                                "value",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="border rounded-xl px-4 py-3"
                                                    />

                                                </div>
                                            )
                                        )}

                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>

                </div>



                {/* SUBMIT */}

                <button
                    type="submit"
                    className="bg-black text-white px-8 py-4 rounded-2xl text-lg"
                >

                    Create Product

                </button>

            </form>

        </div>
    );
}

export default AddProductPage;