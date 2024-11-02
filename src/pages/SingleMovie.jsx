// import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchWatchlistData } from "../hooks/fetchWatchlistData";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { fetchTrailerVideo } from "../hooks/fetchTrailerVideo";
import { IoMdAdd } from "react-icons/io";
// import { useStore } from "zustand";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useThemeState } from "../states/themeState";
// import SkeletonMovieCard from "../skeletonLoaders/SkeletonMovieCard";
import useStore from "../store";
import SkelitonSinglePage from "../skeletonLoaders/SkelitonSinglePage";
import parse from 'html-react-parser';


function SingleMovie() {
  let {darkMode}=useThemeState()
  const {tempWatchlist, handleTempWatchlist} = useStore()

  // let{setWatchList,watchList}=useStore()
  const { movieId } = useParams();
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
  let genre = data?.short?.genre?.map((genre, id) => {
    return (
      <button key={id} className="px-3 py-[1px] border-[1px] rounded-3xl">
        {genre}
      </button>
    );
  });
  let directorName = data?.short?.director?.map((director, id) => (
    director?.name?.length>0? (
      
        <div key={id} className="border-t-[1px] border-gray-500 w-full py-3">
              Director<span className="text-[#5593e5]  border-r-[1px] px-2" >
          {director.name}
        </span>
            </div>
    ): null
     
        
     
  )
   
  );
  let writersName = data?.short?.creator?.map((creator, id) => {
    return (
      <span className="text-[#5593e5]  border-r-[1px] px-2" key={id}>
        {creator.name}
      </span>
    );
  });
  let acrorsName = data?.short?.actor?.map((actor, id) => {
    return (
      <span className="text-[#5593e5]  border-r-[1px] px-2" key={id}>
        {actor.name}
      </span>
    );
  });
  let castInfo = data?.main?.cast?.edges?.map((cast, id) => {
    return (
      <div
        key={id}
        className="w-[300px] h-[120px] flex justify-start items-center gap-3"
      >
        <img
          src={cast?.node?.name?.primaryImage?.url|| "https://avatar.iran.liara.run/public"}
          alt="No image"
          className="  rounded-full h-[110px] w-[110px] flex items-center justify-center object-cover"
        />
        <div>
          <h2 className="font-semibold">{cast?.node?.name?.nameText?.text}</h2>
          <p className="text-gray-500">
            {cast?.node?.characters?.map((charname, id) => {
              return <span key={id}>{charname.name}</span>;
            })}
          </p>
        </div>
      </div>
    );
  });
  // if (isLoading) {
  //   return <div className="text-yellow-100" >Loading...</div>;
  // }

  console.log(tempWatchlist , 'amaku side diyo re');

  return (
    <div>

      {isLoading 
        ?<SkelitonSinglePage />
        : <div className="mt-[64px]  ">
        <div className={` px-11 bg-gray-700 text-gray-200  pb-8 ${darkMode? 'bgDark' : 'bgLight'}`}>
          <div className="  flex justify-between  ">
            <div>
              <h1 className="text-[50px]">{data?.short?.name}</h1>
              {/* <p className="text-[18px]">Original title: Dar emtedad shab</p> */}
              <ul className="flex gap-3 ">
                <li>{data.short.datePublished?.substring(0, 4)}</li>
                <li className="border-l-2 border-gray-500 px-3">
                  {data.top.runtime?.displayableProperty.value.plainText}
                </li>
              </ul>
            </div>
            <div className=" flex gap-5 ">
              <div className="rating flex flex-col m-2 items-center">
                <h3>IMDb RATING</h3>
                <div className="flex items-center gap-2 mt-1">
                  <FaStar color="yellow" size={25} />
                  <div className="flex flex-col leading-5">
                    <div className="flex items-center">
                      <span className="text-[20px] font-medium">
                        {data?.short?.aggregateRating?.ratingValue}
                      </span>
                      <span>/{data?.short?.aggregateRating?.bestRating}</span>
                    </div>
                    <div className="text-[14px]">
                      {data?.short?.aggregateRating?.ratingCount}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rateit flex flex-col m-2 items-center">
                <h3>YOUR RATING</h3>
                <div className="flex items-center gap-2 mt-2">
                  <CiStar color="skyblue" size={25} />
                  <h1 className="text-[20px] font-medium">Rate</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="   mt-2  gap-1  grid  w-full grid-cols-[1.2fr,3fr,1fr]   ">
            <div className="poster  ">
              <img
                className="w-full h-full object-cover rounded-xl"
                src={data?.short?.image}
                alt="noimage"
              />
            </div>
            <div className="  trailerVideo w-full  h-[500px] ">
              <video
                className="w-full h-full object-cover rounded-xl  "
                src={videoData}
                width="400"
                controls
              ></video>
            </div>
            <div className="   flex flex-col justify-between gap-1 w-full  ">
              <div className="videos bg-gray-500 opacity-2 rounded-xl   h-[50%] w-full justify-center items-center opacity-2 flex ">
                {data.top.videos?.total}videos
              </div>
              <div className="photos bg-gray-500 opacity-2   rounded-xl h-[50%] w-full justify-center items-center opacity-2 flex">
                {data.top.images?.total}photos
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-5 w-[300px] ">{genre}</div>
          <div className="flex gap-2 mt-5 w-[700px] ">
            {parse(data?.short?.description)}
          </div>
          <div className="mt-2 flex  w-ful justify-between ">
            <div className="w-[70%]">
              {   directorName}
              
              <div className="border-t-[1px] border-gray-500 w-full py-3">
                Writers {writersName}
              </div>
              <div className="border-t-[1px] border-gray-500 w-full py-3">
                stars {acrorsName}
              </div>
            </div>
            <button
              onClick={handleTempWatchlist}
              className="watchlistadd flex mt-6 items-center gap-4 bg-[#FEF9C3] text-black h-[60px] p-3 w-[300px] justify-start leading-5 rounded-full"
            >
              <IoMdAdd size={25} />
              <div>
                <h2>Add to Watchlist</h2>
                <p>
                  {
                    data?.top?.engagementStatistics?.watchlistStatistics
                      ?.displayableCount?.text
                  }
                </p>
              </div>
            </button>
          </div>
        </div>
        <div className={`flex flex-col w-full   px-11 ${darkMode? 'bg-[#00000030]': 'bg-white'}`}>
          <div className="flex  w-full py-6 gap-2 items-center relative justify-start">
            <div className="border-l-4 border-[#f1e23d] h-11 rounded-full"> </div>
            <h1 className="text-[30px] font-medium ">Top cast</h1>
            <p className="text-[15px] mt-1 font-light">{data?.main?.cast?.total}</p>
            <MdKeyboardArrowRight size={55} className="absolute left-44 mt-1" />
          </div>                  
          <div className=" grid grid-cols-3 gap-4">{castInfo}</div>
        </div>
      </div>}
    </div>
    
  );
}
export default SingleMovie;
