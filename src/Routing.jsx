import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundryJagan } from "./components/ErrorBoundry";
const WatchList = lazy(() => import("./pages/WatchList"));
const Search = lazy(() => import("./pages/Search"));
const SingleMovie = lazy(() => import("./pages/SingleMovie"));

const Home = lazy(() => import("./pages/Home")); // Yeh syntex ek component ko lazyly load karne k liye use hota hai.

function Routing() {
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorBoundryJagan} onReset={() => {}}>
      <Navbar />
        <Routes>
          <Route path="/" element={
             <Suspense fallback={<h1>Loading...</h1>}>
            <Home />
              </Suspense>
            
            } />
          <Route
            path="/search"
            element={
              <Suspense fallback={<h1>Loading...</h1>}>
                <Search />
              </Suspense>
            }
          />
          <Route
            path="/watchList"
            element={
              <Suspense fallback={<h1>Loading...</h1>}>
                <WatchList />
              </Suspense>
            }
          />
          <Route
            path="/singleMovie/:movieId"
            element={
              <Suspense
                fallback={<h1 className="text-fuchsia-700">Page loading...</h1>}
              >
                <SingleMovie />
              </Suspense>
            }
          />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default Routing;
