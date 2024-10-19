import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMWE4Mjc0ODM4YzJmZWFmYjcxN2RhM2Q5NTA3YjA0NyIsIm5iZiI6MTcyOTA0NDgzMC40MzM5NzEsInN1YiI6IjY3MDhhMmE3MjY1YTVmOGJjNTcwN2M5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M8mAcmiWuEzjzAXbO0NSqO4xANcq5rshS10J-Bfs6bA",
  },
});

export default axiosInstance;
