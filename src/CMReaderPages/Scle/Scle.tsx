import * as React from 'react';
import { Progress, Spin, message, Icon, Button, Drawer, Tree, Popover, Radio, Table, Slider, Tooltip, notification, Alert } from 'antd';
import { SketchPicker, ChromePicker } from 'react-color';
import './scle.less'
import { DOMAttributes } from 'react';
import { queryString, get } from '../../utils';
import { IEVersion, IsPhone } from '../../utils/Browser';
import API from '../../services/API';
export interface ISCLEProps {
}

export interface ISCLEState {
}

message.config({
	maxCount: 1,
});
const { TreeNode } = Tree;

const IconFont = Icon.createFromIconfontCN({
	scriptUrl: '//at.alicdn.com/t/font_1616415_x0co1i09pnp.js',
});

const columns = [
	{
		title: '参数名',
		dataIndex: 'name',
	},
	{
		title: '参数值',
		dataIndex: 'value',
	},
];

const bg = { background: 'rgba(255,255,255,0.6)' }
const btnStyle = { color: '#505050' }

const viewDirections = [
	{ title: '正视图', value: 0, forward: bg },
	{ title: '后视图', value: 1, back: bg },
	{ title: '左视图', value: 2, left: bg },
	{ title: '右视图', value: 3, right: bg },
	{ title: '俯视图', value: 4, up: bg },
	{ title: '仰视图', value: 5, down: bg },
	{ title: '等轴侧', value: 6, forward: bg, right: bg },
]

let { g_sclehttp, g_loaded_pos, NetTimeTimeID, g_arrayCleBuffer, g_strResbaseUrl, startRender, ParseCleStream, moveModel = () => { } } = window
export default class SCLE extends React.Component<ISCLEProps, ISCLEState> {

	constructor(props: ISCLEProps) {
		super(props);

		this.state = {
			loading: true, // 加载中
			percent: 0, // 加载中的进度
			treeData: { // 模型树数据
				child: []
			},
			AnimationPlay: false, // 播放动画
			AnimatePercent: 0, // 动画百分比进度
			AnimateStop: true, // 停止动画
			ModelTreeVisible: true,// 模型树弹层
			ModelParamsVisible: true, // 模型参数弹层
			paramsData: [], // 模型参数
			treeNodeCheckedKeys: [],  // 显示隐藏复选框
			treeNodeSelectKeys: [], // 选中的key
			expandedKeys: [], //展开的key
			multipleSelcet: false, // 是否允许多选
			isVisible: true, // 模型是否可见
			Tips: false, // 
			statusCode:0,
			cleStatus:[ '模型下载中...', '模型打开中,请稍等...','模型下载失败',],
			alphaRange: 1, // 透明度调节条
			background: { // 调色板
				r: 255,
				g: 0,
				b: 0,
				a: 1
			},
			// downloadInfo: '在IE/360/qq浏览器中，支持G级模型的快速浏览，点击下载安装!'
		}
		window.updateProgress = this.updateProgress
		window.transferFailed = this.transferFailed
		window.setAnmiIcon = this.setAnmiIcon
		window.setPickObjectParameters = this.pickObjectParameters
		window.getCurFrame = (CurFrame) => this.getCurFrame(CurFrame)
		window.cleStreamReady = ()=> this.cleStreamReady();
		window.pickNull = this.pickNull
		this.totalFrames = 0
	}
	hideSelect = false
	keyCode = 0
	cleDownload: any = null
	public render() {
		const { Tips,cleStatus,statusCode, loading, treeData, AnimationPlay, ModelTreeVisible, ModelParamsVisible, treeNodeCheckedKeys, multipleSelcet, treeNodeSelectKeys, paramsData, AnimatePercent, background, isVisible, alphaRange, AnimateStop, expandedKeys } = this.state

		return (
			<div className="scleContainer">
				<a href="/softcenter/CMWebSetup.zip" ref={ref => this.cleDownload = ref} download target="_blank"></a>
				{Tips && <Alert message="文件过大，请在IE/360兼容模式/qq兼容模式中，下载并安装CMWeb控件，浏览该文件！" banner style={{ zIndex: 3 }} />}
				{loading ? <div className="pageloading">
					<div className="loadingBox">
						<img src={require('../../assets/images/downloadAppIcon.png')} alt="" />
						{!Tips && <Progress
							strokeColor={{
								'0%': '#108ee9',
								'100%': '#87d068',
							}}
							percent={this.state.percent}
							status="active"
						/>}
						<p>{cleStatus[statusCode]}</p>
					</div>
				</div> :
					<>
						{/* <h3 className="pageHeader">
							<span>{document.title}</span>
							{!IsPhone() && <Button type="link" onClick={() => {
								const args = {
									message: '安全控件下载',
									description: <span>在IE/360/qq浏览器中，支持G级模型的快速浏览。<Button type="link" onClick={() => this.cleDownload.click()}>点击下载安装!</Button></span>,
									duration: 0,
								};
								notification.open(args);
							}}>安全控件下载</Button>}
						</h3> */}
						<div className="toolsContainer">
							<div className="tools_btn">
								{this.renderTools()}

							</div>
						</div>
						<Drawer
							placement="right"
							closable={false}
							mask={false}
							className="modelTreeParamsDrawer"
							// onClose={this.onClose}
							visible={ModelParamsVisible}
						>
							<Button className="showTreeParamsModal" icon="menu-unfold" onClick={() => {
								this.setState({
									ModelParamsVisible: !this.state.ModelParamsVisible
								})
							}}></Button>
							<Table columns={columns} dataSource={paramsData} locale={{ emptyText: '无数据' }} size="middle" />
						</Drawer>
						<Drawer
							title={'模型树'}
							placement="left"
							closable={false}
							mask={false}
							className="modelTreeDrawer"
							// onClose={this.onClose}
							visible={ModelTreeVisible}
							width={320}
							onClick={(e) => {
								if (this.hideSelect) {
									this.hideSelect = false
									return
								} else {
									this.setState({
										treeNodeSelectKeys: []
									})
								}
							}}
						>
							<Button className="showTreeModal" icon="menu-fold" onClick={() => {
								this.hideSelect = true
								this.setState({
									ModelTreeVisible: !this.state.ModelTreeVisible
								})
							}}></Button>

							<Tree
								checkable
								checkStrictly
								checkedKeys={treeNodeCheckedKeys}
								// defaultSelectedKeys={treeNodeSelectKeys}
								selectedKeys={treeNodeSelectKeys}
								expandedKeys={expandedKeys}
								onClick={(e) => {
									return false
								}}
								onExpand={(e) => {
									// console.log('onExpand', e);

									this.hideSelect = true
									this.setState({
										expandedKeys: e
									})
								}}
								// onSelect={(selectedKeys, e) => {

								// 	// this.hideSelect = true
								// 	// console.log(e.node.props.dataRef);
								// 	// this.setState({
								// 	// 	paramsData: e.node.props.dataRef.params,
								// 	// 	treeNodeSelectKeys: [e.node.props.dataRef.key + '']
								// 	// })



								// 	// this.tempMutilpSelect = this.findleafIndexs(e.node.props.dataRef)

								// 	// pickModelByIndex(this.tempMutilpSelect)
								// }}
								onCheck={(treeNodeCheckedKeys, e) => {
									this.setState({
										treeNodeCheckedKeys
									})
									setModelVisible(this.findleafIndexs(e.node.props.dataRef), e.checked)
								}}
							// onExpand={this.onExpand}
							// expandedKeys={this.state.expandedKeys}
							// autoExpandParent={this.state.autoExpandParent}
							// onCheck={this.onCheck}
							// checkedKeys={this.state.checkedKeys}
							// onSelect={this.onSelect}
							// selectedKeys={this.state.selectedKeys}
							>
								{this.renderTreeNodes(treeData)}
							</Tree>
						</Drawer>


					</>}
			</div>
		);
	}

	// pickNull = () => {
	// 	console.log('未选择零件');
	// 	this.setState({
	// 		treeNodeSelectKeys: []
	// 	})
	// }

	AnimateHandleChange = (value) => {
		this.setState({
			AnimatePercent: value
		})
		setCurFrame(this.totalFrames * (value / 100))
	}


	renderTools() {
		const { isVisible, background, alphaRange, AnimationPlay, AnimateStop, AnimatePercent } = this.state
		// 播放停止
		if (AnimateStop) {
			return <div>
				<Tooltip title="复位">
					<Button type="link" icon="home" style={btnStyle} onClick={() => setHome()}></Button>
				</Tooltip>
				<Tooltip title="移动零件">
					<Button type="link" icon="drag" style={btnStyle} onClick={() => this.isPickNull(moveModel)}></Button>
				</Tooltip>
				<Tooltip title="隐藏">
					<Button type="link" icon={isVisible ? 'eye-invisible' : 'eye'} style={btnStyle} onClick={() => {
						this.setVisible()

					}}></Button>
				</Tooltip>
				<Popover
					content={
						<ChromePicker
							onChange={(e) => {
								// console.log(e);

								this.isPickNull(() => {
									const { r, g, b, a } = e.rgb
									this.setState({
										background: e.rgb
									});
									setMaterialRGBA(r / 255, g / 255, b / 255, a)
								})

							}}
							color={background} />
					}
					trigger="click"
				// visible={this.state.visible}
				// onVisibleChange={this.handleVisibleChange}
				>
					<Tooltip title="颜色">
						<Button type="link" icon="bg-colors" style={btnStyle}></Button>
					</Tooltip>
				</Popover>
				<Popover
					content={
						<div className="alphaSlider">
							<Slider vertical step={0.1} min={0} max={1} value={alphaRange} style={{ height: 120 }} onChange={(value) => {
								this.isPickNull(() => {
									this.setState({
										alphaRange: value
									});
									setTransparent(value)
								})
							}} />
						</div>
					}
					trigger="click"
				>
					<Tooltip title="透明度">
						<Button type="link" shape="circle" style={btnStyle}>
							<IconFont
								type="icon-toumingdu"
								style={btnStyle}
							/>
						</Button>
					</Tooltip>
				</Popover>
				<Popover
					content={
						<Radio.Group defaultValue="0" buttonStyle="solid" onChange={(e) => {
							setBackground(e.target.value * 1)
						}}>
							<Radio.Button value="0">淡蓝色</Radio.Button>
							<Radio.Button value="1">浅白色</Radio.Button>
							<Radio.Button value="2">银灰色</Radio.Button>
						</Radio.Group>
					}
					trigger="click"
				>
					<Tooltip title="背景色">
						<Button type="link" shape="circle" style={btnStyle}>
							<IconFont
								type="icon-background-l"
								style={btnStyle}
								onClick={() => { }}
							/>
						</Button>
					</Tooltip>
				</Popover>
				<Popover
					style={{ background: 'none' }}
					content={
						!IEVersion() ?
							<div>
								{viewDirections.map(item => <DivBox key={item.value} {...item} onTouchEnd={() => setView(item.value)} onClick={() => setView(item.value)} />)}
							</div>
							:
							<Radio.Group defaultValue={0} buttonStyle="solid" onChange={(item) => {
								setView(item.target.value)
							}}>
								{
									viewDirections.map(item => <Radio.Button value={item.value}>{item.title}</Radio.Button>)
								}
							</Radio.Group>
					}
					trigger="click"
				>
					<Tooltip title="视图">
						<Button type="link" shape="circle" style={btnStyle}>
							<IconFont
								type="icon-box"
								style={btnStyle}
								onClick={() => { }}
							/>
						</Button>
					</Tooltip>
				</Popover>
				<Tooltip title={AnimationPlay ? '暂停' : '播放'}>
					<Button type="link" icon={AnimationPlay ? 'pause-circle' : 'play-circle'} style={btnStyle} onClick={() => {
						AnimationPlay ? animPause() : setAnimationStart()
						this.setState({
							AnimationPlay: !AnimationPlay,
							AnimateStop: false,
						})
					}}></Button>
				</Tooltip>
			</div>
		} else {
			return <div className="icon-wrapper">
				<Tooltip title={AnimationPlay ? '暂停' : '播放'}>
					<Button type="link" icon={AnimationPlay ? 'pause-circle' : 'play-circle'} style={btnStyle} onClick={() => {
						AnimationPlay ? animPause() : setAnimationStart()
						this.setState({
							AnimationPlay: !AnimationPlay,
							AnimateStop: false,
						})
					}}></Button>
				</Tooltip>
				<Slider className="progressSlider" min={0} max={100} value={AnimatePercent} onChange={this.AnimateHandleChange} tipFormatter={(e) => e + '%'} />
				<Tooltip title="停止动画">

					<Button type="link" shape="circle" style={btnStyle} onClick={() => {
						this.setState({
							AnimationPlay: false,
							AnimateStop: true,
						})
						animTerminal()
					}}>
						<IconFont
							type="icon-Stop"
							style={btnStyle}
							onClick={() => { }}
						/>
					</Button>
				</Tooltip>
			</div>
		}

	}
	renderTreeNodes(treeData) {
		if (!treeData.length) return null
		return treeData.map(item => {
			if (item.child) {
				return (
					<TreeNode checkable={true} title={this.renderTitle(item)} key={item.key} dataRef={item} >
						{this.renderTreeNodes(item.child)}
					</TreeNode>
				);
			}
			return <TreeNode checkable={true} key={item.key} title={item.title} {...item} dataRef={item} />;
		})
	}

	setTreeVisible(data: any, keys: any, visible: boolean, visibleKeys: any = []) {
		for (let i = 0; i < data.length; i++) {
			if (keys.indexOf(data[i].objIndex) > -1) {
				visibleKeys.push(data[i].key + '')
			}
			if (data[i].child.length) {
				this.setTreeVisible(data[i].child, keys, visible, visibleKeys)
			}
		}
		return visibleKeys
	}

	setVisible() {
		this.isPickNull(() => {
			console.log(pickObjectIndexs);
			const isVisible = !this.state.isVisible

			setVisible(isVisible)

			let { treeNodeCheckedKeys } = this.state;
			const visibleKeys = this.setTreeVisible(this.state.treeData, pickObjectIndexs, isVisible)

			treeNodeCheckedKeys = isVisible ? treeNodeCheckedKeys.concat(visibleKeys) : treeNodeCheckedKeys.filter(item => visibleKeys.indexOf(item) < 0)

			this.setState({
				isVisible: isVisible,
				treeNodeCheckedKeys,
			})
		})
	}
	tempMutilpSelect: any = [] // 临时多选
	renderTitle(item: any) {
		const key = item.key + '';
		return <span style={{ background: (this.state.treeNodeSelectKeys.indexOf(key) > -1 ? '#e6f7ff' : 'transparent') }}
			onClick={() => {
				this.hideSelect = true
				this.tempMutilpSelect = this.findleafIndexs(item)
				this.setState({
					treeNodeSelectKeys: [key],
					paramsData: item.params
				})
				// console.log(this.tempMutilpSelect);
				pickModelByIndex(this.tempMutilpSelect, IsPhone())
			}}
			onMouseDown={() => {
				if (this.keyCode === 17) {
					let { treeNodeSelectKeys }: any = this.state

					// 已选择，取消选择 && 未选择添加选择
					// treeNodeSelectKeys = treeNodeSelectKeys.indexOf(key) > -1 ? treeNodeSelectKeys.filter(item => item !== key) : treeNodeSelectKeys.concat(key);
					const leafKeys = this.findleafIndexs(item);
					// console.log(treeNodeSelectKeys);

					if (treeNodeSelectKeys.indexOf(key) > -1) {

						// 已选择，取消选择 
						treeNodeSelectKeys = treeNodeSelectKeys.filter((item: any) => item !== key);
						// 临时多选
						this.tempMutilpSelect = this.tempMutilpSelect.filter((item: any) => leafKeys.indexOf(item) === -1)
						// console.log('取消', this.tempMutilpSelect);

					} else {
						treeNodeSelectKeys.push(key)
						this.tempMutilpSelect = this.tempMutilpSelect.concat(leafKeys)
					}

					this.hideSelect = true
					this.setState({
						treeNodeSelectKeys,
						paramsData: []
					})

					// // if
					// this.tempMutilpSelect = treeNodeSelectKeys.indexOf(key) > -1 ? this.tempMutilpSelect.filter(item => leafKeys.indexOf(item) > -1) : this.tempMutilpSelect.concat(this.findleafIndexs(item))
					// // this.tempMutilpSelect = this.tempMutilpSelect.concat(this.findleafIndexs(item))
					// console.log('多选', this.tempMutilpSelect);
					pickModelByIndex(this.tempMutilpSelect, IsPhone())
				}
			}}>
			{item.title}
		</span>
	}
	// componentWillMount() {
	// 	console.log('componentDidMount');

	// }
	async componentDidMount() {
		window.isPhone = IsPhone()
		const { pid, title, link, lic } = queryString(location.href)
		document.title = title || '三维模型'
		// console.log(pid, title);
		// getByRequest('../../src/assets/Cable2Line.zip');
		// return
		if (link) {
			this.openLink(link);
			return
		}
		let files;
		try {
			files = await get(API.fileInfo.cle, { pid, lic })
		} catch (error) {
			console.log(error);
		}

		if (files.success) {
			let { cle } = files.data;
			window.g_strResbaseUrl = cle.replace(/(.cle)$/, '/');
			getByRequest(cle.replace(/(.cle)$/, '.scle'))
			canvasOnResize()
			// console.log('openCle', window.g_strResbaseUrl, cle.replace(/(.cle)$/, '.scle'));
		} else {
			message.error(files.faildesc)
			this.setState({ Tips: true })
		}


		// // 下载网络SCLE模型
		window.addEventListener("keydown", this.keydown)
		window.addEventListener("keyup", this.keyup)
		document.addEventListener('contextmenu', this.disableContextmenu);
	}

	openLink(link: string) {
		window.g_strResbaseUrl = link.replace(/(.scle)$/, '/');
		getByRequest(link)
		canvasOnResize()
	}

	componentWillUnmount() {
		document.removeEventListener('contextmenu', this.disableContextmenu)
		window.removeEventListener("keyup", this.keyup)
		window.removeEventListener("keydown", this.keydown)
	}

	isPickNull = (callback = () => { }) => {
		if (getPickStatus() < 1) return message.info('需先选中模型');
		callback()
	}

	keyup = (e: KeyboardEvent) => {
		this.keyCode = 0
		if (this.state.multipleSelcet) {
			this.setState({
				multipleSelcet: false
			})
		}
	}
	keydown = (e: KeyboardEvent) => {
		if (e.keyCode === 17) {
			this.keyCode = 17

			this.setState({
				multipleSelcet: true
			})
		}
	}
	disableContextmenu = (e: Event) => {
		e.preventDefault()
		e.stopPropagation()
		return false
	}

	pickObjectParameters = () => {
		// console.log(pickObjectIndexs, pickObjectVisible, pickObjectTransparent);
		if (!pickObjectIndexs || !pickObjectIndexs.length) {
			this.setState({
				treeNodeSelectKeys: [],
				isVisible: !!pickObjectVisible,
				alphaRange: pickObjectTransparent
			});
			return
		}
		const { expandedKeys, treeNodeSelectKeys, item } = this.getExpandedAndSelctKeys(this.state.treeData, pickObjectIndexs)
		this.setState({
			expandedKeys,
			treeNodeSelectKeys,
			paramsData: item.length === 1 ? item[0].params : []
			isVisible: !!pickObjectVisible,
			alphaRange: pickObjectTransparent
		})

	}

	getCurFrame(CurFrame) {
		const nAnimatePercent = CurFrame / this.totalFrames * 100
		// console.log(nAnimatePercent);
		this.setState({
			AnimatePercent: nAnimatePercent,
			// AnimationPlay: !(nAnimatePercent > 100)
		})
	}
	cleStreamReady(){
		console.log('cleStreamReady');
		
		this.setState({
			loading: false,
			Tips: false,
		})
		this.loadTree();
	}
	updateProgress = async (evt: any) => {
		// console.log(evt);

		// progress 事件的 lengthComputable 属性存在时，可以计算数据已经传输的比例(loaded 已传输大小，total 总大小）
		if (evt.lengthComputable) {
			this.setState({
				percent: parseInt(evt.loaded / evt.total * 100)
			})
			if (evt.loaded / evt.total === 1 && evt.target.status < 300) {
				await this.sleep(500)
				this.setState({
					Tips: false,
					statusCode: 1,
				})
			}
			if (evt.target.status === 404) {
				this.setState({
					Tips: true,
					statusCode:2,
				})
			}
			g_nCleBufferlength = evt.total;
			g_loaded_pos = evt.loaded;
		} else {

		}


	}

	loadTree() {
		const treeData = [this.getTreeNodeData(window.g_GLData.GLModelTreeNode)]
		console.log('loadTree', treeData);

		this.totalFrames = getTotalFrames()
		this.setState({
			treeData,
			treeNodeCheckedKeys: this.keys
		})
		// 清除全局变量
		this.keys = null

		// let findParentKeys = this.findParentKeys(treeData, [48, 47, 4891])
		// let expandedKeys: any = [];
		// let treeNodeSelectKeys: string = [];
		// findParentKeys.map(item => {
		// 	const { parentKeys } = item
		// 	treeNodeSelectKeys.push(parentKeys[parentKeys.length - 1])

		// 	expandedKeys = expandedKeys.concat(item.parentKeys)
		// })


		// expandedKeys = new Set(expandedKeys)
		// expandedKeys = Array.from(expandedKeys)
		// console.log(treeNodeSelectKeys);

		let { expandedKeys } = this.getExpandedAndSelctKeys(treeData, [-1])
		this.setState({
			ModelParamsVisible: false,
			ModelTreeVisible: false,
			expandedKeys,
			// treeNodeSelectKeys
		})
		console.log(expandedKeys)
		// window.g_GLData.GLModelTreeNode.Clear()
	}
	/**
	 * 
	 * @param data 
	 * @param leafIndexs  叶子的index []
	 */
	getExpandedAndSelctKeys(data: any, leafIndexs: any) {
		let findParentKeys = this.findParentKeys(data, leafIndexs),
			expandedKeys: any = [],
			treeNodeSelectKeys: any = [];

		findParentKeys.map((item: any) => {
			const { parentKeys } = item
			treeNodeSelectKeys.push(parentKeys[parentKeys.length - 1])
			expandedKeys = expandedKeys.concat(item.parentKeys)
		})

		// 去重展开的key
		expandedKeys = new Set(expandedKeys)
		expandedKeys = Array.from(expandedKeys)

		return {
			expandedKeys, treeNodeSelectKeys, item: findParentKeys,
		}
	}
	key = 1000000
	keys: any[] = [] //显示的的keys
	processTreeData(treeData: any, parentKeys: any): any {
		// console.log(treeData);
		if (!treeData || !treeData.length) return []
		return treeData.map((item: any) => this.getTreeNodeData(item, parentKeys))
	}

	getTreeNodeData(item: any, parentKeys: any = []) {
		this.key += 1
		parentKeys = parentKeys.concat(this.key + '')
		if (item._bVisible) this.keys.push(`${this.key}`)
		return {
			key: this.key,
			parentKeys,
			nodeid: item._uTreeNodeID,
			treeid: item._uJSTreeID,
			title: item._strName,
			params: this.getTreeNodeParams(item._arrNodeParameters),
			objIndex: item._uObjectIndex,
			originVisible: item._bVisibleOriginal,
			visible: item._bVisible,
			TriangleCount: item._uObjectTriangleCount,
			child: this.processTreeData(item._arrSubNode, parentKeys)
		}
	}

	findParentKeys(data: any, objIndexs: any, key: any = []): any {
		if (!objIndexs.length) return key
		for (let i = 0; i < data.length; i++) {
			const node = data[i];
			const index = objIndexs.indexOf(node.objIndex)
			if (index > -1) {
				key.push(node);
				objIndexs.filter((item: any) => item !== node.objIndex)
			} else if (node.child && node.child.length) {
				this.findParentKeys(node.child, objIndexs, key)
			}
		}
		return key
	}


	getTreeNodeParams(arrParmas: any) {
		return arrParmas.map((item: any) => ({ name: item._strName, value: item._strValue }))
	}
	sleep(time: number) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}

	transferComplete = (evt: any) => {
		// alert("The transfer is complete.");
	}

	transferFailed = (evt: any) => {
		// message.error("下载文件失败！");
		this.setState({
			Tips: true,
			statusCode:2
		})
	}
	setAnmiIcon = (isPause: boolean) => {
		console.log('isPause', isPause ? '暂停' : '播放');
		this.setState({
			AnimationPlay: !isPause
		})
	}

	transferCanceled = (evt: any) => {
		message.error("下载已取消！");
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
	findleafIndexs = (data) => {
		// console.log('data,', data);

		let indexs = []
		if (data.child && data.child.length) {
			data.child.map(item => (indexs = indexs.concat(this.findleafIndexs(item))))
			return indexs
		} else {
			indexs.push(data.objIndex)
			return indexs
		}
		// console.log('data2,', indexs);
	}


}

interface DivBoxProps {
	boxProps: any
}

class DivBox extends React.Component<any, DivBoxProps>{
	static defaultProps = {
		up: {}, down: {}, left: {}, right: {}, forward: {}, back: {}
	}
	render() {
		const { up, down, left, right, forward, back } = this.props

		return <Tooltip title={this.props.title} placement="left">
			<div className="box" {...this.props}>
				<div className="up" style={up}></div>
				<div className="down" style={down}></div>
				<div className="left" style={left}></div>
				<div className="right" style={right}></div>
				<div className="forward" style={forward}></div>
				<div className="back" style={back}></div>
			</div>
		</Tooltip>
	}
}