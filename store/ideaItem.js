import { createContext, useState, useContext } from "react";

const IdeaItemContext = createContext();

export function IdeaItemProvider({ children }) {
  const [idea, setIdea] = useState([]);

  return (
    <IdeaItemContext.Provider value={{ idea, setIdea }}>
      {children}
    </IdeaItemContext.Provider>
  );
}

export function useIdeaItemContext() {
  return useContext(IdeaItemContext);
}
