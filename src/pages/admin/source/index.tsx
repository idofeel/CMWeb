import * as React from 'react';
import { Layout, Menu, Icon, Input, Modal, Button, message } from 'antd';
import Categroys from '../../../components/Categroys/Categroys';
import { connect } from 'dva';
import { get } from '../../../utils';
import API from '../../../services/API';
import CMList from '../../../components/CMList/CMList';

const { confirm } = Modal;
const { Header, Sider, Content } = Layout
const { SubMenu } = Menu
const { Search } = Input

export interface ISourceAdminProps {
}

export interface ISourceAdminState {
}

@connect(({ HomeStore }: any) => HomeStore)
export default class SourceAdmin extends React.Component<ISourceAdminProps, ISourceAdminState> {
    constructor(props: ISourceAdminProps) {
        super(props);

        const menusOptions = { selectKey: [], openKeys: [], keyWords: '' }

        const pageData = JSON.parse(localStorage.getItem('sourceKeys')) || menusOptions;

        this.state = {
            ...pageData,
            list: [],
            searching: false,
            empty: ''
        }

    }

    public render() {
        const { menus } = this.props;
        if (!menus || menus.length < 1) return null;
        return (
            <Layout>
                <Sider width={240} style={{ background: '#fff' }}>
                    <Button type="primary" block style={{ margin: '10px 0', }} onClick={() => this.props.history.push('/admin/upload')}>新增资源</Button>

                    <Search
                        style={{ margin: '10px 0' }}
                        placeholder="输入关键词查找资源"
                        value={this.state.keyWords}
                        onChange={e => this.setState({ keyWords: e.target.value })}
                        onSearch={this.onSearchSource}
                        enterButton
                        loading={this.state.searching}
                    />

                    <h3>资源分类</h3>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        // defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                        selectedKeys={this.state.selectKey}
                        // defaultOpenKeys={[this.state.openKeys]}
                        openKeys={this.state.openKeys}
                        onOpenChange={(openKeys) => {
                            this.setState({
                                openKeys
                            })
                        }}
                        onSelect={this.handleClick}
                    >
                        {menus.map((item, index) => {
                            if (item.sub.length) {
                                return <SubMenu
                                    key={`sub${item.id}`}
                                    title={
                                        <span>
                                            {item.name}
                                        </span>
                                    }
                                >
                                    {item.sub.map(subitem => <Menu.Item key={`sub${subitem.id}`} data={subitem}>{subitem.name}</Menu.Item>)}

                                </SubMenu>
                            }
                            return <Menu.Item key={`sub${item.id}`} data={item}>{item.name}</Menu.Item>
                        })}
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content
                        style={{
                            background: '#fff',
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <CMList
                            list={this.state.list}
                            modify={true}
                            empty={this.state.empty}
                            hasMore={this.next !== -1}
                            loadMore={() => {

                                const keys = this.state.selectKey;
                                console.log('loadMore', keys);

                                keys.length ? this.getData(keys[0].replace(/sub/, '')) : this.search(this.state.keyWords)
                            }}
                            onDelete={this.onDelete}
                            onEdit={this.onEdit}
                        />
                    </Content>
                </Layout>
            </Layout>
        );
    }

    onDelete = async (item: any, index: number) => {
        confirm({
            title: '删除资源？',
            icon: <Icon type="delete" />,
            content: `请确认是否删除“${item.name}”资源`,
            okText: '确认删除',
            cancelText: '取消',
            onOk: async () => {
                const res = await get(API.public.delete, { pid: item.pid })
                if (res.success) {
                    message.success(`删除${item.name}成功！`);
                    let { list } = this.state;
                    list = list.filter((item, i) => index !== i)
                    this.setState({ list })
                } else {
                    message.error(item.faildesc || '删除失败！')
                }
            },
        });
    }

    // 编辑
    onEdit = async (item: any, index: number) => {
        console.log(item);

        this.props.history.push('/admin/upload?pid=' + item.pid)
    }

    handleClick = async ({ item, selectedKeys }: any) => {
        this.next = 0; // 初始化起始值
        this.setState({
            selectKey: selectedKeys,
            list: [],
            empty: false,
            keyWords: ''
        })
        this.setKeys(selectedKeys)
    }

    onSearchSource = (value: string) => {
        if (value === '') return
        this.next = 0
        this.setState({
            searching: true,
            selectKey: [],
            openKeys: [],
            list: [],
            empty: false,
        }, () => this.setKeys());
        // 请求查找
        // this.search(value);
    }

    async search(value: string) {
        if (this.next === -1) return;
        const res = await get(API.source.search, { name: value, st: this.next });
        let { list } = this.state;
        if (res.success) {
            list = list.concat(this.setWidthAndHeight(res.data))
            this.setState({
                list,
                empty: false,
                searching: false
            });
            this.next = res.next; // 
        } else {
            this.setState({
                list: [],
                empty: `搜索关键词 “${this.state.keyWords}” ${res.faildesc || '失败'} `,
                searching: false
            }, () => this.next = -1)
        }
    }

    findInitIndex(menus: any[], initIndex: number, parentNode?: any): any {
        const currentNode = menus[initIndex];
        if (!currentNode.sub || currentNode.sub === '0' || currentNode.sub.length < 1) {
            // 没有子元素
            return { parentNode, currentNode }
        } else {
            // 有子元素
            return this.findInitIndex(currentNode.sub, 0, currentNode);
        }
    }

    async componentDidMount() {
        await this.props.dispatch({
            type: 'HomeStore/getMenus',
            payload: {
                selectKey: 0,
                second: 0,
            },
        })

        const { selectKey, keyWords } = this.state;

        console.log('componentDidMount', this);

        if (selectKey.length) {
            this.setState({
                keyWords: '',
                empty: false
            })
            return;
        }
        if (!keyWords) {
            const { parentNode, currentNode } = this.findInitIndex(this.props.menus, 0);
            // this.getData(currentNode.id)
            this.setState({
                selectKey: [`sub${currentNode.id}`],
                openKeys: [`sub${parentNode ? parentNode.id : currentNode.id}`],
                empty: false
            }, () => this.setKeys())
        }

    }

    setKeys(selectKey = this.state.selectKey, openKeys = this.state.openKeys, keyWords = this.state.keyWords) {

        localStorage.setItem('sourceKeys', JSON.stringify({ selectKey, openKeys, keyWords }))
    }

    private next: number = 0; // 开始下标
    async getData(id: string, st: number = this.next) {
        if (st < 0) return;
        const res = await get(API.source.public, { ids: id, st });
        let { list, empty } = this.state;
        if (res.success) {
            list = list.concat(this.setWidthAndHeight(res.data))
            this.next = res.next;
        } else {
            empty = `当前分类${res.faildesc || '资源加载失败'} `
        }
        this.setState({ list })
    }

    setWidthAndHeight(data: any[]) {
        return data.map(item => {
            item.width = 240;
            item.height = 125;
            return item;
        })
    }
}
