import React from "react";
import Navbar from "./components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routing from "./Routing";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useThemeState } from "./states/themeState";
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from "react-loading-skeleton";
const queryClient = new QueryClient();

function App() {
  const {darkMode} = useThemeState()
  return (
    // <SkeletonTheme baseColor="#000" highlightColor="#000">
    <QueryClientProvider client={queryClient}>
      <div className={`${darkMode ? "gray" : "light"}`}>
      <Routing />
      </div>
    
      <ToastContainer theme={darkMode ? "dark" : "light"}/>
    </QueryClientProvider>
    // </SkeletonTheme>
  );
}

export default App;
