import * as React from 'react';
import { Button, message, Switch, Row, Col, Popover, List } from 'antd';
import { get, domain, joinUrlEncoded, queryString } from '../utils';
import API from '../services/API';
import './index.less'

export interface ICMReaderPageProps {
}

export interface ICMReaderPageState {
    title: string
    visible: boolean
}

interface IcontrolTools {

}
// let { CMWeb = {} }: any = window
export default class CMReaderPage extends React.Component<ICMReaderPageProps, ICMReaderPageState> {
    constructor(props: ICMReaderPageProps) {
        super(props);

        this.state = {
            title: '',
            visible: true,

        }
    }

    public render() {
        const controlTools = [
            {
                title: '导航栏', checked: false,
                method: (checked: boolean) => {
                    try {
                        CMWeb.ShowNavigationPane(checked ? 1 : 0, 200); // 显示工具栏 
                        checked && CMWeb.UpdateNavigationPaneItem("0;1;2;3") // 更新工具栏
                    } catch (error) {

                    }

                }
            },
            {
                title: '文字栏', checked: false,
                method: (checked: boolean) => {
                    try {
                        CMWeb.ShowTextPane(checked ? 1 : 0, 50)
                    } catch (error) {

                    }
                }
            },
            {
                title: '控制栏', checked: false,
                method: (checked: boolean) => {
                    try {
                        CMWeb.ShowControlPane(checked ? 1 : 0, 40)
                    } catch (error) {

                    }
                }
            },
            {
                title: '工具栏', checked: false,
                method: (checked: boolean) => {
                    try {
                        CMWeb.ShowToolbar(checked ? 1 : 0)
                    } catch (error) {

                    }
                }
            },
            {
                title: '属性栏', checked: false,
                method: (checked: boolean) => {
                    try {
                        CMWeb.ShowPropertyPane(checked ? 1 : 0, 200);
                        checked && CMWeb.UpdatePropertyPaneItem("0;1;2;3")
                    } catch (error) {
                    }
                }
            },
        ]
        return (
            <div className="CMReader_View">
                {/* <Switch onChange={this.toggleTools} /> */}
                <Popover
                    className="CMReader_Popover"
                    placement="bottomLeft"
                    content={
                        <List
                            itemLayout="vertical"
                            dataSource={controlTools}
                            renderItem={(item: any, index: number) => {
                                return <List.Item extra={<Switch onChange={item.method} />}>{item.title}</List.Item>
                            }}
                        ></List>}
                    title="视图控制"
                    trigger="click"
                    // visible={this.state.visible}
                    onVisibleChange={this.handleVisibleChange}
                >
                    <Button icon="setting" type="primary"></Button>
                </Popover>
                <h3>{this.state.title}</h3>
                <Button type="link" icon="close" onClick={() => {
                    window.close();
                }} />
            </div>
        );
    }

    toggleTools = (checked: boolean) => {
        checked ? this.ShowUI() : this.HideUI()
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.beforeunload);
        window.onload = () => {
            setTimeout(() => {
                this.InitCLE();
            })
        }
    }
    async InitPage() {
        const { pid, title = '三维模型' } = queryString(location.href)
        this.setState({ title })
        if (!pid) return message.error('获取pid失败，请重新打开！');
        const req1 = get(API.fileInfo.cle, { pid }),
            req2 = get(API.serverinfo)

        const [file, server] = await Promise.all([req1, req2])
        if (file.success && server.success) {

            const devid = CMWeb.GetDeviceData();
            const filesize = file.data.filesize,
                cleFile = file.data.cle,
                contentid = file.data.id,
                lesFile = joinUrlEncoded(domain + API.fileInfo.les, { pid, devid }),
                serverid = server.data.serverid;
            // console.log('OpenDRMFile', devid);
            // console.log('cleFile:' + cleFile);
            // console.log('lesFile:' + lesFile);
            // console.log('serverid:' + serverid);
            // console.log('contentid:' + contentid);
            // console.log('title:' + title);
            // console.log('filesize:' + filesize);
            // console.log(CMWeb.GetDeviceData, window, CMWeb.OpenDRMFile);
            CMWeb.OpenDRMFile(cleFile, lesFile, serverid, contentid, title, filesize);
            // console.log('CMWeb.OpenDRMFile:' + filesize);

        }
    }
    InitCLE() {
        // return;
        // 检测浏览器
        if (this.isBrowser() != 'IE') {
            location.href = location.href.replace(/cmweb.html/, 'scle.html')
            return;
        }

        // 检测CMWeb控件是否安装     
        try {
            var ver = CMWeb.GetVerion();
            // if (ver < 1001007) {
            //     // 检测控件新增接口时使用，
            //     // 提示下载升级新版本
            //     location.href = location.href.replace(/cmweb.html/, 'scle.html')
            //     return;
            // }
        }
        catch (err) {
            location.href = location.href.replace(/cmweb.html/, 'scle.html')
            return;
        }

        // 初始化CLE引擎
        var nResult = CMWeb.Init3DViewer(0);
        if (nResult == 6) {
            message.error("初始化错误");
            return;
        }
        else if (nResult == 11) {
            message.error("激活窗口错误");
            return;
        }

        setTimeout(() => {
            this.InitPage()
        })
        // 获取硬件信息
        // var deviceInfo = CMWeb.GetDeviceData();
        // message.error(deviceInfo);

        // 打开CLE文件
        // CMWeb.OpenFile("d:\\1.cle");

        // http://39.98.156.22/rs_scle/CMWeb.html
        // CMWeb.OpenDRMFile("http://39.98.156.22/rs_scle/DRM测试样例.cle", "http://39.98.156.22/rs_scle/DRM测试样例.les");
    }

    isBrowser() {
        var userAgent: any = navigator.userAgent;
        //微信内置浏览器
        if (userAgent.match(/MicroMessenger/i) == 'MicroMessenger') {
            return "MicroMessenger";
        }
        //QQ内置浏览器
        else if (userAgent.match(/QQ/i) == 'QQ') {
            if (!!window.ActiveXObject || "ActiveXObject" in window) {
                return "IE";
            } else {
                return "QQ";
            }
        }
        //Chrome
        else if (userAgent.match(/Chrome/i) == 'Chrome') {
            return "Chrome";
        }
        //Opera
        else if (userAgent.match(/Opera/i) == 'Opera') {
            return "Opera";
        }
        //Firefox
        else if (userAgent.match(/Firefox/i) == 'Firefox') {
            return "Firefox";
        }
        //Safari
        else if (userAgent.match(/Safari/i) == 'Safari') {
            return "Safari";
        }
        //IE
        else if (!!window.ActiveXObject || "ActiveXObject" in window) {
            return "IE";
        } else {
            return "未定义:" + userAgent;
        }
    }

    UnitCLE() {
        // 关闭CLE
        CMWeb.CloseFile();
        // 释放CLE引擎
        CMWeb.UnInit3DViewer();
    }

    ShowUI() {
        // CMWeb.ShowToolbar(1);
        // CMWeb.ShowNavigationPane(1, 200);
        // CMWeb.ShowPropertyPane(1, 200);
        // CMWeb.ShowTextPane(1, 50);
        // CMWeb.ShowControlPane(1, 40);
        // CMWeb.UpdateNavigationPaneItem("0;1;2;3");
        // CMWeb.UpdatePropertyPaneItem("4;5;6");
        try {
            CMWeb.ShowToolbar(1)
            CMWeb.ShowNavigationPane(1, 200)
            CMWeb.ShowPropertyPane(1, 200)
            // CMWeb.ShowTextPane(1, 50);
            // CMWeb.ShowControlPane(1, 40);
            CMWeb.UpdateNavigationPaneItem("0;1;2;3")
            CMWeb.UpdatePropertyPaneItem("4;5;6")
        } catch (error) { }
    }

    HideUI() {
        CMWeb.ShowToolbar(0);
        CMWeb.ShowNavigationPane(0, 200);
        CMWeb.ShowPropertyPane(0, 200);
        CMWeb.ShowTextPane(0, 50);
        CMWeb.ShowControlPane(0, 40);
    }

    playFile() {
        CMWeb.PlayFile();
    }

    UpdateOption() {
        CMWeb.UpdateOption();
    }

    beforeunload() {
        this.UnitCLE();
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.beforeunload);
    }
}
