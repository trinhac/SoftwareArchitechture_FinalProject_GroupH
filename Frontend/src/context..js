// context.js
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [resultTitle, setResultTitle] = useState('');

    return (
        <AppContext.Provider value={{ searchTerm, setSearchTerm, resultTitle, setResultTitle }}>
            {children}
        </AppContext.Provider>
    );
};

const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
