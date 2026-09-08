import { useEffect } from "react";

const formatPrice = (value) => `$${Number(value || 0).toFixed(0)}`;

const CheckoutModal = ({
  items = [],
  total = 0,
  isSubmitting = false,
  error = "",
  onClose,
  onConfirm,
}) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && !isSubmitting && onClose) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isSubmitting, onClose]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget && !isSubmitting && onClose) {
      onClose();
    }
  };

  return (
    <div
      className="checkout-modal"
      role="presentation"
      onMouseDown={handleBackdropClick}
    >
      <section
        className="checkout-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-modal-title"
      >
        <div className="checkout-modal__header">
          <div>
            <p className="checkout-modal__eyebrow">Secure Checkout</p>
            <h2 id="checkout-modal-title">Place Your Order</h2>
          </div>
          <button
            className="checkout-modal__close"
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close checkout modal"
          >
            ×
          </button>
        </div>

        <div className="checkout-modal__items">
          {items.map((item) => (
            <div className="checkout-modal__item" key={item.id}>
              <span>
                {item.name} × {item.quantity}
              </span>
              <strong>{formatPrice(item.price * item.quantity)}</strong>
            </div>
          ))}
        </div>

        <div className="checkout-modal__total">
          <span>Total Amount</span>
          <strong>{formatPrice(total)}</strong>
        </div>

        {error && (
          <p className="checkout-modal__error" role="alert">
            {error}
          </p>
        )}

        <div className="checkout-modal__actions">
          <button
            className="checkout-modal__cancel"
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            className="checkout-modal__confirm"
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Placing Order..." : "Confirm Order"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default CheckoutModal;
