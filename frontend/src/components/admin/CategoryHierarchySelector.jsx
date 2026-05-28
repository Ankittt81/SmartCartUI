import { useEffect, useState } from "react";

import { formatCategoryTitle }
    from "../../utils/formatText";

function CategoryHierarchySelector({

                                       categories,

                                       onSelect

                                   }) {

    const [levels, setLevels] = useState([categories]);

    const [selectedPath, setSelectedPath] = useState([]);

    useEffect(() => {

        const selectedCategory =
            selectedPath[selectedPath.length - 1];

        onSelect(selectedCategory || null);

    }, [selectedPath]);



    const handleSelect = (levelIndex, categoryId) => {

        const updatedPath =
            selectedPath.slice(0, levelIndex);

        const updatedLevels =
            levels.slice(0, levelIndex + 1);

        const selectedCategory =
            levels[levelIndex].find(

                category =>
                    category.id === Number(categoryId)
            );

        if (!selectedCategory) return;

        updatedPath.push(selectedCategory);

        if (

            selectedCategory.children &&
            selectedCategory.children.length > 0

        ) {

            updatedLevels.push(
                selectedCategory.children
            );
        }

        setSelectedPath(updatedPath);

        setLevels(updatedLevels);
    };



    return (

        <div className="space-y-4">

            {levels.map((levelCategories, index) => (

                <div key={index}>

                    <label className="block mb-2 font-medium">

                        Select Category Level {index + 1}

                    </label>

                    <select
                        className="w-full border border-gray-300 rounded-xl px-4 py-3"
                        onChange={(e) =>
                            handleSelect(
                                index,
                                e.target.value
                            )
                        }
                        defaultValue=""
                    >

                        <option value="">

                            Select Category

                        </option>

                        {levelCategories.map(category => (

                            <option
                                key={category.id}
                                value={category.id}
                            >

                                {formatCategoryTitle(
                                    category.title
                                )}

                            </option>

                        ))}

                    </select>

                </div>

            ))}

        </div>
    );
}

export default CategoryHierarchySelector;