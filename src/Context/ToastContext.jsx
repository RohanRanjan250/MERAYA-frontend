import React, { createContext, useState, useContext, useCallback } from 'react';
import Toast from '../UI/Toast'; // Make sure this path is correct

// 1. Create the context
const ToastContext = createContext();

// 2. Create the provider component
export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  const hideToast = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast message={toast.message} type={toast.type} onHide={hideToast} />}
    </ToastContext.Provider>
  );
};

// 3. Create and export a custom hook to use the context easily
export const useToast = () => {
  return useContext(ToastContext);
};

