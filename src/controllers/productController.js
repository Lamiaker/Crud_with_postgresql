const Product = require("../models/productModel");
const { productSchema } = require("../validation");
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAll();
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des produits" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Produit non trouvé" });
    res.json(product);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération du produit" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    // Valider les données avec Joi
    const { error } = productSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { name, price } = req.body;
    const newProduct = await Product.create(name, price);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création du produit" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const updatedProduct = await Product.update(req.params.id, name, price);
    if (!updatedProduct)
      return res.status(404).json({ message: "Produit non trouvé" });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour du produit" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.delete(req.params.id);
    res.json({ message: "Produit supprimé" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression du produit" });
  }
};
