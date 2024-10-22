import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favoritesArray: [],
};

const favoriteSlice = createSlice({
    name: 'favorites',
    initialState, 
    reducers: {
        addFavorites: (state, action) => {
            state.favoritesArray.push(action.payload);
        },
        removeFavorites: (state, action) => {
            console.log(action.payload);
            const existingIndex = state.favoritesArray.findIndex(item => item.id === action.payload.id);
            if (existingIndex !== -1) {
                state.favoritesArray.splice(existingIndex, 1);
            }
        },
        setStatus: (state, action) => {
            // Define what setStatus should do
            // Example: state.status = action.payload;
        },
    }
});

export const { addFavorites, removeFavorites, setStatus } = favoriteSlice.actions;
export default favoriteSlice.reducer;
