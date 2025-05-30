import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchWatchlistData } from "../hooks/fetchWatchlistData";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { fetchTrailerVideo } from "../hooks/fetchTrailerVideo";
import { IoMdAdd } from "react-icons/io";
// import { useStore } from "zustand";
import { MdKeyboardArrowRight } from "react-icons/md";
// import SkeletonMovieCard from "../skeletonLoaders/SkeletonMovieCard";
import useStore from "../store";
import SkelitonSinglePage from "../skeletonLoaders/SkelitonSinglePage";
import parse from "html-react-parser";

function SingleMovie() {
  const { tempWatchlist, handleTempWatchlist, theme } = useStore();

  const { movieId } = useParams();
  useEffect(() => {
    console.log(movieId);
  }, [movieId]);
  let { data, isLoading, error, isError } = useQuery({
    queryKey: ["watchlistCache", movieId],
    queryFn: () => fetchWatchlistData(movieId),
  });
  let {
    data: videoData,
    isLoading: videoLoading,
    isError: videoIsError,
    error: videoError,
  } = useQuery({
    queryKey: ["trailerCache", movieId],
    queryFn: () => fetchTrailerVideo(movieId),
  });
  let genre = data?.short?.genre?.map((genre, index, array) => (
    <li key={index}>
      {genre}
      {index < array.length - 1 ? "," : ""}
    </li>
  ));
  let ratingsInfo = function ({ data }) {
    return (
      <div className=" ratings_area md:items-start  lg:items-start items-center justify-center flex gap-5 mt-1 text-xs dark:text-[#FFFFFF] text-[#171212] ">
        {data?.short?.aggregateRating != null ? (
          <div className=" rating flex flex-col m-2 items-center ">
            <h3>IMDb RATING</h3>
            <div className="flex items-start gap-2 mt-1">
              <FaStar color="#f1e23d" size={23}  />
              <div className="flex items-center md:flex-col lg:flex-col leading-5 md:gap-0 lg:gap-0 gap-3">
                <div className="flex items-center">
                  <span className="text-lg font-medium">
                    {data?.short?.aggregateRating?.ratingValue}
                  </span>
                  <span>/{data?.short?.aggregateRating?.bestRating}</span>
                </div>
                <div className="text-xs dark:text-[#ABABAB] text-[#8B5B5D]">
                  {data?.short?.aggregateRating?.ratingCount}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="rateit flex flex-col m-2 items-center">
          <h3>YOUR RATING</h3>
          <div className="flex items-center gap-1 mt-1">
            <CiStar color="#ABABAB" size={23} />
            <h1 className=" text-sm font-medium">Rate</h1>
          </div>
        </div>
      </div>
    );
  };

  let posterImage = function ({ data }) {
    return (
      <div className="poster h-full  overflow-hidden">
        <img
          className="w-full h-full object-cover md:rounded-xl lg:rounded-xl"
          src={data?.short?.image}
          alt="noimage"
        />
      </div>
    );
  };

  let directorName = data?.short?.director?.map((director, id, array) =>
    director?.name?.length > 0 ? (
      <div
        key={id}
        className="border-t-[1px] border-gray-400  w-full py-3 dark:text-[#9E9E9E] text-gray-400"
      >
        Director
        {id < array.length - 1 ? (
          <span className=" border-[#171212] border-r-[1px] px-2 dark:text-[#F1F1F1] text-[#171212]">
            {director.name}
          </span>
        ) : (
          <span className=" border-[#171212] px-2 dark:text-[#F1F1F1] text-[#171212]">
            {director.name}
          </span>
        )}
      </div>
    ) : null
  );
  let writersName = data?.short?.creator?.map((creator, id, array) =>
    creator?.name != null ? (
      id < array.length - 1 ? (
        <span
          className="text-[#171212] border-[#171212] dark:text-[#F1F1F1]  border-r-[1px] px-2"
          key={id}
        >
          {creator?.name}
        </span>
      ) : (
        <span
          className="text-[#171212] dark:text-[#F1F1F1]  border-[#171212] px-2"
          key={id}
        >
          {creator?.name}
        </span>
      )
    ) : null
  );
  let acrorsName = data?.short?.actor?.map((actor, id, array) =>
    actor?.name != null ? (
      id < array.length - 1 ? (
        <span
          className="border-[#171212] dark:text-[#F1F1F1]  border-r-[1px] text-[#171212] px-2"
          key={id}
        >
          {actor.name}
        </span>
      ) : (
        <span
          className="border-[#171212] text-[#171212] dark:text-[#F1F1F1]   px-2"
          key={id}
        >
          {actor.name}
        </span>
      )
    ) : null
  );
  let castInfo = data?.main?.cast?.edges?.map((cast, id) => {
    return (
      <div
        key={id}
        className="min-w-[300px] lg:w-[300px] h-[120px] flex justify-start items-center gap-3"
      >
        <img
          src={
            cast?.node?.name?.primaryImage?.url ||
            "https://avatar.iran.liara.run/public"
          }
          alt="No image"
          className="  rounded-full h-[110px] w-[110px] flex items-center justify-center object-cover object-top"
        />
        <div>
          <h2 className="font-semibold dark:text-[#FFFFFF]">
            {cast?.node?.name?.nameText?.text}
          </h2>
          <p className="text-gray-500 dark:text-[#9E9E9E]">
            {cast?.node?.characters?.map((charname, id) => {
              return <span key={id}>{charname.name}</span>;
            })}
          </p>
        </div>
      </div>
    );
  });
  // if (videoError) {
  //   return <div className="text-yellow-100" >Loading...</div>;
  // }

  // console.log(tempWatchlist, "amaku side diyo re");

  return (
    <div className={`${theme}`}>
      <div>
        {isLoading ? (
          <SkelitonSinglePage />
        ) : (
          <div className="mt-[64px]  bg-[#FBF9F9]">
            <div
              className={`px-4 lg:px-11 dark:bg-[#141414] text-gray-200  pb-8 `}
            >
              <div className="top_most  flex justify-between  ">
                <div>
                  <h1 className="text-4xl my-3 dark:text-[#FFFFFF] text-[#171212]">
                    {data?.short?.name}
                  </h1>
                  <ul className="flex gap-2 text-xs text-[#8B5B5D] dark:text-[#ABABAB]">
                    <li>{data?.short?.datePublished?.substring(0, 4)}</li>
                    <li className="border-l-2 border-r-2 border-[#8B5B5D] dark:border-gray-500 px-2">
                      {data?.top?.runtime?.displayableProperty.value.plainText}
                    </li>
                    {genre}
                  </ul>
                </div>
                <div className="hidden md:block lg:block">{ratingsInfo({ data })}</div>
              </div>
              <div className=" h-[12rem] md:grid md:grid-cols-[1.199fr,3fr] md:h-[24rem]  xl:h-[30rem]  lg:grid w-full lg:grid-cols-[1.2fr,3fr,1fr] lg:h-[24rem] mt-2 gap-2    box-border">
                <div className="hidden md:block lg:block">{posterImage({ data })}</div>
                <div className=" trailerVideo w-full h-full overflow-hidden ">
                  {videoLoading ? (
                    <div className="text-[black] dark:text-white w-full h-full flex justify-center items-center border rounded-none md:rounded-xl  lg:rounded-xl">
                      <p>Loading trailer...</p>
                    </div>
                  ) : videoError ? (
                    <div className="w-full h-full flex justify-center items-center border   text-[black] dark:text-white md:rounded-xl  lg:rounded-xl">
                      ⚠️ Trailer not available for this movie.{" "}
                      {videoError.message}
                    </div>
                  ) : (
                    <video
                      className="w-full h-full object-cover md:rounded-xl  lg:rounded-xl"
                      src={videoData}
                      width="400"
                      controls
                    ></video>
                  )}
                </div>
                <div className="hidden  lg:block">
                  <div className="   flex flex-col justify-between gap-1 w-full h-full">
                    <div className="videos bg-[#d9d8d8] text-[#171212] dark:bg-[#f0eaea5f] rounded-xl h-[50%] w-full flex justify-center items-center">
                      {data?.top?.videos?.total} videos
                    </div>
                    <div className="photos bg-[#d9d8d8] text-[#171212] dark:bg-[#f0eaea5f] rounded-xl h-[50%] w-full flex justify-center items-center">
                      {data?.top?.images?.total} photos
                    </div>
                  </div>
                </div>
              </div>
              <div className="description flex items-start justify-center mt-2 gap-2">
                <div className="md:hidden lg:hidden  w-60">{posterImage({ data })}</div>
                {data?.short?.description ? (
                  <div className="flex gap-2 mt-5 w-full text-sm text-[#171212] dark:text-[#FFFFFF]">
                    {parse(data?.short?.description)}
                  </div>
                ) : null}
              </div>
              <div className="md:hidden lg:hidden">

              {ratingsInfo({ data })}
              </div>
              <div className=" mt-5 flex flex-col md:flex-row lg:flex-row w-full justify-between items-center  text-xs ">
                <div className="w-full md:w-[65%]  lg:w-[65%]">
                  {directorName}
                  {data?.short?.creator?.length > 0 ? (
                    <div className="border-t-[1px] border-gray-400 w-full py-3 dark:text-[#9E9E9E] text-gray-400">
                      Writers {writersName}
                    </div>
                  ) : null}
                  {data?.short?.actor?.length > 0 ? (
                    <div className="border-t-[1px] border-gray-400  w-full py-3 dark:text-[#9E9E9E] text-gray-400">
                      Stars {acrorsName}
                    </div>
                  ) : null}
                </div>
                <button
                  onClick={handleTempWatchlist}
                  className=" mt-4 watchlistadd flex  items-center gap-2 px-5 py-1 dark:bg-[#303030] bg-[#F1E9EA] dark:text-[#F1F1F1]  text-[#8B5B5D] leading-5 rounded-full"
                >
                  <IoMdAdd size={20} />
                  <div>
                    <h2 className=" text-base ">Add to Watchlist</h2>
                    <p className="text-xs dark:text-[#9E9E9E] ">
                      {
                        data?.top?.engagementStatistics?.watchlistStatistics
                          ?.displayableCount?.text
                      }
                    </p>
                  </div>
                </button>
              </div>
            </div>
            <div className={` flex flex-col w-full  px-5 lg:px-11 dark:bg-[#141414] dark:border-t-[1px] border-t-[2px] border-[#F1E9EA] dark:border-[#9E9E9E]`}>
            <div className="flex  w-full py-6 gap-2 items-center  justify-start">
              <div className="border-l-4 border-[#f1e23d] h-8 rounded-full">
                {" "}
              </div>
              <h1 className="text-[20px] lg:text-[30px] font-medium text-2xl dark:text-[#FFFFFF]">Top cast</h1>
              <p className="text-[15px] mt-1 font-light text-xs dark:text-[#9E9E9E]">
                {data?.main?.cast?.total}
              </p>
              <MdKeyboardArrowRight
                size={30}
                color={theme == 'dark' ? "#FFFFFF" : "#141414" }
                className="  mt-1"
              />
            </div>
            <div className="flex flex-row md:grid md:grid-cols-2 md:overflow-x-visible   lg:grid lg:grid-cols-3 gap-4 overflow-x-auto hide-scrollbar mb-8">{castInfo}</div>
          </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default SingleMovie;
