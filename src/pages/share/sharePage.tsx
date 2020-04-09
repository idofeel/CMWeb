import * as React from 'react';
import CMList from '../../components/CMList/CMList';
import { queryString, get } from '../../utils';
import API from '../../services/API';
import { message } from 'antd';

export interface ISharePageProps {
}

export interface ISharePageState {
}

export default class SharePage extends React.Component<ISharePageProps, ISharePageState> {
    constructor(props: ISharePageProps) {
        super(props);

        this.state = {
            loading: false,
            list: [],
            empty: false,
            modify: false
        }
    }

    public render() {
        const { list, loading, empty, loadEnd, modify } = this.state

        return (
            <div>

                <CMList
                    loadMore={() => {
                        this.loadMore();
                    }}
                    list={list}
                    loading={loading}
                    empty={empty}
                    loadEnd={loadEnd}
                />
            </div>
        );
    }

    async componentDidMount() {
        const { lic, pid } = queryString(location.href);
        this.setState({ loading: true, lic, pid, });
        const res = await get(API.source.base, { pid, lic, start: 0 })
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
        } else {
            message.error(res.faildesc || '访问失败')
        }
    }

    loadMore() {

    }
}
