import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import SearchPage from "scenes/SearchPage/SearchPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

import BottomNavbar from "components/BottomNavbar/BottomNavbar";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));



  const Yaris = () => {

    let i = 0;

    while(i<1000){
      console.log("i miss yaris");
      
    }
  }

  // Yaris()

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />

            <Route path="/search" element={<SearchPage />} />
          </Routes>
          <BottomNavbar></BottomNavbar>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
