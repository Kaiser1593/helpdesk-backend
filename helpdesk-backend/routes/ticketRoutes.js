const express = require('express');
const router = express.Router();
const db = require('../db');


// ✅ Créer un ticket (utilisateur)
router.post('/tickets', (req, res) => {
    const { title, description, priority } = req.body;
    const status = 'open'; // statut toujours forcé à "open"
  
    if (!title || !description || !priority) {
      return res.status(400).json({ error: "Tous les champs sont requis" });
    }
  
    const query = "INSERT INTO tickets (title, description, priority, status) VALUES (?, ?, ?, ?)";
    db.query(query, [title, description, priority, status], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, title, description, priority, status });
    });
  });


// ✅ Lire tous les tickets
router.get('/tickets', (req, res) => {
    db.query("SELECT * FROM tickets", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// ✅ Lire un ticket spécifique
router.get('/tickets/:id', (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM tickets WHERE id = ?", [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Ticket non trouvé' });
        res.json(results[0]);
    });
});

// Mettre à jour un ticket
router.put('/tickets/:id', (req, res) => {
    const ticketId = req.params.id;
    const { title, description, priority, status } = req.body;

    // 🛡️ Validation rapide
    if (!title || !description || !priority || !status) {
        return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    const query = 'UPDATE tickets SET title = ?, description = ?, priority = ?, status = ? WHERE id = ?';
    db.query(query, [title, description, priority, status, ticketId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Ticket non trouvé' });
        }
        res.status(200).json({ message: 'Ticket mis à jour avec succès' });
    });
});


// ✅ Supprimer un ticket
router.delete('/tickets/:id', (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM tickets WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Ticket non trouvé' });
        res.json({ message: 'Ticket supprimé avec succès' });
    });
});

module.exports = router;
