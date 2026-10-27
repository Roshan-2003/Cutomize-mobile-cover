
import { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroCarousel({
  slides,
  activeSlide,
  setActiveSlide,
}) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 7500);

    return () => clearTimeout(timeout);
  }, [activeSlide, setActiveSlide, slides.length]);

  const nextSlide = () => {
    setActiveSlide((current) => (current + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide(
      (current) => (current - 1 + slides.length) % slides.length
    );
  };

  return (
    <section
      id="shop"
      className="relative h-[62vh] min-h-[380px] max-h-[700px] overflow-hidden sm:h-[65vh] lg:h-[68vh]"
    >
      {slides.map((item, index) => {
        const slideOffset = (index - activeSlide + slides.length) % slides.length;
        const offset =
          slideOffset > Math.floor(slides.length / 2)
            ? slideOffset - slides.length
            : slideOffset;
        const isActive = index === activeSlide;

        return (
          <div
            key={item.title}
            className="absolute left-1/2 top-0 h-full w-[94%] overflow-hidden rounded-[18px] bg-neutral-300 transition-transform duration-700 ease-in-out motion-reduce:transition-none"
            style={{
              transform: `translateX(calc(-50% + ${offset * 100}% + ${offset * 20}px))`,
              zIndex: isActive ? 2 : 1,
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              draggable="false"
              onClick={() => !isActive && setActiveSlide(index)}
              className={`absolute inset-0 h-full w-full object-cover ${
                isActive ? "" : "cursor-pointer"
              }`}
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/60" />

            {isActive && (
              <>
                <a
                  href="#shop"
                  className="absolute bottom-[20%] left-5 z-10 rounded-full bg-white px-6 py-4 text-sm font-medium shadow-md transition hover:bg-neutral-200 sm:bottom-[21%] sm:left-16 sm:px-9 sm:text-base"
                >
                  {item.title}
                </a>

                <div className="absolute inset-x-0 bottom-0 flex h-[100px] items-center justify-between border-t border-white/20 px-6 sm:px-16">
                  <button
                    onClick={prevSlide}
                    aria-label="Previous slide"
                    className="text-white transition hover:scale-110"
                  >
                    <ChevronLeft size={27} strokeWidth={1.4} />
                  </button>

                  <div className="flex items-center gap-4">
                    {slides.map((dotSlide, dotIndex) => (
                      <button
                        key={dotSlide.title}
                        onClick={() => setActiveSlide(dotIndex)}
                        aria-label={`Go to slide ${dotIndex + 1}`}
                        aria-current={
                          activeSlide === dotIndex ? "true" : undefined
                        }
                        className={`h-[6px] w-[6px] rounded-full transition-all sm:h-[7px] sm:w-[7px] ${
                          activeSlide === dotIndex
                            ? "scale-125 bg-transparent ring-2 ring-white ring-offset-2 ring-offset-transparent"
                            : "bg-white"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="text-white transition hover:scale-110"
                  >
                    <ChevronRight size={27} strokeWidth={1.4} />
                  </button>
                </div>
              </>
            )}
          </div>
        );
      })}
    </section>
  );
}
