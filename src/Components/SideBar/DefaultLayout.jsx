import React from 'react';
import { ColorModeContext, useMode } from "./Theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { MyProSidebarProvider } from "./sidebarContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/header';
const DefaultLayout = ({ children }) => {
    const [theme, colorMode] = useMode();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <MyProSidebarProvider>

                    <div style={{ height: "100vh", width: "100%", background: "rgb(245 245 245)", overflowY: "scroll", padding: "2rem" }}>
                        <main>
                            <Header />
                            {children}
                        </main>
                    </div>
                </MyProSidebarProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default DefaultLayout;
