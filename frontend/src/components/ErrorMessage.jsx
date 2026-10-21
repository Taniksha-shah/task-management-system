function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message" role="alert">
      <p>
        <span className="error-tag">error:</span> {message}
      </p>
      {onRetry && (
        <button className="retry-btn" onClick={onRetry}>
          [ retry ]
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
