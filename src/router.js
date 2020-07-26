/** @format */

import React from "react"
import { Router, Switch } from "dva/router"
import SubRoutes from "./utils/SubRoutes"

const RoutersConfig = [
	{
		path: "/admin",
		component: () => import("./pages/admin"),
		model: [import("./models/menus")],
		routes: [
			{
				path: "/admin/source",
				component: () => import("./pages/admin/source"),
				model: [],
			},
			{
				path: "/admin/category",
				component: () => import("./pages/admin/categorys"),
				model: [],
			},
			{
				path: "/admin/upload",
				component: () => import("./pages/admin/public/publicUpload"),
				model: [],
			},
		]
	},
	{
		path: "/",
		component: () => import("./pages/indexPage"),
		model: [import("./models/menus"), import("./models/CMList"), import("./models/searchModel"), import("./models/Ucenter")],
		routes: [
			{
				path: "/home",
				component: () => import("./pages/home/home"),
				model: [],
			},
			{
				path: "/share",
				component: () => import("./pages/share/sharePage"),
				model: [],
			},
			{
				path: "/private",
				component: () => import("./pages/private/PrivateSource"),
				model: [],
			},
			{
				path: "/search",
				component: () => import("./pages/search/searchPage"),
				model: [],
			},
			{
				path: "/upload",
				component: () => import("./pages/private/PrivateUploadPage"),
				model: [],
			},
			{
				path: "/register",
				component: () => import("./pages/ucenter/register"),
				model: [],
			},
			{
				path: "/profile",
				component: () => import("./pages/ucenter/profile/ProfilePage"),
				model: [],
			},

			// {
			// 	path: "/uploadimg",
			// 	component: () => import("./components/UploadImg"),
			// 	model: [],
			// },

		],


	},

]
function RouterConfig({ history, app }) {
	return (
		<Router history={history}>
			<Switch>
				{/* <Route path="/" exact component={IndexPage} />
        <Route path="/home" exact component={AsyncComponent(Home)} /> */}

				{RoutersConfig.map((route, i) => (
					<SubRoutes key={i} {...route} app={app} />
				))}
			</Switch>
		</Router>
	)
}

export default RouterConfig
