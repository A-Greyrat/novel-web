import {configureStore} from "@reduxjs/toolkit";
import {NovelReaderSlice} from "./novelReaderSlice";
import {novelListsSlice} from "./novelListsSlice";

export const rootStore = configureStore({
    reducer: {
        novelReader: NovelReaderSlice.reducer,
        novelLists: novelListsSlice.reducer,
    }
});

export default rootStore;