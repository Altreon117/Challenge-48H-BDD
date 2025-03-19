const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
const path = require("path");
const databaseFunctions = require("./Recuperation");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api", routes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});

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


