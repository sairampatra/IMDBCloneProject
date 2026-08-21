import { axiosInstance } from '../utils/axiosInstance';
import { normalizeSingleMovie } from '../utils/adapters';

export async function fetchWatchlistData(imdbId) {
    if (!imdbId) return null;
    let response = await axiosInstance.get(`/?apikey=trilogy&i=${encodeURIComponent(imdbId)}&plot=full`);
    return normalizeSingleMovie(response.data);
}