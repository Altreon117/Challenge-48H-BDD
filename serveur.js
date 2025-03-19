const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
const path = require("path");
const databaseFunctions = require("./Recuperation");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Autoriser les requêtes de tous les domaines
app.use(bodyParser.json()); // Parser les requêtes en JSON
app.use("/api", routes); // Utiliser les routes
app.use(express.static(path.join(__dirname, "..", "frontend"))); // Servir les fichiers statiques depuis frontend

// Route principale
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html")); // Renvoyer la page d'accueil
});

// API pour récupérer utilisateurs et admins
app.get("/api/utilisateurs", (req, res) => {
  databaseFunctions.getUtilisateurs((err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(data);
  });
});

app.get("/api/admins", (req, res) => {
  databaseFunctions.getAdmins((err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(data);
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});