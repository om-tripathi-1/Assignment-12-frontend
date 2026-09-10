import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AdminCategoryForm from "../components/admin/AdminCategoryForm";
import AdminOrderDetails from "../components/admin/AdminOrderDetails";
import AdminProductForm from "../components/admin/AdminProductForm";
import AdminStatCard from "../components/admin/AdminStatCard";
import AdminTable from "../components/admin/AdminTable";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../api/category.service";
import {
  getAdminOrders,
  getAdminUsers,
  updateOrderStatus,
} from "../api/admin.service";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../api/product.service";
import { useAuth } from "../contexts/AuthContext";

const tabs = ["Overview", "Products", "Categories", "Orders", "Users"];

const AdminDashboardPage = () => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("Overview");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");
      const [productResponse, categoryResponse, orderResponse, userResponse] =
        await Promise.all([
          getAllProducts({ limit: 1000 }),
          getAllCategories(),
          getAdminOrders(),
          getAdminUsers(),
        ]);
      setProducts(productResponse.products || []);
      setCategories(categoryResponse.categories || []);
      setOrders(Array.isArray(orderResponse) ? orderResponse : []);
      setUsers(userResponse);
    } catch (loadError) {
      setError(
        loadError.response?.data?.message || "Unable to load dashboard data.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.role !== "admin") return;

    const loadCurrentDashboard = async () => {
      await loadDashboard();
    };

    loadCurrentDashboard();
  }, [loadDashboard, user]);

  if (isAuthLoading)
    return <main className="admin-page__state">Loading dashboard...</main>;
  if (!user || user.role !== "admin") return <Navigate to="/" replace />;

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
    setEditingCategory(null);
  };

  const saveProduct = async (productData) => {
    try {
      setIsSaving(true);
      if (editingProduct) await updateProduct(editingProduct._id, productData);
      else await createProduct(productData);
      closeForm();
      await loadDashboard();
    } catch (saveError) {
      setError(saveError.response?.data?.message || "Unable to save product.");
    } finally {
      setIsSaving(false);
    }
  };

  const saveCategory = async (categoryData) => {
    try {
      setIsSaving(true);
      if (editingCategory)
        await updateCategory(editingCategory._id, categoryData);
      else await createCategory(categoryData);
      closeForm();
      await loadDashboard();
    } catch (saveError) {
      setError(saveError.response?.data?.message || "Unable to save category.");
    } finally {
      setIsSaving(false);
    }
  };

  const removeProduct = async (product) => {
    if (!window.confirm(`Delete ${product.name}?`)) return;
    try {
      await deleteProduct(product._id);
      await loadDashboard();
    } catch (removeError) {
      setError(
        removeError.response?.data?.message || "Unable to delete product.",
      );
    }
  };

  const removeCategory = async (category) => {
    if (!window.confirm(`Delete ${category.name}?`)) return;
    try {
      await deleteCategory(category._id);
      await loadDashboard();
    } catch (removeError) {
      setError(
        removeError.response?.data?.message || "Unable to delete category.",
      );
    }
  };

  const changeOrderStatus = async (order, status) => {
    try {
      await updateOrderStatus(order._id, status);
      await loadDashboard();
      if (selectedOrder?._id === order._id) {
        setSelectedOrder((current) => ({ ...current, status }));
      }
    } catch (statusError) {
      setError(
        statusError.response?.data?.message || "Unable to update order status.",
      );
    }
  };

  const getProductStock = (product) =>
    (product.variants || []).reduce(
      (total, variant) => total + (Number(variant.quantity) || 0),
      0,
    );

  const getStockStatus = (stock) => {
    if (stock === 0) return "Out of stock";
    if (stock <= 5) return "Low stock";
    return "In stock";
  };

  const productColumns = [
    { key: "name", label: "Product" },
    { key: "price", label: "Price", render: (product) => `$${product.price}` },
    {
      key: "category",
      label: "Category",
      render: (product) => product.category?.name || "-",
    },
    {
      key: "stock",
      label: "Stock",
      render: (product) => {
        const stock = getProductStock(product);
        const status = getStockStatus(stock);
        return (
          <span
            className={`admin-stock admin-stock--${status.toLowerCase().replaceAll(" ", "-")}`}
          >
            {status} ({stock})
          </span>
        );
      },
    },
    {
      key: "actions",
      label: "Actions",
      render: (product) => (
        <div className="admin-table__actions">
          <button
            className="admin-button admin-button--small"
            type="button"
            onClick={() => {
              setEditingProduct(product);
              setIsFormOpen(true);
            }}
          >
            Edit
          </button>
          <button
            className="admin-button admin-button--small admin-button--danger"
            type="button"
            onClick={() => removeProduct(product)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const categoryColumns = [
    { key: "name", label: "Category" },
    { key: "description", label: "Description" },
    {
      key: "actions",
      label: "Actions",
      render: (category) => (
        <div className="admin-table__actions">
          <button
            className="admin-button admin-button--small"
            type="button"
            onClick={() => {
              setEditingCategory(category);
              setIsFormOpen(true);
            }}
          >
            Edit
          </button>
          <button
            className="admin-button admin-button--small admin-button--danger"
            type="button"
            onClick={() => removeCategory(category)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const orderColumns = [
    { key: "_id", label: "Order", render: (order) => order._id.slice(-8) },
    {
      key: "user",
      label: "Customer",
      render: (order) => order.user?.email || "-",
    },
    {
      key: "products",
      label: "Items",
      render: (order) => order.products?.length || 0,
    },
    {
      key: "status",
      label: "Status",
      render: (order) => (
        <select
          className="admin-table__select"
          value={order.status}
          onChange={(event) => changeOrderStatus(order, event.target.value)}
          aria-label={`Update status for order ${order._id.slice(-8)}`}
        >
          {["pending", "shipped", "delivered", "cancelled"].map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      ),
    },
    {
      key: "details",
      label: "Details",
      render: (order) => (
        <button
          className="admin-button admin-button--small"
          type="button"
          onClick={() => setSelectedOrder(order)}
        >
          View
        </button>
      ),
    },
  ];

  const userColumns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
  ];

  const renderContent = () => {
    if (isLoading)
      return <p className="admin-page__message">Loading dashboard data...</p>;
    if (activeTab === "Overview") {
      return (
        <div className="admin-overview">
          <div className="admin-stats">
            <AdminStatCard label="Products" value={products.length} />
            <AdminStatCard label="Categories" value={categories.length} />
            <AdminStatCard label="Orders" value={orders.length} />
            <AdminStatCard label="Users" value={users.length} />
          </div>
          <p className="admin-page__message">
            Use the sections above to manage the store catalog and review
            activity.
          </p>
        </div>
      );
    }
    if (activeTab === "Products")
      return (
        <AdminTable
          columns={productColumns}
          rows={products}
          emptyMessage="No products found."
        />
      );
    if (activeTab === "Categories")
      return (
        <AdminTable
          columns={categoryColumns}
          rows={categories}
          emptyMessage="No categories found."
        />
      );
    if (activeTab === "Orders") {
      return (
        <>
          {selectedOrder && (
            <AdminOrderDetails
              order={selectedOrder}
              onClose={() => setSelectedOrder(null)}
            />
          )}
          <AdminTable
            columns={orderColumns}
            rows={orders}
            emptyMessage="No orders found."
          />
        </>
      );
    }
    return (
      <AdminTable
        columns={userColumns}
        rows={users}
        emptyMessage="No users found."
      />
    );
  };

  return (
    <main className="admin-page">
      <header className="admin-page__header">
        <div>
          <p className="admin-page__eyebrow">Store administration</p>
          <h1>Dashboard</h1>
        </div>
        <span className="admin-page__user">{user.name}</span>
      </header>
      <nav className="admin-tabs" aria-label="Admin sections">
        {tabs.map((tab) => (
          <button
            className={`admin-tabs__button ${activeTab === tab ? "is-active" : ""}`}
            key={tab}
            type="button"
            onClick={() => {
              setActiveTab(tab);
              closeForm();
            }}
          >
            {tab}
          </button>
        ))}
      </nav>
      {error && <p className="admin-page__error">{error}</p>}
      {isFormOpen && activeTab === "Products" && (
        <AdminProductForm
          key={editingProduct?._id || "new-product"}
          categories={categories}
          product={editingProduct}
          onSubmit={saveProduct}
          onCancel={closeForm}
          isSaving={isSaving}
        />
      )}
      {isFormOpen && activeTab === "Categories" && (
        <AdminCategoryForm
          key={editingCategory?._id || "new-category"}
          category={editingCategory}
          onSubmit={saveCategory}
          onCancel={closeForm}
          isSaving={isSaving}
        />
      )}
      {!isFormOpen && activeTab === "Products" && (
        <button
          className="admin-button admin-page__add"
          type="button"
          onClick={() => {
            setEditingProduct(null);
            setIsFormOpen(true);
          }}
        >
          Add Product
        </button>
      )}
      {!isFormOpen && activeTab === "Categories" && (
        <button
          className="admin-button admin-page__add"
          type="button"
          onClick={() => {
            setEditingCategory(null);
            setIsFormOpen(true);
          }}
        >
          Add Category
        </button>
      )}
      {renderContent()}
    </main>
  );
};

export default AdminDashboardPage;
