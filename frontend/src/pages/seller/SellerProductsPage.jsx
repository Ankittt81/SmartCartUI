import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyProducts } from "../../services/productService";

function SellerProductsPage() {

    // =====================================================
    // NAVIGATION
    // =====================================================

    const navigate = useNavigate();

    // =====================================================
    // STATE
    // =====================================================

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");



    // =====================================================
    // FETCH PRODUCTS
    // =====================================================

    useEffect(() => {

        fetchProducts();

    }, []);

    const fetchProducts = async () => {

        try {

            const data =
                await getMyProducts();

            setProducts(data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);
        }
    };



    // =====================================================
    // FILTER PRODUCTS
    // =====================================================

    const filteredProducts = products.filter(

        product => {

            const keyword =
                search.toLowerCase();




            return (

                product.title
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                product.description
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                product.category?.title
                    ?.toLowerCase()
                    .includes(keyword)
            );
        }
    );



    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="flex items-center justify-center min-h-[60vh]">

                <div className="text-xl font-medium">

                    Loading products...

                </div>

            </div>
        );
    }



    // =====================================================
    // UI
    // =====================================================

    return (

        <div>

            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <div className="flex items-center justify-between mb-8">

                <div>

                    <h1 className="text-4xl font-bold">

                        Products

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Manage your products

                    </p>

                </div>



                {products.length > 0 && (

                    <button
                        onClick={() =>
                            navigate(
                                "/seller/products/add"
                            )
                        }
                        className="bg-black text-white px-6 py-3 rounded-2xl hover:opacity-90 transition"
                    >

                        Add Product

                    </button>

                )}

            </div>



            {/* ================================================= */}
            {/* NO PRODUCTS */}
            {/* ================================================= */}

            {products.length === 0 && (

                <div className="flex items-center justify-center min-h-[70vh]">

                    <div className="bg-white border rounded-3xl p-12 text-center max-w-xl w-full shadow-sm">

                        <div className="text-7xl mb-6">

                            📦

                        </div>

                        <h2 className="text-4xl font-bold">

                            No Products Yet

                        </h2>

                        <p className="text-gray-500 mt-5 text-lg leading-relaxed">

                            Start building your store by
                            adding your first product.

                        </p>

                        <button
                            onClick={() =>
                                navigate(
                                    "/seller/products/add"
                                )
                            }
                            className="mt-8 bg-black text-white px-8 py-4 rounded-2xl hover:opacity-90 transition"
                        >

                            Add New Product

                        </button>

                    </div>

                </div>
            )}



            {/* ================================================= */}
            {/* CONTENT */}
            {/* ================================================= */}

            {products.length > 0 && (

                <>

                    {/* ============================================= */}
                    {/* SEARCH */}
                    {/* ============================================= */}

                    <div className="bg-white rounded-2xl p-5 border mb-8">

                        <input
                            type="text"
                            placeholder="Search by product, category, description..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                        />

                    </div>



                    {/* ============================================= */}
                    {/* NO SEARCH RESULTS */}
                    {/* ============================================= */}

                    {filteredProducts.length === 0 && (

                        <div className="bg-white rounded-3xl border p-12 text-center">

                            <h2 className="text-3xl font-bold">

                                No Matching Products

                            </h2>

                            <p className="text-gray-500 mt-4">

                                Try searching with another keyword.

                            </p>

                        </div>
                    )}



                    {/* ============================================= */}
                    {/* PRODUCTS GRID */}
                    {/* ============================================= */}

                    {filteredProducts.length > 0 && (

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                            {filteredProducts.map(product => (

                                <div
                                    key={product.id}
                                    className="bg-white rounded-3xl border overflow-hidden hover:shadow-xl transition duration-300"
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

                                    <div className="p-6">

                                        {/* TITLE */}

                                        <div className="flex items-start justify-between gap-3">

                                            <h2 className="text-2xl font-bold line-clamp-2">

                                                {product.title}

                                            </h2>



                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                                                    product.status === "ACTIVE"
                                                        ? "bg-green-100 text-green-600"
                                                        : "bg-red-100 text-red-600"
                                                }`}
                                            >

                                                {product.status}

                                            </span>

                                        </div>



                                        {/* DESCRIPTION */}

                                        <p className="text-gray-500 mt-3 line-clamp-2 leading-relaxed">

                                            {product.description}

                                        </p>



                                        {/* INFO */}

                                        <div className="mt-6 space-y-4">

                                            <div className="flex items-center justify-between">

                                                <span className="text-gray-500">

                                                    Price

                                                </span>

                                                <span className="font-semibold text-lg">

                                                    ₹ {product.basePrice}

                                                </span>

                                            </div>



                                            <div className="flex items-center justify-between">

                                                <span className="text-gray-500">

                                                    Category

                                                </span>

                                                <span className="font-medium text-right ml-4">

                                                    {product.category?.title}

                                                </span>

                                            </div>



                                            <div className="flex items-center justify-between">

                                                <span className="text-gray-500">

                                                    Variants

                                                </span>

                                                <span className="font-medium">

                                                    {
                                                        product.variants?.length || 0
                                                    }

                                                </span>

                                            </div>

                                        </div>



                                        {/* ACTIONS */}

                                        <div className="flex gap-3 mt-8">

                                            <button
                                                className="flex-1 bg-black text-white py-3 rounded-xl hover:opacity-90 transition"
                                            >

                                                Edit

                                            </button>



                                            <button
                                                className="flex-1 border border-red-300 text-red-500 py-3 rounded-xl hover:bg-red-50 transition"
                                            >

                                                Delete

                                            </button>

                                        </div>

                                    </div>

                                </div>
                            ))}

                        </div>
                    )}

                </>
            )}

        </div>
    );
}

export default SellerProductsPage;