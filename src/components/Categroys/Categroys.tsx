/** @format */

import React, { Component } from "react"
import { Menu, Tabs, Affix } from "antd"
import { withRouter } from "dva/router"
import { connect } from "dva"
import { IEVersion } from "../../utils/Browser"
import "./index.d.ts"
import { replaceState, joinUrlEncoded } from "../../utils"

const IE = IEVersion()
const { TabPane } = Tabs

declare type MenuMode = "vertical" | "vertical-left" | "vertical-right" | "horizontal" | "inline"

interface Props {
	menus?: MenusItem[]
	dispatch?: any
	mode?: MenuMode
}
interface State { }
interface MenusItem {
	id: string
	name: string
	ispower: boolean
	sub: MenusItem[]
}
/**
 *
 *
 * @class Categroys 一级分类菜单
 * @extends {(Component<Props | any, State>)}
 */
@connect(({ HomeStore }: any) => HomeStore)
class Categroys extends Component<Props | any, State> {
	state = {}
	lastCateId: string = ""
	render() {
		const { mode, menus, selectKey, dispatch } = this.props
		return (
			<Menu theme='dark' mode={mode} selectedKeys={[selectKey]} style={{ lineHeight: "64px" }}>
				{menus.map((item: MenusItem) => {
					return (
						<Menu.Item
							key={item.id}
							onClick={() => {
								this.setMenusData(item.id)
							}}
						>
							{item.name}
						</Menu.Item>
					)
				})}
			</Menu>
		)
	}
	setMenusData(menusid: string) {
		const { menus, dispatch, location, history } = this.props

		// const { menus } = state
		let selectDatas = menus.filter((item: any) => item.id === menusid)
		let selectData = selectDatas.length ? selectDatas[0] : menus[0]
		const { id } = selectData.sub[0] || selectData
		const payload = {
			selectKey: selectData.id,
			secondaryMenus: selectData.sub,
			secondaryKey: id,
		}
		const isHome = location.pathname === '/home'
		this.lastCateId = id

		if (!isHome) return history.push(joinUrlEncoded('/home', {
			m: payload.selectKey,
			s: id
		}))


		dispatch({
			type: "HomeStore/save",
			payload,
			callback: (payload: any) => {
				replaceState(location.search, payload)
			},
		})

		// loading
		dispatch({
			type: "CMList/save",
			payload: {
				list: [],
				loading: true,
				empty: false,
			},
		})

		dispatch({
			type: "CMList/getData",
			payload: {
				id,
				start: 0,
			},
			callback: (payload: any) => {
				return this.lastCateId === payload.id
			},
		})
	}
}

/**
 *
 *
 * @class SecondaryCates 二级分类
 * @extends {Component<any, State>}
 */
@connect(({ HomeStore, searchStore }: any) => ({ ...HomeStore, searchStore }))
class SecondaryCates extends Component<any, State> {
	currentKey: any = null
	render() {
		const { secondaryMenus, secondaryKey, dispatch, id } = this.props
		if (!secondaryMenus.length) return null
		return (
			<Affix offsetTop={this.props.searchStore.searchBarShow ? 80 : 0}>
				<Tabs
					activeKey={secondaryKey}
					tabBarStyle={{ background: "#fff" }}
					animated={!IE}
					onChange={(key) => {
						this.currentKey = key
						dispatch({
							type: "HomeStore/save",
							payload: {
								secondaryKey: key,
							},
						})
						dispatch({
							type: "CMList/save",
							payload: {
								list: [],
								loading: true,
								empty: false,
							},
						})
						dispatch({
							type: "CMList/getData",
							payload: {
								id: key,
								start: 0,
							},
							callback: (payload: any) => {
								replaceState(this.props.location.search, {
									secondaryKey: key,
									selectKey: this.props.selectKey
								})
								return payload.id === this.currentKey
							},
						})
					}}
				>
					{secondaryMenus.map((item: MenusItem) => (
						<TabPane tab={item.name} key={item.id} />
					))}
				</Tabs>
			</Affix>
		)
	}
}

const SecondaryCate = withRouter(SecondaryCates)

export { SecondaryCate }

export default withRouter(Categroys)
