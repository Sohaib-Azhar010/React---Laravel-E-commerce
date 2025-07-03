import { apiUrl } from "../common/http";

const baseUrl = apiUrl?.replace("/api", "") || "";

export const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
};

// Get cart from localStorage
export const getCart = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : {};
};

// Save cart to localStorage

// Add product to cart
export const addToCart = (product) => {
  const cart = getCart();

  const image =
    Array.isArray(product.images) && product.images.length > 0
      ? `${baseUrl}/uploads/products/${product.images[0].image}`
      : `${baseUrl}/uploads/products/large/${product.image || "default.jpg"}`;

  if (cart[product.id]) {
    cart[product.id].quantity += 1;
  } else {
    cart[product.id] = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: image,
      quantity: 1,
    };
  }

  saveCart(cart);
};

// Remove item from cart
export const removeFromCart = (id) => {
  const cart = getCart();
  delete cart[id]; // ✅ Removes the item from object
  saveCart(cart); // ✅ Saves updated cart to localStorage
};

// Clear entire cart
// export const clearCart = () => {
//   localStorage.removeItem("cart");
// };
export const clearCart = () => {
  localStorage.removeItem("cart");
};
