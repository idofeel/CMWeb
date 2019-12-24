/** @format */

import React, { Component } from "react"
import { Layout, Row, Col, Drawer, Button, Dropdown, Icon, Menu, Input, Affix, Modal } from "antd"
import { Switch } from "dva/router"
import { connect } from "dva"
import SubRoutes, { NoMatchRoute, RedirectRoute } from "../utils/SubRoutes"
import Categroys, { SecondaryCate } from "../components/Categroys/Categroys"
import styles from "./IndexPage.less"
import "../@types"


import { queryString, replaceState } from "../utils"
import SearchBar from "../components/SearchBar"
import Login from "./ucenter/auth/login"
import Register from "./ucenter/register"

const { Header, Content } = Layout

@connect()
class IndexPage extends Component<RoutesProps, State> {
	container: HTMLElement
	state = {
		drawerShow: false,
		downloadMenus: [
			{
				icon: 'windows',
				download: 'http://39.98.156.22/softcenter/CMWebSetup.zip',
				title: 'windows 下载'
			},
			{
				icon: 'apple',
				download: 'http://39.98.156.22/softcenter/CMReader.ipa',
				title: 'IOS 下载'
			},
			{
				icon: 'android',
				download: 'http://39.98.156.22/softcenter/CMReader.apk',
				title: 'Android 下载'
			}
		],

	}
	render() {
		const { routes, app } = this.props
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
							<Button type="primary" icon="login" onClick={() => {
								this.props.dispatch({
									type: 'global/save',
									payload: {
										register: true
									}
								})
							}}>登陆</Button>
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
							<img
								className={styles.logo}
								src='https://nwzimg.wezhan.cn/contents/sitefiles2033/10167896/images/10181979.png'
							/>

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
						<Categroys mode='inline' forceUpdata={this.props.global.forceUpdata} />
					</Drawer>
					<Content className='bodyContainer'>
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
					{/* <Footer style={{ textAlign: "center" }}></Footer> */}
				</Layout >
				<Modal
					title="注册/登陆"
					centered
					visible={this.props.global.register || this.props.global.login}
					onOk={() => this.handleShowModal()}
					onCancel={() => this.handleShowModal()}
					footer={null}
				>
					{this.props.global.login && <Login />}
					{this.props.global.register && <Register />}

				</Modal>
			</>
		)
	}
	handleButtonClick() {

	}

	handleShowModal() {
		this.props.dispatch({
			type: 'global/save',
			payload: {
				register: false,
				login: false
			}
		})
	}

	componentDidMount() {
		const { pathname } = this.props.location
		// const parmas = queryString(search)
		const { dispatch } = this.props;
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
		window.removeEventListener("resize", this.resize.bind(this))
	}
}

export default IndexPage
