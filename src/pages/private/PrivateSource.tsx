import * as React from 'react';
import API from '../../services/API';
import request, { get, joinUrlEncoded } from '../../utils';
import { Tabs, Button, Icon, Alert, Modal, message, Input } from 'antd';
import CMList from '../../components/CMList/CMList';
import CopyToClipboard from 'react-copy-to-clipboard';
const { confirm } = Modal;
const { TabPane } = Tabs;
const { Search } = Input;
const InputGroup = Input.Group;

export interface IPrivateSourceProps {
}

export interface IPrivateSourceState {
}


const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1616415_x0co1i09pnp.js',
});




export default class PrivateSource extends React.Component<IPrivateSourceProps, IPrivateSourceState> {
    constructor(props: IPrivateSourceProps) {
        super(props);

        this.state = {
            list: [],
            loading: false,
            empty: false,
            loadEnd: false,
            modify: false,
        }
    }

    public render() {
        const { list, loading, empty, loadEnd, modify } = this.state

        return (
            <div>
                <Tabs defaultActiveKey="1" onChange={this.tabChange}>
                    <TabPane tab="我的资源" key="1"></TabPane>
                    <TabPane tab="资源修改" key="2"></TabPane>
                </Tabs>
                <div>
                    <Button onClick={() => this.props.history.push('/upload')}>新增资源</Button>
                    <CMList
                        loadMore={() => {
                            this.loadMore();
                        }}
                        list={list}
                        loading={loading}
                        empty={empty}
                        loadEnd={loadEnd}
                        modify={modify}
                        onEdit={modify && this.itemClick}
                        onDelete={modify && this.delete}
                        onShare={(item, index) => {
                            this.info(item, index)
                        }}
                    />
                </div>
            </div>
        );
    }

    async info(item, index) {
        console.log(this)
        const res = await get(API.source.share, { pid: item.pid, count: 0, days: 30 });
        if (!res.success) return message.error(res.faildesc || ' 分享失败！');

        const value = joinUrlEncoded(`${location.origin + location.pathname}#/share`, { lic: res.lic, pid: item.pid })

        Modal.info({
            title: '分享链接',
            content: (
                <>
                    <InputGroup compact>
                        <Input style={{ width: '60%' }} defaultValue={value} />
                        <CopyToClipboard
                            text={value}
                            onCopy={() => {
                                message.success("复制成功")
                            }}>
                            <Button icon="copy">复制链接</Button>
                        </CopyToClipboard>
                    </InputGroup>
                </>

            ),
            okText: '关闭',
        });
    }
    itemClick = item => {
        this.props.history.push(joinUrlEncoded('/upload', { pid: item.pid }))
    }

    delete = (item: any, index: any) => {
        confirm({
            title: '删除资源？',
            icon: <Icon type="delete" />,
            content: `请确认是否删除“${item.name}”资源`,
            okText: '确认删除',
            cancelText: '取消',
            onOk: async () => {
                const res = await get(API.source.delete, { pid: item.pid })
                if (res.success) {
                    message.success(`删除${item.name}成功！`);
                    let { list } = this.state;
                    list = list.filter(l => l.pid !== item.pid);
                    this.setState({ list })
                } else {
                    message.error(item.faildesc || '删除失败！')
                }
            },
        });
    }

    async componentDidMount() {
        const res = await get(API.source.private, { ids: [], start: 0 })
        if (res.success) {
            this.setState({
                list: res.data.map((item: any) => {
                    return {
                        ...item,
                        width: 240,
                        height: 125
                    }
                }),
                loading: false,
            })
        }
    }

    loadMore = async () => {
        // const res = await get(API.source.private, { ids: [2], start: 0 })
        // if (res.success) {
        //     console.log(res.data);
        //     this.setState({
        //         list: res.data,
        //         loading: false,
        //     })
        // }
    }

    tabChange = (key: any) => {

        this.setState({ modify: key === '2' })
    }
}
