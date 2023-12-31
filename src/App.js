import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Preloader from "./components/Preloader";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
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
          <BrowserRouter>
          {isLoading ? <Preloader /> : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route index element={<Login />} />
            </Routes>
          )}
          </BrowserRouter>
      {/* </AuthProvider> */}
      
    </div>
  );
}

export default App;