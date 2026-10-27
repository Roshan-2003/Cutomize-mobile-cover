
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroCarousel({
  slides,
  activeSlide,
  setActiveSlide,
}) {
  const nextSlide = () => {
    setActiveSlide((current) => (current + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide(
      (current) => (current - 1 + slides.length) % slides.length
    );
  };

  const slide = slides[activeSlide];

  return (
    <section
      id="shop"
      className="relative h-[62vh] min-h-[380px] max-h-[700px] overflow-hidden rounded-[18px] bg-neutral-300 sm:h-[65vh] lg:h-[68vh]"
    >
      <img
        key={slide.image}
        src={slide.image}
        alt={slide.title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/60" />

      <a
        href="#shop"
        className="absolute bottom-[20%] left-5 z-10 rounded-full bg-white px-6 py-4 text-sm font-medium shadow-md transition hover:bg-neutral-200 sm:bottom-[21%] sm:left-16 sm:px-9 sm:text-base"
      >
        {slide.title}
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
          {slides.map((item, index) => (
            <button
              key={item.title}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={
                activeSlide === index ? "true" : undefined
              }
              className={`h-[6px] w-[6px] rounded-full transition-all sm:h-[7px] sm:w-[7px] ${
                activeSlide === index
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
    </section>
  );
}
