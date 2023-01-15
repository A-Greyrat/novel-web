import {useEffect} from "react";

export default function PageFooter() {
    useEffect(() => {
        window.addEventListener("resize", () => {
            const footer = document.getElementsByClassName("page-footer-root")[0];
            const page = document.getElementsByClassName("page")[0];

            const pageHeight = page.offsetHeight;
            const pageMarginBottom = window.innerHeight - pageHeight;

            if (pageMarginBottom > 0)
                footer.style.marginTop = pageMarginBottom + "px";
        });
    }, []);

    return (<div className="page-footer-root" style={{
            position: "relative",
            bottom: "0",
            left: "0",
            boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
            width: "100%",
            height: "auto",
            padding: "20px 0"
        }}>
            <div className="page-footer" style={{
                width: "100%", height: "100%", display: "flex",
                userSelect: "none", WebkitUserSelect: "none",
            }}>
                <div className="page-footer-container" style={{
                    width: "100%", height: "100%", display: "flex", justifyContent: "center", flex: "1 0 auto",
                    alignItems: "center", padding: "0", margin: "0",
                    flexDirection:"column"
                }}>
                    <p style={{fontSize: "15px", margin: "0", padding: "0",
                        fontWeight: "bold", width: "100%", textAlign: "center", color: "red",
                        display: "flex", justifyContent: "center", alignItems: "center"
                    }}>
                        <img src="./image/focalors.webp" alt="" style={{
                            padding: "0 5px",
                            borderRadius: "50%", width: "30px", height: "30px",
                        }}/>
                        僕達は操り人形じゃない
                        <img src="./image/ayaka.webp" alt="" style={{
                            padding: "0 5px",
                            borderRadius: "50%", width: "30px", height: "30px",
                        }}/>
                    </p>

                    <p style={{fontSize: "10px", margin: "0", padding: "0",
                        fontWeight: "bold",
                    }}>© 2023 nilou.xyz</p>
                </div>
            </div>

        </div>);
}