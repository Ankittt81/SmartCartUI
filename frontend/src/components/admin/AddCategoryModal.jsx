import { useEffect, useState } from "react";

import CategoryHierarchySelector
    from "./CategoryHierarchySelector";

function AddCategoryModal({

                              open,
                              onClose,
                              onSave,
                              parentCategories

                          }) {

    const [formData, setFormData] = useState({

        name: "",

        description: "",

        isParent: true,

        parentId: ""
    });

    const [selectedParent, setSelectedParent] =
        useState(null);



    // =====================================================
    // RESET FORM
    // =====================================================

    useEffect(() => {

        if (!open) {

            setFormData({

                name: "",

                description: "",

                isParent: true,

                parentId: ""
            });

            setSelectedParent(null);
        }

    }, [open]);



    // =====================================================
    // CLOSE MODAL
    // =====================================================

    if (!open) return null;



    // =====================================================
    // HANDLE CHANGE
    // =====================================================

    const handleChange = (e) => {

        const {

            name,
            value,
            type,
            checked

        } = e.target;

        setFormData(prev => ({

            ...prev,

            [name]:

                type === "checkbox"
                    ? checked
                    : value
        }));
    };



    // =====================================================
    // HANDLE SUBMIT
    // =====================================================

    const handleSubmit = (e) => {

        e.preventDefault();

        onSave(formData);
    };



    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">

            <div className="bg-white rounded-3xl w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto">

                {/* HEADER */}

                <div className="flex items-center justify-between mb-8">

                    <h2 className="text-3xl font-bold">

                        Add Category

                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-500 text-3xl"
                    >

                        ×

                    </button>

                </div>



                {/* FORM */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {/* CATEGORY NAME */}

                    <div>

                        <label className="block mb-2 font-medium">

                            Category Name *

                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter category name"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
                            required
                        />

                    </div>



                    {/* DESCRIPTION */}

                    <div>

                        <label className="block mb-2 font-medium">

                            Description

                        </label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter category description"
                            rows="4"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black resize-none"
                        />

                    </div>



                    {/* IS PARENT */}

                    <div className="flex items-center gap-3">

                        <input
                            type="checkbox"
                            name="isParent"
                            checked={formData.isParent}
                            onChange={(e) => {

                                handleChange(e);

                                if (e.target.checked) {

                                    setSelectedParent(null);

                                    setFormData(prev => ({

                                        ...prev,

                                        parentId: ""
                                    }));
                                }
                            }}
                            className="w-5 h-5"
                        />

                        <label className="font-medium">

                            Is Parent Category?

                        </label>

                    </div>



                    {/* HIERARCHY SELECTOR */}

                    {!formData.isParent && (

                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">

                            <label className="block mb-4 font-semibold">

                                Select Parent Hierarchy

                            </label>

                            <CategoryHierarchySelector
                                categories={parentCategories}
                                onSelect={(category) => {

                                    setSelectedParent(category);

                                    setFormData(prev => ({

                                        ...prev,

                                        parentId:
                                            category?.id || ""
                                    }));
                                }}
                            />



                            {/* SELECTED PARENT */}

                            {selectedParent && (

                                <div className="mt-5 bg-white border border-gray-200 rounded-xl p-4">

                                    <p className="text-sm text-gray-500 mb-1">

                                        Selected Parent

                                    </p>

                                    <h3 className="font-semibold text-lg">

                                        {selectedParent.title}

                                    </h3>

                                    <p className="text-gray-500 text-sm mt-1">

                                        {selectedParent.description ||
                                            "No description available"}

                                    </p>

                                </div>

                            )}

                        </div>

                    )}



                    {/* BUTTONS */}

                    <div className="flex justify-end gap-4 pt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 rounded-xl border border-gray-300"
                        >

                            Cancel

                        </button>

                        <button
                            type="submit"
                            className="bg-black text-white px-6 py-3 rounded-xl"
                        >

                            Save Category

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddCategoryModal;