
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

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-8">
          {designs.map((design) => (
            <a
              key={design.id}
              href={design.link}
              className="group block min-w-0"
            >
              {/* Product image */}
              <div className="flex h-[220px] items-center justify-center overflow-hidden bg-[#f8f8f8] sm:h-[320px] lg:h-[420px]">
                <img
                  src={design.image}
                  alt={design.title}
                  loading="lazy"
                  className="h-full w-full object-contain p-2.5 transition-transform duration-300 group-hover:scale-105 sm:p-0"
                />
              </div>

              {/* Collection title */}
              <div className="flex min-h-[56px] items-center justify-between gap-2 rounded-b-2xl border border-gray-100 bg-white p-3 transition-shadow duration-300 group-hover:shadow-md sm:min-h-[76px] sm:gap-3 sm:px-7 sm:py-4">
                <h3 className="text-xs font-semibold leading-4 text-black underline-offset-2 group-hover:underline sm:text-base sm:leading-5">
                  {design.title}
                </h3>

                {design.arrow === "down" ? (
                  <ArrowDown
                    strokeWidth={1.5}
                    className="h-4 w-4 shrink-0 text-black sm:h-5 sm:w-5"
                  />
                ) : (
                  <ArrowRight
                    strokeWidth={1.5}
                    className="h-4 w-4 shrink-0 text-black transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5"
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
