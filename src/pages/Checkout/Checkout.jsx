import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/api';
import Header from '../../components/Header/Header';
import './Checkout.css';

const Checkout = () => {
  const { cart, cartTotal, cartItemCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [addressData, setAddressData] = useState({
    fullName: '',
    phone: '',
    city: '',
    district: '',
    fullAddress: ''
  });

  const [paymentData, setPaymentData] = useState({
    cardHolderName: '',
    cardNumber: '',
    expireDate: '',
    cvv: ''
  });

  const handleAddressChange = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderRequest = {
        items: cart.map(item => ({
          productId: item.productId || item.id,
          quantity: item.quantity
        })),
        addressInfo: addressData,
        paymentCard: paymentData
      };

      // Adım 3: Siparişi Başlatma (Frontend -> Order Service)
      // Gateway üzerinden order-service'e gönderilir.
      const response = await api.post('/api/orders', orderRequest);

      if (response.status === 200 || response.status === 201) {
        // Adım 4: Order Service (SAGA Başlıyor) - Backend süreci başlattı.
        // Frontend başarı sayfasına yönlendirir.
        navigate('/siparis-basarili');
      }
    } catch (error) {
      console.error('Sipariş oluşturulurken hata oluştu:', error);
      alert('Sipariş oluşturulamadı. Lütfen tekrar deneyiniz.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    navigate('/sepet');
    return null;
  }

  return (
    <div className="checkout-page">
      <Header />
      
      <main className="checkout-main container">
        <h1 className="checkout-title">Ödeme Bilgileri</h1>

        <div className="checkout-content">
          <form className="checkout-form" onSubmit={handleSubmitOrder}>
            <section className="checkout-section">
              <h2>1. Teslimat Adresi</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Ad Soyad</label>
                  <input name="fullName" value={addressData.fullName} onChange={handleAddressChange} required />
                </div>
                <div className="form-group">
                  <label>Telefon</label>
                  <input name="phone" value={addressData.phone} onChange={handleAddressChange} required />
                </div>
                <div className="form-group">
                  <label>Şehir</label>
                  <input name="city" value={addressData.city} onChange={handleAddressChange} required />
                </div>
                <div className="form-group">
                  <label>İlçe</label>
                  <input name="district" value={addressData.district} onChange={handleAddressChange} required />
                </div>
                <div className="form-group full-width">
                  <label>Adres Detayı</label>
                  <textarea name="fullAddress" value={addressData.fullAddress} onChange={handleAddressChange} required />
                </div>
              </div>
            </section>

            <section className="checkout-section">
              <h2>2. Ödeme Bilgileri</h2>
              <div className="payment-card-form">
                <div className="form-group">
                  <label>Kart Üzerindeki İsim</label>
                  <input name="cardHolderName" value={paymentData.cardHolderName} onChange={handlePaymentChange} required />
                </div>
                <div className="form-group">
                  <label>Kart Numarası</label>
                  <input name="cardNumber" value={paymentData.cardNumber} maxLength="16" onChange={handlePaymentChange} required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Son Kullanma (AA/YY)</label>
                    <input name="expireDate" value={paymentData.expireDate} placeholder="MM/YY" onChange={handlePaymentChange} required />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input name="cvv" value={paymentData.cvv} maxLength="3" onChange={handlePaymentChange} required />
                  </div>
                </div>
              </div>
            </section>

            <button type="submit" className="complete-order-btn" disabled={loading}>
              {loading ? 'Sipariş İşleniyor...' : 'Ödemeyi Yap ve Bitir'}
            </button>
          </form>

          <aside className="checkout-summary">
            <div className="summary-card">
              <h2>Sipariş Özeti</h2>
              <div className="summary-items">
                {cart.map(item => (
                  <div key={item.id} className="summary-item">
                    <span>{item.title} (x{item.quantity})</span>
                    <span>{(item.price * item.quantity).toLocaleString()} TL</span>
                  </div>
                ))}
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row">
                <span>Ürün Toplamı</span>
                <span>{cartTotal.toLocaleString()} TL</span>
              </div>
              <div className="summary-row">
                <span>Kargo Ücreti</span>
                <span>{cartTotal >= 500 ? '0 TL' : '49.99 TL'}</span>
              </div>
              <div className="summary-total">
                <span>Toplam</span>
                <span>{(cartTotal + (cartTotal >= 500 ? 0 : 49.99)).toLocaleString()} TL</span>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
