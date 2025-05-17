import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎫 Bienvenue sur HelpDesk</h1>
      <p style={styles.subtitle}>Gérez facilement vos tickets de support</p>
      <div style={styles.buttonContainer}>
        <Link to="/tickets" style={{ ...styles.button, backgroundColor: '#4CAF50' }}>Voir les Tickets</Link>
        <Link to="/create" style={{ ...styles.button, backgroundColor: '#2196F3' }}>Créer un Ticket</Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    textAlign: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '0.5rem',
    color: '#333',
  },
  subtitle: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    color: '#666',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    padding: '12px 24px',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  }
};

export default Home;
