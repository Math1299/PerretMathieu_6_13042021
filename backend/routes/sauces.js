const express = require("express");
const router = express.Router(); //création de notre routeur express

const sauceCtrl = require("../controllers/sauces"); //import des controllers

//importation de nos middlewares
const auth = require("../middleware/auth");

//les différentes routes POST PUT DELETE GET
router.post("/", auth, sauceCtrl.createSauce);
router.put("/:id", auth, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.get("/:id", auth, sauceCtrl.getOneThing);
router.get("/", auth, sauceCtrl.getAllSauces);

// router.post(/:id/like, auth, sauceCtrl.likeDislikeSauce)

module.exports = router; // export du router
