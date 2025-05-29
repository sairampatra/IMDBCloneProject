import React from "react";
import fetchHomePageData from "../hooks/fetchHomePageData";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import MovieCard from "../components/MovieCard";
// import { Movie } from '../../node_modules/react-icons/md';
import useStore from "../store";

function Home() {
  const { theme } = useStore();

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["searchProducts"],
    queryFn: () => fetchHomePageData(),
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false, // Prevent refetching when switching tabs
  });
  // console.log(data);
  if (isError) return <h1>Error : {error.message}</h1>;
  return (
    <div className={`${theme}`}>
      <div className={`grid  w-full  grid-cols-4 gap-5 p-3 mt-[64px] bg-[#FCF8F8] dark:bg-[#141414] `}>
        {!isLoading ? (
          data.description.map((movie) => {
            return <MovieCard key={movie["#IMDB_ID"]} movie={movie} />;
          })
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default Home;
