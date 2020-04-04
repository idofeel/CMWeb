import * as React from 'react';
import { Button } from 'antd';
import { postForm } from '../../utils';
import API from '../../services/API';

export interface IUploadImgProps {
}

export default class UploadImg extends React.Component<IUploadImgProps> {
    state = {
        src: ''
    }
    public render() {
        return (
            <div>
                <input type="file" onChange={async (e) => {
                    let file = e.target.files[0];
                    let formData = new FormData();
                    formData.append('file', file);
                    const res = await postForm(API.profile.upavatar, formData)
                    if (res.success) {
                        this.setState({
                            src: res.data
                        })
                    }

                }} />
                <img src={this.state.src} alt="" />
            </div>
        );
    }
}
