import * as React from 'react';
import { Steps, Button, message, Form, Input, Icon, Result, Upload, Modal } from 'antd';
import { get, post, postForm, queryString, domain } from '../../../utils';
import API from '../../../services/API';
import CLEUpload from '../../upload/CLEUpload';
import ImgUpload from '../../../components/ImgUpload/ImgUpload';
import { connect } from 'dva';

import '../../private/PrivateUploadPage.less'
import TreeInfo from '../../../components/CateTree/CateTree';
const { confirm } = Modal;
export interface IPrivateUploadPageProps {
}

export interface IPrivateUploadPageState {
    current: number // 当前步骤
    modify: boolean,
    uploadInfo: uploadInfoProps
    cropperVisible: boolean;
    coverloading: boolean;
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
        title: '资源分类',
        content: 'Second-3content',
        name: 'resource'
    },
    {
        title: '完成',
        content: 'Last-content',
        name: 'done'
    },
];

@connect()
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
            },
            cropperVisible: false,
            coverloading: false
        }
    }

    public render() {
        const { imageUrl, current, cropperVisible } = this.state;

        return (
            <div className='PrivateUploadPage'>
                <Steps current={current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className="steps-content" >{this.renderContent(current)}</div>
                <div className="steps-action">
                    {current > 0 && (
                        <Button onClick={() => this.prev()}>
                            上一步
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => this.props.history.push('/admin')}>
                            完成
                        </Button>
                    )}
                    {current < steps.length - 1 && (
                        <Button type="primary" style={{ marginLeft: 8 }} onClick={() => this.next()}>
                            下一步
                        </Button>
                    )}
                </div>
            </div>
        );
    }

    imgUpload: any = null

    renderContent(current: number) {

        console.log(this.state.uploadInfo);

        const { treeData, defaultChecked, selectKeys, fileList } = this.state;
        const { name } = steps[current]
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 12 },
        };
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
                    <ImgUpload defaultImg={this.state.uploadInfo.img} ref={ref => this.imgUpload = ref} title="封面上传" imgw={240} imgh={135} cropperImg={this.UploadCover} />
                </Form.Item>
                <Form.Item label="CLE文件上传：" {...formItemLayout}>
                    <CLEUpload startUpload={this.uploadCle} ref={(ref => this.cleupload = ref)} defaultList={fileList} />
                </Form.Item>
            </>
        }
        else if (name === 'resource') {
            return <TreeInfo
                sourceId={this.state.sourceId}
                checkable={true}
                onCheck={() => {
                    console.log(...arguments);
                }} />
        } else if (name === 'done') {
            return <Result
                status="success"
                title="操作成功"
                subTitle="上传成功，分类成功"
                extra={[
                    <Button type="primary" key="console" onClick={() => { this.props.history.push('/admin') }}>
                        返回管理后台资源查看
                    </Button>,
                    <Button key="buy" onClick={() => { this.props.history.push('/admin/upload') }}>继续添加</Button>,
                ]}
            />
        }

    }


    UploadCover = async (img: any) => {
        const { infoid } = this.state.uploadInfo
        let formData = new FormData();

        formData.append('file', img)
        formData.append('infoid', infoid)
        const coverRes = await postForm(API.public.cover, formData)

        if (coverRes.success) {
            message.success('封面上传成功')

        } else {
            message.error(coverRes.faildesc)
            this.imgUpload.clear();
        }
    }

    async next() {
        let { current } = this.state;
        const step = steps[current]
        if (step.name === 'name') {
            // this.uploadCle();
            // 新建名称
            await this.startTask()

        }
        if (step.name === 'uploadFile') {
            // this.uploadCle();
            // 新建名称
            const res = await this.uploadEnd()
            if (res.success) {
                this.uploadDone()
                this.setState({
                    sourceId: res.data,
                    current: current + 1
                })
            } else {
                this.uploadUnDone();
                message.error(res.faildesc)
            }

            return;
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
            current: current + 1
        })
    }

    prev() {
        let { current } = this.state;
        const step = steps[current]
        current += 1
        if (step.name === 'name') {
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

            confirm({
                title: '操作未完成',
                // icon: <ExclamationCircleOutlined />,
                content: '当前有未完成的资源任务，是否继续？',
                okText: '继续',
                cancelText: '删除',
                onOk: async () => {

                    let data = undone.data[undone.data.length - 1];
                    const res = await get(API.public.getInfo, { infoid: data.infoid })
                    this.setState({
                        uploadInfo: res.data,
                        fileList: [{ ...res.data, url: res.data.cle, name: res.data.cle }]
                    })

                },
                onCancel: () => {
                    this.cancelTask();
                    this.modifyTask();
                },
            });


        } else {
            // 没有,允许新增
            // this.setState({
            //     current: 0
            // })
            // message.error(undone.faildesc)
            this.modifyTask()
        }
    }
    async cancelTask() {
        const res = await get(API.public.cancel);
        if (res.success) {

        } else {
            message.error(res.faildesc || '删除失败')
        }
    }

    componentWillUnmount() {
        this.setState = () => { return };
    }

    async componentDidMount() {
        console.log(this.props.global);

        if (!this.props.global.islogin && this.props.global.checkLogin) {
            this.props.dispatch({
                type: 'ucenter/save',
                payload: {
                    loginModal: true,
                    registerModal: false
                }
            })
            return;
        }

        if (this.props.global.checkLogin && this.props.global.islogin) this.hasUndone()

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

    async modifyTask() {
        let params = queryString(location.href);
        if (!params.pid) return;
        const res = await get(API.source.base, params)
        const cleRes = await get(API.fileInfo.cle, params)
        console.log('修改任务')
        if (res.success && cleRes.success) {
            this.setState({
                fileList: [{ uid: res.data.uid, name: cleRes.data.cle, status: 'done', url: cleRes.data.cle }],
                uploadInfo: res.data[0],
            })
        } else {
            message.error(res.faildesc || cleRes.faildesc)
        }


    }

    // 获取未完成发布的资源
    async getUndone() {
        return await get(API.public.undone)
    }

    async startTask() {
        const { name, pid, infoid } = this.state.uploadInfo
        if (name === '') return message.error('资源名称不能为空。')
        let res = null;
        // 开始任务
        if (infoid) {
            // 修改名称
            res = await get(API.public.changeName, { infoid, name })

        } else {
            // 新增名称
            const readyUpload = await get(API.public.start, { pid: pid === null ? '' : pid, name })
            res = readyUpload
            if (readyUpload.success) {
                this.setState({
                    uploadInfo: {
                        ...this.state.uploadInfo,
                        infoid: readyUpload.data
                    }
                })
            } else {
                res = readyUpload
            }
        }

        if (res.success) {
            // 下一步
            this.setState({
                current: this.state.current + 1
            })
        } else {

            this.setState({
                current: 0
            })
            message.error(res.faildesc || '名称写入失败，请联系管理员！')
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
            // const readyUpload = await get(API.public.start, { pid: pid === null ? '' : pid, name })
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
        const res = await post(API.public.cleFile, { infoid, ...filesInfo })
        console.log(infoid, filesInfo, chunks);
        if (res.success) {
            const wholeid = res.data;
            this.uploadChunk(0, filesInfo, chunks, wholeid)
            this.cleupload.changePercent(0.1)
        } else {
            message.error(res.faildesc)
        }
    }

    async uploadChunk(chunkIndex: any, filesInfo: any, chunks: any, wholeid: any) {
        if (chunkIndex >= filesInfo.file.fileChunks) return;
        let formData = new FormData(),
            blob = new Blob([chunks[chunkIndex].currentBuffer], { type: 'application/octet-stream' });
        console.log(chunkIndex);
        console.log(chunks);
        formData.append('file', blob)
        formData.append('md5', filesInfo.chunks[chunkIndex].chunkMd5)
        formData.append('wholeid', wholeid)
        const res = await postForm(API.public.cleChunk, formData)
        if (res.success) {
            this.cleupload.changePercent(parseInt(++chunkIndex / chunks.length * 100))
            this.uploadChunk(chunkIndex, filesInfo, chunks, wholeid)
        }

    }

    async uploadEnd() {
        const { infoid } = this.state.uploadInfo
        return await get(API.public.import, { infoid })
    }

    uploadDone() {
        console.log('上传完成');
        message.success('上传完成')
    }
    uploadUnDone() {

    }

}
