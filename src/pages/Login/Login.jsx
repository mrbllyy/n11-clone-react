import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/Logo/Logo';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // In a real app, this would be a real API call. 
      // For this clone, we'll simulate success if the fields are filled.
      const response = await api.post('/api/auth/login', {
        username,
        password
      });

      if (response.data && response.data.accessToken) {
        login(response.data);
        navigate('/');
      } else {
        setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <header className="login-header">
          <Link to="/">
            <Logo width={150} height={50} />
          </Link>
        </header>

        <main className="login-card">
          <div className="tab-menu">
            <button className="tab-btn active">Giriş Yap</button>
            <Link to="/signup" className="tab-btn">Üye Ol</Link>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label htmlFor="username">E-posta Adresi veya Telefon</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="E-posta veya Telefon"
                required
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Şifre</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Şifre"
                required
                disabled={loading}
              />
            </div>

            <div className="form-actions">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Beni Unutma</span>
              </label>
              <a href="#" className="forgot-password">Şifremi Unuttum</a>
            </div>

            <button
              type="submit"
              className="login-submit-btn"
              disabled={loading}
            >
              {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>

        </main>

        <footer className="login-footer">
          <p>© 2026 n11.com - Tüm Hakları Saklıdır.</p>
        </footer>
      </div>
    </div>
  );
};

export default Login;
