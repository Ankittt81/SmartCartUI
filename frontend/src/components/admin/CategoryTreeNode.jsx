import { useState } from "react";

import {
    ChevronRight,
    ChevronDown
} from "lucide-react";

import { formatCategoryTitle }
    from "../../utils/formatText";

function CategoryTreeNode({

                              category,
                              level = 0

                          }) {

    const [expanded, setExpanded] = useState(true);

    const hasChildren =
        category.children &&
        category.children.length > 0;

    return (

        <div>

            {/* CATEGORY CARD */}

            <div
                className="bg-white border border-gray-100 rounded-3xl px-6 py-5 mb-4 hover:shadow-md transition"
                style={{
                    marginLeft: `${level * 28}px`
                }}
            >

                <div className="flex items-start justify-between">

                    {/* LEFT */}

                    <div className="flex items-start gap-4">

                        {/* EXPAND BUTTON */}

                        {hasChildren ? (

                            <button
                                onClick={() =>
                                    setExpanded(prev => !prev)
                                }
                                className="mt-1 text-gray-600"
                            >

                                {expanded
                                    ? <ChevronDown size={18} />
                                    : <ChevronRight size={18} />
                                }

                            </button>

                        ) : (

                            <div className="w-[18px]" />

                        )}



                        {/* ICON */}

                        <div className="text-3xl">

                            {hasChildren
                                ? "📁"
                                : "📄"}

                        </div>



                        {/* INFO */}

                        <div>

                            <h3 className="text-xl font-semibold">

                                {formatCategoryTitle(
                                    category.title
                                )}

                            </h3>



                            <p className="text-gray-500 mt-1">

                                {category.description ||
                                    "No description available"}

                            </p>



                            <div className="flex items-center gap-3 mt-4">

                                <span className="text-sm text-gray-500">

                                    {hasChildren
                                        ? `${category.children.length} subcategories`
                                        : "Leaf category"}

                                </span>

                            </div>

                        </div>

                    </div>



                    {/* STATUS */}

                    <div>

                        <span
                            className={`px-4 py-2 rounded-full text-sm ${
                                category.status === "ACTIVE"
                                    ? "bg-emerald-100 text-emerald-600"
                                    : "bg-red-100 text-red-600"
                            }`}
                        >

                            {category.status}

                        </span>

                    </div>

                </div>

            </div>



            {/* CHILDREN */}

            {expanded && hasChildren && (

                <div>

                    {category.children.map(child => (

                        <CategoryTreeNode
                            key={child.id}
                            category={child}
                            level={level + 1}
                        />

                    ))}

                </div>

            )}

        </div>
    );
}

export default CategoryTreeNode;