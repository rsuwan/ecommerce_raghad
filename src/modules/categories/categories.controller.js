import slugify from "slugify";
import cloudinary from "../../services/cloudinary.js";
import categoryModel from "../../../DB/model/category.model.js";
export const getCategories = (req, res) => {
  return res.json({ message: "Categories.." });
};

export const createcategory = async (req, res) => {
  const name = req.body.name.toLowerCase();
  if (await categoryModel.findOne({ name })) {
    return res.status(409).json({ message: "Category name already exists" });
  }
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: `${process.env.APP_NAME}/Categories`,
    }
  );
  const aCategory = await categoryModel.create({
    name,
    slug: slugify(name),
    image: { secure_url, public_id },
  });
  return res.json({ message: "Category created successfully", aCategory });
};
