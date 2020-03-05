import * as React from 'react';
import { Modal, Input, message } from 'antd';
import { get } from '../../utils';
import API from '../../services/API';

export interface IModifyModalProps {
    visible: boolean
    item: any[];
    cancel: () => {}
    ok: () => {}
    modifyDone: (data: any) => {}
}

export interface IModifyModalState {
    confirmLoading: boolean;
    value: string;

}

export default class ModifyModal extends React.Component<IModifyModalProps, IModifyModalState> {
    static defaultProps = {
        cancel: () => { },
        ok: () => { },
        modifyDone: () => { }
    }
    constructor(props: IModifyModalProps) {
        super(props);
        console.log('props', props.item ? props.item[2] : '');

        this.state = {
            confirmLoading: false,
            value: props.item ? props.item[2] : ''
        }
    }

    public render() {
        const { confirmLoading, value } = this.state;
        let { item, visible } = this.props;
        // item = item || [null, '',]
        if (!item) return null
        return (
            <Modal
                visible={visible}
                confirmLoading={confirmLoading}
                title={`修改${item[1]}`}
                okText="确认"
                cancelText="取消"
                destroyOnClose={true}
                onOk={() => {
                    this.modifyInfo()
                }}
                onCancel={() => {
                    this.setState({
                        value: ''
                    })
                    this.props.cancel()
                }}
            >
                <div>
                    <Input placeholder={`请输入新的${item[1]}`} value={value || ''} onChange={e => {
                        this.setState({ value: e.target.value })
                    }} />
                </div>
            </Modal>
        );
    }

    async modifyInfo() {
        const { value } = this.state;
        const { item } = this.props;
        if (value === '') return message.info('不能为空');
        this.setState({
            confirmLoading: true
        });
        let type = item[0]
        if (type === 'nickname') {
            this.modifyNikeName()
        } else if (type === 'realname') {
            this.modifyRealName()
        } else {
            this.modifyExtInfo(item)
        }
        // 开始修改
        // let api = 
    }

    async modifyNikeName() {
        const res = await get(API.modify.nikeName, { nick: this.state.value });
        this.checkModify(res)
    }

    async modifyRealName() {
        const res = await get(API.modify.realName, { realname: this.state.value })
        this.checkModify(res)

    }

    async modifyExtInfo(item: any) {
        const type = item[0]
        const info = {
            cid: type,
            v: this.state.value
        }

        const res = await get(API.modify.extprofile, info)

        if (res.success) {
            this.modifyDone(res.data)
        } else {
            this.modifyError(res);
        }

    }


    checkModify(result: any) {
        if (result.success) {
            // const type = this.props.item[0]
            this.modifyDone(result.data)
        } else {
            this.modifyError(result);
        }
        this.setState({
            confirmLoading: false,
        })
    }

    modifyDone(data: any) {
        this.props.modifyDone(data)
    }
    modifyError(res: any) {
        message.error(res.faildes || '修改失败')
    }
}
