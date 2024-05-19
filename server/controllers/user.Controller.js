const jwt = require("jsonwebtoken");
const { getUser, getUsers, credential, registerUser } = require("../models/user.js");

const getUsersHandler = async (req, res) => {
  try {
    const usuarios = await getUsers();
    res.json(usuarios);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
};

const loginUserHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    await credential(email, password);
    const token = jwt.sign({ email }, "az_AZ", { expiresIn: "1h" });
    res.send({ token });
    console.log(`Usuario ${email} ha ingresado exitosamente.`);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
};

const registerUserHandler = async (req, res) => {
  try {
    console.log("Registrando usuario.");
    const usuario = req.body;
    await registerUser(usuario);
    res.send("Usuario creado con éxito");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getUserHandler = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "az_AZ");
    const email = decoded.email;
    const usuario = await getUser(email);
    if (!usuario) throw { code: 404, message: "Usuario no encontrado" };
    res.json([usuario]); 
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
};


module.exports = { getUsersHandler, loginUserHandler, registerUserHandler, getUserHandler };
