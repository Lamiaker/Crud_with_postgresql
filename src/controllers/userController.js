const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des utilisateurs" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.getById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de l'utilisateur" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = await User.create(name, email);
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la création de l'utilisateur" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await User.update(req.params.id, name, email);
    if (!updatedUser)
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de l'utilisateur" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.delete(req.params.id);
    res.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de l'utilisateur" });
  }
};
