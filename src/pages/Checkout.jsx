import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { getProductById } from '../data/products';
import { createOrder } from '../lib/supabase';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import './Checkout.css';

const Checkout = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const size = searchParams.get('size') || 'Standard';
  const product = getProductById(id);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    measurements: size === 'Custom' ? '' : size,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <div className="container" style={{ padding: '150px 0', textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <Link to="/" className="btn btn-gold mt-50">Back</Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const orderPayload = {
        product_id: product.id,
        product_name: product.name,
        price: product.price,
        customer_name: formData.name,
        customer_phone: formData.phone,
        shipping_address: formData.address,
        measurements: formData.measurements,
        selected_size: size
      };

      const { data, error } = await createOrder(orderPayload);
      
      if (!error) {
        setOrderInfo(data);
        setIsSuccess(true);
      } else {
        alert("Failed to create order. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="checkout-success container">
        <div className="success-card animate-fade-in-up">
          <CheckCircle2 size={80} className="success-icon" />
          <h1 className="success-title">Order Confirmed</h1>
          <p className="success-desc">
            Your divine attire is being prepared. We will contact you at <strong>{formData.phone}</strong> regarding the delivery and bespoke details.
          </p>
          <div className="order-summary-box">
            <p><strong>Order ID:</strong> {(orderInfo?.id || orderInfo?.[0]?.id || "LIVN-" + Math.floor(Math.random()*10000)).toString().toUpperCase()}</p>
            <p><strong>Product:</strong> {product.name}</p>
            <p><strong>Amount:</strong> ₹{product.price.toLocaleString('en-IN')}</p>
          </div>
          <Link to="/" className="btn btn-gold mt-50">Return to Collections</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page container">
      <Link to={`/product/${id}`} className="back-link">
        <ArrowLeft size={18} />
        <span>Back to Product</span>
      </Link>

      <div className="checkout-layout grid grid-cols-2">
        <div className="checkout-form-section animate-fade-in-up">
          <h1 className="checkout-title">Secure Checkout</h1>
          <p className="checkout-subtitle">Enter your details to confirm your order.</p>

          <form onSubmit={handleSubmit} className="minimal-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" required value={formData.name} onChange={handleInputChange} placeholder="E.g. Meera Sharma" />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="+91" />
            </div>

            <div className="form-group">
              <label htmlFor="address">Delivery Address</label>
              <textarea id="address" name="address" required rows="3" value={formData.address} onChange={handleInputChange} placeholder="Complete shipping address"></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="measurements">
                {size === 'Custom' ? 'Enter Bespoke Measurements' : 'Size / Additional Dimensions'}
              </label>
              <textarea 
                id="measurements" 
                name="measurements" 
                rows="2" 
                value={formData.measurements} 
                onChange={handleInputChange} 
                placeholder={size === 'Custom' ? "E.g. Bust: 34in, Waist: 28in, Hips: 38in" : "Any specific fit requirements?"}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary full-width-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Confirm Order & Pay Later'}
            </button>
          </form>
        </div>

        <div className="checkout-summary animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="summary-card">
            <h3 className="summary-title">Order Summary</h3>
            <div className="temple-divider" style={{ margin: '15px 0' }}></div>
            
            <div className="summary-product">
              <img src={product.image} alt={product.name} className="summary-image" />
              <div className="summary-details">
                <h4 className="summary-product-name">{product.name}</h4>
                <p className="summary-product-cat">{product.category}</p>
                <p className="summary-size">Size: {size}</p>
                <div className="summary-price">₹{product.price.toLocaleString('en-IN')}</div>
              </div>
            </div>

            <div className="summary-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>₹{product.price.toLocaleString('en-IN')}</span>
              </div>
              <div className="total-row">
                <span>Shipping</span>
                <span>Complimentary</span>
              </div>
              <div className="total-row grand-total">
                <span>Total</span>
                <span>₹{product.price.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="secure-checkout-badge">
              <span>✦</span> Secure Transaction
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
