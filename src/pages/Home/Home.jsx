import { useState, useEffect } from 'react';
import api from '../../api/api';
import Header from '../../components/Header/Header';
import CategoryBar from '../../components/CategoryBar/CategoryBar';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/api/product');
        if (response.data && response.data.length > 0) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home-page">
      <Header />
      <CategoryBar />

      <main className="home-main">
        <section className="hero-banner-container">
          <div className="container">
            <div className="hero-banner">
              <div className="banner-content">
                <h2>Büyük Bahar İndirimi Başladı!</h2>
                <p>Seçili ürünlerde %50'ye varan fırsatları kaçırma.</p>
                <button className="banner-btn">Hemen Keşfet</button>
              </div>
              <div className="banner-image">
                {/* Mock banner image placeholder */}
              </div>
            </div>
          </div>
        </section>

        <section className="products-section container">
          <div className="section-header">
            <h2 className="section-title">Günün Fırsatları</h2>
            <a href="#" className="see-all">Tümünü Gör</a>
          </div>

          <div className="product-grid">
            {loading ? (
              <p style={{ textAlign: 'center', width: '100%', padding: '20px' }}>Ürünler yükleniyor...</p>
            ) : (
              products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </section>

        <section className="campaign-banners container">
          <div className="campaign-grid">
            <div className="campaign-card" style={{ backgroundColor: '#e3f2fd' }}>
              <h3>Elektronikte Dev Fırsatlar</h3>
              <p>Kaçırılmayacak fiyatlar burada.</p>
            </div>
            <div className="campaign-card" style={{ backgroundColor: '#fce4ec' }}>
              <h3>Modada Yeni Sezon</h3>
              <p>Tarzını yansıtacak parçalar.</p>
            </div>
            <div className="campaign-card" style={{ backgroundColor: '#e8f5e9' }}>
              <h3>Evini Yenile</h3>
              <p>Dekorasyonda bahar rüzgarı.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="main-footer">
        <div className="container">
          <p>© 2026 n11 Clone - Tüm Hakları Saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
