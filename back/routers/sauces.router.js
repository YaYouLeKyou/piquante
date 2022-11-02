const express = require('express');
const router = express.Router();

const ctrlSauces = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');


router.post('/', auth, multer, ctrlSauces.createSauce);
router.get('/:id', auth, ctrlSauces.getOneSauce);
router.get('/', auth, ctrlSauces.getAllSauces);
router.put('/:id', auth, multer, ctrlSauces.modifySauce);
router.delete('/:id', auth, ctrlSauces.deleteSauce);
router.post('/:id/like', auth, ctrlSauces.likeSauce);
//chaque router a son CRUD (Get, Post, Put, Delete) avec son chemin et ses droits

module.exports = router;