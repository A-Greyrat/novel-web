import "./MainPage.css";
import PageHeader from "./PageHeader";
import LoadPage from "./LoadPage";
import {useEffect, useState} from "react";
import WebglCanvas, {BinarizationFilter} from "../Esut";
import PageFooter from "./PageFooter";
import {Link} from "react-router-dom";

const novelList = [{
    name: "阿Q正传",
    cover: "./image/cover/阿Q正传.webp",
    author: "鲁迅",
    describe: "《阿Q正传》是鲁迅创作的中篇小说，创作于1921年12月，最初发表于北京《晨报副刊》，后收入小说集《呐喊》。该小说创作于1921年底，共分九章。小说以辛亥革命前后的中国农村为背景，描写了未庄流浪雇农阿Q，虽然干起活来“真能做”，但却一无所有，甚至连名姓都被人遗忘的故事。该小说批判了当时中国社会的封建，保守，庸俗，腐败等社会特点，有力地揭示了旧中国人民的生活场景和其处在水深火热之中的病态。",
    tags: ["传统文学", "鲁迅", "经典"]
}, {
    name: "伤逝",
    cover: "./image/cover/伤逝.webp",
    author: "鲁迅",
    describe: "涓生和子君都是五四式新青年。子君认识涓生后，便不断地拜访他，听他讲新文化、新道德、新观念，深受其影响，并与之相恋。之后，子君又坚决地对涓生表示：“我是我自己的，他们谁也没有干涉我的权利！”接着，与涓生一起寻住所、筹款子，并不顾亲朋的反对而同居，建立小家庭。但子君很快就陷入家务之中，他们的爱情也未能“时时更新，生长，创造”。不久，涓生为当局所辞，他们便生活无着，涓生对子君的爱情也随之消减以至最后消失；但涓生又不便说出，只好外出躲避。迫于生计，子君宰吃了所饲养的油鸡，放掉了所喂养的狗。最后，涓生对子君坦露自己不再爱她的真实想法，她便被其父亲领回了家，并在无爱的人间死了。当涓生得知实际上是自己说出的真实导致了子君的死时，他追悔莫及，于是，长歌当哭，凄惋地唱出了自己的悔恨和悲哀，写下这篇手记，为子君送葬。",
    tags: ["传统文学", "鲁迅", "散文"]
}, {
    name: "故乡",
    cover: "/image/cover/故乡.webp",
    author: "鲁迅",
    describe: "《故乡》是现代文学家鲁迅于1921年创作的一篇短篇小说。小说以“我”回故乡的活动为线索，按照“回故乡”——“在故乡”——“离故乡”的情节安排，依据“我”的所见所闻所忆所感，着重描写了闰土和杨二嫂的人物形象，从而反映了辛亥革命前后农村破产、农民痛苦生活的现实；同时深刻指出了由于受封建社会传统观念的影响，劳苦大众所受的精神上的束缚，造成纯真的人性的扭曲，造成人与人之间的冷漠、隔膜，表达了作者对现实的强烈不满和改造旧社会、创造新生活的强烈愿望。该小说入选小学语文，人民教育出版社六年级（上册）。",
    tags: ["传统文学", "鲁迅"]
}];

function BookItem({name, cover, author, describe, tags}) {
    return (<div className="book-item" style={{
        width: "80%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flex: "1 0 0",
        margin: "15px"
    }}>
        <div className="book-item-container" style={{
            width: "100%", height: "100%",
        }}>
            <div className="book-item-info" style={{
                width: "100%",
                height: "85%",
                backgroundColor: "rgba(255,255,255,0)",
                display: "flex",
                alignItems: "center",
            }}>

                <div className="book-item-cover">
                    <Link to={`/novel/${name}`}>
                        <img src={cover || "./image/cover/null.webp"} alt={name} style={{
                            width: "auto",
                            height: "200px",
                            objectFit: "cover",
                            borderRadius: "10px",
                            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                        }}/>
                    </Link>
                </div>

                <div className="book-item-info-container" style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(230,230,230,0.3)",
                    borderRadius: "10px",
                    borderTopLeftRadius: "0",
                    borderBottomLeftRadius: "0",
                    boxShadow: "5px 0px 13px 2px rgba(0,0,0,0.1)",
                }}>

                    <div className="book-item-name-and-tags-container" style={{
                        width: "100%",
                        height: "auto",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "left",
                        alignItems: "center",
                        padding: "0",
                    }}>
                        <Link to={`/novel/${name}`} style={{textDecoration:"none", color:"unset"}}>
                            <p className="book-item-name" style={{
                                fontSize: "20px", margin: "20px 0 0 20px", fontWeight: "bold", whiteSpace: "nowrap",
                            }}>{name}</p>
                        </Link>
                        {tags.map((tag) => {
                            return (<p className="book-item-tag" style={{
                                border: "1px solid #777",
                                borderRadius: "8px",
                                padding: "0 5px",
                                fontSize: "8px",
                                margin: "20px 0 0 8px",
                                whiteSpace: "nowrap",
                            }}>{tag}</p>);
                        })}
                    </div>

                    <p style={{
                        fontSize: "10px", margin: "0 0 0 20px", fontWeight: "bold", whiteSpace: "nowrap",
                    }}>
                        作者: {author || "未知"}
                    </p>

                    <p style={{
                        fontSize: "14px",
                        margin: "15px 20px 20px 20px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "4",
                        WebkitBoxOrient: "vertical",
                        wordBreak: "break-all",
                    }}>
                        {describe || "暂无简介"}
                    </p>
                </div>

            </div>
        </div>

    </div>);
}

export default function MainPage() {
    console.log(JSON.stringify(novelList));
    const [loading] = useState(false);
    useEffect(() => {
        // setTimeout(() => {
        //     setLoading(false);
        // }, 1000);
    }, []);


    return (<div className="page" style={{
        overflow: "hidden", width: "100%", height: "100%",
    }}>
        <LoadPage isLoaded={!loading}/>
        <div style={{
            display: loading ? "none" : "block",
        }}>
            <div className="page-background" style={{
                width: "100%", height: "100%", position: "fixed", zIndex: "-1",
            }}>
                <WebglCanvas imgUrl="./image/novel-main-page-background.webp" style={{
                    objectFit: "scale-down", position: "fixed", zIndex: "-1", width: "100%", height: "100%",
                }}
                             filters={[{
                                 filter: BinarizationFilter, params: {
                                     threshold: 0.5, colorWhite: [255, 255, 255], colorBlack: [255, 192, 203],
                                 }
                             }]} isStatic={true}/>
            </div>
            <PageHeader/>
            <div className="page-container" style={{
                width: "100%", height: "auto", padding: "auto 0",
            }}>
                <div className="page-content" style={{
                    display: "flex",
                    width: "100%",
                    height: "auto",
                    flexWrap: "wrap",
                    alignSelf: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    padding: "5vh 0",
                }}>
                    {novelList.map((item, index) => {
                        return (<BookItem key={index} name={item.name} cover={item.cover} describe={item.describe}
                                          author={item.author} tags={item.tags}/>);
                    })}
                </div>
            </div>
            <PageFooter/>
        </div>
    </div>);
}