import React from "react";
import { Link } from "react-router-dom";
import { PiRankingBold } from "react-icons/pi";
("react-icons/pi");
import { FaPlay } from "react-icons/fa";
import useStore from "../store";
import { toast } from "react-toastify";
// import { THEME } from "../constants/theme";
import { useThemeState } from "../states/themeState";
import "../index.css"
// import Skeleton from "react-loading-skeleton";

function MovieCard({ movie, isRemoveFromWatchlist = false  ,isAddToWatchList=true}) {
  let { setWatchList, watchList, updateWatchList,setTempWatchList } = useStore();
  const {darkMode} = useThemeState()
  let addToWatchList = () => {
    let movieExists = false;
    watchList.map((oldMovie, id) => {
      if (oldMovie["#IMDB_ID"] == movie["#IMDB_ID"]) {
        movieExists = true; // Movie is found in the watchlist
      }
    });
    if (!movieExists) {
      setWatchList(movie);
      // setWatchList([...watchList, movie]);
      console.log("Movie added to watchlist");
    } else {
      toast("This Movie is already in the watchlist");
    }

    // console.log(watchList)
  };

  const removeFromWatchList = () => {
    const updatedWatchList = watchList.filter(
      (oldMovie) => oldMovie["#IMDB_ID"] !== movie["#IMDB_ID"]
    );
    updateWatchList(updatedWatchList);
    toast("Movie removed from watchlist");
    console.log("Movie removed from watchlist");
  };

  return (
    <div className={`  flex flex-col items-center rounded-xl ${darkMode ? "darkCard" : "lightCard"}`}>
        <img
          loading="lazy"
          className="rounded-t-xl  h-[360px] w-full object-cover	"
          src={movie["#IMG_POSTER"] || "aloo"}
          alt=""
          />

        <div className="  w-full flex flex-col p-4 gap-[7px]">
          <div className=" w-full flex items-center gap-2 text-[20px]">
            <PiRankingBold />
            <p>Rank: {movie["#RANK"]}</p>
          </div>
          <Link>
            {" "}
            <h1 className="text-[25px] truncate ">{movie["#AKA"]}</h1>
          </Link>
           <Link to={`/singleMovie/${movie["#IMDB_ID"]}`}>
          <button 
          onClick={()=>{setTempWatchList(movie)}}
          className=" text-[20px] rounded-md border-2 border-darkgray-500 hover:bg-gray-300 w-[170px] ">
            Watch now
          </button> </Link>
          <div className="flex gap-2">
            {isAddToWatchList && ( <button
              onClick={addToWatchList}
              className="border-2 rounded-lg p-1 hover:bg-gray-300 w-[170px]"
            >
              AddToWatchlist
            </button>) }
           
            {isRemoveFromWatchlist && (
              <button
                className="border-2 rounded-lg p-1 hover:bg-gray-300 w-[170px]"
                onClick={removeFromWatchList}
              >
                RemoveFromWatchlist
              </button>
            )}
          </div>
          <button className=" flex items-center gap-2">
            <FaPlay />
            Trailer
          </button>
        </div>
      </div>
   
  );
}

export default MovieCard;
