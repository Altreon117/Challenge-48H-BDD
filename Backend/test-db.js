const sqlite3 = require('sqlite3').verbose();

// Ouvrir une base de données SQLite
let db = new sqlite3.Database('./my-database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error("lolo"+ err.message);
    } else {
        console.log('Connecté à la base de données SQLite.');
    }
});

// Exécuter une requête SELECT
db.serialize(() => {
    db.each(`SELECT id, name, email FROM users`, (err, row) => {
        if (err) {
            console.error(err.message);
        }
        console.log(`${row.id}: ${row.name} - ${row.email}`);
    });
});

// Fermer la base de données
db.close((err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Fermeture de la base de données.');
    }
});