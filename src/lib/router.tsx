import { createContext, useContext, useState, ReactNode } from 'react';

interface RouterContextType {
  currentPage: string;
  navigate: (page: string, newParams?: Record<string, string>) => void;
  params: Record<string, string>;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState('home');
  const [params, setParams] = useState<Record<string, string>>({});

  const navigate = (page: string, newParams: Record<string, string> = {}) => {
    setCurrentPage(page);
    setParams(newParams);
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
