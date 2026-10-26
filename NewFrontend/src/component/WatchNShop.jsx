
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Gingham Love Case",
    price: 999,
    originalPrice: 1499,
    discount: "33% OFF",
    video: "/videos/video1.mp4",
    image: "/images/gingham-love.jpg",
  },
  {
    id: 2,
    name: "What The Duck",
    price: 999,
    originalPrice: 1499,
    discount: "33% OFF",
    video: "/videos/video2.mp4",
    image: "/images/what-the-duck.jpg",
  },
  {
    id: 3,
    name: "Blue Flower Case",
    price: 999,
    originalPrice: 1499,
    discount: "33% OFF",
    video: "/videos/video3.mp4",
    image: "/images/blue-flower.jpg",
  },
  {
    id: 4,
    name: "Diet Coke Pop Case",
    price: 999,
    originalPrice: 1499,
    discount: "33% OFF",
    video: "/videos/video4.mp4",
    image: "/images/diet-coke.jpg",
  },
  {
    id: 5,
    name: "Goofy Cat Case",
    price: 999,
    originalPrice: 1499,
    discount: "33% OFF",
    video: "/videos/video5.mp4",
    image: "/images/goofy-cat.jpg",
  },
  {
    id: 6,
    name: "Floral Pop Case",
    price: 1249,
    originalPrice: 1499,
    discount: "17% OFF",
    video: "/videos/video6.mp4",
    image: "/images/floral-pop.jpg",
  },
   {
    id: 7,
    name: "Floral Pop Case",
    price: 1249,
    originalPrice: 1499,
    discount: "17% OFF",
    video: "/videos/video8.mp4",
    image: "/images/floral-pop.jpg",
  },
     {
    id: 8,
    name: "Floral Pop Case",
    price: 1249,
    originalPrice: 1499,
    discount: "17% OFF",
    video: "/videos/video10.mp4",
    image: "/images/floral-pop.jpg",
  },
];

function ProductVideoCard({ product }) {
  return (
    <article className="group relative h-[400px] w-[220px] shrink-0 overflow-hidden rounded-xl bg-gray-200 sm:h-[460px] sm:w-[268px]">
      {/* Product video */}
      <video
        src={product.video}
        poster={product.image}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Discount badge */}
      <span className="absolute left-3 top-3 z-10 rounded-r-md bg-red-700 px-3 py-1 text-xs font-extrabold text-white">
        {product.discount}
      </span>

      {/* Bottom product details */}
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-black/60 p-3 text-white backdrop-blur-sm">
        <img
          src={product.image}
          alt={product.name}
          className="h-12 w-12 shrink-0 rounded-lg border border-white/40 bg-white object-cover"
        />

        <div className="min-w-0">
          <h3 className="truncate text-sm font-bold">
            {product.name}
          </h3>

          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span className="text-sm font-extrabold">
              Rs. {product.price.toLocaleString("en-IN")}.00
            </span>

            <span className="text-xs text-white/60 line-through">
              Rs. {product.originalPrice.toLocaleString("en-IN")}.00
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function WatchNShop() {
  const scrollRef = useRef(null);

  const scrollProducts = (direction) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction * 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full overflow-hidden bg-white px-5 py-7 sm:px-8">
      <h2 className="mb-5 text-center text-2xl font-semibold text-black">
        WATCH N SHOP
      </h2>

      <div className="group/slider relative">
        {/* Previous arrow */}
    
        {/* Product videos */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product) => (
            <ProductVideoCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        {/* Next arrow */}
       
      </div>
    </section>
  );
}
