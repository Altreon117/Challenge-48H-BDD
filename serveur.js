const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
const path = require("path");
const databaseFunctions = require("./Recuperation");

const database = express();
const port = process.env.PORT || 8080;

// Middleware
database.use(cors()); // Autoriser les requêtes de tous les domaines
database.use(bodyParser.json()); // Parser les requêtes en JSON
database.use("/api", routes); // Utiliser les routes
database.use(express.static(path.join(__dirname, "..", "frontend"))); // Servir les fichiers statiques depuis frontend

// Route principale
database.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend","html", "lobby.html")); // Renvoyer la page d'accueil
});

// API pour récupérer utilisateurs et admins
database.get("/api/utilisateurs", (req, res) => {
  databaseFunctions.getUtilisateurs((err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(data);
  });
});

database.get("/api/admins", (req, res) => {
  databaseFunctions.getAdmins((err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(data);
  });
});

database.post("/api/checklogin", (req, res) => {
  const { email, password } = req.body;
  databaseFunctions.Checklogin(email, password, (err, utilisateur) => {
      if (err || !utilisateur) {
          return res.status(401).json({ success: false, message: "Identifiants incorrects" });
      }
      res.json({ success: true });
  });
});

database.post("/api/addutilisateur", (req, res) => {
  const { nom, prenom, email, password } = req.body;
  databaseFunctions.addUtilisateur(nom, prenom, email, password, (err) => {
      if (err) {
          return res.status(500).json({ success: false, message: "Erreur lors de l'inscription" });
      }
      res.json({ success: true });
  });
});

database.post("/api/logout", (req, res) => {
  databaseFunctions.logout((err) => {
      if (err) {
          return res.status(500).json({ success: false, message: "Erreur lors de la déconnexion" });
      }
      res.json({ success: true });
  });
});



// Démarrer le serveur
database.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
