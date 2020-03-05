import * as React from 'react';
import { Modal } from 'antd';
import ImageCropper from './ImageCropper';
export interface IModalCropperProps {
    visible: boolean;
    cropperImg: (img: any) => {};
    onOk: () => {};
    onCancel: () => {};
}

export interface IModalCropperState {
}

export default class ModalCropper extends React.Component<IModalCropperProps, IModalCropperState> {
    constructor(props: IModalCropperProps) {
        super(props);

        this.state = {
        }
    }

    imgCropper: any = null
    public render() {
        return (
            <div>
                <Modal
                    title="图像裁剪"
                    visible={this.props.visible}
                    // onOk={this.props.onOk}
                    onOk={this.cropImage}
                    onCancel={this.props.onCancel}
                    width={500}
                    okText="裁剪并使用"
                    cancelText="取消"
                >
                    <ImageCropper ref={(ref) => { this.imgCropper = ref }}
                        // originImage={require('../../assets/images/cmreader.png')}
                        {...this.props} />
                </Modal>

            </div>
        );

    }

    cropImage = () => {
        const img = this.imgCropper.cropImage()
        this.props.cropperImg(img)
    }
}
