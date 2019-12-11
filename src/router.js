/** @format */

import React from "react"
import { Router, Route, Switch } from "dva/router"
import SubRoutes from "./utils/SubRoutes"

const RoutersConfig = [
	{
		path: "/view",
		component: () => import("./pages/CMReader"),
		model: [],
	},
	{
		path: "/",
		component: () => import("./pages/indexPage"),
		model: [import("./models/menus"), import("./models/CMList")],
		routes: [
			{
				path: "/home",
				component: () => import("./pages/home/home"),
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
