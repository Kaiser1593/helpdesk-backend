import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      alert("Mot de passe incorrect");
    }
  };

  return (
    <div className="form-container">
      <h2>Connexion Admin</h2>
      <form onSubmit={handleLogin}>
        <input
          type="password"
          placeholder="Mot de passe admin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Connexion</button>
      </form>
    </div>
  );
};

export default AdminLogin;
