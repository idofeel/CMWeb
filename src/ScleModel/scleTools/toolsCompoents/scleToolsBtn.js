import { ChromePicker } from "react-color";
import React, { useContext, useEffect, useState } from "react";
import {
  Icon,
  message,
  notification,
  Popover,
  Radio,
  Slider,
  Tooltip,
} from "antd";
import {
  exitFullscreen,
  fullScreen,
  IEVersion,
  IsPhone,
} from "../../../utils/Browser";
import ToolsBarContext from "../ToolsBarContext";

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "./js_min/localiconfont/iconfont.js",
});
const renderTitle = (title) => (IsPhone() ? null : title);

/**
 *  重置按钮
 * @param {*} props
 */
function ScleRest(props) {
  return (
    <>
      <Tooltip title={renderTitle("复位")}>
        <Icon type="home" {...props} onClick={() => window.setHome()} />
      </Tooltip>
    </>
  );
}

function ScleMove(props) {
  const [dragChecked, setDragChecked] = useState("");
  const toggleChecked = () => {
    window.moveModel();
    setDragChecked(dragChecked !== "" ? "" : "scleToolsChecked");
  };

  function dragMove() {
    if (dragChecked !== "") {
      toggleChecked();
    } else {
      isPickNull(() => {
        toggleChecked();
        if (!IsPhone()) {
          notification.info({
            message: "移动操作",
            description: "使用Ctrl+鼠标左键，移动模型。",
            duration: 3,
          });
        }
      });
    }
  }
  return (
    <>
      <Tooltip title={renderTitle("移动零件")}>
        <Icon
          type="drag"
          onClick={dragMove}
          className={dragChecked}
          color="red"
          {...props}
        />
      </Tooltip>
    </>
  );
}

function ScleApartment(props) {
  return (
    <>
      <Tooltip title={renderTitle("模型树")}>
        <Icon type="apartment" {...props} />
      </Tooltip>
    </>
  );
}

function ScleHide(props) {
  const [icon, setIcon] = useState("eye-invisible");
  function toggle(bl) {
    const isHide = icon === "eye";
    setIcon(isHide ? "eye-invisible" : "eye");
    window.setVisible(isHide);
    window.setVisibleTree(isHide);
  }

  useEffect(() => {
    window.addEventListener("pickParams", () => {
      setIcon(window.pickObjectVisible ? "eye-invisible" : "eye");
    });
  }, []);

  return (
    <>
      <Tooltip title={renderTitle("隐藏")}>
        <Icon type={icon} onClick={() => isPickNull(toggle)} {...props} />
      </Tooltip>
    </>
  );
}

function useTabs(props = {}) {
  const { toolsState, setToolsState } = useContext(ToolsBarContext);

  useEffect(() => {
    window.addEventListener("pickParams", () => {
      setToolsState({
        currentTab: "",
      });
    });
  }, []);

  const isSelected = toolsState.currentTab === props.name;

  return {
    setTab: (tabName = props.name) => {
      setToolsState({
        currentTab: tabName,
      });
    },
    isSelected,
    tabClassName: isSelected ? "scleToolsChecked" : "",
  };
}

function ScleColor(props) {
  const { isSelected, tabClassName, setTab } = useTabs({ name: "color" });

  const [Color, setColor] = useState({ r: 255, g: 0, b: 0, a: 1 });

  return (
    <Popover
      content={
        <ChromePicker
          onChange={(e) => {
            // setState(state+1)
            isPickNull(() => {
              const { r, g, b, a } = e.rgb;
              setColor(e.rgb);
              window.setMaterialRGBA(r / 255, g / 255, b / 255, a);
            });
          }}
          color={Color}
        ></ChromePicker>
      }
      visible={isSelected}
    >
      <Tooltip title={renderTitle("颜色")}>
        <Icon
          type="bg-colors"
          onClick={() =>
            isPickNull(() => {
              setTab();
            })
          }
          className={tabClassName}
          {...props}
        />
      </Tooltip>
    </Popover>
  );
}

function ScleOpacity(props) {
  const { isSelected, tabClassName, setTab } = useTabs({ name: "opacity" });
  const [alpha, setAlpha] = useState(1);
  function changePopVisible() {
    isPickNull(() => setTab());
  }

  return (
    <Popover
      content={
        <div className="transparent">
          <Slider
            defaultValue={1}
            step={0.1}
            min={0}
            max={1}
            value={alpha}
            onChange={(value) => {
              isPickNull(() => {
                setAlpha(value);
                window.setTransparent(value);
              });
            }}
          />
        </div>
      }
      visible={isSelected}
      trigger="focus"
      onVisibleChange={(v) => {
        console.log(v);
      }}
    >
      <Tooltip title={renderTitle("透明度")}>
        <IconFont
          type="icon-toumingdu"
          className={tabClassName}
          onClick={changePopVisible}
          {...props}
        />
      </Tooltip>
    </Popover>
  );
}

function ScleBgColor(props) {
  const { isSelected, tabClassName, setTab } = useTabs({ name: "BgColor" });
  return (
    <Popover
      content={
        <Radio.Group
          defaultValue="0"
          buttonStyle="solid"
          onChange={(e) => {
            window.setBackground(e.target.value * 1);
          }}
        >
          <Radio.Button value="0">淡蓝色</Radio.Button>
          <Radio.Button value="1">浅白色</Radio.Button>
          <Radio.Button value="2">银灰色</Radio.Button>
        </Radio.Group>
      }
      visible={isSelected}
    >
      <Tooltip title={renderTitle("背景色")}>
        <IconFont
          type="icon-background-l"
          className={tabClassName}
          onClick={() => setTab()}
          {...props}
        />
      </Tooltip>
    </Popover>
  );
}

function ScleViewDirection(props) {
  const { isSelected, tabClassName, setTab } = useTabs({ name: "ViewDire" });

  const bg = { background: "rgba(24,144,255, 0.6)" };
  const viewDirections = [
    { title: "正视图", value: 0, forward: bg },
    { title: "后视图", value: 1, back: bg },
    { title: "左视图", value: 2, left: bg },
    { title: "右视图", value: 3, right: bg },
    { title: "俯视图", value: 4, up: bg },
    { title: "仰视图", value: 5, down: bg },
    { title: "等轴侧", value: 6, forward: bg, right: bg },
  ];

  return (
    <Popover
      content={
        <div className="DivBox">
          {!IEVersion() ? (
            viewDirections.map((item) => (
              <DivBox
                key={item.value}
                {...item}
                onTouchEnd={() => window.setView(item.value)}
                onClick={() => window.setView(item.value)}
              />
            ))
          ) : (
            <Radio.Group
              defaultValue={0}
              buttonStyle="solid"
              onChange={(item) => {
                window.setView(item.target.value);
              }}
            >
              {viewDirections.map((item) => (
                <Radio.Button value={item.value} key={item.value}>
                  {item.title}
                </Radio.Button>
              ))}
            </Radio.Group>
          )}
        </div>
      }
      visible={isSelected}
    >
      <Tooltip title={renderTitle("视图")}>
        <IconFont
          type="icon-box"
          className={tabClassName}
          onClick={(e) => setTab()}
          {...props}
        />
      </Tooltip>
    </Popover>
  );
}

function SclePlayer(props) {
  return (
    <>
      <Tooltip title={renderTitle("播放")}>
        <Icon type="play-circle" {...props} />
      </Tooltip>
    </>
  );
}

function ScleStopPlay(props) {
  return (
    <>
      <Tooltip title={renderTitle("停止播放")}>
        <IconFont type="icon-Stop" {...props} />
      </Tooltip>
    </>
  );
}

function ScleFullscreen(props) {
  const [fullIcon, setFullIcon] = useState("fullscreen");

  function toggleFullScreen() {
    const isFull = fullIcon !== "fullscreen";
    setFullIcon(isFull ? "fullscreen" : "fullscreen-exit");
    isFull ? exitFullscreen() : fullScreen();
  }

  return (
    <>
      <Tooltip title={renderTitle("全屏")}>
        <Icon type={fullIcon} onClick={toggleFullScreen} {...props} />
      </Tooltip>
    </>
  );
}

function DivBox(props) {
  const { up, down, left, right, forward, back } = props;

  return (
    <Tooltip title={props.title}>
      <div className="box" {...props}>
        <div className="up" style={up}></div>
        <div className="down" style={down}></div>
        <div className="left" style={left}></div>
        <div className="right" style={right}></div>
        <div className="forward" style={forward}></div>
        <div className="back" style={back}></div>
      </div>
    </Tooltip>
  );
}

function isPickNull(cb = () => {}) {
  return window.getPickStatus() < 1 ? message.info("需先选中模型") : cb();
}

export {
  ScleRest,
  ScleMove,
  ScleApartment,
  ScleHide,
  ScleColor,
  ScleOpacity,
  ScleBgColor,
  ScleViewDirection,
  SclePlayer,
  ScleStopPlay,
  ScleFullscreen,
};
