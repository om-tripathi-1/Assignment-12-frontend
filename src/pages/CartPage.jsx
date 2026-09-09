import { useMemo, useState } from "react";
import Breadcrumb from "../components/ui/Breadcrumb";
import EmptyState from "../components/ui/EmptyState";
import CheckoutModal from "../components/ui/CheckoutModal";
import { createOrder } from "../api/order.service";
import { useCart } from "../contexts/CartContext";

import deleteIcon from "../assets/icons/dustbin.svg"

const formatPrice = (value) => `$${Number(value || 0).toFixed(0)}`;

const CartItem = ({ item, onQuantityChange, onRemove }) => (
  <article className="cart-page__item">
    <div className="cart-page__image-box">
      <img
        className="image-box-img"
        src={item.image}
        alt={item.name}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/assets/images/placeholder.png";
        }}
      />
    </div>
    <div className="cart-page__details">
      <div className="cart-page__meta">
        <div>
          <h2 className="meta-heading">{item.name}</h2>
          <p className="item-size">Size: {item.size}</p>
          <p className="item-size">Color: {item.color}</p>
        </div>
        <button
          className="cart-page__remove"
          type="button"
          onClick={() => onRemove(item)}
          aria-label={`Remove ${item.name} from cart`}
        >
          <img src={deleteIcon} alt="" />
        </button>
      </div>
      <div className="cart-page__bottom-row">
        <div className="cart-page__price-wrap">
          <strong className="cart-page__price">{formatPrice(item.price)}</strong>
          {item.oldPrice && (
            <span className="cart-page__old-price">
              {formatPrice(item.oldPrice)}
            </span>
          )}
        </div>
        <div
          className="cart-page__qty-box"
          aria-label={`Quantity for ${item.name}`}
        >
          <button
            className="qty-btn"
            type="button"
            onClick={() => onQuantityChange(item, -1)}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="qty-no">{item.quantity}</span>
          <button
            className="qty-btn"
            type="button"
            onClick={() => onQuantityChange(item, 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </article>
);

const CartPage = () => {
  const { items, isLoading, updateItem, removeItem, clearCart } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState("");
  const [discountRate, setDiscountRate] = useState(0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) => total + (item.price || 0) * (item.quantity || 1),
        0
      ),
    [items]
  );

  const discount = subtotal * discountRate;
  const deliveryFee = items.length ? 15 : 0;
  const total = Math.max(0, subtotal - discount + deliveryFee);

  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity < 1) {
      removeItem(item);
    } else {
      updateItem(item, newQuantity);
    }
  };

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === "SAVE20") {
      setDiscountRate(0.2);
      setPromoMessage("✓ SAVE20 applied (20% discount)!");
    } else if (code === "SAVE10") {
      setDiscountRate(0.1);
      setPromoMessage("✓ SAVE10 applied (10% discount)!");
    } else if (code === "") {
      setDiscountRate(0);
      setPromoMessage("");
    } else {
      setDiscountRate(0);
      setPromoMessage("Invalid promo code. Try SAVE10 or SAVE20.");
    }
  };

  const openCheckout = () => {
    setCheckoutError("");
    setIsCheckoutOpen(true);
  };

  const handlePlaceOrder = async () => {
    try {
      setIsSubmittingOrder(true);
      setCheckoutError("");
      await createOrder(items);
      clearCart();
      setIsCheckoutOpen(false);
    } catch (error) {
      console.error("Order submission failed:", error);
      setCheckoutError(
        error.response?.data?.message ||
          "Unable to place your order. Please verify your details and try again."
      );
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Cart" },
        ]}
      />

      <main className="cart-page">
        <div className="cart-page__container">
          <section className="cart-page__summary" aria-labelledby="cart-heading">
            <div className="cart-page__header">
              <h1 id="cart-heading" className="heading">
                Your Cart
              </h1>
            </div>

            {isLoading ? (
              <p className="cart-page__loading">Loading your cart...</p>
            ) : items.length ? (
              <div className="cart-page__items">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={removeItem}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="Your cart is currently empty."
                description="Explore our collection to find clothes matching your style."
              />
            )}
          </section>

          <aside className="cart-page__checkout" aria-labelledby="order-summary-title">
            <h2 id="order-summary-title" className="checkout-heading">
              Order Summary
            </h2>
            <div className="cart-page__summary-row">
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>

            {discount > 0 && (
              <div className="cart-page__summary-row discount">
                <span>Discount ({(discountRate * 100).toFixed(0)}%)</span>
                <strong>-{formatPrice(discount)}</strong>
              </div>
            )}

            <div className="cart-page__summary-row">
              <span>Delivery Fee</span>
              <strong>{items.length ? formatPrice(deliveryFee) : "$0"}</strong>
            </div>

            <div className="cart-page__summary-row total">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>

            <div className="cart-page__promo">
              <div className="cart-page__promo-box">
                <input
                  id="promoCode"
                  className="promo-input"
                  type="text"
                  value={promoCode}
                  onChange={(event) => {
                    setPromoCode(event.target.value);
                    if (promoMessage) setPromoMessage("");
                  }}
                  placeholder="Enter promo code"
                  aria-label="Enter promotional discount code"
                />
                <button
                  type="button"
                  className="promo-button"
                  onClick={handleApplyPromo}
                >
                  Apply
                </button>
              </div>

              {promoMessage && (
                <p className={`cart-page__promo-message ${promoMessage.startsWith("✓") ? "is-success" : "is-error"}`}>
                  {promoMessage}
                </p>
              )}

              <div className="cart-page__promo-list">
                <span>SAVE10 → 10% Discount</span>
                <span>SAVE20 → 20% Discount</span>
              </div>
            </div>

            <button
              className="cart-page__checkout-btn"
              type="button"
              onClick={openCheckout}
              disabled={!items.length || isLoading}
            >
              Go to Checkout →
            </button>
          </aside>
        </div>
      </main>

      {isCheckoutOpen && (
        <CheckoutModal
          items={items}
          total={total}
          isSubmitting={isSubmittingOrder}
          error={checkoutError}
          onClose={() => setIsCheckoutOpen(false)}
          onConfirm={handlePlaceOrder}
        />
      )}
    </>
  );
};

export default CartPage;
