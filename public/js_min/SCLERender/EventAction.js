const canvas=document.querySelector('#glcanvas');var gl=canvas.getContext('webgl2');var isWebgl2=true;if(!gl){gl=canvas.getContext('webgl')
if(!gl){gl=canvas.getContext('experimental-webgl');}
isWebgl2=false;}
var textCanvas=document.querySelector("#text");var gl2d=textCanvas.getContext("2d");var container=document.getElementsByClassName("container");var offsetLeft=container[0].offsetLeft;var offsetTop=container[0].offsetTop;var isPhone=false;var isPhoneMove=false;var glRunTime=new GLRunTime();var bgImage=["./Resource/Background/blue.jpg","./Resource/Background/white.jpg","./Resource/Background/grey.jpg",];var isLockCavans=false;var isShiftDown=false;var isKeyTap=false;var lastObjectIndex=-1;var objectIndex=-1;var dragLeft=false,dragMid=false,dragRight=false;var lastX=-1,lastY=-1;var lastX1=-1,lastY1=-1,lastX2=-1,lastY2=-1;var pickObjectIndexs=null;var pickObjectVisible=false;var pickObjectTransparent=0.0;var pickObjectMaterial=null;var isMove=false;const ANIMRUN=0;const ANIMPAUSE=1;const ANIMEND=2;const ANIMTERMINAL=3;var animationClock=null;var animationStatus=ANIMTERMINAL;var uTotalFrame=0;var uCurFrame=0;var uSleepTime=30;var curDate=null;var lastTime=0;var isDigitalTwinMode=false;function startRender(){if(!gl){alert('Unable to initialize WebGL. Your browser or machine may not support it.');return;}
glRunTime.initRender();function render(){glRunTime.draw();requestAnimationFrame(render);}
requestAnimationFrame(render);addKeyboardListener();addMouseListener(textCanvas);document.addEventListener('DOMMouseScroll',fireFoxScollFun,false);window.onunload=addCloseListenser;}
function addKeyboardListener(){document.addEventListener('keydown',onDocumentKeyDown,false);document.addEventListener('keyup',onDocumentKeyUp,false);}
function onDocumentKeyDown(event){if(isLockCavans){return;}
if(event.ctrlKey){isShiftDown=true;}else{isShiftDown=false;if(event.keyCode==32){setFocusOnModel();}}}
function onDocumentKeyUp(event){if(isLockCavans){return;}
isShiftDown=false;}
function fireFoxScollFun(event){if(isLockCavans){return;}
isKeyTap=false;let fScale=1.0-event.detail/25;glRunTime.scale(fScale);return false;}
function addMouseListener(textCanvas){textCanvas.ontouchstart=function(event){isKeyTap=true;if(event.targetTouches.length==1){let touch=event.targetTouches[0];let x=touch.clientX-offsetLeft,y=touch.clientY-offsetTop;if(rect.left<=x&&x<rect.right&&rect.top<=y&&y<rect.bottom){}
lastX=x,lastY=y;}else if(event.targetTouches.length==2){let touch1=event.targetTouches[0],touch2=event.targetTouches[1];lastX1=touch1.clientX-offsetLeft,lastY1=touch1.clientY-offsetTop;lastX2=touch2.clientX-offsetLeft,lastY2=touch2.clientY-offsetTop;}}
textCanvas.ontouchmove=function(event){if(event.targetTouches.length==1){let touch=event.targetTouches[0];let x=touch.clientX-offsetLeft,y=touch.clientY-offsetTop;if(isPhone){if(isMove){if(objectIndex!=-1){if(Math.abs(x-lastX)>2||Math.abs(y-lastY)>2){glRunTime.objectMove(objectIndex,2*(x-lastX),-2*(y-lastY));lastX=x,lastY=y;return;}}}}
if(isKeyTap){if((Math.abs(x-lastX)>5&&Math.abs(x-lastX)<50)||(Math.abs(y-lastY1)>5&&Math.abs(y-lastY1)<50)){let factor=200.0/textCanvas.height;let degreeX=factor*(x-lastX);let degreeY=factor*(y-lastY);glRunTime.rotate(degreeX,degreeY,0);}}
lastX=x,lastY=y;}else if(event.targetTouches.length==2){let touch1=event.targetTouches[0],touch2=event.targetTouches[1];let x1=touch1.clientX-offsetLeft,y1=touch1.clientY-offsetTop;let x2=touch2.clientX-offsetLeft,y2=touch2.clientY-offsetTop;let vecX1=lastX1-lastX2,vecY1=lastY1-lastY2;let vecX2=x1-x2,vecY2=y1-y2;let mVec1=Math.sqrt(vecX1*vecX1+vecY1*vecY1);let mVec2=Math.sqrt(vecX2*vecX2+vecY2*vecY2);let seta1=Math.atan2(lastY2-lastY1,lastX2-lastX1);let seta2=Math.atan2(y2-y1,x2-x1);if(Math.abs(seta1-seta2)<=0.01&&Math.abs(mVec2-mVec1)<=10.0){if(Math.abs(x1-lastX1)>5||Math.abs(y1-lastY1)>5)
{glRunTime.move(2*(x1-lastX1),-2*(y1-lastY1));}}else{let dist1=Math.pow(Math.pow(lastX1-lastX2,2)+Math.pow(lastY1-lastY2,2),0.5);let dist2=Math.pow(Math.pow(x1-x2,2)+Math.pow(y1-y2,2),0.5);glRunTime.scale(dist2/dist1);}
lastX1=x1,lastY1=y1;lastX2=x2,lastY2=y2;}}
textCanvas.ontouchend=function(event){if(isKeyTap){let rect=event.target.getBoundingClientRect();if(event.targetTouches.length==1){if(isDigitalTwinMode){return;}
let touch=event.targetTouches[0];let x=touch.clientX-offsetLeft,y=touch.clientY-offsetTop;if(rect.left<=x&&x<rect.right&&rect.top<=y&&y<rect.bottom){objectIndex=glRunTime.pick(x,y,true,false);}}}
isKeyTap=false;isPhoneMove=false;}
textCanvas.onmousedown=function(event){if(isLockCavans){return;}
isKeyTap=true;let rect=event.target.getBoundingClientRect();let x=event.clientX-offsetLeft,y=event.clientY-offsetTop;if(rect.left<=x&&x<rect.right&&rect.top<=y&&y<rect.bottom){lastX=x,lastY=y;switch(event.button){case 0:dragLeft=true;textCanvas.oncontextmenu=function(){return false;}
if(isShiftDown){objectIndex=glRunTime.pick(x,y,false,false);}
break;case 1:dragMid=true;break;case 2:dragRight=true;isMove=false;textCanvas.oncontextmenu=function(){return false;}
break;}}}
textCanvas.onmouseup=function(event){if(isLockCavans){return;}
switch(event.button){case 0:dragLeft=false;if(isDigitalTwinMode){return;}
if(isKeyTap){if(!isShiftDown){objectIndex=glRunTime.pick(lastX,lastY,true,false);pickObjectVisible=glRunTime.getObjectVisible(objectIndex);pickObjectTransparent=glRunTime.getObjectTransparent(objectIndex);curDate=new Date();let curTime=curDate.getTime();if(curTime-lastTime<500&&lastObjectIndex==objectIndex){setFocusOnModel();}
lastTime=curTime;lastObjectIndex=objectIndex;}else{objectIndex=glRunTime.pick(lastX,lastY,true,true);}
pickObjectIndexs=glRunTime.getPickObjectIndexs();setPickObjectParameters();}
break;case 1:dragMid=false;break;case 2:dragRight=false;break;}
isKeyTap=false;}
textCanvas.onmousewheel=function(event){if(isLockCavans){return;}
isKeyTap=false;let fScale=1.0+event.wheelDelta/1000;glRunTime.scale(fScale);if(event.preventDefault){event.preventDefault();event.stopPropagation();}else{event.cancelBubble=true;event.returnValue=false;}
return false;};textCanvas.onmousemove=function(event){if(isLockCavans){return;}
let x=event.clientX-offsetLeft,y=event.clientY-offsetTop;if(isKeyTap){if((!isShiftDown)&&dragMid){let factor=200.0/textCanvas.height;let degreeX=factor*(x-lastX);let degreeY=factor*(y-lastY);glRunTime.rotate(degreeX,degreeY,0);}
if(isShiftDown&&dragMid){if(!isDigitalTwinMode){glRunTime.move(2*(x-lastX),-2*(y-lastY));}}
if(isMove){if(isShiftDown&&dragLeft){if(objectIndex>-1){if(Math.abs(x-lastX)>2||Math.abs(y-lastY)>2){glRunTime.objectMove(objectIndex,2*(x-lastX),-2*(y-lastY));}}}}}else{glRunTime.pickAnnotation(x,y,false);}
lastX=x,lastY=y;}}
function addCloseListenser(){glRunTime.clear();}
window.onresize=canvasOnResize;document.onmousewheel=function(event){if(event.preventDefault){event.preventDefault();event.stopPropagation();}else{event.cancelBubble=true;event.returnValue=false;}
return false;}
function moveModel(){if(isPhone){if(isMove){isMove=false;}else{isMove=true;}}
isMove=true;}
function setMaterial(selectIndex){switch(selectIndex){case 0:glRunTime.setObjectMaterial(0.5,1.0,0.0,0.5);break;case 1:glRunTime.setObjectMaterial(0.25,0.87,0.8,0.5);break;case 2:glRunTime.setObjectMaterial(1.0,1.0,0.0,0.5);break;case 3:glRunTime.setObjectMaterial(1.0,0.75,0.8,0.5);break;default:break;}}
function setMaterialRGBA(r,g,b,a){glRunTime.setObjectMaterial(r,g,b,a);}
function setTransparentIndex(selectIndex){switch(selectIndex){case 0:glRunTime.setObjectTransparent(0.0);break;case 1:glRunTime.setObjectTransparent(0.5);break;case 2:glRunTime.setObjectTransparent(1.0);break;default:break;}}
function setTransparent(alpha){glRunTime.setObjectTransparent(alpha);}
function setVisible(isVisible){glRunTime.setObjectVisible(isVisible);}
function setView(selectIndex){glRunTime.shiftView(selectIndex);}
function setHome(){glRunTime.home();}
function setAnimationStart(){uTotalFrame=glRunTime.getTotalFrame();isLockCavans=true;if(animationStatus==ANIMTERMINAL){setHome();}
if(uCurFrame>=uTotalFrame){uCurFrame=0;}
animationStatus=ANIMRUN;animRun();}
function animRun(){if(glRunTime.setCameraAnim(uCurFrame)){glRunTime.setObjectAnim(uCurFrame);glRunTime.setAnnotationAnim(uCurFrame);getCurFrame(uCurFrame);uCurFrame++;animationClock=setTimeout("animRun()",uSleepTime);}else{animPause();animationStatus=ANIMEND;setAnmiIcon(true);}}
function animPause(){if(animationClock!=null){clearTimeout(animationClock);}
animationClock=null;isLockCavans=false;animationStatus=ANIMPAUSE;}
function animTerminal(){uCurFrame=0;getCurFrame(uCurFrame);if(glRunTime.setCameraAnim(uCurFrame)){glRunTime.setObjectAnim(uCurFrame);glRunTime.setAnnotationAnim(uCurFrame);}
animPause();animationStatus=ANIMTERMINAL;}
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
function canvasOnResize(){gl.canvas.width=gl.canvas.clientWidth;gl.canvas.height=gl.canvas.clientHeight;glRunTime.resetWindow(gl.canvas.clientWidth,gl.canvas.clientHeight);gl2d.canvas.width=gl2d.canvas.clientWidth;gl2d.canvas.height=gl2d.canvas.clientHeight;}
function getPickStatus(){return glRunTime.getPickStatus();}
function setPickObjectParameters(){}
function digitalTwinStart(){isDigitalTwinMode=true;glRunTime.initDigitalTwinData();}
function digitalTwinTerminal(){isDigitalTwinMode=false;}
function setObjectOriWorldMatrix(uObjectID,strMatrix){if(!isDigitalTwinMode){return;}
glRunTime.setObjectOriWorldMatrix(uObjectID,strMatrix);}