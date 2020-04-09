// File: Camera.js

/**
 * @author wujiali
 */
 
//===================================================================================================

function Camera() {

    this.eye = new Point3(0, 0, 0);
    this.look = new Point3(0, 0, 0);
    this.up = new Point3(0, 0, 0);
    this.n = new Vector3(0, 0, 0);
    this.u = new Vector3(0, 0, 0);
    this.v = new Vector3(0, 0, 0);
    this.upVec = new Vector3(0, 0, 0);
    this.eVec = new Vector3(0, 0, 0);
    this.viewMatrix = mat4.create();
    this.projectionMatrix = mat4.create();
    this.zNear = -1.0;
    this.zFar = -1.0;

    // 辅助计算数据
    this.t = new Vector3(0, 0, 0);
    this.s = new Vector3(0, 0, 0);
    
    /**
     * 设置摄像机
     */
    this.setCamera = function(eyeX, eyeY, eyeZ, lookX, lookY, lookZ, upX, upY, upZ) {
        this.eye.x = eyeX, this.eye.y = eyeY, this.eye.z = eyeZ;
        this.look.x = lookX, this.look.y = lookY, this.look.z = lookZ;
        this.up.x = upX, this.up.y = upY, this.up.z = upZ; 

        this.upVec.x = upX, this.upVec.y = upY, this.upVec.z = upZ;
        this.n.x = eyeX-lookX, this.n.y = eyeY-lookY, this.n.z = eyeZ-lookZ;
        this.u.x = this.upVec.cross(this.n).x, this.u.y = this.upVec.cross(this.n).y, this.u.z = this.upVec.cross(this.n).z;
        this.v.x = this.n.cross(this.u).x, this.v.y = this.n.cross(this.u).y, this.v.z = this.n.cross(this.u).z;
        this.n.normalize();
        this.u.normalize();
        this.v.normalize();

        this.setViewMatrix();
    }

    /**
     * 计算变换后的视点矩阵
     */
    this.setViewMatrix = function() {
        this.eVec.x = this.eye.x, this.eVec.y = this.eye.y, this.eVec.z = this.eye.z; 
        this.viewMatrix[0] = this.u.x; this.viewMatrix[4] = this.u.y; this.viewMatrix[8] = this.u.z; this.viewMatrix[12] = -this.eVec.dot(this.u);
        this.viewMatrix[1] = this.v.x; this.viewMatrix[5] = this.v.y; this.viewMatrix[9] = this.v.z; this.viewMatrix[13] = -this.eVec.dot(this.v);
        this.viewMatrix[2] = this.n.x; this.viewMatrix[6] = this.n.y; this.viewMatrix[10] = this.n.z; this.viewMatrix[14] = -this.eVec.dot(this.n);
        this.viewMatrix[3] = 0.0; this.viewMatrix[7] = 0.0; this.viewMatrix[11] = 0.0; this.viewMatrix[15] = 1.0;
    }

    /**
     * 计算投影矩阵
     */
    this.setPerspectiveMatrix = function(angle, aspect) {
        if (this.zFar <= 0.0001) {
            let focusDistance = this.getDist();
            this.zNear = focusDistance * 0.02;
            this.zFar = focusDistance * 200.0;
        }
        mat4.perspective(this.projectionMatrix, angle, aspect, this.zNear, this.zFar);
    }

    this.setNearFar = function(near, far) {
        this.zNear = near; this.zFar = far;
    }

    this.resetPerspectiveMatrix = function(angle, aspect) {
        let focusDistance = this.getDist();
        this.zNear = focusDistance * 0.02;
        this.zFar = focusDistance * 200.0;
        mat4.perspective(this.projectionMatrix, angle, aspect, this.zNear, this.zFar);
    }

    /**
     * 摄像机绕n、v、u轴旋转的计算函数
     */
    this.roll = function(angle) {
        let cs = Math.cos(angle * Math.PI / 180);
        let sn = Math.sin(angle * Math.PI / 180);
        let t = new Vector3(this.u.x, this.u.y, this.u.z);
        let s = new Vector3(this.v.x, this.v.y, this.v.z);
        this.u.set(cs*t.x - sn*s.x, cs*t.y - sn*s.y, cs*t.z - sn*s.z);
        this.v.set(sn*t.x + cs*s.x, sn*t.y + cs*s.y, sn*t.z + cs*s.z);
        //每次计算完坐标轴变化后调用此函数更新视点矩阵
        this.setViewMatrix();
    }

    this.yaw = function(angle) {
        let cs = Math.cos(angle * Math.PI / 180);
        let sn = Math.sin(angle * Math.PI / 180);
        this.t.x = this.n.x, this.t.y = this.n.y, this.t.z = this.n.z;
        this.s.x = this.u.x, this.s.y = this.u.y, this.s.z = this.u.z;
        this.n.set(cs*this.t.x - sn*this.s.x, cs*this.t.y - sn*this.s.y, cs*this.t.z - sn*this.s.z);
        this.u.set(sn*this.t.x + cs*this.s.x, sn*this.t.y + cs*this.s.y, sn*this.t.z + cs*this.s.z);
        //每次计算完坐标轴变化后调用此函数更新视点矩阵
        this.setViewMatrix();
    }

    this.pitch = function(angle) {
        let cs = Math.cos(angle * Math.PI / 180);
        let sn = Math.sin(angle * Math.PI / 180);
        this.t.x = this.v.x, this.t.y = this.v.y, this.t.z = this.v.z;
        this.s.x = this.n.x, this.s.y = this.n.y, this.s.z = this.n.z;
        this.v.set(cs*this.t.x - sn*this.s.x, cs*this.t.y - sn*this.s.y, cs*this.t.z - sn*this.s.z);
        this.n.set(sn*this.t.x + cs*this.s.x, sn*this.t.y + cs*this.s.y, sn*this.t.z + cs*this.s.z);
        //每次计算完坐标轴变化后调用此函数更新视点矩阵
        this.setViewMatrix();
    }

    /**
     * 摄像机绕三个轴平移的计算函数
     */
    this.slide = function(du, dv, dn) {
        this.eye.x += du*this.u.x + dv*this.v.x + dn*this.n.x;
        this.eye.y += du*this.u.y + dv*this.v.y + dn*this.n.y;
        this.eye.z += du*this.u.z + dv*this.v.z + dn*this.n.z;
        this.look.x += du*this.u.x + dv*this.v.x + dn*this.n.x;
        this.look.y += du*this.u.y + dv*this.v.y + dn*this.n.y;
        this.look.z += du*this.u.z + dv*this.v.z + dn*this.n.z;
        this.setViewMatrix();
    }

    /**
     * 获取摄像机位置，作为着色器参数之一
     */
    this.getEyeLoc = function(eyeLocation) {
        eyeLocation.x = this.eye.x, eyeLocation.y = this.eye.y, eyeLocation.z = this.eye.z;
    }

    /**
     * 获取摄像机与视点距离，用于修正near和far的值
     */
    this.getDist = function() {
        let dist = Math.pow(this.eye.x, 2) + Math.pow(this.eye.y, 2) + Math.pow(this.eye.z, 2);
        return Math.pow(dist, 0.5);
    }
}