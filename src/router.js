/** @format */

import React from "react"
import { Router, Route, Switch } from "dva/router"
import SubRoutes from "./utils/SubRoutes"

const RoutersConfig = [
	{
		path: "/",
		component: () => import("./pages/indexPage"),
		model: [import("./models/menus"), import("./models/CMList"),import("./models/searchModel")],
		routes: [
			{
				path: "/home",
				component: () => import("./pages/home/home"),
				model: [],
			},
			{
				path: "/search",
				component: () => import("./pages/search/searchPage"),
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
