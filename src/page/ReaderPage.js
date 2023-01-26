import React, {useEffect, useState} from 'react';
import LoadPage from "./LoadPage";
import './ReaderPage.css';
import {Image, message, Modal, Slider} from "antd";
import {HexColorPicker} from "react-colorful";
import {ax, nullPic} from "../global";
import PageFooter from "../component/PageFooter";
import {useDispatch, useSelector} from "react-redux";
import {
    setBackgroundColor,
    setFontColor,
    setFontSize,
    setLetterSpacing,
    setLineHeight,
    setMargin,
    setNowReadChapter,
    setShouldUpdate,
    setTextIndent,
    setTextSpacing,
    setTitleSize,
    setWordSpacing
} from "../redux/novelReaderSlice";


export function NovelReader() {
    const setting = useSelector(state => state.novelReader);
    const dispatch = useDispatch();
    const [chapterInfo, setChapterInfo] = useState({
        title: "",
        text: [],
        image: [],
    });
    useEffect(() => {
        if (setting.nowReadChapter && setting.shouldUpdate) {
            getChapterInfo(setting.nowReadChapter).then((data) => {
                data.title = setting.nowReadChapter.chapterName;
                setChapterInfo(data);
                dispatch(setShouldUpdate(false));
            });
        }
    });

    if (setting.nowReadChapter === null || setting.nowReadChapter === undefined) {
        return (<div style={{
            color: setting.fontColor,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "3vw",
        }}>
            数据错误
        </div>);
    }

    return (<div className="novel-reader" style={{
        color: setting.fontColor,
        fontFamily: setting.fontFamily + ", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
        lineHeight: setting.lineHeight,
        letterSpacing: setting.letterSpacing,
        wordSpacing: setting.wordSpacing,
        textAlign: setting.textAlign,
        whiteSpace: "pre-wrap",
        marginLeft: setting.margin,
        marginRight: setting.margin,
    }}>

        <p style={{
            fontSize: setting.titleSize, textAlign: "left", margin: "5px auto", fontWeight: "bold",
        }}>{chapterInfo.title}</p>

        <div className="novel-reader-divider" style={{
            width: "100%", height: "1px", backgroundColor: setting.fontColor, margin: "0 0 0 0",
        }}></div>
        <Image.PreviewGroup>
            {chapterInfo.text.map((line, index) => {
                if (line.startsWith("!{ImageUrl}")) {
                    line = line.replace("!{ImageUrl}", "");
                    return (<div style={{maxWidth: "800px", alignSelf: "center", margin: "0 auto"}} key={index}>
                        <Image src={chapterInfo.image[line]} fallback={nullPic} width="100%" placeholder={true}/>
                    </div>);
                }
                return <p style={{
                    fontSize: setting.fontSize,
                    textIndent: setting.textIndent,
                    marginTop: setting.textSpacing,
                    marginBottom: 0,
                }} key={index}>{line}</p>
            })}
        </Image.PreviewGroup>

    </div>);
}

function SideButton({content, onClick}) {
    return (<div className="novel-reader-page-side-button" style={{
        borderRadius: "50%",
        backgroundColor: "transparent",
        width: "calc(1vw + 30px)",
        height: "calc(1vw + 30px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "6px 0",
        cursor: "pointer",
    }} onClick={onClick}>
        {content}
    </div>);
}

async function getChapterInfo({id, chapterListIndex, chapterListName, chapterIndex, chapterName}) {
    const url = "/api/novel/detail?id=" + id + "&chapter=" + chapterListIndex + chapterListName + "&page=" + chapterIndex + chapterName;
    const res = await ax.get(url).catch((err) => {
        if (err.response.status === 400) {
            message.error("非法请求").then(() => {
                window.location.href = "/login";
            });
            return "400";
        }
        if (err.response.status === 404) {
            message.error("章节不存在").then(() => {
                window.history.back()
            });
            return "404";
        }

        message.error("未知错误").then(() => {
            window.history.back()
        });
        return "500";
    });

    const obj = res.data;

    const image = [];
    for (let i = 0; i < obj.text.length; i++) {
        if (obj.text[i].startsWith("!{ImageUrl}")) {
            const imageIndex = parseInt(obj.text[i].substring(11));
            const url = "/api/novel/illustration?id=" + id + "&chapter=" + chapterListIndex + chapterListName + "&page=" + chapterIndex + chapterName + "&pid=" + imageIndex;
            await ax.get(url, {
                responseType: "arraybuffer",
            }).then((res) => {
                image[imageIndex] = URL.createObjectURL(new Blob([res.data], {type: "image/jpeg"}));
            }).catch(() => {
                image[imageIndex] = nullPic;
            });
        }
    }
    obj.image = image;
    return obj;
}


export function NovelReaderPage() {
    const [settingVisible, setSettingVisible] = useState(false);
    const settingValue = useSelector((state) => state.novelReader);
    const dispatch = useDispatch();
    useEffect(() => {
        window.addEventListener("scroll", () => {
            let b = document.querySelector(".novel-reader-page-side-button-group");
            if (b === undefined || b === null) return;
            if (window.scrollY < 200 || window.scrollY > document.body.scrollHeight - window.innerHeight - 200) {
                b.style.opacity = "1";
                b.style.right = "1.25vw";
            } else {
                b.style.opacity = "0";
                b.style.right = "-50px";
            }
        });

    });

    return (<div style={{
        backgroundColor: settingValue.backgroundColor,
        flexDirection: "column",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "space-between",
        userSelect: "none", WebkitUserSelect: "none", MozUserSelect: "none", msUserSelect: "none",
    }}>
        <LoadPage isLoaded={!settingValue.shouldUpdate || settingValue.nowReadChapter === null} color="pink"/>

        <Modal title="设置"
               centered={true}
               closable={true}
               open={settingVisible}
               mask={false}
               onOk={() => {
                   setSettingVisible(false);
               }}
               onCancel={() => {
                   setSettingVisible(false);
               }}
               okText={"保存"}
               maskClosable={false}
               cancelButtonProps={{style: {display: "none"}}}
        >
            <div>
                <p style={{margin: "0 0 10px 0"}}>字体大小</p>
                <Slider
                    min={10}
                    max={50}
                    value={settingValue.fontSize.slice(0, -2)}
                    onChange={(value) => {
                        dispatch(setFontSize(value + "px"));
                    }}
                />

                <p style={{margin: "0 0 10px 0"}}>行高</p>
                <Slider
                    min={1}
                    max={3}
                    step={0.1}
                    value={settingValue.lineHeight}
                    onChange={(value) => {
                        dispatch(setLineHeight(value));
                    }}
                />

                <p style={{margin: "0 0 10px 0"}}>字间距</p>
                <Slider
                    min={0}
                    max={1}
                    step={0.01}
                    value={settingValue.letterSpacing.slice(0, -2)}
                    onChange={(value) => {
                        dispatch(setLetterSpacing(value + "em"));
                    }}
                />

                <p style={{margin: "0 0 10px 0"}}>词间距</p>
                <Slider
                    min={0}
                    max={10}
                    step={0.1}
                    value={settingValue.wordSpacing.slice(0, -2)}
                    onChange={(value) => {
                        dispatch(setWordSpacing(value + "px"));
                    }}
                />

                <p style={{margin: "0 0 10px 0"}}>标题大小</p>
                <Slider
                    min={10}
                    max={50}
                    value={settingValue.titleSize.slice(0, -2)}
                    onChange={(value) => {
                        dispatch(setTitleSize(value + "px"));
                    }}
                />

                <p style={{margin: "0 0 10px 0"}}>段落缩进</p>
                <Slider
                    min={0}
                    max={10}
                    step={0.1}
                    value={settingValue.textIndent.slice(0, -2)}
                    onChange={(value) => {
                        dispatch(setTextIndent(value + "em"));
                    }}
                />

                <p style={{margin: "0 0 10px 0"}}>段落间距</p>
                <Slider
                    min={0}
                    max={10}
                    step={0.1}
                    value={settingValue.textSpacing.slice(0, -2)}
                    onChange={(value) => {
                        dispatch(setTextSpacing(value + "em"));
                    }}
                />

                <p style={{margin: "0 0 10px 0"}}>页边距</p>
                <Slider
                    min={0}
                    max={30}
                    step={1}
                    value={settingValue.margin.slice(0, -1)}
                    onChange={(value) => {
                        dispatch(setMargin(value + "%"));
                    }}
                />

                <p style={{margin: "0 0 10px 0"}}>字体颜色</p>
                <HexColorPicker color={settingValue.fontColor}
                                onChange={(value) => {
                                    dispatch(setFontColor(value));
                                }}/>

                <p style={{margin: "0 0 10px 0"}}>背景颜色</p>
                <HexColorPicker color={settingValue.backgroundColor}
                                onChange={(value) => {
                                    dispatch(setBackgroundColor(value));
                                }}/>
            </div>
        </Modal>

        <div className="novel-reader-page-side-button-group" style={{
            display: "flex",
            position: "fixed",
            flexDirection: "column",
            right: "1.25vw",
            bottom: "3vh",
            zIndex: "100",
            transition: "all 0.3s",
        }}>
            <SideButton content={<svg className="novel-reader-page-side-button-setting-icon" viewBox="0 0 1024 1024"
                                      xmlns="http://www.w3.org/2000/svg" width="calc(1vw + 10px)"
                                      height="calc(1vw + 10px)" style={{filter: "opacity(0.6)"}} onClick={() => {
                setSettingVisible(true);
            }}>
                <path
                    d="M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56c10.1-8.6 13.8-22.6 9.3-35.2l-0.9-2.6c-18.1-50.5-44.9-96.9-79.7-137.9l-1.8-2.1c-8.6-10.1-22.5-13.9-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85c-2.4-13.1-12.7-23.3-25.8-25.7l-2.7-0.5c-52.1-9.4-106.9-9.4-159 0l-2.7 0.5c-13.1 2.4-23.4 12.6-25.8 25.7l-15.8 85.4c-35.9 13.6-69.2 32.9-99 57.4l-81.9-29.1c-12.5-4.4-26.5-0.7-35.1 9.5l-1.8 2.1c-34.8 41.1-61.6 87.5-79.7 137.9l-0.9 2.6c-4.5 12.5-0.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5c-10.1 8.6-13.8 22.6-9.3 35.2l0.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1c8.6 10.1 22.5 13.9 35.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4c2.4 13.1 12.7 23.3 25.8 25.7l2.7 0.5c26.1 4.7 52.8 7.1 79.5 7.1 26.7 0 53.5-2.4 79.5-7.1l2.7-0.5c13.1-2.4 23.4-12.6 25.8-25.7l15.7-85c36.2-13.6 69.7-32.9 99.7-57.6l81.3 28.9c12.5 4.4 26.5 0.7 35.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l0.9-2.6c4.5-12.3 0.8-26.3-9.3-35zM788.3 465.9c2.5 15.1 3.8 30.6 3.8 46.1s-1.3 31-3.8 46.1l-6.6 40.1 74.7 63.9c-11.3 26.1-25.6 50.7-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97c-28.1 3.2-56.8 3.2-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9z"
                    fill={settingValue.fontColor}></path>
                <path
                    d="M512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176z m79.2 255.2C570 602.3 541.9 614 512 614c-29.9 0-58-11.7-79.2-32.8C411.7 560 400 531.9 400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390c29.9 0 58 11.6 79.2 32.8C612.3 444 624 472.1 624 502c0 29.9-11.7 58-32.8 79.2z"
                    fill={settingValue.fontColor}></path>
            </svg>}/>
            <SideButton content={<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
                                      width="calc(1vw + 10px)"
                                      height="calc(1vw + 10px)" style={{filter: "opacity(0.6)"}} onClick={() => {
                const info = {...settingValue.nowReadChapter};

                if (info.chapterIndex === 0 && info.chapterListIndex === 0) {
                    message.info("前面什么也没有诶");
                    return;
                }
                if (info.chapterIndex === 0) {
                    info.chapterListIndex--;
                    info.chapterIndex = info.chapterList[info.chapterListIndex].chapters.length - 1;
                } else {
                    info.chapterIndex--;
                }

                info.chapterName = info.chapterList[info.chapterListIndex].chapters[info.chapterIndex].title;
                info.chapterListName = info.chapterList[info.chapterListIndex].title;
                dispatch(setNowReadChapter(info));
                dispatch(setShouldUpdate(true));
                window.scrollTo(0, 0);
            }}>
                <path
                    d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8c-16.4 12.8-16.4 37.5 0 50.3l450.8 352.1c5.3 4.1 12.9 0.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"
                    fill={settingValue.fontColor}></path>
            </svg>}/>
            <SideButton content={<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
                                      width="calc(1vw + 10px)"
                                      height="calc(1vw + 10px)" style={{filter: "opacity(0.6)"}}>
                <path
                    d="M765.7 486.8L314.9 134.7c-5.3-4.1-12.9-0.4-12.9 6.3v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1c16.4-12.8 16.4-37.6 0-50.4z"
                    p-id="9177" fill={settingValue.fontColor}></path>
            </svg>} onClick={() => {
                const info = {...settingValue.nowReadChapter};

                if (info.chapterListIndex >= info.chapterList.length - 1 && info.chapterIndex >= info.chapterList[info.chapterListIndex].chapters.length - 1) {
                    message.info("后面什么也没有诶");
                    return;
                }
                if (info.chapterIndex >= info.chapterList[info.chapterListIndex].chapters.length - 1) {
                    info.chapterListIndex++;
                    info.chapterIndex = 0;
                } else {
                    info.chapterIndex++;
                }

                info.chapterName = info.chapterList[info.chapterListIndex].chapters[info.chapterIndex].title;
                info.chapterListName = info.chapterList[info.chapterListIndex].title;
                dispatch(setNowReadChapter(info));
                dispatch(setShouldUpdate(true));
                window.scrollTo(0, 0);
            }}/>
            <SideButton content={<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
                                      width="calc(1vw + 10px)"
                                      height="calc(1vw + 10px)" style={{filter: "opacity(0.6)"}}>
                <path
                    d="M793 242H366v-74c0-6.7-7.7-10.4-12.9-6.3l-142 112c-4.1 3.2-4.1 9.4 0 12.6l142 112c5.2 4.1 12.9 0.4 12.9-6.3v-74h415v470H175c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h618c35.3 0 64-28.7 64-64V306c0-35.3-28.7-64-64-64z"
                    p-id="9533" fill={settingValue.fontColor}></path>
            </svg>}
                        onClick={() => {
                            window.history.back();
                        }}
            />
        </div>

        <div style={{marginBottom: "5vh", marginTop: "20px"}}>
            <NovelReader/>
        </div>
        <PageFooter/>
    </div>);
}


export default NovelReaderPage;
