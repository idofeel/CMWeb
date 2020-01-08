/** @format */

import React from "react"
import { Router, Route, Switch } from "dva/router"
import SubRoutes from "./utils/SubRoutes"

const RoutersConfig = [
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
				component: () => import("./pages/upload/uploadPage"),
				model: [],
			},
			{
				path: "/register",
				component: () => import("./pages/ucenter/register"),
				model: [],
			},

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
