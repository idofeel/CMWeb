/** @format */

import React, { Component } from "react"
import { Layout, Row, Col, Drawer, Button } from "antd"
import { Switch } from "dva/router"
import SubRoutes, { NoMatchRoute, RedirectRoute } from "../utils/SubRoutes"
import Categroys, { SecondaryCate } from "../components/Categroys/Categroys"
import { connect } from "dva"
import styles from "./IndexPage.less"
import "../@types"

import { queryString, joinUrlEncoded, replaceState } from "../utils"

const { Header, Content, Footer } = Layout

@connect()
class IndexPage extends Component<RoutesProps, State> {
	state = {
		drawerShow: false,
	}

	render() {
		const { routes, app } = this.props
		const { drawerShow } = this.state
		return (
			<Layout className={styles.homePage}>
				<Header className={styles.header}>
					<Button type='primary' icon="download" size={"large"} className={styles.download}>
						<a href="http://fm.aijk.xyz/softcenter/CMWebSetup.exe"/>
					</Button>
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
					<Categroys mode='inline' />
				</Drawer>
				<Content className='bodyContainer'>
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
			</Layout>
		)
	}
	componentDidMount() {
		const { search } = this.props.location
		const parmas = queryString(search)

		// 获取设置菜单
		this.props.dispatch({
			type: "HomeStore/getMenus",
			payload: {
				selectKey: parmas.m,
				second: parmas.s,
			},
			callback: (payload: any) => {
				replaceState(search, payload)
			},
		})

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
