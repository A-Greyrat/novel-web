import "./LoadPage.css";

export default function LoadPage(props) {
    return (<div className="loading-screen" style={{display: props.isLoaded ? "none" : "flex",}}>
        <svg className="loading-icon" width="45" height="45" viewBox="-50 -50 100 100"
             xmlns="http://www.w3.org/2000/svg">
            <circle cx="0" cy="0" r="40" strokeWidth="5" fill="none" stroke="rgba(209, 211, 215, 0.5)"/>
            <circle className="loading-icon-process" cx="0" cy="0" r="40" strokeWidth="5" fill="none"
                    stroke={props.color}
                    strokeDashoffset="0" strokeDasharray="251"/>
        </svg>

        <div style={{fontSize: "28px", color: props.color, margin: "0 10px", padding: "0"}}>
            <div className="loading-text" style={{margin: 0, display: "flex"}}>
                <p>少</p>
                <p>女</p>
                <p>祈</p>
                <p>祷</p>
                <p>中</p>
                <p>...</p>
            </div>
        </div>
    </div>);
}

LoadPage.defaultProps = {
    color: "pink",
}