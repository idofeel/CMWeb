import {
	Drawer,
	Icon,
	message,
    notification,
	Popover,
	Radio,
	Slider,
	Tabs,
	Tooltip
} from 'antd'
import { PureComponent } from 'react'
import { ChromePicker } from 'react-color'
import {
	fullScreen,
	exitFullscreen,
	IEVersion,
	IsPhone
} from '../../utils/Browser'
import ScleAttrTree from '../scleAttrTree/ScleAttrTree'
import './scleTools.less'
import { scleCustomEvent } from '../../utils'

const IconFont = Icon.createFromIconfontCN({
	// scriptUrl: '//at.alicdn.com/t/font_1616415_x0co1i09pnp.js'
	scriptUrl: './js_min/localiconfont/iconfont.js'
})
const { TabPane } = Tabs

message.config({
	maxCount: 1
})
export default class scleTools extends PureComponent {
	#toolsKeyIndex = {
		visibleIndex: 3,
		alphaIndex: 5,
		fullScreen: 9
	}
	#tools = [
		{ type: 'home', title: '复位', onClick: () => window.setHome() },
		{
			type: 'drag',
			title: '移动零件'
			// onClick: () => this.isPickNull(() => window.moveModel())
		},
		{
			type: 'apartment',
			title: '模型树',
			onClick: () => this.drawerToggle()
		},
		{ type: 'eye-invisible', title: '隐藏' },
		{ type: 'bg-colors',resetTheme:true, title: '颜色', popover: () => this.renderColor() },
		{
			type: 'icon-toumingdu',
			title: '透明度',
			isFont: true,
			popover: () => this.renderSlider()
		},
		{
			type: 'icon-background-l',
			// title: "背景色",
			isFont: true,
			popover: () => this.renderBackground()
		},
		{
			type: 'icon-box',
			isFont: true,
			popover: () => this.renderViewDire()
		},
		{
			type: 'play-circle',
			title: '播放',
			onClick: () => {
				this.setState({
					tools: [...this.#playerTools]
				})
			}
		},
		{ type: 'fullscreen', title: '全屏' }
	]

	#playerTools = [
		{
			type: 'pause-circle',
			title: '暂停'
		},
		{
			type: 'renderPlayerBar',
			tabComponent: () => this.renderPlayerBar()
		},
		{
			type: 'icon-Stop',
			isFont: true,
			title: '停止',
			onClick: () => this.playerStop()
		}
	]

	state = {
		activeTab: null,
		tools: [...this.#tools],
		background: {
			// 调色板
			r: 255,
			g: 0,
			b: 0,
			a: 1
		},
		playPercent: 0,
		alpha: 1,
		drawerVisible: false
	}
	isMove = false
	totalFrames = 0

	componentDidMount() {
		window.isPhone = IsPhone()

		// window.addEventListener("fullscreenchange", () =>
		//   this.fullScreenHandle(!!document.fullscreenElement)
		// );
		// // IE
		// window.addEventListener("MSFullscreenChange", () =>
		//   this.fullScreenHandle(document.msFullscreenElement != null)
		// );
		;[
			'fullscreenchange',
			'webkitfullscreenchange',
			'mozfullscreenchange',
			'MSFullscreenChange'
		].forEach((item, index) => {
			window.addEventListener(item, () => {
				this.fullScreenHandle(
					document.fullScreen ||
						document.mozFullScreen ||
						document.webkitIsFullScreen ||
						!!document.msFullscreenElement
				)
			})
		})
		if (window.g_GLData) {
			this.scleStreamReady()
		}
		window.addEventListener(
			'scleStreamReady',
			this.scleStreamReady.bind(this),
			{
				passive: false
			}
		)

		window.addEventListener(
			'pickParams',
			this.pickObjectParameters.bind(this),
			{ passive: false }
		)

		window.addEventListener(
			'resize',
			() => {
				const newTools = this.state.tools.map((i) => {
					i.visible = false
					return i
				})
				this.setState({ activeTab: null, tools: [...newTools] })
			},
			{ passive: false }
		)

		window.addEventListener('stopAnimation', () => {
			// this.playerStop()
			this.setState({
				tools: [...this.#playerTools]
			})
		})
	}
	componentWillUnmount() {
		window.removeEventListener(
			'scleStreamReady',
			this.scleStreamReady.bind(this),
			{
				passive: false
			}
		)
		window.removeEventListener(
			'pickParams',
			this.pickObjectParameters.bind(this),
			{ passive: false }
		)
		this.setState = () => {}
	}
	//   scleStreamReady
	scleStreamReady() {
		this.totalFrames = window.getTotalFrames()
		window.setAnmiIcon = this.setAnmiIcon
		window.getCurFrame = (CurFrame) => this.getCurFrame(CurFrame)
	}

	render() {
		return (
			<>
				<Drawer
					title={null}
					closable={false}
                    mask={false}
                    maskClosable={false}
					placement="left"
					width="auto"
					visible={this.state.drawerVisible}
					getContainer={false}
					bodyStyle={{ padding: 0 }}
					onClose={() => this.hideDrawer()}
					className="cleTreeDrawer"
				>
					<ScleAttrTree
						ref={(el) => (this.sclAttrTree = el)}
					></ScleAttrTree>
				</Drawer>
				<div className="scleToolsBar">
					<Tabs
						activeKey={this.state.activeTab}
						tabPosition="bottom"
						animated={false}
						onChange={(activeTab) => this.setState({ activeTab })}
					>
						{this.renderTools()}
					</Tabs>
				</div>
			</>
		)
	}

	drawerToggle() {
		this.setState({
            drawerVisible: !this.state.drawerVisible,
            activeTab: !this.state.drawerVisible ?  this.state.activeTab: null
		})
	}
	hideDrawer() {
		this.setState({
			drawerVisible: false,
			activeTab: null
		})
	}
	renderTools() {
		const { tools } = this.state
		return tools.map((item, index) => (
			<TabPane
				tab={
					item.tabComponent
						? item.tabComponent(item, index)
						: IsPhone()
						? this.renderPopover(item, index)
						: this.renderTipsPopover(item, index)
				}
				key={item.type}
			></TabPane>
		))
	}

	renderTipsPopover(item, index) {
		return (
			<Tooltip title={item.title}>
				{this.renderPopover(item, index)}
			</Tooltip>
		)
	}
	renderPopover(item, index) {
		return item.popover ? (
			<Popover
				content={item.popover()}
				trigger="click"
				visible={item.visible}
				onVisibleChange={(visible) => {
					if (
						this.state.activeTab === 'icon-toumingdu' &&
						IsPhone()
					) {
						return
					}
                    this.changeVisible(visible, index)
                    if(!visible && item.resetTheme){
                        this.setState({
                          activeTab:null
                        })
                    }
				}}
			>
				{this.renderToolsIcon(item, index)}
			</Popover>
		) : (
			this.renderToolsIcon(item, index)
		)
	}

	renderColor() {
		return (
			<ChromePicker
				onChange={(e) => {
					this.isPickNull(() => {
						const { r, g, b, a } = e.rgb
						this.setState({
							background: e.rgb
						})
						window.setMaterialRGBA(r / 255, g / 255, b / 255, a)
					})
				}}
				color={this.state.background}
			></ChromePicker>
		)
	}

	renderPlayerBar(item, index) {
		return (
			<Slider
				className="progressSlider"
				min={0}
				max={100}
				value={this.state.playPercent}
				key={index}
				tipFormatter={(e) => e + '%'}
				onChange={(playPercent) => {
					this.setState({ playPercent })

					window.setCurFrame(this.totalFrames * (playPercent / 100))
				}}
			/>
		)
	}

	// 渲染透明度进度条
	renderSlider() {
		return (
			<div className="transparent">
				<Slider
					defaultValue={1}
					step={0.1}
					min={0}
					max={1}
					value={this.state.alpha}
					onChange={(value) => {
						this.isPickNull(() => {
							this.setState({
								alpha: value
							})
							window.setTransparent(value)
						})
					}}
				/>
			</div>
		)
	}

	// 渲染背景色
	renderBackground() {
		return (
			<Radio.Group
				defaultValue="0"
				buttonStyle="solid"
				onChange={(e) => {
					window.setBackground(e.target.value * 1)
				}}
			>
				<Radio.Button value="0">淡蓝色</Radio.Button>
				<Radio.Button value="1">浅白色</Radio.Button>
				<Radio.Button value="2">银灰色</Radio.Button>
			</Radio.Group>
		)
	}

	renderViewDire() {
		const bg = { background: 'rgba(24,144,255, 0.6)' }
		const viewDirections = [
			{ title: '正视图', value: 0, forward: bg },
			{ title: '后视图', value: 1, back: bg },
			{ title: '左视图', value: 2, left: bg },
			{ title: '右视图', value: 3, right: bg },
			{ title: '俯视图', value: 4, up: bg },
			{ title: '仰视图', value: 5, down: bg },
			{ title: '等轴侧', value: 6, forward: bg, right: bg }
		]
		return (
			<div className="DivBox">
				{!IEVersion() ? (
					viewDirections.map((item) => (
						<DivBox
							key={item.value}
							{...item}
							onTouchEnd={() => window.setView(item.value)}
							onClick={() => window.setView(item.value)}
						/>
					))
				) : (
					<Radio.Group
						defaultValue={0}
						buttonStyle="solid"
						onChange={(item) => {
							window.setView(item.target.value)
						}}
					>
						{viewDirections.map((item) => (
							<Radio.Button value={item.value} key={item.value}>
								{item.title}
							</Radio.Button>
						))}
					</Radio.Group>
				)}
			</div>
		)
	}

	renderToolsIcon(item, index) {
		return item.isFont ? (
			<IconFont
				type={item.type}
				onClick={() => {
					this.changeVisible(!item.visible, index)
					this.toolsClickHandle(item, index)
				}}
			/>
		) : (
			<Icon
				type={item.type}
				onClick={() => {
					this.changeVisible(!item.visible, index)
					this.toolsClickHandle(item, index)
				}}
			/>
		)
	}

	// player
	playHandle(item, index) {
		const newTools = this.state.tools
		if (item.type === 'play-circle') {
			newTools[index] = {
				type: 'pause-circle',
				title: '暂停'
			}
			window.setAnimationStart()
		}
		if (item.type === 'pause-circle') {
			newTools[index] = {
				type: 'play-circle',
				title: '播放'
			}
			window.animPause()
		}

		this.setState({ tools: newTools })
	}

	// 工具栏 触发事件统一处理
	toolsClickHandle(item, index) {
        console.log(item);
		const newTools = this.state.tools

		if (item.type === 'eye') {
			this.isPickNull(() => {
				newTools[index].type = 'eye-invisible'
				newTools[index].title = '隐藏'
				window.setVisible(true)
				newTools[index].pickObjectVisible = true
				if (this.sclAttrTree.setVisible) {
					this.sclAttrTree.setVisible(true)
				}
			})
		} else if (item.type === 'eye-invisible') {
			this.isPickNull(() => {
				newTools[index].type = 'eye'
				newTools[index].title = '显示'
				window.setVisible(false)
				newTools[index].pickObjectVisible = false
				if (this.sclAttrTree.setVisible) {
					this.sclAttrTree.setVisible(false)
				}
			})
		}

		if (item.type === 'pause-circle' || item.type === 'play-circle') {
			this.playHandle(item, index)
		}

		if (item.type === 'fullscreen') {
			newTools[index] = { type: 'fullscreen-exit', title: '退出全屏' }
			//   console.log(this);
			//   this.props.onFullScreen(true);
			fullScreen()
			//   window.canvasOnResize();
		}
		if (item.type === 'fullscreen-exit') {
			newTools[index] = { type: 'fullscreen', title: '全屏' }
			//   this.props.onFullScreen(false);
			exitFullscreen()
		}

		
		this.setState(
			{
				tools: [...newTools]
			},
			() => {
                item.onClick && item.onClick()
                if (item.type === 'drag') {
                    // onClick: () => this.isPickNull(() => window.moveModel())
                    if (this.state.activeTab && this.isMove) {
                      
                        this.setState({
                            activeTab: null
                        })
                        this.moveHandle()
                    } else {
                        this.isPickNull(() => {
                            this.moveHandle()
                            if(!IsPhone()){
                                notification.info({
                                    message:'移动操作',
                                    description: '使用Ctrl+鼠标左键，移动模型。',
                                    duration: 3,
                                })
                            }
                        })
                    }
                } else {
                    if (this.isMove && !item.type.startsWith('eye')) {
                        this.moveHandle()
                    }
                    if(item.type.startsWith('eye') && this.isMove){
                        this.setState({
                            activeTab: 'drag'
                        })
                    }
                }
                
                

        // console.log(this.isMove);

            }
		)
	}

	moveHandle() {
        window.moveModel()
        this.isMove = !this.isMove
	}

	fullScreenHandle(fullScreen) {
		const icon = fullScreen ? 'fullscreen-exit' : 'fullscreen'
		const newTools = this.state.tools
		const fullScreenIndex = this.#toolsKeyIndex.fullScreen
		newTools[fullScreenIndex].type = icon
		this.setState({ tools: [...newTools], activeTab: null })
	}

	pickObjectParameters() {
		const icon = window.pickObjectVisible ? 'eye-invisible' : 'eye'
		const newTools = this.state.tools
		const { visibleIndex, alphaIndex } = this.#toolsKeyIndex
		newTools[visibleIndex].type = icon
		newTools[visibleIndex].title = icon === 'eye' ? '显示' : '隐藏'
		newTools[alphaIndex].visible = false
		this.setState({
			tools: [...newTools],
			// activeTab: null,
			alpha: window.pickObjectTransparent
		})
	}

	//   停止播放
	playerStop() {
		scleCustomEvent('playerStop')
		window.animTerminal()
		this.setState({
			tools: [...this.#tools]
		})
	}

	changeVisible(visible, index) {
		const newTools = this.state.tools
		newTools[index].visible = visible
		this.setState({
			tools: [...newTools]
		})
	}

	isPickNull = (callback = () => {}) => {
		if (window.getPickStatus() < 1) {
			this.setState({
				activeTab: null
			})
			return message.info('需先选中模型')
		}
		callback()
	}

	// 需要暴露到window的方法
	setAnmiIcon = (isPause) => {
		const newTools = this.state.tools
		const newStatus = isPause
			? {
					type: 'play-circle',
					title: '播放'
			  }
			: {
					type: 'pause-circle',
					title: '暂停'
			  }

		this.setState({
			tools: newTools.map((item) => {
				if (
					item.type === 'pause-circle' ||
					item.type === 'play-circle'
				) {
					return {
						...item,
						...newStatus
					}
				}
				return item
			})
		})
	}

	getCurFrame(CurFrame) {
		const playPercent = (CurFrame / this.totalFrames) * 100
		this.setState({
			playPercent
		})
	}
}

function DivBox(props) {
	const { up, down, left, right, forward, back } = props

	return (
		<Tooltip title={props.title}>
			<div className="box" {...props}>
				<div className="up" style={up}></div>
				<div className="down" style={down}></div>
				<div className="left" style={left}></div>
				<div className="right" style={right}></div>
				<div className="forward" style={forward}></div>
				<div className="back" style={back}></div>
			</div>
		</Tooltip>
	)
}
