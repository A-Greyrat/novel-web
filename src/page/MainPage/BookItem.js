import {Link} from "react-router-dom";
import React, {useState} from "react";
import "./BookItem.css";

class BookItemNameAndTag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name, tags: props.tags
        }
        this.ref = React.createRef();
        this.tagRef = [];
        for (let i = 0; i < this.state.tags.length; i++) this.tagRef.push(React.createRef());
    }

    detectOverflow = () => {
        let tagWidth = 0;
        for (let i = 0; i < this.state.tags.length; i++) {
            tagWidth += this.tagRef[i].current.offsetWidth
                + parseInt(window.getComputedStyle(this.tagRef[i].current).marginLeft) +
                parseInt(window.getComputedStyle(this.tagRef[i].current).marginRight);
            if (tagWidth > this.ref.current.offsetWidth) {
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
        // TODO: Is this the best way to do this?
        setTimeout(() => {
            this.detectOverflow();
        }, 100);
    }

    render() {
        return (<div className="book-item-name-and-tags-container" style={{
            width: "100%",
            height: "auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: "0",
        }}>

            <p className="book-item-name" style={{
                fontSize: "20px", margin: "20px 0 0 20px", fontWeight: "bold", whiteSpace: "nowrap",
            }}>
                {this.state.name}
            </p>

            <div className="book-item-tags-container" style={{
                padding: "0",
                margin: "0",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                overflow: "hidden",
            }} ref={this.ref}>

                {this.state.tags.map((tag, index) => {
                    return (<p key={index} className="book-item-tag" style={{
                        border: "1px solid #777",
                        borderRadius: "6px",
                        padding: "0 5px",
                        fontSize: "10px",
                        margin: "20px 1px 0 8px",
                        whiteSpace: "nowrap",
                    }} ref={this.tagRef[index]}>
                        {tag}
                    </p>);
                })}
            </div>
        </div>);
    }
}


export default function BookItem({name, cover, author, describe, tags}) {
    const [isMouseEnterDisplayArea, setIsMouseEnterDisplayArea] = useState(false);

    return (<div className="book-item" style={{
        width: "80%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        flex: "1 0 0",
        margin: "15px",
        userSelect: "none",
        WebkitUserSelect: "none",
    }}>
        <div className="book-item-container" style={{width: "100%", height: "100%",}}>
            <div className="book-item-info" style={{
                width: "100%",
                height: "85%",
                backgroundColor: "rgba(255,255,255,0)",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
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

                <div className="book-item-info-container-root" style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(230,230,230,0.3)",
                    borderRadius: "10px",
                    borderTopLeftRadius: "0",
                    borderBottomLeftRadius: "0",
                    boxShadow: "5px 0px 13px 2px rgba(0,0,0,0.1)",
                    overflow: "hidden",
                    position: "relative"
                }} onMouseEnter={() => {
                    setIsMouseEnterDisplayArea(true);
                }} onMouseLeave={() => {
                    setIsMouseEnterDisplayArea(false);
                }}>

                    <div className="book-item-catalog-container" style={{
                        position: "absolute",
                        opacity: isMouseEnterDisplayArea ? "1" : "0",
                        zIndex: "100",
                        width: "100%",
                        height: "100%",
                    }}>

                        <BookItemNameAndTag tags={tags} name={name}/>
                        <div className="book-item-catalog-container-divider" style={{
                            margin: "0.5px 0 2px 20px",
                            width: "calc(100% - 40px)",
                            height: "0.5px",
                            backgroundColor: "#555",
                        }}/>
                        <p style={{
                            fontSize: "10px",
                            margin: "0 20px 0 20px",
                            padding: "0",
                            fontWeight: "bold",
                            whiteSpace: "nowrap",
                        }}>
                            目录
                        </p>
                    </div>


                    <div className="book-item-info-container" style={{
                        opacity: isMouseEnterDisplayArea ? "0" : "1", zIndex: "1",

                    }}>
                        <BookItemNameAndTag tags={tags} name={name}/>

                        <p style={{fontSize: "10px", margin: "0 0 0 20px", fontWeight: "bold", whiteSpace: "nowrap",}}>
                            作者: {author || "未知"}
                        </p>

                        <div className="book-item-describe">
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

            </div>
        </div>

    </div>);
}