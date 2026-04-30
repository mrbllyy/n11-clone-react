import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';

const OrderSuccess = () => {
  return (
    <div className="order-success-page" style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Header />
      <main className="container" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '80px 20px',
        marginTop: '30px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
      }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          backgroundColor: '#e8f5e9', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#2e7d32',
          fontSize: '40px',
          marginBottom: '24px'
        }}>
          ✓
        </div>
        <h1 style={{ fontSize: '28px', color: '#333', marginBottom: '16px' }}>Siparişiniz Alındı!</h1>
        <p style={{ color: '#666', textAlign: 'center', maxWidth: '500px', lineHeight: '1.6', marginBottom: '32px' }}>
          Harika! Siparişinizi başarıyla aldık. Arka planda stok rezervasyonu ve ödeme işlemleri (SAGA) başlatıldı. 
          En kısa sürede bilgilendirileceksiniz.
        </p>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Link to="/" className="start-shopping-btn" style={{ 
            textDecoration: 'none',
            backgroundColor: '#5d3ebc',
            color: 'white',
            padding: '12px 30px',
            borderRadius: '4px',
            fontWeight: '600'
          }}>
            Anasayfaya Dön
          </Link>
          <Link to="/hesabim" style={{ 
            textDecoration: 'none',
            color: '#5d3ebc',
            padding: '12px 30px',
            borderRadius: '4px',
            fontWeight: '600',
            border: '1px solid #5d3ebc'
          }}>
            Siparişlerimi Gör
          </Link>
        </div>
      </main>
    </div>
  );
};

export default OrderSuccess;
