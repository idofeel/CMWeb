/** @format */

interface RoutersConfig {
	path: string
	component: PromiseLike<any>
	model: any[]
	routes: RoutersConfig[]
}

interface RoutesProps extends RoutersConfig {
	routes: RoutersConfig[]
	global: ucenter
	location: any
	dispatch: any
	history:any
	app: any
}

// 用户中心
interface ucenter {
	uname: string
}
