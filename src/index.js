//arranca la aplicacion
const app = require("./app");
const con = require("./database"); 
const {PORT} = require("./config_base")
con()

app.listen(PORT);
console.log("server on port", PORT);