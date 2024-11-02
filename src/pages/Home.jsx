import React from "react";
import fetchHomePageData from "../hooks/fetchHomePageData";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import MovieCard from "../components/MovieCard";
import { useThemeState } from "../states/themeState";
// import { Movie } from '../../node_modules/react-icons/md';

function Home() {
  let {darkMode}=useThemeState()
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["searchProducts"],
    queryFn: () => fetchHomePageData(),
  });
  console.log(data);
  if (isError) return <h1>Error : {error.message}</h1>;
  return (
    <div className={`grid  w-full  grid-cols-4 gap-3 p-3 mt-[64px] ${darkMode? 'bgDark':'bgLight' } `}>
      {!isLoading ? (
        data.description.map((movie) => {
          return <MovieCard key={movie["#IMDB_ID"]} movie={movie} />;
        })
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default Home;
