import { getProductImageUrl } from "../../api/product.service";

const AdminOrderDetails = ({ order, onClose }) => (
  <section className="admin-order-details" aria-labelledby="admin-order-details-title">
    <div className="admin-order-details__header">
      <div>
        <p className="admin-page__eyebrow">Order details</p>
        <h2 id="admin-order-details-title">#{order._id.slice(-8)}</h2>
      </div>
      <button className="admin-button admin-button--muted" type="button" onClick={onClose}>
        Close
      </button>
    </div>
    <div className="admin-order-details__meta">
      <span>Customer: {order.user?.name || order.user?.email || "-"}</span>
      <span>Email: {order.user?.email || "-"}</span>
      <span>Status: {order.status}</span>
    </div>
    <div className="admin-order-details__items">
      {order.products?.map((lineItem, index) => {
        const product = lineItem.product;
        const image = product?.images?.[0];
        return (
          <article className="admin-order-details__item" key={`${product?._id || index}-${lineItem.size || "Standard"}`}>
            <img src={getProductImageUrl(image)} alt={product?.name || "Ordered product"} />
            <div>
              <strong>{product?.name || "Product unavailable"}</strong>
              <p>Size: {lineItem.size || "Standard"}</p>
              <p>Quantity: {lineItem.quantity}</p>
              <p>Price: ${product?.price || 0}</p>
            </div>
          </article>
        );
      })}
    </div>
  </section>
);

export default AdminOrderDetails;
