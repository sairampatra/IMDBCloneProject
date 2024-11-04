import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";


const useStore = create(
  persist(
    (set) => ({
      data: '',
      setData: (newData) => set({ data: newData }),
      suggestionsQuery: "",
      setSuggestionsList: (newData) => set({ suggestionsQuery: newData }),
      watchList: [],
      updateWatchList: (newWatchlist) => set({ watchList: newWatchlist }),

      setWatchList: (item) =>
        set((state) => ({
          watchList: [...state.watchList, item],
        })),

      tempWatchlist: [],
      setTempWatchList: (item) =>
        set(() => ({
          tempWatchlist: [item],
        })),

      handleTempWatchlist: () =>
        set((state) => {
          const isAlreadyInWatchlist = state.tempWatchlist.some((tempMovie) =>
            state.watchList.some((movie) => movie["#IMDB_ID"] === tempMovie["#IMDB_ID"])
          );

          if (isAlreadyInWatchlist) {
            toast("This Movie is already in the watchlist");
            return {};
          } else {
            return {
              watchList: [...state.watchList, ...state.tempWatchlist],
              // tempWatchlist: [] // Clear tempWatchlist after adding
            };
          }
        })
    }),
    {
      name: "watchlist-storage", // Unique key in localStorage
      getStorage: () => localStorage, // Use localStorage
      partialize: (state) => ({ watchList: state.watchList }), // Persist only watchList
    }
  )
);

export default useStore;
