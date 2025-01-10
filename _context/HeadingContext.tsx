// context/HeadingContext.tsx
import { createContext, useContext, ReactNode, useState } from 'react';

interface HeadingContextType {
  headings: Array<{
    id: string;
    text: string;
    level: number;
  }>;
  activeId: string | null;
  setActiveId: (id: string) => void;
  setHeadings: (
    headings: Array<{ id: string; text: string; level: number }>
  ) => void;
}

const HeadingContext = createContext<HeadingContextType | undefined>(undefined);

export const HeadingProvider = ({ children }: { children: ReactNode }) => {
  const [headings, setHeadings] = useState<
    Array<{ id: string; text: string; level: number }>
  >([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <HeadingContext.Provider
      value={{ headings, setHeadings, activeId, setActiveId }}
    >
      {children}
    </HeadingContext.Provider>
  );
};

export const useHeadings = () => {
  const context = useContext(HeadingContext);
  if (!context) {
    throw new Error('useHeadings must be used within a HeadingProvider');
  }
  return context;
};
