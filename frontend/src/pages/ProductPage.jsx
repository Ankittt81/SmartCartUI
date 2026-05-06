import { useState } from "react";
import { sampleProducts } from "../assets/SampleProduct.js";
import { useNavigate } from "react-router-dom";

function ProductPage() {
    const navigate = useNavigate();
    // 🔥 Products
    const [products] = useState(sampleProducts);

    // 🔥 Hierarchical Categories
    const [categories] = useState([
        {
            id: 1,
            title: "Electronics",
            children: [
                { id: 2, title: "Laptops" },
                { id: 3, title: "Mobiles" }
            ]
        },
        {
            id: 4,
            title: "Furniture",
            children: [
                { id: 5, title: "Chairs" },
                { id: 6, title: "Tables" }
            ]
        }
    ]);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [expanded, setExpanded] = useState({});

    // 🔥 Expand / Collapse
    const toggleExpand = (id) => {
        setExpanded({
            ...expanded,
            [id]: !expanded[id]
        });
    };

    // 🔥 Get valid category names
    const getCategoryTitles = (category) => {
        if (!category) return null;

        // parent → return children
        if (category.children) {
            return category.children.map((child) => child.title);
        }

        // child → return itself
        return [category.title];
    };

    // 🔥 Filter products
    const filteredProducts = selectedCategory
        ? products.filter((p) => {
            const validCategories = getCategoryTitles(selectedCategory);
            return validCategories.includes(p.category?.name);
        })
        : products;

    return (
        <div className="min-h-screen flex bg-gray-100">

            {/* 🔥 SIDEBAR */}
            <div className="w-1/5 bg-white p-4 shadow">

                <h2 className="text-lg font-bold mb-4">Categories</h2>

                {/* ALL */}
                <div
                    onClick={() => setSelectedCategory(null)}
                    className={`p-2 cursor-pointer rounded mb-2 ${
                        selectedCategory === null
                            ? "bg-blue-500 text-white"
                            : "hover:bg-gray-200"
                    }`}
                >
                    All
                </div>

                {/* 🔥 CATEGORY TREE */}
                {categories.map((cat) => (
                    <div key={cat.id}>

                        {/* Parent */}
                        <div
                            className="flex justify-between items-center p-2 cursor-pointer hover:bg-gray-200 rounded"
                            onClick={() => {
                                toggleExpand(cat.id);
                                setSelectedCategory(cat); // 🔥 parent selection
                            }}
                        >
                            <span>{cat.title}</span>
                            <span>{expanded[cat.id] ? "-" : "+"}</span>
                        </div>

                        {/* Children */}
                        {expanded[cat.id] &&
                            cat.children.map((child) => (
                                <div
                                    key={child.id}
                                    onClick={() => setSelectedCategory(child)}
                                    className={`ml-4 p-2 cursor-pointer rounded ${
                                        selectedCategory?.id === child.id
                                            ? "bg-blue-500 text-white"
                                            : "hover:bg-gray-200"
                                    }`}
                                >
                                    {child.title}
                                </div>
                            ))}
                    </div>
                ))}
            </div>

            {/* 🔥 PRODUCT GRID */}
            <div className="w-4/5 p-6">

                <h1 className="text-2xl font-bold mb-6">
                    {selectedCategory
                        ? selectedCategory.title
                        : "Product Catalogue 🛒"}
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => navigate(`/products/${product.id}`)}
                            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer"
                        >
                            <img
                                src={product.imageUrl}
                                alt={product.title}
                                className="w-full h-48 object-cover"
                            />

                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-1">
                                    {product.title}
                                </h2>

                                <p className="text-sm text-gray-500 mb-2">
                                    {product.description}
                                </p>

                                <p className="text-blue-600 font-bold text-lg">
                                    ₹{product.basePrice}
                                </p>

                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-xs text-gray-400">
                                        {product.category?.name}
                                    </span>

                                    <span
                                        className={`px-2 py-1 text-xs rounded ${
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
            </div>
        </div>
    );
}

export default ProductPage;