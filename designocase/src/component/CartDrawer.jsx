import { ShoppingCart, X } from "lucide-react";

export default function CartDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      <button
        aria-label="Close cart overlay"
        onClick={onClose}
        className="fixed inset-0 z-30 bg-black/40 backdrop-blur-[0.5px]"
      />

      <aside className="fixed right-0 top-0 z-40 h-screen w-full max-w-sm bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Cart</h2>

          <button onClick={onClose} aria-label="Close cart">
            <X size={22} />
          </button>
        </div>

        <div className="py-10 text-center">
          <ShoppingCart
            className="mx-auto mb-4 text-neutral-400"
            size={36}
          />

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
      </aside>
    </>
  );
}