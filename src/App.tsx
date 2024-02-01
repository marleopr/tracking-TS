import React from "react";
import "./App.css";
import { Router } from "./routes/Router";
function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100vh', padding: '5px' }}>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
    <Router />
    </div>
    {/* <Footer /> */}
  </div>
  );
}

export default App;
