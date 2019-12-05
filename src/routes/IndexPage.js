import React from "react";
import { connect } from "dva";
import { Tabs, Affix, Button, Menu, Layout, Row, Col, Drawer } from "antd";
import styles from "./IndexPage.less";
import { Switch } from "dva/router";
import SubRoutes, { NoMatchRoute, RedirectRoute } from "../utils/SubRoutes";
import Categroys from "../components/Categroys/Categroys";
import { IEVersion } from "../utils/Browser";

const IE = IEVersion();

const { TabPane } = Tabs;

const { Header, Content, Footer, Sider } = Layout;

function IndexPage({ routes, global, dispatch, app }) {
  return (
    <Layout className={styles.homePage}>
      <Header className={styles.header}>
        <Col xs={24} md={24} className="logoBox">
          <img
            className={styles.logo}
            src="https://nwzimg.wezhan.cn/contents/sitefiles2033/10167896/images/10181979.png"
          />
        </Col>
        <Row>
          <Col md={24} xs={0}>
            <Categroys mode="horizontal" />
          </Col>
        </Row>
      </Header>
      <Drawer
        title="Basic Drawer"
        placement={"left"}
        closable={false}
        onClose={() => {}}
        visible={true}
        maskClosable={true}
      >
        <Categroys mode="inline" />
      </Drawer>
      <Content
        style={{ padding: "0 50px", marginTop: 50, textAlign: "center" }}
      >
        <Affix offsetTop={10}>
          <Tabs defaultActiveKey="1" animated={!IE || IE >= 10}>
            <TabPane tab="Tab 1" key="1">
              {global.uname}
              <a href="#/view?pid=4" target="_blank">
                打开文件
              </a>
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </Affix>

        <Switch>
          {routes.map((route, i) => (
            <SubRoutes key={i} {...route} app={app} />
          ))}
          <RedirectRoute exact={true} from={"/"} routes={routes} />
          <NoMatchRoute />
        </Switch>
        {/* <div style={{ background: "#fff", padding: 24, minHeight: 380 }}>
          Content
        </div> */}
      </Content>
      <Footer style={{ textAlign: "center" }}></Footer>
    </Layout>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
