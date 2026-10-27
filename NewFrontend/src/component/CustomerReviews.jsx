import React, { useEffect, useRef, useState } from "react";
import { Star, CheckCircle2, Play } from "lucide-react";

const initialReviews = [
  {
    id: 1,
    name: "Saloni Babel",
    product: "Peach Blossom Case",
    rating: 5,
    text: "Absolutely love the design! It's cute, stylish, and feels great in hand. I've received so many compliments.",
    date: "Verified Buyer · 2 days ago",
  },
  {
    id: 2,
    name: "Priya Sharma",
    product: "Lavender Heart Case",
    rating: 5,
    text: "The quality is amazing and the color looks even better in person. Definitely worth buying! Protection is solid.",
    date: "Verified Buyer · 1 week ago",
  },
  {
    id: 3,
    name: "Ananya Patel",
    product: "Floral Premium Case",
    rating: 5,
    text: "Beautiful design and a perfect fit for my phone. The packaging was lovely too. Delivery was super fast!",
    date: "Verified Buyer · 2 weeks ago",
  },
];

const initialVideos = [
  {
    id: 1,
    name: "Rhea Sen",
    product: "Gingham Love Case",
    src: "/videos/video11.mp4",
    // poster: "/images/6.webp",
  },
  {
    id: 2,
    name: "Aditi Rao",
    product: "Sunny Skies Case",
    src: "/videos/video4.mp4",
    // poster: "/images/3.webp",
  },
  {
    id: 3,
    name: "Meera Nair",
    product: "Blue Flower Case",
    src: "/videos/video12.mp4",
    // poster: "/images/5.webp",
  },
  {
    id: 4,
    name: "Tara Joshi",
    product: "Diet Coke Pop Case",
    src: "/videos/video9.mp4",
    // poster: "/images/newimage.webp",
  },
];

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          fill={star <= rating ? "#ff4d2d" : "transparent"}
          color={star <= rating ? "#ff4d2d" : "#cbd5e1"}
          className="transition-colors"
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <article className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10 hover:border-[#ff4d2d]/50 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <Stars rating={review.rating} />
          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            <CheckCircle2 size={12} />
            Verified
          </span>
        </div>

        <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-600 italic">
          "{review.text}"
        </p>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-3">
        <h4 className="font-['Bagel_Fat_One'] text-sm font-extrabold text-slate-900">
          {review.name}
        </h4>
        <p className="text-xs text-[#ff4d2d] font-bold mt-0.5">
          {review.product}
        </p>
      </div>
    </article>
  );
}

function VideoReviewCard({ review, activeVideoId, onPlay }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (activeVideoId !== review.id) {
      videoRef.current?.pause();
    }
  }, [activeVideoId, review.id]);

  return (
    <article className="w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm hover:shadow-xl hover:shadow-orange-500/10 hover:border-[#ff4d2d]/50 transition-all duration-300 group">
      <div className="relative aspect-[9/16] w-full max-h-[380px] bg-slate-950 overflow-hidden">
        <video
          ref={videoRef}
          src={review.src}
          poster={review.poster}
          controls
          playsInline
          preload="metadata"
          onPlay={() => {
            setIsPlaying(true);
            onPlay(review.id);
          }}
          onPause={() => setIsPlaying(false)}
          className="absolute inset-0 block h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          aria-label={`Video review by ${review.name}`}
        >
          Your browser does not support video playback.
        </video>

        {!isPlaying && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#ff4d2d] to-[#f43f5e] text-white shadow-lg shadow-orange-500/40">
              <Play size={20} className="ml-1 fill-white" />
            </div>
          </div>
        )}
      </div>

      <div className="p-3.5 border-t border-slate-100">
        <h4 className="font-['Bagel_Fat_One'] text-sm font-extrabold text-slate-900">
          {review.name}
        </h4>
        <p className="mt-0.5 text-xs text-[#ff4d2d] font-bold">
          {review.product}
        </p>
      </div>
    </article>
  );
}

export default function CustomerReviews() {
  const [reviews] = useState(initialReviews);
  const [videos] = useState(initialVideos);
  const [activeVideoId, setActiveVideoId] = useState(null);

  return (
    <section
      id="customer-reviews"
      className="bg-gradient-to-b from-white via-orange-50/15 to-white px-3 xs:px-4 sm:px-6 md:px-10 py-14 sm:py-20 border-b border-slate-100"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="text-center">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#ff4d2d]">
            Real Love, Real Style
          </p>

          <h2 className="mt-2 font-['Bagel_Fat_One'] text-3xl xs:text-4xl sm:text-5xl font-normal uppercase leading-tight tracking-tight text-slate-900">
            Customers{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d2d] to-[#f43f5e]">
              Are Saying
            </span>
          </h2>

          <div className="mt-4 flex items-center justify-center gap-3">
            <Stars rating={5} />
            <span className="font-black text-slate-900 text-sm sm:text-base">
              5.0 / 5.0
            </span>
            <span className="text-xs text-slate-500 font-medium">
              (1,400+ Verified Reviews)
            </span>
          </div>

          <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm leading-relaxed text-slate-500 font-medium">
            Discover why thousands of tech lovers protect and style their smartphones with Designo.Case.
          </p>
        </div>

        {/* Written reviews grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Video reviews section */}
        <div className="mt-16 sm:mt-20">
          <div className="text-center mb-8">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#ff4d2d]">
              See it in real life
            </p>

            <h3 className="mt-1.5 font-['Bagel_Fat_One'] text-2xl xs:text-3xl sm:text-4xl text-slate-900 uppercase">
              Video{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d2d] to-[#f43f5e]">
                Reviews
              </span>
            </h3>

            <p className="mt-2 text-xs sm:text-sm text-slate-500 font-medium">
              Watch customers unbox and flaunt their favourite designs.
            </p>
          </div>

          <div className="grid gap-4 xs:gap-5 grid-cols-2 lg:grid-cols-4">
            {videos.map((video) => (
              <VideoReviewCard
                key={video.id}
                review={video}
                activeVideoId={activeVideoId}
                onPlay={setActiveVideoId}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
