const canvas=document.querySelector('#glcanvas');var gl=canvas.getContext('webgl2');var isWebgl2=true;if(!gl){gl=canvas.getContext('webgl');isWebgl2=false;}
var glRunTime=new GLRunTime();var bgImage=["./Resource/Background/blue.jpg","./Resource/Background/white.jpg","./Resource/Background/grey.jpg",];var isLockCavans=false;var isShiftDown=false;var isKeyTap=false;var objectIndex=-1;var pickObjectIndexs=null;var pickObjectVisible=false;var pickObjectTransparent=0.0;var pickObjectMaterial=null;var isMove=false;const ANIMRUN=0;const ANIMPAUSE=1;const ANIMTERMINAL=2;var animationClock=null;var animationStatus=ANIMTERMINAL;var uCurFrame=0;var uSleepTime=30;function startRender(){if(!gl){alert('Unable to initialize WebGL. Your browser or machine may not support it.');return;}
glRunTime.initRender();function render(){glRunTime.draw();requestAnimationFrame(render);}
requestAnimationFrame(render);addKeyboardListener();addMouseListener(canvas);window.onunload=addCloseListenser;}
function addKeyboardListener(){document.addEventListener('keydown',onDocumentKeyDown,false);document.addEventListener('keyup',onDocumentKeyUp,false);}
function onDocumentKeyDown(event){if(isLockCavans){return;}
if(event.ctrlKey){isShiftDown=true;}else{isShiftDown=false;if(event.keyCode==32){setFocusOnModel();}}}
function onDocumentKeyUp(event){if(isLockCavans){return;}
isShiftDown=false;}
function addMouseListener(canvas){let dragLeft=false,dragMid=false,dragRight=false;let lastX=-1,lastY=-1;let lastX1=-1,lastY1=-1,lastX2=-1,lastY2=-1;canvas.ontouchstart=function(event){isKeyTap=true;if(event.targetTouches.length==2){let touch1=event.targetTouches[0],touch2=event.targetTouches[1];lastX1=touch1.clientX-canvas.offsetLeft,lastY1=touch1.clientY-canvas.offsetTop;lastX2=touch2.clientX-canvas.offsetLeft,lastY2=touch2.clientY-canvas.offsetTop;}}
canvas.ontouchmove=function(event){isKeyTap=false;if(event.targetTouches.length==1){let touch=event.targetTouches[0];let x=touch.clientX-canvas.offsetLeft,y=touch.clientY-canvas.offsetTop;if(Math.abs(x-lastX1)<5&&Math.abs(y-lastY1)<5){isKeyTap=true;return;}else{let factor=200.0/canvas.height;let degreeX=factor*(x-lastX1);let degreeY=factor*(y-lastY1);glRunTime.rotate(degreeX,degreeY,0);}
lastX1=x,lastY1=y;}else if(event.targetTouches.length==2){let touch1=event.targetTouches[0],touch2=event.targetTouches[1];let x1=touch1.clientX-canvas.offsetLeft,y1=touch1.clientY-canvas.offsetTop;let x2=touch2.clientX-canvas.offsetLeft,y2=touch2.clientY-canvas.offsetTop;let dist1=Math.pow(Math.pow(lastX1-lastX2,2)+Math.pow(lastY1-lastY2,2),0.5);let dist2=Math.pow(Math.pow(x1-x2,2)+Math.pow(y1-y2,2),0.5);glRunTime.scale(dist2/dist1);lastX1=x1,lastY1=y1;lastX2=x2,lastY2=y2;}}
canvas.ontouchend=function(event){if(isKeyTap){let rect=event.target.getBoundingClientRect();if(event.targetTouches.length==1){let touch=event.targetTouches[0];let x=touch.clientX-canvas.offsetLeft,y=touch.clientY-canvas.offsetTop;if(rect.left<=x&&x<rect.right&&rect.top<=y&&y<rect.bottom){objectIndex=glRunTime.pick(x,y,true,false);lastX1=x,lastY1=y;}}}}
canvas.onmousedown=function(event){if(isLockCavans){return;}
isKeyTap=true;let rect=event.target.getBoundingClientRect();let x=event.clientX-canvas.offsetLeft,y=event.clientY-canvas.offsetTop;if(rect.left<=x&&x<rect.right&&rect.top<=y&&y<rect.bottom){lastX=x,lastY=y;switch(event.button){case 0:dragLeft=true;canvas.oncontextmenu=function(){return false;}
if(isShiftDown){objectIndex=glRunTime.pick(x,y,false,false);}
break;case 1:dragMid=true;break;case 2:dragRight=true;isMove=false;canvas.oncontextmenu=function(){return false;}
break;}}}
canvas.onmouseup=function(event){if(isLockCavans){return;}
switch(event.button){case 0:dragLeft=false;if(isKeyTap){if(!isShiftDown){objectIndex=glRunTime.pick(lastX,lastY,true,false);pickObjectVisible=glRunTime.getObjectVisible(objectIndex);pickObjectTransparent=glRunTime.getObjectTransparent(objectIndex);}else{objectIndex=glRunTime.pick(lastX,lastY,true,true);}
pickObjectIndexs=glRunTime.getPickObjectIndexs();setPickObjectParameters();}
break;case 1:dragMid=false;break;case 2:dragRight=false;break;}}
canvas.onmousewheel=function(event){if(isLockCavans){return;}
isKeyTap=false;let fScale=1.0+event.wheelDelta/1000;glRunTime.scale(fScale);if(event.preventDefault){event.preventDefault();event.stopPropagation();}else{event.cancelBubble=true;event.returnValue=false;}
return false;};canvas.onmousemove=function(event){if(isLockCavans){return;}
isKeyTap=false;let x=event.clientX-canvas.offsetLeft,y=event.clientY-canvas.offsetTop;if((!isShiftDown)&&dragMid){let factor=200.0/canvas.height;let degreeX=factor*(x-lastX);let degreeY=factor*(y-lastY);glRunTime.rotate(degreeX,degreeY,0);}
if(isShiftDown&&dragMid){glRunTime.move(2*(x-lastX),-2*(y-lastY));}
if(isMove){if(isShiftDown&&dragLeft){if(objectIndex>-1){if(Math.abs(x-lastX)>2||Math.abs(y-lastY)>2){glRunTime.objectMove(objectIndex,2*(x-lastX),-2*(y-lastY));}}}}
lastX=x,lastY=y;}}
function addCloseListenser(){glRunTime.clear();}
window.onresize=canvasOnResize;document.onmousewheel=function(event){if(event.preventDefault){event.preventDefault();event.stopPropagation();}else{event.cancelBubble=true;event.returnValue=false;}
return false;}
function moveModel(){isMove=true;}
function setMaterial(selectIndex){switch(selectIndex){case 0:glRunTime.setObjectMaterial(0.5,1.0,0.0,0.5);break;case 1:glRunTime.setObjectMaterial(0.25,0.87,0.8,0.5);break;case 2:glRunTime.setObjectMaterial(1.0,1.0,0.0,0.5);break;case 3:glRunTime.setObjectMaterial(1.0,0.75,0.8,0.5);break;default:break;}}
function setMaterialRGBA(r,g,b,a){glRunTime.setObjectMaterial(r,g,b,a);}
function setTransparentIndex(selectIndex){switch(selectIndex){case 0:glRunTime.setObjectTransparent(0.0);break;case 1:glRunTime.setObjectTransparent(0.5);break;case 2:glRunTime.setObjectTransparent(1.0);break;default:break;}}
function setTransparent(alpha){glRunTime.setObjectTransparent(alpha);}
function setVisible(isVisible){glRunTime.setObjectVisible(isVisible);}
function setView(selectIndex){glRunTime.shiftView(selectIndex);}
function setHome(){glRunTime.home();}
function setAnimationStart(){isLockCavans=true;if(animationStatus==ANIMTERMINAL){setHome();}
animationStatus=ANIMRUN;animRun();}
function animRun(){if(glRunTime.setCameraAnim(uCurFrame)){glRunTime.setObjectAnim(uCurFrame);getCurFrame(uCurFrame);uCurFrame++;animationClock=setTimeout("animRun()",uSleepTime);}else{animationClock=null;isLockCavans=false;}}
function animPause(){if(animationClock!=null){clearTimeout(animationClock);}
animationClock=null;isLockCavans=false;animationStatus=ANIMPAUSE;}
function animTerminal(){uCurFrame=0;getCurFrame(uCurFrame);if(glRunTime.setCameraAnim(uCurFrame)){glRunTime.setObjectAnim(uCurFrame);}
animPause();animationStatus=ANIMTERMINAL;}
function setCurFrame(frame){if(frame>=0){uCurFrame=frame;if(animationStatus==ANIMPAUSE){if(glRunTime.setCameraAnim(uCurFrame)){glRunTime.setObjectAnim(uCurFrame);}}}}
function getTotalFrames(){return glRunTime.getTotalFrame();}
function getCurFrame(frame){}
function setBackground(selectIndex){glRunTime.setBackground(selectIndex);}
function setFocusOnModel(){glRunTime.setFocusOnObject();}
function pickModelByIndex(indexs){objectIndex=glRunTime.pickModelByIndexs(indexs);pickObjectIndexs=glRunTime.getPickObjectIndexs();if(indexs.length==1){pickObjectVisible=glRunTime.getObjectVisible(indexs[0]);pickObjectTransparent=glRunTime.getObjectTransparent(indexs[0]);}
setPickObjectParameters();}
function setModelVisible(indexs,isVisible){glRunTime.setMultObjectVisible(indexs,isVisible);}
function canvasOnResize(){gl.canvas.width=gl.canvas.clientWidth;gl.canvas.height=gl.canvas.clientHeight;glRunTime.resetWindow(gl.canvas.clientWidth,gl.canvas.clientHeight);}
function getPickStatus(){return glRunTime.getPickStatus();}
function setPickObjectParameters(){}