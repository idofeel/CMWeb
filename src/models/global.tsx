import API from "../services/API";
import { get, post } from "../utils";
import { message } from "antd";

export default {
	namespace: "global",

	state: {
		uname: "",
		avatar: '',
		loginModal: false,
		registerModal: false,
		orgname: '',
		rolename: '',
		forceUpdata: true, // 强制更新数据
		checkLogin: null,
		islogin: false,
		roleid:'',
	},

	subscriptions: {
		setup({ dispatch, history }: any) {
			// eslint-disable-line
		}
	},

	effects: {
		*fetch({ payload }: any, { call, put }: any) {
			// eslint-disable-line
			yield put({ type: "save" });
		},
		*login({ payload }: any, { call, put }: any) {
			const res = yield call(async () => await post(API.auth.login, payload));
			if (res.success) {
				yield put({
					type: "saveUserInfo",
					payload: res.data
				});

				yield put({
					type: "ucenter/saveUserInfo",
					payload: res.data
				});
				message.success('登录成功')
			} else {
				message.warn(res.faildesc || '登录失败')
			}
		},
		*isLogin({ payload }: any, { call, put }: any) {
			const res = yield call(async () => await get(API.auth.islogin));
			if (res.success) {
				payload = {
					...res.data,
					uname: res.data.dispname,
					avatar: res.data.avatar,
					orgname: res.data.orgname,
					rolename: res.data.rolename,
					// loginModal: false,
					// registerModal: false,
					checkLogin: true,
					islogin: true,
				}

				// message.success('已登录')
			} else {
				payload = {
					uname: '',
					avatar: '',
					orgname: '',
					rolename: '',
					// loginModal: true,
					// registerModal: false,
					checkLogin: true,
					roleid:''
				}
				// message.warn('未登录')
			}

			yield put({
				type: "save",
				payload
			});

			// if (!payload.initCheck) 
		},
		*logout({ payload }: any, { call, put }: any) {
			const res = yield call(async () => await post(API.auth.logout));
			if (res.success) {
				yield put({
					type: "initUserInfo",
				});
				message.info('已退出登录！')
			}
		},
		// *register({ payload }: any, { call, put }: any) {
		// 	const res = yield call(async () => await post(API.auth.register, payload));
		// 	if (res.success) {
		// 		yield put({
		// 			type: "initUserInfo",
		// 		});
		// 		message.info('已退出登录！')
		// 	}
		// },
	},

	reducers: {
		save(state: any, action: any) {
			return { ...state, ...action.payload };
		},
		saveUserInfo(state: any, { payload }: any) {
			// 服务器返回信息
			const { dispname: uname, avatar, orgname, rolename } = payload;
			return { ...state, ...payload, uname, loginModal: false, registerModal: false, islogin: true, checkLogin: true };
		},
		initUserInfo(state: any, { payload }: any) {
			payload = {
				uname: "",
				avatar: '',
				orgname: '',
				rolename: '',
				loginModal: false,
				registerModal: false,
				forceUpdata: true,
				checkLogin: false,
				islogin: false,
			}
			return { ...state, ...payload };
		},
		setAvatar(state: any, { payload }: any) {
			return { ...state, avatar: payload.avatar };
		}

	}
};
