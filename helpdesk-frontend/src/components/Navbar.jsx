import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isAdmin } from '../services/auth';

const Navbar = () => {
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAdmin(isAdmin());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setAdmin(false);
    navigate('/admin/login');
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>🎫 HelpDesk</h2>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Accueil</Link>
        <Link to="/tickets" style={styles.link}>Tickets</Link>
        <Link to="/create" style={styles.link}>Créer</Link>

        {admin ? (
          <>
            <Link to="/admin" style={{ ...styles.link, marginLeft: '30px' }}>Tableau Admin</Link>
            <button onClick={handleLogout} style={styles.logoutButton}>Déconnexion</button>
          </>
        ) : (
          <Link to="/admin/login" style={{ ...styles.link, marginLeft: '30px' }}>Admin</Link>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#007bff',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff',
  },
  logo: {
    margin: 0,
    fontSize: '1.5rem',
  },
  links: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  logoutButton: {
    background: 'transparent',
    border: '1px solid white',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: '10px',
  }
};

export default Navbar;
