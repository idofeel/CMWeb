/** @format */

import React, { Component } from "react"
import { Card, Typography, Spin, Empty, List, Divider } from "antd"
import { connect } from "dva"
import { withRouter } from "dva/router"
import { joinUrlEncoded } from "../../utils"
import InfiniteScroll from 'react-infinite-scroller';
import ReactBarrel from "../../components/react-barrel/react-barrel"
import "./list.less"

interface Props {
	list?: List[]
	loading?: boolean
	empty?: boolean | string
}
interface State { }
const { Title, Text } = Typography
const { Meta } = Card

@connect(({ CMList }: any) => CMList)
class CMListPage extends Component<any | Props, State> {
	state = {}

	render() {
		const { list, loading, empty, loadEnd } = this.props
		// console.log('CMListCMListCMListCMListCMList', list)

		return (
			<div className='listContainer'>
				<InfiniteScroll
					initialLoad={false}
					pageStart={0}
					loadMore={() => this.loadMore()}
					hasMore={true}
					useWindow={true}
				>
					<Spin spinning={loading} size='large'>
						<ReactBarrel
							baseHeight={150}
							data={list}
							margin={15}
							autoload={false}
							renderItem={(item: any, index: any) => {
								return (
									<Card
										className='CMListCard'
										key={index}
										hoverable
										loading={false}
										cover={<img src={item.img} style={{ height: item.height, width: item.width }} />}
										style={{
											marginRight: item.margin,
											marginBottom: 15,
										}}
										onClick={() => {
											this.goCMReader(item)
										}}
									>
										<Meta
											title={
												<Title level={4} ellipsis={{ rows: 2, expandable: false }}>
													{item.name}
												</Title>
											}
											description={<Text className='CMListDesc'>文件大小：{item.filesize}</Text>}
										/>
									</Card>
								)
							}}
						/>
						{loadEnd && <Divider className="divider">已加载全部内容</Divider>}
					</Spin>
					{empty && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={empty} />}
				</InfiniteScroll>
			</div>
		)
	}

	goCMReader(item: List) {
		console.log(item);

		const origin = 'http://39.98.156.22/web/cmweb.html'
		const href = joinUrlEncoded(origin, {
			pid: item.pid,
			title: item.name,
		})
		window.open(href, "_blank")
	}
	loadMore() {
		const { id, start, dispatch } = this.props;

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

export default withRouter(CMListPage)
