import axios from "../../utils/Axios";
export { removePerson } from "../reducers/peopleSlice";
import { loadPerson } from "../reducers/peopleSlice";

export const asyncLoadPerson = (id) => async (dispatch) => {
  try {
    const details = await axios.get(`/person/${id}`);
    const externalid = await axios.get(`/person/${id}/external_ids`);
    const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
    const movieCredits = await axios.get(`/person/${id}/movie_credits`);
    const tvCredits = await axios.get(`/person/${id}/tv_credits`);

    let theUltimateData = {
      details: details.data,
      externalids: externalid.data,
      combinedCredits: combinedCredits.data,
      movieCredits: movieCredits.data,
      tvCredits: tvCredits.data,
    };
    
      dispatch(loadPerson(theUltimateData));
      
  } catch (error) {
    console.log("Error: ", error);
  }
};
