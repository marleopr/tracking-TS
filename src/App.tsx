import React from "react";
import "./App.css";
import { Router } from "./routes/Router";
import { Box } from "@mui/material";
function App() {
  return (
     <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100vh'}}>
    <Router />
  </Box>
  );
}

export default App;
