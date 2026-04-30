import { useState, useEffect } from 'react';
import api from '../../api/api';
import Header from '../../components/Header/Header';
import CategoryBar from '../../components/CategoryBar/CategoryBar';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Home.css';

const MOCK_PRODUCTS = [
  {
    id: 1,
    title: 'iPhone 15 Pro Max 256 GB Naturel Titanyum',
    image: 'https://cdn.dsmcdn.com/ty1005/product/media/images/20230913/11/413481232/1004122114/1_org_zoom.jpg',
    price: 78999,
    oldPrice: 84999,
    rating: 4.8,
    reviews: 1250,
    freeShipping: true
  },
  {
    id: 2,
    title: 'Samsung Galaxy S24 Ultra 512 GB Gri',
    image: 'https://cdn.dsmcdn.com/ty1144/product/media/images/20240118/14/66411545/1105451122/1_org_zoom.jpg',
    price: 69499,
    oldPrice: 72000,
    rating: 4.7,
    reviews: 840,
    freeShipping: true
  },
  {
    id: 3,
    title: 'AirPods Pro (2. Nesil) ve MagSafe Şarj Kutusu',
    image: 'https://cdn.dsmcdn.com/ty541/product/media/images/20220923/16/178523363/576625442/1_org_zoom.jpg',
    price: 8499,
    oldPrice: 9999,
    rating: 4.9,
    reviews: 3200,
    freeShipping: true
  },
  {
    id: 4,
    title: 'PlayStation 5 Slim Digital Edition Oyun Konsolu',
    image: 'https://cdn.dsmcdn.com/ty1041/product/media/images/20231110/16/413481232/1023412341/1_org_zoom.jpg',
    price: 18999,
    oldPrice: 21000,
    rating: 4.6,
    reviews: 450,
    freeShipping: true
  },
  {
    id: 5,
    title: 'Dyson V15 Detect Absolute Kablosuz Süpürge',
    image: 'https://cdn.dsmcdn.com/ty987/product/media/images/20230825/11/413481232/1001231231/1_org_zoom.jpg',
    price: 24999,
    oldPrice: 27500,
    rating: 4.8,
    reviews: 2100,
    freeShipping: true
  },
  {
    id: 6,
    title: 'Apple Watch Series 9 GPS 45mm Gece Yarısı',
    image: 'https://cdn.dsmcdn.com/ty1005/product/media/images/20230913/11/413481232/1004122115/1_org_zoom.jpg',
    price: 15499,
    oldPrice: 16999,
    rating: 4.7,
    reviews: 620,
    freeShipping: true
  },
  {
    id: 7,
    title: 'Stanley Quencher H2.0 Termos Bardak 1.18 L',
    image: 'https://cdn.dsmcdn.com/ty876/product/media/images/20230512/11/413481232/901231231/1_org_zoom.jpg',
    price: 2499,
    oldPrice: 2999,
    rating: 4.9,
    reviews: 4500,
    freeShipping: false
  },
  {
    id: 8,
    title: 'Xiaomi Air Fryer 6L Akıllı Fritöz',
    image: 'https://cdn.dsmcdn.com/ty541/product/media/images/20220923/16/178523363/576625443/1_org_zoom.jpg',
    price: 4599,
    oldPrice: 5200,
    rating: 4.6,
    reviews: 1800,
    freeShipping: true
  }
];

function Home() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/api/product');
        if (response.data && response.data.length > 0) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error('Error fetching products, using mock data:', error);
        // Fallback to MOCK_PRODUCTS is already handled by initial state
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
