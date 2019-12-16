import * as React from 'react';
import { connect } from 'dva';

import CMList from '../../components/CMList/CMList';
export interface ISearchPageProps {
    searching: boolean
    searchResult: []
    loadEnd: boolean
    dispatch: any
    searchText: string
    start: number
    empty: string
}

export interface ISearchPageState {
}


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
            <CMList
                loadMore={() => {
                    this.loadMore();
                }}
                list={searchResult}
                loading={searching}
                empty={empty}
                loadEnd={loadEnd}
            />
        )
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
}
