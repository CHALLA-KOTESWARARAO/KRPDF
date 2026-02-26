import { Link } from 'react-router-dom';

function ToolCard({ to, title, description, icon }) {
  return (
    <Link to={to} className="tool-card" aria-label={`${title}. ${description}`}>
      <div className="tool-icon" aria-hidden="true">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  );
}

export default ToolCard;
