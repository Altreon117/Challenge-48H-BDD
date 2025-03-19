const express = require("express");
const router = express.Router();
const dbFunctions = require("./databaseFunctions");

// 📌 Route pour récupérer les utilisateurs
router.get("/utilisateurs", (req, res) => {
    dbFunctions.getUtilisateurs((err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(data);
    });
});

// 📌 Route pour récupérer les admins
router.get("/admins", (req, res) => {
    dbFunctions.getAdmins((err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(data);
    });
});

// 📌 Route pour récupérer les événements
router.get("/evenements", (req, res) => {
    dbFunctions.getEvenements((err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(data);
    });
});

// 📌 Route pour récupérer les inscriptions
router.get("/inscriptions", (req, res) => {
    dbFunctions.getInscriptions((err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(data);
    });
});


// 📌 Ajouter un utilisateur
router.post("/utilisateurs", (req, res) => {
    const { nom, prenom, email, password } = req.body;
    dbFunctions.addUtilisateur(nom, prenom, email, password, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Utilisateur ajouté avec succès", utilisateur: data });
    });
});

// 📌 Ajouter un administrateur
router.post("/admins", (req, res) => {
    const { nom, prenom, email, password } = req.body;
    dbFunctions.addAdmin(nom, prenom, email, password, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Admin ajouté avec succès", admin: data });
    });
});

// 📌 Ajouter un événement
router.post("/evenements", (req, res) => {
    const { titre, description, date } = req.body;
    dbFunctions.addEvenement(titre, description, date, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Événement ajouté avec succès", evenement: data });
    });
});

// 📌 Inscrire un utilisateur à un événement
router.post("/inscriptions", (req, res) => {
    const { utilisateur_id, evenement_id } = req.body;
    dbFunctions.addInscription(utilisateur_id, evenement_id, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Inscription réussie", inscription: data });
    });
});

// 📌 Route de connexion
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    dbFunctions.checkLogin(email, password, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        if (result) {
            res.json({ message: "Connexion réussie", role: result.role, user: result.data });
        } else {
            res.status(401).json({ message: "Identifiants incorrects" });
        }
    });
});

router.post("/logout", (req, res) => {
    const { userId, role } = req.body;

    dbFunctions.logout(userId, role, (err, message) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message });
    });
});


module.exports = router;


