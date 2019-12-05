/** @format */

import React, { Component } from "react"
import { Card, Typography, Spin, Empty } from "antd"
import { connect } from "dva"
import { withRouter } from "dva/router"
import "./list.less"
import { joinUrlEncoded } from "../../utils"

const { Meta } = Card
interface Props {
	list?: List[]
	loading?: boolean
	empty?: boolean | string
}
interface State {}
const { Title, Text } = Typography

@connect(({ CMList }: any) => CMList)
class CMListPage extends Component<any | Props, State> {
	state = {}

	render() {
		const { list, loading, empty } = this.props
		return (
			<div className='listContainer'>
				<Spin spinning={loading} size='large'>
					{list.map((item: List, index: number) => (
						<Card
							className='CMListCard'
							key={index}
							hoverable
							loading={false}
							onClick={() => {
								this.goCMReader(item)
							}}
						>
							<Meta
								avatar={<img src={item.img} style={{ height: 100, width: 150 }} />}
								title={
									<Title level={4} ellipsis={{ rows: 2, expandable: false }}>
										{item.name}
									</Title>
								}
								description={<Text className='CMListDesc'>文件大小：{item.filesize}</Text>}
							/>
						</Card>
					))}
				</Spin>
				{empty && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={empty} />}
			</div>
		)
	}

	goCMReader(item: List) {
		const origin = location.href.split("#")
		const href = joinUrlEncoded(origin[0] + "#/view", {
			pid: item.pid,
			title: item.name,
		})
		window.open(href, "_blank")
	}
}

export default withRouter(CMListPage)
