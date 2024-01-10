import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Preloader from "./components/Preloader";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import { ChakraProvider } from '@chakra-ui/react'
// import { AuthProvider } from 'react-auth-kit'

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4500);
  }, []);

  return (
    <div>
      {/* <AuthProvider authType={'cookie'} authName={'_auth'} cookieDomain={window.location.hostname} refreshTokens={true} cookieSecure={true}> */}
        <ChakraProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={isLoading ? <Preloader /> : <Login /> } />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </ChakraProvider>
      {/* </AuthProvider> */}
      
    </div>
  );
}

export default App;