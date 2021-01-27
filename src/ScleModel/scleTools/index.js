import React, { useEffect, useRef, useState } from "react";
import { Drawer, Icon, Slider, Tabs } from "antd";
import ScleAttrTree from "../scleAttrTree/ScleAttrTree";
import {
  ScleRest,
  ScleMove,
  ScleApartment,
  ScleHide,
  ScleColor,
  ScleOpacity,
  ScleBgColor,
  ScleViewDirection,
  SclePlayer,
  ScleFullscreen,
  ScleStopPlay,
} from "./toolsCompoents/scleToolsBtn";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "./index.less";
import "swiper/swiper.less";
import "swiper/components/navigation/navigation.min.css";
import { IsPhone } from "../../utils/Browser";
import ToolsBarContext from "./ToolsBarContext";

SwiperCore.use([Navigation]);
let totalFrames = 0;
function ScleTools() {
  const swiperRef = useRef(null);

  const [drawerVisible, setdrawerVisible] = useState(false);
  const [sliderNum, setSliderNum] = useState(1);
  const [playPercent, setPlayPercent] = useState(0);
  const [player, setPlayerStatus] = useState(false);
  const [pause, setPause] = useState(false);
  //   let [totalFrames, setTotalFrames] = useState(0);
  const [toolsState, setToolsState] = useState({
    currentTab: "",
  });

  const setSwiper = () => {
    if (player) return;
    setSliderNum((swiperRef.current.offsetWidth + 10) / 38);
  };

  function setPlayer(bl) {
    !bl && window.animTerminal();
    setPlayerStatus(bl);
    togglePlay(bl);
    setSwiper();
  }

  function togglePlay(bl) {
    bl ? window.setAnimationStart() : window.animPause();
    setPause(bl);
  }

  function setAnmiIcon(isPause) {
    setPause(!isPause);
  }

  function getCurFrame(CurFrame) {
    const playPercent = (CurFrame / totalFrames) * 100;
    setPlayPercent(playPercent);
  }

  function scleStreamReady() {
    window.setAnmiIcon = setAnmiIcon;
    totalFrames = window.getTotalFrames();
    window.getCurFrame = (CurFrame) => getCurFrame(CurFrame);
  }

  useEffect(() => {
    window.isPhone = IsPhone();

    setSwiper();

    window.addEventListener("resize", setSwiper);

    window.addEventListener("scleStreamReady", scleStreamReady);

    return () => {
      window.removeEventListener("scleStreamReady", scleStreamReady);
    };
  }, []);

  return (
    <ToolsBarContext.Provider value={{ toolsState, setToolsState }}>
      <Drawer
        title={null}
        closable={false}
        mask={false}
        maskClosable={false}
        placement="left"
        width="auto"
        visible={drawerVisible}
        getContainer={false}
        bodyStyle={{ padding: 0 }}
        onClose={() => setdrawerVisible(false)}
        className="cleTreeDrawer"
      >
        <ScleAttrTree
        // ref={(el) => (sclAttrTree = el)}
        ></ScleAttrTree>
      </Drawer>
      <div className="scleToolsBar">
        <div className="preview_tools">
          {!player ? (
            <>
              <Icon type="left" className="prev_icon" />
              <Swiper
                ref={swiperRef}
                spaceBetween={0}
                loop={false}
                slidesPerView={sliderNum + 0.5}
                slidesPerGroup={Math.floor(sliderNum)}
                navigation={{
                  nextEl: ".next_icon",
                  prevEl: ".prev_icon",
                }}
                onSlideChange={() => console.log("slide change")}
                // onSwiper={(swiper) => console.log(swiper)}
              >
                <SwiperSlide>
                  <ScleRest />
                </SwiperSlide>

                <SwiperSlide>
                  <ScleMove />
                </SwiperSlide>

                <SwiperSlide>
                  <ScleApartment
                    onClick={() => setdrawerVisible(!drawerVisible)}
                    className={drawerVisible ? "scleToolsChecked" : ""}
                  />
                </SwiperSlide>

                <SwiperSlide>
                  <ScleHide />
                </SwiperSlide>

                <SwiperSlide>
                  <ScleColor />
                </SwiperSlide>

                <SwiperSlide>
                  <ScleOpacity />
                </SwiperSlide>

                <SwiperSlide>
                  <ScleBgColor />
                </SwiperSlide>

                <SwiperSlide>
                  <ScleViewDirection />
                </SwiperSlide>

                <SwiperSlide>
                  <SclePlayer onClick={() => setPlayer(true)} />
                </SwiperSlide>

                <SwiperSlide>
                  <ScleFullscreen />
                </SwiperSlide>

                {/* <SwiperSlide>
              <ScleMove />
            </SwiperSlide>
            */}
              </Swiper>
              <Icon type="right" className="next_icon" />
            </>
          ) : (
            <>
              <SclePlayer
                type={pause ? "pause-circle" : "play-circle"}
                onClick={() => togglePlay(!pause)}
              />
              <Slider
                className="progressSlider"
                min={0}
                max={100}
                value={playPercent}
                tipFormatter={(e) => e + "%"}
                onChange={(value) => {
                  setPlayPercent(value);
                  window.setCurFrame(totalFrames * (value / 100));
                }}
              />
              <ScleStopPlay onClick={() => setPlayer(false)} />
            </>
          )}
        </div>
      </div>
    </ToolsBarContext.Provider>
  );
}

export default ScleTools;
