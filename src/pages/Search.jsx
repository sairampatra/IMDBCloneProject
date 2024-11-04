import React, { useEffect } from "react";
import useStore from "../store";
import { useDebounce } from "@uidotdev/usehooks";
import { fetchSearchData } from "../hooks/fetchSearchData";
import { useQuery } from "@tanstack/react-query";
import MovieCard from "../components/MovieCard";
import SkeletonMovieCard from "../skeletonLoaders/SkeletonMovieCard";
import { useThemeState } from "../states/themeState";
import { MOVIES_LIST } from "../constants/MOVIES_LIST";
import Kheti from "../components/kheti";

function Search() {
  let {darkMode}=useThemeState()
  let movieWords = MOVIES_LIST
  let { data: bhalu, setData } = useStore();
  let debounce = useDebounce(bhalu, 1000);
  useEffect(() => {
    let pick = Math.floor(Math.random() * movieWords.length);
    setData(movieWords[pick]);
  }, [setData]);

  let { data, isError, isLoading } = useQuery({
    queryKey: ["searchProducts", debounce],
    queryFn: () => fetchSearchData(debounce),
  });
  if (isError) {
    // console.log(error)
    return <div>error he mc</div>;
  }
  // console.log(data)
  return (
    
    <div className={`grid w-full  grid-cols-4 gap-3 p-3 relative mt-[64px] ${darkMode? 'bgDark':'bgLight' }`}>
      {isLoading
        ? Array.from({ length: 8 }).map((item, i) => <SkeletonMovieCard key={i}/>)
        : bhalu === 'sanskruti' || bhalu ==='Sanskruti'  || bhalu ==='Sanskruti sahoo'? <Kheti/> :
       
        data.map((movie, id) => {
            return <MovieCard key={id} movie={movie} />;
          })}
    </div>
  );
}

export default Search;
