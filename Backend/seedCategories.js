const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const Category = require("./models/Category");

const categories = [
  {
    name: "Glass Cases",
    slug: "glass",
    image:
      "https://culltique.in/cdn/shop/files/case-website-mockup-1-1-21.jpg?v=1790703288&width=990",
    images: [
      "https://culltique.in/cdn/shop/files/case-website-mockup-1-1-21.jpg?v=1790703288&width=990",
    ],
    description: "Premium tempered glass cases with high gloss finish.",
  },
  {
    name: "Stride Cases",
    slug: "stride",
    image:
      "https://images.dailyobjects.com/marche/product-images/1101/dailyobjects-technicolour-stride-2-0-magsafe-case-cover-for-iphone-17-pro-images/Technicolour-Stride-2-0-magsafe-Case-Cover-For-iPhone-17-pro.png?tr=cm-pad_resize,v-3,q-auto,f-auto,w-1080,dpr-1",
    images: [
      "https://images.dailyobjects.com/marche/product-images/1101/dailyobjects-technicolour-stride-2-0-magsafe-case-cover-for-iphone-17-pro-images/Technicolour-Stride-2-0-magsafe-Case-Cover-For-iPhone-17-pro.png?tr=cm-pad_resize,v-3,q-auto,f-auto,w-1080,dpr-1",
    ],
    description: "Sporty and durable grip cases with MagSafe support.",
  },
  {
    name: "Silicon Cases",
    slug: "silicon",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MM2C3?wid=2000&hei=2000&fmt=jpeg&qlt=90",
    images: [
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MM2C3?wid=2000&hei=2000&fmt=jpeg&qlt=90",
    ],
    description: "Silky soft-touch liquid silicone protection.",
  },
  {
    name: "Card Wallet",
    slug: "wallet",
    image: "https://images.mobilefun.co.uk/graphics/450pixelp/86971.jpg",
    images: ["https://images.mobilefun.co.uk/graphics/450pixelp/86971.jpg"],
    description: "Convenient magnetic card storage cases.",
  },
  {
    name: "Pop Slider",
    slug: "pop-slider",
    image: "https://m.media-amazon.com/images/I/41e9tBKro8L.jpg",
    images: ["https://m.media-amazon.com/images/I/41e9tBKro8L.jpg"],
    description: "Slider grip kickstand hybrid cases.",
  },
  {
    name: "Printed Cases",
    slug: "printed",
    image:
      "https://cdn.nortvi.com/spai/q_glossy+ret_img+to_auto/nortvi.com/wp-content/uploads/2025/10/iPhone-17-ProMax-MidnightBlack4096px-1-2048x2048.jpg",
    images: [
      "https://cdn.nortvi.com/spai/q_glossy+ret_img+to_auto/nortvi.com/wp-content/uploads/2025/10/iPhone-17-ProMax-MidnightBlack4096px-1-2048x2048.jpg",
    ],
    description: "High definition designer art print covers.",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    for (const cat of categories) {
      await Category.findOneAndUpdate(
        { slug: cat.slug },
        {
          name: cat.name,
          slug: cat.slug,
          image: cat.image,
          images: cat.images,
          description: cat.description,
          isActive: true,
        },
        { upsert: true, new: true }
      );
      console.log(`Seeded category: ${cat.name} (${cat.slug})`);
    }

    const count = await Category.countDocuments();
    console.log(`All categories seeded! Total in DB: ${count}`);
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seed();
