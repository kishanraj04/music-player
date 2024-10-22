import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from './favoritesSlice'; 

const store = configureStore({
    reducer: {
        favorite: favoriteReducer
    },
});

export default store;
