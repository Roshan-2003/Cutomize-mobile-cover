export const CART_STORAGE_KEY = "designocase_cart";

export function getCartItems() {
  if (typeof window === "undefined") return [];

  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  } catch {
    return [];
  }
}

export function saveCartItems(items) {
  if (typeof window === "undefined") return items;

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("cart:updated"));
  return items;
}

export function addProductToCart(product, options = {}) {
  const { selectedModel = "Standard", quantity = 1 } = options;
  const items = getCartItems();
  const productId = product?._id || product?.id || product?.title;

  const existingItem = items.find(
    (item) => item.id === productId && item.selectedModel === selectedModel,
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    items.push({
      id: productId,
      title: product.title,
      price: Number(product.price) || 0,
      originalPrice: product.originalPrice != null ? Number(product.originalPrice) : null,
      image: product.image,
      category: product.category || "Premium Case",
      selectedModel,
      quantity,
    });
  }

  return saveCartItems(items);
}

export function updateCartItemQty(itemId, selectedModel, quantity) {
  const items = getCartItems().map((item) => {
    if (item.id === itemId && item.selectedModel === selectedModel) {
      const nextQty = Math.max(0, Number(quantity) || 0);
      return { ...item, quantity: nextQty };
    }
    return item;
  });

  const filteredItems = items.filter((item) => item.quantity > 0);
  return saveCartItems(filteredItems);
}

export function removeCartItem(itemId, selectedModel) {
  const filteredItems = getCartItems().filter(
    (item) => !(item.id === itemId && item.selectedModel === selectedModel),
  );

  return saveCartItems(filteredItems);
}

export function getCartCount() {
  return getCartItems().reduce((total, item) => total + Number(item.quantity || 0), 0);
}

export function getCartTotal() {
  return getCartItems().reduce(
    (total, item) => total + Number(item.price || 0) * Number(item.quantity || 1),
    0,
  );
}
