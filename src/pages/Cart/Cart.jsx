import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Header from '../../components/Header/Header';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, cartItemCount } = useCart();

  return (
    <div className="cart-page">
      <Header />
      
      <main className="cart-main container">
        <h1 className="cart-title">Sepetim ({cartItemCount} Ürün)</h1>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <svg viewBox="0 0 24 24" width="64" height="64">
                <path fill="currentColor" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </div>
            <h2>Sepetinizde ürün bulunmamaktadır.</h2>
            <p>On binlerce ürün arasından ihtiyacınız olanı hemen bulabilirsiniz.</p>
            <Link to="/" className="start-shopping-btn">Alışverişe Başla</Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items-section">
              <div className="cart-items-header">
                <span>Ürünler</span>
                <button className="clear-cart-btn" onClick={clearCart}>Sepeti Temizle</button>
              </div>
              
              <div className="cart-items-list">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className="item-details">
                      <h3 className="item-title">{item.title}</h3>
                      {item.freeShipping && <span className="free-shipping-tag">Ücretsiz Kargo</span>}
                    </div>
                    
                    <div className="item-quantity-controls">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                      >-</button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>

                    <div className="item-price-section">
                      <div className="item-price">
                        {(item.price * item.quantity).toLocaleString()} TL
                      </div>
                      <button className="remove-item-btn" onClick={() => removeFromCart(item.id)}>
                        <svg viewBox="0 0 24 24" width="20" height="20">
                          <path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="cart-summary-section">
              <div className="summary-card">
                <h2>Sipariş Özeti</h2>
                
                <div className="summary-row">
                  <span>Ürünlerin Toplamı</span>
                  <span>{cartTotal.toLocaleString()} TL</span>
                </div>
                
                <div className="summary-row">
                  <span>Kargo Ücreti</span>
                  <span>{cartTotal >= 500 ? '0 TL' : '49.99 TL'}</span>
                </div>

                {cartTotal >= 500 && (
                  <div className="free-shipping-notice">
                    Kargonuz Bedava!
                  </div>
                )}

                <div className="summary-total">
                  <span>Ödenecek Tutar</span>
                  <span className="total-price">
                    {(cartTotal + (cartTotal >= 500 ? 0 : 49.99)).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL
                  </span>
                </div>

                <button className="checkout-btn">Alışverişi Tamamla</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
