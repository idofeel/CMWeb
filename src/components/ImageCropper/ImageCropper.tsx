import * as React from 'react';
import ReactCropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

export interface IImageCropperProps {
    originImage: string; // 原图
    cutImageAfter: (ImageSrouce: any) => {} // 裁剪后的图片地址
    width: number // 比例
    height: number
}

export interface IImageCropperState {

}

export default class ImageCropper extends React.Component<IImageCropperProps, IImageCropperState> {
    constructor(props: IImageCropperProps) {
        super(props);

        this.state = {
            cropResult: ''
        }
    }

    cropper: any = null
    public render() {
        return (
            <div>
                <ReactCropper
                    style={{ width: 472, height: 200, maxWidth: "100%" }}
                    aspectRatio={this.props.width / this.props.height}
                    preview=".img-preview"
                    guides={false}
                    src={this.props.originImage}
                    ref={cropper => { this.cropper = cropper; }}
                />
                <h3>裁剪预览</h3>
                <div className="img-preview cropper-bg" style={{ ...this.props, overflow: 'hidden' }} />
                {/* <img style={{ ...this.props }} src={this.state.cropResult} alt="cropped image" /> */}
            </div>
        );
    }

    cropImage() {
        if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
            return;
        }
        // console.log(this.cropper.getCroppedCanvas().toDataURL());

        // this.setState({
        //     cropResult: this.cropper.getCroppedCanvas().toDataURL(),
        // });
        return this.cropper.getCroppedCanvas().toDataURL()
    }
}
