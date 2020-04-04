let CSDST_SYS_NULL=0;let CSDST_SYS_MODEL=1;let CSDST_SYS_LODMODEL=2;let CSDST_SYS_MODELTREE=3;let CSDST_SYS_OBJECT=4;let CSDST_SYS_MATERIAL=5;let CSDST_SYS_ANIMATION=6;let CSDST_SYS_CAMERA=7;let CSDST_SYS_CONFIG=8;let CSDST_SYS_TIMENODETREE=9;let CSDST_SYS_SCENEPARAM=10;let CSDST_SYS_IMAGEFILEINFO=11;let CSDST_SYS_AUDIOFILEINFO=12;let CSDST_SYS_DOCFILEINFO=13;let CSDST_SYS_VIDEOFILEINFO=14;let CSDST_SYS_COMMENT=15;let CSDST_SYS_MODELDATA=1001;let CSDST_SYS_ANNOTATIONDATA=1002;let CSDST_SYS_END=10000;let CSDST_RES_FILE=10001;function CleStreamDataSetDesc(){this._type=CSDST_SYS_NULL;this._size=0;}
var g_nResFileCount=0;var g_strResbaseUrl;var g_arrayCleBuffer;var g_nCleBufferlength=0;function ADFCleParser(){this._cur_pos=0;this._curVersion=0;this.parseStreamADF_INT=function(){var dataView=new DataView(g_arrayCleBuffer,this._cur_pos,4);this._cur_pos+=4;return dataView.getInt32(0,true);}
this.parseStreamADF_UINT=function(){var dataView=new DataView(g_arrayCleBuffer,this._cur_pos,4);this._cur_pos+=4;return dataView.getUint32(0,true);}
this.parseStreamADF_FLOAT=function(){var dataView=new DataView(g_arrayCleBuffer,this._cur_pos,4);this._cur_pos+=4;return dataView.getFloat32(0,true);}
this.parseStreamADF_DOUBLE=function(){var dataView=new DataView(g_arrayCleBuffer,this._cur_pos,8);this._cur_pos+=8;return dataView.getFloat64(0,true);}
this.parseStreamADF_BASEUINT2=function(data){var dataView=new DataView(g_arrayCleBuffer,this._cur_pos,4*2);this._cur_pos+=4*2;data.x=dataView.getUint32(0,true);data.y=dataView.getUint32(4,true);}
this.parseStreamADF_BASEFLOAT2=function(data){var dataView=new DataView(g_arrayCleBuffer,this._cur_pos,4*2);this._cur_pos+=4*2;data.x=dataView.getFloat32(0,true);data.y=dataView.getFloat32(4,true);}
this.parseStreamADF_BASEFLOAT3=function(data){var dataView=new DataView(g_arrayCleBuffer,this._cur_pos,4*3);this._cur_pos+=4*3;data.x=dataView.getFloat32(0,true);data.y=dataView.getFloat32(4,true);data.z=dataView.getFloat32(8,true);}
this.parseStreamADF_BASEFLOAT4=function(data){var dataView=new DataView(g_arrayCleBuffer,this._cur_pos,4*4);this._cur_pos+=4*4;data.x=dataView.getFloat32(0,true);data.y=dataView.getFloat32(4,true);data.z=dataView.getFloat32(8,true);data.w=dataView.getFloat32(12,true);}
this.parseStreamADF_BASETRIANGLE=function(data){var dataView=new DataView(g_arrayCleBuffer,this._cur_pos,4*3*3);this._cur_pos+=4*3*3;var tempCus=0;data.p1.x=dataView.getFloat32(tempCus,true);tempCus+=4;data.p1.y=dataView.getFloat32(tempCus,true);tempCus+=4;data.p1.z=dataView.getFloat32(tempCus,true);tempCus+=4;data.p2.x=dataView.getFloat32(tempCus,true);tempCus+=4;data.p2.y=dataView.getFloat32(tempCus,true);tempCus+=4;data.p2.z=dataView.getFloat32(tempCus,true);tempCus+=4;data.p3.x=dataView.getFloat32(tempCus,true);tempCus+=4;data.p3.y=dataView.getFloat32(tempCus,true);tempCus+=4;data.p3.z=dataView.getFloat32(tempCus,true);}
this.parseStreamADF_BASEMATRIX=function(data){var dataView=new DataView(g_arrayCleBuffer,this._cur_pos,4*4*4);this._cur_pos+=4*4*4;var tempCus=0;data._11=dataView.getFloat32(tempCus,true);tempCus+=4;data._12=dataView.getFloat32(tempCus,true);tempCus+=4;data._13=dataView.getFloat32(tempCus,true);tempCus+=4;data._14=dataView.getFloat32(tempCus,true);tempCus+=4;data._21=dataView.getFloat32(tempCus,true);tempCus+=4;data._22=dataView.getFloat32(tempCus,true);tempCus+=4;data._23=dataView.getFloat32(tempCus,true);tempCus+=4;data._24=dataView.getFloat32(tempCus,true);tempCus+=4;data._31=dataView.getFloat32(tempCus,true);tempCus+=4;data._32=dataView.getFloat32(tempCus,true);tempCus+=4;data._33=dataView.getFloat32(tempCus,true);tempCus+=4;data._34=dataView.getFloat32(tempCus,true);tempCus+=4;data._41=dataView.getFloat32(tempCus,true);tempCus+=4;data._42=dataView.getFloat32(tempCus,true);tempCus+=4;data._43=dataView.getFloat32(tempCus,true);tempCus+=4;data._44=dataView.getFloat32(tempCus,true);}
this.parseStreamADF_BASEDOUBLE2=function(data){var dataView=new DataView(g_arrayCleBuffer,this._cur_pos,8*2);this._cur_pos+=8*2;data.x=dataView.getFloat64(0,true);data.y=dataView.getFloat64(8,true);}
this.parseStreamADF_BASEDOUBLE3=function(data){var dataView=new DataView(g_arrayCleBuffer,this._cur_pos,8*3);this._cur_pos+=8*3;data.x=dataView.getFloat64(0,true);data.y=dataView.getFloat64(8,true);data.z=dataView.getFloat64(16,true);}
this.parseStreamADF_BASEDOUBLE4=function(data){var dataView=new DataView(g_arrayCleBuffer,this._cur_pos,8*4);this._cur_pos+=8*4;data.x=dataView.getFloat64(0,true);data.y=dataView.getFloat64(8,true);data.z=dataView.getFloat64(16,true);data.w=dataView.getFloat64(24,true);}
this.parseStreamADF_BASEMATRIXD=function(data){var dataView=new DataView(g_arrayCleBuffer,this._cur_pos,8*4*4);this._cur_pos+=8*4*4;var tempCus=0;data._11=dataView.getFloat64(tempCus,true);tempCus+=8;data._12=dataView.getFloat64(tempCus,true);tempCus+=8;data._13=dataView.getFloat64(tempCus,true);tempCus+=8;data._14=dataView.getFloat64(tempCus,true);tempCus+=8;data._21=dataView.getFloat64(tempCus,true);tempCus+=8;data._22=dataView.getFloat64(tempCus,true);tempCus+=8;data._23=dataView.getFloat64(tempCus,true);tempCus+=8;data._24=dataView.getFloat64(tempCus,true);tempCus+=8;data._31=dataView.getFloat64(tempCus,true);tempCus+=8;data._32=dataView.getFloat64(tempCus,true);tempCus+=8;data._33=dataView.getFloat64(tempCus,true);tempCus+=8;data._34=dataView.getFloat64(tempCus,true);tempCus+=8;data._41=dataView.getFloat64(tempCus,true);tempCus+=8;data._42=dataView.getFloat64(tempCus,true);tempCus+=8;data._43=dataView.getFloat64(tempCus,true);tempCus+=8;data._44=dataView.getFloat64(tempCus,true);}
this.parseStreamADF_WString=function(){var dataCountView=new DataView(g_arrayCleBuffer,this._cur_pos,4);this._cur_pos+=4;var nSrcLen=dataCountView.getInt32(0,true);if(nSrcLen==0){return'';}
else{var dvTextReader=new Uint16Array(g_arrayCleBuffer,this._cur_pos,nSrcLen-1);this._cur_pos+=nSrcLen*2;return String.fromCharCode.apply(null,dvTextReader);}}
this.parseStreamADF_PlaneData=function(data){this.parseStreamADF_BASEFLOAT3(data.vAxisX);this.parseStreamADF_BASEFLOAT3(data.vAxisY);this.parseStreamADF_BASEFLOAT3(data.vAxisZ);this.parseStreamADF_BASEFLOAT3(data.vOrigin);}
this.parseStreamADF_CylinderData=function(data){this.parseStreamADF_BASEFLOAT3(data.vAxisX);this.parseStreamADF_BASEFLOAT3(data.vAxisY);this.parseStreamADF_BASEFLOAT3(data.vAxisZ);this.parseStreamADF_BASEFLOAT3(data.vOrigin);data.radius=this.parseStreamADF_FLOAT();}
this.parseStreamADF_ConeData=function(data){this.parseStreamADF_BASEFLOAT3(data.vAxisX);this.parseStreamADF_BASEFLOAT3(data.vAxisY);this.parseStreamADF_BASEFLOAT3(data.vAxisZ);this.parseStreamADF_BASEFLOAT3(data.vOrigin);data.alpha=this.parseStreamADF_FLOAT();}
this.parseStreamADF_TorusData=function(data){this.parseStreamADF_BASEFLOAT3(data.vAxisX);this.parseStreamADF_BASEFLOAT3(data.vAxisY);this.parseStreamADF_BASEFLOAT3(data.vAxisZ);this.parseStreamADF_BASEFLOAT3(data.vOrigin);data.radius1=this.parseStreamADF_FLOAT();data.radius2=this.parseStreamADF_FLOAT();}
this.parseStreamADF_RevolveData=function(data){this.parseStreamADF_BASEFLOAT3(data.vAxisX);this.parseStreamADF_BASEFLOAT3(data.vAxisY);this.parseStreamADF_BASEFLOAT3(data.vAxisZ);this.parseStreamADF_BASEFLOAT3(data.vOrigin);}
this.parseStreamADF_TabCylData=function(data){this.parseStreamADF_BASEFLOAT3(data.vAxisX);this.parseStreamADF_BASEFLOAT3(data.vAxisY);this.parseStreamADF_BASEFLOAT3(data.vAxisZ);this.parseStreamADF_BASEFLOAT3(data.vOrigin);}
this.parseStreamADF_SphereData=function(data){this.parseStreamADF_BASEFLOAT3(data.vAxisX);this.parseStreamADF_BASEFLOAT3(data.vAxisY);this.parseStreamADF_BASEFLOAT3(data.vAxisZ);this.parseStreamADF_BASEFLOAT3(data.vOrigin);data.radius=this.parseStreamADF_FLOAT();}
this.parseStreamADF_Surface=function(data){data.nID=this.parseStreamADF_INT();data.nType=this.parseStreamADF_INT();switch(data.nType)
{case ADF_SURFT_PLANE:data.Surfacedata.plane=new ADF_PlaneData();this.parseStreamADF_PlaneData(data.Surfacedata.plane);break;case ADF_SURFT_CYLINDER:data.Surfacedata.cylinder=new ADF_CylinderData();this.parseStreamADF_CylinderData(data.Surfacedata.cylinder);break;case ADF_SURFT_CONE:data.Surfacedata.cone=new ADF_ConeData();this.parseStreamADF_ConeData(data.Surfacedata.cone);break;case ADF_SURFT_TORUS:data.Surfacedata.torus=new ADF_TorusData();this.parseStreamADF_TorusData(data.Surfacedata.torus);break;case ADF_SURFT_REVOLVE:data.Surfacedata.revolve=new ADF_RevolveData();this.parseStreamADF_RevolveData(data.Surfacedata.revolve);break;case ADF_SURFT_TABCYL:data.Surfacedata.tabcyl=new ADF_TabCylData();this.parseStreamADF_TabCylData(data.Surfacedata.tabcyl);break;case ADF_SURFT_SPHERE:data.Surfacedata.sphere=new ADF_SphereData();this.parseStreamADF_SphereData(data.Surfacedata.sphere);break;default:break;}
var nTempt=this.parseStreamADF_INT();if(nTempt!=0){data.bIsTopological=true;}
else{data.bIsTopological=false;}}
this.parseStreamADF_LineData=function(data){this.parseStreamADF_BASEFLOAT3(data.end1);this.parseStreamADF_BASEFLOAT3(data.end2);}
this.parseStreamADF_ArcData=function(data){this.parseStreamADF_BASEFLOAT3(data.vOrigin);this.parseStreamADF_BASEFLOAT3(data.vVector1);this.parseStreamADF_BASEFLOAT3(data.vVector2);data.fStartAngle=this.parseStreamADF_FLOAT();data.fEndAngle=this.parseStreamADF_FLOAT();data.fRadius=this.parseStreamADF_FLOAT();}
this.parseStreamADF_Curve=function(data){data.nID=this.parseStreamADF_INT();data.nType=this.parseStreamADF_INT();switch(data.nType)
{case ADF_CURVT_LINE:data.curvedata.line=new ADF_LineData();this.parseStreamADF_LineData(data.curvedata.line);break;case ADF_CURVT_ARC:data.curvedata.arc=new ADF_ArcData();this.parseStreamADF_ArcData(data.curvedata.arc);break;default:break;}
var nTempt=this.parseStreamADF_INT();if(nTempt!=0){data.bIsTopological=true;}
else{data.bIsTopological=false;}}
this.parseStreamADF_Line2D=function(data){this.parseStreamADF_BASEFLOAT2(data.start);this.parseStreamADF_BASEFLOAT2(data.end);}
this.parseStreamADF_Arc2D=function(data){this.parseStreamADF_BASEFLOAT2(data.center);this.parseStreamADF_BASEFLOAT2(data.axisX);data.fRadius=this.parseStreamADF_FLOAT();data.fStartAngle=this.parseStreamADF_FLOAT();data.fEndAngle=this.parseStreamADF_FLOAT();}
this.parseStreamADF_Polygon2D=function(data){var nCount=this.parseStreamADF_UINT();for(var i=0;i<nCount;i++){data.arrPoints[i]=new ADF_BASEFLOAT2();this.parseStreamADF_BASEFLOAT2(data.arrPoints[i]);}}
this.parseStreamADF_Curve2D=function(data){data.nID=this.parseStreamADF_INT();data.nType=this.parseStreamADF_INT();switch(data.nType)
{case ADF_2DCURVT_LINE:data.stuLine=new ADF_Line2D();this.parseStreamADF_Line2D(data.stuLine);break;case ADF_2DCURVT_ARC:data.stuArc=new ADF_Arc2D();this.parseStreamADF_Arc2D(data.stuArc);break;case ADF_2DCURVT_POLYGON:data.stuPolygon=new ADF_Polygon2D();this.parseStreamADF_Polygon2D(data.stuPolygon);break;default:break;}}
this.parseStreamADF_BBOX=function(data){this.parseStreamADF_BASEFLOAT3(data._min);this.parseStreamADF_BASEFLOAT3(data._max);}
this.parseStreamADF_BSPHERE=function(data){this.parseStreamADF_BASEFLOAT3(data._center);data._radius=this.parseStreamADF_FLOAT();}
this.parseStreamADF_COORDSYSTEM=function(data){this.parseStreamADF_BASEFLOAT3(data._vOrigin);this.parseStreamADF_BASEFLOAT3(data._vAxisX);this.parseStreamADF_BASEFLOAT3(data._vAxisY);}
this.parseStreamADF_COORDSYSTEMD=function(data){this.parseStreamADF_BASEDOUBLE3(data._vOrigin);this.parseStreamADF_BASEDOUBLE3(data._vAxisX);this.parseStreamADF_BASEDOUBLE3(data._vAxisY);}
this.parseStreamADF_PARAMETERVALUE=function(data){data._nType=this.parseStreamADF_INT();switch(data._nType)
{case ADF_PARAMT_INT:data._nValue=this.parseStreamADF_INT();break;case ADF_PARAMT_FLOAT:data._fValue=this.parseStreamADF_FLOAT();break;case ADF_PARAMT_DOUBLE:data._dValue=this.parseStreamADF_DOUBLE();break;case ADF_PARAMT_STRING:data._strValue=this.parseStreamADF_WString();break;case ADF_PARAMT_FLOAT3:data._vFloat3Value=new ADF_BASEFLOAT3();this.parseStreamADF_BASEFLOAT3(data._vFloat3Value);break;case ADF_PARAMT_DOUBLE3:data._vDouble3Value=new ADF_BASEDOUBLE3();this.parseStreamADF_BASEDOUBLE3(data._vDouble3Value);break;case ADF_PARAMT_BOOL:{var nTempt=this.parseStreamADF_INT();if(nTempt!=0){data._bValue=true;}
else{data._bValue=false;}
break;}
default:break;}}
this.parseStreamADF_PARAMETER=function(data){data._strName=this.parseStreamADF_WString();this.parseStreamADF_PARAMETERVALUE(data._stuValue);}
this.parseStreamADF_CAMERA=function(data){this.parseStreamADF_BASEFLOAT3(data._vEyePos);this.parseStreamADF_BASEFLOAT3(data._vFocus);this.parseStreamADF_BASEFLOAT3(data._vUp);data._fFOVY=this.parseStreamADF_FLOAT();data._fAspect=this.parseStreamADF_FLOAT();data._fZNear=this.parseStreamADF_FLOAT();data._fZFar=this.parseStreamADF_FLOAT();}
this.parseStreamADF_ResFileInfo=function(data){data.uResID=this.parseStreamADF_UINT();data.nType=this.parseStreamADF_INT();data.strFileName=this.parseStreamADF_WString();}
this.parseStreamADF_FILE_OPINFO=function(data){this.parseStreamADF_ResFileInfo(data._FileInfo);data._nFileOpType=this.parseStreamADF_INT();}
this.parseStreamADF_MODELSUBSET_SAVEDATA=function(data){data._nPrimitType=this.parseStreamADF_INT();data._uStartIndex=this.parseStreamADF_UINT();data._uIndexCount=this.parseStreamADF_UINT();this.parseStreamADF_BBOX(data._box);data._nSubsetType=this.parseStreamADF_INT();data._uGeomIndex=this.parseStreamADF_UINT();}
this.CleStreamModelDataParser=function(data){var modelVersion=this.parseStreamADF_INT();var nVertexDataStartIndex=this._cur_pos;var sizeByte=this.parseStreamADF_UINT();this._cur_pos+=sizeByte;sizeByte=this.parseStreamADF_UINT();nCount=sizeByte/4;data._arrIndexData=new Uint32Array(nCount);for(var i=0;i<nCount;i++){data._arrIndexData[i]=this.parseStreamADF_UINT();}
var nSubsetStartIndex=this._cur_pos;var nCount=this.parseStreamADF_UINT();for(var i=0;i<nCount;i++){data._arrSubset[i]=new ADF_MODELSUBSET_SAVEDATA();this.parseStreamADF_MODELSUBSET_SAVEDATA(data._arrSubset[i]);}
var nSubsetCount=this._cur_pos-nSubsetStartIndex;this._cur_pos=nVertexDataStartIndex;sizeByte=this.parseStreamADF_UINT();var tempPos=this._cur_pos;var partVertexNum=0;for(var i=0;i<data._arrSubset.length;i++){if(data._arrSubset[i]._nPrimitType==ADFPT_TRIANGLELIST){partVertexNum+=data._arrSubset[i]._uIndexCount;}}
data._arrVertexData=new Float32Array(partVertexNum*8);var pos=0;for(var i=0;i<data._arrSubset.length;i++){if(data._arrSubset[i]._nPrimitType==ADFPT_TRIANGLELIST){for(var j=0;j<data._arrSubset[i]._uIndexCount;j++){var index=data._arrIndexData[data._arrSubset[i]._uStartIndex+j];this._cur_pos=tempPos+8*index*4;for(var k=0;k<8;k++){data._arrVertexData[pos++]=this.parseStreamADF_FLOAT();}}}}
this._cur_pos=nSubsetStartIndex+nSubsetCount;nCount=this.parseStreamADF_UINT();for(var i=0;i<nCount;i++){data._arrSurface[i]=new ADF_Surface();this.parseStreamADF_Surface(data._arrSurface[i]);}
nCount=this.parseStreamADF_UINT();for(var i=0;i<nCount;i++){data._arrCurve[i]=new ADF_Curve();this.parseStreamADF_Curve(data._arrCurve[i]);}
this.parseStreamADF_BBOX(data._box);}
this.CleStreamModelSetParser=function(data){var modelVersion=this.parseStreamADF_INT();var size=this.parseStreamADF_UINT();for(var i=0;i<size;i++){data[i]=new ADF_MODEL_OPINFO();data[i]._ModelInfo._uModelID=this.parseStreamADF_INT();data[i]._ModelInfo._strModelName=this.parseStreamADF_WString();data[i]._ModelInfo._strModelFilePath=this.parseStreamADF_WString();this.CleStreamModelDataParser(data[i]._ModelInfo._stuModelData);data[i]._nFileOpType=this.parseStreamADF_INT();}}
this.CleStreamModelTreeParser=function(data){data._uTreeNodeID=this.parseStreamADF_UINT();data._uObjectID=this.parseStreamADF_UINT();data._strName=this.parseStreamADF_WString();this.parseStreamADF_BASEMATRIX(data._matTranform);var nCount=this.parseStreamADF_UINT();for(var i=0;i<nCount;i++){data._arrParamData[i]=new ADF_PARAMETER();this.parseStreamADF_PARAMETER(data._arrParamData[i]);}
nCount=this.parseStreamADF_UINT();for(var i=0;i<nCount;i++){data._arrSubNode[i]=new ADF_OBJ_TREENODE();this.CleStreamModelTreeParser(data._arrSubNode[i]);}}
this.CleStreamProductInfo=function(data){this.parseStreamADF_BASEFLOAT3(data.vCenterOfMass);data.dMass=this.parseStreamADF_DOUBLE();data.dVolume=this.parseStreamADF_DOUBLE();data.dSurfaceArea=this.parseStreamADF_DOUBLE();}
this.CleStreamObjSaveData=function(data){data._uObjectID=this.parseStreamADF_UINT();data._uMeshID=this.parseStreamADF_UINT();this.parseStreamADF_BASEMATRIX(data._matLocal);this.parseStreamADF_BASEMATRIX(data._matWorld);this.CleStreamProductInfo(data._ProductInfo);data._nReverse1=this.parseStreamADF_INT();data._nFillMode=this.parseStreamADF_INT();data._nCullMode=this.parseStreamADF_INT();data._nReverse4=this.parseStreamADF_INT();var size=this.parseStreamADF_UINT()/4;for(var i=0;i<size;i++){data._arrSubsetMtlID[i]=this.parseStreamADF_UINT();}
size=this.parseStreamADF_UINT()/4;for(var i=0;i<size;i++){data._arrSubsetMtlID_Ex[i]=this.parseStreamADF_UINT();}}
this.CleStreamObjSaveDataMgr=function(data){var nObjCount=this.parseStreamADF_UINT();for(var i=0;i<nObjCount;i++){data._arrObjSaveData[i]=new ADF_OBJ_SAVEDATA();this.CleStreamObjSaveData(data._arrObjSaveData[i]);}}
this.CleStreamMtlPhysics=function(data){this.parseStreamADF_BASEFLOAT4(data.vDiffuse);this.parseStreamADF_BASEFLOAT4(data.vAmbient);this.parseStreamADF_BASEFLOAT4(data.vSpecular);this.parseStreamADF_BASEFLOAT4(data.vEmissive);data.fPower=this.parseStreamADF_FLOAT();}
this.CleStreamMtlData=function(data){data._eMtlType=this.parseStreamADF_INT();this.CleStreamMtlPhysics(data._mtlPhysics);var nCount=this.parseStreamADF_UINT();for(var i=0;i<nCount;i++){data._arrTexID[i]=this.parseStreamADF_UINT();}
nCount=this.parseStreamADF_UINT();for(var i=0;i<nCount;i++){data._arrData[i]=new ADF_BASEFLOAT4();this.parseStreamADF_BASEFLOAT4(data._arrData[i]);}}
this.CleStreamMtlSaveData=function(data){data._uMtlID=this.parseStreamADF_UINT();data._strName=this.parseStreamADF_WString();this.CleStreamMtlData(data._MtlData);}
this.CleStreamMtlSaveDataMgr=function(data){var nCount=this.parseStreamADF_UINT();for(var i=0;i<nCount;i++){data._arrMtlSaveData[i]=new ADF_MTL_SAVEDATA();this.CleStreamMtlSaveData(data._arrMtlSaveData[i]);}}
this.CleStreamADF_KEYFRAMEROTATION=function(data){this.parseStreamADF_BASEFLOAT3(data._vOrigin);this.parseStreamADF_BASEFLOAT3(data._vAxis);data._fRotValue=this.parseStreamADF_FLOAT();}
this.CleStreamADF_KEYPARAMETER=function(data){data._eType=this.parseStreamADF_INT();this.CleStreamADF_KEYFRAMEROTATION(data._rotation);this.parseStreamADF_BASEFLOAT3(data._vTranslation);}
this.CleStreamADF_KEYFRAME=function(data){data._uFrameID=this.parseStreamADF_UINT();this.parseStreamADF_BASEMATRIX(data._matStartStatus);var nCount=this.parseStreamADF_UINT();for(var i=0;i<nCount;i++){data._arrLocalTransform[i]=new ADF_KEYPARAMETER();this.CleStreamADF_KEYPARAMETER(data._arrLocalTransform[i]);}
nCount=this.parseStreamADF_UINT();for(var i=0;i<nCount;i++){data._arrGlobalTransform[i]=new ADF_KEYPARAMETER();this.CleStreamADF_KEYPARAMETER(data._arrGlobalTransform[i]);}}
this.CleStreamAnimSaveData=function(data){data._uObjectID=this.parseStreamADF_UINT();var nCount=this.parseStreamADF_UINT();for(var i=0;i<nCount;i++){data._arrKeyFrameData[i]=new ADF_KEYFRAME();this.CleStreamADF_KEYFRAME(data._arrKeyFrameData[i]);}
nCount=this.parseStreamADF_UINT();for(var i=0;i<nCount;i++){data._arrTranspKeyFrm[i]=new ADF_TRANSPARENCY_KEYFRAME();data._arrTranspKeyFrm[i]._uFrameID=this.parseStreamADF_UINT();data._arrTranspKeyFrm[i]._fNoTransparency=this.parseStreamADF_FLOAT();}}
this.CleStreamAnimSaveDataMgr=function(data){data._uFrameSize=this.parseStreamADF_UINT();var nCount=this.parseStreamADF_UINT();for(var i=0;i<nCount;i++){data._arrObjAnimSaveData[i]=new ADF_OBJ_ANIM_SAVEDATA();this.CleStreamAnimSaveData(data._arrObjAnimSaveData[i]);}}
this.CleStreamCameraSaveData=function(data){data._uFrameID=this.parseStreamADF_UINT();this.parseStreamADF_CAMERA(data._camera);}
this.CleStreamCameraSaveDataMgr=function(data){this.parseStreamADF_CAMERA(data._DefaultCamera);var nCount=this.parseStreamADF_UINT();for(var i=0;i<nCount;i++){data._arrCameraAnimSaveData[i]=new ADF_CAMERA_KEYFRAME();this.CleStreamCameraSaveData(data._arrCameraAnimSaveData[i]);}}
this.CleStreamConfig=function(data){data._nCameraProjectType=this.parseStreamADF_INT();data._nCoordsType=this.parseStreamADF_INT();data._nSceneUpType=this.parseStreamADF_INT();data._stuSceneUnit._nLengthUnit=this.parseStreamADF_INT();data._stuSceneUnit._nMassUnit=this.parseStreamADF_INT();data._stuSceneUnit._nTimeUnit=this.parseStreamADF_INT();}
this.CleStreamTimeNode=function(data){data._uTimeNodeID=this.parseStreamADF_UINT();data._nType=this.parseStreamADF_INT();data._strName=this.parseStreamADF_WString();data._strNote=this.parseStreamADF_WString();data._strAudioPath=this.parseStreamADF_WString();data._strDocPath=this.parseStreamADF_WString();var nCount=this.parseStreamADF_UINT();for(var i=0;i<nCount;i++){data._vecOtherDocName[i]=this.parseStreamADF_WString();}
data._uVideoFileID=this.parseStreamADF_UINT();nCount=this.parseStreamADF_UINT();for(var i=0;i<nCount;i++){data._arrImageFileID[i]=this.parseStreamADF_UINT();}
data._strHyperlink=this.parseStreamADF_WString();data._uStartFrameID=this.parseStreamADF_UINT();data._uFrameSize=this.parseStreamADF_UINT();nCount=this.parseStreamADF_UINT();for(var i=0;i<nCount;i++){data._arrSubNode[i]=new ADF_TIMENODE();this.CleStreamTimeNode(data._arrSubNode[i]);}}
this.CleStreamSceneParam=function(data){var nCount=this.parseStreamADF_UINT();for(var i=0;i<nCount;i++){data._arrParamSaveData[i]=new ADF_PARAMETER();this.parseStreamADF_PARAMETER(data._arrParamSaveData[i]);}}
this.CleStreamResFile=function(data){data._name=this.parseStreamADF_WString();data._size=this.parseStreamADF_UINT();data._reserve=this.parseStreamADF_UINT();}
this.parseMain=function(data){this._curVersion=this.parseStreamADF_INT();var ret=true;var dataSetDesc=new CleStreamDataSetDesc();while(this._cur_pos<g_nCleBufferlength)
{dataSetDesc._type=this.parseStreamADF_INT();dataSetDesc._size=this.parseStreamADF_UINT();switch(dataSetDesc._type)
{case CSDST_SYS_MODEL:{this.CleStreamModelSetParser(data.arrModelData);break;}
case CSDST_SYS_LODMODEL:{break;}
case CSDST_SYS_MODELTREE:{var modelTreeVersion=this.parseStreamADF_INT();this.CleStreamModelTreeParser(data.stuObjTreeTopNode);break;}
case CSDST_SYS_OBJECT:{var ObjectVersion=this.parseStreamADF_INT();this.CleStreamObjSaveDataMgr(data.stuObjSaveDataMgr);break;}
case CSDST_SYS_MATERIAL:{var MtlVersion=this.parseStreamADF_INT();this.CleStreamMtlSaveDataMgr(data.stuMtlSaveDataMgr);break;}
case CSDST_SYS_ANIMATION:{var AnimSaveDataVersion=this.parseStreamADF_INT();this.CleStreamAnimSaveDataMgr(data.stuAnimSaveDataMgr);break;}
case CSDST_SYS_CAMERA:{var CameraSaveDataVersion=this.parseStreamADF_INT();this.CleStreamCameraSaveDataMgr(data.stuCameraSaveDataMgr);break;}
case CSDST_SYS_CONFIG:{var ConfigVersion=this.parseStreamADF_INT();this.CleStreamConfig(data.stuConfig);break;}
case CSDST_SYS_TIMENODETREE:{var TimeNodeVersion=this.parseStreamADF_INT();this.CleStreamTimeNode(data.stuTimeNodeTreeTop);break;}
case CSDST_SYS_SCENEPARAM:{var SceneParamVersion=this.parseStreamADF_INT();this.CleStreamSceneParam(data.stuSceneParam);break;}
case CSDST_SYS_COMMENT:{break;}
case CSDST_SYS_IMAGEFILEINFO:{var ImageFieInfosion=this.parseStreamADF_INT();var nCount=this.parseStreamADF_UINT();for(var i=0;i<nCount;i++){data.arrImageFile[i]=new ADF_FILE_OPINFO();this.parseStreamADF_FILE_OPINFO(data.arrImageFile[i]);}
break;}
case CSDST_SYS_AUDIOFILEINFO:{var AudioFieInfosion=this.parseStreamADF_INT();var nCount=this.parseStreamADF_UINT();for(var i=0;i<nCount;i++){data.arrAudioFile[i]=new ADF_FILE_OPINFO();this.parseStreamADF_FILE_OPINFO(data.arrAudioFile[i]);}
break;}
case CSDST_SYS_DOCFILEINFO:{break;}
case CSDST_SYS_VIDEOFILEINFO:{break;}
case CSDST_RES_FILE:{data.arrResFile[g_nResFileCount]=new CleStreamResFileInfo();this.CleStreamResFile(data.arrResFile[g_nResFileCount]);g_nResFileCount++;break;}
default:break;}}
return ret;}}