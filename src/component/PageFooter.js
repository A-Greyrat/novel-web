import "./PageFooter.css";

export default function PageFooter({Child}) {
    return (<div className="page-footer-root" style={{
        position: "relative",
        width: "100%",
        height: "auto",
        padding: "20px 0",
        userSelect: "none", WebkitUserSelect: "none",
    }}>
        <div className="page-footer-container" style={{
            width: "100%", height: "100%", display: "flex", justifyContent: "center", flex: "1 0 auto",
            alignItems: "center", padding: "0", margin: "0",
            flexDirection: "column"
        }}>
            <p style={{
                fontSize: "15px", margin: "0", padding: "0",
                fontWeight: "bold", width: "100%", textAlign: "center", color: "red",
                display: "flex", justifyContent: "center", alignItems: "center"
            }}>
                <img src="/static/image/focalors.webp" alt="" style={{
                    padding: "0 10px",
                    borderRadius: "50%", width: "30px", height: "30px",
                }}/>
                まどろっこしい話は嫌
                <img src="/static/image/ayaka.webp" alt="" style={{
                    padding: "0 10px",
                    borderRadius: "50%", width: "30px", height: "30px",
                }}/>
            </p>

            <p style={{
                fontSize: "10px", margin: "0", padding: "0",
                fontWeight: "bold",
            }}>© 2023 nilou.xyz</p>

            {Child}
        </div>
    </div>);
}