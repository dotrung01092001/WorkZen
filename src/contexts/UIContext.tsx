import { createContext, type ReactNode, useState } from 'react';

interface UIContextValue {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <UIContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar: () => setSidebarOpen(p => !p),
      }}
    >
      {children}
    </UIContext.Provider>
  );
}
