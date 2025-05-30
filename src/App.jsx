import React from "react";
import Navbar from "./components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routing from "./Routing";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from "react-loading-skeleton";
import useStore from "../src/store";

const queryClient = new QueryClient();

function App() {
    const { theme } = useStore();

  return (
    <QueryClientProvider client={queryClient}>
      <div className=''>
      <Routing />
      </div>
    
      <ToastContainer theme={`${theme == 'dark'? "dark" : "light"}`} position="top-left" limit={2}   toastClassName="custom-toast" />
    </QueryClientProvider >
  );
}

export default App;
