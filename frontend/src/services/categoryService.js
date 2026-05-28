import api from "../api/axiosConfig";


// =====================================================
// ROOT CATEGORIES
// =====================================================

export const getRootCategories = async () => {
        const res =
            await api.get("/categories/root");

        return res.data.data;
    };

// =====================================================
// CHILD CATEGORIES
// =====================================================

export const getChildCategories = async (parentId) => {
        const res =
            await api.get(

                `/categories/${parentId}/children`
            );
        return res.data.data;
    };

// ========================================
// GET CATEGORY TREE
// ========================================

export const getCategoryTree = async () => {

    const res = await api.get("/categories/tree");

    return res.data.data;
};

// ========================================
// ADD CATEGORY
// ========================================

export const addCategory = async (data) => {

    const payload = {

        title: data.name,

        description: data.description,

        parentId:

            data.isParent
                ? null
                : Number(data.parentId)
    };

    const res = await api.post(

        "/categories",
        payload
    );

    return res.data.data;
};

// =====================================================
// GET LEAF CATEGORIES
// =====================================================

export const getLeafCategories = async () => {
        const res = await api.get(
            "/categories/leaf"
        );
        return res.data.data;
    };