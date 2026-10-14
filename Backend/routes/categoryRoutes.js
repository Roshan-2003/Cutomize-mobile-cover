const express = require("express");
const upload = require("../middleware/upload");

const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router.post("/", upload.array("images"), createCategory);
router.get("/", getCategories);
router.put("/:id", upload.array("images"), updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;