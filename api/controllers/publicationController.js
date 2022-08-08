import Publication from "../models/Publication.js";
import User from "../models/User.js";
import makeGeneratorIDRandom from "../middleware/idGenerator.js";

export const getAllPublications = async (req, res) => {
  try {
    const allPublications = await Publication.find();
    return res.json(allPublications);
  } catch (e) {
    return res.status(400).json({ msg: e.messsage });
  }
};

export const createPublication = async (req, res) => {
  try {
    const newPublication = new Publication(req.body);

    if (!newPublication.title || newPublication.title.length <= 0) {
      return res.status(400).json({ msg: "Title is required" });
    }

    if (!newPublication.price) {
      return res.status(400).json({ msg: "Price is required" });
    }

    if (newPublication.price <= 0) {
      return res
        .status(400)
        .json({ msg: "The product price must be greater than 0" });
    }

    if (!newPublication.description || newPublication.description.length <= 0) {
      return res.status(400).json({ msg: "Description is required" });
    }

    if (!newPublication.state || newPublication.state.length <= 0) {
      return res.status(400).json({ msg: "state is required" });
    }

    if (!["new", "used"].includes(newPublication.state.toLowerCase())) {
      return res.status(400).json({ msg: "state bad value" });
    }

    if (newPublication.state === "new" && !newPublication.stock) {
      return res.status(400).json({ msg: "Stock is required if state is new" });
    }

    if (!newPublication.category || newPublication.category.length <= 0) {
      return res.status(400).json({ msg: "Category is required" });
    }

    newPublication.id = makeGeneratorIDRandom(4);
    newPublication.owner = req.user._id;
    if (newPublication.state === "used") newPublication.stock = 1;
    if (!newPublication.subCategory) newPublication.subCategory = "";

    await newPublication.save();
    req.user.publications.push(newPublication._id);
    await req.user.save();
    return res.json(newPublication);
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
};

export const getPublication = async (req, res) => {
  const { id } = req.params;
  try {
    const publication = await Publication.findById(id);
    return res.json(publication);
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
};

export const deletePublication = async (req, res) => {
  const { id } = req.params;
  try {
    const publication = await Publication.findById(id);
    const user = await User.findById(req.user._id).populate("publications");
    const newUserPublications = user.publications.filter(
      (p) => p.id !== publication.id
    );
    user.publications = newUserPublications;
    await Publication.findByIdAndRemove(id);
    await user.save();
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
};

export const getMyPublications = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate("publications");
    return res.json(user.publications);
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
};