import { formatCategoryTitle } from "../../utils/formatText";

function CategoryRow({

                         category,
                         level = 0

                     }) {

    return (

        <>
            <tr className="border-b border-gray-100">

                {/* CATEGORY TITLE */}

                <td className="px-6 py-5">

                    <div
                        className="font-medium"
                        style={{
                            paddingLeft: `${level * 35}px`
                        }}
                    >

                        {formatCategoryTitle(category.title)}

                    </div>

                </td>



                {/* CATEGORY TYPE */}

                <td className="px-6 py-5">

                    <span
                        className={`px-4 py-2 rounded-full text-sm ${
                            level === 0
                                ? "bg-blue-100 text-blue-600"
                                : "bg-emerald-100 text-emerald-600"
                        }`}
                    >

                        {level === 0
                            ? "Parent"
                            : "Child"}

                    </span>

                </td>



                {/* CHILD COUNT */}

                <td className="px-6 py-5 text-gray-600">

                    {category.children?.length || 0}

                </td>

            </tr>



            {/* RECURSIVE CHILDREN */}

            {category.children?.map(child => (

                <CategoryRow
                    key={child.id}
                    category={child}
                    level={level + 1}
                />

            ))}

        </>
    );
}

export default CategoryRow;