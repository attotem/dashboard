import React from 'react';
import { ColorModeContext, useMode } from "./Theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { MyProSidebarProvider } from "./sidebarContext";
import 'bootstrap/dist/css/bootstrap.min.css';

const DefaultLayout = ({ children }) => {
    const [theme, colorMode] = useMode();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <MyProSidebarProvider>
                    <div style={{ height: "100vh", width: "100%", background: "#EFF2F4" }}>
                        {/* <main style={{ padding: "1rem 1rem" }}> */}
                        <main>
                            {children}
                        </main>
                    </div>
                </MyProSidebarProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default DefaultLayout;
