import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import Logo from '../../components/Logo/Logo';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Map formData to the expected backend payload
      const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: ["user"]
      };

      await api.post('/api/user/signup', payload);
      // Redirect to login upon successful registration
      navigate('/login');
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.response?.data?.message || 'Kayıt olurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <header className="signup-header">
          <Link to="/">
            <Logo width={150} height={50} />
          </Link>
        </header>

        <main className="signup-card">
          <div className="tab-menu">
            <Link to="/login" className="tab-btn">Giriş Yap</Link>
            <button className="tab-btn active">Üye Ol</button>
          </div>

          {error && <div className="error-message" style={{ color: 'red', textAlign: 'center', marginBottom: '15px' }}>{error}</div>}

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="input-group">
              <label htmlFor="username">Kullanıcı Adı</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Kullanıcı Adınız"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">E-posta Adresi</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-posta Adresiniz"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Şifre</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Şifreniz"
                required
              />
              <p className="input-hint">En az 6 karakter (harf ve rakam) olmalıdır.</p>
            </div>

            <button type="submit" className="signup-submit-btn" disabled={loading}>
              {loading ? 'Üye Olunuyor...' : 'Üye Ol'}
            </button>
          </form>
        </main>

        <footer className="signup-footer">
          <p>© 2026 n11.com - Tüm Hakları Saklıdır.</p>
        </footer>
      </div>
    </div>
  );
};

export default Signup;
