import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/api';
import Header from '../../components/Header/Header';
import CategoryBar from '../../components/CategoryBar/CategoryBar';
import './Account.css';

const Account = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await api.get('/api/orders');
        setOrders(response.data || []);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Siparişler yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const getStatusLabel = (status) => {
    const map = {
      DELIVERED: 'Teslim Edildi',
      SHIPPED: 'Kargoya Verildi',
      PROCESSING: 'Hazırlanıyor',
      CANCELLED: 'İptal Edildi',
    };
    return map[status] || status;
  };

  const getStatusClass = (status) => {
    const map = {
      DELIVERED: 'delivered',
      SHIPPED: 'shipped',
      PROCESSING: 'processing',
      CANCELLED: 'cancelled',
    };
    return map[status] || '';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2,
    }).format(price);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getUserInitial = () => {
    if (user?.username) return user.username.charAt(0).toUpperCase();
    return 'U';
  };

  if (authLoading) return null;

  return (
    <div className="account-page">
      <Header />
      <CategoryBar />

      <main className="account-main">
        <div className="container">
          <div className="account-layout">
            {/* Sidebar */}
            <aside className="account-sidebar">
              <div className="sidebar-profile">
                <div className="profile-avatar">{getUserInitial()}</div>
                <div className="profile-info">
                  <span className="profile-name">{user?.username || 'Kullanıcı'}</span>
                  <span className="profile-email">{user?.email || ''}</span>
                </div>
              </div>
              <nav className="sidebar-menu">
                <button
                  className={`sidebar-menu-item ${activeTab === 'orders' ? 'active' : ''}`}
                  onClick={() => setActiveTab('orders')}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z" />
                  </svg>
                  Siparişlerim
                </button>
                <button
                  className={`sidebar-menu-item ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  Hesap Bilgilerim
                </button>
                <button className="sidebar-menu-item">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  Favorilerim
                </button>
                <button className="sidebar-menu-item">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
                  </svg>
                  Mesajlarım
                </button>
              </nav>
            </aside>

            {/* Main Content */}
            <section className="account-content">
              {activeTab === 'orders' && (
                <>
                  <div className="content-header">
                    <h2>Siparişlerim</h2>
                    <p>Tüm siparişlerinizi buradan takip edebilirsiniz.</p>
                  </div>

                  {loading ? (
                    <div className="orders-loading">
                      <div className="loading-spinner"></div>
                      <p>Siparişleriniz yükleniyor...</p>
                    </div>
                  ) : error ? (
                    <div className="orders-error">
                      <div className="error-box">{error}</div>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="orders-empty">
                      <div className="empty-icon">
                        <svg viewBox="0 0 24 24" width="64" height="64">
                          <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-2h2V7h-4v2h2z" />
                        </svg>
                      </div>
                      <h3>Henüz siparişiniz yok</h3>
                      <p>Hemen alışverişe başlayın ve siparişlerinizi buradan takip edin.</p>
                      <Link to="/" className="empty-shop-btn">Alışverişe Başla</Link>
                    </div>
                  ) : (
                    <div className="orders-list">
                      {orders.map((order) => (
                        <div key={order.id} className="order-card">
                          <div className="order-card-header">
                            <div className="order-meta">
                              <div className="order-meta-item">
                                <span className="order-meta-label">Sipariş No</span>
                                <span className="order-meta-value">#{order.id}</span>
                              </div>
                              <div className="order-meta-item">
                                <span className="order-meta-label">Tarih</span>
                                <span className="order-meta-value">
                                  {order.orderDate ? formatDate(order.orderDate) : '-'}
                                </span>
                              </div>
                            </div>
                            <span className={`order-status ${getStatusClass(order.status)}`}>
                              <span className="status-dot"></span>
                              {getStatusLabel(order.status)}
                            </span>
                          </div>

                          <div className="order-items">
                            {(order.orderItems || []).map((item, idx) => (
                              <div key={idx} className="order-item">
                                <div className="order-item-image">
                                  {item.productImage ? (
                                    <img
                                      src={item.productImage}
                                      alt={item.productName}
                                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                                    />
                                  ) : (
                                    <svg viewBox="0 0 24 24" width="24" height="24">
                                      <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z" />
                                    </svg>
                                  )}
                                </div>
                                <div className="order-item-details">
                                  <div className="order-item-name">{item.productName || `Ürün #${item.productId}`}</div>
                                  <div className="order-item-qty">Adet: {item.quantity || 1}</div>
                                </div>
                                <div className="order-item-price">
                                  {item.price ? formatPrice(item.price) : '-'}
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="order-card-footer">
                            <div className="order-total">
                              Toplam: <strong>{order.totalPrice ? formatPrice(order.totalPrice) : '-'}</strong>
                            </div>
                            <button className="order-action-btn">Sipariş Detayı</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {activeTab === 'profile' && (
                <>
                  <div className="content-header">
                    <h2>Hesap Bilgilerim</h2>
                    <p>Kişisel bilgilerinizi görüntüleyin.</p>
                  </div>
                  <div className="orders-list" style={{ padding: '28px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid var(--n11-border)' }}>
                        <span style={{ color: 'var(--n11-grey)', fontSize: '14px' }}>Kullanıcı Adı</span>
                        <span style={{ fontWeight: '600', fontSize: '14px' }}>{user?.username || '-'}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid var(--n11-border)' }}>
                        <span style={{ color: 'var(--n11-grey)', fontSize: '14px' }}>E-posta</span>
                        <span style={{ fontWeight: '600', fontSize: '14px' }}>{user?.email || '-'}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </section>
          </div>
        </div>
      </main>

      <footer className="main-footer">
        <div className="container">
          <p>© 2026 n11 Clone - Tüm Hakları Saklıdır.</p>
        </div>
      </footer>
    </div>
  );
};

export default Account;
