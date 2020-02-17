import * as React from 'react';
import { Input, Upload, Icon, message, Form, TreeSelect, Tree, Button, Menu, Steps, Col, Tag, Result } from 'antd';
import CLEUpload from './CLEUpload';
import { connect } from 'dva';
import Search from 'antd/lib/input/Search';
import { get } from '../../utils';
import API from '../../services/API';

import './uploadPage.less'
const { TreeNode } = Tree;
const { Step } = Steps;
export interface IUploadPageProps {
}

export interface IUploadPageState {
    coverLoading: boolean
    imageUrl: string
    addCategory: boolean
    treeData: Menus[],
    defaultChecked: string[] | [],
    selectKeys: selectKey[]
    current: number,
    sourceId: string | number
}


interface selectKey {
    key: string[]
    cateid: string
    catename: string
}

const treeData = [{ "id": "2", "name": "推荐", "ispower": true, "sub": [] }, { "id": "3", "name": "用途分类", "ispower": true, "sub": [{ "id": "6", "name": "工业设备", "ispower": true, "sub": "0" }, { "id": "7", "name": "机械设备", "ispower": true, "sub": "0" }, { "id": "8", "name": "武器器械", "ispower": true, "sub": "0" }, { "id": "9", "name": "建筑", "ispower": true, "sub": "0" }, { "id": "10", "name": "家装", "ispower": true, "sub": "0" }, { "id": "11", "name": "电子产品", "ispower": true, "sub": "0" }, { "id": "13", "name": "机器人", "ispower": true, "sub": "0" }, { "id": "14", "name": "工具库", "ispower": true, "sub": "0" }] }, { "id": "4", "name": "行业分类", "ispower": true, "sub": [{ "id": "15", "name": "通用机械", "ispower": true, "sub": '0' }, { "id": "16", "name": "国防军工", "ispower": true, "sub": "0" }, { "id": "17", "name": "航空航天", "ispower": true, "sub": "0" }, { "id": "20", "name": "交通工具", "ispower": true, "sub": "0" }, { "id": "24", "name": "冰雪器具", "ispower": true, "sub": "0" }, { "id": "25", "name": "发动机", "ispower": true, "sub": "0" }] }]
const steps = [
    {
        title: '上传资源',
        content: 'First-content',
        name: 'upload'
    },
    {
        title: '添加分类',
        content: 'Second-content',
        name: 'addCate'
    },
    {
        title: '完成',
        content: 'Last-content',
        name: 'done'
    },
];


// @connect(({ HomeStore }) => (HomeStore))
export default class UploadPage extends React.Component<IUploadPageProps, IUploadPageState> {
    constructor(props: IUploadPageProps) {
        super(props);

        this.state = {
            coverLoading: false,
            imageUrl: '',
            addCategory: true,
            treeData: [],
            defaultChecked: [],
            current: 0,
            selectKeys: [],
            sourceId: 105
        }
    }

    public render() {

        const { imageUrl, current } = this.state;

        return (
            <div className='uploadPage'>
                <Steps current={current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className="steps-content" >{this.renderContent(current)}</div>
                <div className="steps-action">
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => this.next()}>
                            下一步
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            完成
                         </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                            上一步
                        </Button>
                    )}
                </div>
            </div>
        );

    }
    async next() {
        const current = this.state.current + 1;
        if (this.state.addCategory && current === 1) {
            let selectKeys = [], defaultChecked = []
            const res = await get(API.publish.hasCategory, { pid: 105 })
            if (res.success) {
                // delete res.data[1]
                selectKeys = res.data.map((item, index) => {
                    defaultChecked[index] = item.cateid
                    const key = item.key.split(',').filter(k => k !== '')
                    return {
                        ...item,
                        key,
                    }
                })
            }
            this.setState({ defaultChecked, current, selectKeys });
        }
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    renderContent(current: number) {
        const { imageUrl, treeData, defaultChecked, selectKeys } = this.state;
        const { name } = steps[current]
        if (name === 'upload') {
            const formItemLayout = {
                labelCol: { span: 4 },
                wrapperCol: { span: 12 },
            };
            const uploadButton = (
                <div>
                    <Icon type={this.state.coverLoading ? 'loading' : 'plus'} />
                    <div className="ant-upload-text">封面上传</div>
                </div>
            );
            return <>
                <Form.Item label="名称" {...formItemLayout} >
                    <Input />
                </Form.Item>
                <Form.Item label="封面上传" {...formItemLayout}>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={this.coverBeforeUpload}
                        onChange={this.handleChange}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Form.Item>
                <Form.Item label="CLE文件上传：" {...formItemLayout}>
                    <CLEUpload />
                </Form.Item>

            </>
        } else if (name === 'addCate') {
            return <TreeInfo
                treeData={treeData}
                defaultChecked={defaultChecked}
                selectKeys={selectKeys}
                sourceId={this.state.sourceId}
            />
        } else if (name === 'done') {
            return <Result
                status="success"
                title="操作成功"
                subTitle="上传成功，分类成功"
                extra={[
                    <Button type="primary" key="console">
                        返回
                    </Button>,
                    <Button key="buy">去首页</Button>,
                ]}
            />
        }

    }
    async componentDidMount() {
        const res = await get(API.publish.category);
        if (res.success) {
            this.setState({
                treeData: res.data
            })
        }


    }

    // getParentKey = (key, tree) => {
    //     let parentKey;
    //     for (let i = 0; i < tree.length; i++) {
    //         const node = tree[i];
    //         if (node.children) {
    //             if (node.children.some(item => item.key === key)) {
    //                 parentKey = node.key;
    //             } else if (this.getParentKey(key, node.children)) {
    //                 parentKey = this.getParentKey(key, node.children);
    //             }
    //         }
    //     }
    //     return parentKey;
    // };


    handleSubmit = () => {

    }
    handleChange = (info: any) => {
        if (info.file.status === 'uploading') {
            this.setState({ coverLoading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (imageUrl: any) =>
                this.setState({
                    imageUrl,
                    coverLoading: false,
                }),
            );
        }
    }
    coverBeforeUpload = (file: any) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('只能上传 JPG/PNG 文件!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('文件必须小于2M');
        }
        return isJpgOrPng && isLt2M;

    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }
}

function getBase64(img: any, callback: any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}


interface TreeInfoState {
    checkable: boolean
    checkedKeys?: string[]
    selectKeys?: selectKey[]
    value: string
    deleteList: string[] | []

}

interface TreeInfoProps {
    treeData: Menus[] | any
    defaultChecked?: string[]
    selectKeys: selectKey[]
    sourceId: string | number
}


class TreeInfo extends React.Component<TreeInfoProps, TreeInfoState> {
    constructor(props: TreeInfoProps) {
        super(props);
        this.state = {
            checkable: false,
            value: '',
            // expandedKeys: [],
            checkedKeys: this.props.defaultChecked, // 已选中的分类id
            selectKeys: this.props.selectKeys, // 选中的分类id路径
            deleteList: []
        }
    }


    render() {
        const { treeData } = this.props;
        const { checkedKeys, checkable, selectKeys } = this.state;
        return <div style={{ textAlign: 'left', padding: "0 20px" }}>
            {checkable && <Search style={{ margin: '8px 0 ' }} placeholder="Search" onChange={this.onChange} />}
            <div>
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
            <Tree
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
            </Tree>
        </div>
    }

    onCheck = async (checkedKeys: any, e) => {
        let { deleteList, checkedKeys: stateChecekds, selectKeys } = this.state
        if (e.checked) {
            // 添加
            const diff: string[] = checkedKeys.filter((item: string) => !(stateChecekds.indexOf(item) > -1))
            console.log(diff);

            deleteList = deleteList.filter(item => !(diff.indexOf(item) > -1))

            const parentKey = this.getParentKey(this.props.treeData, diff[0])
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

    getParentKey(data = treeData, id) {

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
            !this.state.checkable ? data = data.filter((item: Menus) => this.hasChecked(item)) : null
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
                        <>
                            <span>{title}</span>
                            {newDelete && <span style={{ fontSize: '12px', color: '#ccc', marginLeft: '5px' }}>刚刚删除</span>}
                        </>
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

    hasChecked(item: Menus): boolean {
        const selects = this.state.selectKeys.find(sitem => sitem.key.indexOf(item.id) > -1);
        return !!selects
    }

}