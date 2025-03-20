const databaseFunctions = require("./Recuperation");

//Appeler les fonctions et afficher les résultats dans le terminal
databaseFunctions.getUtilisateurs((err, data) => {
    if (err) {
        console.error("Erreur :", err.message);
    } else {
        console.log(JSON.stringify(data, null, 2));
    }
});

databaseFunctions.getAdmins((err, data) => {
    if (err) {
        console.error("Erreur :", err.message);
    } else {
        console.log(JSON.stringify(data, null, 2));
    }
});

databaseFunctions.getEvenements((err, data) => {
    if (err) {
        console.error("Erreur :", err.message);
    } else {
        console.log(JSON.stringify(data, null, 2));
    }
});

databaseFunctions.getInscriptions((err, data) => {
    if (err) {
        console.error("Erreur :", err.message);
    } else {
        console.log(JSON.stringify(data, null, 2));
    }
});



