import {createSlice} from "@reduxjs/toolkit";

function setProp(state, prop) {
    const newState = {...state, ...prop};
    localStorage.setItem("novelReader", JSON.stringify(newState));
    return newState;
}

export const NovelReaderSlice = createSlice({
    name: "novelReader",
    initialState: localStorage.getItem("novelReader") ? JSON.parse(localStorage.getItem("novelReader")) : {
        fontSize: "20px",
        lineHeight: "1.5",
        letterSpacing: "0.1em",
        wordSpacing: "0px",
        titleSize: "30px",
        textIndent: "0em",
        textSpacing: "1em",
        margin: "10%",
        fontColor: "black",
        backgroundColor: "white",
        nowReadChapter: null,
        shouldUpdate: true,
    }, reducers: {
        setFontSize: (state, action) => setProp(state, {fontSize: action.payload}),
        setLineHeight: (state, action) => setProp(state, {lineHeight: action.payload}),
        setLetterSpacing: (state, action) => setProp(state, {letterSpacing: action.payload}),
        setWordSpacing: (state, action) => setProp(state, {wordSpacing: action.payload}),
        setTitleSize: (state, action) => setProp(state, {titleSize: action.payload}),
        setTextIndent: (state, action) => setProp(state, {textIndent: action.payload}),
        setTextSpacing: (state, action) => setProp(state, {textSpacing: action.payload}),
        setMargin: (state, action) => setProp(state, {margin: action.payload}),
        setFontColor: (state, action) => setProp(state, {fontColor: action.payload}),
        setBackgroundColor: (state, action) => setProp(state, {backgroundColor: action.payload}),
        setNowReadChapter: (state, action) => ({...state, nowReadChapter: action.payload}),
        setShouldUpdate: (state, action) => ({...state, shouldUpdate: action.payload}),
    }
});

export const {
    setFontSize,
    setLineHeight,
    setLetterSpacing,
    setWordSpacing,
    setTitleSize,
    setTextIndent,
    setTextSpacing,
    setMargin,
    setFontColor,
    setBackgroundColor,
    setNowReadChapter,
    setShouldUpdate,
} = NovelReaderSlice.actions;