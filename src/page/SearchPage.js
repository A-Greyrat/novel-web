import {useParams} from "react-router-dom";
import {useState} from "react";
import BookItem from "../component/BookItem";
import {ax} from "../global";
import {useDispatch, useSelector} from "react-redux";
import {setSearchResult} from "../redux/novelListsSlice";
import LoadPage from "./LoadPage";
import {message} from "antd";

async function getSearchResult(keyword) {
    return await ax.get("/api/novel/search?keyword=" + keyword)
        .then(response => response.data)
        .then(data => {
            if (data.code === 403) {
                message.error(data.message).then(() => {
                    document.cookie = "";
                    window.location.href = "/login";
                });
                return {};
            }
            return {novels: data.data, keyword: keyword};
        }).catch(error => {
            if (error.response.status === 400) {
                message.error("登录已过期，请重新登录").then(() => {
                    document.cookie = "";
                    window.location.href = "/login";
                });
            } else {
                message.error("未知错误: " + error.response.data.error);
            }
        });
}

export function SearchPage() {
    const dispatch = useDispatch();
    const searchResult = useSelector(state => state.novelLists.searchResult);
    const [isLoaded, setIsLoaded] = useState(false);

    const params = useParams();
    if (params.keyword !== searchResult.keyword) {
        getSearchResult(params.keyword).then(data => {
            dispatch(setSearchResult(data));
            setIsLoaded(true);
        });
    }

    if (!isLoaded) {
        return <LoadPage loading={isLoaded} color="pink"/>
    }

    return (<>
        <p style={{
            fontSize: "calc(0.2vw + 25px)",
            fontWeight: "bold",
            color: "black",
            marginLeft: "7.5vw",
            marginTop: "3vh",
            marginBottom: "0"
        }}>
            共找到{searchResult.novels.length}条 与“{searchResult.keyword}”相关结果
        </p>
        <div className="page-container" style={{
            display: "flex",
            width: "100%",
            height: "auto",
            flexWrap: "wrap",
            alignSelf: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "2vh 0",
            flex: "1",
        }}>
            {searchResult.novels.map((item, index) => {
                return (<BookItem key={index} id={item.id} name={item.title}
                                  describe={item.description}
                                  author={item.author} tags={item.tags} chapterList={item.chapterLists}/>);
            })}
        </div>
    </>);
}


export default SearchPage;