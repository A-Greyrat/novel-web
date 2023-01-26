import {Link, useLocation} from "react-router-dom";
import "./NovelChapterPage.css";
import {useEffect} from "react";
import {domain} from "../global";
import {useDispatch} from "react-redux";
import {setNowReadChapter, setShouldUpdate} from "../redux/novelReaderSlice";

function NovelChapterPageCatalog({chapterList, id}) {
    const dispatch = useDispatch();
    return (<div className="novel-chapter-page-catalog" style={{
        margin: "0 20px"
    }}>
        {chapterList.map((item, index) => {
            return (<div className="novel-chapter-page-catalog-item" key={index} style={{
                display: "grid", grid: "auto / 100% 1fr", width: "100%", height: "auto", padding: "1vh 0",
            }}>
                <div className="novel-chapter-page-catalog-item-title" style={{
                    alignItems: "center", fontSize: "20px", fontWeight: "bold", color: "#000000",
                }}>
                    {item.title}

                    <div className="novel-chapter-page-catalog-item-sub" style={{
                        fontSize: "15px", fontWeight: "normal", color: "#000000",
                    }}>
                        {item.chapters.map((chapter, i) => {
                            return (<Link to="/novel/reader"
                                          state={{
                                              chapterListIndex: index,
                                              chapterIndex: i,
                                              chapterListName: item.title,
                                              chapterName: chapter.title,
                                              id: id,
                                              title: chapter.title,
                                          }}
                                          key={i} className="novel-chapter-page-catalog-item-sub-item-link"
                                          style={{
                                              textDecoration: "none", color: "#000000",
                                          }}>
                                <div className="novel-chapter-page-catalog-item-sub-item"
                                     style={{
                                         width: "100%", height: "auto", borderBottom: "1px solid #000",
                                     }} onClick={() => {
                                    dispatch(setNowReadChapter({
                                        chapterListIndex: index,
                                        chapterIndex: i,
                                        chapterListName: item.title,
                                        chapterName: chapter.title,
                                        id: id,
                                        title: chapter.title,
                                        chapterList: chapterList,
                                    }));

                                    dispatch(setShouldUpdate(true));
                                }}>
                                    {chapter.title}
                                </div>
                            </Link>);
                        })}
                    </div>
                </div>

            </div>);
        })}
    </div>);
}

export default function NovelChapterPage() {
    const params = useLocation().state;
    useEffect(() => {
        window.scrollTo(0, 0);
        window.addEventListener("scroll", () => {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            let b = document.querySelector(".novel-chapter-page-back-button");
            if (b === undefined || b === null) return;

            if (scrollTop < 200 || scrollTop > document.body.scrollHeight - document.documentElement.clientHeight - 200) {
                b.style.opacity = 1;
                b.style.transform = "scale(1)";
            } else {
                b.style.opacity = 0;
                b.style.transform = "scale(0)";
            }
        });
    });

    return (<div style={{
        display: "flex",
        flexDirection: "column",
        height: "auto",
        alignSelf: "center",
        width: "auto",
        maxWidth: "85%",
        padding: "0 5vw",
        flex: 1,
    }}>
        <div className="novel-chapter-page-back-button" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            borderRadius: "50%",
            boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
            zIndex: 1,
            right: "3vw",
            bottom: "5vh",
            transition: "all 0.5s",
        }} onClick={() => {
            window.history.back();
        }}>
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="50" height="50     ">
                <path
                    d="M608 736c-6.4 0-19.2 0-25.6-6.4l-192-192C384 524.8 384 499.2 390.4 486.4l192-192c12.8-12.8 32-12.8 44.8 0s12.8 32 0 44.8L460.8 512l166.4 166.4c12.8 12.8 12.8 32 0 44.8C627.2 736 614.4 736 608 736z"
                    fill="#272636" p-id="2775"></path>
            </svg>
        </div>
        <div className="novel-chapter-page-info-container" style={{
            display: "flex",
            marginTop: "30px",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "auto",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            padding: "10px",
            borderRadius: "10px",
            alignSelf: "center",
        }}>
            <img style={{
                width: "calc(2vw + 120px)",
                height: "calc((2vw + 120px) * 1.5)",
                borderRadius: "10px",
                boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
            }} src={domain + "/api/novel/cover?id=" + params.id} alt=""/>

            <div className="novel-chapter-page-info" style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                marginLeft: "calc(2vw + 20px)",
                height: "100%",
                maxHeight: "100%",
            }}>
                <h1 style={{
                    fontSize: "calc(0.3vw + 24px)", margin: "0", padding: "0",
                }}>{params.name}</h1>
                <h2 style={{
                    fontSize: "calc(0.1vw + 12px)", margin: "0", padding: "0",
                }}>作者:{params.author}</h2>

                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    maxHeight: "calc((1vh + 18px) * 2)",
                    overflow: "hidden",
                    marginTop: "3px",
                }}>
                    {params.tags.map((tag, index) => {
                        return (<p key={index} className="book-item-tag" style={{
                            border: "1px solid #777",
                            borderRadius: "6px",
                            padding: "0 5px",
                            fontSize: "10px",
                            margin: "0.5vh 0.2vw 0.5vh 0",
                            whiteSpace: "nowrap",
                        }}>
                            {tag}
                        </p>);
                    })}
                </div>

                <p className="novel-chapter-page-up-describe" style={{
                    margin: "3px 0",
                    fontSize: "calc(0.2vw + 12px)",
                    WebkitLineClamp: 6,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}>
                    {params.describe}
                </p>
            </div>

        </div>


        <div className="novel-chapter-page-down-describe" style={{
            width: "100%",
            alignSelf: "center",
            height: "auto",
            marginTop: "3vh",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            padding: "10px",
            borderRadius: "10px",
            color: "black",
        }}>
            <p className="novel-chapter-page-down-describe-content" style={{
                margin: "10px 10px 10px 10px", fontSize: "calc(0.2vw + 15px)", fontWeight: "bold", textIndent: "2em",
            }}>
                {params.describe}
            </p>
        </div>

        <div className="novel-chapter-page-chapter-list" style={{
            width: "100%",
            alignSelf: "center",
            height: "auto",
            margin: "3vh 0",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "10px",
            color: "black",
            padding: "10px",
        }}>
            <h1 style={{
                fontSize: "calc(0.3vw + 24px)", marginLeft: "20px",
            }}>目录</h1>
            <NovelChapterPageCatalog chapterList={params.chapterList} id={params.id}/>
        </div>
    </div>);

}