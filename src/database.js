const mongoose = require("mongoose"); 
const {MONGODB_URI} = require('./config_base');

const uri = "mongodb://127.0.0.1:27017/tutoria";
const conexion = async function () {
  try {
    const db = await mongoose.connect(MONGODB_URI);
    console.log("DB se conecto a ", db.connection.name);
  } catch (error) {
    console.log(error);
  }
};
mongoose.connection.once("open", (_) => {
  console.log("database is connected to", MONGODB_URI);
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

module.exports=conexion