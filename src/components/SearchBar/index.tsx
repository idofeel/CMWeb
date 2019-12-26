import * as React from 'react';
import { Affix, Row, Col, Input } from 'antd';
import { connect } from 'dva';

import './searchBar.less'
import { withRouter } from 'dva/router';

export interface IAppProps extends RoutersConfig {
    searchStore?: any
}

export interface IAppState {
}

const { Search } = Input;

@connect(({ searchStore }: any) => ({ searchStore }))
class SearchBar extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);

        this.state = {
        }
    }

    public render() {
        const { searchStore } = this.props
        if (!searchStore.searchBarShow) return null
        return (
            <Affix offsetTop={0} onChange={affixed => console.log(affixed)}>
                <Row className="searchBar">
                    <Col xs={20} offset={2}>
                        <Search
                            defaultValue={searchStore.searchText}
                            placeholder="请输入关键词"
                            enterButton
                            size="large"
                            onSearch={value => this.onSearch(value)}
                        />
                    </Col>
                </Row>
            </Affix>
        );
    }

    onSearch(value: string) {

        if (!value) return;
        const { location, history, dispatch } = this.props
        dispatch({
            type: "searchStore/search",
            payload: {
                searchText: value
            }
        })
        if (location.pathanme !== '/search') {
            dispatch({
                type: "HomeStore/save",
                payload: {
                    selectKey: '',
                    second: '',
                    secondaryMenus: [],
                    loadSecondaryCate: false
                }
            })
            history.push('/search')
        }

    }
}
export default withRouter(SearchBar)