import PageHeader from "../component/PageHeader";
import {Outlet} from "react-router-dom";
import PageFooter from "../component/PageFooter";
import "./PageFrame.css";

export default function PageFrame() {
    return (<div className="page-root" style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        minHeight: "100vh",
    }}>
        <div className="page-background"
             style={{width: "100%", height: "100%", position: "fixed", zIndex: "-1",}}>
            <img src="/static/image/main-page-background.webp" alt=""
                 style={{objectFit: "scale-down", position: "fixed", zIndex: "-1", width: "100%", height: "100%",}}/>
        </div>
        <PageHeader/>
        <Outlet/>
        <PageFooter/>
    </div>);
}
