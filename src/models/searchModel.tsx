/** @format */

import { get } from "../utils"
import "./@types/menus.d.ts"
import API from "../services/API"

export default {
    namespace: "searchStore",

    state: {
        searchBarShow: false,
        start: 0,
        searchText: '',
        searching: false,
        searchResult: [],
        loadEnd: false,
        empty: false
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
        *search({ payload, callback }: any, { call, put }: any) {
            yield put({
                type: "save",
                payload: {
                    ...payload,
                    searching: true
                }
            })

            let res = yield call(async () => await get(API.source.search, { name: payload.searchText, st: payload.start || 0 }))
            if (res.success) {
                payload = {
                    ...payload,
                    searchResult: res.data.map((item: any) => {
                        return {
                            ...item,
                            width: 240,
                            height: 125
                        }
                    }),
                    searching: false,
                    start: res.next,
                    loadEnd: res.next === -1,
                    empty: false
                }

            } else {
                payload = {
                    searchResult: [],
                    searching: false,
                    loadEnd: false,
                    empty: res.faildesc
                }
            }

            yield put({
                type: "connectResult",
                payload
            })

        },
    },

    reducers: {
        save(state: any, { payload }: any) {
            return { ...state, ...payload }
        },
        connectResult(state: any, { payload }: any) {
            let { searchResult, start } = state

            if (payload.loadMore) payload.searchResult = searchResult.concat(payload.searchResult)
            return { ...state, ...payload }
        },
        toggleSearchBar(state: any, { payload }: any) {
            const searchBarShow = !state.searchBarShow
            return { ...state, searchBarShow }
        }
    },
}
