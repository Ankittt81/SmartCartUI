import { useEffect, useState } from "react";

import AddCategoryModal
    from "../../components/admin/AddCategoryModal";

import CategoryTreeNode
    from "../../components/admin/CategoryTreeNode";
import { flattenCategories }
    from "../../utils/flattenCategories";

import {

    getCategoryTree,

    addCategory

} from "../../services/categoryService";

function CategoriesPage() {

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [openModal, setOpenModal] = useState(false);



    // =====================================================
    // FETCH CATEGORIES
    // =====================================================

    useEffect(() => {

        fetchCategories();

    }, []);

    const fetchCategories = async () => {

        try {

            const data = await getCategoryTree();

            setCategories(data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);
        }
    };



    // =====================================================
    // SAVE CATEGORY
    // =====================================================

    const handleSaveCategory = async (formData) => {

        try {

            await addCategory(formData);

            await fetchCategories();

            setOpenModal(false);

        } catch (err) {

            console.error(err);
        }
    };



    // =====================================================
    // PARENT CATEGORIES
    // =====================================================

    const parentCategories =
        flattenCategories(categories);



    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="text-2xl font-semibold">

                Loading categories...

            </div>
        );
    }



    // =====================================================
    // UI
    // =====================================================

    return (

        <div>

            {/* HEADER */}

            <div className="flex items-center justify-between mb-10">

                <div>

                    <h1 className="text-4xl font-bold">

                        Categories Management

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Manage marketplace category hierarchy

                    </p>

                </div>

                <button
                    onClick={() => setOpenModal(true)}
                    className="bg-black text-white px-6 py-3 rounded-2xl"
                >

                    + Add Category

                </button>

            </div>



            {/* CATEGORY TREE */}

            <div className="space-y-4">

                {categories.map(category => (

                    <CategoryTreeNode
                        key={category.id}
                        category={category}
                    />

                ))}

            </div>



            {/* MODAL */}

            <AddCategoryModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSave={handleSaveCategory}
                parentCategories={parentCategories}
            />

        </div>
    );
}

export default CategoriesPage;