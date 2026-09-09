const AdminStatCard = ({ label, value }) => (
  <article className="admin-stat-card">
    <span className="admin-stat-card__label">{label}</span>
    <strong className="admin-stat-card__value">{value}</strong>
  </article>
);

export default AdminStatCard;
