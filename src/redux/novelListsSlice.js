import {createSlice} from "@reduxjs/toolkit";

export const novelListsSlice = createSlice({
    name: "novelLists",
    initialState: {
        searchResult: {
            novels: [],
            keyword: "",
        },
        randomNovels: [],
    },
    reducers: {
        setSearchResult: (state, action) => ({...state, searchResult: action.payload}),
        setRandomNovels: (state, action) => ({...state, randomNovels: action.payload}),
    }
});

export const {
    setSearchResult,
    setRandomNovels,
} = novelListsSlice.actions;

