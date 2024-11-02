import React from 'react'
import Skeleton from 'react-loading-skeleton'

function SkelitonSinglePage() {
  return (
    <div className="mt-[64px]  ">
        <div className={` px-11   pb-8 `}>
          <div className="  flex justify-between  ">
            <div>
              <h1 className="text-[50px] w-80"> <Skeleton/> </h1>
              {/* <p className="text-[18px]">Original title: Dar emtedad shab</p> */}
              <ul className="flex gap-3 ">
                <li><Skeleton className=" w-11"/></li>
                <li className="border-l-2 px-3">
                <Skeleton className=" w-16"/>
                </li>
              </ul>
            </div>
            <div className=" flex gap-5 ">
              <div className="rating flex flex-col m-2 items-center">
                <h3><Skeleton className=" w-28 h-5"/></h3>
                <div className="flex items-center gap-2 mt-1">
                <Skeleton className=" w-28 h-20"/>
                 
                </div>
              </div>
              <div className="rateit flex flex-col m-2 items-center">
                <h3><Skeleton className=" w-28 h-5"/></h3>
                <div className="flex items-center  mt-1">
                <Skeleton className=" w-28 h-20"/>
                </div>
              </div>
            </div>
          </div>
          <div className="   mt-2  gap-1  grid  w-full grid-cols-[1.2fr,3fr,1fr]   ">
            <div className="poster  ">
            <Skeleton className=" w-full h-full rounded-xl"/>
            </div>
            <div className="  trailerVideo w-full  h-[500px] ">
            <Skeleton className=" w-full h-full object-cover rounded-xl "/>
            </div>
            <div className="   flex flex-col justify-between gap-1 w-full  ">
            <Skeleton className="   rounded-xl   h-[240px] w-full justify-center items-center opacity-2 flex"/>

            <Skeleton className="   rounded-xl   h-[240px] w-full justify-center items-center opacity-2 flex"/>

            </div>
          </div>
          <div className="flex gap-2 mt-5 w-[300px] "></div>
          <div className="flex gap-2 mt-5 w-[700px] ">
          </div>
          <div className="mt-2 flex  w-ful justify-between ">
            <div className="w-[70%] gap-2 flex flex-col">
            <Skeleton className=" border-t-[1px]  w-full py-3"/>
            <Skeleton className=" border-t-[1px]  w-full py-3"/>

             
             
            </div>
            <Skeleton  className="watchlistadd flex mt-6 items-center gap-4  text-black h-[60px] p-3 w-[300px] justify-start leading-5 rounded-full"/>

           
          </div>
        </div>
        <div className={`flex flex-col w-full  px-11`}>
          <div className="flex  w-full py-6 gap-2 items-center relative justify-start">
            <Skeleton className="text-[30px] font-medium w-32 h-11-"/>
            
            <p className="text-[15px] mt-1 font-light"></p>
          </div>   


          <div className=" grid grid-cols-3 gap-4">

          <div class="w-[300px] h-[120px] flex justify-start items-center gap-3">
          <Skeleton className=" rounded-full h-[110px] w-[110px] flex items-center justify-center object-cover"/>
            
            
            <div>
            <Skeleton className="font-semibold w-28 h-6"/>
            <Skeleton className="font-semibold w-28 h-6"/>
          </div>
          </div><div class="w-[300px] h-[120px] flex justify-start items-center gap-3">
          <Skeleton className=" rounded-full h-[110px] w-[110px] flex items-center justify-center object-cover"/>
            
            
            <div>
            <Skeleton className="font-semibold w-28 h-6"/>
            <Skeleton className="font-semibold w-28 h-6"/>
          </div>
          </div><div class="w-[300px] h-[120px] flex justify-start items-center gap-3">
          <Skeleton className=" rounded-full h-[110px] w-[110px] flex items-center justify-center object-cover"/>
            
            
            <div>
            <Skeleton className="font-semibold w-28 h-6"/>
            <Skeleton className="font-semibold w-28 h-6"/>
          </div>
          </div><div class="w-[300px] h-[120px] flex justify-start items-center gap-3">
          <Skeleton className=" rounded-full h-[110px] w-[110px] flex items-center justify-center object-cover"/>
            
            
            <div>
            <Skeleton className="font-semibold w-28 h-6"/>
            <Skeleton className="font-semibold w-28 h-6"/>
          </div>
          </div><div class="w-[300px] h-[120px] flex justify-start items-center gap-3">
          <Skeleton className=" rounded-full h-[110px] w-[110px] flex items-center justify-center object-cover"/>
            
            
            <div>
            <Skeleton className="font-semibold w-28 h-6"/>
            <Skeleton className="font-semibold w-28 h-6"/>
          </div>
          </div><div class="w-[300px] h-[120px] flex justify-start items-center gap-3">
          <Skeleton className=" rounded-full h-[110px] w-[110px] flex items-center justify-center object-cover"/>
            
            
            <div>
            <Skeleton className="font-semibold w-28 h-6"/>
            <Skeleton className="font-semibold w-28 h-6"/>
          </div>
          </div><div class="w-[300px] h-[120px] flex justify-start items-center gap-3">
          <Skeleton className=" rounded-full h-[110px] w-[110px] flex items-center justify-center object-cover"/>
            
            
            <div>
            <Skeleton className="font-semibold w-28 h-6"/>
            <Skeleton className="font-semibold w-28 h-6"/>
          </div>
          </div><div class="w-[300px] h-[120px] flex justify-start items-center gap-3">
          <Skeleton className=" rounded-full h-[110px] w-[110px] flex items-center justify-center object-cover"/>
            
            
            <div>
            <Skeleton className="font-semibold w-28 h-6"/>
            <Skeleton className="font-semibold w-28 h-6"/>
          </div>
          </div><div class="w-[300px] h-[120px] flex justify-start items-center gap-3">
          <Skeleton className=" rounded-full h-[110px] w-[110px] flex items-center justify-center object-cover"/>
            
            
            <div>
            <Skeleton className="font-semibold w-28 h-6"/>
            <Skeleton className="font-semibold w-28 h-6"/>
          </div>
          </div>

          </div>


        </div>
      </div>
  )
}

export default SkelitonSinglePage