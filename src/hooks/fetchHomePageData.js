import { axiosInstance } from '../utils/axiosInstance';
import { MOVIES_LIST } from "../constants/MOVIES_LIST";
import { normalizeMovieCard } from '../utils/adapters';

async function fetchHomePageData() {
    let movieKeywords = MOVIES_LIST.filter(word => word.length > 4);
    let pick = Math.floor(Math.random() * movieKeywords.length);
    let keyword = movieKeywords[pick] || "Batman";

    let response = await axiosInstance.get(`/?apikey=trilogy&s=${encodeURIComponent(keyword)}`);
    
    if (!response.data || response.data.Response === "False" || !response.data.Search) {
        response = await axiosInstance.get(`/?apikey=trilogy&s=Batman`);
    }

    let description = (response.data.Search || []).map((item, id) => normalizeMovieCard(item, id + 1));
    return { description };
}

export default fetchHomePageData;
