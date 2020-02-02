//===================================================================================================

// WebGL Context 全局变量
const canvas = document.querySelector('#glcanvas');
var gl = canvas.getContext('webgl2');
var isWebgl2 = true;
if (!gl) {
    gl = canvas.getContext('webgl');
    isWebgl2 = false;
}

var glRunTime = new GLRunTime();

var bgImage = [
    "./Resource/Background/blue.jpg",
    "./Resource/Background/white.jpg",
    "./Resource/Background/grey.jpg",
];

// 键盘交互参数
var isLockCavans = false;
var isShiftDown = false;
// 鼠标交互
var isKeyTap = false;
var objectIndex = -1;
// 用户拾取零件的返回参数定义
var pickObjectIndexs = null;        // 选中的零件索引，没选中为null
var pickObjectVisible = false;      // 选中的零件的显隐性，单选表示显隐性，多选无效
var pickObjectTransparent = 0.0;    // 选中的零件的透明度参数，单选表示透明度，多选无效
var pickObjectMaterial = null;      // 选中的零件的材质数据，暂时无定义
// 零件移动
var isMove = false;
// 当前动画帧
const ANIMRUN = 0;
const ANIMPAUSE = 1;
const ANIMTERMINAL = 2;
var animationClock = null;
var animationStatus = ANIMTERMINAL;
var uCurFrame = 0;
var uSleepTime = 30;

/**
 * 开始循环渲染
 */
function startRender() {
    if (!gl) {
        alert('Unable to initialize WebGL. Your browser or machine may not support it.');
        return;
    }

    glRunTime.initRender();
    function render() {
        glRunTime.draw();
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
    addKeyboardListener();
    addMouseListener(canvas);
    window.onunload = addCloseListenser;
}

/**
 * 添加键盘响应
 */
function addKeyboardListener() {
    document.addEventListener('keydown', onDocumentKeyDown, false);
    document.addEventListener('keyup', onDocumentKeyUp, false);
}

function onDocumentKeyDown(event) {
    if (isLockCavans) {
        return;
    }
    if (event.ctrlKey) {
        isShiftDown = true;
    } else {
        isShiftDown = false;
        if (event.keyCode == 32) {
            // 空格响应事件
            setFocusOnModel();
        }
    }
}

function onDocumentKeyUp(event) {
    if (isLockCavans) {
        return;
    }
    isShiftDown = false;
}

/**
 * 添加鼠标响应事
 */
function addMouseListener(canvas) {
    let dragLeft = false, dragMid = false, dragRight = false;
    let lastX = -1, lastY = -1;
    let lastX1 = -1, lastY1 = -1, lastX2 = -1, lastY2 = -1;

    canvas.ontouchstart = function (event) {
        isKeyTap = true;
        if (event.targetTouches.length == 2) {
            // 双指
            let touch1 = event.targetTouches[0], touch2 = event.targetTouches[1];
            lastX1 = touch1.clientX - canvas.offsetLeft, lastY1 = touch1.clientY - canvas.offsetTop;
            lastX2 = touch2.clientX - canvas.offsetLeft, lastY2 = touch2.clientY - canvas.offsetTop;
        }
    }

    canvas.ontouchmove = function (event) {
        isKeyTap = false;
        if (event.targetTouches.length == 1) {
            // 单指滑动：旋转
            let touch = event.targetTouches[0];
            let x = touch.clientX - canvas.offsetLeft, y = touch.clientY - canvas.offsetTop;
            if (Math.abs(x - lastX1) < 5 && Math.abs(y - lastY1) < 5) {
                isKeyTap = true;
                return;
            } else {
                let factor = 200.0 / canvas.height;
                let degreeX = factor * (x - lastX1);
                let degreeY = factor * (y - lastY1);
                glRunTime.rotate(degreeX, degreeY, 0);
            }
            lastX1 = x, lastY1 = y;
        } else if (event.targetTouches.length == 2) {
            // 双指滑动：缩放
            let touch1 = event.targetTouches[0], touch2 = event.targetTouches[1];
            let x1 = touch1.clientX - canvas.offsetLeft, y1 = touch1.clientY - canvas.offsetTop;
            let x2 = touch2.clientX - canvas.offsetLeft, y2 = touch2.clientY - canvas.offsetTop;
            let dist1 = Math.pow(Math.pow(lastX1 - lastX2, 2) + Math.pow(lastY1 - lastY2, 2), 0.5);
            let dist2 = Math.pow(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2), 0.5);
            glRunTime.scale(dist2 / dist1);
            lastX1 = x1, lastY1 = y1;
            lastX2 = x2, lastY2 = y2;
        }
    }

    canvas.ontouchend = function (event) {
        if (isKeyTap) {
            let rect = event.target.getBoundingClientRect();
            if (event.targetTouches.length == 1) {
                // 单指
                let touch = event.targetTouches[0];
                let x = touch.clientX - canvas.offsetLeft, y = touch.clientY - canvas.offsetTop;
                if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
                    objectIndex = glRunTime.pick(x, y, true, false);
                    lastX1 = x, lastY1 = y;
                }
            }
        }
    }

    canvas.onmousedown = function (event) {
        if (isLockCavans) {
            return;
        }
        isKeyTap = true;
        let rect = event.target.getBoundingClientRect();
        let x = event.clientX - canvas.offsetLeft, y = event.clientY - canvas.offsetTop;
        if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
            lastX = x, lastY = y;
            switch (event.button) {
                case 0:
                    // 左键
                    dragLeft = true;
                    //在canvas里屏蔽浏览器右键菜单,不兼容火狐
                    canvas.oncontextmenu = function () {
                        return false;
                    }
                    if (isShiftDown) {
                        objectIndex = glRunTime.pick(x, y, false, false);
                    }
                    break;
                case 1:
                    // 中键
                    dragMid = true;
                    break;
                case 2:
                    // 右键
                    dragRight = true;
                    // 取消控件操作
                    isMove = false;
                    // 右键测试
                    // animTerminal();
                    //在canvas里屏蔽浏览器右键菜单,不兼容火狐
                    canvas.oncontextmenu = function () {
                        return false;
                    }
                    break;
            }
        }
    }

    canvas.onmouseup = function (event) {
        if (isLockCavans) {
            return;
        }
        switch (event.button) {
            case 0:
                dragLeft = false;
                if (isKeyTap) {
                    if (!isShiftDown) {
                        objectIndex = glRunTime.pick(lastX, lastY, true, false);
                        pickObjectVisible = glRunTime.getObjectVisible(objectIndex);
                        pickObjectTransparent = glRunTime.getObjectTransparent(objectIndex);
                    } else {
                        objectIndex = glRunTime.pick(lastX, lastY, true, true);
                    }
                    pickObjectIndexs = glRunTime.getPickObjectIndexs();
                    setPickObjectParameters();
                }
                break;
            case 1:
                dragMid = false;
                break;
            case 2:
                dragRight = false;
                break;
        }
    }

    canvas.onmousewheel = function (event) {
        if (isLockCavans) {
            return;
        }
        isKeyTap = false;
        let fScale = 1.0 + event.wheelDelta / 1000;
        glRunTime.scale(fScale);

        if (event.preventDefault) {
            // Firefox
            event.preventDefault();
            event.stopPropagation();
        } else {
            // IE
            event.cancelBubble = true;
            event.returnValue = false;
        }
        return false;
    };

    canvas.onmousemove = function (event) {
        if (isLockCavans) {
            return;
        }
        isKeyTap = false;
        let x = event.clientX - canvas.offsetLeft, y = event.clientY - canvas.offsetTop;
        if ((!isShiftDown) && dragMid) {
            // 视角旋转
            let factor = 200.0 / canvas.height;
            let degreeX = factor * (x - lastX);
            let degreeY = factor * (y - lastY);
            glRunTime.rotate(degreeX, degreeY, 0);
        }

        if (isShiftDown && dragMid) {
            //视角平移
            glRunTime.move(2 * (x - lastX), -2 * (y - lastY));
        }

        // shift + 左键拖拽：模型平移
        if (isMove) {
            if (isShiftDown && dragLeft) {
                if (objectIndex > -1) {
                    if (Math.abs(x - lastX) > 2 || Math.abs(y - lastY) > 2) {
                        glRunTime.objectMove(objectIndex, 2 * (x - lastX), -2 * (y - lastY));
                    }
                }
            }
        }
        lastX = x, lastY = y;
    }
}

/**
 * 页面关闭事件
 */
function addCloseListenser() {
    glRunTime.clear();
}

// 窗口变化
window.onresize = canvasOnResize;

// 禁止浏览器滚轮默认行为
document.onmousewheel = function (event) {
    if (event.preventDefault) {
        // Firefox
        event.preventDefault();
        event.stopPropagation();
    } else {
        // IE
        event.cancelBubble = true;
        event.returnValue = false;
    }
    return false;
}

/**
 * 响应页面控件
 */

// 零件移动
function moveModel() {
    isMove = true;
}

// 材质设置
function setMaterial(selectIndex) {
    switch (selectIndex) {
        case 0:
            glRunTime.setObjectMaterial(0.5, 1.0, 0.0, 0.5);
            break;
        case 1:
            glRunTime.setObjectMaterial(0.25, 0.87, 0.8, 0.5);
            break;
        case 2:
            glRunTime.setObjectMaterial(1.0, 1.0, 0.0, 0.5);
            break;
        case 3:
            glRunTime.setObjectMaterial(1.0, 0.75, 0.8, 0.5);
            break;
        default:
            break;
    }
}
/**
 * 
 * @param {*} r 红色分量0.0-1.0
 * @param {*} g 绿色分量0.0-1.0
 * @param {*} b 蓝色分量0.0-1.0
 * @param {*} a 透明度分量0.0-1.0
 */
function setMaterialRGBA(r, g, b, a) {
    glRunTime.setObjectMaterial(r, g, b, a);
}

// 透明度设置
function setTransparentIndex(selectIndex) {
    switch (selectIndex) {
        case 0:
            glRunTime.setObjectTransparent(0.0);
            break;
        case 1:
            glRunTime.setObjectTransparent(0.5);
            break;
        case 2:
            glRunTime.setObjectTransparent(1.0);
            break;
        default:
            break;
    }
}
/**
 * 
 * @param {*} alpha 0.0-1.0之间
 */
function setTransparent(alpha) {
    glRunTime.setObjectTransparent(alpha);
}

// 模型隐藏
function setVisible(isVisible) {
    glRunTime.setObjectVisible(isVisible);
}

// 视图切换
function setView(selectIndex) {
    glRunTime.shiftView(selectIndex);
}

// 复位
function setHome() {
    glRunTime.home();
}

// 开始动画、继续动画
function setAnimationStart() {
    isLockCavans = true;
    if (animationStatus == ANIMTERMINAL) {
        setHome();
    }
    animationStatus = ANIMRUN;
    animRun();
}
// 执行动画循环
function animRun() {
    if (glRunTime.setCameraAnim(uCurFrame)) {
        glRunTime.setObjectAnim(uCurFrame);
        getCurFrame(uCurFrame);
        uCurFrame++;
        animationClock = setTimeout("animRun()", uSleepTime);
    } else {
        animationClock = null;
        isLockCavans = false;
    }
}
// 暂停
function animPause() {
    if (animationClock != null) {
        clearTimeout(animationClock);
    }
    animationClock = null;
    isLockCavans = false;
    animationStatus = ANIMPAUSE;
}
// 终止
function animTerminal() {
    uCurFrame = 0;
    getCurFrame(uCurFrame);
    if (glRunTime.setCameraAnim(uCurFrame)) {
        glRunTime.setObjectAnim(uCurFrame);
    }
    animPause();
    animationStatus = ANIMTERMINAL;
}
// 设置当前帧
function setCurFrame(frame) {
    if (frame >= 0) {
        uCurFrame = frame;
        if (animationStatus == ANIMPAUSE) {
            if (glRunTime.setCameraAnim(uCurFrame)) {
                glRunTime.setObjectAnim(uCurFrame);
            }
        }
    }
}
// 获取动画总帧数
function getTotalFrames() {
    return glRunTime.getTotalFrame();
}
// 获取当前帧数
function getCurFrame(frame) {

}

// 设置背景图片
function setBackground(selectIndex) {
    glRunTime.setBackground(selectIndex);
}

// 空格：视角聚焦到选中零件，模型整体围绕所选零件旋转
function setFocusOnModel() {
        // 只有在单选的状态下才执行聚焦功能
        glRunTime.setFocusOnObject();
}

// 模型树节点选择
// 如果indexs == null或者indexs.length==0，清空当前选择
function pickModelByIndex(indexs) {
    objectIndex = glRunTime.pickModelByIndexs(indexs);
    pickObjectIndexs = glRunTime.getPickObjectIndexs();
    if (indexs.length == 1) {
        pickObjectVisible = glRunTime.getObjectVisible(indexs[0]);
        pickObjectTransparent = glRunTime.getObjectTransparent(indexs[0]);
    }
    setPickObjectParameters();
}

// 模型树节点隐藏
function setModelVisible(indexs, isVisible) {
    glRunTime.setMultObjectVisible(indexs, isVisible);
}

// 窗口大小改变
function canvasOnResize() {
    gl.canvas.width = gl.canvas.clientWidth;
    gl.canvas.height = gl.canvas.clientHeight;
    glRunTime.resetWindow(gl.canvas.clientWidth, gl.canvas.clientHeight);
}

// 获取拾取状态
// 返回值：0 表示没选中， 1 表示单选中， 2 表示多选中
function getPickStatus() {
    return glRunTime.getPickStatus();
}

// 获取选中的零件的数据，包括：所选零件索引、显隐性、透明度等
// 更新界面
function setPickObjectParameters() {
    // console.log(pickObjectIndexs.length + ", " + pickObjectVisible + ", " + pickObjectTransparent);
}