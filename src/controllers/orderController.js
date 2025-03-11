const Order = require("../models/orderModel");
const orderSchema = require("../validation");
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.getAll();
    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des commandes" });
  }
};

exports.createOrder = async (req, res) => {
  try {
    // Valider les données avec Joi
    const { error } = orderSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { user_id, product_id, quantity } = req.body;

    // Vérifier si le produit existe
    const productExists = await Product.getById(product_id);
    if (!productExists)
      return res.status(404).json({ error: "Le produit n'existe pas" });

    const newOrder = await Order.create(user_id, product_id, quantity);
    res.status(201).json(newOrder);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la création de la commande" });
  }
};
exports.getbyUserId = async (req, res) => {
  try {
    const orders = await Order.getByUserId(req.params.id);
    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des commandes" });
  }
};