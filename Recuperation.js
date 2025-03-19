const database = require("./database"); // Connexion à la base SQLite

// 📌 Fonction pour récupérer les utilisateurs
function getUtilisateurs(callback) {
    const sql = "SELECT * FROM utilisateurs";
    database.all(sql, [], (err, rows) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, { utilisateurs: rows });
    });
}

// 📌 Fonction pour récupérer les admins
function getAdmins(callback) {
    const sql = "SELECT * FROM admins";
    database.all(sql, [], (err, rows) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, { admins: rows });
    });
}

// 📌 Fonction pour récupérer les événements
function getEvenements(callback) {
    const sql = "SELECT * FROM evenements";
    database.all(sql, [], (err, rows) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, { evenements: rows });
    });
}

function getInscriptions(callback) {
    const sql = `
        SELECT inscriptions.id, utilisateurs.nom AS utilisateur, evenements.titre AS evenement
        FROM inscriptions
        JOIN utilisateurs ON inscriptions.utilisateur_id = utilisateurs.id
        JOIN evenements ON inscriptions.evenement_id = evenements.id
    `;
    database.all(sql, [], (err, rows) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, { inscriptions: rows });
    });
}

// 📌 Exporter les fonctions
module.exports = { getUtilisateurs, getAdmins, getEvenements, getInscriptions };

// 📌 Ajouter un utilisateur
function addUtilisateur(nom, prenom, email, password, callback) {
    const sql = `INSERT INTO utilisateurs (nom, prenom, email, password) VALUES (?, ?, ?, ?)`;
    database.run(sql, [nom, prenom, email, password], function (err) {
        if (err) return callback(err, null);
        callback(null, { id: this.lastID, nom, prenom, email });
    });
}

// 📌 Ajouter un administrateur
function addAdmin(nom, prenom, email, password, callback) {
    const sql = `INSERT INTO admins (nom, prenom, email, password) VALUES (?, ?, ?, ?)`;
    database.run(sql, [nom, prenom, email, password], function (err) {
        if (err) return callback(err, null);
        callback(null, { id: this.lastID, nom, prenom, email });
    });
}

// 📌 Ajouter un événement
function addEvenement(titre, description, date, callback) {
    const sql = `INSERT INTO evenements (titre, description, date) VALUES (?, ?, ?)`;
    database.run(sql, [titre, description, date], function (err) {
        if (err) return callback(err, null);
        callback(null, { id: this.lastID, titre, description, date });
    });
}

// 📌 Inscrire un utilisateur à un événement
function addInscription(utilisateur_id, evenement_id, callback) {
    const sql = `INSERT INTO inscriptions (utilisateur_id, evenement_id) VALUES (?, ?)`;
    database.run(sql, [utilisateur_id, evenement_id], function (err) {
        if (err) return callback(err, null);
        callback(null, { id: this.lastID, utilisateur_id, evenement_id });
    });
}

// 📌 Vérifier les identifiants de connexion
function checkLogin(email, password, callback) {
    database.get(`SELECT * FROM utilisateurs WHERE email = ? AND password = ?`, [email, password], (err, user) => {
        if (err) return callback(err, null);

        if (user) {
            database.run(`UPDATE utilisateurs SET connecte = 1 WHERE id = ?`, [user.id]);
            return callback(null, { role: "utilisateur", data: user });
        } else {
            database.get(`SELECT * FROM admins WHERE email = ? AND password = ?`, [email, password], (err, admin) => {
                if (err) return callback(err, null);

                if (admin) {
                    database.run(`UPDATE admins SET connecte = 1 WHERE id = ?`, [admin.id]);
                    return callback(null, { role: "admin", data: admin });
                } else {
                    return callback(null, null);
                }
            });
        }
    });
}

function logout(userId, role, callback) {
    const table = role === "admin" ? "admins" : "utilisateurs";
    database.run(`UPDATE ${table} SET connecte = 0 WHERE id = ?`, [userId], function (err) {
        if (err) return callback(err);
        callback(null, "Déconnexion réussie !");
    });
}

// 📌 Exporter la fonction
module.exports = {
    logout ,checkLogin,
    getUtilisateurs, getAdmins, getEvenements, getInscriptions,
    addUtilisateur, addAdmin, addEvenement, addInscription
};

