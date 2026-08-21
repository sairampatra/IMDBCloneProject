import { axiosInstance } from "../utils/axiosInstance";

export async function fetchTrailerVideo(imdbId) {
  try {
    const response = await axiosInstance.get(`/?apikey=trilogy&i=${encodeURIComponent(imdbId)}`, {
      responseType: 'blob',
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Error fetching trailer video:', error);
    throw error;
  }
}