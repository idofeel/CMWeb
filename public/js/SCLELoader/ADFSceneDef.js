//===================================================================================================
// 枚举类型定义

// 文件类型
let	ADF_FILE_UNKOWN			= 0;	    // 未知类型
let	ADF_FILE_MODEL			= 1;	    // 模型文件
let	ADF_FILE_IMAGE			= 3;	    // 图像文件
let	ADF_FILE_AUDIO			= 2;	    // 音频文件
let	ADF_FILE_DOCUMENT		= 4;	    // 文档文件
let	ADF_FILE_VIDEO			= 5;	    // 视频文件

// 文件的操作类型
let	ADF_FILEOP_INVALID		= 0;	    // 无效类型
let	ADF_FILEOP_READ			= 1;	    // 读取类型
let	ADF_FILEOP_CREATE		= 2;	    // 创建(修改)类型
let	ADF_FILEOP_DEL			= 3;	    // 删除类型

// 坐标系类型
let	ADFCST_NULL				= 0;	    // 无效类型
let	ADFCST_LEFTHAND			= 1;	    // 左手坐标系
let	ADFCST_RIGHTHAND		= 2;	    // 右手坐标系

// 渲染实体填充方式
let	ADFFILL_INVISIBLE     	= 0;	    // 不可见
let	ADFFILL_POINT         	= 1;	    // 点
let	ADFFILL_WIREFRAME     	= 2;	    // 线框
let	ADFFILL_SOLID        	= 3;	    // 实体

// 渲染剪裁方式
let	ADFCULL_NONE         	= 1;
let	ADFCULL_CW            	= 2;
let	ADFCULL_CCW           	= 3;

// 材质类型
let	ADFMTLTYPE_PHYSICS		= 0;	    // 自然材质
let	ADFMTLTYPE_PICTURE		= 1;	    // 单纹理图像
let	ADFMTLTYPE_PURECOLOR	= 2;	    // 纯色

// 摄像机投影类型
let	ADFCP_NULL				= 0;	    // 无效类型
let	ADFCP_ORTHO				= 1;	    // 平行投影
let	ADFCP_PERSPECTIVE		= 2;	    // 透视投影

// 摄像机上方向类型
let	ADFCUT_INVALID			= 0;		// 无效类型
let	ADFCUT_X				= 1;		// X正向为上方向
let	ADFCUT_Y				= 2;		// Y正向为上方向
let	ADFCUT_Z				= 3;		// Z正向为上方向
let	ADFCUT_NX				= 4;		// X负向为上方向
let	ADFCUT_NY				= 5;		// Y负向为上方向
let	ADFCUT_NZ				= 6;		// Z负向为上方向

// 模型子集类型
let	ADF_MDLSUBSET_UNKOWN	= 0;		// 未知类型
let	ADF_MDLSUBSET_SURFACE	= 1;		// 曲面类型
let	ADF_MDLSUBSET_CURVE		= 2;		// 曲线类型

// 图元类型
let	ADFPT_NULL				= 0;
let	ADFPT_POINTLIST			= 1;
let	ADFPT_LINELIST			= 2;
let	ADFPT_LINESTRIP			= 3;
let	ADFPT_TRIANGLELIST		= 4;
let	ADFPT_TRIANGLESTRIP		= 5;
let	ADFPT_TRIANGLEFAN		= 6;

// 关键帧类型
let	ADFKFT_UNKNOWN			= 0;
let	ADFKFT_ROTATION			= 6;		// 自由旋转
let	ADFKFT_TRANSLATION		= 7;		// 平移

// 时间节点类型
let	ADFSTNT_NULL			= 0;		// 无效类
let	ADFSTNT_BASE			= 1;		// 基类
let	ADFSTNT_WORKSTAGE		= 2;		// 工序
let	ADFSTNT_WORKSTEP		= 3;		// 工步

// 参数类型
let	ADF_PARAMT_UNKOWN		= 0;		// 未知类型
let	ADF_PARAMT_INT			= 1;		// 整数类型
let	ADF_PARAMT_FLOAT		= 2;		// 单精度浮点类型
let	ADF_PARAMT_DOUBLE		= 3;		// 双精度浮点类型
let	ADF_PARAMT_STRING		= 4;		// 字符串类型
let	ADF_PARAMT_FLOAT3		= 5;		// 三个单精度浮点类型
let	ADF_PARAMT_DOUBLE3		= 6;		// 三个双精度浮点类型
let	ADF_PARAMT_BOOL			= 7;		// 布尔类型

// 长度单位类型
let	ADF_LENUNITTYPE_UNKOWN		= 0;	// 未知类型
let	ADF_LENUNITTYPE_MM			= 1;	// 毫米
let	ADF_LENUNITTYPE_CM			= 2;	// 厘米
let	ADF_LENUNITTYPE_M			= 3;	// 米
let	ADF_LENUNITTYPE_MICRON		= 4;	// 微米
let	ADF_LENUNITTYPE_FT			= 5;	// 英尺
let	ADF_LENUNITTYPE_IN			= 6;	// 英寸
let	ADF_LENUNITTYPE_MIL			= 7;	// 千分之一英寸
let	ADF_LENUNITTYPE_ANGSTROM	= 8;	// 埃
let	ADF_LENUNITTYPE_NANOMETER	= 9;	// 纳米

// 质量单位类型
let	ADF_MASSUNITTYPE_UNKOWN		= 0;	// 未知类型
let	ADF_MASSUNITTYPE_KG			= 1;	// 千克
let	ADF_MASSUNITTYPE_G			= 2;	// 克
let	ADF_MASSUNITTYPE_MG			= 3;	// 毫克
let	ADF_MASSUNITTYPE_LBM		= 4;	// 磅
let	ADF_MASSUNITTYPE_OUNCE_M	= 5;	// 盎司
let	ADF_MASSUNITTYPE_SLUG		= 6;	// 斯勒格
let	ADF_MASSUNITTYPE_TON_M		= 7;	// 短吨
let	ADF_MASSUNITTYPE_TONNE		= 8;	// 吨

// 时间单位类型
let	ADF_TIMEUNITTYPE_UNKOWN		= 0;	// 未知类型
let	ADF_TIMEUNITTYPE_SEC		= 1;	// 秒
let	ADF_TIMEUNITTYPE_MSEC		= 2;	// 毫秒
let	ADF_TIMEUNITTYPE_MICRO_SEC	= 3;	// 微妙
let	ADF_TIMEUNITTYPE_MIN		= 4;	// 分钟
let	ADF_TIMEUNITTYPE_HR			= 5;	// 小时
let	ADF_TIMEUNITTYPE_DAY		= 6;	// 天
let	ADF_TIMEUNITTYPE_WEEK		= 7;	// 周
let	ADF_TIMEUNITTYPE_NANOSECOND	= 8;	// 纳秒

// 角度单位类型
let	ADF_ANGUNITTYPE_UNKOWN		= 0;	// 未知类型
let	ADF_ANGUNITTYPE_DEGREE		= 1;	// 角度
let	ADF_ANGUNITTYPE_RADIAN		= 2;	// 弧度

// 标注类型
let	ADF_AT_UNKNOWN              = 0;	// 未知类型
let	ADF_AT_DIMENSION            = 1;	// 尺寸
let	ADF_AT_NOTE                 = 2;	// 注释
let	ADF_AT_DATUM                = 3;	// 基准
let	ADF_AT_GTOL                 = 4;	// 形位公差
let	ADF_AT_SURFFINISH           = 5;	// 粗糙度
let	ADF_AT_TECHREQU             = 6;	// 技术要求
let	ADF_AT_SYMBOL               = 7;	// 一般符号
let	ADF_AT_WELDFILLET           = 8;	// 焊角符号
let	ADF_AT_WELD                 = 9;	// 焊接符号
let	ADF_AT_SAMEHOLE             = 10;	// 相同孔符号
let	ADF_AT_SKETCH               = 20;	// 草绘（当作一种特殊符号处理）
let	ADF_AT_COSMETIC             = 21;	// 修饰特征（当作一种特殊符号处理）
let	ADF_AT_SECTIONPLANE         = 100	// 剖切平面

// 形位公差引线方式
let	ADF_AS_UNKNOWN              = -1;
let	ADF_AS_ARROWHEAD            = 1;	// 箭头
let	ADF_AS_DOT                  = 2;	// 点
let	ADF_AS_FILLEDDOT            = 3;	// 实心点
let	ADF_AS_NOARROW              = 4;	// 无
let	ADF_AS_CROSS                = 5;	// 交叉
let	ADF_AS_SLASH                = 6;	// 斜杠
let	ADF_AS_INTEGRAL             = 7;	// 整数
let	ADF_AS_BOX                  = 8;	// 方框
let	ADF_AS_FILLEDBOX            = 9;	// 实心框
let	ADF_AS_DOUBLEARROW          = 10;	// 双箭头
let	ADF_AS_TARGET               = 14;	// 目标
let	ADF_AS_LEFTHALF             = 15;	// 左半箭头
let	ADF_AS_RIGHTHALF            = 16;	// 右半箭头
let	ADF_AS_TRIANGLE             = 18;	// 三角形
let	ADF_AS_NOCHANGE             = 19	// 照原样

// 文本样式的水平对齐方式
let	ADF_THJT_UNKNOWN            = -1;	// 无效类型
let	ADF_THJT_LEFT               = 0;	// 左边
let	ADF_THJT_CENTER             = 1;	// 中心
let	ADF_THJT_RIGHT              = 2;	// 右边

// 文本样式的竖直对齐方式
let ADF_TVJT_TOP                = 0;	// 顶部
let	ADF_TVJT_MIDDLE             = 1;	// 中间
let	ADF_TVJT_BOTTOM             = 2;	// 底部

// 文本样式的竖直对齐方式
let	ADF_LS_STANDARD             = 0;	// 标准
let	ADF_LS_ISO                  = 1;	// ISO

// 文本方向
let	ADF_TD_LEFT                 = 0;	// 向左
let	ADF_TD_RIGHT                = 1;	// 向右

// 场景批注类型
let ADF_SCENECMTTYPE_UNKOWN     = 0;	// 未知类型
let	ADF_SCENECMTTYPE_ADVICE     = 1;	// 建议性批注
let	ADF_SCENECMTTYPE_PRAISE     = 2;	// 表扬性批注

//===================================================================================================
// 结构体定义

// 立方体包围盒
function ADF_BBOX() {
	this._min = new ADF_BASEFLOAT3();
	this._max = new ADF_BASEFLOAT3();

	this.Clear = function () {
		this._min.Clear();	
		this._max.Clear();
	}
	this.Clone = function () {
		var newData = new ADF_BBOX();
		newData._min.Copy(this._min);
		newData._max.Copy(this._max);
		return newData;
	}
	this.Copy = function (data) {
		this._min.Copy(data._min);
		this._max.Copy(data._max);
	}	
} 

// 球形包围盒
function ADF_BSPHERE() {
	this._center = new ADF_BASEFLOAT3();
	this._radius = 0;                   // Float32

	this.Clear = function () {
		this._center.Clear();	
		this._radius = 0;
	}
	this.Clone = function () {
		var newData = new ADF_BSPHERE();
		newData._center.Copy(this._center);
		newData._radius = (this._radius);
		return newData;
	}
	this.Copy = function (data) {
		this._center.Copy(data._center);
		this._radius = data._radius;
	}	
} 

// 坐标系(单精)
function ADF_COORDSYSTEM() {
    this._vOrigin = new ADF_BASEFLOAT3();       // 坐标系原点
    this._vAxisX = new ADF_BASEFLOAT3();        // 坐标系X轴向量
    this._vAxisY = new ADF_BASEFLOAT3();        // 坐标系Y轴向量(坐标系Z轴向量,由X向量叉乘Y向量获得)

    this.Clear = function () {
		this._center.Clear();	
        this._vAxisX.Clear();
        this._vAxisY.Clear();
	}
	this.Clone = function () {
		var newData = new ADF_COORDSYSTEM();
        newData._center.Copy(this._center);
        newData._vAxisX.Copy(this._vAxisX);
        newData._vAxisY.Copy(this._vAxisY);
		return newData;
	}
	this.Copy = function (data) {
        this._center.Copy(data._center);
        this._vAxisX.Copy(data._vAxisX);
        this._vAxisY.Copy(data._vAxisY);
	}	
} 

// 坐标系(双精)
function ADF_COORDSYSTEMD() {
    this._vOrigin = new ADF_BASEDOUBLE3();       // 坐标系原点
    this._vAxisX = new ADF_BASEDOUBLE3();        // 坐标系X轴向量
    this._vAxisY = new ADF_BASEDOUBLE3();        // 坐标系Y轴向量(坐标系Z轴向量,由X向量叉乘Y向量获得)

    this.Clear = function () {
		this._center.Clear();	
        this._vAxisX.Clear();
        this._vAxisY.Clear();
	}
	this.Clone = function () {
		var newData = new ADF_COORDSYSTEMD();
        newData._center.Copy(this._center);
        newData._vAxisX.Copy(this._vAxisX);
        newData._vAxisY.Copy(this._vAxisY);
		return newData;
	}
	this.Copy = function (data) {
        this._center.Copy(data._center);
        this._vAxisX.Copy(data._vAxisX);
        this._vAxisY.Copy(data._vAxisY);
	}	
} 

// 参数数值
function ADF_PARAMETERVALU() {
    this._nType = ADF_PARAMT_UNKOWN;                    // 参数类型，参看ADF_PARAMETERTYPE枚举， Int32
	this._nValue = 0;				                    // 整数数值， Int32
	this._fValue = 0.0;				                    // 单精度浮点数值， Float32
    this._dValue = 0.0;				                    // 双精度浮点数值，Float64    
    this._vFloat3Value = null;                          // 三个单精度浮点的数值, ADF_BASEFLOAT3
    this._vDouble3Value = null;                         // 三个双精度浮点的数值, ADF_BASEDOUBLE3
    this._bValue = 0.0;				                    // 布尔数值， Int32
    this._strValue = '';

    this.Clear = function () {
        this._nType = ADF_PARAMT_UNKOWN; 
        this._nValue = 0;				                 
        this._fValue = 0.0;				               
        this._dValue = 0.0;	
        if (this._vFloat3Value != null){
            this._vFloat3Value.Clear();	
        }
        if (this._vDouble3Value != null){
            this._vDouble3Value.Clear();
        }
        this._bValue = 0.0;	
        this._strValue = '';
	}
	this.Clone = function () {
        var newData = new ADF_PARAMETERVALU();
        
        newData._nType = this._nType;
        newData._nValue = this._nValue;
        newData._fValue = this._fValue;
        newData._dValue = this._dValue;
        if (this._vFloat3Value != null){
            newData._vFloat3Value = new ADF_BASEFLOAT3();
            newData._vFloat3Value.Copy(this._vFloat3Value);
        }
        if (this._vDouble3Value != null){
            newData._vDouble3Value = new ADF_BASEDOUBLE3();
            newData._vDouble3Value.Copy(this._vDouble3Value);
        }
        newData._bValue = this._bValue;
        newData._strValue = this._strValue;
		return newData;
	}
	this.Copy = function (data) {
        this._nType = data._nType;
        this._nValue = data._nValue;
        this._fValue = data._fValue;
        this._dValue = data._dValue;
        if (data._vFloat3Value != null){
            if (this._vFloat3Value == null){
                this._vFloat3Value = new ADF_BASEFLOAT3();
            }
            
            this._vFloat3Value.Copy(data._vFloat3Value);
        }
        if (data._vDouble3Value != null){
            if (this._vDouble3Value == null){
                this._vDouble3Value = new ADF_BASEDOUBLE3();
            }
            
            this._vDouble3Value.Copy(data._vDouble3Value);
        }
        this._bValue = data._bValue;
        this._strValue = data._strValue;
	}	
} 

// 参数
function ADF_PARAMETER() {
    this._strName = '';                                 // 参数名称
    this._stuValue = new ADF_PARAMETERVALU();           // 参数数值

    this.Clear = function () {
        this._strName = ''; 
   		this._stuValue.Clear();	
	}
	this.Clone = function () {
        var newData = new ADF_PARAMETER();
        
        newData._strName = this._strName;
        newData._stuValue.Copy(this._stuValue);
    	return newData;
	}
	this.Copy = function (data) {
        this._strName = data._strName;
        this._stuValue.Copy(data._stuValue);
 	}	
} 

// 参数存储数据
function ADF_PARAMETER_SAVEDATA() {
	this._arrParamSaveData = new Array();			// 参数存储数据，存储ADF_PARAMETER对象

	this.Clear = function () {
		this._arrParamSaveData.splice(0, this._arrParamSaveData.length);	//	清空数组 
	}
	this.Clone = function () {
		var newData = new ADF_PARAMETER_SAVEDATA();
		for (var i in this._arrParamSaveData){
			newData._arrParamSaveData[i] = this._arrParamSaveData[i];
		}
		return newData;
	}
	this.Copy = function (data) {
		this._arrParamSaveData.splice(0, this._arrParamSaveData.length);	//	清空数组 

		for (var i in data._arrParamSaveData){
			this._arrParamSaveData[i] = data._arrParamSaveData[i];
		}
	}	
} 

// 时间节点
function ADF_TIMENODE() {
    this._uTimeNodeID = -1;					        // 节点对应的时间节点ID, Uint32
	this._nType = ADFSTNT_NULL;				        // 类型,参看枚举值ADF_SCENETIMENODETYPE, Int32
	this._strName = '';					            // 名称
	this._strNote = '';					            // 注释
	this._strAudioPath = '';				        // 音频路径
    this._strDocPath = '';					        // 文档路径
    this._vecOtherDocName = new Array();			// 其他文档名称，存储ADF_WString对象
    this._uVideoFileID = '';					    // 视频文件ID
    this._arrImageFileID = new Array();			    // 其他文档名称，存储Uint32对象
	this._strHyperlink = '';				        // 超链接
	this._uStartFrameID = 0;				        // 起始帧号, Uint32
    this._uFrameSize = 0;					        // 帧长度, Uint32
    this._arrSubNode = new Array();			        // 子节点，存储ADF_TIMENODE对象

    this.Clear = function () {
        this._uTimeNodeID = -1;					       
        this._nType = ADFSTNT_NULL;				        
        this._strName = '';					           
        this._strNote = '';					            
        this._strAudioPath = '';				       
        this._strDocPath = '';					        
        this._vecOtherDocName.splice(0, this._vecOtherDocName.length);			
        this._uVideoFileID = '';					    
        this._arrImageFileID.splice(0, this._arrImageFileID.length);		    
        this._strHyperlink = '';				      
        this._uStartFrameID = 0;				       
        this._uFrameSize = 0;					       
        this._arrSubNode.splice(0, this._arrSubNode.length);		        
	}
	this.Clone = function () {
        var newData = new ADF_TIMENODE();
        
        newData._uTimeNodeID  = this._uTimeNodeID;
        newData._nType  = this._nType;	
        newData._strName  = this._strName;	
        newData._strNote  = this._strNote;	
        newData._strAudioPath  = this._strAudioPath;	
        newData._strDocPath  = this._strDocPath;	
 
		for (var i in this._vecOtherDocName){
			newData._vecOtherDocName[i] = this._vecOtherDocName[i];
        }
        newData._uVideoFileID  = this._uVideoFileID;
        for (var i in this._arrImageFileID){
			newData._arrImageFileID[i] = this._arrImageFileID[i];
        }

        newData._strHyperlink  = this._strHyperlink;	
        newData._uStartFrameID  = this._uStartFrameID;	
        newData._uFrameSize  = this._uFrameSize;

        for (var i in this._arrSubNode){
			newData._arrSubNode[i] = this._arrSubNode[i];
        }
		return newData;
	}
	this.Copy = function (data) {
        this._uTimeNodeID  = data._uTimeNodeID;
        this._nType  = data._nType;	
        this._strName  = data._strName;	
        this._strNote  = data._strNote;	
        this._strAudioPath  = data._strAudioPath;	
        this._strDocPath  = data._strDocPath;

		this._vecOtherDocName.splice(0, this._vecOtherDocName.length);
		for (var i in data._vecOtherDocName){
			this._vecOtherDocName[i] = data._vecOtherDocName[i];
        }
        
        this._uVideoFileID  = data._uVideoFileID;

        this._arrImageFileID.splice(0, this._arrImageFileID.length);
		for (var i in data._arrImageFileID){
			this._arrImageFileID[i] = data._arrImageFileID[i];
        }
        
        this._strHyperlink  = data._strHyperlink;
        this._uStartFrameID  = data._uStartFrameID;
        this._uFrameSize  = data._uFrameSize;

        this._arrSubNode.splice(0, this._arrSubNode.length);
		for (var i in data._arrSubNode){
			this._arrSubNode[i] = data._arrSubNode[i];
        }
	}	
}

// 模型树节点
function ADF_OBJ_TREENODE() {
    this._uTreeNodeID = -1;					        // 树节点ID, Uint32
	this._uObjectID = -1;				            // 节点对应的物件ID, Uint32
	this._strName = '';					            // 节点名称
    this._matTranform = new ADF_BASEMATRIX();		// 变换矩阵(当前模型(组件/零件)在上一层组件中的世界变换矩阵)
    this._arrParamData = new Array();			    // 参数，存储ADF_PARAMETER对象
    this._arrSubNode = new Array();			        // 子节点，存储ADF_OBJ_TREENODE对象
    
    this.Clear = function () {
        this._uTreeNodeID = -1;					       
        this._uObjectID = -1;				        
        this._strName = '';	
        
        this._matTranform.Clear();
        this._arrParamData.splice(0, this._arrParamData.length);	
        this._arrSubNode.splice(0, this._arrSubNode.length);		
 	}
	this.Clone = function () {
        var newData = new ADF_OBJ_TREENODE();
        
        newData._uTreeNodeID  = this._uTreeNodeID;
        newData._uObjectID  = this._uObjectID;	
        newData._strName  = this._strName;	
        newData._matTranform.Copy(this._matTranform);

		for (var i in this._arrParamData){
			newData._arrParamData[i] = this._arrParamData[i];
        }
        for (var i in this._arrSubNode){
			newData._arrSubNode[i] = this._arrSubNode[i];
        }

		return newData;
	}
	this.Copy = function (data) {
        this._uTreeNodeID  = data._uTreeNodeID;
        this._uObjectID  = data._uObjectID;	
        this._strName  = data._strName;	
        this._matTranform.Copy(data._matTranform);

		this._arrParamData.splice(0, this._arrParamData.length);
		for (var i in data._arrParamData){
			this._arrParamData[i] = data._arrParamData[i];
        }  

        this._arrSubNode.splice(0, this._arrSubNode.length);
		for (var i in data._arrSubNode){
			this._arrSubNode[i] = data._arrSubNode[i];
        }
	}	
}

// 产品信息
function ADF_ProductInfo() {
    this.vCenterOfMass = new ADF_BASEFLOAT3();          // 质心
    this.dMass = 0.0;                                   // 质量， Float64
    this.dVolume = 0.0;                                 // 体积， Float64
    this.dSurfaceArea = 0.0;                            // 表面积， Float64
  
    this.Clear = function () { 
        this.vCenterOfMass.Clear();	

        this.dMass = 0.0;                         
        this.dVolume = 0.0;                             
        this.dSurfaceArea = 0.0;                          
	}
	this.Clone = function () {
        var newData = new ADF_ProductInfo();

        newData.vCenterOfMass.Copy(this.vCenterOfMass);
        newData.dMass = this.dMass;
        newData.dVolume = this.dVolume;
        newData.dSurfaceArea = this.dSurfaceArea;
       
    	return newData;
	}
	this.Copy = function (data) {
        this.vCenterOfMass.Copy(data.vCenterOfMass);

        this.dMass = data.dMass;
        this.dVolume = data.dVolume;
        this.dSurfaceArea = data.dSurfaceArea;        
 	}	
} 

// 物件存储数据
function ADF_OBJ_SAVEDATA() {    
    this._uObjectID = -1;                               // 物件ID, Uint32
    this._uMeshID = -1;                                 // 物件对应模型Mesh的ID， Uint32
    this._matLocal = new ADF_BASEMATRIX();              // 局部矩阵
    this._matWorld = new ADF_BASEMATRIX();              // 世界矩阵
    this._ProductInfo = new ADF_ProductInfo();          // 产品信息
  
	this._nReverse1 = 0;							    // 预留1， Int32
	this._nFillMode = ADFFILL_SOLID;					// 渲染实体填充方式， Int32
	this._nCullMode = ADFCULL_CW;						// 渲染剪裁方式， Int32
    this._nReverse4 = 0;							    // 预留4， Int32

    this._arrSubsetMtlID = new Array();			        // 物件子集的材质ID，Unit32
    this._arrSubsetMtlID_Ex = new Array();			    // 物件子集的扩展材质ID(第二套材质数据)，Unit32
        
    this.Clear = function () { 
        this._uObjectID = -1;                              
        this._uMeshID = -1;                                
        this._matLocal.Clear();              
        this._matWorld.Clear();          
        this._ProductInfo.Clear();    
      
        this._nReverse1 = 0;							   
        this._nFillMode = ADFFILL_SOLID;					
        this._nCullMode = ADFCULL_CW;						
        this._nReverse4 = 0;							  
    
        this._arrSubsetMtlID.splice(0, this._arrSubsetMtlID.length);	
        this._arrSubsetMtlID_Ex.splice(0, this._arrSubsetMtlID_Ex.length);                     
    }
    
	this.Clone = function () {
        var newData = new ADF_OBJ_SAVEDATA();

        newData._uObjectID = this._uObjectID;
        newData._uMeshID = this._uMeshID;
        newData._matLocal.Copy(this._matLocal);
        newData._matWorld.Copy(this._matWorld);
        newData._ProductInfo.Copy(this._ProductInfo);

        newData._nReverse1 = this._nReverse1;
        newData._nFillMode = this._nFillMode;
        newData._nCullMode = this._nCullMode;
        newData._nReverse4 = this._nReverse4;

        for (var i in this._arrSubsetMtlID){
			newData._arrSubsetMtlID[i] = this._arrSubsetMtlID[i];
        }
        for (var i in this._arrSubsetMtlID_Ex){
			newData._arrSubsetMtlID_Ex[i] = this._arrSubsetMtlID_Ex[i];
        }
       
    	return newData;
	}
	this.Copy = function (data) {
        this._uObjectID = data._uObjectID;
        this._uMeshID = data._uMeshID;
        
        this._matLocal.Copy(data._matLocal);
        this._matWorld.Copy(data._matWorld);
        this._ProductInfo.Copy(data._ProductInfo);

        this._nReverse1 = data._nReverse1;
        this._nFillMode = data._nFillMode;
        this._nCullMode = data._nCullMode;
        this._nReverse4 = data._nReverse4;

        this._arrSubsetMtlID.splice(0, this._arrSubsetMtlID.length);
		for (var i in data._arrSubsetMtlID){
			this._arrSubsetMtlID[i] = data._arrSubsetMtlID[i];
        }  

        this._arrSubsetMtlID_Ex.splice(0, this._arrSubsetMtlID_Ex.length);
		for (var i in data._arrSubsetMtlID_Ex){
			this._arrSubsetMtlID_Ex[i] = data._arrSubsetMtlID_Ex[i];
        }        
 	}	
} 

// 物件存储数据管理
function ADF_OBJ_SAVEDATAMGR() {
	this._arrObjSaveData = new Array();			// 物件存储数据, ADF_OBJ_SAVEDATA

	this.Clear = function () {
		this._arrObjSaveData.splice(0, this._arrObjSaveData.length);	//	清空数组 
	}
	this.Clone = function () {
		var newData = new ADF_OBJ_SAVEDATAMGR();
		for (var i in this._arrObjSaveData){
			newData._arrObjSaveData[i] = this._arrObjSaveData[i];
		}
		return newData;
	}
	this.Copy = function (data) {
		this._arrObjSaveData.splice(0, this._arrObjSaveData.length);

		for (var i in data._arrObjSaveData){
			this._arrObjSaveData[i] = data._arrObjSaveData[i];
		}
	}	
} 

// 模型子集存储数据
function ADF_MODELSUBSET_SAVEDATA() {    
    this._nPrimitType = ADFPT_TRIANGLELIST;			    // 图元类型,参看枚举型ADF_PRIMITIVETYPE， Int32
	this._uStartIndex = 0;			                    // 首索引偏移值， Uint32
	this._uIndexCount = 0;			                    // 索引数量， Uint32
	this._box = new ADF_BBOX();					        // 子集包围盒
//	this._nSubsetType = ADF_MDLSUBSET_UNKOWN;			// 子集类型,参看枚举型ADF_MDLSUBSETTYPE， Int32
//  this._uGeomIndex = -1;			                    // 几何(曲面曲线等)索引(注意:若该索引不为-1,则该子集与对应的几何是一一对应关系)， Uint32
        
    this.Clear = function () { 
        this._nPrimitType = ADFPT_TRIANGLELIST;		
        this._uStartIndex = 0;			                  
        this._uIndexCount = 0;			                 
        this._box.Clear();					      
//      this._nSubsetType = ADF_MDLSUBSET_UNKOWN;		
//      this._uGeomIndex = -1;	
    }
    
	this.Clone = function () {
        var newData = new ADF_MODELSUBSET_SAVEDATA();

        newData._nPrimitType = this._nPrimitType;
        newData._uStartIndex = this._uStartIndex;
        newData._uIndexCount = this._uIndexCount;

        newData._box.Copy(this._box);

//      newData._nSubsetType = this._nSubsetType;
//      newData._nReverse4 = this._nReverse4;

    	return newData;
	}
	this.Copy = function (data) {
        this._nPrimitType = data._nPrimitType;
        this._uStartIndex = data._uStartIndex;          
        this._uIndexCount = data._uIndexCount;

        this._box.Copy(data._box);

//      this._nSubsetType = data._nSubsetType;
//      this._uGeomIndex = data._uGeomIndex;        
 	}	
} 

// 模型存储数据
function ADF_MODEL_SAVEDATA() {    
    this._arrVertexData = null;                                     // 顶点数据(每个顶点包含8个Float32(3个位置+3个法矢向量+2纹理坐标)), Float32Array类型
    this._arrIndexData = null;                                      // 索引组，组内3个元素为一组(三角片)或2个元素为一组(线段，Uint32数组结构, Uint32Array类型
    this._arrSubset = new Array();                                  // 子集数据，ADF_MODELSUBSET_SAVEDATA数组结构
    this._arrSurface = new Array();                                 // 曲面数据，ADF_Surface数组结构
    this._arrCurve = new Array();                                   // 曲线数据，ADF_Curve数组结构
    this._box = new ADF_BBOX();                                     // 模型包围盒
    
    this.Clear = function () {  
        // if (_arrVertexData != null) 
        //     this._arrVertexData.splice(0, this._arrVertexData.length);

        if (_arrIndexData != null) 
            this._arrIndexData.splice(0, this._arrIndexData.length);    
                   
        this._arrSubset.splice(0, this._arrSubset.length);	
        this._arrSurface.splice(0, this._arrSurface.length); 
        this._arrCurve.splice(0, this._arrCurve.length);	

        this._box.Clear();   
    }  
}

// 模型存储数据
function ADF_MODEL() {    
    this._uModelID = -1;
	this._strModelName = '';
//	this._strModelFilePath = '';
    this._stuModelData = new ADF_MODEL_SAVEDATA();
            
    this.Clear = function () { 
        this._uModelID = -1;
        this._strModelName = '';
//        this._strModelFilePath = '';
        this._stuModelData.Clear();                    
    }
    
	this.Clone = function () {
        var newData = new ADF_MODEL();

        newData._uModelID = this._uModelID;
        newData._strModelName = this._strModelName;
//       newData._strModelFilePath = this._strModelFilePath;
        newData._stuModelData.Copy(this._stuModelData);      
    	return newData;
	}
	this.Copy = function (data) {
        this._uModelID = data._uModelID;
        this._strModelName = data._strModelName;
//       this._strModelFilePath = data._strModelFilePath;
        
        this._stuModelData.Copy(data._stuModelData);      
 	}	
} 

// 文件的操作数据信息
function ADF_MODEL_OPINFO() {                   
    this._ModelInfo = new ADF_MODEL();                      // 模型信息
  //  this._nFileOpType = ADF_FILEOP_INVALID;                 // 文件操作类型,参看类型ADF_FILEOP_INVALIDE， Int32
             
    this.Clear = function () { 
        this._ModelInfo.Clear();  
  //      this._nFileOpType = ADF_FILEOP_INVALID;                 
    }
    
	this.Clone = function () {
        var newData = new ADF_MODEL_OPINFO();

        newData._ModelInfo.Copy(this._ModelInfo);   
  //      newData._nFileOpType = this._nFileOpType;   
    	return newData;
    }
    
	this.Copy = function (data) {   
        this._ModelInfo.Copy(data._ModelInfo);   
  //      this._nFileOpType = data._nFileOpType;     
 	}	
} 

// 自然材质
function ADF_MATERIALPHYSICS() {                   
    this.vDiffuse = new ADF_BASEFLOAT4();
    this.vAmbient = new ADF_BASEFLOAT4(); 
    this.vSpecular = new ADF_BASEFLOAT4(); 
    this.vEmissive = new ADF_BASEFLOAT4();      
    this.fPower = 0;                         // Float32
             
    this.Clear = function () { 
        this.vDiffuse.Clear();  
        this.vAmbient.Clear();  
        this.vSpecular.Clear();  
        this.vEmissive.Clear();  

        this.fPower = 0;                 
    }
    
	this.Clone = function () {
        var newData = new ADF_MATERIALPHYSICS();

        newData.vDiffuse.Copy(this.vDiffuse);   
        newData.vAmbient.Copy(this.vAmbient); 
        newData.vSpecular.Copy(this.vSpecular); 
        newData.vEmissive.Copy(this.vEmissive); 

        newData.fPower = this.fPower;   
    	return newData;
    }
    
	this.Copy = function (data) {   
        this.vDiffuse.Copy(data.vDiffuse);   
        this.vAmbient.Copy(data.vAmbient); 
        this.vSpecular.Copy(data.vSpecular); 
        this.vEmissive.Copy(data.vEmissive); 

        this.fPower = data.fPower;     
 	}	
} 

// 材质
function ADF_MATERIAL() {  
    this._eMtlType = ADFMTLTYPE_PHYSICS;				// 材质类型，参考ADF_MATERIALTYPE, Int32
    this._mtlPhysics = new ADF_MATERIALPHYSICS();       // 自然材质  
    this._arrTexID = new Array();			            // 纹理材质ID，存储Uint32对象
    this._arrData = new Array();			            // 纹理数据，存储ADF_BASEFLOAT4对象

    this.Clear = function () { 
        this._eMtlType = ADFMTLTYPE_PHYSICS;
        this._mtlPhysics.Clear();  

        this._arrTexID.splice(0, this._arrTexID.length);	
        this._arrData.splice(0, this._arrData.length);	                
    }
    
	this.Clone = function () {
        var newData = new ADF_MATERIAL();

        newData._eMtlType = this._eMtlType;  
        newData._mtlPhysics.Copy(this._mtlPhysics); 

        for (var i in this._arrTexID){
			newData._arrTexID[i] = this._arrTexID[i];
        }
        for (var i in this._arrData){
			newData._arrData[i] = this._arrData[i];
        }

    	return newData;
    }
    
	this.Copy = function (data) {  
        this._eMtlType = data._eMtlType; 
        this._mtlPhysics.Copy(data._mtlPhysics);   
        
        this._arrTexID.splice(0, this._arrTexID.length);
		for (var i in data._arrTexID){
			this._arrTexID[i] = data._arrTexID[i];
        }  

        this._arrData.splice(0, this._arrData.length);
		for (var i in data._arrData){
			this._arrData[i] = data._arrData[i];
        }
 	}	
} 

// 材质存储数据
function ADF_MTL_SAVEDATA() {  
    this._uMtlID = -1;				                    // 材质ID
    this._strName = '';                                 // 材质名称  
    this._MtlData = new ADF_MATERIAL();			        //材质数据

    this.Clear = function () { 
        this._uMtlID = -1;
        this._strName = ''; 
        this._MtlData.Clear();                
    }
    
	this.Clone = function () {
        var newData = new ADF_MTL_SAVEDATA();

        newData._uMtlID = this._uMtlID;  
        newData._strName = this._strName;  
        newData._MtlData.Copy(this._MtlData); 

    	return newData;
    }
    
	this.Copy = function (data) {  
        this._uMtlID = data._uMtlID; 
        this._strName = data._strName; 
        this._MtlData.Copy(data._MtlData);  
 	}	
} 

// 材质存储数据管理
function ADF_MTL_SAVEDATAMGR() {  
    this._arrMtlSaveData = new Array();			                        // 纹理数据，存储ADF_MTL_SAVEDATA对象

    this.Clear = function () { 
        this._arrMtlSaveData.splice(0, this._arrMtlSaveData.length);	                
    }
    
	this.Clone = function () {
        var newData = new ADF_MTL_SAVEDATAMGR();

        for (var i in this._arrMtlSaveData){
			newData._arrMtlSaveData[i] = this._arrMtlSaveData[i];
        }

    	return newData;
    }
    
	this.Copy = function (data) {  
        this._arrMtlSaveData.splice(0, this._arrMtlSaveData.length);
		for (var i in data._arrMtlSaveData){
			this._arrMtlSaveData[i] = data._arrMtlSaveData[i];
        }
 	}	
} 

// 摄像机
function ADF_CAMERA() {  
    this._vEyePos = new ADF_BASEFLOAT3();			        // 摄像机位置
    this._vFocus = new ADF_BASEFLOAT3();			        // 摄像机焦点
    this._vUp = new ADF_BASEFLOAT3();			            // 摄像机上方向
    this._fFOVY = 0;				                        // Y方向的视角, Float32
    this._fAspect = 0;				                        // 宽高比, Float32
    this._fZNear = 0;				                        // 近平面, Float32
    this._fZFar = 0;				                        // 远平面, Float32
      
    this.Clear = function () { 
        this._vEyePos.Clear();  
        this._vFocus.Clear();  
        this._vUp.Clear();  
     
        this._fAspect = 0;	
        this._fZNear = 0;	
        this._fZFar = 0;      
    }
    
	this.Clone = function () {
        var newData = new ADF_CAMERA();

        newData._vEyePos.Copy(this._vEyePos); 
        newData._vFocus.Copy(this._vFocus); 
        newData._vUp.Copy(this._vUp); 

        newData._fFOVY = this._fFOVY;  
        newData._fAspect = this._fAspect;  
        newData._fZNear = this._fZNear;  
        newData._fZFar = this._fZFar;  

    	return newData;
    }
    
	this.Copy = function (data) {  
        this._vEyePos.Copy(data._vEyePos);  
        this._vFocus.Copy(data._vFocus);  
        this._vUp.Copy(data._vUp);  

        this._fFOVY = data._fFOVY; 
        this._fAspect = data._fAspect; 
        this._fZNear = data._fZNear; 
        this._fZFar = data._fZFar;       
 	}	
} 

// 关键帧参数数据_自由旋转
function ADF_KEYFRAMEROTATION() {  
    this._vOrigin = new ADF_BASEFLOAT3();			      
    this._vAxis = new ADF_BASEFLOAT3();			      
    this._fRotValue = 0;
      
    this.Clear = function () { 
        this._vOrigin.Clear();  
        this._vAxis.Clear();  
  
        this._fRotValue = 0;      
    }
    
	this.Clone = function () {
        var newData = new ADF_KEYFRAMEROTATION();

        newData._vOrigin.Copy(this._vOrigin); 
        newData._vAxis.Copy(this._vAxis); 
   
        newData._fRotValue = this._fRotValue;  

    	return newData;
    }
    
	this.Copy = function (data) {  
        this._vOrigin.Copy(data._vOrigin);  
        this._vAxis.Copy(data._vAxis);  
  
        this._fRotValue = data._fRotValue;       
 	}	
}

// 关键帧参数
function ADF_KEYPARAMETER() {  
    this._eType = ADFKFT_UNKNOWN;                       // 类型，参考ADF_KEYFRAMETYPE，Int32
    this._rotation = new ADF_KEYFRAMEROTATION();		// 自由旋转	      
    this._vTranslation = new ADF_BASEFLOAT3();          // 平移   	      
      
    this.Clear = function () { 
        this._eType = ADFKFT_UNKNOWN; 
        this._rotation.Clear();  
        this._vTranslation.Clear();  
    }
    
	this.Clone = function () {
        var newData = new ADF_KEYPARAMETER();

        newData._eType = this._eType;  
        newData._rotation.Copy(this._rotation); 
        newData._vTranslation.Copy(this._vTranslation);    
    	return newData;
    }
    
	this.Copy = function (data) {  
        this._eType = data._eType; 
        this._rotation.Copy(data._rotation);  
        this._vTranslation.Copy(data._vTranslation);  
 	}	
}

// 关键帧
// 模型从起始状态,通过局部和全局变换到指定帧号的状态
function ADF_KEYFRAME() {  
    this._uFrameID = 0;                                 // 帧号，Uint32
    this._matStartStatus = new ADF_BASEMATRIX();		// 起始状态  
    this._arrLocalTransform = new Array();			    // 局部变换的关键帧参数(有顺序)，存储ADF_KEYPARAMETER对象
    this._arrGlobalTransform = new Array();			    // 全局变换的关键帧参数(有顺序)，存储ADF_KEYPARAMETER对象 	  
      
    this.Clear = function () { 
        this._uFrameID = 0;  
        this._matStartStatus.Clear();  
        this._arrLocalTransform.splice(0, this._arrLocalTransform.length);
        this._arrGlobalTransform.splice(0, this._arrGlobalTransform.length);
    }
    
	this.Clone = function () {
        var newData = new ADF_KEYFRAME();

        newData._uFrameID = this._uFrameID;  
        newData._matStartStatus.Copy(this._matStartStatus); 
 
        for (var i in this._arrLocalTransform){
			newData._arrLocalTransform[i] = this._arrLocalTransform[i];
        }
        for (var i in this._arrGlobalTransform){
			newData._arrGlobalTransform[i] = this._arrGlobalTransform[i];
        }
    	return newData;
    }
    
	this.Copy = function (data) {  
        this._uFrameID = data._uFrameID; 
        this._matStartStatus.Copy(data._matStartStatus);  

        this._arrLocalTransform.splice(0, this._arrLocalTransform.length);
		for (var i in data._arrLocalTransform){
			this._arrLocalTransform[i] = data._arrLocalTransform[i];
        }

        this._arrGlobalTransform.splice(0, this._arrGlobalTransform.length);
		for (var i in data._arrGlobalTransform){
			this._arrGlobalTransform[i] = data._arrGlobalTransform[i];
        }
 	}	
}

// 摄像机关键帧
function ADF_CAMERA_KEYFRAME() {  
    this._uFrameID = 0;                         // 帧号，Unit32
    this._camera = new ADF_CAMERA();		    // 摄像机数据	      
     
    this.Clear = function () { 
        this._uFrameID = 0
        this._camera.Clear();  
    }
    
	this.Clone = function () {
        var newData = new ADF_CAMERA_KEYFRAME();

        newData._uFrameID = this._uFrameID;  
        newData._camera.Copy(this._camera);       
        return newData;
    }
    
	this.Copy = function (data) {  
        this._uFrameID = data._uFrameID;   
        this._camera.Copy(data._camera);       
 	}	
}

// 摄像机关键帧
function ADF_TRANSPARENCY_KEYFRAME() {  
    this._uFrameID = 0;                         // 帧号，Unit32
    this._fNoTransparency = 0;                  // 非透明度，Float32
      
    this.Clear = function () { 
        this._uFrameID = 0
        this._fNoTransparency = 0 
    }
    
	this.Clone = function () {
        var newData = new ADF_TRANSPARENCY_KEYFRAME();

        newData._uFrameID = this._uFrameID;  
        newData._fNoTransparency = this._fNoTransparency;      
        return newData;
    }
    
	this.Copy = function (data) {  
        this._uFrameID = data._uFrameID;   
        this._fNoTransparency = data._fNoTransparency;     
 	}	
}

// 物件动画存储数据
function ADF_OBJ_ANIM_SAVEDATA() {  
    this._uObjectID = -1;                               // 帧号，Unit32  
    this._arrKeyFrameData = new Array();			    // 物件的关键帧(旋转平移变换)，存储ADF_KEYFRAME对象
    this._arrTranspKeyFrm = new Array();			    // 物件的透明度关键帧，存储ADF_TRANSPARENCY_KEYFRAME对象 	  
       
    this.Clear = function () { 
        this._uObjectID = -1;

        this._arrKeyFrameData.splice(0, this._arrKeyFrameData.length);
        this._arrTranspKeyFrm.splice(0, this._arrTranspKeyFrm.length);
    }
    
	this.Clone = function () {
        var newData = new ADF_OBJ_ANIM_SAVEDATA();

        newData._uObjectID = this._uObjectID;  

        for (var i in this._arrKeyFrameData){
			newData._arrKeyFrameData[i] = this._arrKeyFrameData[i];
        }
        for (var i in this._arrTranspKeyFrm){
			newData._arrTranspKeyFrm[i] = this._arrTranspKeyFrm[i];
        }
    
        return newData;
    }
    
	this.Copy = function (data) {  
        this._uObjectID = data._uObjectID;   

        this._arrKeyFrameData.splice(0, this._arrKeyFrameData.length);
		for (var i in data._arrKeyFrameData){
			this._arrKeyFrameData[i] = data._arrKeyFrameData[i];
        }

        this._arrTranspKeyFrm.splice(0, this._arrTranspKeyFrm.length);
		for (var i in data._arrTranspKeyFrm){
			this._arrTranspKeyFrm[i] = data._arrTranspKeyFrm[i];
        } 
 	}	
}

// 动画存储数据管理
function ADF_ANIM_SAVEDATAMGR() {  
    this._uFrameSize = 0;                               // 时间线长度(单位：帧)，Unit32  
    this._arrObjAnimSaveData = new Array();			    // 物件动画存储数据，存储ADF_OBJ_ANIM_SAVEDATA对象
       
    this.Clear = function () { 
        this._uFrameSize = 0;
        this._arrObjAnimSaveData.splice(0, this._arrObjAnimSaveData.length);
    }
    
	this.Clone = function () {
        var newData = new ADF_ANIM_SAVEDATAMGR();

        newData._uFrameSize = this._uFrameSize;  
        for (var i in this._arrObjAnimSaveData){
			newData._arrObjAnimSaveData[i] = this._arrObjAnimSaveData[i];
        }
    
        return newData;
    }
    
	this.Copy = function (data) {  
        this._uFrameSize = data._uFrameSize;   

        this._arrObjAnimSaveData.splice(0, this._arrObjAnimSaveData.length);
		for (var i in data._arrObjAnimSaveData){
			this._arrObjAnimSaveData[i] = data._arrObjAnimSaveData[i];
        }
 	}	
}

// 摄像机存储数据管理
function ADF_CAMERA_SAVEDATAMGR() {  
    this._DefaultCamera = new ADF_CAMERA();                   // 默认摄像机数据
    this._arrCameraAnimSaveData = new Array();			    // 摄像机关键帧，存储ADF_CAMERA_KEYFRAME对象
       
    this.Clear = function () { 
        this._DefaultCamera.Clear(); 
        this._arrCameraAnimSaveData.splice(0, this._arrCameraAnimSaveData.length);
    }
    
	this.Clone = function () {
        var newData = new ADF_CAMERA_SAVEDATAMGR();

        newData._DefaultCamera.Copy(this._DefaultCamera); 
        for (var i in this._arrCameraAnimSaveData){
			newData._arrCameraAnimSaveData[i] = this._arrCameraAnimSaveData[i];
        }
    
        return newData;
    }
    
	this.Copy = function (data) {  
        this._DefaultCamera.Copy(data._DefaultCamera); 

        this._arrCameraAnimSaveData.splice(0, this._arrCameraAnimSaveData.length);
		for (var i in data._arrCameraAnimSaveData){
			this._arrCameraAnimSaveData[i] = data._arrCameraAnimSaveData[i];
        }
 	}	
}

// 场景系统单位
function ADF_SCENE_UNIT() {  
    this._nLengthUnit = ADF_LENUNITTYPE_UNKOWN;                     // 长度单位,参看枚举型ADF_LENGTHUNITTYPE，Int32
    this._nMassUnit = ADF_MASSUNITTYPE_UNKOWN;;                     // 质量单位,参看枚举型ADF_MASSUNITTYPE，Int32
    this._nTimeUnit = ADF_TIMEUNITTYPE_UNKOWN;                      // 时间单位,参看枚举型ADF_TIMEUNITTYPE，Int32
      
    this.Clear = function () { 
        this._nLengthUnit = ADF_LENUNITTYPE_UNKOWN;
		this._nMassUnit = ADF_MASSUNITTYPE_UNKOWN;
		this._nTimeUnit = ADF_TIMEUNITTYPE_UNKOWN;
    }
    
	this.Clone = function () {
        var newData = new ADF_SCENE_UNIT();

        newData._nLengthUnit = this._nLengthUnit;  
        newData._nMassUnit = this._nMassUnit;   
        newData._nTimeUnit = this._nTimeUnit;    
        return newData;
    }
    
	this.Copy = function (data) {  
        this._nLengthUnit = data._nLengthUnit;   
        this._nMassUnit = data._nMassUnit;   
        this._nTimeUnit = data._nTimeUnit;    
 	}	
}

// 文件信息
function ADF_ResFileInfo() {  
    this.uResID = -1;                                   // 资源ID，UInt32
    this.nType = ADF_FILE_UNKOWN;;                      // 文件类型,参看枚举型ADF_FILETYPE，Int32
    this.strFileName = '';                              // 文件名称
      
    this.Clear = function () { 
        this.uResID = -1;                                  
        this.nType = ADF_FILE_UNKOWN;;                     
        this.strFileName = '';   
    }
    
	this.Clone = function () {
        var newData = new ADF_ResFileInfo();

        newData.uResID = this.uResID;  
        newData.nType = this.nType;   
        newData.strFileName = this.strFileName;    
        return newData;
    }
    
	this.Copy = function (data) {  
        this.uResID = data.uResID;   
        this.nType = data.nType;   
        this.strFileName = data.strFileName;    
 	}	
}

// 文件的操作数据信息
function ADF_FILE_OPINFO() {  
    this._FileInfo = new ADF_ResFileInfo();		            // 文件信息	      
    this._nFileOpType = ADF_FILEOP_INVALID;                 // 文件操作类型,参看类型ADF_FILEOPTYPE, Int32

    this.Clear = function () { 
        this._FileInfo.Clear();  
        this._nFileOpType = ADF_FILEOP_INVALID;
    }
    
	this.Clone = function () {
        var newData = new ADF_FILE_OPINFO();

        newData._FileInfo.Copy(this._FileInfo);  
        newData._nFileOpType = this._nFileOpType;          
        return newData;
    }
    
	this.Copy = function (data) {  
        this._FileInfo.Copy(data._FileInfo);  
        this._nFileOpType = data._nFileOpType;       
 	}	
}

// 资源数据
function CleStreamResFileInfo() {  
    this._name = '';                        // 类型，260字符，长度260*2
    this._size = 0;                         // 长度(单位:字节)，Uint32
    this._reserve = 0;                      // 预留，Uint32
}

// 选项配置数据
function ADF_CONFIG_SAVEDATA() {  
    this._nCameraProjectType = ADFCP_PERSPECTIVE;               // 摄像机投影类型，,参看枚举型ADF_CAMERAPROJECTTYPE，Int32
    this._nCoordsType = ADFCST_RIGHTHAND;;                      // 文坐标系类型,参看枚举型ADF_COORDSYSTYPE，Int32
    this._nSceneUpType = ADFCUT_Y;                              // 场景上方向类型,参看枚举型ADF_CAMERAUPTYPE，Int32
    this._stuSceneUnit = new ADF_SCENE_UNIT();                  // 场景单位
      
    this.Clear = function () { 
        this._nCameraProjectType = ADFCP_PERSPECTIVE;           
        this._nCoordsType = ADFCST_RIGHTHAND;;                    
        this._nSceneUpType = ADFCUT_Y;                            
        this._stuSceneUnit.Clear();  
    }
    
	this.Clone = function () {
        var newData = new ADF_CONFIG_SAVEDATA();

        newData._nCameraProjectType = this._nCameraProjectType;  
        newData._nCoordsType = this._nCoordsType;   
        newData._nSceneUpType = this._nSceneUpType;    

        newData._stuSceneUnit.Copy(this._stuSceneUnit); 
        return newData;
    }
    
	this.Copy = function (data) {  
        this._nCameraProjectType = data._nCameraProjectType;   
        this._nCoordsType = data._nCoordsType;   
        this._nSceneUpType = data._nSceneUpType;   
        this._stuSceneUnit.Copy(data._stuSceneUnit);  
 	}	
}

// 批注属性
function ADF_COMMENTPROPERTY() {
    this._strUserName = '';				    // 用户名称
	this._strDateTime = '';				    // 批注日期时间
	this._uStartFrameID = 0;				// 起始帧号, Unit32
    this._uFrameSize = 0;					// 帧长度, Unit32

    this._nCommentType = 0;					// 批注类型,，Int32，暂时不用
	this._stuCamera = new ADF_CAMERA();		// 批注摄像机数据，暂时不用，批注信息 “正对屏幕” 即可
    
    this.Clear = function () { 
        this._strUserName = '';	
	    this._strDateTime = '';	
	    this._nCommentType = 0;
	
        this._camera.Clear();  
        this._stuCamera._vUp.y = 1.0;
        this._stuCamera._vFocus.z = -1.0;        
        this._uStartFrameID = 0;
        this._uFrameSize = 0;	
    }

    this.Clone = function () {
        var newData = new ADF_COMMENTPROPERTY();

        newData._strUserName = this._strUserName;	
	    newData._strDateTime = this._strDateTime;	
	    newData._nCommentType = this._nCommentType;
        newData._camera.Copy(this._camera);         
        newData._uStartFrameID = this._uStartFrameID;
        newData._uFrameSize = this._uFrameSize;	
      
        return newData;
    }

    this.Copy = function (data) {  

        this._strUserName = data._strUserName;	
	    this._strDateTime = data._strDateTime;	
	    this._nCommentType = data._nCommentType;
        this._camera.Copy(data._camera);         
        this._uStartFrameID = data._uStartFrameID;
        this._uFrameSize = data._uFrameSize;  
 	}	
}

// 文本样式
function ADF_TextStyle() {
	this.strFont = 'simfang';           // 字体
	this.fHeight = 3.5;                 // 高度值 ,float
	this.fWidth = 0.67;                 // 宽度比值,float
	this.fThickness = 0.0;              // 文本的线厚度,float
	this.fSlant = 0.00;                 // 倾斜角度（按顺时针方向）,float
	this.bUnderline = true;             // 加下划线, Int32
	this.nHorJust = 1;                  // 水平, Int32
	this.nVerJust = 1;                  // 垂直, Int32
	this.bMirror = false;               // 镜像, Int32
	this.bReadonly = false;             // 只读属性, Int32
    this.fLineSpace = 0.2;              // 行间距因子（行间距=行高*行间距因子）
}

// 注释信息
function ADF_NoteInfo() {
    this.attachPos = new ADF_BASEFLOAT3();          // 放置位置， ADF_BASEFLOAT3类型
    this.arrLeaderPos = new Array();                // 引线位置， ADF_BASEFLOAT3类型，模型移动需要随着变化，所以显示时，要把世界坐标改变屏幕坐标 			   
    this.strText = '';					            // 注释
    
	this.strText2 = '';					            // 注释2，暂时不用
	this.textStyle = new ADF_TextStyle();			// 文本样式，暂时不用
	this.nArrowStyle = 0;					        // 箭头，Int32, 暂时不用
	this.nLeaderStyle;					            // 引线方式，Int32, 暂时不用
	this.fElbowLength = 0.0;					    // 引线折弯长度，float, 暂时不用
	this.nTextDir = -1;						        // 文本方向，Int32, 暂时不用
	this.strReserve = '';					        // 保留参数，暂时不用

    this.Clear = function () { 
        this.attachPos.Clear();  
        this.arrLeaderPos.splice(0, this.arrLeaderPos.length);
        this.strText = ''; 
    }
    
    this.Clone = function () {
        var newData = new ADF_NoteInfo();

        newData.attachPos.Copy(this.attachPos);         
        for (var i in this.arrLeaderPos){
			newData.arrLeaderPos[i] = this.arrLeaderPos[i];
        }

        newData.strText = this.strText;

    	return newData;
    }

    this.Copy = function (data) {  
        this.attachPos.Copy(data.attachPos);  

        this.arrLeaderPos.splice(0, this.arrLeaderPos.length);
		for (var i in data.arrLeaderPos){
			this.arrLeaderPos[i] = data.arrLeaderPos[i];
        } 
        this.strText = data.strText;
 	}	
}

// 标注
function ADF_Annotation() {
    this.uID = -1;					        // 标注ID, UInt32
    this.pNote = new ADF_NoteInfo();		// 注释集

	this.strOriAnnotID = '';		        // 标注原始ID(从CAD导出时的标注ID,用于原CAD标注更新当前标注), 暂时不用
	this.nType = 0;					        // 标注类型,参看枚举型AnnotationType, 暂时不用
	this.strName = '';				        // 名称,暂时不用
	this.annoPlaneLocal;	                // 标注的局部注释平面，4*3个float, 暂时不用
	this.annoRenderProp;	                // 标注的渲染属性， 3个Int32, 暂时不用
	this.uMtlID = -1;					    // 材质ID, UInt32, 暂时不用

    this.Clear = function () { 
        this.uID = -1
        this.pNote.Clear();  
    }

    this.Clone = function () {
        var newData = new ADF_Annotation();

        newData.uID = this.uID;
        newData.pNote.Copy(this.pNote); 

    	return newData;
    }

    this.Copy = function (data) {  
        this.uID = data.uID;
        this.pNote.Copy(data.pNote);         
 	}	
}

// 批注
function ADF_COMMENT() {
    this.stuAnnot = new ADF_Annotation();		        // 标注数据
    this.stuProperty = new ADF_COMMENTPROPERTY();		// 批注属性

    this.Clear = function () { 
        this.stuAnnot.Clear();  
        this.stuProperty.Clear();  
    }

    this.Clone = function () {
        var newData = new ADF_COMMENT();

        newData.stuAnnot.Copy(this.stuAnnot); 
        newData.stuProperty.Copy(this.stuProperty); 

    	return newData;
    }

    this.Copy = function (data) {  
        this.stuAnnot.Copy(data.stuAnnot);  
        this.stuProperty.Copy(data.stuProperty);        
 	}
}

// 场景数据
function ADF_SCENEDATA() {  
    this.arrModelData = new Array();			                    // 模型集，存储ADF_MODEL_OPINFO对象
    this.stuObjTreeTopNode = new ADF_OBJ_TREENODE();                // 模型树顶层节点       
    this.stuObjSaveDataMgr = new ADF_OBJ_SAVEDATAMGR();             // 物件数据集
    this.stuMtlSaveDataMgr = new ADF_MTL_SAVEDATAMGR();             // 材质数据集
    this.stuAnimSaveDataMgr = new ADF_ANIM_SAVEDATAMGR();           // 动画存储数据集
    this.stuCameraSaveDataMgr = new ADF_CAMERA_SAVEDATAMGR();       // 动画存储数据集
    this.stuConfig = new ADF_CONFIG_SAVEDATA();                     // 配置选项数据
    this.stuTimeNodeTreeTop = new ADF_TIMENODE();                   // 时间节点树(工艺规程)顶层节点
    this.stuSceneParam = new ADF_PARAMETER_SAVEDATA();              // 场景参数数据
    this.arrImageFile = new Array();			                    // 图像文件数据集，存储ADF_FILE_OPINFO对象
    this.arrAudioFile = new Array();			                    // 音频文件数据集，存储ADF_FILE_OPINFO对象
    this.arrResFile = new Array();			                        // 资源数据集，存储CleStreamResFileInfo对象
    this.arrComment = new Array();			                        // 资源数据集，存储ADF_COMMENT对象

    this.Clear = function () { 
        this.arrModelData.splice(0, this.arrModelData.length);

        this.stuObjTreeTopNode.Clear(); 
        this.stuObjSaveDataMgr.Clear(); 
        this.stuMtlSaveDataMgr.Clear(); 
        this.stuAnimSaveDataMgr.Clear(); 
        this.stuCameraSaveDataMgr.Clear(); 
        this.stuConfig.Clear(); 
        this.stuTimeNodeTreeTop.Clear(); 
        this.stuSceneParam.Clear(); 
        this.arrImageFile.splice(0, this.arrImageFile.length);
        this.arrAudioFile.splice(0, this.arrAudioFile.length);
        this.arrResFile.splice(0, this.arrResFile.length);
        this.arrComment.splice(0, this.arrComment.length);
    }
}
