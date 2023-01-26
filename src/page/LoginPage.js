import {JSEncrypt} from "jsencrypt";
import {Button, Form, Input, message} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {ax} from "../global";

function RSAEncrypt(str) {
    const e = new JSEncrypt();
    e.setPublicKey('MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALPt0AW3Vsl54rH6XL10KqmV41iXO6Slkc1djvZp9c5kn5ockwnJ982apvhZZIiSC2joExwMXc1JzdMuzjlYFV8CAwEAAQ==');
    return e.encrypt(str);
}

export function LoginPage() {
    return <>
        <div className="page-container" style={{
            display: "flex",
            justifyContent: "center",
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(244,244,244,1)",
        }}>
            <div className="page-login" style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "auto",
                height: "auto",
                padding: "30px",
                alignSelf: "center",
                boxShadow: "0 0 5px 0 rgba(0,0,0,0.3)",
                backgroundColor: "rgba(255,255,255,1)",
                borderRadius: "5%",
            }}>

                <div className="page-login-title" style={{
                    margin: "20px",
                    fontSize: "15pt",
                    fontWeight: "bold",
                    color: "black",
                    userSelect: "none",
                    WebkitUserSelect: "none",
                }}>
                    開発中でございます
                </div>
                <Form
                    initialValues={{remember: true}}
                    onFinish={(values) => {
                        ax.post("/api/novel/login", JSON.stringify({
                            account: values.username, password: RSAEncrypt(values.password), timestamp: Date.now()
                        }), {
                            headers: {
                                "Content-Type": "application/json",
                            }
                        }).then((res) => res.data).then((res) => {
                            if (res.error) {
                                message.error(res.error);
                                return;
                            }
                            document.cookie = `token=${res.token};path=/;max-age=31536000;`;
                            message.success("登录成功");
                            window.location.href = "/";
                        });
                    }}
                >
                    <Form.Item
                        name="username"
                        rules={[{required: true, message: '账号不能为空'}]}
                    >
                        <Input prefix={<UserOutlined/>} placeholder="账号"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{required: true, message: '密码不能为空'}]}
                    >
                        <Input
                            prefix={<LockOutlined/>}
                            type="password"
                            placeholder="密码"
                        />
                    </Form.Item>

                    <Form.Item>
                        <div style={{
                            display: "flex", justifyContent: "space-between"
                        }}>
                            <Button type="primary" htmlType="submit" style={{marginRight: "10px"}}>
                                登录
                            </Button>
                            <Button type="primary" onClick={() => {
                                message.warning("暂未开放");
                            }}>
                                注册
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    </>;

}

export default LoginPage;