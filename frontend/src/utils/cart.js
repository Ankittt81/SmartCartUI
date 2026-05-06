export const getCart = () => {
    return JSON.parse(localStorage.getItem("cart")) || [];
};

export const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToCart = (item) => {
    const cart = getCart();

    const existing = cart.find(
        (c) => c.sku === item.sku
    );

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }

    saveCart(cart);
};

export const removeFromCart = (sku) => {
    const cart = getCart().filter((item) => item.sku !== sku);
    saveCart(cart);
};

export const increaseQty = (sku) => {
    const cart = getCart();
    const item = cart.find((i) => i.sku === sku);
    if (item) item.quantity++;
    saveCart(cart);
};

export const decreaseQty = (sku) => {
    const cart = getCart().map((item) =>
        item.sku === sku
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
    );
    saveCart(cart);
};