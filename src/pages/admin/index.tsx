import React from 'react'
import { Layout, Menu, Breadcrumb, Icon, Popover, Avatar, message } from 'antd';
import { Switch } from "dva/router"
import SubRoutes, { RedirectRoute, NoMatchRoute } from '../../utils/SubRoutes';
import Login from '../ucenter/auth/login';
import { connect } from 'dva';
import { domain } from '../../utils';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

@connect()
export default class Admin extends React.Component {
    state = {
        collapsed: false,
    };

    componentWillMount() {
        const { dispatch, global }:any = this.props;

        if (global.checkLogin == null) {
            dispatch({
                type: 'global/isLogin',
            })
        }else{
            if (global.roleid !=='' && global.roleid < 59) {
                message.warning('管理员权限不足');
                this.props.history.push('/');
            }
        }
       
    }

    render() {
        const { routes, app, global } = this.props
        const avatarAttr = {
            icon: global.uname ? '' : 'user',
            src: global.avatar.indexOf('http') > -1 ? global.avatar : `${domain}/${global.avatar}`,
            style: { backgroundColor: "#1890ff", margin: 10, float: 'right' }
        }
        if (global.checkLogin == null) return null;
        if (!global.islogin) return <div style={{ textAlign: 'center' }}>
            <a href="/">
                <img
                    style={{ width: '250px', marginTop: 50 }}
                    src={require('../../assets/images/CMReaderWebLogo.png')}
                />
            </a>
            <Login />
        </div>
        console.log(location, this);


        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Header>
                    <a href="#/admin" style={{ float: "left" }}>
                        <img
                            style={{ height: '42px', marginRight: '20px' }}
                            src={require('../../assets/images/cmreader.png')}
                        />
                    </a>
                    <Popover content={this.renderMenus()} placement="bottomRight" >
                        <Avatar size="large" {...avatarAttr} onClick={() => {
                            !this.props.global.islogin && this.props.dispatch({
                                type: 'ucenter/save',
                                payload: {
                                    loginModal: true,
                                    registerModal: false
                                }
                            })
                        }}>{global.uname}</Avatar>
                    </Popover>
                    <Menu theme="dark" mode="horizontal" selectedKeys={[this.props.location.pathname]} style={{ lineHeight: '64px' }}>
                        <Menu.Item key="/admin/source" onClick={() => this.props.history.push('/admin/source')}>
                            <Icon type="file" />
                            <span>资源管理</span>
                        </Menu.Item>
                        <Menu.Item key="/admin/category" onClick={() => this.props.history.push('/admin/category')}>
                            <Icon type="apartment" />
                            <span>分类管理</span>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    <Content>
                        <Switch>
                            {routes.map((route, i) => (
                                <SubRoutes key={i} {...route} app={app} />
                            ))}
                            <RedirectRoute exact={true} from={"/admin"} routes={routes} />
                            <NoMatchRoute />
                        </Switch>
                    </Content>
                </Layout>
            </Layout >
        );
    }

    renderMenus() {
        return <Menu  >
            <Menu.Item key="logout" style={{ padding: '0  20px' }} onClick={() => this.props.dispatch({
                type: 'global/logout',
            })}>
                <Icon type="logout" />
                <span >退出登录</span>
            </Menu.Item>
        </Menu>
    }
}