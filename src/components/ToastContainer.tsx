import React from 'react';
import Toast from './Toast';
import type { ToastItem } from '../hooks/useToast';

interface ToastContainerProps {
    toasts: ToastItem[];
    onClose: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
    return (
        <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    id={toast.id}
                    message={toast.message}
                    type={toast.type}
                    duration={toast.duration}
                    onClose={onClose}
                />
            ))}
        </div>
    );
};

export default ToastContainer;