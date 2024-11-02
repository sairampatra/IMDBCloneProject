import { axiosInstance } from '../utils/axiosInstance';
export async function fetchWatchlistData(imdbId) {
    let response = await axiosInstance.get(`/search?tt=${imdbId}`)
    // console.log(response.data)
    // console.log('sai')
    return response.data
}