import React from 'react';
import { useAppContext } from '../../context/AppContext';

export default function ToastContainer() {
  const { toasts } = useAppContext();

  return (
    <div id="toastContainer" className="fixed top-20 right-4 z-[2000] space-y-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
}

function Toast({ toast }) {
  const icons = { success: 'check-circle', error: 'times-circle', warning: 'exclamation-triangle', info: 'info-circle' };
  const colors = { success: 'var(--green)', error: 'var(--red)', warning: '#f59e0b', info: 'var(--blue)' };

  return (
    <div className={`toast ${toast.type}`}>
      <div className="flex items-center gap-3">
        <i className={`fas fa-${icons[toast.type]} text-lg`} style={{ color: colors[toast.type] }}></i>
        <div className="flex-1 text-sm font-medium">{toast.message}</div>
      </div>
    </div>
  );
}
