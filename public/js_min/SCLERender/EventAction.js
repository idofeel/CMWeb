var g_nEventVersion=2;const canvas=document.querySelector('#glcanvas');var gl=canvas.getContext('webgl2');var isWebgl2=true;if(!gl){gl=canvas.getContext('webgl')
if(!gl){gl=canvas.getContext('experimental-webgl');}
isWebgl2=false;}
var textCanvas=document.querySelector("#text");var gl2d=textCanvas.getContext("2d");var container=document.getElementsByClassName("container");var offsetLeft=container[0].offsetLeft;var offsetTop=container[0].offsetTop;var isPhone=false;var glRunTime=new GLRunTime();var bgImage=["./Resource/Background/blue.jpg","./Resource/Background/white.jpg","./Resource/Background/grey.jpg",];var isLockCavans=false;var isShiftDown=false;var lastObjectIndex=-1;var objectIndex=-1;var pickObjectIndexs=null;var pickObjectVisible=false;var pickObjectTransparent=0.0;var pickObjectMaterial=null;var isMove=false;var curDate=null;var lastTime=0;var curTime=0;var isDigitalTwinMode=false;var initRenderFlag=false;function startRender(){if(!gl){return;}
glRunTime.initRender();initRenderFlag=true;function render(){glRunTime.draw();if(g_nEventVersion>=2){Scle.refreshNotation();}
requestAnimationFrame(render);}
requestAnimationFrame(render);addKeyboardListener();addMouseListener(textCanvas);document.addEventListener('DOMMouseScroll',fireFoxScollFun,false);window.onunload=addCloseListenser;}
function stopDefault(event){if(event.preventDefault){event.preventDefault();event.stopPropagation();}else{event.cancelBubble=true;event.returnValue=false;}}
function fireFoxScollFun(event){if(isLockCavans){return;}
if(isPhone){return;}
isKeyTap=false;let fScale=1.0-event.detail/25;glRunTime.scale(fScale);return false;}
function addKeyboardListener(){document.addEventListener('keydown',onDocumentKeyDown,false);document.addEventListener('keyup',onDocumentKeyUp,false);}
function onDocumentKeyDown(event){if(isLockCavans){return;}
if(event.ctrlKey){isShiftDown=true;}else{isShiftDown=false;if(event.keyCode==32){setFocusOnModel();}}}
function onDocumentKeyUp(event){if(isLockCavans){return;}
isShiftDown=false;}
var lastX1=-1,lastY1=-1,lastX2=-1,lastY2=-1;var x1=-1,y1=-1,x2=-1,y2=-1;var touch1=null,touch2=null;var phoneFactor=400.0/textCanvas.height;var scaleFactor=1.2;var moveSensitivity=1;var rotateSensitivity=1;var zRotateSensitive=0.03;var cameraMoveSensitivity=3;var scaleSensitivity=0.1;var doubleClickTimeMS=300;var isKeyDown=false;var isKeyMove=false;var isKeyRotate=false;var isKeyScale=false;var nullPickIndexs=[-1];function phoneKeyDown(event){if(isLockCavans){return;}
isKeyDown=true;if(event.targetTouches.length==1){touch1=event.targetTouches[0];x1=touch1.clientX-offsetLeft,y1=touch1.clientY-offsetTop;lastX1=x1,lastY1=y1;}
else if(event.targetTouches.length==2){touch1=event.targetTouches[0],touch2=event.targetTouches[1];lastX1=touch1.clientX-offsetLeft,lastY1=touch1.clientY-offsetTop;lastX2=touch2.clientX-offsetLeft,lastY2=touch2.clientY-offsetTop;}}
function phoneKeyMove(event){if(isLockCavans){return;}
if(!isKeyDown){return;}
if(event.targetTouches.length==1){touch1=event.targetTouches[0];x1=touch1.clientX-offsetLeft,y1=touch1.clientY-offsetTop;if(isMove){if(objectIndex!=-1){if(Math.abs(x1-lastX1)>moveSensitivity||Math.abs(y1-lastY1)>moveSensitivity){glRunTime.objectMove(objectIndex,2*(x1-lastX1),-2*(y1-lastY1));lastX1=x1,lastY1=y1;isKeyMove=true;}}}else{if(Math.abs(x1-lastX1)>rotateSensitivity||Math.abs(y1-lastY1)>rotateSensitivity){let degreeX=phoneFactor*(x1-lastX1);let degreeY=phoneFactor*(y1-lastY1);glRunTime.rotate(degreeX,degreeY,0);isKeyRotate=true;}}
lastX1=x1,lastY1=y1;}else if(event.targetTouches.length==2){touch1=event.targetTouches[0],touch2=event.targetTouches[1];x1=touch1.clientX-offsetLeft,y1=touch1.clientY-offsetTop;x2=touch2.clientX-offsetLeft,y2=touch2.clientY-offsetTop;let vecX1=lastX1-lastX2,vecY1=lastY1-lastY2;let vecX2=x1-x2,vecY2=y1-y2;let mVec1=Math.sqrt(vecX1*vecX1+vecY1*vecY1);let mVec2=Math.sqrt(vecX2*vecX2+vecY2*vecY2);let seta1=Math.atan2(lastY2-lastY1,lastX2-lastX1);let seta2=Math.atan2(y2-y1,x2-x1);if(Math.abs(seta1-seta2)<=zRotateSensitive&&Math.abs(mVec2-mVec1)<=cameraMoveSensitivity){if((Math.abs(x1-lastX1)>moveSensitivity||Math.abs(y1-lastY1)>moveSensitivity)&&((x1-lastX1)*(x2-lastX2)>0)){glRunTime.move(2*(x1-lastX1),-2*(y1-lastY1));isKeyMove=true;}}
else{let dist1=Math.pow(Math.pow(lastX1-lastX2,2)+Math.pow(lastY1-lastY2,2),0.5);let dist2=Math.pow(Math.pow(x1-x2,2)+Math.pow(y1-y2,2),0.5);let scale=0;if(dist2/dist1>1.0){scale=dist2/dist1*scaleFactor;}else{scale=dist2/dist1/scaleFactor;}
if(Math.abs(scale-1.0)>=scaleSensitivity){glRunTime.scale(scale);isKeyScale=true;}}
lastX1=x1,lastY1=y1;lastX2=x2,lastY2=y2;}}
function phoneKeyUp(event){if(isLockCavans){return;}
if(isKeyDown&&!isKeyMove&&!isKeyRotate&&!isKeyScale){touch1=event.changedTouches[0];x1=touch1.clientX-offsetLeft,y1=touch1.clientY-offsetTop;objectIndex=glRunTime.pick(x1,y1,true,false);pickObjectVisible=glRunTime.getObjectVisible(objectIndex);pickObjectTransparent=glRunTime.getObjectTransparent(objectIndex);curDate=new Date();curTime=curDate.getTime();if(curTime-lastTime<doubleClickTimeMS&&lastObjectIndex==objectIndex){setFocusOnModel();}
lastTime=curTime;lastObjectIndex=objectIndex;lastX1=x1,lastY1=y1;}
isKeyDown=false;isKeyMove=false;isKeyRotate=false;isKeyScale=false;}
var isKeyTap=false;var webFactor=200.0/textCanvas.height;var dragLeft=false,dragMid=false,dragRight=false;var lastX=-1,lastY=-1;function webKeyDown(event,textCanvas){if(isLockCavans){return;}
isKeyTap=true;let rect=event.target.getBoundingClientRect();let x=event.clientX-offsetLeft,y=event.clientY-offsetTop;if(rect.left<=x&&x<rect.right&&rect.top<=y&&y<rect.bottom){lastX=x,lastY=y;switch(event.button){case 0:dragLeft=true;textCanvas.oncontextmenu=function(){return false;}
if(isShiftDown){objectIndex=glRunTime.pick(x,y,false,false);}
break;case 1:dragMid=true;break;case 2:dragRight=true;textCanvas.oncontextmenu=function(){return false;}
break;}}}
function webKeyUp(event,textCanvas){if(isLockCavans){return;}
if(isDigitalTwinMode){return;}
switch(event.button){case 0:dragLeft=false;if(isKeyTap){if(!isShiftDown){objectIndex=glRunTime.pick(lastX,lastY,true,false);pickObjectVisible=glRunTime.getObjectVisible(objectIndex);pickObjectTransparent=glRunTime.getObjectTransparent(objectIndex);curDate=new Date();curTime=curDate.getTime();if(curTime-lastTime<doubleClickTimeMS&&lastObjectIndex==objectIndex){setFocusOnModel();}
lastTime=curTime;lastObjectIndex=objectIndex;}else if(!isMove){objectIndex=glRunTime.pick(lastX,lastY,true,true);}
pickObjectIndexs=glRunTime.getPickObjectIndexs();setPickObjectParameters();}
break;case 1:dragMid=false;break;case 2:dragRight=false;break;}
isKeyTap=false;}
function webWheel(event,textCanvas){if(isLockCavans){return;}
isKeyTap=false;let fScale=1.0+event.wheelDelta/1000;glRunTime.scale(fScale);stopDefault(event);}
function webKeyMove(event,textCanvas){if(isLockCavans){return;}
let x=event.clientX-offsetLeft,y=event.clientY-offsetTop;if(isKeyTap){if((!isShiftDown)&&dragMid){let degreeX=webFactor*(x-lastX);let degreeY=webFactor*(y-lastY);glRunTime.rotate(degreeX,degreeY,0);}
if(isShiftDown&&dragMid){glRunTime.move(2*(x-lastX),-2*(y-lastY));}
if(isShiftDown&&dragLeft){if(isMove){if(isDigitalTwinMode){return;}
if(objectIndex>-1){if(Math.abs(x-lastX)>moveSensitivity||Math.abs(y-lastY)>moveSensitivity){glRunTime.objectMove(objectIndex,2*(x-lastX),-2*(y-lastY));}}}}}else{glRunTime.pickAnnotation(x,y,false);}
lastX=x,lastY=y;}
function addMouseListener(textCanvas){if(isPhone){textCanvas.ontouchstart=function(event){phoneKeyDown(event);stopDefault(event);}
textCanvas.ontouchmove=function(event){phoneKeyMove(event);}
textCanvas.ontouchend=function(event){phoneKeyUp(event);}}else{textCanvas.onmousedown=function(event){webKeyDown(event,textCanvas);}
textCanvas.onmouseup=function(event){webKeyUp(event,textCanvas);}
textCanvas.onmousewheel=function(event){webWheel(event,textCanvas);}
textCanvas.onmousemove=function(event){webKeyMove(event,textCanvas);}}}
function addCloseListenser(){glRunTime.clear();}
window.onresize=canvasOnResize;document.onmousewheel=function(event){stopDefault(event);return false;}
function moveModel(){if(isMove){isMove=false;}else{isMove=true;}}
function setMaterialRGBA(r,g,b,a){if(r<0.0||r>1.0||g<0.0||g>1.0||b<0.0||b>1.0||a<0.0||a>1.0){return;}
glRunTime.setObjectMaterial(r,g,b,a);}
function setTransparent(alpha){if(alpha<0.0||alpha>1.0){return;}
glRunTime.setObjectTransparent(alpha);}
function setVisible(isVisible){glRunTime.setObjectVisible(isVisible);}
function setView(selectIndex){glRunTime.shiftView(selectIndex);}
function setHome(){glRunTime.home();}
const ANIMRUN=0;const ANIMPAUSE=1;const ANIMEND=2;const ANIMTERMINAL=3;var animationClock=null;var animationStatus=ANIMTERMINAL;var uTotalFrame=0;var uCurFrame=0;var uSleepTime=30;function setAnimationStart(){uTotalFrame=glRunTime.getTotalFrame();isLockCavans=true;if(animationStatus==ANIMTERMINAL){setHome();}
if(uCurFrame>=uTotalFrame){uCurFrame=0;}
animationStatus=ANIMRUN;animRun();}
function animRun(){if(glRunTime.setCameraAnim(uCurFrame)){glRunTime.setObjectAnim(uCurFrame);glRunTime.setAnnotationAnim(uCurFrame);getCurFrame(uCurFrame);uCurFrame++;animationClock=setTimeout("animRun()",uSleepTime);}else{animPause();animationStatus=ANIMEND;setAnmiIcon(true);}}
function animPause(){if(animationClock!=null){clearTimeout(animationClock);}
animationClock=null;isLockCavans=false;animationStatus=ANIMPAUSE;}
function animTerminal(){uCurFrame=0;getCurFrame(uCurFrame);if(glRunTime.setCameraAnim(uCurFrame)){glRunTime.setObjectAnim(uCurFrame);glRunTime.setAnnotationAnim(uCurFrame);}
animPause();animationStatus=ANIMTERMINAL;}
var g_nAnimationStart=0;var g_nAnimationEnd=0;function PlaySceneAnimation(){animTerminal();isLockCavans=true;uCurFrame=g_nAnimationStart;if(uCurFrame>=g_nAnimationEnd){uCurFrame=g_nAnimationStart;}
animationStatus=ANIMRUN;animSceneRun();}
function animSceneRun(){if(glRunTime.setCameraAnim(uCurFrame)&&uCurFrame<=g_nAnimationEnd){glRunTime.setObjectAnim(uCurFrame);glRunTime.setAnnotationAnim(uCurFrame);getCurFrame(uCurFrame);uCurFrame++;animationClock=setTimeout("animSceneRun()",uSleepTime);}else{animPause();animationStatus=ANIMEND;setAnmiIcon(true);}}
function setCurFrame(frame){if(frame>=0){uCurFrame=frame;if(glRunTime.setCameraAnim(uCurFrame)){glRunTime.setObjectAnim(uCurFrame);glRunTime.setAnnotationAnim(uCurFrame);}
animPause();setAnmiIcon(true);}}
function getTotalFrames(){return glRunTime.getTotalFrame();}
function getCurFrame(frame){}
function setAnmiIcon(isPause){}
function setBackground(selectIndex){glRunTime.setBackground(selectIndex);}
function setFocusOnModel(){glRunTime.setFocusOnObject();}
function pickModelByIndex(indexs){objectIndex=glRunTime.pickModelByIndexs(indexs);pickObjectIndexs=glRunTime.getPickObjectIndexs();if(indexs.length==1){pickObjectVisible=glRunTime.getObjectVisible(indexs[0]);pickObjectTransparent=glRunTime.getObjectTransparent(indexs[0]);}
if(isPhone){setFocusOnModel();}}
function setModelVisible(indexs,isVisible){glRunTime.setMultObjectVisible(indexs,isVisible);}
function canvasOnResize(){gl.canvas.width=gl.canvas.clientWidth;gl.canvas.height=gl.canvas.clientHeight;if(initRenderFlag){glRunTime.resetWindow(gl.canvas.clientWidth,gl.canvas.clientHeight);}
gl2d.canvas.width=gl2d.canvas.clientWidth;gl2d.canvas.height=gl2d.canvas.clientHeight;}
function getPickStatus(){return glRunTime.getPickStatus();}
function setPickObjectParameters(){}
function digitalTwinStart(){isDigitalTwinMode=true;glRunTime.initDigitalTwinData();}
function digitalTwinTerminal(){isDigitalTwinMode=false;}
function setObjectOriWorldMatrix(uObjectID,strMatrix){if(!isDigitalTwinMode){return;}
glRunTime.setObjectOriWorldMatrix(uObjectID,strMatrix);}
function addComment(objectID,annoText){glRunTime.addCommentOnObjectById(objectID,annoText);}
function setObjectsHighlight(objectIDs){glRunTime.setObjectsPickedByIds(objectIDs);}
function getObjectsCenter(objectIDs){let arrCenters=new Array();for(let i=0;i<objectIDs.length;++i){arrCenters.push(glRunTime.getObjectCenterById(objectIDs[i]));}
return arrCenters;}