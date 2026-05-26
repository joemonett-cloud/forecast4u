export function Card({ title, description, children }) {
  return (
    <div className="card-wrapper">
      {title && <h2 className="card-title">{title}</h2>}
      {description && <p className="card-description">{description}</p>}
      {children && <div className="card-content">{children}</div>}
    </div>
  );
}
