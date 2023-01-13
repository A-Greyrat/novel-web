import react from 'react';
import LoadPage from "./LoadPage";
import './ReaderPage.css';

export class NovelReader extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            textURL: props.textURL,
            text: [],
            title: "",
            fontSize: props.fontSize,
            fontColor: props.fontColor,
            backgroundColor: props.backgroundColor,
            fontFamily: props.fontFamily,
            fontUrl: props.fontUrl,
            lineHeight: props.lineHeight,
            letterSpacing: props.letterSpacing,
            wordSpacing: props.wordSpacing,
            textAlign: props.textAlign,
            titleSize: props.titleSize,
            textSpacing: props.textSpacing,
            textIndent: props.textIndent,
            margin: props.margin,
            isLoaded: false
        }
    }

    componentDidMount() {
        if (this.state.textURL !== "") {
            fetch(this.state.textURL)
                .then(response => response.text())
                .then(text => {
                    this.setState({
                        title: text.split("\r")[0].replaceAll("\n", ""), text: text.split("\r").slice(1).map((line) => {
                            return line.replaceAll("\n", "");
                        })
                    });

                    if (this.state.fontUrl !== "") {
                        const ac = new AbortController();
                        setTimeout(() => ac.abort(), 5000);
                        fetch(this.state.fontUrl, {signal: ac.signal})
                            .then(response => response.blob()).then(blob => blob.arrayBuffer()).then(arrayBuffer => {
                            const font = new FontFace(this.state.fontFamily, arrayBuffer);
                            font.load().then((loadedFont) => {
                                document.fonts.add(loadedFont);
                            }).catch(e => console.log(e)).finally(() => {
                                this.setState({isLoaded: true});
                            });
                        }).catch(() => this.setState({isLoaded: true}));
                    } else this.setState({isLoaded: true});
                });
        }
    }

    static getDerivedStateFromProps(props, state) {
        return props !== state ? props : null;
    }

    render() {
        return (<div>
            <LoadPage isLoaded={this.state.isLoaded} color="pink"/>
            <div className="novel-reader" style={{
                color: this.state.fontColor,
                backgroundColor: this.state.backgroundColor,
                fontFamily: this.state.fontFamily + ", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                lineHeight: this.state.lineHeight,
                letterSpacing: this.state.letterSpacing,
                wordSpacing: this.state.wordSpacing,
                textAlign: this.state.textAlign,
                whiteSpace: "pre-wrap",
                marginLeft: this.state.margin,
                marginRight: this.state.margin,
                display: this.state.isLoaded ? "block" : "none",
            }} id={this.state.id}>
                <p style={{
                    fontSize: this.state.titleSize, textAlign: "left", margin: "5px auto", fontWeight: "bold",
                }}>{this.state.title}</p>

                <div style={{
                    width: "100%", height: "1px", backgroundColor: this.state.fontColor, margin: "0 0 0 0",
                }}></div>

                {this.state.text.map((line, index) => {
                    return <p style={{
                        fontSize: this.state.fontSize,
                        textIndent: this.state.textIndent,
                        marginTop: this.state.textSpacing,
                        marginBottom: 0,
                    }} key={index}>{line}</p>
                })}

            </div>

        </div>);
    }

}

NovelReader.defaultProps = {
    fontSize: "20px",
    fontColor: "black",
    backgroundColor: "rgba(255,255,255,0)",
    fontFamily: "sans-serif",
    fontUrl: "",
    lineHeight: "1.5",
    letterSpacing: "0.1em",
    wordSpacing: "0px",
    textAlign: "left",
    titleSize: "1.5em",
    textIndent: "1.5em",
    textSpacing: "5px",
    margin: "0",
}

export class MdReader extends react.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (<div>
        </div>);
    }
}
