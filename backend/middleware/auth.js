const jwt = require("jsonwebtoken");

//méthode d'authentification via TOKEN
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split("")[1]; //on se refère au model du TOKEN
        const decodedToken = jwt.verify(token, `${process.env.JWT_KEY}`); //on décode le TOKEN
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw "User ID non valable";
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | "Requête non authentifiée" });
    }
};
