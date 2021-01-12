import React, { useEffect, useRef, useState } from 'react'
import { message, Popover, Progress, Table } from 'antd'
import { get, queryString } from '../utils'
import ScleToolsBar from './scleTools/scleToolsBar'
// import ScleTools from './scleTools'
import API from '../services/API';
import { IsPhone } from '../utils/Browser'
import scleControl from './scleControl'
import './scle.less'
const logo = require('../assets/images/downloadAppIcon.png')

function ScleView() {
	const [isFullScreen, setFullscreen] = useState(false)
	const [loading, setLoading] = useState(true)
	const [isHttp] = useState(window.location.origin.startsWith('http'))
	const [percent, setPercent] = useState(0)
	const [notation, setNotation] = useState({})
	const [showTools, toggleTools] = useState(true)
	const [coordinates, setCoords] = useState({
		content: '',
		x: 0,
		y: 0
	})

    const [visible, setVisible] = useState(false)
    const downloadMsg = ['模型下载中...', '模型打开中,请稍等...','模型下载失败']
    const [msgCode, setMsgCode] =  useState(0) 
    

	const containerRef = useRef()

	const addScleEvent = () => {
		window.isPhone = IsPhone()
		// containerRef.current.addEventListener('transitionend', function () {
		// 	window.canvasOnResize && window.canvasOnResize()
		// })
		;[
			'fullscreenchange',
			'webkitfullscreenchange',
			'mozfullscreenchange',
			'MSFullscreenChange'
		].forEach((item, index) => {
			window.addEventListener(item, () => {
				const isfull =
					document.fullScreen ||
					document.mozFullScreen ||
					document.webkitIsFullScreen ||
					!!document.msFullscreenElement
				setFullscreen(isfull)
				window.canvasOnResize()
		})
		})
	}

	const addScleAPi = () => {
		scleControl.toggleTools = (bl) => toggleTools(bl)
		scleControl.setTips = (options) => {
			if (!options.objID) return
			setNotation({ ...options, type: options.type || null })
			const pos = window.getObjectsCenter(options.objID)[0]
			// 设置提示数据
			let top = pos.y,
				left = pos.x

			if (options.type === 'table') {
				// 表格形式
				top = 0
				left = 0
			} else if (options.type === 'lead') {
				// 引线批注
				top -= 85
			}
			// 设置批注样式
			setCoords({
				top,
				left,
				content: options.content
			})
			setVisible(true)
		}

		scleControl.refreshNotation = (parmas) => {
			scleControl.setTips({ ...notation, ...parmas })
		}

		scleControl.setTipsVisible = (bl) => {
			setVisible(bl)
		}
	}

	const openScle = () => {
		let { title, link, pid, lic } = queryString(window.location.href)
        document.title = title || '三维模型'
        if(pid){
            return openNetSCle(pid, lic)
        }
		if (link) {
			window.g_strResbaseUrl = link.replace(/(.scle|.zip|.cle)$/, '/')
            window.Scle.getByRequest(link)
			return
		} else {
			message.warning('请输入正确的链接')
		}
    }

    const openNetSCle = async function (pid, lic) {
		let files;
        try {
			files = await get(API.fileInfo.cle, { pid, lic })
		} catch (error) {
			console.log(error);
        }
        
        if (files.success) {
			let { cle } = files.data;
			window.g_strResbaseUrl = cle.replace(/(.cle)$/, '/');
			// // getByRequest(cle.replace(/(.cle)$/, '.scle'))
			// getByRequest('../../src/assets/68b0.scle')
            // canvasOnResize()
            window.Scle.getByRequest(cle.replace(/(.cle)$/, '.scle'))
            // 
            // window.Scle.getByRequest('../../src/assets/68b0.scle')
			// console.log('openCle', window.g_strResbaseUrl, cle.replace(/(.cle)$/, '.scle'));
		} else {
			message.error(files.faildesc)
		}


    }

	const onProgress = ({ detail: evt }) => {
		if (evt.lengthComputable) {
			let percentComplete = evt.loaded / evt.total
			window.g_nCleBufferlength = evt.total

			setPercent(Math.floor(percentComplete * 100))

			if (percentComplete === 1) {
                setMsgCode(1)
                loadingChage(false)
			}
        }
        
        if (evt.target.status === 404) {
            setMsgCode(2)
        }
	}

	const loadingChage = (b) => {
		setLoading(b)
		window.canvasOnResize && window.canvasOnResize()
    }
    
	useEffect(() => {
		window.addEventListener('updateProgress', onProgress)
		window.addEventListener('transferFailed', () => setMsgCode(2) )
		// scleCustomEvent('scleViewOnReady')

		// window.addEventListener('load', () => {
			if (isHttp) openScle()
			addScleAPi()
        // })

		window.addEventListener('scleStreamReady', () => {
			loadingChage(false)
			addScleEvent()
		})

		window.addEventListener('resize', () => {
			scleControl.refreshNotation()
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const onVisibleChange = () => {
		if (notation.type === 'table') {
			// setNotation({
			// 	type: null
			// })
		} else {
			setVisible(false)
		}
	}

	return (
		<div
			className={isFullScreen ? 'fullScreen container' : 'container'}
			ref={containerRef}
		>
			<>
				<canvas id="glcanvas" width="800" height="600"></canvas>
				<canvas id="text" width="800" height="600"></canvas>
			</>
			{loading ? (
				<div className="scle_loading">
					{isHttp ? (
						<div className="scle_loadImg">
							<img src={logo} alt="loading" />
							<Progress
								strokeColor={{
									'0%': '#108ee9',
									'100%': '#87d068'
								}}
								percent={percent}
								status="active"
							/>
							<p>{downloadMsg[msgCode]}</p>
						</div>
					) : null}
				</div>
			) : (
                showTools && <ScleToolsBar></ScleToolsBar>
                // showTools && <ScleTools></ScleTools>
                
			)}
			{visible && notation.type !== null && (
				<Popover
					content={coordinates.content}
					title={null}
					placement="top"
					trigger="click"
					visible={true}
					overlayClassName={`scleViewPopver ${
						notation.type === 'lead' ? 'hideArrow' : ''
					}`}
					onVisibleChange={onVisibleChange}
				>
					<div
						className={`gltext ${
							notation.type === 'lead' ? 'gltext2' : ''
						}`}
						style={{
							top: coordinates.top,
							left: coordinates.left
						}}
					></div>
				</Popover>
			)}

			{notation.type === 'table' && (
				<div className="gltext" style={notation.tableStyle}>
					<Table {...notation} />
				</div>
			)}

			{/* getobjectscenter */}
		</div>
	)
}

export default ScleView
