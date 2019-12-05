/** @format */

import React, { Component } from "react"
import "./CMView.less"
import { Switch, Icon, Typography } from "antd"

const { Title } = Typography
interface Props {
	pid?: number | string // cle 文件地址
	deviceData?: string
	title?: string
	cleUrl: string
}
interface State {
	viewID: string
	initType: number
}

// interface OpenDRMFile {
//     cleFileUrl: string;
//     lesFileUrl: string;
// }

class CMView extends Component<Props, State> {
	static defaultProps = {
		pid: 4,
		deviceData: "",
		title: "",
	}

	state = {
		viewID: "clsid:42C5A21C-6FCC-4042-A62B-C8B8D28EBB62",
		initType: 0,
	}
	render() {
		return (
			<div className='CMWebContainer'>
				<div className='CMTools'>
					<Switch
						className='uiContainer'
						checkedChildren='显示'
						unCheckedChildren='隐藏'
						onChange={(checked) => {
							checked ? this.ShowUI() : this.HideUI()
						}}
					/>
					<Title level={4}>{this.props.title}</Title>
					<a
						href='#'
						onClick={(e) => {
							e.preventDefault()
							this.closeFile()
							window.close()
						}}
					>
						<Icon type='close' />
					</a>
				</div>
				<object id='CMWeb' classid={this.state.viewID} />
			</div>
		)
	}

	componentWillMount() {
		// 拦截判断是否离开当前页面
		window.addEventListener("beforeunload", this.beforeunload)
	}

	componentDidMount() {
		CMWeb.Init3DViewer && CMWeb.Init3DViewer(this.state.initType)
		// this.ShowUI()
		const { pid, deviceData } = this.props
		let cleUrl = "http://fm.aijk.xyz/rs/120/5b5ac8b006d0abe225e5867b68b8/9eba.cle"
		let lesUrl: string = `http://fm.aijk.xyz/?r=cle&d=les&pid=4&d=les&devid=${deviceData}`

		this.OpenDRMFile(cleUrl, lesUrl)
		// alert(`cleFileUrl:${url}    lesFileUrl:${`${url}&d=les&devid=${deviceData}`}`)
	}

	getVerion() {
		try {
			var version = CMWeb.GetVerion && CMWeb.GetVerion()
		} catch (error) {}

		// alert("" + version);
	}

	ShowUI() {
		try {
			CMWeb.ShowToolbar(1)
			CMWeb.ShowNavigationPane(1, 200)
			CMWeb.ShowPropertyPane(1, 200)
			// CMWeb.ShowTextPane(1, 50);
			// CMWeb.ShowControlPane(1, 40);
			CMWeb.UpdateNavigationPaneItem("0;1;2;3")
			CMWeb.UpdatePropertyPaneItem("4;5;6")
		} catch (error) {}
	}

	HideUI() {
		try {
			CMWeb.ShowToolbar(0)
			CMWeb.ShowNavigationPane(0, 200)
			CMWeb.ShowPropertyPane(0, 200)
			// CMWeb.ShowTextPane(0, 50);
			// CMWeb.ShowControlPane(0, 40);
		} catch (error) {}
	}

	closeFile() {
		try {
			CMWeb.CloseFile()
			CMWeb.UnInit3DViewer()
		} catch (error) {
		} finally {
		}
	}

	OpenDRMFile(cleFileUrl: string, lesFileUrl: string) {
		try {
			CMWeb.OpenDRMFile(cleFileUrl, lesFileUrl)
		} catch (error) {}
	}
	componentWillUnmount() {
		this.closeFile()
		window.removeEventListener("beforeunload", this.beforeunload)
	}

	beforeunload(e) {
		CMWeb.CloseFile()
		CMWeb.UnInit3DViewer()

		// return false;
	}
}

export default CMView
