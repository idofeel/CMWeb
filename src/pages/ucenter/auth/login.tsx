import React, { Component } from 'react'
import { connect } from 'dva';
import { Form, Input, Icon, Checkbox, Button } from 'antd';
import { email_reg, user_name } from '../../../utils/Regexp';
import './login.less'
interface Props {

}
interface State {

}
@connect()
class Login extends Component<Props, State> {
    state = {
        logining: false
    }

    //  用户名验证
    async validatorUser(rule: any, val: any, callback: any) {
        callback(!rule.pattern.test(val) ? undefined : '请输入2-32位字符，不能包含特殊字符');
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [
                            { required: true, message: '请输入您的用户名' },
                            {
                                pattern: user_name,
                                validator: this.validatorUser,
                                // message:
                                // '请输入正确的邮箱格式,如: 375163888@qq.com',
                            },
                        ],
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="user"
                                    style={{ color: 'rgba(0,0,0,.25)' }}
                                />
                            }
                            placeholder="请输入您的手机号/邮箱"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入您的密码!' }],
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="lock"
                                    style={{ color: 'rgba(0,0,0,.25)' }}
                                />
                            }
                            type="password"
                            placeholder="请输入密码"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('period', {
                        valuePropName: 'checked',
                        initialValue: false,
                    })(<Checkbox>记住我</Checkbox>)}
                    <a className="login-form-forgot" href="">
                        忘记密码
					</a>
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={(e) => {
                            this.onSubmit(e);
                        }}
                        loading={this.state.logining}
                        className="login-form-button">
                        登录
					</Button>
                    <a href="javascript:;" onClick={() => {
                        this.props.dispatch({
                            type: 'global/save',
                            payload: {
                                loginModal: false,
                                registerModal: true
                            }
                        })
                    }}>现在注册！</a>
                </Form.Item>
            </Form>
        );
    }

    onSubmit() {
        // console.log(this)
        this.props.form.validateFields((err, values) => {
            if (err) return;
            values.period = values.period ? 1 : 0
            this.setState({
                logining: true
            })
            this.props.dispatch({
                type: 'global/login',
                payload: values
            }).then(() => {
                this.setState({
                    logining: false
                })
            })

        });
    }

}


export default Form.create({ name: 'normal_login' })(Login);