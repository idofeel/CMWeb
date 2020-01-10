import * as React from 'react';
import { Progress } from 'antd';

export interface ISCLEProps {
}

export interface ISCLEState {
}

let { g_sclehttp, g_loaded_pos, NetTimeTimeID, g_arrayCleBuffer, g_strResbaseUrl, startRender, ParseCleStream } = window
export default class SCLE extends React.Component<ISCLEProps, ISCLEState> {

	constructor(props: ISCLEProps) {
		super(props);

		this.state = {
			percent: 0
		}

	}

	public render() {
		return (
			<div>13
         <Progress percent={this.state.percent} />
			</div>
		);
	}
	componentDidMount() {
		console.log('componentDidMount');

		window.g_sclehttp.addEventListener("progress", this.updateProgress, false);


	}

	getByRequest = (url: string) => {
		g_sclehttp = new XMLHttpRequest();

		// 为事件添加事件监听，这些事件在使用 XMLHttpRequest 执行数据传输时被发出。
		g_sclehttp.addEventListener("progress", this.updateProgress, false);
		g_sclehttp.addEventListener("load", this.transferComplete, false);
		g_sclehttp.addEventListener("error", this.transferFailed, false);
		g_sclehttp.addEventListener("abort", this.transferCanceled, false);

		g_sclehttp.open("GET", url, true);                                  // true 表示异步，false表示同步
		g_sclehttp.responseType = "arraybuffer";                            // XMLHttpRequest Level 2 规范中新加入了 responseType 属性 ，使得发送和接收二进制数据变得更加容易 
		g_sclehttp.overrideMimeType("text/plain; charset=x-user-defined");  // XMLHttpRequest 一般用来发送和接收文本数据，overrideMimeType方法强制XMLHttpRequest发送二进制数据
		g_sclehttp.onreadystatechange = this.ReadcleStreamChange;
		g_sclehttp.send();
	}
	updateProgress = (evt: any) => {
		// progress 事件的 lengthComputable 属性存在时，可以计算数据已经传输的比例(loaded 已传输大小，total 总大小）
		if (evt.lengthComputable) {
			this.setState({
				percent: parseInt(evt.loaded / evt.total * 100)
			})
			console.log('updateProgress', evt.loaded / evt.total);
			//  var percentComplete = evt.loaded / evt.total;
			// g_nCleBufferlength = evt.total;
			// this.g_loaded_pos = evt.loaded;
			// g_nCleBufferlength = evt.total;
			g_loaded_pos = evt.loaded;
		}
		else {
		}
	}
	transferComplete = (evt: any) => {
		// alert("The transfer is complete.");
	}

	transferFailed = (evt: any) => {
		// alert("下载文件失败！");
	}

	transferCanceled = (evt: any) => {
		// alert("下载已取消！");
	}
	StarLoadNetCLEFile = () => {
		// 去掉定时器的方法
		window.clearTimeout(NetTimeTimeID);

		// 解析cle文件
		let bResult = ParseCleStream();
		if (bResult) {
			// alert("An error occurred while transferring the file.");
		}

		// 释放内存
		// g_sclehttp.response = null;
		g_arrayCleBuffer = null;
		g_sclehttp = null;

		// 绘制三维模型
		startRender();
	}
	ReadcleStreamChange = () => {
		if (g_sclehttp.readyState === 4 && g_sclehttp.status === 200) { // 4 = "loaded" // 200 = OK
			g_arrayCleBuffer = g_sclehttp.response;

			// 循环执行，每隔0.1秒钟执行一次
			NetTimeTimeID = window.setInterval(this.StarLoadNetCLEFile, 100);
		}
	}


}
