import Category from "../models/Category.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.json(categories);
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const category = await new Category(req.body);
    await category.save();
    return res.json(category);
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
};
