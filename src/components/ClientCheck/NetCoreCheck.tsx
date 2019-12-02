import React, { Component } from 'react'
import { message } from 'antd';

interface Props {

}
interface State {
}

export default class NetCore extends Component<Props, State> {
    state = {
        classid: 'clsid:38845AB9-E654-4C22-BB94-D40F9CDF3DC3'
    }

    version = 0; // 版本
    license = '';   // 授权
    deviceData = ''; // 设备信息

    render() {
        return (
            <div>
                <object
                    id="NetCoreCheck"
                    width="0"
                    height="0"
                    classid={this.state.classid}
                >
                </object>
            </div>
        )
    }
    componentWillMount() {
        console.log('object')

    }
    componentDidMount() {
        console.log(globalThis)
        console.log('object')
        // this.NetCoreInitCheck();
    }




    OpenCMFile() {

    }


}
