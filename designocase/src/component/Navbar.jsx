import {
  Menu,
  Search,
  ShoppingCart,
  Zap,
  X,
} from "lucide-react";

export default function Navbar({
  menuOpen,
  setMenuOpen,
  searchOpen,
  setSearchOpen,
  cartOpen,
  setCartOpen,
}) {
  return (
    <header className="relative flex h-[100px] items-center justify-between sm:h-[115px]">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        className="z-20 rounded-full p-2 transition hover:bg-neutral-200"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <a
        href="/"
        className="absolute left-1/2 -translate-x-1/2 uppercase whitespace-nowrap font-serif text-lg tracking-[-0.7px] sm:text-xl"
      >
        Designo Case
      </a>

      <div className="ml-auto flex items-center gap-4 sm:gap-7">
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          aria-label="Search"
          className="rounded-full p-1 hover:bg-neutral-200"
        >
          <Search size={25} strokeWidth={1.7} />
        </button>

        <button
          onClick={() => setCartOpen(!cartOpen)}
          aria-label="Flash sale"
          className="relative hidden p-1 sm:block"
        >
          <Zap size={25} strokeWidth={1.8} />
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-orange-500" />
        </button>

        <button
          onClick={() => setCartOpen(!cartOpen)}
          aria-label="Shopping cart"
          className="rounded-full p-1 hover:bg-neutral-200"
        >
          <ShoppingCart size={25} strokeWidth={1.7} />
        </button>
      </div>
    </header>
  );
}