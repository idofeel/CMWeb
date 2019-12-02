import React, { Component } from 'react'
import { message } from 'antd';
import CMView from '../../components/ClientView/CMView';
import { get } from '../../utils/index';
import API from '../../services/API';

interface Props {
    location: any
}
interface State {
    clsid: string;
    pid: string;
    deviceData: string;
}

class CMReader extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const params: any = new URLSearchParams(this.props.location.search);

        this.state = {
            clsid: 'clsid:38845AB9-E654-4C22-BB94-D40F9CDF3DC3',
            deviceData: '',
            pid: params.get('pid')
        }
    }

    version = 0; // 版本
    license = '';   // 授权
    deviceData = ''; // 设备信息

    render() {
        const { clsid, pid, deviceData } = this.state;
        return (
            <div>
                <object
                    id="NetCoreCheck"
                    width="0"
                    height="0"
                    classID={clsid}
                />
                {deviceData && <CMView
                    pid={pid}
                    deviceData={deviceData}
                    title="哈哈哈"
                />}
            </div>
        )
    }

    async componentDidMount() {
        if (!this.state.pid) { return message.error('没有获取到模型id！') };
        this.NetCoreInitCheck();
        this.getCLEFileInfo()
    }

    async getCLEFileInfo() {
        await get(API.fileInfo.les, { pid: this.state.pid });
    }

    NetCoreInitCheck() {
        this.checkLicense().getVerion().getDeviceData();
    }
    /**
     * 检查版本
     */
    getVerion() {
        try {
            this.version = NetCoreCheck.GetCheckVersion && NetCoreCheck.GetCheckVersion();
        } catch (error) {
            message.error(error);
        }
        return this;
    }
    /**
     * 检查授权
     */
    checkLicense() {
        try {
            this.license = NetCoreCheck.CheckLicense && NetCoreCheck.CheckLicense();
        } catch (error) {
            message.error(error);
        }
        return this;
    }
    /**
     * 获取硬件信息
     */
    getDeviceData() {
        try {
            this.deviceData = NetCoreCheck.GetDeviceData && NetCoreCheck.GetDeviceData();
            if (this.deviceData) {
                this.setState({
                    deviceData: this.deviceData
                });
            } else {
                message.error('请使用IE浏览器打开！');
            }
        } catch (error) {
            message.error(error);
        }
        return this;
    }


}

export default CMReader