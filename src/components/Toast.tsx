import React from 'react';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type?: 'success' | 'info';
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between gap-3 rounded-xl border border-zinc-700 bg-zinc-900/95 backdrop-blur-md p-4 text-white shadow-2xl transition-all animate-in slide-in-from-bottom-3 duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00ff87]/15 text-[#00ff87] shrink-0">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wide">{toast.title}</div>
              {toast.message && <div className="text-[11px] text-zinc-400 mt-0.5">{toast.message}</div>}
            </div>
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            aria-label="Dismiss notification"
            className="text-zinc-500 hover:text-white p-1"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
