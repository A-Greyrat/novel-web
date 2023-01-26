import "./MainPage.css";
import BookItem from "../component/BookItem";
import {Component} from "react";
import {ax} from "../global";
import LoadPage from "./LoadPage";
import {message} from "antd";


export default class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            novelList: [],
        }

    }

    componentDidMount() {
        ax.get("/api/novel/random?num=50").then(response => {
            return response.data;
        }).then(data => {
            data.novelList.forEach((v, i) => data.novelList[i] = JSON.parse(v.json));
            this.setState({
                novelList: data.novelList,
            });
        }).catch(error => {
            if (error.response.status === 400) {
                document.cookie = "";
                window.location.href = "/login";
                message.error("登录已过期，请重新登录");
            } else {
                message.error("未知错误");
                message.error(error.response.data.error);
            }
        });
    }

    render() {
        if (this.state.novelList.length === 0)
            return <LoadPage isLoaded={false} color="pink"/>;

        return (<>
            <p style={{
                fontSize: "calc(0.2vw + 25px)",
                fontWeight: "bold",
                color: "black",
                marginLeft: "7.5vw",
                marginTop: "3vh",
                marginBottom: "0"
            }}>
                随机推荐
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
                {this.state.novelList.map((item, index) => {
                    return (<BookItem key={index} id={item.id} name={item.title}
                                      describe={item.description} author={item.author} tags={item.tags}
                                      chapterList={item.chapterLists}/>);
                })}
            </div>
        </>);
    }
}