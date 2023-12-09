import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Preloader from "./components/Preloader";
import Login from "./pages/Login";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4500);
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={isLoading ? <Preloader /> : <Login /> } />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;