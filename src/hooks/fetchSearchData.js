import { axiosInstance } from '../utils/axiosInstance';

export async function fetchSearchData(data) {
    let response = await axiosInstance.get(`/search?q=${data}`)
    // console.log(response.data.description)
    return response.data.description
}