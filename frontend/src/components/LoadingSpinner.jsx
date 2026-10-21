function LoadingSpinner({ label = "Loading..." }) {
  return (
    <div className="loading-spinner" role="status" aria-live="polite">
      <span className="spinner-glyph"></span>
      <span className="spinner-text">{label}</span>
    </div>
  );
}

export default LoadingSpinner;
