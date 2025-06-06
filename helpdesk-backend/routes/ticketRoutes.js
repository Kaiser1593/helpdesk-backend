const express = require('express');
const router = express.Router();
const db = require('../db');

// ✅ Créer un ticket
router.post('/tickets', (req, res) => {
  const { title, description, priority } = req.body;
  const status = 'open';
  const archived = false;

  if (!title || !description || !priority) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  const query = "INSERT INTO tickets (title, description, priority, status, archived) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [title, description, priority, status, archived], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, title, description, priority, status, archived });
  });
});

// ✅ Lire tous les tickets actifs
router.get('/tickets', (req, res) => {
  db.query("SELECT * FROM tickets WHERE archived = FALSE", (err, results) => {
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

// ✅ Mettre à jour un ticket
router.put('/tickets/:id', (req, res) => {
  const ticketId = req.params.id;
  const { title, description, priority, status } = req.body;

  if (!title || !description || !priority || !status) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  const query = 'UPDATE tickets SET title = ?, description = ?, priority = ?, status = ? WHERE id = ?';
  db.query(query, [title, description, priority, status, ticketId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Ticket non trouvé' });
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

// ✅ ARCHIVER un ticket
router.put('/tickets/archive/:id', (req, res) => {
  const { id } = req.params;
  db.query("UPDATE tickets SET archived = TRUE WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Ticket non trouvé' });
    res.json({ message: 'Ticket archivé avec succès' });
  });
});

// ✅ Liste des tickets archivés
router.get('/tickets/archive', (req, res) => {
  db.query("SELECT * FROM tickets WHERE archived = TRUE", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ✅ Liste des 10 tickets les plus anciens (urgence)
router.get('/tickets/urgence', (req, res) => {
  db.query("SELECT * FROM tickets WHERE archived = FALSE ORDER BY created_at ASC LIMIT 10", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ✅ Statistiques générales
router.get('/tickets/stats/global', (req, res) => {
  const totalQuery = "SELECT COUNT(*) AS total FROM tickets WHERE archived = FALSE";
  const resolvedQuery = "SELECT COUNT(*) AS resolved FROM tickets WHERE archived = FALSE AND status = 'closed'";
  const resolved3moisQuery = `
    SELECT COUNT(*) AS resolved_3months 
    FROM tickets 
    WHERE archived = FALSE 
      AND status = 'closed' 
      AND created_at < DATE_SUB(NOW(), INTERVAL 3 MONTH)
  `;

  db.query(totalQuery, (err, totalResult) => {
    if (err) return res.status(500).json({ error: err.message });

    db.query(resolvedQuery, (err, resolvedResult) => {
      if (err) return res.status(500).json({ error: err.message });

      db.query(resolved3moisQuery, (err, resolved3moisResult) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json({
          total: totalResult[0].total,
          resolved: resolvedResult[0].resolved,
          resolved_3months: resolved3moisResult[0].resolved_3months
        });
      });
    });
  });
});

module.exports = router;
