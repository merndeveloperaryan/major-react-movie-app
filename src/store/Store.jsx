import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reducers/movieSlice";
import tvReducer from "./reducers/tvSlice";
import personReducer from "./reducers/peopleSlice";

export const Store = configureStore({
  reducer: {
    movie: movieReducer,
    tv: tvReducer,
    person: personReducer,
  },
});


// O khuda likha hai kya nasseebo me mere 