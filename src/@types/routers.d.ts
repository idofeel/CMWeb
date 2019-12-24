/** @format */

interface RoutersConfig {
	path: string
	component: PromiseLike<any>
	model: any[]
	routes: RoutersConfig[]
	location: any,
	history: any,
	dispatch: any
}

interface RoutesProps extends RoutersConfig {
	routes: RoutersConfig[]
	global: globalProps
	location: any
	dispatch: any
	history: any
	app: any
}

// 用户中心
interface globalProps {
	uname: string
	forceUpdata: boolean
	register: boolean
	login: boolean
}
