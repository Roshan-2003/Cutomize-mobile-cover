const ShopNowSection = () => {
  return (
    <div className="w-full">
      {/* Shop Now Button Area */}
      <div className="bg-[#F3F3F3] flex justify-center pb-12">
        <button className="border-2 border-white bg-black/10 hover:bg-black hover:text-white transition-all duration-300 px-10 py-3 uppercase tracking-widest font-semibold text-sm">
          Shop Now
        </button>
      </div>

      {/* Black Promotional Banner */}
      <div className="bg-black text-white py-4 text-center">
        <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2">
          🏎️ New Trackline Edition Phone Cases 🏎️
        </p>
      </div>
    </div>
  );
};

export default ShopNowSection;