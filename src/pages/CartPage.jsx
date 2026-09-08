import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/ui/Breadcrumb";
import EmptyState from "../components/ui/EmptyState";
import { getCartItems, removeCartItem, updateCartItem } from "../api/cart.service";
const formatPrice = (value) => `$${value.toFixed(0)}`;

const CartItem = ({ item, onQuantityChange, onRemove }) => (
  <article className="cart-page__item">
    <div className="cart-page__image-box"><img className="image-box-img" src={item.image} alt={item.name} /></div>
    <div className="cart-page__details">
      <div className="cart-page__meta">
        <div>
          <h2 className="meta-heading">{item.name}</h2>
          <p className="item-size">Size: {item.size}</p>
          <p className="item-size">Color: {item.color}</p>
        </div>
        <button className="cart-page__remove" type="button" onClick={() => onRemove(item.id)} aria-label={`Remove ${item.name}`}>×</button>
      </div>
      <div className="cart-page__bottom-row">
        <div className="cart-page__price-wrap">
          <strong className="cart-page__price">{formatPrice(item.price)}</strong>
          {item.oldPrice && <span className="cart-page__old-price">{formatPrice(item.oldPrice)}</span>}
        </div>
        <div className="cart-page__qty-box" aria-label={`Quantity for ${item.name}`}>
          <button className="qty-btn" type="button" onClick={() => onQuantityChange(item.id, -1)} aria-label="Decrease quantity">−</button>
          <span className="qty-no">{item.quantity}</span>
          <button className="qty-btn" type="button" onClick={() => onQuantityChange(item.id, 1)} aria-label="Increase quantity">+</button>
        </div>
      </div>
    </div>
  </article>
);

const CartPage = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [discountRate, setDiscountRate] = useState(0);
  const subtotal = useMemo(() => items.reduce((total, item) => total + item.price * item.quantity, 0), [items]);
  const discount = subtotal * discountRate;
  const deliveryFee = items.length ? 15 : 0;
  const total = subtotal - discount + deliveryFee;

  useEffect(() => {
    getCartItems()
      .then(setItems)
      .finally(() => setIsLoading(false));
  }, []);

  const updateQuantity = (id, change) => {
    const item = items.find((cartItem) => cartItem.id === id);
    if (!item) return;
    if (item.quantity + change < 1) {
      removeCartItem(id).then(setItems);
      return;
    }
    updateCartItem(id, item.quantity + change).then(setItems);
  };

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    setDiscountRate(code === "SAVE20" ? 0.2 : code === "SAVE10" ? 0.1 : 0);
  };

  return (
    <>
      <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Cart" }]} />
      <main className="cart-page">
        <div className="cart-page__container">
          <section className="cart-page__summary">
            <div className="cart-page__header"><h1 className="heading">Your Cart</h1></div>
            {isLoading ? <p>Loading cart...</p> : items.length ? (
              <div className="cart-page__items">
                {items.map((item) => <CartItem key={item.id} item={item} onQuantityChange={updateQuantity} onRemove={(id) => removeCartItem(id).then(setItems)} />)}
              </div>
            ) : (
              <EmptyState title="Your cart is empty." description="Add something from the shop and it will appear here." />
            )}
          </section>
          <aside className="cart-page__checkout">
            <h2 className="checkout-heading">Order Summary</h2>
            <div className="cart-page__summary-row"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
            <div className="cart-page__summary-row discount"><span>Discount</span><strong>-{formatPrice(discount)}</strong></div>
            <div className="cart-page__summary-row"><span>Delivery Fee</span><strong>{formatPrice(deliveryFee)}</strong></div>
            <div className="cart-page__summary-row total"><span>Total</span><strong>{formatPrice(total)}</strong></div>
            <div className="cart-page__promo">
              <div className="cart-page__promo-box">
                <input id="promoCode" className="promo-input" type="text" value={promoCode} onChange={(event) => setPromoCode(event.target.value)} placeholder="Enter code" />
                <button type="button" className="promo-button" onClick={applyPromo}>Apply</button>
              </div>
              <div className="cart-page__promo-list"><span>SAVE10 → 10% Discount</span><span>SAVE20 → 20% Discount</span></div>
            </div>
            <Link className="cart-page__checkout-btn" to="/checkout">Go to Checkout →</Link>
          </aside>
        </div>
      </main>
    </>
  );
};

export default CartPage;