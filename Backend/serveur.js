const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
const path = require("path");
const databaseFunctions = require("./Recuperation");

const app = express();
const port = process.env.PORT || 3030;

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

app.post("/api/checklogin", (req, res) => {
  const { email, password } = req.body;
  databaseFunctions.Checklogin(email, password, (err, utilisateur) => {
      if (err || !utilisateur) {
          return res.status(401).json({ success: false, message: "Identifiants incorrects" });
      }
      res.json({ success: true });
  });
});

app.post("/api/addutilisateur", (req, res) => {
  const { nom, prenom, email, password } = req.body;
  databaseFunctions.addUtilisateur(nom, prenom, email, password, (err) => {
      if (err) {
          return res.status(500).json({ success: false, message: "Erreur lors de l'inscription" });
      }
      res.json({ success: true });
  });
});

app.post("/api/logout", (req, res) => {
  databaseFunctions.logout((err) => {
      if (err) {
          return res.status(500).json({ success: false, message: "Erreur lors de la déconnexion" });
      }
      res.json({ success: true });
  });
});



// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
