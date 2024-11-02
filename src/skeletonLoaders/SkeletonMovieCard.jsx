import React from 'react'
import Skeleton from 'react-loading-skeleton'

function SkeletonMovieCard() {
  return (
    <div className={` flex flex-col items-center rounded-xl `}>
    <div
      className="rounded-t-xl  h-[360px] w-full object-cover	"
      src={""}
      alt=""><Skeleton className='rounded-t-xl  h-[360px] w-full object-cover'/></div>

<div className="  w-full flex flex-col p-4 gap-[7px]">
          <div className='w-32' >
          <Skeleton className=" flex items-center gap-2 text-[20px]"/>
            {/* <p>Rank: </p> */}
          </div>
          
           
            <h1 className="text-[25px] truncate "></h1>
          
            
          <button className=" text-[20px] rounded-md  border-darkgray-500  w-full ">
          <Skeleton className='h-[30px] w-full'/>
            {/* Watch now */}
          </button> 
          <div className="flex gap-2 flex-col">
            <button
              
              className=" rounded-lg p-1 w-[170px]"
            >
          <Skeleton className='h-[30px] w-full'/>
          </button>
           
            
              <button
                className=" rounded-lg p-1 w-[170px]"
                
              >
          <Skeleton className='h-[30px] w-full'/>
          </button>
           
          </div>
          
        </div>
  </div>
  )
}

export default SkeletonMovieCard