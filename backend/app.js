//stock les config dépendantes de l'environement hors du code
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const Sauce = require("./models/Sauce");

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

app.post("/api/sauces", (req, res, next) => {
    delete req.body._id; // on le supprime car il est créé automatiquement par mongoDB
    const sauce = new Sauce({
        ...req.body,
    });
    sauce
        .save() // permet de l'enregistrer dans la BD
        .then(() => res.status(201).json({ message: "Sauce enregistrée" }))
        .catch((error) => res.status(400).json({ error }));
});

app.put("/api/sauces/:id", (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) //premier argument : l'objet de comparaison pour savoir quel objet on modifie - second argument : la nouvelle version de l'objet
        .then(() => res.status(200).json({ message: "Sauce modifiée" }))
        .catch((error) => res.status(400).json({ error }));
});

app.delete("/api/sauces/:id", (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Sauce supprimée" }))
        .catch((error) => res.status(400).json({ error }));
});

app.get("/api/sauces/:id", (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) // permet de retrouver une sauce en fonction de son id
        .then((sauce) => res.status(200).json(sauce))
        .catch((error) => res.status(404).json({ error }));
});

app.get("/api/sauces", (req, res, next) => {
    Sauce.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch((error) => res.status(404).json({ error }));
});

module.exports = app;
