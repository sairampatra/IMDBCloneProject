import React from "react";
import Navbar from "./components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routing from "./Routing";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from "react-loading-skeleton";
import useStore from "../src/store";

const queryClient = new QueryClient();

function App() {
    const { theme } = useStore();

  return (
    // <SkeletonTheme baseColor="#000" highlightColor="#000">
    <QueryClientProvider client={queryClient}>
      <div className=''>
      <Routing />
      </div>
    
      <ToastContainer theme={`${theme == 'dark'? "dark" : "light"}`}   style={{
    '--toastify-toast-width': '340px',
    '--toastify-toast-min-height': '0px',
  }} />
    </QueryClientProvider >
    // </SkeletonTheme>
  );
}

export default App;
