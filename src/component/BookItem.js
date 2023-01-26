import {Link} from "react-router-dom";
import React from "react";
import "./BookItem.css";
import {domain, nullPic} from "../global";

class BookItemPrevInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            tags: props.tags,
            author: props.author,
            id: props.id,
            shouldDetectOverflow: props.shouldDetectOverflow,
            chapterList: props.chapterList,
            describe: props.describe,
        }
        this.ref = React.createRef();
        this.tagRef = [];
        for (let i = 0; i < this.state.tags.length; i++) this.tagRef.push(React.createRef());
    }

    static getDerivedStateFromProps(props, state) {
        return props !== state ? props : null;
    }

    detectOverflow = () => {
        let tagWidth = 0;
        const tolerance = 20;
        for (let i = 0; i < this.state.tags.length; i++) {
            if (this.tagRef[i].current === null || this.tagRef[i].current === undefined) return;
            tagWidth += this.tagRef[i].current.offsetWidth + parseInt(window.getComputedStyle(this.tagRef[i].current).marginLeft) + parseInt(window.getComputedStyle(this.tagRef[i].current).marginRight);
            if (tagWidth > this.ref.current.offsetWidth - tolerance) {
                this.tagRef[i].current.style.opacity = "0";
            } else {
                this.tagRef[i].current.style.opacity = "1";
            }
        }
    }

    componentDidMount() {
        window.addEventListener("resize", () => {
            this.detectOverflow();
        });

        setTimeout(() => {
            this.detectOverflow();
        }, 100);
    }

    render() {
        if (this.state.shouldDetectOverflow) {
            // eslint-disable-next-line react/no-direct-mutation-state
            this.state.shouldDetectOverflow = false;
            this.detectOverflow();
        }

        return (<div className="book-item-name-and-tags-container" style={{
            width: "100%",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: "0",
        }}>
            <Link to='/novel/detail'
                  state={{
                      id: this.state.id,
                      name: this.state.name,
                      tags: this.state.tags,
                      chapterList: this.state.chapterList,
                      describe: this.state.describe,
                      author: this.state.author,
                  }}
                  style={{
                      textDecoration: "none", margin: "20px 0 0 20px", width: "calc(100% - 30px)",
                  }}>
                <p className="book-item-name" style={{
                    width: "auto",
                    fontSize: "1em",
                    fontWeight: "bold",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    margin: "0",
                }}>
                    {this.state.name ? this.state.name : "获取信息错误"}
                </p>
            </Link>
            <p style={{
                fontSize: "10px", margin: "0 0 0 20px", fontWeight: "bold", whiteSpace: "nowrap",
            }}>
                作者: {this.state.author || "未知"}
            </p>

            <div className="book-item-tags-container" style={{
                paddingLeft: "20px",
                paddingTop: "5px",
                margin: "0",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                overflow: "hidden",
                width: "calc(100% - 20px)",
            }} ref={this.ref}>

                {this.state.tags.map((tag, index) => {
                    return (<p key={index} className="book-item-tag" style={{
                        border: "1px solid #777",
                        borderRadius: "6px",
                        padding: "0 5px",
                        fontSize: "10px",
                        margin: "0 5px 1px 0",
                        whiteSpace: "nowrap",
                        height: "auto",
                    }} ref={this.tagRef[index]}>
                        {tag}
                    </p>);
                })}
            </div>
        </div>);
    }
}

export default class BookItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldRefreshTags: false,
            name: props.name,
            tags: props.tags,
            chapterList: props.chapterList,
            describe: props.describe,
            author: props.author,
            id: props.id,
        }
    }


    render() {
        return (<div className="book-item" style={{
            width: "85%",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            flex: "0",
            margin: "1.2vh",
            userSelect: "none",
            WebkitUserSelect: "none",
        }}>
            <div className="book-item-container" style={{width: "100%", height: "100%",}}>
                <div className="book-item-info" style={{
                    width: "100%",
                    minHeight: "85%",
                    height: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    justifySelf: "flex-start",
                }}>
                    <div className="book-item-cover">
                        <Link to='/novel/detail'
                              state={{
                                  id: this.state.id,
                                  name: this.state.name,
                                  tags: this.state.tags,
                                  chapterList: this.state.chapterList,
                                  describe: this.state.describe,
                                  author: this.state.author,
                              }}>
                            <img className="book-item-cover-image"
                                 src={domain + "/api/novel/cover?id=" + this.state.id || nullPic} alt={this.state.name}
                                 style={{
                                     width: "calc(1.5vw + 120px)",
                                     height: "220px",
                                     objectFit: "cover",
                                     borderRadius: "5%",
                                     boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                                     transition: "all 0.3s ease-out",
                                 }}/>
                        </Link>
                    </div>

                    <div className="book-item-info-container-root" style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "10px",
                        borderTopLeftRadius: "0",
                        borderBottomLeftRadius: "0",
                        boxShadow: "5px 0px 13px 2px rgba(0,0,0,0.1)",
                        overflow: "hidden",
                        position: "relative",
                    }}>
                        <div className="book-item-info-container" style={{
                            position: "relative", height: "auto",
                        }}>
                            <BookItemPrevInfo tags={this.state.tags} name={this.state.name} author={this.state.author}
                                              shouldDetectOverflow={this.state.shouldRefreshTags} id={this.state.id}
                                              describe={this.state.describe} chapterList={this.state.chapterList}
                            />
                            <div className="book-item-describe">
                                <p style={{
                                    fontSize: "14px",
                                    margin: "15px 20px 20px 20px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: "4",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineBreak: "loose",
                                }}>
                                    {this.state.describe || "暂无简介"}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>);
    }
}