//===================================================================================================
// 枚举类型定义
// 面类型
let 	ADF_SURFT_UNKOWN			= 0;	// 未知面
let 	ADF_SURFT_PLANE				= 1;	// 平面
let 	ADF_SURFT_CYLINDER			= 2;	// 圆柱面
let 	ADF_SURFT_CONE				= 3;	// 圆锥面
let 	ADF_SURFT_TORUS				= 4;	// 圆环面
let 	ADF_SURFT_REVOLVE			= 5;	// 旋转面
let 	ADF_SURFT_TABCYL			= 6;	// 列表柱面
let 	ADF_SURFT_SPHERE			= 7;	// 球面

// 曲线类型
let 	ADF_CURVT_UNKOWN			= 0;	// 未知曲线
let 	ADF_CURVT_LINE				= 1;	// 直线
let 	ADF_CURVT_ARC				= 2;	// 圆弧

// 二维曲线类型
let 	ADF_2DCURVT_UNKNOWN			= 0;	// 未知曲线
let 	ADF_2DCURVT_LINE			= 1;	// 直线
let 	ADF_2DCURVT_ARC				= 2;	// 圆弧
let 	ADF_2DCURVT_POLYGON			= 3;	// 多边形

//===================================================================================================
// 结构体定义

// 平面
function ADF_PlaneData() {
	this.vAxisX = new ADF_BASEFLOAT3();
	this.vAxisY = new ADF_BASEFLOAT3();
	this.vAxisZ = new ADF_BASEFLOAT3();		// 垂直于面的法矢方向
	this.vOrigin = new ADF_BASEFLOAT3();	// 原点

	this.Clear = function () {
		this.vAxisX.Clear();	
		this.vAxisY.Clear();
		this.vAxisZ.Clear();	
		this.vOrigin.Clear();	
	}
	this.Clone = function () {
		var newData = new ADF_PlaneData();
		newData.vAxisX.Copy(this.vAxisX);
		newData.vAxisY.Copy(this.vAxisY);
		newData.vAxisZ.Copy(this.vAxisZ);
		newData.vOrigin.Copy(this.vOrigin);
		return newData;
	}
	this.Copy = function (data) {
		this.vAxisX.Copy(data.vAxisX);
		this.vAxisY.Copy(data.vAxisY);
		this.vAxisZ.Copy(data.vAxisZ);
		this.vOrigin.Copy(data.vOrigin);
	}	
} 

// 圆柱面
function ADF_CylinderData() {
	this.vAxisX = new ADF_BASEFLOAT3();
	this.vAxisY = new ADF_BASEFLOAT3();
	this.vAxisZ = new ADF_BASEFLOAT3();		// 垂直于面的法矢方向
	this.vOrigin = new ADF_BASEFLOAT3();	// 原点
	this.radius = 0.0;						// 底圆半径，Float32

	this.Clear = function () {
		this.vAxisX.Clear();	
		this.vAxisY.Clear();
		this.vAxisZ.Clear();	
		this.vOrigin.Clear();	
		this.radius = 0.0;
	}
	this.Clone = function () {
		var newData = new ADF_CylinderData();
		newData.vAxisX.Copy(this.vAxisX);
		newData.vAxisY.Copy(this.vAxisY);
		newData.vAxisZ.Copy(this.vAxisZ);
		newData.vOrigin.Copy(this.vOrigin);
		newData.radius = this.vOrigin;
		return newData;
	}
	this.Copy = function (data) {
		this.vAxisX.Copy(data.vAxisX);
		this.vAxisY.Copy(data.vAxisY);
		this.vAxisZ.Copy(data.vAxisZ);
		this.vOrigin.Copy(data.vOrigin);
		this.radius = data.radius;
	}	
} 

// 圆锥面
function ADF_ConeData() {
	this.vAxisX = new ADF_BASEFLOAT3();
	this.vAxisY = new ADF_BASEFLOAT3();
	this.vAxisZ = new ADF_BASEFLOAT3();		// 中心轴线方向
	this.vOrigin = new ADF_BASEFLOAT3();	// 原点
	this.alpha = 0.0;						// Angle between the axis of the cone and the generating line，Float32

	this.Clear = function () {
		this.vAxisX.Clear();	
		this.vAxisY.Clear();
		this.vAxisZ.Clear();	
		this.vOrigin.Clear();	
		this.alpha = 0.0;
	}
	this.Clone = function () {
		var newData = new ADF_ConeData();
		newData.vAxisX.Copy(this.vAxisX);
		newData.vAxisY.Copy(this.vAxisY);
		newData.vAxisZ.Copy(this.vAxisZ);
		newData.vOrigin.Copy(this.vOrigin);
		newData.alpha = this.alpha;
		return newData;
	}
	this.Copy = function (data) {
		this.vAxisX.Copy(data.vAxisX);
		this.vAxisY.Copy(data.vAxisY);
		this.vAxisZ.Copy(data.vAxisZ);
		this.vOrigin.Copy(data.vOrigin);
		this.alpha = data.alpha;
	}	
} 

// 圆环面
function ADF_TorusData() {
	this.vAxisX = new ADF_BASEFLOAT3();
	this.vAxisY = new ADF_BASEFLOAT3();
	this.vAxisZ = new ADF_BASEFLOAT3();		// 中心轴线方向
	this.vOrigin = new ADF_BASEFLOAT3();	// 原点
	this.radius1 = 0.0;						// Distance from the center of the generating arc to the axis of revolution，Float32
	this.radius2 = 0.0;						// Radius of the generating arc，Float32

	this.Clear = function () {
		this.vAxisX.Clear();	
		this.vAxisY.Clear();
		this.vAxisZ.Clear();	
		this.vOrigin.Clear();	
		this.radius1 = 0.0;
		this.radius2 = 0.0;
	}
	this.Clone = function () {
		var newData = new ADF_TorusData();
		newData.vAxisX.Copy(this.vAxisX);
		newData.vAxisY.Copy(this.vAxisY);
		newData.vAxisZ.Copy(this.vAxisZ);
		newData.vOrigin.Copy(this.vOrigin);
		newData.radius1 = this.radius1;
		newData.radius2 = this.radius2;
		return newData;
	}
	this.Copy = function (data) {
		this.vAxisX.Copy(data.vAxisX);
		this.vAxisY.Copy(data.vAxisY);
		this.vAxisZ.Copy(data.vAxisZ);
		this.vOrigin.Copy(data.vOrigin);
		this.radius1 = data.radius1;
		this.radius2 = data.radius2;
	}	
} 

// 旋转面
function ADF_RevolveData() {
	this.vAxisX = new ADF_BASEFLOAT3();
	this.vAxisY = new ADF_BASEFLOAT3();
	this.vAxisZ = new ADF_BASEFLOAT3();		// 中心轴线方向
	this.vOrigin = new ADF_BASEFLOAT3();	// 原点

	this.Clear = function () {
		this.vAxisX.Clear();	
		this.vAxisY.Clear();
		this.vAxisZ.Clear();	
		this.vOrigin.Clear();	
	}
	this.Clone = function () {
		var newData = new ADF_RevolveData();
		newData.vAxisX.Copy(this.vAxisX);
		newData.vAxisY.Copy(this.vAxisY);
		newData.vAxisZ.Copy(this.vAxisZ);
		newData.vOrigin.Copy(this.vOrigin);
		return newData;
	}
	this.Copy = function (data) {
		this.vAxisX.Copy(data.vAxisX);
		this.vAxisY.Copy(data.vAxisY);
		this.vAxisZ.Copy(data.vAxisZ);
		this.vOrigin.Copy(data.vOrigin);
	}	
} 

// 列表柱面
function ADF_TabCylData() {
	this.vAxisX = new ADF_BASEFLOAT3();
	this.vAxisY = new ADF_BASEFLOAT3();
	this.vAxisZ = new ADF_BASEFLOAT3();		// 中心轴线方向
	this.vOrigin = new ADF_BASEFLOAT3();	// 原点

	this.Clear = function () {
		this.vAxisX.Clear();	
		this.vAxisY.Clear();
		this.vAxisZ.Clear();	
		this.vOrigin.Clear();	
	}
	this.Clone = function () {
		var newData = new ADF_TabCylData();
		newData.vAxisX.Copy(this.vAxisX);
		newData.vAxisY.Copy(this.vAxisY);
		newData.vAxisZ.Copy(this.vAxisZ);
		newData.vOrigin.Copy(this.vOrigin);
		return newData;
	}
	this.Copy = function (data) {
		this.vAxisX.Copy(data.vAxisX);
		this.vAxisY.Copy(data.vAxisY);
		this.vAxisZ.Copy(data.vAxisZ);
		this.vOrigin.Copy(data.vOrigin);
	}	
} 

// 球面
function ADF_SphereData() {
	this.vAxisX = new ADF_BASEFLOAT3();
	this.vAxisY = new ADF_BASEFLOAT3();
	this.vAxisZ = new ADF_BASEFLOAT3();		// 中心轴线方向
	this.vOrigin = new ADF_BASEFLOAT3();	// 原点
	this.radius = 0.0;						// 半径，Float32

	this.Clear = function () {
		this.vAxisX.Clear();	
		this.vAxisY.Clear();
		this.vAxisZ.Clear();	
		this.vOrigin.Clear();	
		this.radius = 0.0;
	}
	this.Clone = function () {
		var newData = new ADF_SphereData();
		newData.vAxisX.Copy(this.vAxisX);
		newData.vAxisY.Copy(this.vAxisY);
		newData.vAxisZ.Copy(this.vAxisZ);
		newData.vOrigin.Copy(this.vOrigin);
		newData.radius = this.radius;
		return newData;
	}
	this.Copy = function (data) {
		this.vAxisX.Copy(data.vAxisX);
		this.vAxisY.Copy(data.vAxisY);
		this.vAxisZ.Copy(data.vAxisZ);
		this.vOrigin.Copy(data.vOrigin);
		this.radius = data.radius;
	}	
} 

// 面的形状数据
function ADF_SurfaceShapeData() {
	this.plane = null;			// 平面
	this.cylinder = null;		// 圆柱面
	this.cone = null;			// 圆锥面
	this.torus = null;			// 圆环面
	this.revolve = null;		// 旋转面
	this.tabcyl = null;			// 列表柱面
	this.sphere = null;			// 球面

	this.Clear = function () {
		if (this.plane != null){
			this.plane.Clear();	
		}	
		if (this.cylinder != null){
			this.cylinder.Clear();
		}	
		if (this.cone != null){
			this.cone.Clear();	
		}
		if (this.torus != null){
			this.torus.Clear();	
		}
		if (this.revolve != null){
			this.revolve.Clear();	
		}
		if (this.tabcyl != null){
			this.tabcyl.Clear();	
		}
		if (this.sphere != null){
			this.sphere.Clear();	
		}
	}
	this.Clone = function () {
		var newData = new ADF_SurfaceShapeData();

		if (this.plane != null){
			newData.plane = ADF_PlaneData();
			newData.plane.Copy(this.plane);
		}
		if (this.cylinder != null){
			newData.cylinder = ADF_CylinderData();
			newData.cylinder.Copy(this.cylinder);
		}
		if (this.cone != null){
			newData.cone = ADF_ConeData();
			newData.cone.Copy(this.cone);
		}
		if (this.torus != null){
			newData.torus = ADF_TorusData();
			newData.torus.Copy(this.torus);
		}
		if (this.revolve != null){
			newData.revolve = ADF_RevolveData();
			newData.revolve.Copy(this.revolve);
		}
		if (this.tabcyl != null){
			newData.tabcyl = ADF_TabCylData();
			newData.tabcyl.Copy(this.tabcyl);
		}
		if (this.sphere != null){
			newData.sphere = ADF_SphereData();
			newData.sphere.Copy(this.sphere);
		}
		return newData;
	}
	this.Copy = function (data) {
		if (data.plane != null){
			if (this.plane == null){
				this.plane = ADF_PlaneData();
			}
			this.plane.Copy(data.plane);
		}		
		if (data.cylinder != null){
			if (this.cylinder == null){
				this.cylinder = ADF_CylinderData();
			}
			this.cylinder.Copy(data.cylinder);
		}
		if (data.cone != null){
			if (this.cone == null){
				this.cone = ADF_ConeData();
			}
			this.cone.Copy(data.cone);
		}
		if (data.torus != null){
			if (this.torus == null){
				this.torus = ADF_TorusData();
			}
			this.torus.Copy(data.torus);
		}
		if (data.revolve != null){
			if (this.revolve == null){
				this.revolve = ADF_RevolveData();
			}
			this.revolve.Copy(data.revolve);
		}
		if (data.tabcyl != null){
			if (this.tabcyl == null){
				this.tabcyl = ADF_TabCylData();
			}
			this.tabcyl.Copy(data.tabcyl);
		}
		if (data.sphere != null){
			if (this.sphere == null){
				this.sphere = ADF_SphereData();
			}
			this.sphere.Copy(data.sphere);
		}
	}
} 

// 曲面数据信息
function ADF_Surface() {
	this.nID = -1;									// 曲面ID， Int32
	this.nType = ADF_SURFT_UNKOWN;					// 曲面类型， Int32
	this.Surfacedata = new ADF_SurfaceShapeData();	// 曲面数据
	this.bIsTopological = false;					// 是否拓扑曲面， Int32，0表示FALSE, 1表示TRUE

	this.Clear = function () {
		this.nID = -1;
		this.nType = ADF_SURFT_UNKOWN;
		this.bIsTopological = false;
		this.Surfacedata.Clear();	
	}
	this.Clone = function () {
		var newData = new ADF_Surface();
	
		newData.nID = this.nID;
		newData.nType = this.nType;
		newData.bIsTopological = this.bIsTopological;
		newData.Surfacedata.Copy(this.Surfacedata);
		return newData;
	}
	this.Copy = function (data) {
		this.nID = data.nID;
		this.nType = data.nType;
		this.bIsTopological = data.bIsTopological;
		this.Surfacedata.Copy(data.Surfacedata);	
	}	
}

//===================================================================================================
// 结构体定义

// 直线
function ADF_LineData() {
	this.end1 = new ADF_BASEFLOAT3();		// 起点
	this.end2 = new ADF_BASEFLOAT3();		// 终点

	this.Clear = function () {
		this.end1.Clear();	
		this.end2.Clear();
	}
	this.Clone = function () {
		var newData = new ADF_LineData();
		newData.end1.Copy(this.end1);
		newData.end2.Copy(this.end2);
		return newData;
	}
	this.Copy = function (data) {
		this.end1.Copy(data.end1);
		this.end2.Copy(data.end2);
	}	
} 

// 圆弧
function ADF_ArcData() {
	this.vOrigin = new ADF_BASEFLOAT3();		// 原点
	this.vVector1 = new ADF_BASEFLOAT3();		// First vector that defines the plane of the arc
	this.vVector2 = new ADF_BASEFLOAT3();		// Second vector that defines the plane of the arc
	this.fStartAngle = 0.0;						// Angular parameter of the starting point，Float32
	this.fEndAngle = 0.0;						// Angular parameter of the ending point，Float32
	this.fRadius = 0.0;							// 半径，Float32

	this.Clear = function () {
		this.vOrigin.Clear();	
		this.vVector1.Clear();
		this.vVector2.Clear();
		this.fStartAngle = 0.0;
		this.nType = 0.0;
		this.fRadius = 0.0;	
	}
	this.Clone = function () {
		var newData = new ADF_ArcData();
	
		newData.vOrigin.Copy(this.vOrigin);
		newData.vVector1.Copy(this.vVector1);
		newData.vVector2.Copy(this.vVector2);
		newData.fStartAngle = this.fStartAngle;
		newData.nType = this.nType;
		newData.fRadius = this.fRadius;

		return newData;
	}
	this.Copy = function (data) {
		this.vOrigin.Copy(data.vOrigin);
		this.vVector1.Copy(data.vVector1);
		this.vVector2.Copy(data.vVector2);

		this.fStartAngle = data.fStartAngle;
		this.nType = data.nType;
		this.fRadius = data.fRadius;			
	}	
}

// 曲线的形状数据
function ADF_CurveData() {
	this.line = null;				// 直线
	this.arc = null;				// 圆弧

	this.Clear = function () {
		if (this.line != null){
			this.line.Clear();	
		}
		
		if (this.arc != null){
			this.arc.Clear();
		}
	}
	this.Clone = function () {
		var newData = new ADF_CurveData();
	
		if (this.line != null){
			newData.line = new ADF_LineData();
			newData.line.Copy(this.line);
		}
		if (this.arc != null){
			newData.arc = new ADF_ArcData();
			newData.arc.Copy(this.arc);
		}
		return newData;
	}
	this.Copy = function (data) {
		if (data.line != null){
			if (this.line == null){
				this.line = new ADF_LineData();
			}
			this.line.Copy(data.line);
		}
		if (data.arc != null){
			if (this.arc == null){
				this.arc = new ADF_ArcData();
			}
			this.arc.Copy(data.arc);	
		}
	}	
}

// 曲线数据信息
function ADF_Curve() {
	this.nID = -1;								// 曲线ID，Int32
	this.nType = ADF_CURVT_UNKOWN;				// 曲线类型，Int32
	this.curvedata = new ADF_CurveData();		// 曲线数据
	this.bIsTopological = false;				// 是否拓扑曲线， Int32，0表示FALSE, 1表示TRUE

	this.Clear = function () {
		this.curvedata.Clear();	
		this.nID = -1;	
		this.nType = ADF_CURVT_UNKOWN;	
		this.bIsTopological = false;	
	}
	this.Clone = function () {
		var newData = new ADF_Curve();
	
		newData.nID = this.nID;
		newData.nType = this.nType;
		newData.bIsTopological = this.bIsTopological;
		newData.curvedata.Copy(this.curvedata);

		return newData;
	}
	this.Copy = function (data) {
		this.nID = data.nID;
		this.nType = data.nType;
		this.bIsTopological = data.bIsTopological;
		this.curvedata.Copy(data.curvedata);	
	}	
}

//===================================================================================================
// 结构体定义

// 二维直线
function ADF_Line2D() {
	this.start = new ADF_BASEFLOAT2();		// 起点
	this.end = new ADF_BASEFLOAT2();		// 终点

	this.Clear = function () {
		this.start.Clear();	
		this.end.Clear();
	}
	this.Clone = function () {
		var newData = new ADF_Line2D();
		newData.start.Copy(this.start);
		newData.end.Copy(this.end);
		return newData;
	}
	this.Copy = function (data) {
		this.start.Copy(data.start);
		this.end.Copy(data.end);
	}	
} 

// 二维圆弧
function ADF_Arc2D() {
	this.center = new ADF_BASEFLOAT2();			// 圆心
	this.axisX = new ADF_BASEFLOAT2();			// X轴的向量
	this.fRadius = 0.0;							// 半径，Float32
	this.fStartAngle = 0.0;						// 起始角，Float32
	this.fEndAngle = 0.0;						// 终止角，Float32

	this.Clear = function () {
		this.center.Clear();	
		this.axisX.Clear();
		this.fStartAngle = 0.0;
		this.fEndAngle = 0.0;
		this.fRadius = 0.0;	
	}
	this.Clone = function () {
		var newData = new ADF_Arc2D();
	
		newData.center.Copy(this.center);
		newData.axisX.Copy(this.axisX);
		newData.fStartAngle = this.fStartAngle;
		newData.fEndAngle = this.fEndAngle;
		newData.fRadius = this.fRadius;

		return newData;
	}
	this.Copy = function (data) {
		this.center.Copy(data.center);
		this.axisX.Copy(data.axisX);
		this.fStartAngle = data.fStartAngle;
		this.fEndAngle = data.fEndAngle;
		this.fRadius = data.fRadius;			
	}	
}

// 二维多边形填充
function ADF_Polygon2D() {
	this.arrPoints = new Array();			// 点集，存储ADF_BASEFLOAT2对象

	this.Clear = function () {
		this.arrPoints.splice(0, this.arrPoints.length);	//	清空数组 
	}
	this.Clone = function () {
		var newData = new ADF_Polygon2D();
		for (var i in this.arrPoints){
			newData.arrPoints[i] = this.arrPoints[i];
		}
		return newData;
	}
	this.Copy = function (data) {
		this.arrPoints.splice(0, this.arrPoints.length);	//	清空数组 

		for (var i in data.arrPoints){
			this.arrPoints[i] = data.arrPoints[i];
		}
	}	
} 

// 二维曲线数据信息
function ADF_Curve2D() {
	this.nID = -1;								// 圆心，Int32
	this.nType = ADF_2DCURVT_UNKNOWN;			// 二维曲线类型,参看枚举型ADF_CURVE2DTYPE，Int32
	this.stuLine = null;						// 直线
	this.stuArc = null;							// 圆弧
	this.stuPolygon = null;						// 多边形

	this.Clear = function () {
		this.nID = -1;
		this.nType = ADF_2DCURVT_UNKNOWN;	

		if (this.stuLine != null){
			this.stuLine.Clear();	
		}
		if (this.stuArc != null){
			this.stuArc.Clear();
		}
		if (this.stuPolygon != null){
			this.stuPolygon.Clear();
		}
	}
	this.Clone = function () {
		var newData = new ADF_Curve2D();
	
		newData.nID = this.nID;
		newData.nType = this.nType;

		if (this.stuLine != null){
			newData.stuLine = new ADF_Line2D();
			newData.stuLine.Copy(this.stuLine);
		}

		if (this.stuArc != null){
			newData.stuArc = new ADF_Arc2D();
			newData.stuArc.Copy(this.stuArc);
		}

		if (this.stuPolygon != null){
			newData.stuPolygon = new ADF_Polygon2D();
			newData.stuPolygon.Copy(this.stuPolygon);
		}
		
		return newData;
	}
	this.Copy = function (data) {
		this.nID = data.nID;
		this.nType = data.nType;

		if (data.stuLine != null){
			if (this.stuLine == null){
				this.stuLine = new ADF_Line2D();
			}
			this.stuLine.Copy(data.stuLine);
		}

		if (data.stuArc != null){
			if (this.stuArc == null){
				this.stuArc = new ADF_Arc2D();
			}
			this.stuArc.Copy(data.stuArc);
		}

		if (data.stuPolygon != null){
			if (this.stuPolygon == null){
				this.stuPolygon = new ADF_Polygon2D();
			}
			this.stuPolygon.Copy(data.stuPolygon);
		}			
	}	
}