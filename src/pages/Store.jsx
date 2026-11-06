import { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import { motion, AnimatePresence } from 'framer-motion';
import { storeItems, storeCategories } from '../data/store';

// The checkout server runs on its own host in production (GitHub Pages only
// serves static files). Locally it's empty and Vite proxies /api to :3001.
const API_URL = import.meta.env.VITE_API_URL ?? '';
import Poster from '../components/Poster';
import './Store.css';

const CATEGORIES = storeCategories;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: 'easeOut' },
  }),
};

const BREAKPOINTS = { default: 3, 1024: 2, 640: 1 };

export default function Store() {
  const [category, setCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [toast, setToast] = useState(null); // { msg, type }

  // Show success/cancel feedback from Stripe redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      setToast({ msg: 'Order placed! Check your email for confirmation. 🎉', type: 'success' });
      setCart([]);
      window.history.replaceState({}, '', '/store');
    } else if (params.get('canceled') === 'true') {
      setToast({ msg: 'Checkout canceled — your cart is still saved.', type: 'info' });
      window.history.replaceState({}, '', '/store');
    }
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(t);
  }, [toast]);

  const filtered = category === 'All'
    ? storeItems
    : storeItems.filter((i) => i.category === category);

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((c) => c.id === item.id);
      if (exists) return prev.map((c) => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((c) => c.id !== id));
  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((c) => c.id === id ? { ...c, qty: c.qty + delta } : c)
        .filter((c) => c.qty > 0)
    );
  };

  const cartTotal = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map((c) => ({
            id:          c.id,
            title:       c.title,
            description: c.description,
            price:       c.price,
            qty:         c.qty,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Checkout failed. Please try again.');
      }

      // Redirect to Stripe-hosted checkout page
      window.location.href = data.url;
    } catch (err) {
      setCheckoutLoading(false);
      setToast({ msg: err.message, type: 'error' });
    }
  };

  return (
    <div className="page-wrapper store-page">
      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className={`store-toast store-toast--${toast.type}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {toast.msg}
            <button className="store-toast__close" onClick={() => setToast(null)}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="container">
        <motion.div
          className="store-header"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <div>
            <h1 className="section-title">store</h1>
          </div>
          <button
            className="cart-btn"
            onClick={() => setCartOpen(true)}
            aria-label="Open cart"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {cartCount > 0 && <span className="cart-btn__badge">{cartCount}</span>}
          </button>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="store-filters"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${category === cat ? 'filter-btn--active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry Product Grid */}
        <Masonry
          breakpointCols={BREAKPOINTS}
          className="masonry-grid"
          columnClassName="masonry-grid__col"
        >
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={i}
            >
              <ProductCard
                item={item}
                index={i}
                onAddToCart={() => addToCart(item)}
                onView={() => setSelectedItem(item)}
              />
            </motion.div>
          ))}
        </Masonry>
      </div>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              className="cart-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
            />
            <motion.aside
              className="cart-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="cart-drawer__header">
                <h2>your cart</h2>
                <button className="cart-drawer__close" onClick={() => setCartOpen(false)}>✕</button>
              </div>

              {cart.length === 0 ? (
                <div className="cart-drawer__empty">
                  <p>Your cart is empty 🛍️</p>
                  <button className="btn btn-outline" onClick={() => setCartOpen(false)}>
                    keep browsing
                  </button>
                </div>
              ) : (
                <>
                  <div className="cart-drawer__items">
                    {cart.map((item) => (
                      <div key={item.id} className="cart-item">
                        <div
                          className="cart-item__swatch"
                          style={{ background: item.color }}
                        >
                          {item.thumbs?.[0] && (
                            <img src={item.thumbs[0]} alt="" className="cart-item__thumb" loading="lazy" />
                          )}
                        </div>
                        <div className="cart-item__info">
                          <p className="cart-item__title">{item.title}</p>
                          <p className="cart-item__price">${(item.price / 100).toFixed(2)}</p>
                        </div>
                        <div className="cart-item__qty">
                          <button onClick={() => updateQty(item.id, -1)}>−</button>
                          <span>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)}>+</button>
                        </div>
                        <button
                          className="cart-item__remove"
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="cart-drawer__footer">
                    <div className="cart-drawer__total">
                      <span>Total</span>
                      <span>${(cartTotal / 100).toFixed(2)}</span>
                    </div>
                    <button
                      className="btn btn-primary"
                      style={{ width: '100%', justifyContent: 'center' }}
                      onClick={handleCheckout}
                      disabled={checkoutLoading}
                    >
                      {checkoutLoading ? 'Redirecting…' : 'checkout with Stripe'}
                    </button>
                    <p className="cart-drawer__note">Secure checkout powered by Stripe</p>
                  </div>
                </>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              className="cart-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
            />
            <motion.div
              className="product-modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
            >
              <button
                className="product-modal__close"
                onClick={() => setSelectedItem(null)}
              >
                ✕
              </button>
              <div className="product-modal__image" style={{ background: selectedItem.color }}>
                {selectedItem.images?.[0]
                  ? (
                    <img
                      src={selectedItem.images[0]}
                      alt={selectedItem.title}
                      className="product-modal__img"
                      /* the grid's thumbnail stands in until the full file lands */
                      style={selectedItem.thumbs?.[0] ? {
                        backgroundImage: `url(${selectedItem.thumbs[0]})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      } : undefined}
                    />
                  )
                  : <span>🖼</span>}
              </div>
              <div className="product-modal__body">
                <div className="product-modal__meta">
                  <span className="tag">{selectedItem.category}</span>
                  {selectedItem.badge && (
                    <span className="product-modal__badge">{selectedItem.badge}</span>
                  )}
                </div>
                <h2 className="product-modal__title">{selectedItem.title}</h2>
                <p className="product-modal__price">
                  ${(selectedItem.price / 100).toFixed(2)}
                </p>
                <p className="product-modal__desc">{selectedItem.description}</p>
                <ul className="product-modal__details">
                  {selectedItem.details.map((d) => (
                    <li key={d}>
                      <span>·</span> {d}
                    </li>
                  ))}
                </ul>
                {selectedItem.stock <= 3 && selectedItem.stock > 0 && (
                  <p className="product-modal__stock-warn">
                    Only {selectedItem.stock} left!
                  </p>
                )}
                <button
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
                  onClick={() => { addToCart(selectedItem); setSelectedItem(null); }}
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProductCard({ item, index, onAddToCart, onView }) {
  return (
    <Poster
      index={index}
      className="product-card"
      style={{ '--poster-accent': item.color }}
      onActivate={onView}
      aria-label={item.title}
    >
      <button
        className="product-card__image-btn"
        onClick={onView}
        aria-label={`View ${item.title}`}
      >
        <div
          className="product-card__image"
          style={{ background: `linear-gradient(135deg, ${item.color}cc, ${item.color}55)` }}
        >
          {item.images?.[0] ? (
            <img
              src={item.thumbs?.[0] || item.images[0]}
              alt={item.title}
              className="product-card__img"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <span className="product-card__image-placeholder">🖼</span>
          )}
          {item.badge && (
            <span className="product-card__badge">{item.badge}</span>
          )}
          <div className="product-card__hover-overlay">
            <span>view details</span>
          </div>
        </div>
      </button>
      <div className="product-card__body">
        <h3 className="product-card__title">{item.title}</h3>
        <p className="product-card__desc">{item.description.slice(0, 80)}…</p>
        <div className="product-card__footer">
          <span className="product-card__price">${(item.price / 100).toFixed(2)}</span>
          <button className="product-card__add-btn" onClick={onAddToCart}>
            + add to cart
          </button>
        </div>
      </div>
    </Poster>
  );
}
