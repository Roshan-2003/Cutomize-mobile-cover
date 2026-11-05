import { useEffect, useState } from "react";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import {
  getCartItems,
  getCartTotal,
  removeCartItem,
  updateCartItemQty,
} from "../utils/cartStorage";

export default function CartDrawer({ isOpen, onClose }) {
  const [items, setItems] = useState(getCartItems());

  useEffect(() => {
    const syncCart = () => setItems(getCartItems());

    syncCart();
    window.addEventListener("cart:updated", syncCart);

    return () => window.removeEventListener("cart:updated", syncCart);
  }, []);

  if (!isOpen) return null;

  const subtotal = getCartTotal();

  return (
    <>
      <button
        aria-label="Close cart overlay"
        onClick={onClose}
        className="fixed inset-0 z-30 bg-black/40 backdrop-blur-[0.5px]"
      />

      <aside className="fixed right-0 top-0 z-40 flex h-screen w-full max-w-sm flex-col bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Cart</h2>

          <button onClick={onClose} aria-label="Close cart">
            <X size={22} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
            <ShoppingCart className="mx-auto mb-4 text-neutral-400" size={36} />

            <p className="text-sm text-neutral-600">
              Your cart is currently empty.
            </p>

            <button
              onClick={onClose}
              className="mt-5 bg-black px-6 py-3 text-sm text-white hover:bg-neutral-700"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto pr-1">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.selectedModel}`}
                  className="flex gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-3"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-20 w-20 rounded-xl object-cover"
                  />

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-neutral-900">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-neutral-500">
                          {item.selectedModel}
                        </p>
                      </div>

                      <button
                        onClick={() => removeCartItem(item.id, item.selectedModel)}
                        aria-label="Remove item from cart"
                        className="text-neutral-400 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-2 py-1">
                        <button
                          onClick={() =>
                            updateCartItemQty(
                              item.id,
                              item.selectedModel,
                              Number(item.quantity || 1) - 1,
                            )
                          }
                          aria-label="Decrease quantity"
                          className="flex h-6 w-6 items-center justify-center text-neutral-700"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="min-w-6 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCartItemQty(
                              item.id,
                              item.selectedModel,
                              Number(item.quantity || 1) + 1,
                            )
                          }
                          aria-label="Increase quantity"
                          className="flex h-6 w-6 items-center justify-center text-neutral-700"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <span className="text-sm font-semibold text-neutral-900">
                        ₹{(Number(item.price) * Number(item.quantity || 1)).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-neutral-200 pt-4">
              <div className="mb-4 flex items-center justify-between text-sm text-neutral-700">
                <span>Subtotal</span>
                <span className="text-base font-semibold text-neutral-900">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-neutral-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}