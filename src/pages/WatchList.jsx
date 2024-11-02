import React from "react";
import useStore from "../store";
import MovieCard from "../components/MovieCard";
import { useThemeState } from "../states/themeState";

function WatchList() {
  let {darkMode}=useThemeState()

  let { watchList } = useStore();
  console.log(watchList)

  return (
    <div className={`grid  w-full  grid-cols-4 gap-3 p-3 relative mt-[64px] ${darkMode? 'bgDark':'bgLight' }`}>
      {watchList && watchList.map((movie, id) => {
        return (
          <MovieCard key={id} movie={movie} isRemoveFromWatchlist={true} isAddToWatchList={false}/>
        );
      })}
    </div>
  );
}

export default WatchList;
