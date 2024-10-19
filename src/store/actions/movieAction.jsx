import axios from "../../utils/Axios";
export { removeMovie } from "../reducers/movieSlice";
import { loadMovie } from "../reducers/movieSlice";

export const asyncLoadMovie = (id) => async (dispatch) => {
  try {
    const details = await axios.get(`/movie/${id}`);
    const externalid = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const watchProviders = await axios.get(`/movie/${id}/watch/providers`);

    let theUltimateData = {
      details: details.data,
      externalids: externalid.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      watchProviders: watchProviders.data.results.IN,
      };
      
      dispatch(loadMovie(theUltimateData));
      
  } catch (error) {
    console.log("Error: ", error);
  }
};
