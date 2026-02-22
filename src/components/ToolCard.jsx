import { Link } from 'react-router-dom';

function ToolCard({ to, title, description, icon, cta = 'Open Tool' }) {
  return (
    <article className="tool-card">
      <div className="tool-icon" aria-hidden="true">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={to} className="btn btn-secondary">{cta}</Link>
    </article>
  );
}

export default ToolCard;
