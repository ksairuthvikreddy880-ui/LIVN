import { useState, useEffect } from 'react';
import { getOrders, updateOrderStatus } from '../lib/supabase';
import { Copy, Check, RefreshCw, LogOut } from 'lucide-react';
import './Admin.css';

const STATUS_OPTIONS = ['New', 'Sent', 'Stitching', 'Ready', 'Delivered'];

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  // Simple mock authentication for demo
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'likkijas@2026') {
      setIsAuthenticated(true);
      fetchOrders();
    } else {
      alert('Invalid credentials.');
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data, error } = await getOrders();
      if (!error && data) {
        setOrders(data);
      }
    } catch {
      console.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    const originalOrders = [...orders];
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    
    try {
      const { error } = await updateOrderStatus(orderId, newStatus);
      if (error) {
        throw new Error();
      }
    } catch {
      alert('Failed to update status');
      setOrders(originalOrders);
    }
  };

  const copyOrderDetails = (order) => {
    const text = `
Order ID: ${(order.id).toString().toUpperCase()}
Customer: ${order.customer_name}
Phone: ${order.customer_phone}
Product: ${order.product_name}
Size: ${order.selected_size}
Measurements: ${order.measurements || 'N/A'}
Address: ${order.shipping_address}
Total: Rs. ${order.price}
Status: ${order.status}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedId(order.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-page container">
        <div className="admin-login-card animate-fade-in-up">
          <h1 className="admin-title">Admin Portal</h1>
          <p className="admin-subtitle">Enter credentials to access the temple vault.</p>
          <form onSubmit={handleLogin} className="admin-form">
            <input 
              type="password" 
              placeholder="Enter Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="admin-input"
            />
            <button type="submit" className="btn btn-primary full-width-btn">Enter</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard container">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Orders Dashboard</h1>
          <p className="admin-subtitle">Manage all bespoke requests and shipments.</p>
        </div>
        <div className="admin-actions">
          <button className="btn btn-outline admin-header-btn" onClick={fetchOrders} disabled={loading}>
            <RefreshCw size={16} className={loading ? 'spinning' : ''} /> {loading ? 'Syncing...' : 'Sync'}
          </button>
          <button className="btn btn-gold admin-header-btn" onClick={() => setIsAuthenticated(false)}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      <div className="admin-content">
        {orders.length === 0 && !loading ? (
          <div className="empty-state">
            <p>No orders found in the vault.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer Info</th>
                  <th>Product Details</th>
                  <th>Measurements</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="animate-fade-in-up">
                    <td className="font-heading text-maroon font-bold">
                      {(order.id).toString().toUpperCase()}
                      <div className="order-date">{(new Date(order.created_at)).toLocaleDateString()}</div>
                    </td>
                    <td>
                      <div className="font-bold">{order.customer_name}</div>
                      <div className="text-secondary">{order.customer_phone}</div>
                      <div className="text-sm border-top-light mt-2 pt-2">{order.shipping_address}</div>
                    </td>
                    <td>
                      <div className="font-bold text-maroon">{order.product_name}</div>
                      <div className="text-secondary">Size: {order.selected_size}</div>
                      <div className="font-bold border-top-light mt-2 pt-2">₹{order.price?.toLocaleString('en-IN')}</div>
                    </td>
                    <td className="measurements-cell">
                      {order.measurements || 'Standard'}
                    </td>
                    <td>
                      <select 
                        className={`status-select status-${order.status?.toLowerCase()}`}
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      >
                        {STATUS_OPTIONS.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button 
                        className="btn-icon" 
                        onClick={() => copyOrderDetails(order)}
                        title="Copy Details"
                      >
                        {copiedId === order.id ? <Check size={18} className="text-success" /> : <Copy size={18} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
