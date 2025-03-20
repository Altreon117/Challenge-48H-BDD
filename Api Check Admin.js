// Ajout d'une route pour récupérer l'utilisateur connecté et vérifier s'il est admin
const express = require('express');
const database = require('./database');
const router = express.Router();

router.get('/api/user', (req, res) => {
    const userId = req.session.userId; // Supposons que l'ID utilisateur est stocké en session
    if (!userId) {
        return res.status(401).json({ message: "Utilisateur non connecté" });
    }

    const sql = "SELECT id, email, admin FROM utilisateurs WHERE id = ?";
    database.get(sql, [userId], (err, user) => {
        if (err) {
            return res.status(500).json({ message: "Erreur serveur" });
        }
        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }
        res.json(user);
    });
});

module.exports = router;
