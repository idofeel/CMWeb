/** @format */

import { get } from "../utils"
import Api from "../services/API"
import "./@types/menus.d.ts"
export default {
	namespace: "HomeStore",

	state: {
		menus: [],
		selectKey: "0",
		secondaryMenus: [],
		secondaryKey: "0",
	},

	subscriptions: {
		setup({ dispatch, history }: any) {
			// eslint-disable-line
		},
	},

	effects: {
		*fetch({ payload }: any, { call, put }: any) {
			// eslint-disable-line
			yield put({ type: "save" })
		},
		*getMenus({ payload, callback }: any, { call, put }: any) {
			const res = yield call(async () => await get(Api.main.menu))
			let { selectKey = -1, second = 0 } = payload
			if (res.success && res.data.length) {
				// 过滤选中key的数据
				const selectDatas = res.data.filter((item: any) => item.id === selectKey)
				// 获取选中的数据/ 没获取到取第一条数据
				const selectData = selectDatas.length ? selectDatas[0] : res.data[0] // 一级分类选中
				// 获取二级分类的id/和菜单数据
				let { id } = selectData

				if (selectData.sub && selectData.sub.length) {
					// 二级分类选中
					const secondDatas = selectData.sub.filter((item: MenusItem) => item.id === second)
					const { id: sid } = secondDatas[0] || selectData.sub[0]
					id = sid
				}
				if (payload.loadSecondaryCate) {
					yield put({
						type: "CMList/getData",
						payload: {
							id,
							start: 0,
						},
					})
					payload = {
						menus: res.data,
						selectKey: selectData.id,
						secondaryMenus: selectData.sub || [],
						secondaryKey: id,

					}
				} else {
					payload = {
						menus: res.data,
					}
				}
				yield put({
					type: "save",
					payload,
					callback,
				})
			}
		},
	},

	reducers: {
		save(state: HomeStore, { payload, callback }: any) {
			callback && callback(payload)
			return { ...state, ...payload }
		},
	},
}
