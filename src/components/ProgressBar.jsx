function ProgressBar({ value }) {
  return (
    <div className="progress-shell" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={value}>
      <div className="progress-fill" style={{ width: `${value}%` }} />
      <span>{value}%</span>
    </div>
  );
}

export default ProgressBar;
