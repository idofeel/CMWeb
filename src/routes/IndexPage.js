import React from "react";
import { connect } from "dva";
import { Tabs, Affix, Button, Menu, Layout } from "antd";
import styles from "./IndexPage.less";
import NetCore from "../components/ClientCheck/NetCoreCheck";
import { Switch } from "dva/router";
import SubRoutes, { NoMatchRoute, RedirectRoute } from "../utils/SubRoutes";

const { TabPane } = Tabs;

const { Header, Content, Footer } = Layout;

function IndexPage({ routes, global, dispatch, app }) {
  return (
    <Layout className={styles.homePage}>
      <Header
      //   style={{ position: "fixed", zIndex: 1, width: "100%" }}
      >
        <img
          className={styles.logo}
          src="https://nwzimg.wezhan.cn/contents/sitefiles2033/10167896/images/10181979.png"
        />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item
            key="1"
            onClick={() => {
              dispatch({
                type: "global/save",
                payload: {
                  uname: "ddddd"
                }
              });
            }}
          >
            菜单 12
          </Menu.Item>
          <Menu.Item key="2">菜单 2</Menu.Item>
          <Menu.Item key="3">菜单 3</Menu.Item>
        </Menu>
      </Header>
      <Content
        style={{ padding: "0 50px", marginTop: 20, textAlign: "center" }}
      >
        <Affix offsetTop={10}>
          <Tabs defaultActiveKey="1" animated={!isIE()}>
            <TabPane tab="Tab 1" key="1">
              {global.uname}
              <a href="#/view" target="_blank">
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
      <Footer style={{ textAlign: "center" }}>
        {/* Ant Design ©2018 Created by Ant UED */}
      </Footer>
    </Layout>
  );
  function isIE() {
    if (window.navigator.userAgent.indexOf("MSIE") >= 1) return true;
    else return false;
  }
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
