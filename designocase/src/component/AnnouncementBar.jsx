import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <section className="relative flex min-h-[60px] items-center justify-center bg-[#ff554e] px-10 py-2 text-center">
      <button
        aria-label="Previous promotion"
        className="absolute left-4 top-1/2 -translate-y-1/2 sm:left-[18%]"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="leading-tight">
        <h2 className="text-sm font-bold sm:text-base">
          Flash Sale Buy 1 Get 2 Free
        </h2>

        <p className="mt-1 text-xs sm:text-sm">
          Expires in <strong>11:31:56</strong>
          <span className="mx-2">|</span>
          No Code Required
          <span className="mx-2">|</span>
          <a href="#shop" className="underline">
            Explore Deals
          </a>
          <span className="mx-2">|</span>
          <a href="#terms" className="underline">
            T&C Apply
          </a>
        </p>
      </div>

      <button
        aria-label="Next promotion"
        className="absolute right-4 top-1/2 -translate-y-1/2 sm:right-[18%]"
      >
        <ChevronRight size={20} />
      </button>
    </section>
  );
}