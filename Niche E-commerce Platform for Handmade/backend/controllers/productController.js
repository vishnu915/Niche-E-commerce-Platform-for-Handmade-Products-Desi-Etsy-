import Product from "../models/productModel.js";

export const createProduct = async (req, res) => {
  try {
    const artisanId = req.user._id;
    const { name, description, price, stock, category, images } = req.body;

    const product = new Product({
      name,
      description,
      price,
      stock,
      category,
      artisan: artisanId,
      isApproved: false,
      images,
    });

    await product.save();
    res.status(201).json({
      message: "Product created, pending admin approval",
      product,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Error creating product" });
  }
};

export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ artisan: req.user._id });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findOneAndUpdate(
      { _id: req.params.id, artisan: req.user._id },
      { ...req.body, isApproved: false },
      { new: true }
    );
    res.status(200).json({ message: "Product updated", product: updated });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findOneAndDelete({
      _id: req.params.id,
      artisan: req.user._id,
    });
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};

export const getAllApprovedProducts = async (req, res) => {
  try {
    const { category, artisan, search, minPrice, maxPrice } = req.query;

    const filter = { isApproved: true };

    if (category) filter.category = category;
    if (artisan) filter.artisan = artisan;

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(filter)
      .populate("category", "name")
      .populate("artisan", "name")
      .sort({ createdAt: -1 });

    const formatted = products.map((p) => ({
      ...p._doc,
      imageUrl: p.image
        ? `data:${p.image.contentType};base64,${p.image.data.toString(
            "base64"
          )}`
        : null,
    }));
    res.json(formatted);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
