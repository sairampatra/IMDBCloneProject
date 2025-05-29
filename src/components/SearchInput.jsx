import useStore from "../store";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { fetchSearchData } from "../hooks/fetchSearchData";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";

function SearchInput() {
      let { 
            data: bhalu,

        setData,
        setSuggestionsList,
         suggestionsQuery,
    setInputDisplay,
    inputDisplay,
    setDisplaySuggestions,
    displaySuggestions,
    suggestions,
    theme
  } = useStore();
      const navigate = useNavigate();
        let debounce = useDebounce(bhalu, 1000);
        let debounce2 = useDebounce(suggestionsQuery, 1000);
 let { isLoading, data, isError, error } = useQuery({
    queryKey: ["searchProduct", debounce, debounce2],
    queryFn: () => fetchSearchData(debounce),  
    cacheTime: 1000 * 60 * 30, // Data stays cached for 30 minutes
    staleTime: 1000 * 60 * 10, // Data remains fresh for 10 minutes
    refetchOnWindowFocus: false, // Prevent refetching when switching tabs

  });
  
  
  function displayChange() {
    setInputDisplay("block");
    navigate("/search");
  }
let handleChange = (e) => {
    setData(e.target.value);
    setSuggestionsList(e.target.value);
  };
   let onBlurInput = () => {
      setDisplaySuggestions("hidden");
    };
    let onFocusInput = () => {
      setDisplaySuggestions("block");
    };
//     if (isLoading) {
//     setDisplaySuggestions("hidden");
//   }
  return (
     <div className="bg-[#F1E9EA] dark:bg-[#303030] flex flex-col  p-[7px]  rounded-xl gap-2 items-center relative ">
          <div className="bg-[#F1E9EA] dark:bg-[#303030] flex items-center justify-between">
            <input
              className={`w-40 px-2 text-black placeholder-[#8B5B5D] dark:text-white  lg:w-full h-[25px] bg-transparent  outline-0 ${inputDisplay}`}
              type="text"
              onChange={handleChange}
              value={suggestionsQuery}
              onBlur={onBlurInput}
              onFocus={onFocusInput}
            />
            <IoIosSearch size={20} onClick={displayChange} color={`${theme == 'dark' ? "#ABABAB" : "#8B5B5D" } `} />
          </div>
          {inputDisplay == "block" && suggestionsQuery != "" > 0 ? (
            <div
              className={`${suggestions} ${displaySuggestions} mt-2 p-2 px-3 absolute top-full left-0 w-full bg-[#F1E9EA] dark:bg-[#303030] dark:text-white  border-gray-300 rounded-xl  z-10  ${isLoading?'hidden':'block'}`}
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
  )
}

export default SearchInput