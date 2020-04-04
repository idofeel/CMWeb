import React from 'react';
import Search from 'antd/lib/input/Search';
import { Tag, Button, Tree, Icon, Popover, Menu, Modal, Input, message } from 'antd';
import { get } from '../../utils';
import API from '../../services/API';
import './CateTree.less'

interface selectKey {
    key: string[]
    cateid: string
    catename: string
}

interface TreeInfoState {
    checkable: boolean
    checkedKeys?: string[]
    selectKeys?: selectKey[]
    value: string
    deleteList: string[] | []
    hoverKey: string
    cateEdit: any,
    cateOperation: string,
    loading: boolean
    parentid: any
    treeData: Menus[] | any

}

interface TreeInfoProps {
    defaultChecked?: string[]
    selectKeys: selectKey[]
    sourceId: string | number // 存在id，可以进行复选功能
    onRemove: () => {}
    onAdd: () => {}
    onEdit: () => {}
    onCheck?: () => {}
}

const { TreeNode } = Tree

export default class TreeInfo extends React.Component<TreeInfoProps, TreeInfoState> {
    constructor(props: TreeInfoProps) {
        super(props);
        this.state = {
            treeData: [],
            checkable: false,
            value: '',
            parentid: '', // 
            // expandedKeys: [],
            checkedKeys: this.props.defaultChecked || [], // 已选中的分类id
            selectKeys: this.props.selectKeys || [], // 选中的分类id路径
            deleteList: [],
            hoverKey: '',
            cateOperation: '',
            loading: false,
            cateEdit: [
                {
                    id: 'addCategory',
                    name: '增加同级分类',
                    icon: 'folder-add',
                    onClick: this.onAddCate
                },
                {
                    id: 'addChildCategory',
                    name: '增加子级分类',
                    icon: 'plus-circle',
                    onClick: this.onAddChildCate
                },
                {
                    id: 'editCategory',
                    name: '编辑分类',
                    icon: 'edit',
                    onClick: this.onEditCate
                },
                {
                    id: 'removeCategory',
                    name: '删除分类',
                    icon: 'delete',
                    disabled: true,
                    onClick: (item, index) => {
                        // this.props.onRemove(item, index)
                    }
                },
            ]
        }
    }


    render() {
        const { onCheck } = this.props;
        const { checkedKeys, checkable, selectKeys, treeData } = this.state;
        return <div className="categoryRoot"  >
            {!!this.props.sourceId && <>
                <h3>当前已选分类</h3>
                <div style={{ paddingBottom: '10px', borderBottom: '1px solid #ccc' }}>
                    {selectKeys.length ? selectKeys.map(item => {
                        return <Tag key={item.id} >
                            {item.catename}
                        </Tag>
                    }) : '当前没有分类请点击“操作”选择分类  '}
                    <Button type="primary" onClick={() => {
                        this.setState({
                            checkable: !checkable,
                            // checkedKeys: [{ key: ['3', '6'] }, { key: ['3', '7'] }]
                        })
                    }}>
                        {checkable ? '仅看已选择的分类' : '操作'}
                    </Button>
                </div>
            </>
            }
            {/* {!!onCheck && <div style={{ paddingBottom: '10px', borderBottom: '1px solid #ccc' }}>
                {selectKeys.length ? selectKeys.map(item => {
                    return <Tag key={item.id} >
                        {item.catename}
                    </Tag>
                }) : '当前没有分类请点击“操作”选择分类  '}
                <Button type="primary" onClick={() => {
                    this.setState({
                        checkable: !checkable,
                        // checkedKeys: [{ key: ['3', '6'] }, { key: ['3', '7'] }]
                    })
                }}>
                    {checkable ? '仅看已选择的分类' : '操作'}
                </Button>
            </div>} */}
            {(checkable || !onCheck) && <Search style={{ margin: '8px 0 ' }} placeholder="Search" onChange={this.onChange} />}

            {treeData.length ? <Tree
                // multiple
                // expandedKeys={this.state.expandedKeys}
                autoExpandParent={true}
                selectable={false}
                defaultExpandAll={true}
                checkable={checkable}
                checkedKeys={checkedKeys}
                onCheck={this.onCheck}
            >
                {this.loop(treeData)}
            </Tree> : <Button>当前没有任何分类，点击添加新的分类</Button>}
            <Modal
                title={`${this.state.cateOperation === 'edit' ? '修改' : '新增'}分类`}
                visible={this.state.cateOperation === 'add' || this.state.cateOperation === 'edit'}
                confirmLoading={this.state.loading}
                okText="确认"
                cancelText="取消"
                onCancel={() => this.setState({ cateOperation: '' })}
                onOk={() => {
                    this.setState({
                        loading: true
                    })
                    this.submitCate();
                }}
            >
                <Input addonBefore="分类名称：" value={this.state.value} onChange={e => this.setState({ value: e.target.value })} />

            </Modal>
        </div>
    }


    async getData() {

        let treeReqList = [get(API.publish.category)];
        if (this.props.sourceId) treeReqList.push(get(API.publish.hasCategory, { pid: this.props.sourceId }));

        const [cateData, hasCate] = await Promise.all(treeReqList);

        let treeData = [], selectKeys = [], defaultChecked: any = [];

        if (cateData.success) {
            treeData = cateData.data
        }

        if (hasCate && hasCate.success) {
            selectKeys = hasCate.data.map((item, index) => {
                defaultChecked[index] = item.cateid
                const key = item.key.split(',').filter(k => k !== '')
                return {
                    ...item,
                    key,
                }
            })

        }
        this.setState({
            treeData,
            checkedKeys: defaultChecked,
            selectKeys
        })


    }


    onAddCate = (item) => {
        let keys = item.key.split(','),
            cIndex = keys.indexOf(item.id);
        this.setState({ cateOperation: 'add', parentid: keys[cIndex - 1], value: '' })


    }
    onAddChildCate = (item) => {
        this.setState({ cateOperation: 'add', parentid: item.id, value: '' })


    }
    onEditCate = (item) => {
        this.setState({ cateOperation: 'edit', parentid: item.id, value: item.name })

    }

    async submitCate() {
        const { parentid, value: catename, cateOperation } = this.state;
        let url = cateOperation === 'add' ? API.publish.addCate : API.publish.reName;
        this.setState({
            loading: false,
            cateOperation: '',
        })

        const res = await get(url, { cateid: parentid, parentid, catename })
        if (res.success) {
            message.success('操作成功')
            this.getData()
        } else {
            message.error(res.faildesc || '操作失败')
        }




    }


    onCheck = async (checkedKeys: any, e) => {
        let { deleteList, checkedKeys: stateChecekds, selectKeys } = this.state
        if (e.checked) {
            // 添加
            const diff: string[] = checkedKeys.filter((item: string) => !(stateChecekds.indexOf(item) > -1))
            console.log(diff);

            deleteList = deleteList.filter(item => !(diff.indexOf(item) > -1))

            const parentKey = this.getParentKey(this.state.treeData, diff[0])
            console.log(parentKey);

            const temp = {
                id: parentKey.id,
                key: parentKey.key.split(',').filter(k => k !== ''),
                catename: parentKey.name,
            }

            const res = await get(API.publish.insertCate, { pid: this.props.sourceId, cateid: diff[0] })
            selectKeys.push(temp)

            // selectKeys.push(selectKey)

        } else {
            // 删除
            const diff: any = stateChecekds.filter(item => !(checkedKeys.indexOf(item) > -1))
            const res = await get(API.publish.deleteCate, { pid: this.props.sourceId, cateid: diff[0] })
            deleteList = deleteList.concat(diff)
            selectKeys = selectKeys.filter(item => checkedKeys.indexOf(item.cateid) > -1)
        }

        this.setState({
            checkedKeys,
            deleteList,
            selectKeys
        })
    }

    getParentKey(data, id) {

        let key = null
        for (let i = 0; i < data.length; i++) {
            const node = data[i];
            if (node.id === id) {
                return key = node
            } else if (node.sub && node.sub.length) {
                if (key) return key;
                key = this.getParentKey(node.sub, id)
            }
        }
        return key

    }
    loop = (data: Menus[] | any) => {
        if (data && data.length && data !== '0') {
            !this.state.checkable && this.props.onCheck ? data = data.filter((item: Menus) => this.hasChecked(item)) : null
            return data.map((item: Menus, index: number) => {
                const itemIndex = item.name.indexOf(this.state.value);
                const beforeStr = item.name.substr(0, itemIndex);
                const afterStr = item.name.substr(itemIndex + this.state.value.length);
                const title =
                    itemIndex > -1 ? (
                        <span>
                            {beforeStr}
                            <span style={{ color: '#f50' }}>{this.state.value}</span>
                            {afterStr}
                        </span>
                    ) : (
                            <span>{item.name}</span>
                        );
                const newDelete = this.state.deleteList.indexOf(item.id) > -1 && this.state.checkable
                return <TreeNode

                    title={
                        <Popover
                            content={
                                <Menu>
                                    {this.state.cateEdit.map((cateItem, cateIndex) => (
                                        <Menu.Item key={cateIndex} >
                                            <Button type="link" size="large" color="red" disabled={cateItem.disabled} icon={cateItem.icon} onClick={() => cateItem.onClick(item, index)}>
                                                {cateItem.name}
                                            </Button>
                                        </Menu.Item>
                                    ))}
                                </Menu>
                            }
                            title="分类操作"
                            trigger="focus"
                            placement="right"
                            visible={this.state.hoverKey === item.id}
                        // onVisibleChange={(e) => {
                        //     console.log(e);

                        //     // this.setState({
                        //     //     hoverKey: e ? item.id : ''
                        //     // })
                        // }}
                        >
                            <div
                                onContextMenu={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    this.setState({
                                        hoverKey: item.id
                                    })
                                    return false
                                }}
                            >
                                <span>{title}</span>
                                {newDelete && <span style={{ fontSize: '12px', color: '#ccc', marginLeft: '5px' }}>刚刚删除</span>}
                                {/* {this.state.hoverKey === item.id && <div className="edit_box">
                                    <Icon type="plus" />
                                    <Icon type="edit" />
                                    <Icon type="delete" />
                                </div>} */}
                            </div>
                        </Popover>

                    } key={item.id} checkStrictly={true}

                    checkable={!item.sub || !item.sub.length || item.sub === '0'}

                >
                    {this.loop(item.sub)}
                </TreeNode >
            })
        }
    }
    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        // const expandedKeys = treeData.map(item => {
        //     if (item.name.indexOf(value) > -1) {
        //         return this.getParentKey(item.key, treeData);
        //     }
        //     return null;
        // }).filter((item, i, self) => item && self.indexOf(item) === i);
        // this.setState({
        //     expandedKeys,
        //     searchValue: value,
        //     autoExpandParent: true,
        // });
        this.setState({ value });
    };

    DocClick = () => {
        this.setState({
            hoverKey: ''
        })
    }
    async componentDidMount() {
        document.addEventListener('click', this.DocClick)
        this.getData();
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.DocClick)
    }

    hasChecked(item: Menus): boolean {
        const selects = this.state.selectKeys.find(sitem => sitem.key.indexOf(item.id) > -1);
        return !!selects
    }

}