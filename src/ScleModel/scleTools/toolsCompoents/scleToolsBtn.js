import { ChromePicker } from "react-color";
import React, { useEffect, useState } from "react";
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

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "./js_min/localiconfont/iconfont.js",
});
const renderTitle = (title) => (IsPhone() ? null : title);

function test(){
     const [state, setstate] = useState(1)
 
    return {state, setstate}
}
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

function ScleColor(props) {
  const [PopVisible, setPopVisible] = useState(false);
  const [Color, setColor] = useState({ r: 255, g: 0, b: 0, a: 1 });

  useEffect(() => {
    window.addEventListener("pickParams", () => {
      if (!window.pickObjectIndexs || window.pickObjectIndexs.length === 0) {
        setPopVisible(false);
      }
    });
  }, []);
  return (
    <Popover
      content={
        <ChromePicker
          onChange={(e) => {
            isPickNull(() => {
              const { r, g, b, a } = e.rgb;
              setColor(e.rgb);
              window.setMaterialRGBA(r / 255, g / 255, b / 255, a);
            });
          }}
          color={Color}
        ></ChromePicker>
      }
      visible={PopVisible}
    >
      <Tooltip title={renderTitle("颜色")}>
        <Icon
          type="bg-colors"
          onClick={() => isPickNull(() => setPopVisible(!PopVisible))}
          className={PopVisible ? "scleToolsChecked" : ""}
          {...props}
        />
      </Tooltip>
    </Popover>
  );
}

function ScleOpacity(props) {
  const [PopVisible, setPopVisible] = useState(false);
  const [alpha, setAlpha] = useState(1);

  function changePopVisible() {
    isPickNull(() => setPopVisible(!PopVisible));
  }

  useEffect(() => {
    window.addEventListener("pickParams", () => {
        if (!window.pickObjectIndexs || window.pickObjectIndexs.length === 0) {
        setPopVisible(false);
      }
    });
  }, []);

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
      visible={PopVisible}
    >
      <Tooltip title={renderTitle("透明度")}>
        <IconFont
          type="icon-toumingdu"
          className={PopVisible ? "scleToolsChecked" : ""}
          onClick={changePopVisible}
          {...props}
        />
      </Tooltip>
    </Popover>
  );
}

function ScleBgColor(props) {
  const [PopVisible, setPopVisible] = useState(false);
  useEffect(() => {
    window.addEventListener("pickParams", (e) => {
      setPopVisible(false);
    });
  }, []);
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
      visible={PopVisible}
    >
      <Tooltip title={renderTitle("背景色")}>
        <IconFont
          type="icon-background-l"
          className={PopVisible ? "scleToolsChecked" : ""}
          onClick={(e) => {
            setPopVisible(!PopVisible);
          }}
          {...props}
        />
      </Tooltip>
    </Popover>
  );
}

function ScleViewDirection(props) {
  const [PopVisible, setPopVisible] = useState(false);

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

  useEffect(() => {
    window.addEventListener("pickParams", () => {
      setPopVisible(false);
    });
  }, []);

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
      visible={PopVisible}
    >
      <Tooltip title={renderTitle("视图")}>
        <IconFont
          type="icon-box"
          className={PopVisible ? "scleToolsChecked" : ""}
          onClick={(e) => {
            setPopVisible(!PopVisible);
          }}
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
