export const sampleProductDetails = {
    1: {
        product: {
            id: 1,
            title: "Gaming Laptop",
            description: "High performance gaming laptop",
            basePrice: 75000,
            imageUrl: "https://picsum.photos/500/400?1",
            category: { title: "Laptops" },
            status: "ACTIVE"
        },
        variants: [
            {
                sku: "LAP-RED-16GB",
                attributes: JSON.stringify({ color: "Red", ram: "16GB" }),
                price: 80000,
                status: "ACTIVE"
            }
        ]
    },

    3: {
        product: {
            id: 3,
            title: "iPhone",
            description: "Apple smartphone",
            basePrice: 90000,
            imageUrl: "https://picsum.photos/500/400?2",
            category: { title: "Mobiles" },
            status: "ACTIVE"
        },
        variants: [
            {
                sku: "IPHONE-BLACK-128",
                attributes: JSON.stringify({ color: "Black", storage: "128GB" }),
                price: 95000,
                status: "ACTIVE"
            }
        ]
    },

    2: {
        product: {
            id: 2,
            title: "MacBook",
            description: "Apple laptop",
            basePrice: 120000,
            imageUrl: "https://picsum.photos/500/400?3",
            category: { title: "Laptops" },
            status: "ACTIVE"
        },
        variants: [
            {
                sku: "MAC-SILVER-16",
                attributes: JSON.stringify({ color: "Silver", ram: "16GB" }),
                price: 130000,
                status: "ACTIVE"
            }
        ]
    }
};