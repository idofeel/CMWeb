/** @format */

import { get } from "../utils"
import Api from "../services/API"

export default {
	namespace: "CMList",

	state: {
		list: [],
		start: 0,
		loading: true,
		loadEnd: false,
		empty: false,
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
		*getData({ payload, callback }: any, { call, put }: any) {
			// debugger
			if (payload.start < 0) return; // 没有数据了
			const res = yield call(async () => await get(Api.source.public, { ids: payload.id, st: payload.start }))
			if (res.success) {
				yield put({
					type: "saveList",
					payload: {
						...payload,
						start: res.next,
						loadEnd: res.next === -1,
						list: res.data.map((item: any) => {
							return {
								...item,
								width: 240,
								height: 125
							}
						}),
						loading: false,
						empty: false,
					},
					callback,
				})
			} else {
				yield put({
					type: "save",
					payload: {
						id: payload.id,
						list: [],
						loading: false,
						empty: res.faildesc,
					},
					callback,
				})
			}
		},
	},

	reducers: {
		save(state: CMList, { payload, callback }: any) {
			// callback 返回false 将不更新state
			const update = callback && callback(payload)
			if (update === false) {
				return { ...state }
			}
			return { ...state, ...payload }
		},
		saveList(state: CMList, { payload, callback }: any) {
			// callback 返回false 将不更新state
			const update = callback && callback(payload)

			if (update === false) {
				return { ...state }
			}
			let { list } = state;
			if (payload.loadNext) payload.list = list.concat(payload.list)
			console.log(payload)
			return { ...state, ...payload }
		},
	},
}
