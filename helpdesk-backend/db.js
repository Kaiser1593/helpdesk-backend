const mysql = require("mysql2");
require("dotenv").config(); // Charge les variables d'environnement

// Création de la connexion MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// Connexion à la base
db.connect(err => {
  if (err) {
    console.error("❌ Erreur de connexion à MySQL:", err);
    return;
  }
  console.log("✅ Connecté à la base de données MySQL !");
});

module.exports = db;
