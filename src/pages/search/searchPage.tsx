import * as React from 'react';
import { Spin, Card, Typography, Divider, Empty } from 'antd';
import { connect } from 'dva';
import InfiniteScroll from 'react-infinite-scroller';
import ReactBarrel from '../../components/react-barrel/react-barrel';

import '../CMReader/list.less'
import { joinUrlEncoded } from '../../utils';
export interface ISearchPageProps {
    searching: boolean
    searchResult: []
    loadEnd: boolean
    dispatch: any
    searchText: string
    start: number
}

export interface ISearchPageState {
}

const { Title, Text } = Typography
const { Meta } = Card


@connect(({ searchStore }: any) => searchStore)
export default class SearchPage extends React.Component<ISearchPageProps, ISearchPageState> {
    constructor(props: ISearchPageProps) {
        super(props);

        this.state = {
        }
    }

    public render() {
        const { searching, searchResult, loadEnd } = this.props;
        const empty = (loadEnd && searchResult.length === 0) ? '搜索结果为空' : this.props.empty;
        return (
            <div className='listContainer'>
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={() => this.loadMore()}
                    hasMore={true}
                    useWindow={true}
                >
                    <Spin spinning={searching} size='large'>
                        <ReactBarrel
                            baseHeight={150}
                            data={searchResult}
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
        );
    }
    componentDidMount() {
        console.log(this.props);

    }

    loadMore() {
        if (this.props.start < 0 || this.props.searching) return;
        this.props.dispatch({
            type: 'searchStore/search',
            payload: {
                searchText: this.props.searchText,
                start: this.props.start,
                loadMore: true
            }
        })


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
}
