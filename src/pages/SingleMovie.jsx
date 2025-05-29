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
  const { tempWatchlist, handleTempWatchlist,theme } = useStore();

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
  let directorName = data?.short?.director?.map((director, id, array) =>
    director?.name?.length > 0 ? (
      <div key={id} className="border-t-[1px] border-gray-500 w-full py-3 dark:text-[#9E9E9E]">
        Director
        {id < array.length - 1 ?  <span className="  border-r-[1px] px-2 dark:text-[#F1F1F1] ">
          {director.name}
        </span> :  <span className="  px-2 dark:text-[#F1F1F1] ">
          {director.name}
        </span>}
       
      </div>
    ) : null
  );
  let writersName = data?.short?.creator?.map((creator, id , array) =>
    creator?.name != null ? (
      id < array.length - 1 ? <span className=" dark:text-[#F1F1F1]  border-r-[1px] px-2" key={id}>
        {creator?.name}
      </span> :<span className=" dark:text-[#F1F1F1]   px-2" key={id}>
        {creator?.name}
      </span>
      
    ) : null
  );
  let acrorsName = data?.short?.actor?.map((actor, id , array) =>
    actor?.name != null ? (
      id < array.length - 1 ? <span className=" dark:text-[#F1F1F1]  border-r-[1px] px-2" key={id}>
        {actor.name}
      </span> : <span className="dark:text-[#F1F1F1]   px-2" key={id}>
        {actor.name}
      </span>

      
    ) : null
  );
  let castInfo = data?.main?.cast?.edges?.map((cast, id) => {
    return (
      <div
        key={id}
        className="w-[300px] h-[120px] flex justify-start items-center gap-3"
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
          <h2 className="font-semibold dark:text-[#FFFFFF]">{cast?.node?.name?.nameText?.text}</h2>
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

  console.log(tempWatchlist, "amaku side diyo re");

  return (
        <div className={`${theme}`}>

    <div>
      {isLoading ? (
        <SkelitonSinglePage />
      ) : (
        <div className="mt-[64px]  ">
          <div className={` px-11 dark:bg-[#141414] text-gray-200  pb-8 `}>
            <div className="  flex justify-between  ">
              <div>
                <h1 className="text-4xl my-3 dark:text-[#FFFFFF]">{data?.short?.name}</h1>
                <ul className="flex gap-2 text-xs text-[#ABABAB]">
                  <li>{data?.short?.datePublished?.substring(0, 4)}</li>
                  <li className="border-l-2 border-r-2 border-gray-500 px-2">
                    {data?.top?.runtime?.displayableProperty.value.plainText}
                  </li>
                  {genre}
                </ul>
              </div>
              <div className=" flex gap-5 mt-1 text-xs">
                {data?.short?.aggregateRating != null ? (
                  <div className=" rating flex flex-col m-2 items-center ">
                    <h3>IMDb RATING</h3>
                    <div className="flex items-start gap-2 mt-1">
                      <FaStar color="yellow" size={23} />
                      <div className="flex flex-col leading-5">
                        <div className="flex items-center">
                          <span className="text-lg font-medium">
                            {data?.short?.aggregateRating?.ratingValue}
                          </span>
                          <span>
                            /{data?.short?.aggregateRating?.bestRating}
                          </span>
                        </div>
                        <div className="text-xs text-[#ABABAB]">
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
            </div>
            <div className="   mt-2  gap-2  grid  w-full grid-cols-[1.2fr,3fr,1fr] h-80   ">
              <div className="poster  ">
                <img
                  className="w-full h-full object-cover rounded-xl"
                  src={data?.short?.image}
                  alt="noimage"
                />
              </div>
              <div className="  trailerVideo w-full  h-full ">
                <video
                  className="w-full h-full object-cover rounded-xl  "
                  src={videoData}
                  width="400"
                  controls
                ></video>
              </div>
              <div className="   flex flex-col justify-between gap-1 w-full  ">
                <div className="videos dark:bg-[#d7d3d347]  opacity-2 rounded-xl   h-[50%] w-full justify-center items-center opacity-2 flex ">
                  {data?.top?.videos?.total} videos
                </div>
                <div className="photos dark:bg-[#d7d3d347] opacity-2   rounded-xl h-[50%] w-full justify-center items-center opacity-2 flex">
                  {data?.top?.images?.total} photos
                </div>
              </div>
            </div>
            {data.short.description ? (
              <div className="flex gap-2 mt-5 w-[700px] text-sm text-[#FFFFFF]">
                {parse(data?.short?.description)}
              </div>
            ) : null}

            <div className="mt-2 flex  w-full justify-between items-center  text-xs">
              <div className="w-[65%]">
                {directorName}
                {data?.short?.creator?.length > 0 ? (
                  <div className="border-t-[1px] border-gray-500 w-full py-3 dark:text-[#9E9E9E]">
                    Writers {writersName}
                  </div>
                ) : null}
                {data?.short?.actor?.length > 0 ? (
                  <div className="border-t-[1px] border-gray-500 w-full py-3 dark:text-[#9E9E9E]">
                    Stars {acrorsName}
                  </div>
                ) : null}
              </div>
              <button
                onClick={handleTempWatchlist}
                className="watchlistadd flex  items-center gap-2 px-5 py-1 dark:bg-[#303030] dark:text-[#F1F1F1]   leading-5 rounded-full"
              >
                <IoMdAdd size={20}  />
                <div >
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
          <div className={`flex flex-col w-full   px-11 dark:bg-[#141414] border-t-[1px] dark:border-[#9E9E9E]`}>
            <div className="flex  w-full py-6 gap-2 items-center  justify-start">
              <div className="border-l-4 border-[#f1e23d] h-8 rounded-full">
                {" "}
              </div>
              <h1 className="text-[30px] font-medium text-2xl dark:text-[#FFFFFF]">Top cast</h1>
              <p className="text-[15px] mt-1 font-light text-xs dark:text-[#9E9E9E]">
                {data?.main?.cast?.total}
              </p>
              <MdKeyboardArrowRight
                size={30}
                color="#FFFFFF"
                className="  mt-1"
              />
            </div>
            <div className=" grid grid-cols-3 gap-4 ">{castInfo}</div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
export default SingleMovie;
