/** @format */

import React, { Component } from "react"
import _fetch from "dva/fetch"
import style from "./home.less"
import CMList from "../../components/CMList/CMList"
import { connect } from "dva"
interface Props extends CMListProps {
	id: string
	start: number
	dispatch: any
}
interface State { }

@connect(({ CMList }: any) => CMList)
export default class index extends Component<Props, State> {
	state = {
		value: "",
	}

	render() {
		const { list, loading, empty, loadEnd } = this.props

		return (
			<div className={style.a}>
				<CMList
					loadMore={() => {
						this.loadMore();
					}}
					list={list}
					loading={loading}
					empty={empty}
					loadEnd={loadEnd}
				/>
			</div>
		)
	}

	loadMore() {
		const { id, start, dispatch } = this.props;
		if (!id) return
		dispatch({
			type: 'CMList/getData',
			payload: {
				id,
				start,
				loadNext: true
			}
		})
		// alert('loadmore')
	}
}
