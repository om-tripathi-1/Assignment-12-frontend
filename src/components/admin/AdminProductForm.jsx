import { useState } from "react";
import { getProductImageUrl } from "../../api/product.service";

const emptyProduct = {
  name: "",
  description: "",
  price: "",
  originalPrice: "",
  category: "",
};

const productSizes = ["Small", "Medium", "Large", "X-large"];

const AdminProductForm = ({ categories, product, onSubmit, onCancel, isSaving }) => {
  const [form, setForm] = useState(() =>
    product
      ? {
          name: product.name || "",
          description: product.description || "",
          price: product.price || "",
          originalPrice: product.originalPrice || "",
          category: product.category?._id || product.category || "",
        }
      : emptyProduct
  );
  const [images, setImages] = useState([]);
  const [variants, setVariants] = useState(() =>
    productSizes.map((size) => {
      const existingVariant = product?.variants?.find(
        (variant) => variant.size === size
      );
      return {
        size,
        selected: Boolean(existingVariant),
        quantity: existingVariant?.quantity ?? 0,
      };
    })
  );
  const existingImages = product?.images || [];

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submitForm = (event) => {
    event.preventDefault();
    onSubmit({
      ...form,
      variants: variants
        .filter((variant) => variant.selected)
        .map(({ size, quantity }) => ({ size, quantity: Number(quantity) || 0 })),
      ...(images.length ? { images } : {}),
    });
  };

  const updateVariant = (size, field, value) => {
    setVariants((current) =>
      current.map((variant) =>
        variant.size === size ? { ...variant, [field]: value } : variant
      )
    );
  };

  return (
    <form className="admin-form" onSubmit={submitForm}>
      <div className="admin-form__header">
        <h2>{product ? "Update Product" : "Add Product"}</h2>
        <button className="admin-button admin-button--muted" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
      <label className="admin-field">
        Product name
        <input name="name" value={form.name} onChange={updateField} required />
      </label>
      <fieldset className="admin-variants">
        <legend className="admin-variants__legend">Available sizes and quantities</legend>
        {variants.map((variant) => (
          <label className="admin-variant" key={variant.size}>
            <input
              type="checkbox"
              checked={variant.selected}
              onChange={(event) =>
                updateVariant(variant.size, "selected", event.target.checked)
              }
            />
            <span className="admin-variant__size">{variant.size}</span>
            <input
              className="admin-variant__quantity"
              type="number"
              min="0"
              value={variant.quantity}
              disabled={!variant.selected}
              onChange={(event) =>
                updateVariant(variant.size, "quantity", event.target.value)
              }
              aria-label={`${variant.size} quantity`}
            />
          </label>
        ))}
      </fieldset>
      <label className="admin-field">
        Description
        <textarea name="description" value={form.description} onChange={updateField} rows="3" />
      </label>
      <div className="admin-form__grid">
        <label className="admin-field">
          Price
          <input name="price" type="number" min="0" value={form.price} onChange={updateField} required />
        </label>
        <label className="admin-field">
          Original price
          <input name="originalPrice" type="number" min="0" value={form.originalPrice} onChange={updateField} />
        </label>
      </div>
      <label className="admin-field">
        Category
        <select name="category" value={form.category} onChange={updateField}>
          <option value="">No category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <label className="admin-field">
        Product image
        {existingImages.length > 0 && (
          <div className="admin-image-grid">
            {existingImages.map((imagePath, index) => (
              <img
                className="admin-image-grid__image"
                key={`${imagePath}-${index}`}
                src={getProductImageUrl(imagePath)}
                alt={`${product.name} image ${index + 1}`}
              />
            ))}
          </div>
        )}
        <input type="file" accept="image/*" multiple onChange={(event) => setImages(Array.from(event.target.files || []))} />
        <span className="admin-field__hint">Selecting images replaces the current product images.</span>
      </label>
      <button className="admin-button" type="submit" disabled={isSaving}>
        {isSaving ? "Saving..." : product ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default AdminProductForm;
