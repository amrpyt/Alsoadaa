import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface RouterContextType {
  currentPage: string;
  navigate: (page: string, newParams?: Record<string, string>) => void;
  params: Record<string, string>;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.slice(1) || 'home';
    return hash.split('?')[0];
  });
  const [params, setParams] = useState<Record<string, string>>(() => {
    const hash = window.location.hash.slice(1);
    const queryString = hash.split('?')[1];
    if (!queryString) return {};
    
    const params: Record<string, string> = {};
    queryString.split('&').forEach(param => {
      const [key, value] = param.split('=');
      if (key && value) {
        params[key] = decodeURIComponent(value);
      }
    });
    return params;
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home';
      const [page, queryString] = hash.split('?');
      setCurrentPage(page);
      
      if (queryString) {
        const newParams: Record<string, string> = {};
        queryString.split('&').forEach(param => {
          const [key, value] = param.split('=');
          if (key && value) {
            newParams[key] = decodeURIComponent(value);
          }
        });
        setParams(newParams);
      } else {
        setParams({});
      }
      
      // Scroll to top on page change
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (page: string, newParams: Record<string, string> = {}) => {
    let hash = `#${page}`;
    if (Object.keys(newParams).length > 0) {
      const queryString = Object.entries(newParams)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');
      hash += `?${queryString}`;
    }
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <RouterContext.Provider value={{ currentPage, navigate, params }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within RouterProvider');
  }
  return context;
}
