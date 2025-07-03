import { createContext, useState, useContext } from "react";

const SelectedIdeaIdContext = createContext();

export function SelectedIdeaIdProvider({ children }) {
  const [selectedIdeaId, setSelectedIdeaId] = useState(null);

  return (
    <SelectedIdeaIdContext.Provider
      value={{ selectedIdeaId, setSelectedIdeaId }}
    >
      {children}
    </SelectedIdeaIdContext.Provider>
  );
}

export function useSelectedIdeaIdContext() {
  return useContext(SelectedIdeaIdContext);
}
