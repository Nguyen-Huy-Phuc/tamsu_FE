import { useState, useCallback } from 'react';
import type { ToastType } from '../components/Toast';

export interface ToastItem {
    id: string;
    message: string;
    type: ToastType;
    duration?: number;
}

export const useToast = () => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const addToast = useCallback((message: string, type: ToastType = 'success', duration?: number) => {
        const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        const newToast: ToastItem = {
            id,
            message,
            type,
            duration
        };

        setToasts(prevToasts => [...prevToasts, newToast]);
        return id;
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
    }, []);

    const success = useCallback((message: string, duration?: number) => {
        return addToast(message, 'success', duration);
    }, [addToast]);

    const error = useCallback((message: string, duration?: number) => {
        return addToast(message, 'error', duration);
    }, [addToast]);

    const warning = useCallback((message: string, duration?: number) => {
        return addToast(message, 'warning', duration);
    }, [addToast]);

    const clearAll = useCallback(() => {
        setToasts([]);
    }, []);

    return {
        toasts,
        addToast,
        removeToast,
        success,
        error,
        warning,
        clearAll
    };
};