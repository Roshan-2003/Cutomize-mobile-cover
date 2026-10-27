import { Search, X } from "lucide-react";

export default function SearchPanel({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="absolute left-4 right-4 top-20 z-30 flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-xl sm:left-8 sm:right-8">
      <Search size={20} />

      <input
        autoFocus
        type="search"
        placeholder="Search phone cases and accessories..."
        className="w-full bg-transparent text-sm outline-none"
      />

      <button onClick={onClose} aria-label="Close search">
        <X size={20} />
      </button>
    </div>
  );
}