import axios from "axios"

const API_URL = "https://ghibliapi.vercel.app/films"

export const getFilms = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching films:", error);
    throw error;
  }
}