/** @format */

import React, { Component } from "react"
import { message, Spin } from "antd"
import CMView from "../../components/ClientView/CMView"
import { get, queryString } from "../../utils/index"
import API from "../../services/API"
import Browser from "../../utils/Browser/index"
import "./CMReader.less"

interface Props {
	location: any
}
interface State {
	clsid: string
	pid: string
	deviceData: string
	cleUrl: string
}

class CMReader extends Component<Props, State> {
	title: string
	constructor(props: Props) {
		super(props)
		const params: any = new URLSearchParams(this.props.location.search)

		this.state = {
			cleUrl: "",
			deviceData: "",
			clsid: "clsid:38845AB9-E654-4C22-BB94-D40F9CDF3DC3",
			pid: params.get("pid"),
		}
		this.title = queryString(location.href).title
	}

	version = 0 // 版本
	license = "" // 授权
	deviceData = "" // 设备信息

	render() {
		const { clsid, pid, deviceData, cleUrl } = this.state
		return (
			<div className='NetCoreCheckBox'>
				<object id='NetCoreCheck' width='0' height='0' classID={clsid} />
				<Spin size='large' spinning={!(cleUrl)} tip='模型加载中...'>
					{cleUrl && (
						<CMView cleUrl={cleUrl} pid={pid} deviceData={deviceData} title={this.title} />
					)}
				</Spin>
			</div>
		)
	}

	async componentDidMount() {
		if (!this.state.pid) {
			return message.error("没有获取到模型id！")
		}
		if (Browser().indexOf("IE") === -1) return message.error("请使用IE浏览器打开！当前浏览器为" + Browser(), 10)
		this.NetCoreInitCheck()
	}

	async NetCoreInitCheck() {
		// const deviceID = this.checkLicense()
		// 	.getVerion()
		// 	.getDeviceData()
		// if (!deviceID) return;
		const res = await get(API.fileInfo.cle, { pid: this.state.pid })
		if (res.success) {
			this.setState({
				cleUrl: res.data.cle,
				// deviceData: deviceID,
			})
		}
	}
	/**
	 * 检查版本
	 */
	getVerion() {
		try {
			this.version = NetCoreCheck.GetCheckVersion && NetCoreCheck.GetCheckVersion()
		} catch (error) {
			message.error(error)
		}
		return this
	}
	/**
	 * 检查授权
	 */
	checkLicense() {
		try {
			this.license = NetCoreCheck.CheckLicense && NetCoreCheck.CheckLicense()

		} catch (error) {
			message.error(error)
		}
		return this
	}
	/**
	 * 获取硬件信息
	 */
	getDeviceData() {
		try {
			this.deviceData = NetCoreCheck.GetDeviceData && NetCoreCheck.GetDeviceData()
			if (!this.deviceData) message.info("获取设备id失败", 8)
			return this.deviceData
		} catch (error) {

			message.error(error)
		}
	}
}

export default CMReader
