export const flattenCategories = (

    categories,
    parentPath = ""

) => {

    let result = [];

    categories.forEach(category => {

        const fullPath = parentPath
            ? `${parentPath} > ${category.title}`
            : category.title;

        result.push({

            id: category.id,

            title: category.title,

            fullPath
        });



        if (

            category.children &&
            category.children.length > 0

        ) {

            result = [

                ...result,

                ...flattenCategories(

                    category.children,
                    fullPath
                )
            ];
        }
    });

    return result;
};