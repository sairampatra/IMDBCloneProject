import React from "react";
import useStore from "../store";
import MovieCard from "../components/MovieCard";

function WatchList() {

  let { watchList,theme } = useStore();
  console.log(watchList)

  return (
            <div className={`${theme}`}>

    <div className={`grid  w-full  grid-cols-4 gap-3 p-3 relative mt-[64px] bg-[#FCF8F8] dark:bg-[#141414]`}>
      {watchList && watchList.map((movie, id) => {
        return (
          <MovieCard key={id} movie={movie} isRemoveFromWatchlist={true} isAddToWatchList={false}/>
        );
      })}
    </div>
    </div>
  );
}

export default WatchList;
