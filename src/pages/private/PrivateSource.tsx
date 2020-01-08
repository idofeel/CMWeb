import * as React from 'react';
import API from '../../services/API';
import request, { get } from '../../utils';

export interface IPrivateSourceProps {
}

export interface IPrivateSourceState {
}

export default class PrivateSource extends React.Component<IPrivateSourceProps, IPrivateSourceState> {
    constructor(props: IPrivateSourceProps) {
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
        const res = get(API.source.private, { ids: [2], start: 0 })
        if (res.success) {
            console.log(res.data);
        }
    }
}
