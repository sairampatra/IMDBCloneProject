import { axiosInstance } from "../utils/axiosInstance"; 

export async function fetchTrailerVideo(imdbId) {
  try {
    // Set the responseType to 'blob' to handle binary data
    const response = await axiosInstance.get(`/media/${imdbId}`, {
      responseType: 'blob',
    });

    const videoUrl = URL.createObjectURL(response.data);
console.log(videoUrl)
    return videoUrl;
  } catch (error) {
    console.error('Error fetching the trailer video:', error);
    throw error; // You can handle this error in your component
  }
}