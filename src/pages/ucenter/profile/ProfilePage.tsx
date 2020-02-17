import * as React from 'react';
import { get } from '../../../utils';
import API from '../../../services/API';
import { message } from 'antd';

export interface IProfilePageProps {
}

export interface IProfilePageState {
}

export default class ProfilePage extends React.Component<IProfilePageProps, IProfilePageState> {
    constructor(props: IProfilePageProps) {
        super(props);

        this.state = {
        }
    }

    public render() {
        return (
            <div>

            </div>
        );
    }
    async componentDidMount() {
        if (!this.props.global.islogin) {
            message.info('尚未登录')
            return this.props.history.push('/')
        }
        console.log(this.props.global.islogin)
        // await get(API.profile.)
    }
}
