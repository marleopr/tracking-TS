import React from "react";
import "./App.css";
import { Router } from "./routes/Router";
import Footer from "./pages/Footer";
function App() {
  return (
     <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100vh', padding: '5px' }}>
    <div>
    <Router />
    </div>
  </div>
  );
}

export default App;
