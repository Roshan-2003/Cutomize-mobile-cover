export const CATEGORY_PRESETS = [
  {
    name: "Glass Cases",
    slug: "glass",
    image:
      "https://culltique.in/cdn/shop/files/case-website-mockup-1-1-21.jpg?v=1790703288&width=990",
  },
  {
    name: "Stride Cases",
    slug: "stride",
    image:
      "https://images.dailyobjects.com/marche/product-images/1101/dailyobjects-technicolour-stride-2-0-magsafe-case-cover-for-iphone-17-pro-images/Technicolour-Stride-2-0-magsafe-Case-Cover-For-iPhone-17-pro.png?tr=cm-pad_resize,v-3,q-auto,f-auto,w-1080,dpr-1",
  },
  {
    name: "Silicon Cases",
    slug: "silicon",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MM2C3?wid=2000&hei=2000&fmt=jpeg&qlt=90",
  },
  {
    name: "Card Wallet",
    slug: "wallet",
    image: "https://images.mobilefun.co.uk/graphics/450pixelp/86971.jpg",
  },
  {
    name: "Pop Slider",
    slug: "pop-slider",
    image: "https://m.media-amazon.com/images/I/41e9tBKro8L.jpg",
  },
  {
    name: "Printed Cases",
    slug: "printed",
    image:
      "https://cdn.nortvi.com/spai/q_glossy+ret_img+to_auto/nortvi.com/wp-content/uploads/2025/10/iPhone-17-ProMax-MidnightBlack4096px-1-2048x2048.jpg",
  },
];

export const DEFAULT_PRODUCT_CATEGORIES = [
  "Glass Cases",
  "Stride Cases",
  "Silicon Cases",
  "Card Wallet",
  "Pop Slider",
  "Printed Cases",
  "Premium Tough Cases",
  "Leather Cases",
  "CHAOS Drops",
  "New iPhone 17 Series",
];

export const getProductCategoryOptions = (categories = [], currentCategory = "") => {
  const dynamicNames = Array.isArray(categories)
    ? categories.map((category) => category?.name).filter(Boolean)
    : [];

  const names = [
    ...DEFAULT_PRODUCT_CATEGORIES,
    ...dynamicNames,
    currentCategory,
  ].filter(Boolean);

  const seen = new Set();
  const result = [];
  for (const name of names) {
    const trimmed = name.trim();
    const key = trimmed.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      result.push(trimmed);
    }
  }

  return result;
};
