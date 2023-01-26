import {Link} from "react-router-dom";
import "./PageHeader.css";
import {useRef} from "react";
export default function PageHeader() {
    const inputRef = useRef();

    return (<div className="page-header-root" style={{
        position: "relative", width: "100%", height: "60px",
    }}>
        <div className="page-header" style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <div className="page-header-container" style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                flex: "1",
                alignItems: "center",
                padding: "0",
                margin: "0",
            }}>
                <div className="page-header-nav" style={{
                    maxWidth: "50%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    flex: "0",
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
                        <p style={{fontSize: "10pt"}}>主页</p>
                    </Link>
                    <Link className="page-header-item" to={"/novel/space"} style={{
                        textDecoration: "none",
                        color: "#000",
                        padding: "0 20px",
                        margin: "0",
                        height: "100%",
                        display: "flex",
                        flex: "0 0 auto",
                        alignItems: "center",
                    }}>
                        <p style={{fontSize: "10pt"}}>我的</p>
                    </Link>
                </div>


                <div className="page-header-padding" style={{
                    maxWidth: "30%", height: "100%", flex: "1 0 0",
                }}/>

                <div className="page-header-search-root" style={{
                    width: "auto",
                    height: "100%",
                    flex: "0",
                    padding: "0 20px",
                    margin: "0",
                    order: "0",
                    display: "flex",
                }}>
                    <div className="page-header-search" style={{
                        height: "70%",
                        display: "flex",
                        flex: "1 0 0",
                        alignItems: "center",
                        alignSelf: "center",
                        justifyContent: "space-between",
                        borderRadius: "8px",
                        backgroundColor: "#f5f5f5",
                    }}>
                        <input className="page-header-search-content" type="text" placeholder="搜索" style={{
                            width: "100%",
                            height: "50%",
                            border: "none",
                            outline: "none",
                            marginLeft: "calc(1vw + 10px)",
                            padding: "0",
                            backgroundColor: "transparent",
                            fontSize: "14px",
                        }} onKeyDown={
                            (e) => {
                                if (e.key === "Enter") {
                                    if (e.target.value !== "")
                                        window.location.href = "/novel/search/" + e.target.value;
                                }
                            }
                        } ref={inputRef}/>

                        <div className="page-header-search-icon" style={{height: "100%"}}>
                            <div style={{
                                height: "100%",
                                margin: "0 10px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }} onClick={() => {
                                if (inputRef.current.value !== "")
                                    window.location.href = "/novel/search/" + inputRef.current.value;
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
