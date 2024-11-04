import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineWatchLater } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useStore from "../store";
import { useDebounce } from "@uidotdev/usehooks";
import { fetchSearchData } from "../hooks/fetchSearchData";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { FaMoon ,FaSun} from "react-icons/fa";
import { useThemeState } from "../states/themeState";

function Navbar() {
  
  const navigate = useNavigate();
  let { darkMode ,toggleTheme }=useThemeState()

  function displayChange() {
    setdisplay("block");
    navigate("/search");
  }
  let {
    setData,
    data: bhalu,
    suggestionsQuery,
    setSuggestionsList,
    watchList,
  } = useStore();
  let handleChange = (e) => {
    setData(e.target.value);
    setSuggestionsList(e.target.value);
  };
  let [display, setdisplay] = useState("hidden");
  let debounce = useDebounce(bhalu, 1000);
  let debounce2 = useDebounce(suggestionsQuery, 1000);

  let { isLoading, data, isError, error } = useQuery({
    queryKey: ["searchProduct", debounce, debounce2],
    queryFn: () => fetchSearchData(debounce),
  });
  let [DisplaySuggestions, setDisplaySuggestions] = useState("block");

  let onBlurInput = () => {
    setDisplaySuggestions("hidden");
  };
  let onFocusInput = () => {
    setDisplaySuggestions("block");
  };
  const location = useLocation(); // This gives you the current page details
  // console.log(location);
  let [suggestions, setsuggestions] = useState("block");

  useEffect(() => {
    if (location.pathname == "/") {
      setdisplay("hidden");
    } else if (location.pathname == "/watchList") {
      setdisplay("hidden");
    } else if (location.pathname == "/singleMovie/:movieId") {
      setdisplay("hidden");
      setsuggestions("hidden");
    } else {
      setsuggestions("block");
    }
  }, [location.pathname]);
  if (isLoading) {
    return <div>nav loading </div>;
  }
  return (
    <div className="navbar bg-[#E2B616] h-12 fixed top-0  w-full z-40">
      <div className="flex-1  ">
        <Link to="/" className="btn btn-ghost text-xl">
          {" "}
          IMDB
        </Link>
        <button 
        onClick={toggleTheme}
        className="hover:rounded-full p-3 hover:bg-yellow-100"> 
        {
          !darkMode  ?  <FaMoon color="#A6ADBB"/> : <FaSun color="#A6ADBB"/>
        }
       
        
           </button>
      </div>
      <div className="flex-none  ">
        {/* fixed bg-yellow-100 p-2 rounded-lg left-[1035px] z-10 */}
        <div className="bg-white flex border-2 flex-col border-gray-300 p-1  rounded-xl gap-2 items-center relative">
          <div className="bg-white flex ">
            <input
              className={`px-2  w-full h-[25px] bg-transparent  outline-0 ${display}`}
              type="text"
              onChange={handleChange}
              value={suggestionsQuery}
              onBlur={onBlurInput}
              onFocus={onFocusInput}
            />
            <IoIosSearch size={25} onClick={displayChange} />
          </div>
          {display == "block" && suggestionsQuery != "" > 0 ? (
            <div
              className={`${suggestions} ${DisplaySuggestions} p-2 px-3 absolute top-full left-0 w-full bg-white border border-gray-300 rounded-b-xl  z-10`}
            >
              {data?.map((movie, id) => {
                return (
                  <div key={id} className="">
                    {movie["#TITLE"]}
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <Link to="/watchList">
                <MdOutlineWatchLater size={25} />
              </Link>

              <span className="badge badge-xs indicator-item">
                {watchList?.length > 99 ? "99+" : watchList?.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
