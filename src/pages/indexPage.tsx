/** @format */

import React, { Component } from "react"
import { Layout, Row, Col, Drawer, Button, Dropdown, Menu, Modal, Avatar, Icon, Popover } from "antd"
import { Switch } from "dva/router"
import { connect } from "dva"
import SubRoutes, { NoMatchRoute, RedirectRoute } from "../utils/SubRoutes"
import { domain } from "../utils"
import Categroys, { SecondaryCate } from "../components/Categroys/Categroys"
import styles from "./IndexPage.less"
import "../@types"
import SearchBar from "../components/SearchBar"
import Login from "./ucenter/auth/login"
import Register from "./ucenter/register"

const { Header, Content, Footer } = Layout


@connect()
class IndexPage extends Component<RoutesProps, State> {
	container: HTMLElement
	state = {
		drawerShow: false,
		downloadMenus: [
			{
				icon: 'windows',
				download: domain + '/softcenter/CMWebSetup.zip',
				title: 'windows 下载'
			},
			{
				icon: 'apple',
				download: domain + '/softcenter/CMReader.ipa',
				title: 'IOS 下载'
			},
			{
				icon: 'android',
				download: domain + '/softcenter/CMReader.apk',
				title: 'Android 下载'
			}
		],
		UserMenus: [
			{
				id: 'login',
				name: '账号登录',
				icon: 'login',
				onClick: () => {
					this.props.dispatch({
						type: 'ucenter/save',
						payload: {
							registerModal: false,
							loginModal: true
						}
					})
				}
			},
			{
				id: 'register',
				name: '新用户注册',
				icon: 'user-add',
				onClick: () => {
					this.props.dispatch({
						type: 'ucenter/save',
						payload: {
							registerModal: true,
							loginModal: false
						}
					})
				}
			},
		],
		userLoginMenus: [
			{
				id: 'userSet',
				name: '私有资源',
				icon: 'profile',
				onClick: () => {
					this.props.history.push('/private')
				}
			},
			{
				id: 'userSet',
				name: '账户设置',
				icon: 'setting',
				onClick: () => {
					this.props.history.push('/profile')
				}
			},
			{
				id: 'logout',
				name: '退出登录',
				icon: 'logout',
				onClick: () => {
					this.props.dispatch({
						type: 'global/logout',
					})
				}
			},
		]

	}
	render() {
		const { routes, app, global } = this.props

		const avatarAttr = {
			icon: global.uname ? '' : 'user',
			src: global.avatar.indexOf('http') > -1 ? global.avatar : `${domain}/${global.avatar}`,
			style: { backgroundColor: "#1890ff", marginLeft: 10 }
		}
		const { drawerShow, downloadMenus } = this.state
		return (
			<>
				<Layout className={styles.homePage}>
					<Header className={styles.header}>
						<div className={styles.download}>
							<Button type="primary" icon="search" onClick={() => {
								this.props.dispatch({
									type: 'searchStore/toggleSearchBar'
								})
							}} />
							<Dropdown overlay={() => (
								<Menu>
									{downloadMenus.map((item, index) =>
										<Menu.Item key={index}>
											<a href={item.download} download >
												<Button type='primary' className={styles.downicon} icon={item.icon} size={"small"} title={item.title} />
												{/* <a href={item.download} download >
										<Icon type={item.icon} />
										{item.title}
									</a> */}
												{item.title}
											</a>
										</Menu.Item>
									)}
								</Menu>
							)}>
								<Button type="primary" icon="download">下载列表</Button>
							</Dropdown>
							{/* <Dropdown overlay={this.renderMenus()}> */}
							<Popover content={this.renderMenus()} placement="bottomRight" >
								<Avatar size="large" {...avatarAttr} onClick={() => {
									!this.props.global.islogin && this.props.dispatch({
										type: 'ucenter/save',
										payload: {
											loginModal: true,
											registerModal: false
										}
									})
								}}>{global.uname}</Avatar>
							</Popover>
							{/* </Dropdown> */}
						</div>
						<Col xs={24} md={24} className='logoBox'>
							<Button
								type='primary'
								icon='menu'
								size={"large"}
								onClick={() => {
									this.setState({
										drawerShow: true,
									})
								}}
								className='menusBtn'
							/>
							<a href="https://www.featuremaker.com/">
								<img
									className={styles.logo}
									src={require('../assets/images/featureMaker.png')}
								/>
							</a>
							<a href="/">
								<img
									className={styles.logo2}
									src={require('../assets/images/cmreader.png')}
								/>
							</a>
						</Col>
						<Row>
							<Col md={24} xs={0}>
								<Categroys mode='horizontal' />
							</Col>
						</Row>
					</Header>
					<Drawer
						title='选择分类'
						placement={"left"}
						closable={false}
						className='HomeDrawer'
						onClose={() => {
							this.setState({
								drawerShow: false,
							})
						}}
						visible={drawerShow}
						maskClosable={true}
					>
						<Categroys mode='inline' forceUpdata={global.forceUpdata} />
					</Drawer>
					<Content className='bodyContainer' >

						<SearchBar />
						<SecondaryCate />
						<Switch>
							{routes.map((route, i) => (
								<SubRoutes key={i} {...route} app={app} />
							))}
							<RedirectRoute exact={true} from={"/"} routes={routes} />
							<NoMatchRoute />
						</Switch>
						{/* <div style={{ background: "#fff", padding: 24, minHeight: 380 }}>
                    Content
                    </div> */}
					</Content>

				</Layout >
				<Footer className="homeFooter" >
					版权所有 &nbsp; &nbsp; <a href="https://featuremaker.com/">北京圜晖科技有限公司</a> &nbsp; &nbsp; 京ICP备19039689号-2
				</Footer>
				<UcenterModal />
			</>
		)
	}

	renderMenus() {
		const menus = this.props.global.islogin ? this.state.userLoginMenus : this.state.UserMenus
		return (
			<Menu>
				{menus.map((item, index) => (
					<Menu.Item key={index} >
						<Button type="link" icon={item.icon} onClick={item.onClick}>
							{item.name}
						</Button>
					</Menu.Item>
				))}
			</Menu>
		);
	}
	handleButtonClick() {

	}

	componentDidMount() {
		const { pathname } = this.props.location
		// const parmas = queryString(search)
		const { dispatch, global } = this.props;
		if (!global.checkLogin) {
			dispatch({
				type: 'global/isLogin',
			})
		}
		// 搜索页直接现实SearchBar
		if (pathname === '/search') {
			dispatch({
				type: 'searchStore/save',
				payload: {
					searchBarShow: true
				}
			})
		}



		window.addEventListener("resize", this.resize.bind(this))
	}

	setSelectKeys(pathname: string) {
		const path = pathname.split("/"),
			key = path && !path[1] ? "home" : path[1]
		return key
	}

	resize() {
		const { drawerShow } = this.state
		if (drawerShow) {
			this.setState({
				drawerShow: false,
			})
		}
	}

	componentWillUnmount() {
		// 卸载异步操作设置状态
		this.setState = (state, callback) => {
			return;
		}
		window.removeEventListener("resize", this.resize.bind(this))
	}
}


@connect(({ ucenter }: any) => ucenter)
class UcenterModal extends Component<any, any>{
	render() {
		const { registerModal, loginModal } = this.props
		console.log(registerModal, loginModal);

		return <Modal
			title={registerModal ? '账号注册' : '登录'}
			centered
			visible={loginModal || registerModal}
			onOk={() => this.userModalConfig()}
			onCancel={() => this.userModalConfig()}
			footer={null}
		>
			{loginModal && <Login />}
			{registerModal && <Register />}

		</Modal>
	}


	userModalConfig(payload = { registerModal: false, loginModal: false }) {
		this.props.dispatch({
			type: 'ucenter/save',
			payload
		})
	}
}




export default IndexPage


