// import React from 'react'
import { axiosInstance } from '../utils/axiosInstance';
import { MOVIES_LIST } from "../constants/MOVIES_LIST";

async function fetchHomePageData() {
    let movieWords = MOVIES_LIST

    let pick = Math.floor(Math.random() * movieWords.length)
    try {
        let response = await axiosInstance.get(`/search?q=${movieWords[pick]}`)
        //    console.log(response)
        return response.data
    } catch (error) {
        console.log(error)
        throw error; // Propagate the error for React Query to handle

    }
}

export default fetchHomePageData
