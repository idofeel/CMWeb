import * as React from 'react';

export interface IUploadPageProps {
}

export interface IUploadPageState {
}

export default class UploadPage extends React.Component<IUploadPageProps, IUploadPageState> {
    constructor(props: IUploadPageProps) {
        super(props);

        this.state = {
        }
    }

    public render() {
        return (
            <div>
                Input
            </div>
        );
    }
}
