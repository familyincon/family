const User = require("../models/registro");
const jwt = require("jsonwebtoken");
const config = require("../config");
const Role = require("../models/role");

const signUp = async (req, res) => {
  const { nombres, apellidos, email, contrasena, activado, rol } = req.body;

  //const userFound= User.find({email})

  const newUser = new User({
    nombres,
    apellidos,
    email,
    contrasena: await User.encryptPassword(contrasena),
  });
  if (rol) {
    const foundRoles = await Role.find({ name: { $in: rol } });
    newUser.rol = foundRoles.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "teens" });
    newUser.rol = [role._id];
  }

  const savedUser = await newUser.save();
  const token = jwt.sign({ id: savedUser._id }, config, {
    expiresIn: 86400, //24horas
  });

  res.status(200).json({ token });
};

const signin = async (req, res) => {
  //const userFound = await User.findOne({email: req.body.email})
  const userFound = await User.findOne({ email: req.body.email }).populate(
    "rol"
  );

  if (!userFound) return res.status(400).json({ message: "User not found" });

  const matchPassword = await User.comparePassword(
    req.body.contrasena,
    userFound.contrasena
  );

  if (!matchPassword)
    return res.status(401).json({ token: null, message: "ivalid password" });

  //console.log(userFound)

  const token = jwt.sign({ id: userFound._id }, config, { expiresIn: 86400 });

  res.json({ token });
};

module.exports = { signUp, signin };