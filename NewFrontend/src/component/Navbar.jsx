import React from 'react'
import { useState } from "react";

import {
  Search,
  UserRound,
  ShoppingBag,

  Menu,
} from "lucide-react";

function Navbar() {
      const [menuOpen, setMenuOpen] = useState(false);
    
        const links = [
    "Home",
    "Best Seller",
    "Collection",
    "Accessories",
    "Contact",
  ];
  return (
     <nav className="relative flex min-h-[64px] items-center justify-between bg-[#f45d19] px-5 py-3 text-white md:px-10">
      <button
        className="md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        <Menu size={24} />
      </button>

      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } absolute left-0 top-full z-20 w-full flex-col gap-4 bg-[#f45d19] p-5 md:static md:flex md:w-auto md:flex-row md:items-center md:gap-6 md:bg-transparent md:p-0`}
      >
        {links.map((link) => (
          <a
            key={link}
            href="#home"
            className="text-sm font-extrabold transition hover:opacity-75"
            onClick={() => setMenuOpen(false)}
          >
            {link}
          </a>
        ))}
      </div>

    <a
  href="#home"
  className="absolute left-1/2 -translate-x-1/2 text-2xl font-black tracking-tighter"
>
  Designo.Case
</a>

      <div className="ml-auto flex items-center gap-4 md:gap-6">
        <button aria-label="Search">
          <Search size={21} />
        </button>
        <button className="hidden sm:block" aria-label="Account">
          <UserRound size={21} />
        </button>
        <button aria-label="Shopping bag">
          <ShoppingBag size={21} />
        </button>
      </div>
    </nav>
  )
}

export default Navbar
