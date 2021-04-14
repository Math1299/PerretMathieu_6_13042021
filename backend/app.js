//stock les config dépendantes de l'environement hors du code
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path"); //donne accès au chemin du système de fichier

//import de nos routers
const sauceRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");

const app = express();

//liaison à la base de donéés
mongoose
    .connect("mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@" + process.env.DB_HOST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

//middleware général pour eviter les pb CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // * on peut donc y accéder de partout
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

//Méthode d express permettant de transformer le corps de la requête en JSON utilisable
app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/sauces", sauceRoutes); //import des routes depuis le controller sauces.js
app.use("/api/auth", userRoutes); //import des routes depuis le controller user.js

module.exports = app;
