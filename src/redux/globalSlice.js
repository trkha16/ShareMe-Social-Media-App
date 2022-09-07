import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
    name: "global",
    initialState: {
        darkMode: localStorage.getItem("dark-mode-enabled"),
    },
    reducers: {
        toggleDarkMode: (state, { payload }) => {
            return {
                darkMode: !payload,
            };
        },
    },
});
export const { toggleDarkMode } = globalSlice.actions;
export default globalSlice.reducer;
