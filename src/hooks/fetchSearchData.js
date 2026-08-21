import { axiosInstance } from '../utils/axiosInstance';
import { normalizeMovieCard } from '../utils/adapters';

export async function fetchSearchData(data) {
    if (!data) return [];
    let response = await axiosInstance.get(`/?apikey=trilogy&s=${encodeURIComponent(data)}`);
    return (response.data.Search || []).map((item, id) => normalizeMovieCard(item, id + 1));
}