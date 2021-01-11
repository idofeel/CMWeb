/* eslint-disable */

import JSZip from 'jszip'
// import { scleCustomEvent } from '../utils'
/**
 *
//  */
// let g_sclehttp = null
// class SCLE_CONTROLLER {
// 	getByRequest(url) {
// 		g_sclehttp = new XMLHttpRequest()
// 		g_sclehttp.addEventListener('progress',(evt) => {scleCustomEvent('updateProgress', evt)},false)
// 		g_sclehttp.addEventListener('load', this.transferComplete, false)
// 		g_sclehttp.addEventListener('error', this.transferFailed, false)
// 		g_sclehttp.addEventListener('abort', this.transferCanceled, false)
// 		g_sclehttp.open('GET', url, true) // true 表示异步，false表示同步
// 		g_sclehttp.responseType = 'arraybuffer' // XMLHttpRequest Level 2 规范中新加入了 responseType 属性 ，使得发送和接收二进制数据变得更加容易
// 		g_sclehttp.onreadystatechange = (e) => this.readcleStreamChange(e)
// 		g_sclehttp.send()
// 	}

// 	transferComplete(evt) {}
// 	transferFailed(evt) {}
// 	transferCanceled(evt) {}

// 	readcleStreamChange(evt) {
// 		if (g_sclehttp.readyState === 4 && g_sclehttp.status === 200) {
// 			// 4 = "loaded" // 200 = OK
// 			this.startLoadFile(g_sclehttp.response)
// 		}
// 	}

// 	starLoadNetCLEFile() {
// 		// 解析cle文件
// 		var bResult = ParseCleStream()
// 		if (bResult) {
// 			// alert("An error occurred while transferring the file.");
// 		}
// 		window.g_arrayByteBuffer = null
// 		window.g_arrayCleBuffer = null
// 		g_sclehttp = null
// 		// 绘制三维模型
// 		startRender()
// 		scleCustomEvent('scleStreamReady')
// 		window.setPickObjectParameters = () => scleCustomEvent('pickParams')
// 	}

// 	//  加载本地文件
// 	loadLocalFile(e) {
// 		const sclereader = new FileReader()
// 		sclereader.readAsArrayBuffer(e.files[0])
// 		const self = this
// 		sclereader.onload = () => self.startLoadFile(sclereader.result)
// 	}

// 	async startLoadFile(res) {
// 		const new_zip = new JSZip()
// 		const zip = await new_zip.loadAsync(res)
// 		const key = function () {
// 			for (let i in zip.files) {
// 				return i
// 			}
// 		}
// 		const arrBuffer = await zip.files[key()].async('arraybuffer')
// 		window.g_arrayByteBuffer = arrBuffer
// 		window.g_arrayCleBuffer = new DataView(
// 			arrBuffer,
// 			0,
// 			arrBuffer.byteLength
// 		)
// 		this.starLoadNetCLEFile()
// 	}
// }
window.JSZip = JSZip
// window.Scle = new SCLE_CONTROLLER()
export default window.Scle
