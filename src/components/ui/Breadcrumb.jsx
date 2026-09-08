import { Link } from "react-router-dom";

const Breadcrumb = ({ items = [] }) => {
  if (!items.length) return null;

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb navigation">
      {items.map((item, index) => {
        const isCurrent = index === items.length - 1;
        return (
          <span key={`${item.label}-${index}`}>
            {index > 0 && (
              <span className="breadcrumb__separator" aria-hidden="true">
                {" "}
                ›{" "}
              </span>
            )}
            {isCurrent || !item.to ? (
              <span
                className={isCurrent ? "breadcrumb__current" : "breadcrumb__prev"}
                aria-current={isCurrent ? "page" : undefined}
              >
                {item.label}
              </span>
            ) : (
              <Link className="breadcrumb__prev" to={item.to}>
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
