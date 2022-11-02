const express = require('express'); //importation du module router express
const router = express.Router();
const userCtrl = require('../controllers/users'); //création du chemin user dans controllers

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
//les routers signup et login sont en methode post

module.exports = router;