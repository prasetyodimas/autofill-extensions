import { useState, useEffect } from 'react';

// Default selectors to fall back on if the user hasn't set any
const defaultSelectors = {
  corpId: 'input[name="corpId"]',
  userId: 'input[name="userId"]',
  password: 'input[type="password"]',
  submitBtn: 'button[type="submit"]'
};

export const useSettings = () => {
  const [selectors, setSelectors] = useState(defaultSelectors);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('autofillSelectors'));
    if (stored) {
      setSelectors({ ...defaultSelectors, ...stored });
    }
  }, []);

  const saveSelectors = (newSelectors) => {
    localStorage.setItem('autofillSelectors', JSON.stringify(newSelectors));
    setSelectors(newSelectors);
    alert('Selectors saved successfully!');
  };

  return { selectors, saveSelectors };
};