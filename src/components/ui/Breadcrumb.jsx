import { Link } from "react-router-dom";

const Breadcrumb = ({ items = [] }) => (
  <nav className="breadcrumb" aria-label="Breadcrumb">
    {items.map((item, index) => {
      const isCurrent = index === items.length - 1;
      return (
        <span key={item.label}>
          {index > 0 && <span aria-hidden="true">›</span>}
          {isCurrent || !item.to ? (
            <span className={isCurrent ? "breadcrumb__current" : "breadcrumb__prev"}>{item.label}</span>
          ) : (
            <Link className="breadcrumb__prev" to={item.to}>{item.label}</Link>
          )}
        </span>
      );
    })}
  </nav>
);

export default Breadcrumb;