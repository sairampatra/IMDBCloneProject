import { useEffect, useState } from "react";
import { MdOutlineWatchLater } from "react-icons/md";
import { Link } from "react-router-dom";
import useStore from "../store";

import { useLocation } from "react-router-dom";
import SearchInput from "../components/SearchInput";
import Theme from "./Theme";

function Navbar() {
  

  
  let {
   theme,
   SkeletonTheme,
    watchList,
    setInputDisplay,
   
    setSuggestions,
  } = useStore();
  
  

 
  const location = useLocation(); // This gives you the current page details
  // console.log(location);

  useEffect(() => {
    if (location.pathname == "/") {
      setInputDisplay("hidden");
    } else if (location.pathname == "/watchList") {
      setInputDisplay("hidden");
    } else if (location.pathname == "/singleMovie/:movieId") {
      setInputDisplay("hidden");
      setSuggestions("hidden");
    } else {
      setSuggestions("block");
    }
  }, [location.pathname]);
  
  return (
    <div className={`${theme}`}>
 <div className="navbar  h-12 fixed top-0  w-full z-40 dark:bg-[#141414] dark:text-white bg-[#FBF9F9] border-[#F1E9EA] dark:border-[#ABABAB] border-b-2 dark:border-b-[1px]">
      <div className="flex-1  ">
        <Link to="/" className="btn btn-ghost text-xl">
          Filmy
        </Link>
       <Theme/>
      </div>
      <div className="flex-none  ">
       <SearchInput />
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <Link to="/watchList">
                <MdOutlineWatchLater size={20} />
              </Link>

              <span className="badge badge-xs indicator-item bg-[#f3e7e8] dark:bg-[#141414] dark:border-[#ABABAB] dark:text-[#ABABAB] border-[#8B5B5D] px-[5px] py-[2px] text-[#8B5B5D]">
                {watchList?.length > 99 ? "99+" : watchList?.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
   
  );
}

export default Navbar;
