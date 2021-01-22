import { PureComponent } from "react";
import { Table, Tabs, Tree } from "antd";
import "./scleAttrTree.less";
import { IsPhone } from "../../utils/Browser";

const { TabPane } = Tabs;
const { TreeNode } = Tree;

const columns = [
  {
    title: "参数名",
    dataIndex: "name",
  },
  {
    title: "参数值",
    dataIndex: "value",
  },
];
export default class ScleAttrTree extends PureComponent {
  key = 1000000;
  keys = []; //显示的的keys
  tempMutilpSelect = []; // 临时多选

  state = {
    treeData: {
      child: [],
    },
    paramsData: [], // 模型参数
    treeNodeCheckedKeys: [], // 显示隐藏复选框
    treeNodeSelectKeys: [], // 选中的key
    expandedKeys: [], //展开的key
  };
  render() {
    const {
      treeData,
      treeNodeCheckedKeys,
      treeNodeSelectKeys,
      expandedKeys,
      paramsData,
    } = this.state;
    return (
      <Tabs
        defaultActiveKey="1"
        className="scleAttrTree"
        renderTabBar={this.renderTabBar}
      >
        <TabPane tab="模型树" key="1">
          <Tree
            checkable
            checkStrictly
            checkedKeys={treeNodeCheckedKeys}
            selectedKeys={treeNodeSelectKeys}
            expandedKeys={expandedKeys}
            onClick={(e) => {
              return false;
            }}
            onExpand={(e) => {
              this.hideSelect = true;
              this.setState({
                expandedKeys: e,
              });
            }}
            onCheck={(treeNodeCheckedKeys, e) => {
              this.setState({
                treeNodeCheckedKeys,
              });
              window.setModelVisible(
                this.findleafIndexs(e.node.props.dataRef),
                e.checked
              );
               // 模型树隐藏时 dofeel
              const ms = this.state.treeNodeSelectKeys;
              if (ms * 1 === e.node.props.dataRef.key) {
                window.pickObjectVisible = e.checked;
                window.setPickObjectParameters();
              }
            //   

            }}
          >
            {this.renderTreeNodes(treeData)}
          </Tree>
        </TabPane>
        <TabPane tab="参数" key="2">
          <Table
            className="attrTable"
            columns={columns}
            dataSource={paramsData}
            locale={{ emptyText: "无数据" }}
            size="middle"
          />
        </TabPane>
      </Tabs>
    );
  }

  renderTabBar(DefaultTabBarProps, DefaultTabBar) {
    return <DefaultTabBar {...DefaultTabBarProps} />;
  }

  renderTreeNodes(treeData) {
    if (!treeData.length) return null;
    return treeData.map((item) => {
      if (item.child) {
        return (
          <TreeNode
            checkable={true}
            title={this.renderTitle(item)}
            key={item.key}
            dataRef={item}
          >
            {this.renderTreeNodes(item.child)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          checkable={true}
          key={item.key}
          title={item.title}
          {...item}
          dataRef={item}
        />
      );
    });
  }

  renderTitle(item) {
    const key = item.key + "";
    return (
      <span
        className={this.state.treeNodeSelectKeys.indexOf(key) > -1?'tree_selected': ''}
        onClick={() => {
           // 选择模型名称时 dofeel
          if (this.keyCode) return;
          this.hideSelect = true;
          this.tempMutilpSelect = this.findleafIndexs(item);
          this.setState({
            treeNodeSelectKeys: [key],
            paramsData: item.params,
          });
          window.pickModelByIndex(this.tempMutilpSelect, IsPhone());
          window.setPickObjectParameters();
        }}
        onMouseDown={() => {
          if (this.keyCode === 17) {
            let { treeNodeSelectKeys } = this.state;

            const leafKeys = this.findleafIndexs(item);

            if (treeNodeSelectKeys.indexOf(key) > -1) {
              // 已选择，取消选择
              treeNodeSelectKeys = treeNodeSelectKeys.filter(
                (item) => item !== key
              );
              // 临时多选
              this.tempMutilpSelect = this.tempMutilpSelect.filter(
                (item) => leafKeys.indexOf(item) === -1
              );
            } else {
              treeNodeSelectKeys.push(key);
              this.tempMutilpSelect = this.tempMutilpSelect.concat(leafKeys);
            }

            this.hideSelect = true;
            this.setState({
              treeNodeSelectKeys,
              paramsData: [],
            });

            window.pickModelByIndex(this.tempMutilpSelect, IsPhone());
            // 多选 dofeel
            window.setPickObjectParameters();
          }
        }}
      >
        {item.title}
      </span>
    );
  }

  //   scleStreamReady
  loadTree() {
    const treeData = [this.getTreeNodeData(window.g_GLData.GLModelTreeNode)];
    this.setState({
      treeData,
      treeNodeCheckedKeys: this.keys,
    });
    this.keys = null;
    const { expandedKeys } = this.getExpandedAndSelctKeys(treeData, [-1]);
    this.setState({
      expandedKeys,
    });
  }

  setVisible(visible) {
    let { treeNodeCheckedKeys } = this.state;
    treeNodeCheckedKeys = treeNodeCheckedKeys.checked || treeNodeCheckedKeys
    if (window.pickObjectIndexs === null) {
      return;
    }
    const visibleKeys = this.setTreeVisible(
      this.state.treeData,
      window.pickObjectIndexs,
      visible
    );
    treeNodeCheckedKeys = visible
      ? treeNodeCheckedKeys.concat(visibleKeys)
      : treeNodeCheckedKeys.filter((item) => visibleKeys.indexOf(item) < 0);
    this.setState({
      treeNodeCheckedKeys,
    });
  }

  setTreeVisible(data, keys, visible, visibleKeys = []) {
    for (let i = 0; i < data.length; i++) {
      if (keys.indexOf(data[i].objIndex) > -1) {
        visibleKeys.push(data[i].key + "");
      }
      if (data[i].child.length) {
        this.setTreeVisible(data[i].child, keys, visible, visibleKeys);
      }
    }
    return visibleKeys;
  }
  /**
   *
   * @param data
   * @param leafIndexs  叶子的index []
   */
  getExpandedAndSelctKeys(data, leafIndexs) {
    let findParentKeys = this.findParentKeys(data, leafIndexs),
      expandedKeys = [],
      treeNodeSelectKeys = [];

    findParentKeys.forEach((item) => {
      const { parentKeys } = item;
      treeNodeSelectKeys.push(parentKeys[parentKeys.length - 1]);
      expandedKeys = expandedKeys.concat(item.parentKeys);
    });

    // 去重展开的key
    expandedKeys = new Set(expandedKeys);
    expandedKeys = Array.from(expandedKeys);

    return {
      expandedKeys,
      treeNodeSelectKeys,
      item: findParentKeys,
    };
  }

  findParentKeys(data, objIndexs, key = []) {
    if (!objIndexs.length) return key;
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const index = objIndexs.indexOf(node.objIndex);
      if (index > -1) {
        key.push(node);
        objIndexs.filter((item) => item !== node.objIndex);
      } else if (node.child && node.child.length) {
        this.findParentKeys(node.child, objIndexs, key);
      }
    }
    return key;
  }

  pickObjectParameters = () => {
    if (
      !window.pickObjectIndexs ||
      (window.pickObjectIndexs && !window.pickObjectIndexs.length)
    ) {
      this.setState({
        treeNodeSelectKeys: [],
        // isVisible: !!window.pickObjectVisible,
        // alphaRange: window.pickObjectTransparent,
      });
      return;
    }
    const {
      expandedKeys,
      treeNodeSelectKeys,
      item,
    } = this.getExpandedAndSelctKeys(
      this.state.treeData,
      window.pickObjectIndexs
    );
    this.setState({
      expandedKeys,
      treeNodeSelectKeys,
      paramsData: item.length === 1 ? item[0].params : [],
      // isVisible: !!pickObjectVisible,
      // alphaRange: pickObjectTransparent
    });
  };

  getTreeNodeData(item, parentKeys = []) {
    this.key += 1;
    parentKeys = parentKeys.concat(this.key + "");
    if (item._bVisible) this.keys.push(`${this.key}`);
    return {
      key: this.key,
      parentKeys,
      nodeid: item._uTreeNodeID,
      treeid: item._uJSTreeID,
      title: item._strName,
      params: this.getTreeNodeParams(item._arrNodeParameters),
      objIndex: item._uObjectIndex,
      originVisible: item._bVisibleOriginal,
      visible: item._bVisible,
      TriangleCount: item._uObjectTriangleCount,
      child: this.processTreeData(item._arrSubNode, parentKeys),
    };
  }

  processTreeData(treeData, parentKeys) {
    // console.log(treeData);
    if (!treeData || !treeData.length) return [];
    return treeData.map((item) => this.getTreeNodeData(item, parentKeys));
  }

  getTreeNodeParams(arrParmas) {
    return arrParmas.map((item) => ({
      name: item._strName,
      value: item._strValue,
    }));
  }

  findleafIndexs = (data) => {
    let indexs = [];
    if (data.child && data.child.length) {
      data.child.map(
        (item) => (indexs = indexs.concat(this.findleafIndexs(item)))
      );
      return indexs;
    } else {
      indexs.push(data.objIndex);
      return indexs;
    }
  };

  disableContextmenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };
  keyup = (e) => {
    this.keyCode = 0;
    if (this.state.multipleSelcet) {
      this.setState({
        multipleSelcet: false,
      });
    }
  };
  keydown = (e) => {
    if (e.keyCode === 17) {
      this.keyCode = 17;

      this.setState({
        multipleSelcet: true,
      });
    }
  };
  //   ---------------------
  componentDidMount() {
    if (window.g_GLData) {
      this.loadTree();
    } else {
      window.addEventListener("scleStreamReady", () => this.loadTree(), {
        passive: false,
      });
    }
    window.setVisibleTree = this.setVisible.bind(this)
    window.addEventListener("pickParams", this.pickObjectParameters, {
      passive: false,
    });
    window.addEventListener("keydown", this.keydown);
    window.addEventListener("keyup", this.keyup);
    document.addEventListener("contextmenu", this.disableContextmenu);
  }
  componentWillUnmount() {
    window.removeEventListener("scleStreamReady", this.loadTree.bind(this), {
      passive: false,
    });

    window.removeEventListener("pickParams", this.pickObjectParameters, {
      passive: false,
    });
    document.removeEventListener("contextmenu", this.disableContextmenu);
    window.removeEventListener("keyup", this.keyup);
    window.removeEventListener("keydown", this.keydown);
  }
}
