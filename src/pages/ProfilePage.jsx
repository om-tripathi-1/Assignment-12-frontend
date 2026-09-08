import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/ui/Breadcrumb";
import EmptyState from "../components/ui/EmptyState";
import { getUserOrders } from "../api/order.service";
import { useAuth } from "../contexts/AuthContext";

const formatDate = (value) => {
  if (!value) return "Recent";
  const date = new Date(value);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatPrice = (value) => `$${Number(value || 0).toFixed(0)}`;

/**
 * Customer profile view displaying user credentials and past order history.
 */
const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, isLoading: isAuthLoading, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCurrent = true;

    if (isAuthLoading) return;

    if (!user) {
      navigate("/login", { state: { from: "/profile" }, replace: true });
      return;
    }

    getUserOrders()
      .then((userOrders) => {
        if (isCurrent) setOrders(Array.isArray(userOrders) ? userOrders : []);
      })
      .catch((requestError) => {
        if (!isCurrent) return;
        if (requestError.response?.status === 401) {
          navigate("/login", { state: { from: "/profile" }, replace: true });
        } else {
          console.error("Failed to load user orders:", requestError);
          setError("Unable to load your orders right now.");
        }
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [isAuthLoading, navigate, user]);

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  if (isLoading) {
    return <main className="profile-page__state">Loading profile and orders...</main>;
  }

  if (error) {
    return (
      <main className="profile-page__state">
        <EmptyState title={error} />
      </main>
    );
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Profile" },
        ]}
      />

      <main className="profile-page">
        <div className="profile-page__header">
          <div>
            <p className="profile-page__eyebrow">Account Dashboard</p>
            <h1>My Profile</h1>
          </div>
          <button
            className="profile-page__logout"
            type="button"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>

        {/* User Account Card */}
        <section
          className="profile-page__details"
          aria-labelledby="profile-details-title"
        >
          <h2 id="profile-details-title">Personal Details</h2>
          <dl>
            <div>
              <dt>Name</dt>
              <dd>{user?.name || "Customer"}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{user?.email || "—"}</dd>
            </div>
            <div>
              <dt>Account Type</dt>
              <dd style={{ textTransform: "capitalize" }}>
                {user?.role || "Customer"}
              </dd>
            </div>
          </dl>
        </section>

        {/* User Orders Listing */}
        <section
          className="profile-page__orders"
          aria-labelledby="profile-orders-title"
        >
          <div className="profile-page__section-heading">
            <h2 id="profile-orders-title">My Orders</h2>
            <span>
              {orders.length} order{orders.length === 1 ? "" : "s"}
            </span>
          </div>

          {orders.length ? (
            <div className="profile-page__order-list">
              {orders.map((order) => (
                <article className="profile-page__order" key={order._id}>
                  <div className="profile-page__order-heading">
                    <strong>
                      Order #{order._id ? order._id.slice(-6).toUpperCase() : "REF"}
                    </strong>
                    <span>{formatDate(order.createdAt)}</span>
                  </div>
                  <div className="profile-page__order-items">
                    {(order.products || []).map((item) => (
                      <div key={item._id || item.product?._id || Math.random()}>
                        <span>
                          {item.product?.name || "Product"} × {item.quantity}
                        </span>
                        <span>
                          {item.product
                            ? formatPrice(item.product.price * item.quantity)
                            : ""}
                        </span>
                      </div>
                    ))}
                  </div>
                  <span
                    className={`profile-page__status profile-page__status--${order.status || "pending"}`}
                  >
                    {order.status || "Processing"}
                  </span>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No orders placed yet."
              description="Your completed purchases will appear here with delivery updates."
            />
          )}
        </section>
      </main>
    </>
  );
};

export default ProfilePage;