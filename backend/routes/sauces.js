const express = require("express");
const router = express.Router(); //création de notre routeur express

const sauceCtrl = require("../controllers/sauces"); //import des controllers

//les différentes routes POST PUT DELETE GET
router.post("/", sauceCtrl.createSauce);
router.put("/:id", sauceCtrl.modifySauce);
router.delete("/:id", sauceCtrl.deleteSauce);
router.get("/:id", sauceCtrl.getOneThing);
router.get("/", sauceCtrl.getAllSauces);

// router.post(/:id/like, sauceCtrl.likeDislikeSauce)

module.exports = router; // export du router de ce fichier
