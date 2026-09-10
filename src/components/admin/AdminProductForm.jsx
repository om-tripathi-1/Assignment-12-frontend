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
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_FORMATS = ".jpg,.jpeg,.png,.webp,.gif,.avif";

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
  const [validationError, setValidationError] = useState("");
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
    const name = form.name.trim();
    const price = Number(form.price);
    const originalPrice = form.originalPrice === "" ? null : Number(form.originalPrice);
    const selectedVariants = variants.filter((variant) => variant.selected);

    if (!name) {
      setValidationError("Product name is required.");
      return;
    }
    if (!Number.isFinite(price) || price < 0) {
      setValidationError("Enter a valid product price.");
      return;
    }
    if (originalPrice !== null && (!Number.isFinite(originalPrice) || originalPrice < price)) {
      setValidationError("Original price must be greater than or equal to the product price.");
      return;
    }
    if (selectedVariants.some((variant) => !Number.isInteger(Number(variant.quantity)) || Number(variant.quantity) < 0)) {
      setValidationError("Each selected size must have a whole-number quantity of 0 or more.");
      return;
    }

    setValidationError("");
    onSubmit({
      ...form,
      name,
      price,
      originalPrice: originalPrice ?? "",
      variants: selectedVariants
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

  const handleImageChange = (event) => {
    const selectedImages = Array.from(event.target.files || []);
    const oversizedImage = selectedImages.find(
      (selectedImage) => selectedImage.size > MAX_IMAGE_SIZE
    );

    if (oversizedImage) {
      setValidationError("Each image must be 5 MB or smaller.");
      setImages([]);
      event.target.value = "";
      return;
    }

    setValidationError("");
    setImages(selectedImages);
  };

  return (
    <form className="admin-form" onSubmit={submitForm}>
      <div className="admin-form__header">
        <h2>{product ? "Update Product" : "Add Product"}</h2>
        <button className="admin-button admin-button--muted" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
      {validationError && <p className="admin-form__error" role="alert">{validationError}</p>}
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
        <input type="file" accept={ACCEPTED_IMAGE_FORMATS} multiple onChange={handleImageChange} />
        <span className="admin-field__hint">JPG, JPEG, PNG, WebP, GIF, or AVIF. Maximum 5 MB per image.</span>
      </label>
      <button className="admin-button" type="submit" disabled={isSaving}>
        {isSaving ? "Saving..." : product ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default AdminProductForm;
