const databaseFunctions = require("./Recuperation");

databaseFunctions.addAdmin("Phan", "Raphaël", "rahp13450@gmail.com", "1234", (err, data) => {
    if (err) {
        console.error("Erreur :", err.message);
    } else {
        console.log(JSON.stringify(data, "", 2));
    }
});