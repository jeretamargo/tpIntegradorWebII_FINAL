import React, { createContext, useState } from "react";

interface SearchContextType {
  searchText: string;
  setSearchText: (text: string) => void;
}

export const SearchContext = createContext<SearchContextType>({
  searchText: "",
  setSearchText: () => {},
});

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchText, setSearchText] = useState("");

  return (
    <SearchContext.Provider value={{ searchText, setSearchText }}>
      {children}
    </SearchContext.Provider>
  );
};