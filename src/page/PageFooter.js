export default function PageFooter() {

    return (<div className="page-footer-root" style={{
            position: "relative",
            top: "0",
            left: "0",
            boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
            width: "100%",
            height: "60px",
        }}>
            <div className="page-footer" style={{
                width: "100%", height: "100%", display: "flex",
            }}>
                <div className="page-footer-container" style={{
                    width: "100%", height: "100%", display: "flex", justifyContent: "center", flex: "1 0 auto",
                    alignItems: "center", padding: "0", margin: "0",
                    flexDirection:"column"
                }}>
                    <p style={{fontSize: "15px", margin: "0", padding: "0",
                        fontWeight: "bold", width: "100%", textAlign: "center"
                    }}>僕らは操り人形じゃない</p>
                    <p style={{fontSize: "10px", margin: "0", padding: "0",
                        fontWeight: "bold",
                    }}>© 2023 nilou.xyz</p>
                </div>
            </div>

        </div>);
}