import * as React from 'react';
import { Upload, Icon, Button, message, Progress } from 'antd';
import SparkMD5 from 'spark-md5'
import { get, post, postForm } from '../../utils';
import API from '../../services/API';
export interface ICLEUploadProps {
    startUpload?: (params: any, arrayBufferData: any) => void
}

export interface ICLEUploadState {
    fileList: any[],
    percent: number,
    showProgress: boolean
}

export default class CLEUpload extends React.Component<ICLEUploadProps, ICLEUploadState> {
    constructor(props: ICLEUploadProps) {
        super(props);

        this.state = {
            fileList: [],
            percent: 0,
            showProgress: false
        }
    }

    public render() {
        const uploadProps = {
            name: 'file',
            multiple: false,
            // accept: 'video/*',
            beforeUpload: (file: any, _: any) => {
                // 在此处填入上传逻辑
                console.log(file, _);
                this.chunkUpload(file)
                return false;
            },
            onChange: (info: any) => {
                const { status } = info.file;
                if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }

                let fileList = [...info.fileList];

                // 1. Limit the number of uploaded files
                // Only to show two recent uploaded files, and old ones will be replaced by the new
                fileList = fileList.slice(-1);

                // 2. Read from response and show file link
                fileList = fileList.map(file => {
                    if (file.response) {
                        // Component will show file.url as link
                        file.url = file.response.url;
                    }
                    return file;
                });

                this.setState({ fileList });
            },
        };
        return (
            <div style={{ textAlign: 'left' }}>
                <Upload {...uploadProps} fileList={this.state.fileList} disabled={this.state.percent > 0}>
                    <Button icon="upload" onClick={() => {
                        return
                    }}>
                        点击上传
                    </Button>
                </Upload>
                {(this.state.percent !== 0 && this.state.showProgress) && < Progress percent={this.state.percent} size="small" status="active" />}
                {/* <input type="file" name="file" id="fileUpload" onChange={this.uploadFile} /> */}
            </div>
        );
    }

    changePercent(percent: number) {
        this.setState({
            percent: percent,
            showProgress: true
        })
        if (percent === 100) {
            setTimeout(() => {
                this.setState({
                    percent: 0,
                })
            }, 300)
        }
    }

    uploadFile = (e: any) => {
        e.preventDefault();
        let file = e.target.files[0];


        this.chunkUpload(file)

    }

    chunkUpload(file: any) {
        // 兼容性的处理
        let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
            chunkSize = 1024 * 1024 * 2,    // 切片每次2M
            chunks = Math.ceil(file.size / chunkSize),
            currentChunk = 0, // 当前上传的chunk
            spark = new SparkMD5.ArrayBuffer(),
            // 对arrayBuffer数据进行md5加密，产生一个md5字符串
            chunkFileReader = new FileReader(),  // 用于计算出每个chunkMd5
            totalFileReader = new FileReader()  // 用于计算出总文件的fileMd5

        let params: any = { chunks: [], file: {} },   // 用于上传所有分片的md5信息
            arrayBufferData = [],              // 用于存储每个chunk的arrayBuffer对象,用于分片上传使用
            self = this
        params.file.fileName = file.name
        params.file.fileSize = file.size

        totalFileReader.readAsArrayBuffer(file)
        totalFileReader.onload = function (e: any) {
            // 对整个totalFile生成md5
            spark.append(e.target.result)
            params.file.fileMd5 = spark.end() // 计算整个文件的fileMd5
        }

        chunkFileReader.onload = function (e: any) {
            // 对每一片分片进行md5加密
            spark.append(e.target.result)
            // 每一个分片需要包含的信息
            let obj = {
                chunk: currentChunk + 1,
                start: currentChunk * chunkSize, // 计算分片的起始位置
                end: ((currentChunk * chunkSize + chunkSize) >= file.size) ? file.size : currentChunk * chunkSize + chunkSize, // 计算分片的结束位置
                chunkMd5: spark.end(),
                chunks
            }
            // 每一次分片onload,currentChunk都需要增加，以便来计算分片的次数
            currentChunk++;
            params.chunks.push(obj)

            // 将每一块分片的arrayBuffer存储起来，用来partUpload
            let tmp = {
                chunk: obj.chunk,
                currentBuffer: e.target.result
            }
            arrayBufferData.push(tmp)

            if (currentChunk < chunks) {
                // 当前切片总数没有达到总数时
                loadNext()
                // // 计算预处理进度
                // _this.setState({
                //     preUploading: true,
                //     preUploadPercent: Number((currentChunk / chunks * 100).toFixed(2))
                // })
            } else {
                //记录所有chunks的长度
                params.file.fileChunks = params.chunks.length
                // 表示预处理结束，将上传的参数，arrayBuffer的数据存储起来

                // _this.setState({
                //     preUploading: false,
                //     uploadParams: params,
                //     arrayBufferData,
                //     chunksSize: chunks,
                //     preUploadPercent: 100
                // })
                console.log(params, arrayBufferData);
                message.info('开始上传')
                self.startUpload(params, arrayBufferData)


            }
        }

        chunkFileReader.onerror = function () {
            console.warn('oops, something went wrong.');
        };

        function loadNext() {
            var start = currentChunk * chunkSize,
                end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
            chunkFileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
        }

        loadNext()



        // 只允许一份文件上传
        // this.setState({
        //     fileList: [file],
        //     file: file
        // })

    }

    async startUpload(params: any, arrayBufferData: any) {
        this.props.startUpload(params, arrayBufferData)
        // const res2 = await get(API.upload.start, { pid: '', name: '测试' })
        // const res = await post(API.upload.cleFile, params)
        // console.log(res);
        // // post(API.source.private, params)
        // let formData = new FormData(),
        //     blob = new Blob([arrayBufferData[0].currentBuffer], { type: 'application/octet-stream' });
        // formData.append('chunk', blob)
        // console.log(formData);
        // postForm(API.source.private, formData)

    }

}
