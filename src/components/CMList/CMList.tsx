import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import ReactBarrel from '../react-barrel/react-barrel';
import { Spin, Card, Divider, Empty, Typography, Icon } from 'antd';
import { joinUrlEncoded, domain } from '../../utils';
import Image from '../Image';

import './CMList.less'

export interface ICMListProps extends CMListProps {
    list: any;
    loadMore: () => void,
    onEdit: () => void
    onDelete: () => void
    actions?: React.ReactNode[]
    hasMore: boolean
}


export interface ICMListState {
}


const { Title, Text } = Typography
const { Meta } = Card

export default class CMList extends React.Component<ICMListProps, ICMListState> {
    static defaultProps = {
        loadMore: () => { },
        onEdit: (item: any) => { },
        onDelete: (item, index) => { },
        hasMore: true,
    }
    constructor(props: ICMListProps) {
        super(props)
    }
    state = {
        modify: props.modify
    }

    public render() {
        const { list, loading, empty, loadEnd } = this.props

        return (
            <div className='listContainer'>
                {empty ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={empty} /> :
                    <InfiniteScroll
                        initialLoad={true}
                        pageStart={0}
                        loadMore={() => this.props.loadMore()}
                        hasMore={this.props.hasMore || false}
                        useWindow={true}
                    >
                        <Spin spinning={false} size='large'>
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
                                            // cover={<img src={require('../../assets/images/default.jpg')} bsrc={item.img} style={{ height: item.height, width: item.width }} />}
                                            cover={<Image source={item.img} style={{ height: item.height, width: item.width }} />}
                                            style={{
                                                marginRight: item.margin,
                                                marginBottom: 15,
                                            }}
                                            onClick={() => {
                                                this.goCMReader(item)
                                            }}
                                            actions={this.state.modify ? [
                                                <Icon type="edit" key="edit" onClick={(e) => {
                                                    e.stopPropagation()
                                                    e.preventDefault()
                                                    this.props.onEdit(item, index)
                                                }} />,
                                                <Icon type="delete" key="delete" onClick={(e) => {
                                                    e.stopPropagation()
                                                    e.preventDefault()
                                                    this.props.onDelete(item, index)
                                                }} />,
                                            ] : null}
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
                    </InfiniteScroll>
                }
            </div>
        );
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.state.modify !== nextProps.modify) {
            this.setState({
                modify: nextProps.modify
            })
        }
    }

    goCMReader(item: ListItem) {
        const origin = location.origin + '/web/cmweb.html#/'
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
