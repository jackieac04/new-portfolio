import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({ theme: 'night', toggleTheme: () => {} });

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('jc-theme') || 'night'; } catch { return 'night'; }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('jc-theme', theme); } catch { /* noop */ }
  }, [theme]);

  const toggleTheme = () => {
    // Apply a brief class to enable smooth transitions only during the switch
    document.documentElement.classList.add('theme-switching');
    setTheme((t) => (t === 'night' ? 'day' : 'night'));
    setTimeout(() => document.documentElement.classList.remove('theme-switching'), 450);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
