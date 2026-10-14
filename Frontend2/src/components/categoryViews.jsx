const categoryViews = {
  tough: {
    title: "Premium Tough Cases",
    products: products.filter(
      (product) => product.category === "Premium Tough Cases"
    ),
  },
  leather: {
    title: "Premium Leather Cases",
    products: products.filter(
      (product) => product.category === "Leather Cases"
    ),
  },
  chaos: {
    title: "CHAOS – Our Newest Drops",
    products: products.filter(
      (product) => product.category === "CHAOS Drops"
    ),
  },
  iphone17: {
    title: "New iPhone 17 Series",
    products: iphone17Series,
  },
  glass: {
    title: "Glass Cases",
    products: products.filter(
      (product) => product.category === "Glass Cases"
    ),
  },
  stride: {
    title: "Stride Cases",
    products: products.filter(
      (product) => product.category === "Stride Cases"
    ),
  },
  silicon: {
    title: "Silicon Cases",
    products: products.filter(
      (product) => product.category === "Silicon Cases"
    ),
  },
  wallet: {
    title: "Card Wallet",
    products: products.filter(
      (product) => product.category === "Card Wallet"
    ),
  },
  "pop-slider": {
    title: "Pop Slider",
    products: products.filter(
      (product) => product.category === "Pop Slider"
    ),
  },
  printed: {
    title: "Printed Cases",
    products: products.filter(
      (product) => product.category === "Printed Cases"
    ),
  },
};

const selectedCategory = categoryViews[searchParams.get("cat")];