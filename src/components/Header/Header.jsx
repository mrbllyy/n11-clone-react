import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Logo from '../Logo/Logo';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="main-header">
      <div className="header-top">
        <div className="container header-top-content">
          <div className="top-links">
            <a href="#">Kampanyalar</a>
            <a href="#">Günün Fırsatları</a>
            <a href="#">Mağazalar</a>
          </div>
          <div className="top-user-menu">
            <a href="#">Sipariş Takibi</a>
            <a href="#">Yardım</a>
          </div>
        </div>
      </div>

      <div className="header-main">
        <div className="container header-main-content">
          <Link to="/" className="logo-container">
            <Logo width={120} height={40} />
          </Link>

          <div className="search-container">
            <input 
              type="text" 
              placeholder="Ürün, marka veya kategori ara" 
              className="search-input"
            />
            <button className="search-button">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
          </div>

          <div className="header-actions">
            {user ? (
              <div className="user-dropdown">
                <Link to="/hesabim" className="action-item">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  <span className="action-label">{user.username || 'Hesabım'}</span>
                </Link>
                <button onClick={logout} className="logout-btn">Çıkış</button>
              </div>
            ) : (
              <Link to="/login" className="action-item">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <span className="action-label">Giriş Yap</span>
              </Link>
            )}

            <a href="#" className="action-item">
              <div className="cart-icon-container">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
                <span className="cart-badge">0</span>
              </div>
              <span className="action-label">Sepetim</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
