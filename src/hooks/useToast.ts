import { useState, useCallback } from 'react';

interface ToastData {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

let toastListeners: Array<(toasts: ToastData[]) => void> = [];
let toastList: ToastData[] = [];

function notifyListeners() {
  toastListeners.forEach((l) => l([...toastList]));
}

export function toast(data: Omit<ToastData, 'id'>) {
  const id = Math.random().toString(36).slice(2);
  toastList = [...toastList, { ...data, id }];
  notifyListeners();
  setTimeout(() => {
    toastList = toastList.filter((t) => t.id !== id);
    notifyListeners();
  }, 5000);
}

export function useToastState() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const subscribe = useCallback(() => {
    const listener = (newToasts: ToastData[]) => setToasts(newToasts);
    toastListeners.push(listener);
    return () => {
      toastListeners = toastListeners.filter((l) => l !== listener);
    };
  }, []);

  return { toasts, subscribe };
}
