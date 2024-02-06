///autenticacion del usuario  
const express = require("express");
const router = express.Router();  
const {signUp, signin} = require('../controllers/auth.controller')  
const {checkEmailDuplicate, checkRolesExisted} = require('../middlewares/verifySignup')

router.post('/signup',[checkEmailDuplicate, checkRolesExisted], signUp) /// registrarse en la app 

router.post('/signin', signin) ///ingresar a la app

module.exports = router;