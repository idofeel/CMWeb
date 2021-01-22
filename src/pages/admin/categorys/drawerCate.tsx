import React from 'react'
import { Drawer } from 'antd'
import Categroys from '../../../components/Categroys/Categroys'

export default class drawerCate extends React.Component {

    state = {
        drawerShow: false
    }
    render() {

        return (
            <Drawer
                title='选择分类'
                placement={"left"}
                closable={false}
                className='HomeDrawer'
                destroyOnClose={false}
                onClose={()=>this.toggleDrawer()}
                visible={this.state.drawerShow}
                maskClosable={true}
            >
                <Categroys mode='inline' />
            </Drawer>
        )
    }
    toggleDrawer(bl: boolean) {
        this.setState({
            drawerShow: !!bl,
        })
    }

}
