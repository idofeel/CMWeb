//===================================================================================================

// CLE数据流的数据集类型
// 系统数据集
let	CSDST_SYS_NULL = 0;			        // 位置类型
let	CSDST_SYS_MODEL = 1;			    // 模型集
let	CSDST_SYS_LODMODEL = 2;				// LOD模型数据集
let	CSDST_SYS_MODELTREE = 3;			// 模型树
let	CSDST_SYS_OBJECT = 4;				// 物件数据
let	CSDST_SYS_MATERIAL = 5;				// 材质数据
let	CSDST_SYS_ANIMATION = 6;			// 动画数据
let	CSDST_SYS_CAMERA = 7;				// 摄像机数据
let	CSDST_SYS_CONFIG = 8;				// 配置选项数据
let	CSDST_SYS_TIMENODETREE = 9;			// 时间节点树(工艺规程)
let	CSDST_SYS_SCENEPARAM = 10;			// 场景参数数据
let	CSDST_SYS_IMAGEFILEINFO = 11;		// 图片文件信息
let	CSDST_SYS_AUDIOFILEINFO = 12;		// 音频文件信息
let	CSDST_SYS_DOCFILEINFO = 13;			// 文档文件信息
let	CSDST_SYS_VIDEOFILEINFO = 14;		// 视频文件信息
let	CSDST_SYS_COMMENT = 15;				// 批注数据

// 系统内部使用的数据集
let	CSDST_SYS_MODELDATA = 1001;			// 模型数据
let	CSDST_SYS_ANNOTATIONDATA = 1002;	// 标注(单个)数据
let	CSDST_SYS_END = 10000;				// 系统数据集类型的终止编号
let	CSDST_RES_FILE = 10001;				// 文件

//===================================================================================================

// CLE数据流的数据集描述
function CleStreamDataSetDesc() {  
    this._type = CSDST_SYS_NULL;            // 类型，参看枚举型CSDataSetType，Int32
    this._size = 0;                         // 长度(单位:字节)，Uint32
}

// 资源文件个数
var g_nResFileCount = 0;
// 资源文件的存储路径
var g_strResbaseUrl;

//===================================================================================================

// cle数据存储
var g_arrayCleBuffer;
// 总长度，Uint32
var g_nCleBufferlength = 0;

//===================================================================================================

// cle数据流
function ADFCleParser() {
    // 读取的当前位置，Uint32
    this._cur_pos = 0;
    // 当前cle文件的版本号
    this._curVersion = 0;                             
 
    this.parseStreamADF_INT = function(){
        var dataView = new DataView(g_arrayCleBuffer, this._cur_pos, 4);
        this._cur_pos += 4;
        return dataView.getInt32(0, true);	
    }
    
    this.parseStreamADF_UINT = function(){
        var dataView = new DataView(g_arrayCleBuffer, this._cur_pos, 4);
        this._cur_pos += 4;
        return dataView.getUint32(0, true);	
    }
    
    this.parseStreamADF_FLOAT = function(){
        var dataView = new DataView(g_arrayCleBuffer, this._cur_pos, 4);
        this._cur_pos += 4;
        return dataView.getFloat32(0, true);
    }

    this.parseStreamADF_DOUBLE = function(){
        var dataView = new DataView(g_arrayCleBuffer, this._cur_pos, 8);
        this._cur_pos += 8;
        return dataView.getFloat64(0, true);
    }

    this.parseStreamADF_BASEUINT2 = function(data){
        var dataView = new DataView(g_arrayCleBuffer, this._cur_pos, 4*2);
        this._cur_pos += 4*2;
        data.x = dataView.getUint32(0, true);
        data.y = dataView.getUint32(4, true);
    }

    this.parseStreamADF_BASEFLOAT2 = function(data){
        var dataView = new DataView(g_arrayCleBuffer, this._cur_pos, 4*2);
        this._cur_pos += 4*2;
        data.x = dataView.getFloat32(0, true);
        data.y = dataView.getFloat32(4, true);        
    }

    this.parseStreamADF_BASEFLOAT3 = function(data){
        var dataView = new DataView(g_arrayCleBuffer, this._cur_pos, 4*3);
        this._cur_pos += 4*3;
        data.x = dataView.getFloat32(0, true);
        data.y = dataView.getFloat32(4, true);   
        data.z = dataView.getFloat32(8, true); 
    }

    this.parseStreamADF_BASEFLOAT4 = function(data){
        var dataView = new DataView(g_arrayCleBuffer, this._cur_pos, 4*4);
        this._cur_pos += 4*4;
        data.x = dataView.getFloat32(0, true);
        data.y = dataView.getFloat32(4, true);   
        data.z = dataView.getFloat32(8, true); 
        data.w = dataView.getFloat32(12, true); 
    }

    this.parseStreamADF_BASETRIANGLE = function(data){
        var dataView = new DataView(g_arrayCleBuffer, this._cur_pos, 4*3*3);
        this._cur_pos += 4*3*3;

        var tempCus = 0;
        data.p1.x = dataView.getFloat32(tempCus, true);
        tempCus += 4;
        data.p1.y = dataView.getFloat32(tempCus, true);
        tempCus += 4;   
        data.p1.z = dataView.getFloat32(tempCus, true);
        tempCus += 4;

        data.p2.x = dataView.getFloat32(tempCus, true);
        tempCus += 4;
        data.p2.y = dataView.getFloat32(tempCus, true);
        tempCus += 4;   
        data.p2.z = dataView.getFloat32(tempCus, true);
        tempCus += 4;

        data.p3.x = dataView.getFloat32(tempCus, true);
        tempCus += 4;
        data.p3.y = dataView.getFloat32(tempCus, true);
        tempCus += 4;   
        data.p3.z = dataView.getFloat32(tempCus, true);
    }

    this.parseStreamADF_BASEMATRIX = function(data){
        var dataView = new DataView(g_arrayCleBuffer, this._cur_pos, 4*4*4);
        this._cur_pos += 4*4*4;

        var tempCus = 0;
        data._11 = dataView.getFloat32(tempCus, true);
        tempCus += 4;
        data._12 = dataView.getFloat32(tempCus, true);
        tempCus += 4;   
        data._13 = dataView.getFloat32(tempCus, true);
        tempCus += 4;
        data._14 = dataView.getFloat32(tempCus, true);
        tempCus += 4;

        data._21 = dataView.getFloat32(tempCus, true);
        tempCus += 4;
        data._22 = dataView.getFloat32(tempCus, true);
        tempCus += 4;   
        data._23 = dataView.getFloat32(tempCus, true);
        tempCus += 4;
        data._24 = dataView.getFloat32(tempCus, true);
        tempCus += 4;

        data._31 = dataView.getFloat32(tempCus, true);
        tempCus += 4;
        data._32 = dataView.getFloat32(tempCus, true);
        tempCus += 4;   
        data._33 = dataView.getFloat32(tempCus, true);
        tempCus += 4;
        data._34 = dataView.getFloat32(tempCus, true);
        tempCus += 4;

        data._41 = dataView.getFloat32(tempCus, true);
        tempCus += 4;
        data._42 = dataView.getFloat32(tempCus, true);
        tempCus += 4;   
        data._43 = dataView.getFloat32(tempCus, true);
        tempCus += 4;
        data._44 = dataView.getFloat32(tempCus, true);
    }

    this.parseStreamADF_BASEDOUBLE2 = function(data){
        var dataView = new DataView(g_arrayCleBuffer, this._cur_pos, 8*2);
        this._cur_pos += 8*2;
        data.x = dataView.getFloat64(0, true);
        data.y = dataView.getFloat64(8, true);  
    }

    this.parseStreamADF_BASEDOUBLE3 = function(data){
        var dataView = new DataView(g_arrayCleBuffer, this._cur_pos, 8*3);
        this._cur_pos += 8*3;
        data.x = dataView.getFloat64(0, true);
        data.y = dataView.getFloat64(8, true);   
        data.z = dataView.getFloat64(16, true); 
    }

    this.parseStreamADF_BASEDOUBLE4 = function(data){
        var dataView = new DataView(g_arrayCleBuffer, this._cur_pos, 8*4);
        this._cur_pos += 8*4;
        data.x = dataView.getFloat64(0, true);
        data.y = dataView.getFloat64(8, true);   
        data.z = dataView.getFloat64(16, true); 
        data.w = dataView.getFloat64(24, true); 
    }    

    this.parseStreamADF_BASEMATRIXD = function(data){
        var dataView = new DataView(g_arrayCleBuffer, this._cur_pos, 8*4*4);
        this._cur_pos += 8*4*4;

        var tempCus = 0;
        data._11 = dataView.getFloat64(tempCus, true);
        tempCus += 8;
        data._12 = dataView.getFloat64(tempCus, true);
        tempCus += 8;   
        data._13 = dataView.getFloat64(tempCus, true);
        tempCus += 8;
        data._14 = dataView.getFloat64(tempCus, true);
        tempCus += 8;

        data._21 = dataView.getFloat64(tempCus, true);
        tempCus += 8;
        data._22 = dataView.getFloat64(tempCus, true);
        tempCus += 8;   
        data._23 = dataView.getFloat64(tempCus, true);
        tempCus += 8;
        data._24 = dataView.getFloat64(tempCus, true);
        tempCus += 8;

        data._31 = dataView.getFloat64(tempCus, true);
        tempCus += 8;
        data._32 = dataView.getFloat64(tempCus, true);
        tempCus += 8;   
        data._33 = dataView.getFloat64(tempCus, true);
        tempCus += 8;
        data._34 = dataView.getFloat64(tempCus, true);
        tempCus += 8;

        data._41 = dataView.getFloat64(tempCus, true);
        tempCus += 8;
        data._42 = dataView.getFloat64(tempCus, true);
        tempCus += 8;   
        data._43 = dataView.getFloat64(tempCus, true);
        tempCus += 8;
        data._44 = dataView.getFloat64(tempCus, true);
    }

    this.parseStreamADF_WString = function(){
        var dataCountView = new DataView(g_arrayCleBuffer, this._cur_pos, 4);
        this._cur_pos += 4;
        var nSrcLen = dataCountView.getInt32(0, true);  
        if (nSrcLen == 0) {
            return '';
        }
        else{
            var dvTextReader = new Uint16Array(g_arrayCleBuffer, this._cur_pos, nSrcLen-1);
            this._cur_pos += nSrcLen*2;
            return String.fromCharCode.apply(null, dvTextReader);
        }
    }

    // 平面
    this.parseStreamADF_PlaneData = function(data){
        this.parseStreamADF_BASEFLOAT3(data.vAxisX);
        this.parseStreamADF_BASEFLOAT3(data.vAxisY);
        this.parseStreamADF_BASEFLOAT3(data.vAxisZ);
        this.parseStreamADF_BASEFLOAT3(data.vOrigin);
    }

    // 圆柱面
    this.parseStreamADF_CylinderData = function(data){
        this.parseStreamADF_BASEFLOAT3(data.vAxisX);
        this.parseStreamADF_BASEFLOAT3(data.vAxisY);
        this.parseStreamADF_BASEFLOAT3(data.vAxisZ);
        this.parseStreamADF_BASEFLOAT3(data.vOrigin);
        data.radius = this.parseStreamADF_FLOAT();
    }

    // 圆锥面
    this.parseStreamADF_ConeData = function(data){
        this.parseStreamADF_BASEFLOAT3(data.vAxisX);
        this.parseStreamADF_BASEFLOAT3(data.vAxisY);
        this.parseStreamADF_BASEFLOAT3(data.vAxisZ);
        this.parseStreamADF_BASEFLOAT3(data.vOrigin);
        data.alpha = this.parseStreamADF_FLOAT();
    }

    // 圆环面
    this.parseStreamADF_TorusData = function(data){
        this.parseStreamADF_BASEFLOAT3(data.vAxisX);
        this.parseStreamADF_BASEFLOAT3(data.vAxisY);
        this.parseStreamADF_BASEFLOAT3(data.vAxisZ);
        this.parseStreamADF_BASEFLOAT3(data.vOrigin);
        data.radius1 = this.parseStreamADF_FLOAT();
        data.radius2 = this.parseStreamADF_FLOAT();
    }

    // 旋转面
    this.parseStreamADF_RevolveData = function(data){
        this.parseStreamADF_BASEFLOAT3(data.vAxisX);
        this.parseStreamADF_BASEFLOAT3(data.vAxisY);
        this.parseStreamADF_BASEFLOAT3(data.vAxisZ);
        this.parseStreamADF_BASEFLOAT3(data.vOrigin);
    }
    
    // 列表柱面
    this.parseStreamADF_TabCylData = function(data){
        this.parseStreamADF_BASEFLOAT3(data.vAxisX);
        this.parseStreamADF_BASEFLOAT3(data.vAxisY);
        this.parseStreamADF_BASEFLOAT3(data.vAxisZ);
        this.parseStreamADF_BASEFLOAT3(data.vOrigin);
    }

    // 球面
    this.parseStreamADF_SphereData = function(data){
        this.parseStreamADF_BASEFLOAT3(data.vAxisX);
        this.parseStreamADF_BASEFLOAT3(data.vAxisY);
        this.parseStreamADF_BASEFLOAT3(data.vAxisZ);
        this.parseStreamADF_BASEFLOAT3(data.vOrigin);
        data.radius = this.parseStreamADF_FLOAT();
    }

    // 面的形状数据
    this.parseStreamADF_Surface = function(data){
        data.nID  = this.parseStreamADF_INT();
        data.nType  = this.parseStreamADF_INT();

        switch (data.nType)
        {
        case ADF_SURFT_PLANE:       // 平面
            data.Surfacedata.plane = new ADF_PlaneData();
            this.parseStreamADF_PlaneData(data.Surfacedata.plane);
            break;
        case ADF_SURFT_CYLINDER:    // 圆柱面
            data.Surfacedata.cylinder = new ADF_CylinderData();
            this.parseStreamADF_CylinderData(data.Surfacedata.cylinder);
            break;
        case ADF_SURFT_CONE:        // 圆锥面
            data.Surfacedata.cone = new ADF_ConeData();
            this.parseStreamADF_ConeData(data.Surfacedata.cone);
            break;
        case ADF_SURFT_TORUS:       // 圆环面
            data.Surfacedata.torus = new ADF_TorusData();
            this.parseStreamADF_TorusData(data.Surfacedata.torus);  
            break;
        case ADF_SURFT_REVOLVE:     // 旋转面
            data.Surfacedata.revolve = new ADF_RevolveData();
            this.parseStreamADF_RevolveData(data.Surfacedata.revolve); 
            break;
        case ADF_SURFT_TABCYL:      // 列表柱面
            data.Surfacedata.tabcyl = new ADF_TabCylData();
            this.parseStreamADF_TabCylData(data.Surfacedata.tabcyl);
            break;
        case ADF_SURFT_SPHERE:      // 球面
            data.Surfacedata.sphere = new ADF_SphereData();
            this.parseStreamADF_SphereDataa(data.Surfacedata.sphere);
            break;
        default:
            break;
        }
        
        var nTempt = this.parseStreamADF_INT();
        if (nTempt != 0){
            data.bIsTopological = true;
        }
        else{
            data.bIsTopological = false;
        }        
    }

    // 直线
    this.parseStreamADF_LineData = function(data){
        this.parseStreamADF_BASEFLOAT3(data.end1);
        this.parseStreamADF_BASEFLOAT3(data.end2);
    }

    // 圆弧
    this.parseStreamADF_ArcData = function(data){
        this.parseStreamADF_BASEFLOAT3(data.vOrigin);
        this.parseStreamADF_BASEFLOAT3(data.vVector1);
        this.parseStreamADF_BASEFLOAT3(data.vVector2);

        data.fStartAngle = this.parseStreamADF_FLOAT();
        data.fEndAngle = this.parseStreamADF_FLOAT();
        data.fRadius = this.parseStreamADF_FLOAT();
    }

    // 曲线的形状数据
    this.parseStreamADF_Curve = function(data){
        data.nID  = this.parseStreamADF_INT();
        data.nType  = this.parseStreamADF_INT();

        switch (data.nType)
        {
        case ADF_CURVT_LINE:
            data.curvedata.line = new ADF_LineData();
            this.parseStreamADF_LineData(data.curvedata.line);
            break;
        case ADF_CURVT_ARC:
            data.curvedata.arc = new ADF_ArcData();
            this.parseStreamADF_ArcData(data.curvedata.arc);
            break;
        default:
            break;
        }
    
        var nTempt = this.parseStreamADF_INT();
        if (nTempt != 0){
            data.bIsTopological = true;
        }
        else{
            data.bIsTopological = false;
        } 
    }

    // 二维直线
    this.parseStreamADF_Line2D = function(data){
        this.parseStreamADF_BASEFLOAT2(data.start);
        this.parseStreamADF_BASEFLOAT2(data.end);
    }

    // 二维圆弧
    this.parseStreamADF_Arc2D = function(data){
        this.parseStreamADF_BASEFLOAT2(data.center);
        this.parseStreamADF_BASEFLOAT2(data.axisX);

        data.fRadius = this.parseStreamADF_FLOAT();
        data.fStartAngle = this.parseStreamADF_FLOAT();
        data.fEndAngle = this.parseStreamADF_FLOAT();
    }

    // 二维多边形填充
    this.parseStreamADF_Polygon2D = function(data){
        var nCount  = this.parseStreamADF_UINT();

        for (var i  = 0; i < nCount; i++){
            data.arrPoints[i] = new ADF_BASEFLOAT2();
            this.parseStreamADF_BASEFLOAT2(data.arrPoints[i]);
        }        
    }

    // 二维曲线数据信息
    this.parseStreamADF_Curve2D = function(data){
        data.nID  = this.parseStreamADF_INT();
        data.nType  = this.parseStreamADF_INT();

        switch (data.nType)
        {
        case ADF_2DCURVT_LINE:          // 直线
            data.stuLine = new ADF_Line2D();
            this.parseStreamADF_Line2D(data.stuLine);
            break;
        case ADF_2DCURVT_ARC:           // 圆弧
            data.stuArc = new ADF_Arc2D();
            this.parseStreamADF_Arc2D(data.stuArc);
            break;
        case ADF_2DCURVT_POLYGON:       // 多边形
            data.stuPolygon = new ADF_Polygon2D();
            this.parseStreamADF_Polygon2D(data.stuPolygon);
            break;
        default:
            break;
        }       
    }

    // 立方体包围盒
    this.parseStreamADF_BBOX = function(data){
        this.parseStreamADF_BASEFLOAT3(data._min);
        this.parseStreamADF_BASEFLOAT3(data._max);
    }

    // 球形包围盒
    this.parseStreamADF_BSPHERE = function(data){
        this.parseStreamADF_BASEFLOAT3(data._center);
        data._radius = this.parseStreamADF_FLOAT();
    }

    // 坐标系(单精)
    this.parseStreamADF_COORDSYSTEM = function(data){
        // 坐标系原点
        this.parseStreamADF_BASEFLOAT3(data._vOrigin);
        // 坐标系X轴向量
        this.parseStreamADF_BASEFLOAT3(data._vAxisX);
        // 坐标系Y轴向量(坐标系Z轴向量,由X向量叉乘Y向量获得)
        this.parseStreamADF_BASEFLOAT3(data._vAxisY);
    }

    // 坐标系(双精)
    this.parseStreamADF_COORDSYSTEMD = function(data){
        // 坐标系原点
        this.parseStreamADF_BASEDOUBLE3(data._vOrigin);
        // 坐标系X轴向量
        this.parseStreamADF_BASEDOUBLE3(data._vAxisX);
        // 坐标系Y轴向量(坐标系Z轴向量,由X向量叉乘Y向量获得)
        this.parseStreamADF_BASEDOUBLE3(data._vAxisY);
    }

    // 参数数值
    this.parseStreamADF_PARAMETERVALUE = function(data){

        data._nType  = this.parseStreamADF_INT();

        switch (data._nType)
        {
        case ADF_PARAMT_INT:
            data._nValue  = this.parseStreamADF_INT();
            break;
        case ADF_PARAMT_FLOAT:
            data._fValue  = this.parseStreamADF_FLOAT();
            break;
        case ADF_PARAMT_DOUBLE:
            data._dValue  = this.parseStreamADF_DOUBLE();
            break;
        case ADF_PARAMT_STRING:
            data._strValue  = this.parseStreamADF_WString();
            break;
        case ADF_PARAMT_FLOAT3:
            data._vFloat3Value = new ADF_BASEFLOAT3();
            this.parseStreamADF_BASEFLOAT3(data._vFloat3Value);
            break;
        case ADF_PARAMT_DOUBLE3:
            data._vDouble3Value = new ADF_BASEDOUBLE3();
            this.parseStreamADF_BASEDOUBLE3(data._vDouble3Value);
            break;
        case ADF_PARAMT_BOOL:
            {
                var nTempt = this.parseStreamADF_INT();
                if (nTempt != 0){
                    data._bValue = true;
                }
                else{
                    data._bValue = false;
                } 
                break;
            }
        default:
            break;
        }
    }

    // 参数
    this.parseStreamADF_PARAMETER = function(data){
        data._strName  = this.parseStreamADF_WString();
        this.parseStreamADF_PARAMETERVALUE(data._stuValue);
    }

    // 摄像机
    this.parseStreamADF_CAMERA = function(data){
        this.parseStreamADF_BASEFLOAT3(data._vEyePos);
        this.parseStreamADF_BASEFLOAT3(data._vFocus);
        this.parseStreamADF_BASEFLOAT3(data._vUp);

        data._fFOVY = this.parseStreamADF_FLOAT();
        data._fAspect = this.parseStreamADF_FLOAT();
        data._fZNear = this.parseStreamADF_FLOAT();
        data._fZFar = this.parseStreamADF_FLOAT();
    }

    // 文件信息
    this.parseStreamADF_ResFileInfo = function(data){
        data.uResID = this.parseStreamADF_UINT();
        data.nType = this.parseStreamADF_INT();
        data.strFileName = this.parseStreamADF_WString();
    }

    // 文件的操作数据信息
    this.parseStreamADF_FILE_OPINFO = function(data){
        this.parseStreamADF_ResFileInfo(data._FileInfo);
        data._nFileOpType = this.parseStreamADF_INT();
    } 
    
    // 模型子集数据
    this.parseStreamADF_MODELSUBSET_SAVEDATA = function(data){
        data._nPrimitType = this.parseStreamADF_INT();
        data._uStartIndex = this.parseStreamADF_UINT();
        data._uIndexCount = this.parseStreamADF_UINT();
        this.parseStreamADF_BBOX(data._box);
        data._nSubsetType = this.parseStreamADF_INT();
        data._uGeomIndex = this.parseStreamADF_UINT();
    } 

    // 模型数据
    this.CleStreamModelDataParser = function(data){
        // 版本号
        var modelVersion = this.parseStreamADF_INT();

        var nVertexDataStartIndex = this._cur_pos;

        // 跳过顶点数据的解析
        var sizeByte = this.parseStreamADF_UINT();
        this._cur_pos += sizeByte;
          
        // 索引组，组内3个元素为一组(三角片)或2个元素为一组(线段)
        sizeByte = this.parseStreamADF_UINT(); 
        nCount = sizeByte / 4; // 4表示sizeof(Uint32)

        // 存储Uint32类型
        data._arrIndexData = new Uint32Array(nCount);
        for (var i = 0; i < nCount; i++){
            data._arrIndexData[i] = this.parseStreamADF_UINT();
        }
    
        // 子集数据
        var nSubsetStartIndex = this._cur_pos;      
        var nCount = this.parseStreamADF_UINT();
        for (var i = 0; i < nCount; i++){
            data._arrSubset[i] = new ADF_MODELSUBSET_SAVEDATA();
            this.parseStreamADF_MODELSUBSET_SAVEDATA(data._arrSubset[i]);
        }
        var nSubsetCount = this._cur_pos - nSubsetStartIndex;

        // 重新定位数据位置
        this._cur_pos = nVertexDataStartIndex;
        // 顶点数据(每个顶点包含8个ADF_FLOAT(3个位置+3个法矢向量+2纹理坐标))
        sizeByte = this.parseStreamADF_UINT();
        var tempPos = this._cur_pos;
        // 计算有效三角面片数量
        var partVertexNum = 0;
        for (var i = 0; i < data._arrSubset.length; i++){
            if (data._arrSubset[i]._nPrimitType == ADFPT_TRIANGLELIST){
                partVertexNum += data._arrSubset[i]._uIndexCount;
            }
        }
        data._arrVertexData = new Float32Array(partVertexNum * 8);
        var pos = 0;
        for (var i = 0; i < data._arrSubset.length; i++){
            if (data._arrSubset[i]._nPrimitType == ADFPT_TRIANGLELIST){
                for (var j = 0; j < data._arrSubset[i]._uIndexCount; j++){
                    var index = data._arrIndexData[data._arrSubset[i]._uStartIndex + j];
                    this._cur_pos = tempPos + 8 * index * 4;
                    for (var k=0; k<8; k++) {
                        data._arrVertexData[pos++] = this.parseStreamADF_FLOAT();
                    }
                }
            }
        }
   
        // 跳过子集数据的解析
        this._cur_pos = nSubsetStartIndex + nSubsetCount;

        // 曲面数据
        nCount = this.parseStreamADF_UINT();
        for (var i = 0; i < nCount; i++){
            data._arrSurface[i] = new ADF_Surface();
            this.parseStreamADF_Surface(data._arrSurface[i]);
        }
    
        // 曲线数据
        nCount = this.parseStreamADF_UINT();
        for (var i = 0; i < nCount; i++){
            data._arrCurve[i] = new ADF_Curve();
            this.parseStreamADF_Curve(data._arrCurve[i]);
        }

        // 模型包围盒
        this.parseStreamADF_BBOX(data._box);
    }

    // 模型集
    this.CleStreamModelSetParser = function(data){
        // 版本号
        var modelVersion = this.parseStreamADF_INT();
 
        var size = this.parseStreamADF_UINT();
        for (var i = 0; i < size; i++){
            data[i] = new ADF_MODEL_OPINFO();

            // 模型信息
            data[i]._ModelInfo._uModelID = this.parseStreamADF_INT();
            data[i]._ModelInfo._strModelName = this.parseStreamADF_WString();
            data[i]._ModelInfo._strModelFilePath = this.parseStreamADF_WString();
            this.CleStreamModelDataParser(data[i]._ModelInfo._stuModelData);

            // 文件操作类型,参看类型ADF_FILEOPTYPE， Int32
            data[i]._nFileOpType = this.parseStreamADF_INT();
        }  
    } 

    // 模型树
    this.CleStreamModelTreeParser = function(data){
        data._uTreeNodeID = this.parseStreamADF_UINT();
        data._uObjectID = this.parseStreamADF_UINT();
        data._strName = this.parseStreamADF_WString();
        this.parseStreamADF_BASEMATRIX(data._matTranform);

        // 参数信息，存储ADF_PARAMETER对象
        var nCount = this.parseStreamADF_UINT(); 
        for (var i = 0; i < nCount; i++){
            data._arrParamData[i] = new ADF_PARAMETER();
            this.parseStreamADF_PARAMETER(data._arrParamData[i]);
        }

        // 子节点信息，存储ADF_OBJ_TREENODE对象 
        nCount = this.parseStreamADF_UINT();  
        for (var i = 0; i < nCount; i++){
            data._arrSubNode[i] = new ADF_OBJ_TREENODE();
            this.CleStreamModelTreeParser(data._arrSubNode[i]);
        }	        
    } 

    // 产品信息
    this.CleStreamProductInfo = function(data){
        this.parseStreamADF_BASEFLOAT3(data.vCenterOfMass);         // 质心
        data.dMass = this.parseStreamADF_DOUBLE();                  // 质量
        data.dVolume = this.parseStreamADF_DOUBLE();                // 体积
        data.dSurfaceArea = this.parseStreamADF_DOUBLE();           // 表面积
        
    }

    // 物件存储数据
    this.CleStreamObjSaveData = function(data){
        data._uObjectID = this.parseStreamADF_UINT();       // 物件ID
        data._uMeshID = this.parseStreamADF_UINT();         // 物件对应模型Mesh的ID
        this.parseStreamADF_BASEMATRIX(data._matLocal);     // 局部矩阵
        this.parseStreamADF_BASEMATRIX(data._matWorld);     // 世界矩阵
        this.CleStreamProductInfo(data._ProductInfo);       // 产品信息

        data._nReverse1 = this.parseStreamADF_INT();        // 预留1
        data._nFillMode = this.parseStreamADF_INT();        // 渲染实体填充方式
        data._nCullMode = this.parseStreamADF_INT();        // 渲染剪裁方式
        data._nReverse4 = this.parseStreamADF_INT();        // 预留4
            
        // 物件子集的材质ID
        var size = this.parseStreamADF_UINT()/4;  
        for (var i = 0; i < size; i++){
            data._arrSubsetMtlID[i] = this.parseStreamADF_UINT();  
        }	

        // 物件子集的扩展材质ID(第二套材质数据) 
        size = this.parseStreamADF_UINT()/4;  
        for (var i = 0; i < size; i++){
            data._arrSubsetMtlID_Ex[i] = this.parseStreamADF_UINT();  
        }
    } 

    // 物件存储数据管理
    this.CleStreamObjSaveDataMgr = function(data){
        // 物件对象数量
        var nObjCount = this.parseStreamADF_UINT();  
        for (var i = 0; i < nObjCount; i++){
            data._arrObjSaveData[i] = new ADF_OBJ_SAVEDATA();
            this.CleStreamObjSaveData(data._arrObjSaveData[i]);
        }	        
    } 

    // 自然材质
    this.CleStreamMtlPhysics= function(data){	
        this.parseStreamADF_BASEFLOAT4(data.vDiffuse);
        this.parseStreamADF_BASEFLOAT4(data.vAmbient);
        this.parseStreamADF_BASEFLOAT4(data.vSpecular);
        this.parseStreamADF_BASEFLOAT4(data.vEmissive);
        data.fPower = this.parseStreamADF_FLOAT();   
    } 

    // 材质数据
    this.CleStreamMtlData = function(data){
        data._eMtlType = this.parseStreamADF_INT();                 // 材质类型
        this.CleStreamMtlPhysics(data._mtlPhysics);                 // 自然材质
        
        // 纹理材质ID
        var nCount = this.parseStreamADF_UINT();  
        for (var i = 0; i < nCount; i++){
            data._arrTexID[i] = this.parseStreamADF_UINT();
        }

        // 纹理数据	
        nCount = this.parseStreamADF_UINT();  
        for (var i = 0; i < nCount; i++){
            data._arrData[i] = new ADF_BASEFLOAT4();
            this.parseStreamADF_BASEFLOAT4(data._arrData[i]);
        }
    } 

    // 材质存储数据
    this.CleStreamMtlSaveData = function(data){
        data._uMtlID = this.parseStreamADF_UINT();              // 材质ID
        data._strName = this.parseStreamADF_WString();          // 材质名称
        this.CleStreamMtlData(data._MtlData);                   // 材质数据	
    } 
    
    // 材质存储数据管理
    this.CleStreamMtlSaveDataMgr = function(data){
        // 材质数据数量
        var nCount = this.parseStreamADF_UINT();  
        for (var i = 0; i < nCount; i++){
            data._arrMtlSaveData[i] = new ADF_MTL_SAVEDATA();
            this.CleStreamMtlSaveData(data._arrMtlSaveData[i]);
        }	        
    } 

    this.CleStreamADF_KEYFRAMEROTATION = function(data){        
        this.parseStreamADF_BASEFLOAT3(data._vOrigin); 
        this.parseStreamADF_BASEFLOAT3(data._vAxis); 
        data._fRotValue = this.parseStreamADF_FLOAT();
    } 

    this.CleStreamADF_KEYPARAMETER = function(data){
        // 类型
        data._eType = this.parseStreamADF_INT();
        // 自由旋转	
        this.CleStreamADF_KEYFRAMEROTATION(data._rotation);
        // 平移
        this.parseStreamADF_BASEFLOAT3(data._vTranslation); 
    } 
    
    this.CleStreamADF_KEYFRAME = function(data){
        // 帧号
        data._uFrameID = this.parseStreamADF_UINT();
        // 起始状态
        this.parseStreamADF_BASEMATRIX(data._matStartStatus);

        // 局部变换的关键帧参数(有顺序)
        var nCount = this.parseStreamADF_UINT();  
        for (var i = 0; i < nCount; i++){
            data._arrLocalTransform[i] = new ADF_KEYPARAMETER();
            this.CleStreamADF_KEYPARAMETER(data._arrLocalTransform[i]);
        }	
        
        // 全局变换的关键帧参数(有顺序)
        nCount = this.parseStreamADF_UINT();  
        for (var i = 0; i < nCount; i++){
            data._arrGlobalTransform[i] = new ADF_KEYPARAMETER();
            this.CleStreamADF_KEYPARAMETER(data._arrGlobalTransform[i]);
        } 
    } 

    // 动画存储数据
    this.CleStreamAnimSaveData = function(data){
        data._uObjectID = this.parseStreamADF_UINT(); 
        
        // 物件的关键帧(旋转平移变换)
        var nCount = this.parseStreamADF_UINT();  
        for (var i = 0; i < nCount; i++){
            data._arrKeyFrameData[i] = new ADF_KEYFRAME();
            this.CleStreamADF_KEYFRAME(data._arrKeyFrameData[i]);
        }	
        
        // 物件的透明度关键帧，存储ADF_TRANSPARENCY_KEYFRAME对象 
        nCount = this.parseStreamADF_UINT();  
        for (var i = 0; i < nCount; i++){
            data._arrTranspKeyFrm[i] = new ADF_TRANSPARENCY_KEYFRAME();
            // 帧号
            data._arrTranspKeyFrm[i]._uFrameID = this.parseStreamADF_UINT();
            // 非透明度
            data._arrTranspKeyFrm[i]._fNoTransparency = this.parseStreamADF_FLOAT();
        }	 
    } 

    // 动画存储数据管理
    this.CleStreamAnimSaveDataMgr = function(data){
        data._uFrameSize = this.parseStreamADF_UINT();  

        // 动画数据数量
        var nCount = this.parseStreamADF_UINT();  
        for (var i = 0; i < nCount; i++){
            data._arrObjAnimSaveData[i] = new ADF_OBJ_ANIM_SAVEDATA();
            this.CleStreamAnimSaveData(data._arrObjAnimSaveData[i]);
        }	        
    }     

    // 摄像机数据
    this.CleStreamCameraSaveData = function(data){
        // 帧号
        data._uFrameID = this.parseStreamADF_UINT();         
        // 摄像机数据
        this.parseStreamADF_CAMERA(data._camera);        
    } 

    // 摄像机存储数据管理
    this.CleStreamCameraSaveDataMgr = function(data){        
        // 默认摄像机数据
        this.parseStreamADF_CAMERA(data._DefaultCamera);  

        var nCount = this.parseStreamADF_UINT();  
        for (var i = 0; i < nCount; i++){
            data._arrCameraAnimSaveData[i] = new ADF_CAMERA_KEYFRAME();
            this.CleStreamCameraSaveData(data._arrCameraAnimSaveData[i]);
        }	        
    }    
    
    // 配置选项数据
    this.CleStreamConfig = function(data){
        data._nCameraProjectType = this.parseStreamADF_INT();
        data._nCoordsType = this.parseStreamADF_INT();
        data._nSceneUpType = this.parseStreamADF_INT();
        data._stuSceneUnit._nLengthUnit = this.parseStreamADF_INT();
        data._stuSceneUnit._nMassUnit = this.parseStreamADF_INT();
        data._stuSceneUnit._nTimeUnit = this.parseStreamADF_INT();    
    }     

    // 时间节点树
    this.CleStreamTimeNode = function(data){        
         // 节点对应的时间节点ID
        data._uTimeNodeID = this.parseStreamADF_UINT();
        // 类型,参看枚举值ADF_SCENETIMENODETYPE
        data._nType = this.parseStreamADF_INT();
        // 名称
        data._strName = this.parseStreamADF_WString();
        // 注释
        data._strNote = this.parseStreamADF_WString();
        // 音频路径
        data._strAudioPath = this.parseStreamADF_WString();
        // 文档路径
        data._strDocPath = this.parseStreamADF_WString();

        // 其他文档名称
        var nCount = this.parseStreamADF_UINT();  
        for (var i = 0; i < nCount; i++){
             data._vecOtherDocName[i] = this.parseStreamADF_WString();
        }	

        // 视频文件ID
        data._uVideoFileID = this.parseStreamADF_UINT();
        // 图像文件ID
        nCount = this.parseStreamADF_UINT();  
        for (var i = 0; i < nCount; i++){
             data._arrImageFileID[i] = this.parseStreamADF_UINT();
        }	

        // 超链接
        data._strHyperlink = this.parseStreamADF_WString();
        // 起始帧号
        data._uStartFrameID = this.parseStreamADF_UINT();
        // 帧长度
        data._uFrameSize = this.parseStreamADF_UINT();
    
        // 子节点
        nCount = this.parseStreamADF_UINT();  
        for (var i = 0; i < nCount; i++){
            data._arrSubNode[i] = new ADF_TIMENODE();
            this.CleStreamTimeNode(data._arrSubNode[i]);
        }
    } 

    // 场景参数数据
    this.CleStreamSceneParam = function(data){  
        var nCount = this.parseStreamADF_UINT();  
        for (var i = 0; i < nCount; i++){
            data._arrParamSaveData[i] = new ADF_PARAMETER();
            this.parseStreamADF_PARAMETER(data._arrParamSaveData[i]);
        }	        
    }

    // 资源文件
    this.CleStreamResFile = function(data){  
        // 文件名，长度260字符
        data._name =  this.parseStreamADF_WString();
        data._size = this.parseStreamADF_UINT(); 
        data._reserve = this.parseStreamADF_UINT(); 
    } 

    // 主入口函数
    this.parseMain = function(data) {
        this._curVersion = this.parseStreamADF_INT();

        var ret = true;
        var dataSetDesc = new CleStreamDataSetDesc();
        while (this._cur_pos < g_nCleBufferlength)
        {
            // CLE数据流的数据集描述
            dataSetDesc._type = this.parseStreamADF_INT();
            dataSetDesc._size = this.parseStreamADF_UINT();

            switch (dataSetDesc._type)
            {
            case CSDST_SYS_MODEL:           // 模型集
            {
                this.CleStreamModelSetParser(data.arrModelData);
                break;
            }
            case CSDST_SYS_LODMODEL:        // LOD模型数据集
            {
                break;
            }
            case CSDST_SYS_MODELTREE:       // 模型树
            {
                // 版本号
                var modelTreeVersion = this.parseStreamADF_INT();
                this.CleStreamModelTreeParser(data.stuObjTreeTopNode);
                break;
            }
            case CSDST_SYS_OBJECT:          // 物件数据
            {
                // 版本号
                var ObjectVersion = this.parseStreamADF_INT();
                this.CleStreamObjSaveDataMgr(data.stuObjSaveDataMgr);
                break;
            }
            case CSDST_SYS_MATERIAL:        // 材质数据   
            {
                // 版本号
                var MtlVersion = this.parseStreamADF_INT();
                this.CleStreamMtlSaveDataMgr(data.stuMtlSaveDataMgr);
                break;
            }
            case CSDST_SYS_ANIMATION:       // 动画数据
            {
                var AnimSaveDataVersion = this.parseStreamADF_INT();
                this.CleStreamAnimSaveDataMgr(data.stuAnimSaveDataMgr);
                break;
            }
            case CSDST_SYS_CAMERA:          // 摄像机数据
            {
                var CameraSaveDataVersion = this.parseStreamADF_INT();
                this.CleStreamCameraSaveDataMgr(data.stuCameraSaveDataMgr);
                break;
            }
            case CSDST_SYS_CONFIG:          // 配置选项数据
            {
                var ConfigVersion = this.parseStreamADF_INT();
                this.CleStreamConfig(data.stuConfig);  
                break;
            }
            case CSDST_SYS_TIMENODETREE:    // 时间节点树(工艺规程)
            {
                var TimeNodeVersion = this.parseStreamADF_INT();
                this.CleStreamTimeNode(data.stuTimeNodeTreeTop);  
                break;
            }
            case CSDST_SYS_SCENEPARAM:      // 场景参数数据
            {
                var SceneParamVersion = this.parseStreamADF_INT();
                this.CleStreamSceneParam(data.stuSceneParam);  
                break;
            }
            case CSDST_SYS_COMMENT:         
            {
                break;
            }
            case CSDST_SYS_IMAGEFILEINFO:   // 图片文件信息
            {
                var ImageFieInfosion = this.parseStreamADF_INT();
                var nCount = this.parseStreamADF_UINT();  
                for (var i = 0; i < nCount; i++){
                    data.arrImageFile[i] = new ADF_FILE_OPINFO();
                    this.parseStreamADF_FILE_OPINFO(data.arrImageFile[i]);
                }
                break;
            }
            case CSDST_SYS_AUDIOFILEINFO:   // 音频文件信息
            {
                var AudioFieInfosion = this.parseStreamADF_INT();
                var nCount = this.parseStreamADF_UINT();  
                for (var i = 0; i < nCount; i++){
                    data.arrAudioFile[i] = new ADF_FILE_OPINFO();
                    this.parseStreamADF_FILE_OPINFO(data.arrAudioFile[i]);
                }                
                break;
            }
            case CSDST_SYS_DOCFILEINFO:
            {
                break;
            }
            case CSDST_SYS_VIDEOFILEINFO:
            { 
                break;
            }
            case CSDST_RES_FILE:            // 资源文件
            {
                data.arrResFile[g_nResFileCount] = new CleStreamResFileInfo();
                this.CleStreamResFile(data.arrResFile[g_nResFileCount]);             
                g_nResFileCount++;
                break;
            }
            default:
                break;
            }
        } 
        return ret;      
    }     
}