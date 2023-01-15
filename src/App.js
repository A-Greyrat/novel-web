import {NovelReader} from "./page/ReaderPage";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear, faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import {Button, Modal, Slider} from "antd";
import {HexColorPicker} from "react-colorful";
import {Link, Route, Routes} from 'react-router-dom'
import MainPage from "./page/MainPage/MainPage";

const defaultSetting = {
    fontSize: "20px",
    lineHeight: "1.5",
    letterSpacing: "0.1em",
    wordSpacing: "0px",
    titleSize: "30px",
    textIndent: "1.5em",
    textSpacing: "1em",
    margin: "0px",
    fontColor: "black",
    backgroundColor: "white",
}
let tempSetting = {};
let originSetting = {};

export class NovelReaderPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = JSON.parse(localStorage.getItem("NovelReaderSetting")) || defaultSetting;
        this.state.settingVisible = false;
        originSetting = this.state;
    }

    render() {
        return (<div className="App" style={{
            backgroundColor: this.state.backgroundColor,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
        }}>


            <Button
                onClick={() => {
                    this.setState({settingVisible: true});
                }}
                style={{
                    position: "fixed",
                    zIndex: 100,
                    right: "20px",
                    bottom: "20px",
                    backgroundColor: "rgba(0,0,0,0)",
                    color: this.state.fontColor,
                    border: "1px solid " + this.state.fontColor,
                }}

                icon={<FontAwesomeIcon icon={faGear}/>}
                shape="circle" size="large"
            />

            <Link to={"/"}>
                <Button
                    icon={<FontAwesomeIcon icon={faChevronLeft}/>}
                    style={{
                        position: "fixed",
                        zIndex: 100,
                        right: "20px",
                        bottom: "75px",
                        backgroundColor: "rgba(0,0,0,0)",
                        color: this.state.fontColor,
                        border: "1px solid " + this.state.fontColor,
                    }}

                    shape="circle" size="large"
                />
            </Link>

            <Modal title="设置"
                   centered={true}
                   closable={true}
                   open={this.state.settingVisible}
                   mask={false}
                   onCancel={() => {
                       this.setState(originSetting);
                       this.setState({settingVisible: false});
                   }}
                   onOk={() => {
                       this.setState(tempSetting, () => {
                           originSetting = this.state;
                           localStorage.setItem("NovelReaderSetting", JSON.stringify(this.state));
                       });
                       this.setState({settingVisible: false});
                   }}
                   okText={"保存"}
                   cancelText={"取消"}
                   maskClosable={false}
            >

                <div>
                    <p style={{margin: "0 0 10px 0"}}>字体大小</p>
                    <Slider
                        min={10}
                        max={50}
                        value={this.state.fontSize.slice(0, -2)}
                        onChange={(value) => {
                            tempSetting.fontSize = value + "px";
                            this.setState(tempSetting);
                        }}
                    />

                    <p style={{margin: "0 0 10px 0"}}>行高</p>
                    <Slider
                        min={1}
                        max={3}
                        step={0.1}
                        value={this.state.lineHeight}
                        onChange={(value) => {
                            tempSetting.lineHeight = value;
                            this.setState(tempSetting);
                        }}
                    />

                    <p style={{margin: "0 0 10px 0"}}>字间距</p>
                    <Slider
                        min={0}
                        max={1}
                        step={0.01}
                        value={this.state.letterSpacing.slice(0, -2)}
                        onChange={(value) => {
                            tempSetting.letterSpacing = value + "em";
                            this.setState(tempSetting);
                        }}
                    />

                    <p style={{margin: "0 0 10px 0"}}>词间距</p>
                    <Slider
                        min={0}
                        max={10}
                        step={0.1}
                        value={this.state.wordSpacing.slice(0, -2)}
                        onChange={(value) => {
                            tempSetting.wordSpacing = value + "px";
                            this.setState(tempSetting);
                        }}
                    />

                    <p style={{margin: "0 0 10px 0"}}>标题大小</p>
                    <Slider
                        min={10}
                        max={50}
                        value={this.state.titleSize.slice(0, -2)}
                        onChange={(value) => {
                            tempSetting.titleSize = value + "px";
                            this.setState(tempSetting);
                        }}
                    />

                    <p style={{margin: "0 0 10px 0"}}>段落缩进</p>
                    <Slider
                        min={0}
                        max={10}
                        step={0.1}
                        value={this.state.textIndent.slice(0, -2)}
                        onChange={(value) => {
                            tempSetting.textIndent = value + "em";
                            this.setState(tempSetting);
                        }}
                    />

                    <p style={{margin: "0 0 10px 0"}}>段落间距</p>
                    <Slider
                        min={0}
                        max={10}
                        step={0.1}
                        value={this.state.textSpacing.slice(0, -2)}
                        onChange={(value) => {
                            tempSetting.textSpacing = value + "em";
                            this.setState(tempSetting);
                        }}
                    />

                    <p style={{margin: "0 0 10px 0"}}>页边距</p>
                    <Slider
                        min={0}
                        max={150}
                        step={1}
                        value={this.state.margin.slice(0, -2)}
                        onChange={(value) => {
                            tempSetting.margin = value + "px";
                            this.setState(tempSetting);
                        }}
                    />

                    <p style={{margin: "0 0 10px 0"}}>字体颜色</p>
                    <HexColorPicker color={this.state.fontColor}
                                    onChange={(value) => {
                                        tempSetting.fontColor = value;
                                        this.setState(tempSetting);
                                    }}/>

                    <p style={{margin: "0 0 10px 0"}}>背景颜色</p>
                    <HexColorPicker color={this.state.backgroundColor}
                                    onChange={(value) => {
                                        tempSetting.backgroundColor = value;
                                        this.setState(tempSetting);
                                    }}/>


                </div>
            </Modal>

            <div style={{
                color: this.state.fontColor, display: "flow-root",
            }}>

                <div className="NovelReader" style={{
                    margin: "20px auto",
                }}
                >
                    <NovelReader
                        textURL={this.props.textURL}
                        fontSize={this.state.fontSize}
                        lineHeight={this.state.lineHeight}
                        letterSpacing={this.state.letterSpacing}
                        wordSpacing={this.state.wordSpacing}
                        titleSize={this.state.titleSize}
                        textIndent={this.state.textIndent}
                        textSpacing={this.state.textSpacing}
                        margin={this.state.margin}
                        fontColor={this.state.fontColor}
                        fontFamily={this.props.fontFamily}
                        fontUrl={this.props.fontUrl}
                    />
                </div>

            </div>
        </div>);
    }
}

// function login(){
//     fetch("http://localhost:8081/login", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             account: document.getElementById("account").value,
//             password: document.getElementById("password").value,
//             timestamp: new Date().getTime()
//         })
//     }).then((response) => {
//         return response.json();
//     }).then((data) => {
//         if (data.error !== null)
//             alert(data.error);
//         else setUserName(data.name);
//     });
// }

export default function App() {
    return (<div>
        <Routes>
            <Route path={"/novel/伤逝"} element={<NovelReaderPage textURL="/novel/伤逝/伤逝.txt"/>}/>
            <Route path={"/novel/2"} element={<NovelReaderPage textURL="/novel/1.txt"/>}/>
            <Route path={"/novel/3"} element={<NovelReaderPage textURL="/novel/2.txt"/>}/>
            <Route path={"/novel/4"} element={<NovelReaderPage textURL="/novel/3.txt"/>}/>

            <Route path={"/"} element={<MainPage/>}/>
        </Routes>
    </div>);
}
