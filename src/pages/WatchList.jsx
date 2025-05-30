import React from "react";
import useStore from "../store";
import MovieCard from "../components/MovieCard";

function WatchList() {

  let { watchList,theme } = useStore();
  console.log(watchList)

  return (
            <div className={`${theme}`}>
            <div className={`grid px-3 pt-20 grid-cols-2 md:grid-cols-3 min-h-screen w-full  lg:grid-cols-4 gap-3 lg:p-3 relative lg:mt-[64px] bg-[#FCF8F8] dark:bg-[#141414]`}>
      
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
