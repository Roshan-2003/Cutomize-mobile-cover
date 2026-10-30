
import React from "react";

const collections = [
  {
    id: 1,
    name: "Luxe Leather Collection",
    image: "/images/collections/leather.jpg",
  },
  {
    id: 2,
    name: "Spider-Man Universe",
    image: "/images/collections/spiderman.jpg",
  },
  {
    id: 3,
    name: "F1 Racing Edition",
    image: "/images/collections/formula1.jpg",
  },
  {
    id: 4,
    name: "Good Vibes Collection",
    image: "/images/collections/goodvibes.jpg",
  },
  {
    id: 5,
    name: "Cool Boy Essentials",
    image: "/images/collections/cool-boy1.png",
  },
  {
    id: 6,
    name: "Anime Universe",
    image: "/images/collections/anime1.png",
  },
  {
    id: 7,
    name: "Music Album Collection",
    image: "/images/collections/album1.png",
  },
  {
    id: 8,
    name: "Mixed Mood Collection",
    image: "/images/collections/assorted.jpg",
  },

  {
    id: 10,
    name: "Checkmate Collection",
    image: "/images/collections/checkered.jpg",
  },
  {
    id: 11,
    name: "Retro Y2K Vibes",
    image: "/images/collections/swag1.png",
  },
];

function ShopyByDesign() {
  return (
    <section className="bg-grey-200 px-4 py-12 sm:px-8 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-[1500px]">

        {/* Section Heading */}
        <div className="mb-10">
          <h2 className="font-sans text-[32px] font-bold tracking-tight text-gray-900 sm:text-[42px] lg:text-[52px]">
            Shop By Designs
          </h2>
        </div>

        {/* Collection Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">

          {collections.map((collection) => (
            <div
              key={collection.id}
              className="group cursor-pointer overflow-hidden rounded-2xl"
            >

              {/* Collection Image */}
              <div className="flex h-[250px] w-full items-center justify-center overflow-hidden sm:h-[320px] lg:h-[400px]">

                <img
                  src={collection.image}
                  alt={collection.name}
                  loading="lazy"
                  className="h-full w-full object-contain object-center p-3 transition-transform duration-500 group-hover:scale-105 sm:p-4"
                />

              </div>

              {/* Collection Title */}
              <div className="flex min-h-[65px] items-center justify-between border border-white bg-white shadow-sm rounded-b-2xl  gap-2 bg-white px-3 py-4 sm:px-5 sm:py-5">

                <h3 className="text-sm font-semibold tracking-tight text-gray-900 transition-all duration-300 group-hover:underline sm:text-base">
                  {collection.name}
                </h3>

                <span className="shrink-0 text-xl font-light text-gray-900 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>

              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default ShopyByDesign;
