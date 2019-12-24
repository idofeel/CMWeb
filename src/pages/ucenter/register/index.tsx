import React, { Component } from 'react'
import { Icon, Button, Form, Input, Tooltip, Cascader, AutoComplete, Row, Col, Checkbox } from 'antd'
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
                    <a href="javascript:;" onClick={() => {
                        this.props.dispatch({
                            type: 'global/save',
                            payload: {
                                login: true,
                                register: false
                            }
                        })
                    }}>已有账号，去登录</a>
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
                    <Form.Item label="验证码" >
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
        e.preventDefault();

        this.props.form.validateFieldsAndScroll(async (err: any, values: any) => {
            if (!err) {
                this.setState({
                    registerLoading: true
                })
                await post(API.auth.register, values)

                this.setState({
                    registerLoading: false
                })
                console.log('Received values of form: ', values);
            }
        });
    };
    componentDidMount() {
        console.log(this.props);

    }
}
export default Form.create({ name: 'register' })(Register);