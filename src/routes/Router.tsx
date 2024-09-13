import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../pages/Header";
import HomePage from "../pages/HomePage";
import BuscaCep from "../pages/BuscaCep";
import ErrorPage from "../pages/ErrorPage";
import { useState } from "react";
import { Box, Grid } from "@mui/material";
import Style from "../components/BaseLayout.module.scss";
import Footer from "../pages/Footer";
import Toggler from "../components/Toggler";
import DownloadButtonV2 from "../components/loadersButtons/DownloadButtonV2";

export const Router = () => {
  let [darkMode, setDarkMode] = useState(false);

  function handleClick() {
    setDarkMode(!darkMode);
  }

  return (
    <Box className={darkMode ? Style.dark : Style.light}>
      <Grid
        container
        display={"flex"}
        flexDirection={"column"}
        minHeight={"100vh"}
        justifyContent={"space-between"}
      >
        <BrowserRouter>
        <div
         style={{
          position: "fixed",  
          top: "10px",        
          left: "10px",    
          zIndex: 1000        
        }}
      >
        <Toggler darkMode={darkMode} handleClick={handleClick}/>

      </div>
      <div
         style={{
          position: "fixed",  
          top: "10px",        
          right: "10px",    
          zIndex: 1000        
        }}
      >
      <DownloadButtonV2 />
      </div>
          <Box
            component={"footer"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            // py={"1.5rem"}
            // sx={{ opacity: 0.7 }}
            width={"100%"}
          >
            <Header/>
          </Box>
          <Grid item flexGrow={1}>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="buscacep" element={<BuscaCep />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Grid>
          <Box
            component={"footer"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            // py={"1.5rem"}
            // sx={{ opacity: 0.7 }}
            width={"100%"}
          >
            <Footer />
          </Box>
        </BrowserRouter>
      </Grid>
    </Box>
  );
};
