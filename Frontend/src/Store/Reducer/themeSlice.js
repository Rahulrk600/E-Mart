import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: localStorage.getItem('theme') || 'light'
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers:{
        toggleTheme:(state)=>{
            const newTheme = state.theme === 'light' ? 'dark' : 'light';
            state.theme = newTheme;
            localStorage.setItem('theme', newTheme);
            document.documentElement.className = newTheme;
        },
    },
});

export const {toggleTheme} =themeSlice.actions;
export default themeSlice.reducer;