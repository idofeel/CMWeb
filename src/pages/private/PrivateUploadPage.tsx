import * as React from 'react';
import { Steps, Button, message, Form, Input, Icon, Result, Upload } from 'antd';
import './PrivateUploadPage.less'
import { get, post, postForm } from '../../utils';
import API from '../../services/API';
import CLEUpload from '../upload/CLEUpload';


export interface IPrivateUploadPageProps {
}

export interface IPrivateUploadPageState {
    current: number // 当前步骤
    modify: boolean,
    uploadInfo: uploadInfoProps
}

interface uploadInfoProps {
    name: string // 资源名称
    infoid: number
    uid: string
    pid: string
    gid: string
    memo: any
}

const { Step } = Steps;

const steps = [
    {
        title: '创建资源',
        content: 'First-content',
        name: 'name'
    },
    {
        title: '上传文件',
        content: 'Second-content',
        name: 'uploadFile'
    },
    {
        title: '完成',
        content: 'Last-content',
        name: 'done'
    },
];

export default class PrivateUploadPage extends React.Component<IPrivateUploadPageProps, IPrivateUploadPageState> {
    constructor(props: IPrivateUploadPageProps) {
        super(props);

        this.state = {
            current: 0,
            modify: false,
            uploadInfo: {
                name: '', // 资源名称
                infoid: 0,
                uid: '',
                pid: '',
                gid: '',
                memo: {}
            }
        }
    }

    public render() {
        const { imageUrl, current } = this.state;

        return (
            <div className='PrivateUploadPage'>
                <Steps current={current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className="steps-content" >{this.renderContent(current)}</div>
                <div className="steps-action">
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => this.next()}>
                            下一步
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            完成
                         </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                            上一步
                        </Button>
                    )}
                </div>
            </div>
        );
    }

    renderContent(current: number) {

        const { imageUrl, treeData, defaultChecked, selectKeys } = this.state;
        const { name } = steps[current]
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 12 },
        };
        console.log(name);

        const uploadButton = (
            <div>
                <Icon type={this.state.coverLoading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">封面上传</div>
            </div>
        );
        if (name === 'name') {

            return <>
                <Form.Item label="名称" {...formItemLayout} labelCol={{ span: 2 }} >
                    <Input value={this.state.uploadInfo.name} onChange={(e) => {
                        const uploadInfo = { ...this.state.uploadInfo, name: e.target.value }
                        this.setState({ uploadInfo })
                    }} />
                </Form.Item>
            </>
        } else if (name === 'uploadFile') {
            return <>
                <Form.Item label="名称" {...formItemLayout} style={{ textAlign: 'left' }}>
                    {this.state.uploadInfo.name}
                </Form.Item>
                <Form.Item label="封面上传" {...formItemLayout} className="coverStyle">
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    // beforeUpload={this.coverBeforeUpload}
                    // onChange={this.handleChange}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                    <span>* 注：需上传240*135的图片</span>
                </Form.Item>
                <Form.Item label="CLE文件上传：" {...formItemLayout}>
                    <CLEUpload startUpload={this.uploadCle} ref={(ref => this.cleupload = ref)} />
                </Form.Item>
            </>
        } else if (name === 'done') {
            return <Result
                status="success"
                title="操作成功"
                subTitle="上传成功，分类成功"
                extra={[
                    <Button type="primary" key="console">
                        返回
                    </Button>,
                    <Button key="buy">去首页</Button>,
                ]}
            />
        }

    }

    async next() {
        let { current } = this.state;
        const step = steps[current]
        current += 1
        if (step.name === 'name') {
            console.log('stepstepstep', step.name);
            // this.uploadCle();
            // 新建名称
            await this.startTask()

        }
        // 没有资源名称无法继续
        if (!this.state.uploadInfo.name) {
            this.setState({
                current: 0
            })
            return message.error('需先填写资源名称')
        }

        // 

        this.setState({
            current
        })
    }

    prev() {
        let { current } = this.state;
        const step = steps[current]
        current += 1
        if (step.name === 'name') {
            console.log('stepstepstep', step.name);
            // this.uploadCle();
            // 新建名称
            this.hasUndone()

        }
        this.setState({
            current: this.state.current - 1
        })
    }

    // 是否有未完成
    async hasUndone() {
        const undone = await this.getUndone()
        if (undone.success) {
            // 有未完成的信息
            this.setState({
                uploadInfo: undone.data[undone.data.length - 1],
                modify: true
            })
        } else {
            // 没有,允许新增

        }
    }

    async componentDidMount() {
        console.log('componentDidMount');

        this.hasUndone()
        // const undone = await this.getUndone()
        // if (undone.success) {
        //     // 有未完成的信息
        //     this.setState({
        //         uploadInfo: undone.data[0],
        //         modify: true
        //     })
        // } else {
        //     // 没有,允许新增

        // }
    }


    // 获取未完成发布的资源
    async getUndone() {
        return await get(API.upload.undone)
    }

    async startTask() {
        const { name, pid, infoid } = this.state.uploadInfo
        console.log('createTask', infoid);
        // 开始任务
        if (pid || infoid) {
            // 修改名称
            await get(API.upload.changeName, { infoid, name })
        } else {
            // 新增名称
            const readyUpload = await get(API.upload.start, { pid: pid === null ? '' : pid, name })
            if (readyUpload.success) {
                this.setState({
                    uploadInfo: {
                        ...this.state.uploadInfo,
                        infoid: readyUpload.data
                    }
                })
            }
        }

    }

    uploadCle = async (filesInfo: any, chunks: any) => {
        const { infoid } = this.state.uploadInfo
        console.log(this.state);

        if (infoid) {
            // 修改任务
            this.startUpload(infoid, filesInfo, chunks)
        } else {

            // 新建任务
            // const readyUpload = await get(API.upload.start, { pid: pid === null ? '' : pid, name })
            // if (readyUpload.success) {
            //     this.setState({
            //         uploadInfo: {
            //             ...this.state.uploadInfo,
            //             infoid: readyUpload.id
            //         }
            //     })
            // }
        }

    }

    /**
     * 
     * @param infoid 任务id
     * @param filesInfo  文件信息
     * @param chunks  文件切片
     */
    async startUpload(infoid: number, filesInfo: any, chunks: any) {
        if (!infoid) return
        const res = await post(API.upload.cleFile, { infoid, ...filesInfo })
        console.log(infoid, filesInfo, chunks);
        if (res.success) {
            const wholeid = res.data;
            this.uploadChunk(0, filesInfo, chunks, wholeid)
            this.cleupload.changePercent(1)
        } else {
            message.error(res.faildesc)
        }
    }

    async uploadChunk(chunkIndex: any, filesInfo: any, chunks: any, wholeid: any) {
        if (chunkIndex >= filesInfo.file.fileChunks) return this.uploadEnd();
        let formData = new FormData(),
            blob = new Blob([chunks[chunkIndex].currentBuffer], { type: 'application/octet-stream' });
        console.log(chunkIndex);
        console.log(chunks);
        formData.append('file', blob)
        formData.append('md5', filesInfo.chunks[chunkIndex].chunkMd5)
        formData.append('wholeid', wholeid)
        const res = await postForm(API.upload.cleChunk, formData)
        if (res.success) {
            this.cleupload.changePercent(parseInt(++chunkIndex / chunks.length * 100))
            this.uploadChunk(chunkIndex, filesInfo, chunks, wholeid)
        }

    }

    async uploadEnd() {
        const { infoid } = this.state.uploadInfo
        const importSQLRes = await get(API.upload.import, { infoid });
        importSQLRes.success ? this.uploadDone() : this.uploadUnDone()
    }

    uploadDone() {
        console.log('上传完成');

    }
    uploadUnDone() {

    }

}
