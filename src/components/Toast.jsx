import { useEffect } from 'react';

function Toast({ type = 'info', message, onClose }) {
  useEffect(() => {
    if (!message) {
      return undefined;
    }
    const timer = setTimeout(onClose, 2800);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) {
    return null;
  }

  return (
    <div className={`toast toast-${type}`} role="status" aria-live="polite">
      <span>{message}</span>
      <button type="button" onClick={onClose} aria-label="Close notification">x</button>
    </div>
  );
}

export default Toast;
