import React from "react";
import { Link } from "react-router-dom";
import { PiRankingBold } from "react-icons/pi";
("react-icons/pi");
import { FaPlay } from "react-icons/fa";
import useStore from "../store";
import { toast } from "react-toastify";
// import { THEME } from "../constants/theme";
import "../index.css";
// import Skeleton from "react-loading-skeleton";

function MovieCard({
  movie,
  isRemoveFromWatchlist = false,
  isAddToWatchList = true,
}) {
  let { setWatchList, watchList, updateWatchList, setTempWatchList } =
    useStore();
  let addToWatchList = () => {
    let movieExists = false;
    watchList.map((oldMovie, id) => {
      if (oldMovie["#IMDB_ID"] == movie["#IMDB_ID"]) {
        movieExists = true; // Movie is found in the watchlist
      }
    });
    if (!movieExists) {
      setWatchList(movie);
      console.log("Movie added to watchlist");
    } else {
      toast("This Movie is already in the watchlist");
    }
  };

  const removeFromWatchList = () => {
    const updatedWatchList = watchList.filter(
      (oldMovie) => oldMovie["#IMDB_ID"] !== movie["#IMDB_ID"]
    );
    updateWatchList(updatedWatchList);
    toast("Movie removed from watchlist");
    // console.log("Movie removed from watchlist");
  };

  return (
    <div className={`  flex flex-col items-center rounded-xl   h-[36rem] `}>
      <img
        loading="lazy"
        className="rounded-xl  h-[26rem] w-full object-cover object-top	shadow-[inset_0_0_10px_rgba(0,0,0,0.3)]"
        src={movie["#IMG_POSTER"] || "aloo"}
        alt=""
      />

      <div className="  w-full flex flex-col py-4 gap-1 dark:text-[#FAFAFA] ">
        <div className=" w-full flex items-center gap-2 text-[20px] text-sm">
          <PiRankingBold />
          <p>Rank: {movie["#RANK"]}</p>
        </div>
        <Link>
          <h1 className="text-[25px] truncate text-xl">{movie["#AKA"]}</h1>
        </Link>

        <div className="flex gap-1">
          <Link to={`/singleMovie/${movie["#IMDB_ID"]}`}>
            <button
              onClick={() => {
                setTempWatchList(movie);
              }}
              className=" rounded-md border-2 border-[#F1E9EA] hover:bg-[#F1E9EA]  text-sm px-3 py-[2px] dark:border-[#ABABAB] dark:text-[#ABABAB] dark:border-[1px] dark:py-[4px] dark:hover:bg-[#303030] "
            >
              Watch now
            </button>
          </Link>
          <div className="flex gap-2">
            {isAddToWatchList && (
              <button
                onClick={addToWatchList}
                className="border-2 rounded-lg p-1 hover:bg-gray-300 text-sm px-4 py-[2px] dark:border-[#ABABAB] dark:text-[#ABABAB] dark:py-[4px] dark:border-[1px] dark:hover:bg-[#303030]"
              >
                Watchlist
              </button>
            )}
          </div>
          {isRemoveFromWatchlist && (
            <button
              className="border-2 rounded-lg p-1 hover:bg-gray-300 text-sm px-4 py-[2px] dark:border-[#ABABAB] dark:text-[#ABABAB] dark:py-[4px] dark:border-[1px] dark:hover:bg-[#303030]"
              onClick={removeFromWatchList}
            >
              Remove
            </button>
          )}
        </div>
        <button className=" flex items-center gap-2 text-sm dark:text-[#9E9E9E]">
          <FaPlay />
          Trailer
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
