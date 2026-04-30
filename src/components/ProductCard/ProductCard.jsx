import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { title, image, price, oldPrice, rating, reviews, freeShipping } = product;

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={image} alt={title} className="product-image" />
        <button className="wishlist-btn">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="none" stroke="currentColor" strokeWidth="2" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
        {freeShipping && <span className="free-shipping-badge">ÜCRETSİZ KARGO</span>}
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(rating) ? 'star filled' : 'star'}>★</span>
            ))}
          </div>
          <span className="review-count">({reviews})</span>
        </div>

        <div className="product-price-section">
          {oldPrice && <span className="old-price">{oldPrice.toLocaleString()} TL</span>}
          <div className="current-price">
            <span className="price-value">{price.toLocaleString()}</span>
            <span className="price-currency">TL</span>
          </div>
        </div>

        <div className="sepette-badge">
          SEPETTE %10 İNDİRİM
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
