import { X } from "lucide-react";

const navigationItems = [
  "Home",
  "Shop All",
  "Phone Cases",
  "MagSafe Wallets",
  "Accessories",
  "Best Sellers",
  "Contact Us",
];

export default function NavigationDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      <button
        aria-label="Close navigation overlay"
        onClick={onClose}
        className="fixed inset-0 z-30 bg-black/30"
      />

      <nav className="absolute left-0 top-0 z-40 min-h-[400px] w-[290px] rounded-br-2xl bg-white p-7 shadow-2xl">
        <div className="mb-8 flex items-center justify-between">
          <span className="font-serif text-lg">
            THE CASE FACTORY
          </span>

          <button onClick={onClose} aria-label="Close menu">
            <X size={22} />
          </button>
        </div>

        <div className="flex flex-col gap-1">
          {navigationItems.map((item) => (
            <a
              key={item}
              href="#shop"
              onClick={onClose}
              className="border-b border-neutral-100 py-3 text-sm transition hover:pl-2 hover:text-neutral-500"
            >
              {item}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}