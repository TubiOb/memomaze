import React, { useState, useEffect } from "react";
import { createRoutesFromElements, createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import Preloader from "./components/Preloader";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import './index.css'
import ForgotPassword from "./pages/ForgotPassword";
import { ChakraProvider } from '@chakra-ui/react'
import HomeLayout from "./layouts/HomeLayout";
import { ThemeProvider } from './ThemeContext';
import NotesLayouts from "./layouts/NotesLayouts";
import TasksLayout from "./layouts/TasksLayout";
import ArchiveLayout from "./layouts/ArchiveLayout";
// import { AuthProvider } from 'react-auth-kit'

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={isLoading ? <Preloader /> : <Login /> } />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="welcome" element={<Welcome />} />
        <Route path="home" element={<Home />} >
          <Route path="" element={<HomeLayout />} />
          <Route path="notes" element={<NotesLayouts />} />
          <Route path="tasks" element={<TasksLayout />} />
          <Route path="archive" element={<ArchiveLayout />} />
        </Route>
    </Route>
    )
  )

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4500);
  }, []);



  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');

    if (storedUser) {
          // eslint-disable-next-line
      const { userId, userEmail } = JSON.parse(storedUser);
    }
  }, []);

  return (
    <ThemeProvider>
      <div className='bg-white dark:bg-[#212529] text-gray-900 dark:text-white  border-gray-300 dark:border-gray-500'>
        <ChakraProvider>
          <RouterProvider router={router} />
        </ChakraProvider>    
      </div>
    </ThemeProvider>
  );
}

export default App;