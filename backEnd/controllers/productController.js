const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");

router.get("", async (req, res) => {
  try {

    const name = req.query.name || null;
    const category = req.query.category || null;
    const sort = req.query.sort || null;

    const query = {};
    const sort_query = {};

    if (name) query["name"] = { $regex: name, $options: "i" };
    if (category) query["category"] = { $regex: category, $options: "i" };
    if (sort) {
      if (sort === "asc" || sort === "desc") {
        sort_query["postedAt"] = sort;
      } else {
        return res
          .status(400)
          .send("Invalid sort parameter. Allowed values: 'asc', 'desc'");
      }
    }

    const total_count = await Product.count(query).lean().exec();
    const products = await Product.find(query).sort(sort_query).lean().exec();
    return res.status(200).send({ count: total_count, products: products });
  } catch (err) {
    return res.status(501).send(err.message);
  }
});

router.post("", async (req, res) => {
  
  const {
    name,
    description,
    category,
    image,
    location,
    postedAt,
    price,
    rating,
  } = req.body;

  try {
    const product = await Product.create({
      name: name,
      description: description,
      category: category,
      image: image,
      location: location,
      postedAt: postedAt,
      price: price,
      rating: rating,
    });
    return res.status(201).send(product);
  } catch (err) {
    return res.status(501).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean().exec();
    return res.status(201).send(product);
  } catch (err) {
    return res.status(501).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
      .lean()
      .exec();
    return res.status(201).send(product);
  } catch (err) {
    return res.status(501).send(err.message);
  }
});

router.get("", async (req, res) => {
  try {
    const product = await Product.find().lean().exec();
    return res.status(201).send(product);
  } catch (err) {
    return res.status(501).send(err.message);
  }
});
module.exports = router;
