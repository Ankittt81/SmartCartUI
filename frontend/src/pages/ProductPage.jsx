import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
    getCategoryTree
} from "../services/categoryService";

import {
    getAllProducts,
    getProductsByCategory
} from "../services/productService";

function ProductPage() {

    // =====================================================
    // NAVIGATION
    // =====================================================

    const navigate = useNavigate();



    // =====================================================
    // STATE
    // =====================================================

    const [categories, setCategories] = useState([]);

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [expandedCategories, setExpandedCategories] =
        useState({});

    const [selectedCategoryId, setSelectedCategoryId] =
        useState(null);



    // =====================================================
    // INITIAL LOAD
    // =====================================================

    useEffect(() => {

        fetchInitialData();

    }, []);

    const fetchInitialData = async () => {

        try {
            console.log("START FETCH");
            const [

                categoryTree,

                allProducts

            ] = await Promise.all([

                getCategoryTree(),

                getAllProducts()
            ]);
            console.log(categoryTree);

            console.log(allProducts);



            setCategories(categoryTree || []);

            setProducts(allProducts || []);
            console.log(allProducts);

        } catch (err) {

            console.error(
                "FETCH INITIAL DATA ERROR",
                err
            );

            if (err.response) {

                console.log(
                    err.response.data
                );
            }

            setProducts([]);

        }finally {

            setLoading(false);
        }
    };



    // =====================================================
    // CATEGORY CLICK
    // =====================================================

    const handleCategoryClick =
        async (categoryId) => {

            try {

                setSelectedCategoryId(categoryId);



                const data =
                    await getProductsByCategory(
                        categoryId
                    );



                setProducts(data || []);

            } catch (err) {

                console.error(err);

                setProducts([]);
            }
        };



    // =====================================================
    // TOGGLE CATEGORY
    // =====================================================

    const toggleCategory =
        (categoryId) => {

            setExpandedCategories(prev => ({

                ...prev,

                [categoryId]:
                    !prev[categoryId]
            }));
        };



    // =====================================================
    // CATEGORY TREE
    // =====================================================

    const renderCategoryTree = (

        categories,

        level = 0

    ) => {

        return categories?.map(category => {

            const isExpanded =
                expandedCategories[
                    category.categoryId
                    ];



            const hasChildren =
                category.children &&
                category.children.length > 0;



            const isSelected =
                selectedCategoryId ===
                category.categoryId;



            return (

                <div
                    key={category.categoryId}
                >

                    {/* CATEGORY ROW */}

                    <div
                        className={`flex items-center justify-between rounded-xl px-4 py-3 cursor-pointer transition mb-1 ${
                            isSelected

                                ? "bg-black text-white"

                                : "hover:bg-gray-100"
                        }`}
                        style={{
                            marginLeft:
                                `${level * 16}px`
                        }}
                    >

                        {/* CATEGORY NAME */}

                        <div
                            className="flex-1"
                            onClick={() =>
                                handleCategoryClick(
                                    category.categoryId
                                )
                            }
                        >

                            {category.title}

                        </div>



                        {/* EXPAND BUTTON */}

                        {hasChildren && (

                            <button
                                onClick={(e) => {

                                    e.stopPropagation();

                                    toggleCategory(
                                        category.categoryId
                                    );
                                }}
                                className="ml-3 w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center"
                            >

                                {isExpanded

                                    ? "−"

                                    : "+"}

                            </button>
                        )}

                    </div>



                    {/* CHILDREN */}

                    {hasChildren &&
                        isExpanded && (

                            <div>

                                {renderCategoryTree(

                                    category.children,

                                    level + 1
                                )}

                            </div>
                        )}

                </div>
            );
        });
    };



    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                <div className="text-2xl font-semibold">

                    Loading...

                </div>

            </div>
        );
    }



    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="min-h-screen bg-gray-100 flex">

            {/* ================================================= */}
            {/* SIDEBAR */}
            {/* ================================================= */}

            <div className="w-[320px] bg-white border-r p-6 overflow-y-auto">

                {/* HEADER */}

                <div className="flex items-center justify-between mb-8">

                    <h2 className="text-2xl font-bold">

                        Categories

                    </h2>



                    <button
                        onClick={async () => {

                            try {

                                setSelectedCategoryId(null);



                                const data =
                                    await getAllProducts();

                                setProducts(data || []);

                            } catch (err) {

                                console.error(err);

                                setProducts([]);
                            }
                        }}
                        className="text-sm bg-gray-100 px-4 py-2 rounded-xl hover:bg-gray-200 transition"
                    >

                        All

                    </button>

                </div>



                {/* CATEGORY TREE */}

                <div className="space-y-1">

                    {renderCategoryTree(categories)}

                </div>

            </div>



            {/* ================================================= */}
            {/* PRODUCT SECTION */}
            {/* ================================================= */}

            <div className="flex-1 p-8">

                {/* HEADER */}

                <div className="mb-10">

                    <h1 className="text-4xl font-bold">

                        Product Catalogue 🛒

                    </h1>



                    <p className="text-gray-500 mt-2">

                        Showing {products?.length || 0} products

                    </p>

                </div>



                {/* EMPTY */}

                {(products?.length || 0) === 0 && (

                    <div className="bg-white rounded-3xl border p-16 text-center">

                        <div className="text-7xl mb-6">

                            📦

                        </div>

                        <h2 className="text-3xl font-bold">

                            No Products Found

                        </h2>

                        <p className="text-gray-500 mt-4">

                            No products available here.

                        </p>

                    </div>
                )}



                {/* PRODUCTS */}

                {(products?.length || 0) > 0 && (

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                        {products?.map(product => (

                            <div
                                key={product.productId}
                                onClick={() =>
                                    navigate(
                                        `/products/${product.productId}`
                                    )
                                }
                                className="bg-white rounded-3xl overflow-hidden border hover:shadow-xl transition duration-300 cursor-pointer"
                            >

                                {/* IMAGE */}

                                <div className="h-72 bg-gray-50 p-6 flex items-center justify-center overflow-hidden">

                                    <img
                                        src={product.imageUrl}
                                        alt={product.title}
                                        className="max-h-full max-w-full object-contain hover:scale-105 transition duration-300"
                                    />

                                </div>



                                {/* CONTENT */}

                                <div className="p-5">

                                    <h2 className="text-xl font-bold line-clamp-2 min-h-[56px]">

                                        {product.title}

                                    </h2>



                                    <p className="text-sm text-gray-500 mt-2 line-clamp-2 min-h-[40px]">

                                        {product.description}

                                    </p>



                                    <div className="mt-4">

                                        <span className="text-2xl font-bold">

                                            ₹ {product.basePrice}

                                        </span>

                                    </div>



                                    <div className="flex items-center justify-between mt-5">

                                        <span className="text-xs text-gray-400">

                                            {product.categoryTitle}

                                        </span>



                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                product.status === "ACTIVE"
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-red-100 text-red-600"
                                            }`}
                                        >

                                            {product.status}

                                        </span>

                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}

export default ProductPage;