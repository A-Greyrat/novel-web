import {Link} from "react-router-dom";
import "./PageHeader.css";

export default function PageHeader() {
    return (<div className="page-header-root" style={{
        position: "relative", top: "0", left: "0", boxShadow: "0px 0px 5px rgba(0,0,0,0.3)", width: "100%", height: "60px",
    }}>
        <div className="page-header" style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flex: "1 0 auto",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <div className="page-header-container" style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                flex: "1 0 auto",
                alignItems: "center",
                padding: "0",
                margin: "0",
            }}>
                <div className="page-header-nav" style={{
                    maxWidth: "50%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    flex: "0 0 auto",
                    justifyContent: "center",
                }}>

                    <Link className="page-header-item" to={"/"} style={{
                        textDecoration: "none",
                        color: "#000",
                        padding: "0 20px",
                        margin: "0",
                        height: "100%",
                        display: "flex",
                        flex: "0 0 auto",
                        alignItems: "center",
                    }}>
                        <p style={{fontSize: "10pt"}}> 主页</p>
                    </Link>
                    <a className="page-header-item" href="https://nilou.xyz/bangumi" style={{
                        textDecoration: "none",
                        color: "#000",
                        padding: "0 20px",
                        margin: "0",
                        height: "100%",
                        flex: "0 0 auto",
                        display: "flex",
                        alignItems: "center",
                    }}>
                        <p style={{fontSize: "10pt"}}>番剧</p>
                    </a>

                    <a className="page-header-item" href="https://nilou.xyz/blog" style={{
                        textDecoration: "none",
                        color: "#000",
                        padding: "0 20px",
                        margin: "0",
                        height: "100%",
                        flex: "0 0 auto",
                        display: "flex",
                        alignItems: "center",
                    }}>
                        <p style={{fontSize: "10pt",}}>博客</p>
                    </a>
                </div>


                <div className="page-header-padding" style={{
                    maxWidth: "30%", height: "100%", flex: "1 1 auto",
                }}/>

                <div style={{
                    width: "30%",
                    height: "100%",
                    maxWidth: "300px",
                    padding: "0 20px",
                    margin: "0",
                    flex: "0 0 auto",
                    display: "flex",
                    alignItems: "center",
                    alignSelf: "center",
                }}>
                    <div className="page-header-search" style={{
                        width: "100%",
                        height: "70%",
                        flex: "0 0 auto",
                        display: "flex",
                        alignItems: "center",
                        alignSelf: "center",
                        borderRadius: "8px",
                        backgroundColor: "#f5f5f5",
                    }}>
                        <input className="page-header-search-content" type="text" placeholder="搜索" style={{
                            width: "100%",
                            height: "50%",
                            border: "none",
                            outline: "none",
                            padding: "5px 15px",
                            backgroundColor: "transparent",
                            fontSize: "14px",
                        }}>
                        </input>

                        <div className="page-header-search-icon" style={{height: "100%"}}>
                            <div style={{
                                height: "100%",
                                padding: "0 10px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }} onClick={() => {
                                console.log("search");
                            }}>
                                <svg viewBox="0 0 1024 1024"
                                     xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                                    <path
                                        d="M320 885.333333c-8.533333 0-17.066667-4.266667-23.466667-10.666666-12.8-12.8-10.666667-34.133333 2.133334-44.8L654.933333 512 298.666667 194.133333c-12.8-10.666667-14.933333-32-2.133334-44.8 10.666667-12.8 32-14.933333 44.8-2.133333l384 341.333333c6.4 6.4 10.666667 14.933333 10.666667 23.466667 0 8.533333-4.266667 17.066667-10.666667 23.466667l-384 341.333333c-6.4 6.4-12.8 8.533333-21.333333 8.533333z"
                                        fill="#2c2c2c" p-id="3374"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}
