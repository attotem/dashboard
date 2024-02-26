import React, { createContext, useContext } from 'react';
import { useCookies } from 'react-cookie';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [cookies] = useCookies(['session_id']);
    const isAuthenticated = !!cookies.session_id;

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
