import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Search, ShoppingCart, UserRound, X } from "lucide-react";
import { getCartCount } from "../utils/cartStorage";

export default function Navbar({
  menuOpen,
  setMenuOpen,
  searchOpen,
  setSearchOpen,
  cartOpen,
  setCartOpen,
}) {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(getCartCount());

  useEffect(() => {
    const updateCartCount = () => setCartCount(getCartCount());

    updateCartCount();
    window.addEventListener("cart:updated", updateCartCount);

    return () => window.removeEventListener("cart:updated", updateCartCount);
  }, []);

  return (
    <div className="relative mx-auto max-w-full rounded-t-[28px] bg-white/50 px-4 pb-6 sm:px-6 lg:px-[3.1%]">
      <header className="relative flex h-[70px] items-center justify-between sm:h-[115px]">
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
            onClick={() => navigate("/profile")}
            aria-label="Open profile page"
            className="relative hidden p-1 sm:block"
          >
            <UserRound size={25} strokeWidth={1.8} />
            <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-orange-500" />
          </button>

          <button
            onClick={() => setCartOpen(!cartOpen)}
            aria-label="Shopping cart"
            className="relative rounded-full p-1 hover:bg-neutral-200"
          >
            <ShoppingCart size={25} strokeWidth={1.7} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>
    </div>
  );
}
