import * as React from 'react';
import API from '../../services/API';
import request, { get } from '../../utils';
import { Tabs, Button, Icon, Alert } from 'antd';
import CMList from '../../components/CMList/CMList';

export interface IPrivateSourceProps {
}

export interface IPrivateSourceState {
}

const { TabPane } = Tabs;


export default class PrivateSource extends React.Component<IPrivateSourceProps, IPrivateSourceState> {
    constructor(props: IPrivateSourceProps) {
        super(props);

        this.state = {
            list: [],
            loading: false,
            empty: false,
            loadEnd: false
        }
    }

    public render() {
        const { list, loading, empty, loadEnd } = this.state
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
                        actions={[
                            <Icon type="edit" key="edit" />,
                        ]}
                    />
                </div>
            </div>
        );
    }

    async componentDidMount() {
        const res = await get(API.source.private, { ids: [2], start: 0 })
        if (res.success) {
            console.log(res.data);
        }
    }

    loadMore = () => { }

    tabChange = (key: any) => {

    }
}
