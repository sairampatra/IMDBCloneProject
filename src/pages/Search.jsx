import React, { useEffect } from "react";
import useStore from "../store";
import { useDebounce } from "@uidotdev/usehooks";
import { fetchSearchData } from "../hooks/fetchSearchData";
import { useQuery } from "@tanstack/react-query";
import MovieCard from "../components/MovieCard";
import SkeletonMovieCard from "../skeletonLoaders/SkeletonMovieCard";
import { MOVIES_LIST } from "../constants/MOVIES_LIST";
import Kheti from "../components/Kheti";
// just making changes
function Search() {
  let movieWords = MOVIES_LIST;
  let { data: bhalu, setData,theme } = useStore();
  let debounce = useDebounce(bhalu, 1000);
  
function setRandomMovie() {
   let pick = Math.floor(Math.random() * movieWords.length);
    setData(movieWords[pick]);
}
useEffect(() => {
  if (debounce === '') {
    setRandomMovie();
  }
}, [debounce]);
  let { data, isError, isLoading } = useQuery({
    queryKey: ["searchProducts", debounce],
    queryFn: () => fetchSearchData(debounce),
  });
  useEffect(() => {
   setRandomMovie()
  }, [setData]);

  
  if (isError) {
    // console.log(error)
    return <div>error he mc</div>;
  }
  return (
        <div className={`${theme}`}>

    <div
      className={`grid px-3 pt-20 w-full  h-full grid-cols-2  lg:grid-cols-4 gap-3 lg:p-3 relative lg:mt-[64px] bg-[#FCF8F8] dark:bg-[#141414]`}
    >
      {isLoading ? (
        Array.from({ length: 8 }).map((item, i) => (
          <SkeletonMovieCard key={i} />
        ))
      ) : bhalu === "sanskruti" ||
        bhalu === "Sanskruti" ||
        bhalu === "sanskruti sahoo" ||
        bhalu === "Sanskruti Sahoo" ? (
        <Kheti />
      ) : (
        data.map((movie, id) => {
          return <MovieCard key={id} movie={movie} />;
        })
      )}
    </div>
    </div>
  );
}

export default Search;
