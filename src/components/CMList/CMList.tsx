import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import ReactBarrel from '../react-barrel/react-barrel';
import { Spin, Card, Divider, Empty, Typography, Icon } from 'antd';
import { joinUrlEncoded, domain } from '../../utils';

import './CMList.less'

export interface ICMListProps extends CMListProps {
    loadMore: () => void,
    actions?: React.ReactNode[]
}


export interface ICMListState {
}


const { Title, Text } = Typography
const { Meta } = Card

export default class CMList extends React.Component<ICMListProps, ICMListState> {
    static defaultProps = {
        loadMore: () => { }
    }
    constructor(props: ICMListProps) {
        super(props)
    }



    public render() {
        const { list, loading, empty, loadEnd, actions } = this.props
        return (
            <div className='listContainer'>
                <InfiniteScroll
                    initialLoad={true}
                    pageStart={0}
                    loadMore={() => this.props.loadMore()}
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
                                        actions={actions}
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

    goCMReader(item: ListItem) {
        const origin = domain + '/web/cmweb.html'
        const href = joinUrlEncoded(origin, {
            pid: item.pid,
            title: item.name,
        })
        window.open(href, "_blank")
    }
    componentWillUnmount() {
        // 卸载异步操作设置状态
        this.setState = (state, callback) => {
            return;
        }
    }
}
