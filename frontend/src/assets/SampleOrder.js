export const sampleOrders = [
    {
        id: "ORD123",
        totalAmount: 155000,
        status: "CONFIRMED",
        createdAt: "2026-05-01",
        items: [
            {
                sku: "LAP-RED-16GB",
                title: "Gaming Laptop",
                price: 80000,
                quantity: 1,
                image: "https://picsum.photos/200?1"
            },
            {
                sku: "PHONE-IPHONE",
                title: "iPhone",
                price: 75000,
                quantity: 1,
                image: "https://picsum.photos/200?2"
            }
        ]
    },
    {
        id: "ORD124",
        totalAmount: 5000,
        status: "DELIVERED",
        createdAt: "2026-04-20",
        items: [
            {
                sku: "CHAIR-01",
                title: "Chair",
                price: 5000,
                quantity: 1,
                image: "https://picsum.photos/200?3"
            }
        ]
    }
];