/** @format */

import React, { Component } from "react"
import _fetch from "dva/fetch"
import style from "./home.less"
import CMList from "../CMReader/list"
interface Props {}
interface State {}

export default class index extends Component<Props, State> {
	state = {
		value: "",
	}

	render() {
		return (
			<div className={style.a}>
				<CMList />
			</div>
		)
	}

	async componentDidMount() {}
}
