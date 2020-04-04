import * as React from 'react';
import TreeInfo from '../../../components/CateTree/CateTree';
import { get } from '../../../utils';
import API from '../../../services/API';

export interface ICategorysProps {
}

export interface ICategorysState {
}

export default class Categorys extends React.Component<ICategorysProps, ICategorysState> {
    constructor(props: ICategorysProps) {
        super(props);

        this.state = {
            treeData: [],
        }
    }

    public render() {
        return (
            <div>
                <TreeInfo
                    treeData={this.state.treeData}
                    checkable={false}
                />
            </div>
        );
    }


    async addCate() {
        const res = await get(API.publish.addCate)
    }


    // 暂时不做删除
    async removeTreeNode() {
        // const res = await get(API.)
        //  this.findKey(this.state.treeData, item.key)  // 会自己重新渲染？

    }

    // 该方法改变原数组，导致view 发生变化，但不会重新render
    findKey = (data: any, key: any) => {
        if (key === '') return data;
        return data.filter(item => {
            const find = item.key !== key;
            key = find ? key : ''
            if (item.sub.length) {
                item.sub = this.findKey(item.sub, key)
            }
            return find
        })

    }

    async componentDidMount() {
        // const res = await get(API.publish.category)
        // if (res.success) {
        //     this.setState({
        //         treeData: res.data
        //     })
        // }
    }
}
