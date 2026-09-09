import { useState } from "react";

const AdminCategoryForm = ({ category, onSubmit, onCancel, isSaving }) => {
  const [name, setName] = useState(category?.name || "");
  const [description, setDescription] = useState(category?.description || "");

  const submitForm = (event) => {
    event.preventDefault();
    onSubmit({ name, description });
  };

  return (
    <form className="admin-form" onSubmit={submitForm}>
      <div className="admin-form__header">
        <h2>{category ? "Update Category" : "Add Category"}</h2>
        <button className="admin-button admin-button--muted" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
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
