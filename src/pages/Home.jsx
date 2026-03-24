import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductDrawer from '../components/ProductDrawer';
import { MOCK_PRODUCTS } from '../data/products';
import './Home.css';

const CATEGORIES = [
  { name: 'Blazers', image: '/images/category_kurta.png' },
  { name: 'Dresses', image: '/images/category_dress.png' },
  { name: 'Co-ords', image: '/images/category_ethnic.png' },
  { name: 'Outerwear', image: '/images/category_fusion.png' }
];

const Home = () => {
  const navigate = useNavigate();
  const [drawerProduct, setDrawerProduct] = useState(null);

  const handleCategoryClick = (categoryName) => {
    navigate(`/collections?category=${categoryName.toLowerCase().replace(/\s+/g, '-')}`);
  };
  // Reveal animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <img src="/images/hero_banner.png" alt="LIVN Premium Collection" className="hero-bg-img" />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content container reveal-on-scroll">
          <h1 className="hero-title">Dress the Part</h1>
          <p className="hero-subtitle">Elevate your everyday style with modern elegance and effortless confidence.</p>
          <div className="hero-actions">
            <Link to="#collections" className="btn btn-gold">Shop Now</Link>
          </div>
        </div>
      </section>

      {/* Temple Divider */}
      <div className="temple-divider"></div>

      {/* Categories Section */}
      <section id="collections" className="categories-section section-padding container">
        <div className="section-header reveal-on-scroll">
          <h2 className="section-title">Shop by Style</h2>
          <p className="section-desc">Curated categories for every mood, occasion, and aesthetic.</p>
        </div>
        
        <div className="category-grid grid grid-cols-4">
          {CATEGORIES.map((cat, index) => (
            <div
              key={index}
              className="category-card reveal-on-scroll"
              style={{ animationDelay: `${index * 0.1}s`, cursor: 'pointer' }}
              onClick={() => handleCategoryClick(cat.name)}
            >
              <div className="category-img-container">
                <img src={cat.image} alt={cat.name} className="category-img" loading="lazy" />
                <div className="category-border"></div>
              </div>
              <h3 className="category-name">{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <div className="temple-divider-sm container"><div className="carving-line"></div></div>

      {/* Featured Products */}
      <section id="new-arrivals" className="featured-section section-padding container">
        <div className="section-header reveal-on-scroll">
          <h2 className="section-title">New Arrivals</h2>
          <p className="section-desc">Fresh drops. Clean cuts. Designed with precision and modern sophistication.</p>
        </div>
        
        <div className="product-grid grid grid-cols-4">
          {MOCK_PRODUCTS.map((product, index) => (
            <div key={product.id} className="reveal-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProductCard product={product} onClick={setDrawerProduct} />
            </div>
          ))}
        </div>
        <div className="text-center mt-50 reveal-on-scroll">
          <Link to="/collections" className="btn btn-outline" style={{marginTop: '40px'}}>View All Collections</Link>
        </div>
      </section>

      {/* Bespoke/Custom Stitching */}
      <section id="custom-stitching" className="bespoke-section">
        <div className="bespoke-bg"></div>
        <div className="container bespoke-content grid grid-cols-2">
          <div className="bespoke-text reveal-on-scroll">
            <h2 className="section-title" style={{color: 'var(--color-maroon-dark)'}}>Made to Measure</h2>
            <p className="bespoke-desc">
              Tailoring that moves with you. Every cut, seam, and silhouette is crafted precisely to your measurements — because fit is everything.
            </p>
            <ul className="bespoke-features">
              <li>✦ Perfect Fit Guarantee</li>
              <li>✦ Premium Fabric Selection</li>
              <li>✦ Express Delivery Available</li>
            </ul>
            <Link to="/#collections" className="btn btn-primary" style={{marginTop: '20px'}}>Book a Fitting</Link>
          </div>
          <div className="bespoke-image-container reveal-on-scroll" style={{ animationDelay: '0.2s' }}>
            <img src="/images/category_dress.png" alt="Custom Stitching" className="bespoke-img" style={{objectPosition: 'top'}} />
            <div className="gold-frame"></div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section section-padding container">
        <div className="section-header reveal-on-scroll">
          <h2 className="section-title">What They're Saying</h2>
          <div className="temple-ornament"></div>
        </div>
        
        <div className="testimonials-grid grid grid-cols-3">
          {[
            { name: "Ananya S.", text: "The quality is unreal. Every piece feels intentional, premium, and effortlessly stylish." },
            { name: "Priya R.", text: "The custom fit service is flawless. Got exactly what I envisioned on the first try." },
            { name: "Meera V.", text: "I wore their dress to a rooftop event and the compliments didn't stop. Truly premium." }
          ].map((test, index) => (
            <div key={index} className="testimonial-card reveal-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="quote-mark">“</div>
              <p className="testimonial-text">{test.text}</p>
              <h4 className="testimonial-name">— {test.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {drawerProduct && <ProductDrawer product={drawerProduct} onClose={() => setDrawerProduct(null)} />}
    </div>
  );
};

export default Home;
