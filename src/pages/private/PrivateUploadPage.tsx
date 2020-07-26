import * as React from 'react';
import { Steps, Button, message, Form, Input, Icon, Result, Upload, Modal, notification } from 'antd';
import './PrivateUploadPage.less'
import { get, post, postForm, queryString, domain } from '../../utils';
import API from '../../services/API';
import CLEUpload from '../upload/CLEUpload';
import ImgUpload from '../../components/ImgUpload/ImgUpload';
import { connect } from 'dva';

const { confirm } = Modal;
const key = 'importNotification'
export interface IPrivateUploadPageProps {
}

export interface IPrivateUploadPageState {
    current: number // 当前步骤
    modify: boolean,
    uploadInfo: uploadInfoProps
    cropperVisible: boolean;
    coverloading: boolean;
    uploaded: boolean;
    transFileing: boolean;
    imporFileing: boolean;
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
            transFileing: false,
            uploaded: false,
            cropperVisible: false,
            imporFileing: false,
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
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
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

        const { treeData, defaultChecked, selectKeys, fileList, transFileing, uploaded, imporFileing } = this.state;
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
                    <CLEUpload
                        disabled={transFileing === true}
                        btnTitle={this.getUploadTitle()}
                        startUpload={this.uploadCle}
                        ref={(ref => this.cleupload = ref)}
                        defaultList={fileList} />
                </Form.Item>
            </>
        } else if (name === 'done') {
            return <Result
                status="success"
                title="操作成功"
                subTitle="上传成功，分类成功"
                extra={[
                    <Button type="primary" key="console" onClick={() => { this.props.history.push('/private') }}>
                        返回私有资源查看
                    </Button>,
                    <Button key="buy" onClick={() => { this.props.history.push('/upload') }}>继续添加</Button>,
                ]}
            />
        }

    }
    getUploadTitle = () => {
        const { transFileing, uploaded, imporFileing } = this.state;
        let str = '点击上传'
        if (transFileing) {
            str = '文件转换中'
        }
        if (imporFileing) {
            str = '文件导入中'
        }
        return str
    }

    UploadCover = async (img: any) => {
        const { infoid } = this.state.uploadInfo
        let formData = new FormData();

        formData.append('file', img)
        formData.append('infoid', infoid)
        const coverRes = await postForm(API.private.cover, formData)

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
            this.queryTransFileStatus()
        }
        // 没有资源名称无法继续
        if (!this.state.uploadInfo.name) {
            this.setState({
                current: 0
            })
            return message.error('需先填写资源名称')
        }

        // 
        // this.setState({
        //     current
        // })
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

            confirm({
                title: '操作未完成',
                // icon: <ExclamationCircleOutlined />,
                content: '当前有未完成的资源任务，是否继续？',
                okText: '继续',
                cancelText: '删除',
                onOk: async () => {

                    let data = undone.data[undone.data.length - 1];
                    const res = await get(API.private.getInfo, { infoid: data.infoid })
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
        const res = await get(API.private.cancel);
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
        this.setState({
            fileList: [{ uid: cleRes.data.uid, name: cleRes.data.cle, status: 'done', url: cleRes.data.cle }],
            uploadInfo: res.data[0],
        })

    }

    // 获取未完成发布的资源
    async getUndone() {
        return await get(API.private.undone)
    }

    async startTask() {
        const { name, pid, infoid } = this.state.uploadInfo
        if (name === '') return message.error('资源名称不能为空。')
        let res = null;
        // 开始任务
        if (infoid) {
            // 修改名称
            res = await get(API.private.changeName, { infoid, name })

        } else {
            // 新增名称
            const readyUpload = await get(API.private.start, { pid: pid === null ? '' : pid, name })
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
            // const readyUpload = await get(API.private.start, { pid: pid === null ? '' : pid, name })
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
        const res = await post(API.private.cleFile, { infoid, ...filesInfo })
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
        if (chunkIndex >= filesInfo.file.fileChunks) {
            this.setState({
                uploaded: true
            })
            return;
        }
        let formData = new FormData(),
            blob = new Blob([chunks[chunkIndex].currentBuffer], { type: 'application/octet-stream' });
        console.log(chunkIndex);
        console.log(chunks);
        formData.append('file', blob)
        formData.append('md5', filesInfo.chunks[chunkIndex].chunkMd5)
        formData.append('wholeid', wholeid)
        const res = await postForm(API.private.cleChunk, formData)
        if (res.success) {
            this.cleupload.changePercent(parseInt(++chunkIndex / chunks.length * 100))
            this.uploadChunk(chunkIndex, filesInfo, chunks, wholeid)
        }

    }

    async importFile() {
        this.setState({
            imporFileing: true, // 导入中
            transFileing: false, // 转换中
            uploaded: true, // 上传完成
        })
        notification.open({
            key,
            message: '导入中...',
            duration: 0,
            placement: 'bottomRight'
        })
        // 文件导入中
        const { infoid } = this.state.uploadInfo
        const res = await get(API.private.import, { infoid })
        if (res.success) {
            // 文件导入完成
            this.importDone()
            notification.close(key);
        } else {
            // 文件导入未完成
            this.uploadUnDone();
            message.error(res.faildesc)
        }
    }
    // 查询文件转换状态
    async queryTransFileStatus() {
        const { infoid } = this.state.uploadInfo

        const res = await get(API.private.cleFiletransStatus, { infoid }) // 获取上传
        // 获取文件转换状态失败
        if (!res.success) return message.warning(res.explain || '获取文件转换状态失败')

        // 转换完成
        if (res.state === res.done) {

            this.importFile(); // 导入文件

        } else if (res.state === res.cleing) { // 转换中

            await this.sleep(3000) // 等待3s

            this.queryTransFileStatus() // 查询转换状态

        } else if (res.state === res.uploaded) { // 上传完成

            this.transCleFile(); // 转换文件

        } else if (res.state === res.undo) { // 上传未完成
            this.uploadUnDone()
            message.warning(res.explain || '文件上传未完成')

        } else if (res.state === res.err) { // 转换失败
            this.uploadUnDone()
            message.warning(res.explain || '文件转换失败，请重试')

        }
    }
    async transCleFile() {
        notification.open({
            key,
            message: '文件转换中...',
            duration: 0,
            placement: 'bottomRight'
        })
        const { infoid } = this.state.uploadInfo
        try {
            const res = await get(API.private.convert, { infoid })
            if (res.success) {
                this.importFile(); // 导入文件
            } else {
                this.queryTransFileStatus()
            }
        }
        catch (error) {
            message.error('文件转换失败，请重试');
            notification.close(key)
        }
    }
    sleep(time: number) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
    importDone() {
        message.success('上传完成')
        this.setState({
            current: this.state.current + 1
        })
    }
    uploadUnDone() {
        this.setState({
            uploaded: false,
            imporFileing: false,
            transFileing: false
        })
        notification.close(key)
    }

}
