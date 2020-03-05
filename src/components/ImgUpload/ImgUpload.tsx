import * as React from 'react';
import { Upload, Icon, message } from 'antd';
import ImageCropper from '../ImageCropper/ImageCropper';
import ModalCropper from '../ImageCropper';

export interface IImgUploadProps {
    title: string;
    imgw: number;
    imgh: number;
    defaultImg: string;
    cropperImg: (img: string) => {}
}

export interface IImgUploadState {
    loading: boolean; // 图片上传loading
    imageUrl: string; // 图片地址
    originImg: string; // 原图地址
    visible: boolean;  // 图片裁剪对话框
}

export default class ImgUpload extends React.Component<IImgUploadProps, IImgUploadState> {
    static defaultProps = {
        title: '图片上传',
        cropperImg: () => { }
    }
    constructor(props: IImgUploadProps) {
        super(props);

        this.state = {
            loading: false,
            imageUrl: this.props.defaultImg || '',
            originImg: '',
            visible: false,
        }
    }

    public render() {
        const { imageUrl, originImg } = this.state
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <p>{this.props.title}</p>
            </div>
        );
        return (
            <div>
                <Upload
                    showUploadList={false}
                    listType="picture-card"
                    beforeUpload={this.beforeUpload}
                // onChange={this.handleChange}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
                <ModalCropper
                    width={this.props.imgw}
                    height={this.props.imgh}
                    originImage={originImg}
                    visible={this.state.visible}
                    cropperImg={(img) => {
                        this.props.cropperImg(img)
                        this.setState({ imageUrl: img, visible: false })
                    }}
                    onCancel={() => {
                        this.setState({
                            visible: false
                        })
                    }}
                />
            </div>
        );
    }

    clear() {
        this.setState({
            imageUrl: this.props.defaultImg,
        })
    }

    beforeUpload = (file: any) => {
        // return false
        // console.log('beforeUpload');
        // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        // if (!isJpgOrPng) {
        //     message.error('You can only upload JPG/PNG file!');
        // }
        // const isLt2M = file.size / 1024 / 1024 < 2;
        // if (!isLt2M) {
        //     message.error('Image must smaller than 2MB!');
        // }
        // return isJpgOrPng && isLt2M;
        this.getBase64(file, (img: any) => {
            console.log(img);
            this.setState({
                originImg: img,
                visible: true,
            })
        })
    }
    // handleChange = (info: any) => {
    //     console.log(info);

    //     if (info.file.status === 'uploading') {
    //         this.setState({ loading: true });
    //         return;
    //     }
    //     if (info.file.status === 'done') {
    //         // Get this url from response in real world.
    //         console.log('??');

    //         // this.getBase64(info.file.originFileObj, imageUrl =>
    //         //     this.setState({
    //         //         originImg: imageUrl,
    //         //         visible: true,
    //         //         loading: false,
    //         //     }),
    //         // );
    //     }
    //     console.log('handleChange');

    // }

    getBase64(img: any, callback: () => {}) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
}
