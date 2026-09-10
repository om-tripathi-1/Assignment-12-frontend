import { useState } from "react";

const AdminCategoryForm = ({ category, onSubmit, onCancel, isSaving }) => {
  const [name, setName] = useState(category?.name || "");
  const [description, setDescription] = useState(category?.description || "");
  const [validationError, setValidationError] = useState("");

  const submitForm = (event) => {
    event.preventDefault();
    if (name.trim().length < 2) {
      setValidationError("Category name must be at least 2 characters.");
      return;
    }

    setValidationError("");
    onSubmit({ name: name.trim(), description: description.trim() });
  };

  return (
    <form className="admin-form" onSubmit={submitForm}>
      <div className="admin-form__header">
        <h2>{category ? "Update Category" : "Add Category"}</h2>
        <button className="admin-button admin-button--muted" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
      {validationError && <p className="admin-form__error" role="alert">{validationError}</p>}
      <label className="admin-field">
        Category name
        <input value={name} onChange={(event) => setName(event.target.value)} required />
      </label>
      <label className="admin-field">
        Description
        <textarea value={description} onChange={(event) => setDescription(event.target.value)} rows="3" />
      </label>
      <button className="admin-button" type="submit" disabled={isSaving}>
        {isSaving ? "Saving..." : category ? "Update Category" : "Add Category"}
      </button>
    </form>
  );
};

export default AdminCategoryForm;
