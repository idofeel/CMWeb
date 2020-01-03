import React, { Component } from 'react'
import { Icon, Button, Form, Input, Tooltip, Cascader, AutoComplete, Row, Col, Checkbox, message } from 'antd'
import { connect } from 'dva';
import {
    email_reg,
    user_name,
    pwd_reg,
    phone_number,
} from '../../../utils/Regexp';
import { get, post, domain, joinUrlEncoded } from '../../../utils';
import API from '../../../services/API';

interface Props {
    form?: any
    dispatch?: any
}
interface State {

}

@connect()
class Register extends Component<Props, State> {
    state = {
        registerLoading: false,
        imgCode: domain + API.auth.imgcode
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 18,
                    offset: 3,
                },
            },
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                {/* <Button icon="login" onClick={() => {
                    console.log(this);
                    this.props.dispatch({
                        type: 'global/save',
                        payload: {
                            register: false,
                            login: true
                        }
                    })
                }}></Button>
                用户名
                密码
                验证码 */}
                <Col offset={1}>
                    <Button type="link" onClick={() => {
                        this.props.dispatch({
                            type: 'global/save',
                            payload: {
                                loginModal: true,
                                registerModal: false
                            }
                        })
                    }}>已有账号，去登录</Button>
                </Col>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="用户名">
                        {getFieldDecorator('username', {
                            rules: [
                                { required: true, message: '请输入您的用户名' },
                                {
                                    pattern: user_name,
                                    validator: this.validatorUser,
                                },
                            ],
                        })(
                            <Input
                                prefix={<Icon type='user' />}
                                placeholder='请输入用户名'
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label="密码" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入您的密码!',
                                },
                                {
                                    pattern: pwd_reg,
                                    // validator: this.validateToNextPassword,
                                    message: '请输入2-32位字母或数字或特殊字符_-.',
                                },
                            ],
                        })(
                            <Input.Password
                                prefix={<Icon type='lock' />}
                                type='password'
                                placeholder='请输入密码'
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label="确认密码" hasFeedback>
                        {getFieldDecorator('password2', {
                            rules: [
                                {
                                    required: true,
                                    message: '请再次确认您的密码！',
                                },
                                {
                                    validator: this.compareToFirstPassword,
                                },
                            ],
                        })(
                            <Input.Password
                                prefix={<Icon type='lock' />}
                                type='password'
                                placeholder='请输入密码'
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label="验证码" extra="点击图片可更换验证码">
                        <Row gutter={8}>
                            <Col span={12}>
                                {getFieldDecorator('seccode', {
                                    rules: [{ required: true, message: '请输入右侧验证码' }],
                                })(<Input
                                    prefix={<Icon type='code' />}
                                    placeholder='请输入右侧验证码'
                                />)}
                            </Col>
                            <Col span={12}>
                                <img src={this.state.imgCode} height='100%' alt='' onClick={() => { this.changeImgCode() }} />
                                {/* <Button>Get captcha</Button> */}
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>

                        <Button type="primary" style={{ width: '100%' }} loading={this.state.registerLoading} htmlType="submit">
                            提交注册
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        )
    }
    //  用户名验证
    async validatorUser(rule: any, val: any, callback: any) {

        if (!rule.pattern.test(val)) {
            const { success, faildesc } = await get(API.auth.isUname, {
                username: val,
            });
            callback(success ? undefined : faildesc);
        } else {
            callback('请输入2-32位字符，不能包含特殊字符');
        }
    }

    changeImgCode = () => {
        this.setState({
            imgCode: joinUrlEncoded(domain + API.auth.imgcode, { rand: Math.random() })
        })
    }

    compareToFirstPassword = (rule: any, value: any, callback: any) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码输入不一致!');
        } else {
            callback();
        }
    };

    handleSubmit = (e: any) => {
        // message.success('注册成功')
        console.log(this.props);

        // this.props.dispatch({
        //     type: 'global/isLogin',
        // })
        e.preventDefault();

        this.props.form.validateFieldsAndScroll(async (err: any, values: any) => {
            if (!err) {
                this.setState({
                    registerLoading: true
                })
                const res = await post(API.auth.register, values)
                if (res.success) {
                    this.props.dispatch({
                        type: 'global/saveUserInfo',
                        payload: res.data
                    })
                    message.success('恭喜您，注册成功')
                } else {
                    message.error(res.faildesc)
                }

                this.setState({
                    registerLoading: false,
                    // imgCode: joinUrlEncoded(domain + API.auth.imgcode, { rand: Math.random() })
                })
            }
        });
    };
    componentDidMount() {
        console.log(this.props);

    }
}

const RegisterForm = Form.create({ name: 'register' })(Register)

export default RegisterForm;