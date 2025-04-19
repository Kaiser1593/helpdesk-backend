require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const ticketRoutes = require("./routes/ticketRoutes"); // Importer les routes des tickets

const app = express();
app.use(cors());
app.use(express.json()); // Permet de lire le JSON envoyé par le front-end

// Route test
app.get("/", (req, res) => {
    res.send("✅ API Helpdesk fonctionne !");
});

// Utiliser les routes des tickets
app.use("/api", ticketRoutes); // Préfixe les routes des tickets par /api

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
