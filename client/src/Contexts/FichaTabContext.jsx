import { createContext, useState } from "react";

export const FichaTabContext = createContext();

export function FichaTabContextProvider({ children }) {
  const [index, setIndex] = useState(null);
  return (
    <FichaTabContext.Provider value={{ index, setIndex }}>
      {children}
    </FichaTabContext.Provider>
  );
}
