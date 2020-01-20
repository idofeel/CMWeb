//===================================================================================================
// 三维模型数据
var g_GLData = null;

function GLRunTime() {
    // 渲染引擎实例
    this.glprogram = new GLProgram();
    // 摄像机实例
    this.camera = new Camera();
    // 参数
    this.WIDTH = gl.canvas.clientWidth;
    this.HEIGHT = gl.canvas.clientHeight;
    this.SCALE_STEP = 10.0;
    this.SCALE_MIN = 10.0;
    this.SCALE_MAX = 2000.0;
    this.m_fModelLength = 1.0;          // 如果相机距离模型比较近，则交互时灵敏度系数应该减小
    this.m_fOperateSensitivity = 1.0;   // 操作灵敏度系数
    this.rotateSensitivity = 1.0;
    // 计算所需数据，置为全局变量，可以减小内存
    this.ray_nds_near = vec3.create();
    this.ray_nds_far = vec3.create();
    this.ray_clip_near = vec4.create();
    this.ray_clip_far = vec4.create();
    this.viewMatInverse = mat4.create();
    this.projectionMatInverse = mat4.create();
    this.MVMatrix = mat4.create();
    this.MVPMatrix = mat4.create();
    this.inverseMVPMatrix = mat4.create();
    this.ray_world_near = vec4.create();
    this.ray_world_far = vec4.create();
    this.RayPoint1 = new Point3(0, 0, 0);
    this.RayPoint2 = new Point3(0, 0, 0);
    this.ObjectOriginalCenter = new Point3(0, 0, 0);
    this.PointNDCCenter = new Point3(0, 0, 0);
    this.ObjectMoveCenterStart = new Point3(0, 0, 0);
    this.ObjectMoveCenterEnd = new Point3(0, 0, 0);
    this.ObjectMovematrix = mat4.create();
    this.cameraAnmi = null;
    this.adfCamera = new ADF_CAMERA();
    this.adfCameraFocus = new Point3(0, 0, 0);
    this.curModelCenter = new Point3(0, 0, 0);
    // this.cameraMoveX = 0;
    // this.cameraMoveY = 0;

    /**
     * 渲染引擎数据初始化
     */
    this.initRender = function() {
        g_GLData = Scene2GLData();
        this.glprogram.m_GLObjectSet = g_GLData.GLObjectSet;
        this.glprogram.m_GLPartSet = g_GLData.GLPartSet;
        this.glprogram.m_GLMaterialSet = g_GLData.GLMatertalSet;
        this.glprogram.m_arrBgTexId = g_GLData.GLBgTexture;
        this.m_fModelLength = g_GLData.GLModelLength;
        this.SCALE_MIN = this.m_fModelLength / 20;
        this.SCALE_MAX = this.m_fModelLength * 2;
        this.SCALE_STEP = this.SCALE_MIN;

        this.cameraAnmi = g_GLData.GLCamera;
        this.cameraAnmi.GetAnimCamera(0, this.adfCamera);
        if (this.adfCamera._fFOVY > 0.0001) {
            this.camera.setCamera(this.adfCamera._vEyePos.x - this.adfCamera._vFocus.x,
                                  this.adfCamera._vEyePos.y - this.adfCamera._vFocus.y,
                                  this.adfCamera._vEyePos.z - this.adfCamera._vFocus.z,
                                  0.0, 0.0, 0.0,
                                  this.adfCamera._vUp.x, this.adfCamera._vUp.y, this.adfCamera._vUp.z);
            this.camera.setNearFar(this.adfCamera._fZNear, this.adfCamera._fZFar);
            this.adfCameraFocus.x = this.adfCamera._vFocus.x;
            this.adfCameraFocus.y = this.adfCamera._vFocus.y;
            this.adfCameraFocus.z = this.adfCamera._vFocus.z;
            this.glprogram.setModelCenter(this.adfCameraFocus);
        } else {
            this.camera.setCamera(g_GLData.GLDefEyePos.x, g_GLData.GLDefEyePos.y, g_GLData.GLDefEyePos.z, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
            this.glprogram.setModelCenter(g_GLData.GLModelCenter);
        }
        // 模型中心点归零
        g_GLData.GLModelCenter.x = 0;
        g_GLData.GLModelCenter.y = 0;
        g_GLData.GLModelCenter.z = 0;
        this.camera.setPerspectiveMatrix(45 * Math.PI / 180, this.WIDTH / this.HEIGHT);

        // 开始初始化渲染数据
        this.glprogram.initViewPort(this.WIDTH, this.HEIGHT);
        this.glprogram.initGLData();
    }

    /**
     * 绘制
     */
    this.draw = function() {
        this.glprogram.draw(this.camera);
    }

    /**
     * 清除GPU缓存
     */
    this.clear = function() {
        this.glprogram.clear();
    }

    /**
     * 窗口变化
     */
    this.resetWindow = function(width, height) {
        this.WIDTH = width, this.HEIGHT = height;
        this.glprogram.initViewPort(this.WIDTH, this.HEIGHT);
        this.camera.setPerspectiveMatrix(45 * Math.PI / 180, this.WIDTH / this.HEIGHT);
        console.log("aspect:" + this.WIDTH / this.HEIGHT);
    }

    /**
     * 模型旋转
     */
    this.rotate = function(degreeX, degreeY, degreeZ) {
        this.rotateX(degreeX * this.rotateSensitivity);
        this.rotateY(degreeY * this.rotateSensitivity);
        this.rotateZ(degreeZ * this.rotateSensitivity);
    }

    /**
     * 视角平移
     */
    this.move = function(deltaX, deltaY) {
        // let moveX = deltaX / this.WIDTH * this.m_fModelLength * this.m_fOperateSensitivity;
        // let moveY = deltaY / this.HEIGHT * this.m_fModelLength * this.m_fOperateSensitivity;
        // this.camera.slide(moveX, moveY, 0.0);
        // this.cameraMoveX += moveX;
        // this.cameraMoveY += moveY;

        // 获得整个模型中心
        this.ObjectOriginalCenter.x = g_GLData.GLModelCenter.x;
        this.ObjectOriginalCenter.y = g_GLData.GLModelCenter.y;
        this.ObjectOriginalCenter.z = g_GLData.GLModelCenter.z;
        // 获得中心坐标在设备坐标系下的Z分量
        mat4.multiply(this.MVMatrix, this.camera.projectionMatrix, this.camera.viewMatrix);
        CalTranslatePoint(this.ObjectOriginalCenter.x, this.ObjectOriginalCenter.y, this.ObjectOriginalCenter.z, this.MVMatrix, this.PointNDCCenter);
        // 获得位移终点的世界坐标
        let x = deltaX / this.WIDTH, y = deltaY / this.HEIGHT;
        mat4.invert(this.viewMatInverse, this.camera.viewMatrix);
        mat4.invert(this.projectionMatInverse, this.camera.projectionMatrix);
        mat4.multiply(this.inverseMVPMatrix, this.viewMatInverse, this.projectionMatInverse);
        CalTranslatePoint(0.0, 0.0, this.PointNDCCenter.z, this.inverseMVPMatrix, this.ObjectMoveCenterStart);
        CalTranslatePoint(x, y, this.PointNDCCenter.z, this.inverseMVPMatrix, this.ObjectMoveCenterEnd);
        // 获得真实中心
        this.ObjectOriginalCenter.x -= this.ObjectMoveCenterEnd.x-this.ObjectMoveCenterStart.x;
        this.ObjectOriginalCenter.y -= this.ObjectMoveCenterEnd.y-this.ObjectMoveCenterStart.y;
        this.ObjectOriginalCenter.z -= this.ObjectMoveCenterEnd.z-this.ObjectMoveCenterStart.z;
        this.glprogram.moveModelCenter(this.ObjectOriginalCenter);
    }

    /**
     * 模型平移
     */
    this.objectMove = function(nObjectIndex, screenX, screenY) {
        let ObjectMat = g_GLData.GLObjectSet._arrObjectSet[nObjectIndex]._matObject;
        let PartIndex = g_GLData.GLObjectSet._arrObjectSet[nObjectIndex]._uPartIndex;
        // 计算Object在世界坐标下的位移量
        getModelBoxCenter(g_GLData.GLPartSet._arrPartSet[PartIndex]._arrPartLODData[0]._boxset._ObjectBox, this.ObjectOriginalCenter);
        // 获得中心坐标在设备坐标系下的Z分量
        mat4.multiply(this.MVMatrix, this.camera.projectionMatrix, this.camera.viewMatrix);
        mat4.multiply(this.MVPMatrix, this.MVMatrix, ObjectMat);
        CalTranslatePoint(this.ObjectOriginalCenter.x, this.ObjectOriginalCenter.y, this.ObjectOriginalCenter.z, this.MVPMatrix, this.PointNDCCenter);
        // 获得位移终点的世界坐标
        let x = screenX / this.WIDTH, y = screenY / this.HEIGHT;
        mat4.invert(this.viewMatInverse, this.camera.viewMatrix);
        mat4.invert(this.projectionMatInverse, this.camera.projectionMatrix);
        mat4.multiply(this.inverseMVPMatrix, this.viewMatInverse, this.projectionMatInverse);
        CalTranslatePoint(0.0, 0.0, this.PointNDCCenter.z, this.inverseMVPMatrix, this.ObjectMoveCenterStart);
        CalTranslatePoint(x, y, this.PointNDCCenter.z, this.inverseMVPMatrix, this.ObjectMoveCenterEnd);
        // 获得真实位移量
        mat4.identity(this.ObjectMovematrix);
        mat4.translate(this.ObjectMovematrix, this.ObjectMovematrix,
                       vec3.fromValues(this.ObjectMoveCenterEnd.x-this.ObjectMoveCenterStart.x,
                                       this.ObjectMoveCenterEnd.y-this.ObjectMoveCenterStart.y,
                                       this.ObjectMoveCenterEnd.z-this.ObjectMoveCenterStart.z));
        this.glprogram.setObjectModelMatrixMult(this.ObjectMovematrix);
    }

    /**
     * 模型缩放
     */
    this.scale = function(fScale) {
        if (Math.abs(fScale - 1.0) < 0.0001) {
            return;
        }
        let tempScaleSensitivity = 1.0;
        if (this.camera.getDist() < this.m_fModelLength) {
            tempScaleSensitivity = this.m_fOperateSensitivity * 0.5;
        }
        else {
            tempScaleSensitivity = this.m_fOperateSensitivity * 1.0;
        }
        let fForward = 0.0;
        if (fScale > 1) {
            fForward -= this.SCALE_STEP * tempScaleSensitivity;
        }
        else {
            fForward += this.SCALE_STEP * tempScaleSensitivity;
        }
        this.camera.slide(0.0, 0.0, fForward);
    }

    /**
     * 模型拾取
     */
    this.pick = function(screenX, screenY, isShow, isMult) {
        // 完成视口坐标到3D世界坐标的转换
        let x = (2.0 * screenX) / this.WIDTH - 1.0;
        let y = 1.0 - (2.0 * screenY) / this.HEIGHT;
        this.ray_nds_near[0] = x, this.ray_nds_near[1] = y, this.ray_nds_near[2] = -1.0;
        this.ray_nds_far[0] = x, this.ray_nds_far[1] = y, this.ray_nds_far[2] = 1.0;
        this.ray_clip_near[0] = this.ray_nds_near[0], this.ray_clip_near[1] = this.ray_nds_near[1];
        this.ray_clip_near[2] = this.ray_nds_near[2], this.ray_clip_near[3] = 1.0;
        this.ray_clip_far[0] = this.ray_nds_far[0], this.ray_clip_far[1] = this.ray_nds_far[1];
        this.ray_clip_far[2] = this.ray_nds_far[2], this.ray_clip_far[3] = 1.0;
        mat4.invert(this.viewMatInverse, this.camera.viewMatrix);
        mat4.invert(this.projectionMatInverse, this.camera.projectionMatrix);
        mat4.multiply(this.inverseMVPMatrix, this.viewMatInverse, this.projectionMatInverse);
        vec4.transformMat4(this.ray_world_near, this.ray_clip_near, this.inverseMVPMatrix);
        vec4.transformMat4(this.ray_world_far, this.ray_clip_far, this.inverseMVPMatrix);
        if (this.ray_world_near[3] != 0.0) {
            this.ray_world_near[0] /= this.ray_world_near[3];
            this.ray_world_near[1] /= this.ray_world_near[3];
            this.ray_world_near[2] /= this.ray_world_near[3];
        }
        if (this.ray_world_far[3] != 0.0) {
            this.ray_world_far[0] /= this.ray_world_far[3];
            this.ray_world_far[1] /= this.ray_world_far[3];
            this.ray_world_far[2] /= this.ray_world_far[3];
        }
        // 根据单击点与摄像机坐标点构成拾取射线
        this.RayPoint1.x = this.ray_world_near[0], this.RayPoint1.y = this.ray_world_near[1], this.RayPoint1.z = this.ray_world_near[2];
        this.RayPoint2.x = this.ray_world_far[0], this.RayPoint2.y = this.ray_world_far[1], this.RayPoint2.z = this.ray_world_far[2];
        // 根据射线，计算与Object的相交
        return this.glprogram.pickByRay(this.RayPoint1, this.RayPoint2, isShow, isMult);
    }
    this.pickModelByIndexs = function(indexs) {
        if (indexs == null || indexs.length < 1) {
            return;
        }
        this.glprogram.pickMultByIndex(indexs);
    }

    /**
     * 判断当前选中状态：0无选中，1单选，2多选
     */
    this.getPickStatus = function() {
        return this.glprogram.getPickStatus();
    }

    /**
     * 将当前摄像机推进到当前单选中的零件上
     */
    this.setFocusOnObject = function(objectIndex) {
        if (objectIndex < 0 || objectIndex > g_GLData.GLObjectSet._arrObjectSet.length)
            return;
        // 获取当前零件的矩阵数据
        let curModelMatrix = this.glprogram.getObjectModelMatrix(objectIndex);
        // 获取当前零件的包围盒数据
        let curPartIndex = g_GLData.GLObjectSet._arrObjectSet[objectIndex]._uPartIndex;
        let curModelBox = g_GLData.GLPartSet._arrPartSet[curPartIndex]._arrPartLODData[0]._boxset._ObjectBox;
        // 计算当前零件的精确位置，并根据位置计算摄像机
        getModelBoxCenter(curModelBox, this.curModelCenter);
        CalTranslatePoint(this.curModelCenter.x, this.curModelCenter.y, this.curModelCenter.z,
                          curModelMatrix, this.curModelCenter);
        // 第一步：将模型整体中心移动到当前零件中心
        this.glprogram.moveModelCenter(this.curModelCenter);
        // 第二步：推进摄像机到一定位置
        let distance = 1.5 * getModelBoxLength(curModelBox);
        // if (this.cameraMoveX!=0 || this.cameraMoveY!=0) {
        //     this.camera.slide(-this.cameraMoveX, -this.cameraMoveY, 0);
        //     this.cameraMoveX = 0;
        //     this.cameraMoveY = 0;
        // }
        this.camera.slide(0.0, 0.0, distance - this.camera.getDist());
    }

    /**
     * 模型树节点拾取
     */
    this.pickModelTreeNode = function(indexs) {
        return this.glprogram.pickMultByIndex(indexs);
    }

    /**
     * 设置背景图片
     */
    this.setBackground = function(index) {
        this.glprogram.setBackground(index);
    }

    /**
     * 视角切换
     */
    this.shiftView = function(viewType) {
        switch (viewType) {
            case 0:
                // 主视图
                this.camera.setCamera(0.0, 0.0, this.m_fModelLength, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
                break;
            case 1:
                // 后视图
                this.camera.setCamera(0.0, 0.0, -this.m_fModelLength, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
                break;
            case 2:
                // 左视图
                this.camera.setCamera(-this.m_fModelLength, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
                break;
            case 3:
                // 右视图
                this.camera.setCamera(this.m_fModelLength, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
                break;
            case 4:
                // 俯视图
                this.camera.setCamera(0.0, this.m_fModelLength, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0);
                break;
            case 5:
                // 仰视图
                this.camera.setCamera(0.0, -this.m_fModelLength, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0);
                break;
            case 6:
                this.camera.setCamera(this.m_fModelLength / 2.0, this.m_fModelLength / Math.cos(45.0*Math.PI/180.0),
                               this.m_fModelLength / 2.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
                break;
            default:
                break;
        }
    }

    /**
     * 设置模型透明度
     */
    this.setObjectTransparent = function(transparent) {
        this.glprogram.setObjectTransparentMult(transparent);
    }
    this.getObjectTransparent = function(nObjectIndex) {
        return this.glprogram.getObjectTransparent(nObjectIndex);
    }

    /**
     * 设置模型消隐
     */
    this.setObjectVisible = function(visible) {
        this.glprogram.setObjectVisibleMult(visible);
    }
    this.getObjectVisible = function(nObjectIndex) {
        return this.glprogram.getObjectVisible(nObjectIndex);
    }
    this.setMultObjectVisible = function(indexs, visible) {
        if (indexs==null || indexs.length<1) {
            return;
        }
        this.glprogram.setObjectVisibleByIndexs(indexs, visible);
    }

    /**
     * 设置模型材质颜色
     */
    this.setObjectMaterial = function(red, green, blue, alpha) {
        this.glprogram.setObjectMaterialMult(red, green, blue, alpha);
    }

    /**
     * 清除所有临时数据
     */
    this.home = function() {
        this.glprogram.home();
    }

    /**
     * 摄像机动画数据
     */
    this.setCameraAnim = function(uStartFrame) {
        if (uStartFrame > g_GLData.GLObjectSet._uFrameSize || uStartFrame < 0) {
            return false;
        }
        this.cameraAnmi.GetAnimCamera(uStartFrame, this.adfCamera);
        if (this.adfCamera._fFOVY <= 0.0001) {
            return true;
        }
        this.camera.setCamera(this.adfCamera._vEyePos.x - this.adfCamera._vFocus.x,
                                this.adfCamera._vEyePos.y - this.adfCamera._vFocus.y,
                                this.adfCamera._vEyePos.z - this.adfCamera._vFocus.z,
                                0.0, 0.0, 0.0,
                                this.adfCamera._vUp.x, this.adfCamera._vUp.y, this.adfCamera._vUp.z);
        this.camera.setNearFar(this.adfCamera._fZNear, this.adfCamera._fZFar);
        this.camera.setPerspectiveMatrix(45 * Math.PI / 180, this.WIDTH / this.HEIGHT);
        this.adfCameraFocus.x = this.adfCamera._vFocus.x;
        this.adfCameraFocus.y = this.adfCamera._vFocus.y;
        this.adfCameraFocus.z = this.adfCamera._vFocus.z;
        this.glprogram.setModelCenter(this.adfCameraFocus);
        return true;
    }
    this.setObjectAnim = function(uStartFrame) {
        if (uStartFrame > g_GLData.GLObjectSet._uFrameSize || uStartFrame < 0) {
            return false;
        }
        this.glprogram.setObjectAnim(uStartFrame);
        return true;
    }
    this.getTotalFrame = function() {
        return g_GLData.GLObjectSet._uFrameSize;
    }

    //===================================================================================================
    // 辅助运算数据

    /**
     * 视角绕X轴旋转
     * @param {*} degreeX 
     */
    this.rotateX = function(degreeX) {
        let d = this.camera.getDist();
        let cnt = 1;
        let theta = degreeX / cnt;
        let slide_d = -2 * d * Math.sin(theta * Math.PI / 360);
        this.camera.yaw(theta / 2);
        for(; cnt!=0; --cnt) {
            this.camera.slide(slide_d, 0, 0);
            this.camera.yaw(theta);
        }
        this.camera.yaw(-theta / 2);
    }

    /**
     * 视角绕Y轴旋转
     * @param {*} degreeY
     */
    this.rotateY = function (degreeY) {
        let d = this.camera.getDist();
        let cnt = 1;
        let theta = degreeY / cnt;
        let slide_d = 2 * d * Math.sin(theta * Math.PI / 360);
        this.camera.pitch(theta / 2);
        for(; cnt!=0; --cnt) {
            this.camera.slide(0, slide_d, 0);
            this.camera.pitch(theta);
        }
        this.camera.pitch(-theta / 2);
    }

    /**
     * 视角绕Z轴旋转
     * @param {*} degreeZ
     */
    this.rotateZ = function (degreeZ) {
        this.camera.roll(degreeZ);
    }

}