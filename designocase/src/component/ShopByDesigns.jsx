
import { ArrowRight, ArrowDown } from "lucide-react";

const designs = [
  {
    id: 1,
    title: "Vegan Leather Edit",
    image: "/images/vegan-leather.png",
    link: "/collections/vegan-leather",
    arrow: "right",
  },
  {
    id: 2,
    title: "Spider-Man Brand New Day",
    image: "/images/spiderman.png",
    link: "/collections/spider-man-brand-new-day",
    arrow: "down",
  },
  {
    id: 3,
    title: "Formula 1 Drop",
    image: "/images/formula-1.png",
    link: "/collections/formula-1",
    arrow: "right",
  },
  {
    id: 4,
    title: "Happy Hour Collection",
    image: "/images/happy-hour.png",
    link: "/collections/happy-hour",
    arrow: "right",
  },
];

export default function ShopByDesigns() {
  return (
    <section className="bg-[#f8f8f8] px-4 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1500px]">
        <h2 className="mb-10 text-3xl font-bold tracking-tight text-[#171717] sm:text-4xl lg:text-[52px]">
          Shop By Designs
        </h2>

        <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {designs.map((design) => (
            <a
              key={design.id}
              href={design.link}
              className="group block min-w-0"
            >
              {/* Product image */}
              <div className="flex h-[360px] items-center justify-center overflow-hidden bg-[#f8f8f8] sm:h-[390px] lg:h-[420px]">
                <img
                  src={design.image}
                  alt={design.title}
                  loading="lazy"
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Collection title */}
              <div className="flex min-h-[76px] items-center justify-between gap-3 rounded-b-2xl border border-gray-100 bg-white px-5 py-4 transition-shadow duration-300 group-hover:shadow-md sm:px-7">
                <h3 className="text-sm font-semibold leading-5 text-black underline-offset-2 group-hover:underline sm:text-base">
                  {design.title}
                </h3>

                {design.arrow === "down" ? (
                  <ArrowDown
                    size={20}
                    strokeWidth={1.5}
                    className="shrink-0 text-black"
                  />
                ) : (
                  <ArrowRight
                    size={20}
                    strokeWidth={1.5}
                    className="shrink-0 text-black transition-transform duration-300 group-hover:translate-x-1"
                  />
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
