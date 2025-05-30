import React from 'react'
import Skeleton from 'react-loading-skeleton'
import useStore from "../store";

function SkelitonSinglePage() {
    const { tempWatchlist, handleTempWatchlist, theme } = useStore();

  return (
        <div className={`${theme}`}>

    <div className="mt-[64px]">
      <div className="px-4 dark:bg-[#141414] lg:px-11 pb-8">
        {/* Top section with title and ratings */}
        <div className="flex justify-between">
          <div>
            <h1 className="text-4xl my-3 w-80">
              <Skeleton />
            </h1>
            <ul className="flex gap-2">
              <li><Skeleton className="w-11" /></li>
              <li className="border-l-2 px-2">
                <Skeleton className="w-16" />
              </li>
              <li><Skeleton className="w-12" /></li>
            </ul>
          </div>
          {/* Ratings - hidden on mobile, visible on lg+ */}
          <div className="hidden lg:flex gap-5">
            <div className="rating flex flex-col m-2 items-center">
              <h3><Skeleton className="w-28 h-5" /></h3>
              <div className="flex items-center gap-2 mt-1">
                <Skeleton className="w-28 h-20" />
              </div>
            </div>
            <div className="rateit flex flex-col m-2 items-center">
              <h3><Skeleton className="w-28 h-5" /></h3>
              <div className="flex items-center mt-1">
                <Skeleton className="w-28 h-20" />
              </div>
            </div>
          </div>
        </div>

        {/* Media section - responsive grid */}
        <div className="h-[12rem] xl:h-[30rem] lg:grid w-full lg:grid-cols-[1.2fr,3fr,1fr] lg:h-[24rem] mt-2 gap-2">
          {/* Poster - hidden on mobile, visible on lg+ */}
          <div className="hidden lg:block">
            <Skeleton className="w-full h-full rounded-xl" />
          </div>
          
          {/* Trailer video */}
          <div className="trailerVideo w-full h-full">
            <Skeleton className="w-full h-full object-cover lg:rounded-xl" />
          </div>
          
          {/* Videos/Photos count - hidden on mobile, visible on lg+ */}
          <div className="hidden lg:block">
            <div className="flex flex-col justify-between gap-1 w-full h-full">
              <Skeleton className="rounded-xl h-[50%] w-full" />
              <Skeleton className="rounded-xl h-[50%] w-full" />
            </div>
          </div>
        </div>

        {/* Description section - mobile layout */}
        <div className="description flex items-start justify-center mt-2 gap-2">
          {/* Mobile poster - visible only on mobile */}
          <div className="lg:hidden w-60">
            <Skeleton className="w-full h-full rounded-xl" />
          </div>
          {/* Description text */}
          <div className="flex gap-2 mt-5 w-full">
            <Skeleton className="w-full h-16" />
          </div>
        </div>

        {/* Mobile ratings - visible only on mobile */}
        <div className="lg:hidden">
          <div className="flex gap-5 mt-1 justify-center">
            <div className="rating flex flex-col m-2 items-center">
              <h3><Skeleton className="w-28 h-5" /></h3>
              <div className="flex items-center gap-2 mt-1">
                <Skeleton className="w-28 h-20" />
              </div>
            </div>
            <div className="rateit flex flex-col m-2 items-center">
              <h3><Skeleton className="w-28 h-5" /></h3>
              <div className="flex items-center mt-1">
                <Skeleton className="w-28 h-20" />
              </div>
            </div>
          </div>
        </div>

        {/* Credits and watchlist section */}
        <div className="mt-2 flex flex-col lg:flex-row w-full justify-between items-center">
          <div className="w-full lg:w-[65%] gap-2 flex flex-col">
            <Skeleton className="border-t-[1px] w-full py-3" />
            <Skeleton className="border-t-[1px] w-full py-3" />
            <Skeleton className="border-t-[1px] w-full py-3" />
          </div>
          <Skeleton className="mt-4 watchlistadd flex items-center gap-4 text-black h-[60px] p-3 w-[300px] justify-start leading-5 rounded-full" />
        </div>
      </div>

      {/* Cast section */}
      <div className=" dark:bg-[#141414] flex flex-col w-full px-5 lg:px-11 border-t-[2px]">
        <div className="flex w-full py-6 gap-2 items-center justify-start">
          <Skeleton className="text-[20px] lg:text-[30px] font-medium w-32 h-8" />
          <p className="text-[15px] mt-1 font-light"></p>
        </div>

        {/* Cast grid - responsive: horizontal scroll on mobile, grid on desktop */}
        <div className="flex flex-row lg:grid lg:grid-cols-3 gap-4 overflow-x-auto hide-scrollbar mb-8">
          {/* Generate 9 cast member skeletons */}
          {Array.from({ length: 9 }, (_, index) => (
            <div key={index} className="min-w-[300px] lg:w-[300px] h-[120px] flex justify-start items-center gap-3">
              <Skeleton className="rounded-full h-[110px] w-[110px] flex items-center justify-center object-cover" />
              <div>
                <Skeleton className="font-semibold w-28 h-6" />
                <Skeleton className="font-semibold w-28 h-6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}

export default SkelitonSinglePage