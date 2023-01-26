import NovelReaderPage from "./page/ReaderPage";
import {Route, Routes} from 'react-router-dom'
import MainPage from "./page/MainPage";
import NovelChapterPage from "./page/NovelChapterPage";
import SearchPage from "./page/SearchPage";
import {LoginPage} from "./page/LoginPage";
import PageFrame from "./page/PageFrame";


export default function App() {
    return (<>
        <Routes>
            <Route path={"/"} element={<PageFrame/>}>
                <Route path={"/"} element={<MainPage/>}/>
                <Route path={"/novel/detail"} element={<NovelChapterPage/>}/>
                <Route path={"/novel/search/:keyword"} element={<SearchPage/>}/>
                <Route path={"/novel/space"} element={<div style={{alignSelf: "center"}}>
                    <h1 style={{alignSelf: "center"}}>In development</h1>
                </div>}/>
            </Route>
            <Route path={"/novel/reader"} element={<NovelReaderPage/>}/>
            <Route path={"/login"} element={<LoginPage/>}/>
        </Routes>

    </>);
}
