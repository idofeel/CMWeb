//===================================================================================================

let ERROR_ADF_OK				= 0;		// 成功
let ERROR_ADF_GENERAL			= 1;		// 一般错误
let ERROR_ADF_INIT				= 2;		// 初始化错误
let ERROR_ADF_INPUT				= 3;		// 输入错误

//===================================================================================================

// 场景数据
var g_sceneData = null;
// CLE文件解析数据
var g_cleParser = null;

var g_matRTWorld = null;

var g_arrKeyFrameIndex = null;
var g_arrRatio = null;

// 解析数据
function ParseCleStream() { 
    g_sceneData = new ADF_SCENEDATA();
    g_cleParser = new ADFCleParser();

    g_matRTWorld = new ADF_BASEMATRIX();
    g_arrKeyFrameIndex = new Int32Array(1);
    g_arrRatio = new Float32Array(1);

    // 初始化数学计算相关的临时变量
    ADFMathInt();
    // 全局方法使用的临时变量
    ADFGlobalInt();
    
    // 主入口函数
    g_cleParser.parseMain(g_sceneData);
} 
 
// 计算物件世界矩阵
// uCurFrameID: Uint32, 输入参数
// stuObjAnimSaveData:ADF_OBJ_ANIM_SAVEDATA, 输入参数
// matObjLocal:ADF_BASEMATRIX, 输入参数
// matObjWorld:ADF_BASEMATRIX, 输入参数
// matWldOut:ADF_BASEMATRIX, 输出参数
function CalculateObjectWldMatrix(uCurFrameID, stuObjAnimSaveData, matObjLocal, matObjWorld, matWldOut) { 
	// 根据输入帧号获取对应关键帧索引及时间百分比
	if (!GetObjectKeyFrameIndex(uCurFrameID, stuObjAnimSaveData._arrKeyFrameData, g_arrKeyFrameIndex, g_arrRatio))
    {  
          return;
    }   
    var uKeyFrameIndex = g_arrKeyFrameIndex[0];
    var fRatio = g_arrRatio[0];

    // 世界矩阵
    g_matRTWorld.Clear();
    var bIsKeyFrameCalc = false;

    if (uKeyFrameIndex < stuObjAnimSaveData._arrKeyFrameData.length)
    {
        // 根据关键帧数据计算旋转平移世界矩阵     
        if (CalcObjectRTWorldMatrix(stuObjAnimSaveData._arrKeyFrameData[uKeyFrameIndex]._matStartStatus,
                                    stuObjAnimSaveData._arrKeyFrameData[uKeyFrameIndex]._arrLocalTransform,
                                    stuObjAnimSaveData._arrKeyFrameData[uKeyFrameIndex]._arrGlobalTransform,
                                    fRatio, g_matRTWorld)) {
            bIsKeyFrameCalc = true;
        }
          
    }

    if (!bIsKeyFrameCalc)
        g_matRTWorld.copy(matObjWorld);

    // 级联矩阵:局部矩阵与世界矩阵
    ADFMatrixMultiply(matObjLocal, g_matRTWorld, matWldOut);
}

// 计算物件透明度动画的非透明的(alpha值)
// uCurFrameID: Uint32, 输入参数
// stuObjAnimSaveData:ADF_OBJ_ANIM_SAVEDATA, 输入参数
// 函数返回值，float类型，代替输入参数
function CalculateObjectNoTransparency(uCurFrameID, stuObjAnimSaveData) {     
    var fNoTransparency = 1.0;
	if (!GetObjectTranspKeyFrameIndex(uCurFrameID, stuObjAnimSaveData._arrTranspKeyFrm, g_arrKeyFrameIndex, g_arrRatio))
	{
        return fNoTransparency;
    }
    var uKeyFrameIndex = g_arrKeyFrameIndex[0];
    var fRatio = g_arrRatio[0];

    if (ISEQUAL(fRatio, 1.0))
		fNoTransparency = stuObjAnimSaveData._arrTranspKeyFrm[uKeyFrameIndex]._fNoTransparency;
	else
		fNoTransparency = stuObjAnimSaveData._arrTranspKeyFrm[uKeyFrameIndex - 1]._fNoTransparency * (1.0 - fRatio) + stuObjAnimSaveData._arrTranspKeyFrm[uKeyFrameIndex]._fNoTransparency * fRatio;
    
    return fNoTransparency;
}

// 计算摄像机动画的数据
// uCurFrameID: Uint32, 输入参数
// arrCameraAnimSaveData: ADF_CAMERA_KEYFRAME的数组, 输入参数
// stuCameraOut: DF_CAMERA 输入参数
function CalculateCameraDataByKeyFrame(uCurFrameID, arrCameraAnimSaveData, stuCameraOut){
	if (!GetCameraKeyFrameIndex(uCurFrameID, arrCameraAnimSaveData, g_arrKeyFrameIndex, g_arrRatio))
        return ERROR_ADF_INPUT;
     
    var uKeyFrameIndex = g_arrKeyFrameIndex[0];
    var fRatio = g_arrRatio[0];   
	if (ISEQUAL(fRatio, 1.0))
	{
		stuCameraOut.Copy(arrCameraAnimSaveData[uKeyFrameIndex]._camera);
	}
	else
	{
		fRatio = 1.0 - fRatio;
		var uIndex1 = uKeyFrameIndex;
		var uIndex2 = uKeyFrameIndex;
		if (uIndex1 > 0)
            uIndex1 -= 1;
            
		InterpolateCameraDataEx(arrCameraAnimSaveData[uIndex1]._camera, arrCameraAnimSaveData[uIndex2]._camera, fRatio, stuCameraOut);
	}
}