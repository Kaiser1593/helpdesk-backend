# 🎫 HelpDesk - Application de gestion de tickets

Projet full-stack de gestion de tickets d'assistance, permettant à des utilisateurs de créer des tickets et à un administrateur de les gérer via une interface dédiée.

---

## 📦 Fonctionnalités principales

### 👤 Utilisateur
- Créer un ticket avec :
  - Titre
  - Description
  - Priorité (Faible, Moyenne, Haute)
- Modifier ses propres tickets (hors statut)
- Supprimer ses tickets
- Interface claire et responsive

### 🔐 Administrateur
- Connexion protégée par mot de passe (`.env`)
- Tableau de bord avec :
  - Liste de tous les tickets
  - Filtres par statut (`open`, `in_progress`, `closed`)
  - Modification complète des tickets (y compris le statut)
  - Suppression
- Interface unifiée avec navigation et footer
- Déconnexion sécurisée (localStorage)

---

## 🧱 Technologies utilisées

### Frontend
- React (Vite)
- React Router DOM
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MySQL
- dotenv

---

## ⚙️ Installation et configuration

### 1. Cloner le projet

```bash
git clone https://github.com/ton-utilisateur/helpdesk.git
cd helpdesk

CREATE TABLE tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  priority ENUM('Faible', 'Moyenne', 'Haute') NOT NULL,
  status ENUM('open', 'in_progress', 'closed') NOT NULL DEFAULT 'open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

cd helpdesk-backend
cp .env.example .env
# Modifier les variables :
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=
# DB_NAME=helpdesk

npm install
npm start

cd helpdesk-frontend
cp .env.example .env
# VITE_ADMIN_PASSWORD=superadmin

npm install
npm run dev
