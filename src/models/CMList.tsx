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
			const res = yield call(async () => await get(Api.source.public, { ids: payload.id, st: payload.start }))
			if (res.success) {
				yield put({
					type: "save",
					payload: {
						...payload,
						start: res.next,
						loadEnd: res.next === -1,
						list: res.data,
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
	},
}
