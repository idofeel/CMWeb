import * as React from 'react';
import { message, List, Avatar, Row, Col, Icon } from 'antd';
import { get, domain, postForm } from '../../../utils';
import API from '../../../services/API';
import styles from './ProfilePage.less'
import { connect } from 'dva';
import ModifyModal from '../../../components/ModifyModal/ModifyModal';
import ModalCropper from '../../../components/ImageCropper';
import ImgUpload from '../../../components/ImgUpload/ImgUpload';

export interface IProfilePageProps {
}

export interface IProfilePageState {
    originImg: ''
}

@connect(({ ucenter, global }: any) => { return { ucenter, global } })
export default class ProfilePage extends React.Component<IProfilePageProps, IProfilePageState> {
    constructor(props: IProfilePageProps) {
        super(props);

        this.state = {
            userInfo: [],
            extInfo: [],
            modifyModalVisibel: false,
            originImg: ''
        }
    }

    public render() {
        // console.log(this.state.userInfo);
        const { originImg } = this.state;
        // const { } = this.props
        return (
            <div className={styles.profileBox} >
                <Row justify="center">
                    <Col xs={24} sm={{ span: 12, offset: 6 }}  >
                        <List
                            // bordered={false}
                            dataSource={this.state.userInfo.concat(this.state.extInfo)}
                            header={<h3>个人信息</h3>}
                            size="large"
                            renderItem={this.renderItem}
                        // split={false}
                        />
                    </Col>
                </Row>

                {this.state.modifyModalVisibel && <ModifyModal
                    visible={this.state.modifyModalVisibel}
                    item={this.state.item}
                    ok={() => { }}
                    modifyDone={(data) => {
                        console.log(data);
                        let { item } = this.state;
                        item[2] = data;
                        this.setState({
                            item,
                            modifyModalVisibel: false
                        })

                    }}
                    cancel={() => this.hideModifyModal()}
                />}
                <ModalCropper
                    width={240}
                    height={135}
                    originImage={originImg}
                    visible={originImg}
                    cropperImg={(img) => {
                        this.props.cropperImg(img)
                        this.setState({ imageUrl: img, originImg: '' })
                    }}
                    onCancel={() => {
                        this.setState({
                            originImg: ''
                        })
                    }}
                />


            </div>
        );
    }
    renderItem = (item: any) => {
        if (item[0] === 'uid') return <></>
        const notModify = item[0] === 'avatar' || item[0] === 'username'
        return <List.Item style={{ justifyContent: "space-between" }} onTouchEnd={() => {
            notModify ? null : this.showModifyModal(item);

        }}>
            <span>{item[1]}:</span>
            <div className="userInfoItem">
                {item[0] === 'avatar' ?
                    <ImgUpload defaultImg={`${domain}/${item[2]}`} ref={ref => this.imgUpload = ref} title="封面上传" imgw={100} imgh={100} cropperImg={this.UploadAvatar} />
                    : <span>{item[2]}</span>}
                {notModify ? null : <Icon type="right" onClick={() => this.showModifyModal(item)} />}

            </div>
        </List.Item>
    }

    UploadAvatar = async (img: any) => {
        let formData = new FormData();
        formData.append('file', img)
        const res = await postForm(API.modify.UpAvatar, formData);
        if (res.success) {
            this.props.dispatch({
                type: 'global/save',
                payload: {
                    avatar: res.data
                }
            })
        } else {

        }


    }
    showModifyModal(item: any) {
        this.setState({
            modifyModalVisibel: true,
            item,
        })
    }
    hideModifyModal() {
        this.setState({
            modifyModalVisibel: false,
            item: null,
        })
    }

    async componentDidMount() {
        if (this.props.global.checkLogin === null) {
            return
            // message.info('尚未登录')
            // return this.props.history.push('/home')
        }
        if (this.props.global.islogin === false) return this.showLoginModal()
        // const profileRes = await get(API.profile.getBase);
        const reqList = [get(API.profile.getBase), get(API.profile.getExt)]
        const [baseInfo, extinfo] = await Promise.all(reqList);


        if (baseInfo.success) {
            this.setState({
                userInfo: baseInfo.data,
                extInfo: extinfo.data
            })
        } else {
            if (baseInfo.faildesc === '用户未登录！') this.showLoginModal()
            message.error(baseInfo.faildesc)

        }
    }

    showLoginModal() {
        this.props.dispatch({
            type: 'ucenter/save',
            payload: {
                loginModal: true,
                registerModal: false
            }
        })
    }
}
