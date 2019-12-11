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
	sleep(time: number) {
		return new Promise(function (resolve, reject) {
			setTimeout(() => {
				resolve();
			}, time);
		});
	}
	InitCLE() {
		// 检测CMWeb控件是否安装     
		try {
			var ver = CMWeb.GetVerion();
			if (ver < 1001007) {
				// 检测控件新增接口时使用，
				// 提示下载升级新版本
				return;
			}

		}
		catch (err) {
			if (confirm('您尚未安装CMWeb控件')) {
				// windows.location=''; //引号里可以写控件的下载地址url
			}
			return;
		}

		// // 初始化CLE引擎
		// if (CMWeb.Init3DViewer(0) != 0) {
		// 	alert("通用模型控件初始化失败！");
		// }

		// 初始化CLE引擎
		var nResult = CMWeb.Init3DViewer(0);

		if (nResult == 6) {
			alert("初始化错误");
			return;
		}

		else if (nResult == 11) {
			alert("激活窗口错误");
			return;
		}

		// 获取硬件信息
		var deviceInfo = CMWeb.GetDeviceData();
		// alert(deviceInfo);

		// 打开CLE文件
		const { pid, cleUrl, deviceData } = this.props
		// let cleUrl = "http://fm.aijk.xyz/rs/120/5b5ac8b006d0abe225e5867b68b8/9eba.cle"
		let lesUrl: string = `http://fm.aijk.xyz/?r=cle&d=les&pid=${pid}&d=les&devid=${deviceInfo}`

		this.OpenDRMFile(cleUrl, lesUrl)
	}



	async componentDidMount() {
		// 拦截判断是否离开当前页面
		window.addEventListener("beforeunload", this.beforeunload)
		this.InitCLE();
		// const { pid, cleUrl, deviceData } = this.props
		// // let cleUrl = "http://fm.aijk.xyz/rs/120/5b5ac8b006d0abe225e5867b68b8/9eba.cle"
		// let lesUrl: string = `http://fm.aijk.xyz/?r=cle&d=les&pid=${pid}&d=les&devid=${deviceData}`

		// this.OpenDRMFile(cleUrl, lesUrl)
		// alert(`cleFileUrl:${url}    lesFileUrl:${`${url}&d=les&devid=${deviceData}`}`)
	}

	getVerion() {
		try {
			var version = CMWeb.GetVerion && CMWeb.GetVerion()
		} catch (error) { }

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
		} catch (error) { }
	}

	HideUI() {
		try {
			CMWeb.ShowToolbar(0)
			CMWeb.ShowNavigationPane(0, 200)
			CMWeb.ShowPropertyPane(0, 200)
			// CMWeb.ShowTextPane(0, 50);
			// CMWeb.ShowControlPane(0, 40);
		} catch (error) { }
	}

	closeFile() {
		try {
			// CMWeb.CloseFile()
			// CMWeb.UnInit3DViewer()
		} catch (error) {
		} finally {
			window.close();
		}
	}

	OpenDRMFile(cleFileUrl: string, lesFileUrl: string) {
		try {
			CMWeb.OpenDRMFile(cleFileUrl, lesFileUrl)
		} catch (error) { }
	}
	componentWillUnmount() {
		// this.closeFile()
		window.removeEventListener("beforeunload", this.beforeunload)
	}

	beforeunload(e) {
		// debugger
		CMWeb.CloseFile()
		CMWeb.UnInit3DViewer()
		// return false;
	}
}

export default CMView
