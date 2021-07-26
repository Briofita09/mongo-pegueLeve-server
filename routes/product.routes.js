const router = require("express").Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");

const ProductModel = require("../models/Product.model");

router.post(
  "/product",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const result = await ProductModel.create({
        ...req.body,
        userId: req.currentUser._id,
      });

      return res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/product",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const products = await ProductModel.find();

      return res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/product/:id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const product = await ProductModel.findOne({ _id: id }).populate(
        "userId"
      );

      if (product) {
        return res.status(200).json(product);
      }

      return res.status(404).json({ error: "Produto não encontrado" });
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/product/:id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const updatedProduct = await ProductModel.findOneAndUpdate(
        { _id: id },
        { $set: { ...req.body } },
        { new: true }
      );

      if (updatedProduct) {
        return res.status(200).json(updatedProduct);
      }

      return res.status(404).json({ error: "Produto não encontrado." });
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/product/:id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const deletionResult = await ProductModel.deleteOne({ _id: id });

      if (deletionResult.n > 0) {
        return res.status(200).json({});
      }

      return res.status(404).json({ error: "Produto não encontrado." });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
