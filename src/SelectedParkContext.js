import React, { createContext, useContext, useState } from 'react';

const SelectedParkContext = createContext();

export const useSelectedPark = () => useContext(SelectedParkContext);

export const SelectedParkProvider = ({ children }) => {
  const [selectedParkId, setSelectedParkId] = useState('');

  return (
    <SelectedParkContext.Provider value={{ selectedParkId, setSelectedParkId }}>
      {children}
    </SelectedParkContext.Provider>
  );
};