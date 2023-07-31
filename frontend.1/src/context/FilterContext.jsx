import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const useFilters = () => {
  return useContext(FilterContext);
};

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState([]);

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};
