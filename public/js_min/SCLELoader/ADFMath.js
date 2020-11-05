let EPSILON=0.001;let ZERO=1e-6;let DZERO=1e-6;let DEPSILON=1e-3;let ADF_PI=3.141592654;function IKS_MAX(a,b){if(a>b){return a;}
return b;}
function IKS_MIN(a,b){if(a>b){return b;}
return a;}
function ISDZERO(dValue){if(dValue<DZERO&&dValue>DZERO*(-1)){return true;}
return false;}
function ISEQUAL(fValue1,fValue2){if((fValue1-fValue2)<ZERO&&(fValue1-fValue2)>ZERO*(-1)){return true;}
return false;}
function ISDEQUALEX(dValue1,dValue2,dZero){if((dValue1)-(dValue2)<(dZero)&&(dValue1)-(dValue2)>(-1*(dZero))){return true;}
return false;}
var g_arrTempM1=null;var g_arrTempM2=null;var g_arrTempMOut=null;var g_vTempTrans=null;var g_vVec1=null;var g_vVec2=null;var g_vVec3=null;var g_vVec4=null;var g_vVec5=null;var g_vVec6=null;var g_vVec7=null;var g_vVec8=null;var g_n1=null;var g_n2=null;var g_n3=null;var g_t1=null;var g_t2=null;var g_t3=null;var g_o1=null;var g_o2=null;var g_o3=null;var g_vBaseDouble4_1=null;var g_vBaseDouble4_2=null;var g_vBaseDouble4_3=null;var g_vBaseDouble4_4=null;var g_vBaseDouble4_5=null;function ADFMathInt(){g_arrTempM1=new Array();g_arrTempM2=new Array();for(var i=0;i<4;i++){g_arrTempM1[i]=new Array();g_arrTempM2[i]=new Array();for(var j=0;j<4;j++){g_arrTempM1[i][j]=0.0;g_arrTempM1[i][j]=0.0;}}
g_arrTempMOut=new Array();for(var i=0;i<4;i++){g_arrTempMOut[i]=new Array();for(var j=0;j<4;j++){g_arrTempMOut[i][j]=0.0;for(var k=0;k<4;k++){g_arrTempMOut[i][j]+=g_arrTempM1[i][k]*g_arrTempM2[k][j];}}}
g_vTempTrans=new Array();for(i=0;i<4;i++){g_vTempTrans[i]=0.0;}
g_vVec1=new ADF_BASEFLOAT3();g_vVec2=new ADF_BASEFLOAT3();g_vVec3=new ADF_BASEFLOAT3();g_vVec4=new ADF_BASEFLOAT3();g_vVec5=new ADF_BASEFLOAT3();g_vVec6=new ADF_BASEFLOAT3();g_vVec7=new ADF_BASEFLOAT3();g_vVec8=new ADF_BASEFLOAT3();g_o1=new ADF_BASEFLOAT3();g_o2=new ADF_BASEFLOAT3();g_o3=new ADF_BASEFLOAT3();g_n1=new ADF_BASEFLOAT3();g_n2=new ADF_BASEFLOAT3();g_n3=new ADF_BASEFLOAT3();g_t1=new ADF_BASEFLOAT3();g_t2=new ADF_BASEFLOAT3();g_t3=new ADF_BASEFLOAT3();g_vBaseDouble4_1=new ADF_BASEDOUBLE4();g_vBaseDouble4_2=new ADF_BASEDOUBLE4();g_vBaseDouble4_3=new ADF_BASEDOUBLE4();g_vBaseDouble4_4=new ADF_BASEDOUBLE4();g_vBaseDouble4_5=new ADF_BASEDOUBLE4();}
function ADFMATRIXToDoubleMATRIX(adfM,doubleM){doubleM[0][0]=adfM._11;doubleM[0][1]=adfM._12;doubleM[0][2]=adfM._13;doubleM[0][3]=adfM._14;doubleM[1][0]=adfM._21;doubleM[1][1]=adfM._22;doubleM[1][2]=adfM._23;doubleM[1][3]=adfM._24;doubleM[2][0]=adfM._31;doubleM[2][1]=adfM._32;doubleM[2][2]=adfM._33;doubleM[2][3]=adfM._34;doubleM[3][0]=adfM._41;doubleM[3][1]=adfM._42;doubleM[3][2]=adfM._43;doubleM[3][3]=adfM._44;}
function DoubleMATRIXToADFMATRIX(doubleM,adfM){adfM._11=doubleM[0][0];adfM._12=doubleM[0][1];adfM._13=doubleM[0][2];adfM._14=doubleM[0][3];adfM._21=doubleM[1][0];adfM._22=doubleM[1][1];adfM._23=doubleM[1][2];adfM._24=doubleM[1][3];adfM._31=doubleM[2][0];adfM._32=doubleM[2][1];adfM._33=doubleM[2][2];adfM._34=doubleM[2][3];adfM._41=doubleM[3][0];adfM._42=doubleM[3][1];adfM._43=doubleM[3][2];adfM._44=doubleM[3][3];}
function ADFMatrixIdentity(pM){if(pM==null){return false;}
pM.Clear();return true;}
function ADFMatrixMultiply(pM1,pM2,pMOut){ADFMATRIXToDoubleMATRIX(pM1,g_arrTempM1);ADFMATRIXToDoubleMATRIX(pM2,g_arrTempM2);for(var i=0;i<4;i++){for(var j=0;j<4;j++){g_arrTempMOut[i][j]=0.0;for(var k=0;k<4;k++){g_arrTempMOut[i][j]+=g_arrTempM1[i][k]*g_arrTempM2[k][j];}}}
DoubleMATRIXToADFMATRIX(g_arrTempMOut,pMOut);}
function ADFSRTMatrixInverse(pOut,pM){if(pM==null){ADFMatrixIdentity(pOut);return true;}
ADFMATRIXToDoubleMATRIX(pM,g_arrTempM1);var dScaleSq=g_arrTempM1[0][0]*g_arrTempM1[0][0]+g_arrTempM1[0][1]*g_arrTempM1[0][1]+g_arrTempM1[0][2]*g_arrTempM1[0][2];if(dScaleSq<((1e-6)*(1e-6))){return false;}
var dInvSqScale=1.0/dScaleSq;for(var i=0;i<4;i++){for(var j=0;j<4;j++){g_arrTempMOut[i][j]=0.0;}}
var i=0,j=0;for(j=0;j<3;j++){for(i=0;i<3;i++){g_arrTempMOut.m[j][i]=g_arrTempM1[i][j]*dInvSqScale;}
g_arrTempMOut.m[j][3]=0.0;}
for(i=0;i<3;i++){g_vTempTrans[i]=0.0;for(j=0;j<3;j++){g_vTempTrans[i]-=g_arrTempM1[i][j]*g_arrTempM1[3][j]*dInvSqScale;}
g_arrTempMOut.m[3][i]=g_vTempTrans[i];}
g_arrTempMOut.m[3][3]=1.0;DoubleMATRIXToADFMATRIX(g_arrTempMOut,pOut);return true;}
function ADFMatrixScaling(pMScale,sx,sy,sz){if(pMScale==null){return;}
ADFMatrixIdentity(pMScale);pMScale._11=sx;pMScale._22=sy;pMScale._33=sz;}
function ADFMatrixTranslation(pMTran,x,y,z){if(pMTran==null){return;}
ADFMatrixIdentity(pMTran);pMTran._41=x;pMTran._42=y;pMTran._43=z;}
function ADFMatrixRotationAxis(pOut,pV,dAngle){if(pOut==null||pV==null){return;}
ADFMatrixIdentity(pOut);var dSin=Math.sin(dAngle);var dCos=Math.cos(dAngle);pOut._11=dCos+pV.x*pV.x*(1.0-dCos);pOut._12=pV.x*pV.y*(1.0-dCos)+pV.z*dSin;pOut._13=pV.x*pV.z*(1.0-dCos)-pV.y*dSin;pOut._21=pV.x*pV.y*(1.0-dCos)-pV.z*dSin;pOut._22=dCos+pV.y*pV.y*(1.0-dCos);pOut._23=pV.y*pV.z*(1.0-dCos)+pV.x*dSin;pOut._31=pV.x*pV.z*(1.0-dCos)+pV.y*dSin;pOut._32=pV.y*pV.z*(1.0-dCos)-pV.x*dSin;pOut._33=dCos+pV.z*pV.z*(1.0-dCos);}
function ADFVec3Length(pV){return Math.sqrt(pV.x*pV.x+pV.y*pV.y+pV.z*pV.z);}
function ADFVec3Normalize(pV){var dLength=ADFVec3Length(pV);pV.x/=dLength;pV.y/=dLength;pV.z/=dLength;}
function ADFVec3Cross(pOut,pV1,pV2){pOut.x=pV1.y*pV2.z-pV2.y*pV1.z;pOut.y=pV1.z*pV2.x-pV1.x*pV2.z;pOut.z=pV1.x*pV2.y-pV2.x*pV1.y;}
function ISDNEAR(fValue1,fValue2){if((fValue1-fValue2)<DEPSILON&&(fValue1-fValue2)>DEPSILON*(-1)){return true;}
return false;}
function IsVecSameDir(v1,v2){g_vVec1.Copy(v1);ADFVec3Normalize(g_vVec1);g_vVec2.Copy(v2);ADFVec3Normalize(g_vVec2);if(ISDNEAR(g_vVec1.x,g_vVec2.x)&&ISDNEAR(g_vVec1.y,g_vVec2.y)&&ISDNEAR(g_vVec1.z,g_vVec2.z)){return true;}
else{var dRadianZero=0.0035;var dLimitValue=0.9995;if((g_vVec1.x>dLimitValue&&g_vVec2.x>dLimitValue)||(g_vVec1.x<-dLimitValue&&g_vVec2.x<-dLimitValue)||(g_vVec1.y>dLimitValue&&g_vVec2.y>dLimitValue)||(g_vVec1.y<-dLimitValue&&g_vVec2.y<-dLimitValue)||(g_vVec1.z>dLimitValue&&g_vVec2.z>dLimitValue)||(g_vVec1.z<-dLimitValue&&g_vVec2.z<-dLimitValue)){var dRadian=ADFCalcArcCos(ADFVec3Dot(g_vVec1,g_vVec2));if(dRadian<dRadianZero){return true;}}
return false;}}
function IsVecReverseDir(v1,v2){g_vVec1.Copy(v1);ADFVec3Normalize(g_vVec1);g_vVec2.Copy(v2);ADFVec3Normalize(g_vVec2);g_vVec2.Mul(-1);if(ISDNEAR(g_vVec1.x,g_vVec2.x)&&ISDNEAR(g_vVec1.y,g_vVec2.y)&&ISDNEAR(g_vVec1.z,g_vVec2.z)){return true;}
else{var dRadianZero=0.0035;var dLimitValue=0.9995;if((g_vVec1.x>dLimitValue&&g_vVec2.x>dLimitValue)||(g_vVec1.x<-dLimitValue&&g_vVec2.x<-dLimitValue)||(g_vVec1.y>dLimitValue&&g_vVec2.y>dLimitValue)||(g_vVec1.y<-dLimitValue&&g_vVec2.y<-dLimitValue)||(g_vVec1.z>dLimitValue&&g_vVec2.z>dLimitValue)||(g_vVec1.z<-dLimitValue&&g_vVec2.z<-dLimitValue)){var dRadian=ADFCalcArcCos(ADFVec3Dot(g_vVec1,g_vVec2));if(dRadian<dRadianZero){return true;}}
return false;}}
function GetCorrectSinCosValue(dCosValue){if(dCosValue>1.0+ZERO){dCosValue=1.0;}
else if(dCosValue>1.0-ZERO)
{dCosValue=1.0;}
else if(dCosValue<-1.0-ZERO)
{dCosValue=-1.0;}
else if(dCosValue<-1.0+ZERO)
{dCosValue=-1.0;}
return dCosValue;}
function ADFCalcArcCos(dValue){dValue=GetCorrectSinCosValue(dValue);return Math.acos(dValue);}
function ADFCalcArcSin(dValue){dValue=GetCorrectSinCosValue(dValue);return Math.asin(dValue);}
function ADFVec3Dot(pV1,pV2){return(pV1.x*pV2.x+pV1.y*pV2.y+pV1.z*pV2.z);}
function CalculateVectorLength(pVec){return Math.sqrt(pVec.x*pVec.x+pVec.y*pVec.y+pVec.z*pVec.z);}
function CalculateDistance(pPos1,pPos2){g_vVec1.x=pPos1.x-pPos2.x;g_vVec1.y=pPos1.y-pPos2.y;g_vVec1.z=pPos1.z-pPos2.z;return CalculateVectorLength(g_vVec1);}
function ADFVec4Transform(pOut,pV,pM){pOut.x=pV.x*pM._11+pV.y*pM._21+pV.z*pM._31+pV.w*pM._41;pOut.y=pV.x*pM._12+pV.y*pM._22+pV.z*pM._32+pV.w*pM._42;pOut.z=pV.x*pM._13+pV.y*pM._23+pV.z*pM._33+pV.w*pM._43;pOut.w=pV.x*pM._14+pV.y*pM._24+pV.z*pM._34+pV.w*pM._44;}
function ADFVec3TransformNormal(pOut,pV,pM){g_vBaseDouble4_1.x=pV.x;g_vBaseDouble4_1.y=pV.y;g_vBaseDouble4_1.z=pV.z;g_vBaseDouble4_1.w=0.0;g_vBaseDouble4_5.Copy(g_vBaseDouble4_1);ADFVec4Transform(g_vBaseDouble4_5,g_vBaseDouble4_1,pM);pOut.x=g_vBaseDouble4_5.x;pOut.y=g_vBaseDouble4_5.y;pOut.z=g_vBaseDouble4_5.z;}
function GetVerticalVector(vSrcVector,vDstVector){var bResult=true;g_vVec1.Copy(vDstVector);if(!ISDZERO(vSrcVector.x))
{g_vVec1.y=1.0;g_vVec1.z=0.0;g_vVec1.x=(-1)*(vSrcVector.y*g_vVec1.y+vSrcVector.z*g_vVec1.z)/vSrcVector.x;}
else if(!ISDZERO(vSrcVector.y))
{g_vVec1.z=1.0;g_vVec1.x=0.0;g_vVec1.y=(-1)*(vSrcVector.z*g_vVec1.z+vSrcVector.x*g_vVec1.x)/vSrcVector.y;}
else if(!ISDZERO(vSrcVector.z))
{g_vVec1.x=1.0;g_vVec1.y=0.0;g_vVec1.z=(-1)*(vSrcVector.x*g_vVec1.x+vSrcVector.y*g_vVec1.y)/vSrcVector.z;}
else
{bResult=false;}
ADFVec3Normalize(g_vVec1);vDstVector.Copy(g_vVec1);return bResult;}
function RotateAxisFromVecToVec(vAxis,v1,v2,arrRotValue){var bResult=true;g_vVec1.Copy(vAxis);ADFVec3Normalize(g_vVec1);g_vVec2.Copy(v1);ADFVec3Normalize(g_vVec2);g_vVec3.Copy(v2);ADFVec3Normalize(g_vVec3);var dSrcDot=ADFVec3Dot(g_vVec1,g_vVec2);var dTgtDot=ADFVec3Dot(g_vVec1,g_vVec3);var dEpsilon=1e-5;if(dSrcDot<-0.97||dSrcDot>0.97){dEpsilon=1e-6;}
else if(dSrcDot<-0.8||dSrcDot>0.8){dEpsilon=1e-5;}
else if(dSrcDot<-0.5||dSrcDot>0.5){dEpsilon=1e-4;}
else{dEpsilon=1e-3;}
if((dSrcDot-dTgtDot)<dEpsilon&&(dSrcDot-dTgtDot)>(-1)*dEpsilon){bResult=true;}
else{bResult=false;}
if(bResult){g_vVec4.Copy(g_vVec1);g_vVec1.Mul(dSrcDot);g_vVec5.Sub(g_vVec2,g_vVec4);g_vVec6.Sub(g_vVec3,g_vVec4);ADFVec3Normalize(g_vVec5);ADFVec3Normalize(g_vVec6);var dRotDot=ADFVec3Dot(g_vVec5,g_vVec6);var dRotValue=ADFCalcArcCos(dRotDot);ADFVec3Cross(g_vVec7,g_vVec5,g_vVec6);if(!IsVecSameDir(g_vVec7,vAxis)){dRotValue=(-1)*dRotValue;}
arrRotValue[0]=dRotValue;}
return bResult;}
function ProjectPtToPlane(vPlanePt,vPlaneDir,vSrcPt,vPrjPt){g_vVec1.Copy(vPlaneDir);ADFVec3Normalize(g_vVec1);var dFactor=-1*ADFVec3Dot(vPlanePt,g_vVec1);var dDis=ADFVec3Dot(vSrcPt,g_vVec1)+dFactor;g_vVec2.Copy(g_vVec1);g_vVec2.Mul(dDis);vPrjPt.Sub(vSrcPt,g_vVec2);}
function IsPointOnPlane(vPlanePt,vPlaneDir,vPt,dZero){if(dZero<0.0){dZero=DZERO;}
g_vVec1.Copy(vPlaneDir);ADFVec3Normalize(g_vVec1);g_vVec2.Sub(vPt,vPlanePt);var dPtVecDis=ADFVec3Dot(g_vVec1,g_vVec2);if(dPtVecDis<dZero&&dPtVecDis>(-1*dZero)){return true;}
else{return false;}}
function IsPointInTriangle(vPt,vTriVert1,vTriVert2,vTriVert3){g_o1.Sub(vTriVert2,vTriVert1);g_o2.Sub(vTriVert3,vTriVert2);g_o3.Sub(vTriVert1,vTriVert3);ADFVec3Cross(g_vVec4,g_o1,g_o2);ADFVec3Cross(g_n1,g_vVec4,g_o1);ADFVec3Cross(g_n2,g_vVec4,g_o2);ADFVec3Cross(g_n3,g_vVec4,g_o3);ProjectPtToPlane(vTriVert1,g_vVec4,vPt,g_vVec5);g_t1.Sub(g_vVec5,vTriVert1);g_t2.Sub(g_vVec5,vTriVert2);g_t3.Sub(g_vVec5,vTriVert3);var dot1=ADFVec3Dot(g_t1,g_n1);var dot2=ADFVec3Dot(g_t2,g_n2);var dot3=ADFVec3Dot(g_t3,g_n3);if(dot1>0.0&&dot2>0.0&&dot3>0.0){return true;}
else{return false;}}
function CalcSqureDistanceOfTwoLineSeg(vLinePt11,vLinePt12,vLinePt21,vLinePt22,pNearestLinePt1){var ux=vLinePt12.x-vLinePt11.x;var uy=vLinePt12.y-vLinePt11.y;var uz=vLinePt12.z-vLinePt11.z;var vx=vLinePt22.x-vLinePt21.x;var vy=vLinePt22.y-vLinePt21.y;var vz=vLinePt22.z-vLinePt21.z;var wx=vLinePt11.x-vLinePt21.x;var wy=vLinePt11.y-vLinePt21.y;var wz=vLinePt11.z-vLinePt21.z;var a=(ux*ux+uy*uy+uz*uz);var b=(ux*vx+uy*vy+uz*vz);var c=(vx*vx+vy*vy+vz*vz);var d=(ux*wx+uy*wy+uz*wz);var e=(vx*wx+vy*wy+vz*wz);var dt=a*c-b*b;var sd=dt;var td=dt;var sn=0.0;var tn=0.0;if(ISDEQUALEX(dt,0.0,1e-32))
{sn=0.0;sd=1.0;tn=e;td=c;}
else
{sn=(b*e-c*d);tn=(a*e-b*d);if(sn<0.0)
{sn=0.0;tn=e;td=c;}
else if(sn>sd)
{sn=sd;tn=e+b;td=c;}}
if(tn<0.0)
{tn=0.0;if(-d<0.0)
{sn=0.0;}
else if(-1*d>a)
{sn=sd;}
else
{sn=-1*d;sd=a;}}
else if(tn>td)
{tn=td;if((-1*d+b)<0.0)
{sn=0.0;}
else if((-1*d+b)>a)
{sn=sd;}
else
{sn=(-1*d+b);sd=a;}}
var sc=0.0;var tc=0.0;if(ISDEQUALEX(sn,0.0,1e-32)){sc=0.0;}
else{sc=sn/sd;}
if(ISDEQUALEX(tn,0.0,1e-32)){tc=0.0;}
else{tc=tn/td;}
if(pNearestLinePt1!=null){pNearestLinePt1.x=vLinePt11.x+sc*(vLinePt12.x-vLinePt11.x);pNearestLinePt1.y=vLinePt11.y+sc*(vLinePt12.y-vLinePt11.y);pNearestLinePt1.z=vLinePt11.z+sc*(vLinePt12.z-vLinePt11.z);}
var dx=wx+(sc*ux)-(tc*vx);var dy=wy+(sc*uy)-(tc*vy);var dz=wz+(sc*uz)-(tc*vz);return dx*dx+dy*dy+dz*dz;}
function CalcDistanceOfTwoLineSeg(vLinePt11,vLinePt12,vLinePt21,vLinePt22,pNearestLinePt1){return Math.sqrt(CalcSqureDistanceOfTwoLineSeg(vLinePt11,vLinePt12,vLinePt21,vLinePt22,pNearestLinePt1));}
function CalcIntersectOfLinePlane(vLinePt,vLineDir,vPlanePt,vPlaneDir,pIntersectPt){var bResult=true;g_vVec1.Copy(vLineDir);ADFVec3Normalize(g_vVec1);g_vVec2.Copy(vPlaneDir);ADFVec3Normalize(g_vVec2);var dDot=ADFVec3Dot(g_vVec1,g_vVec2);if(ISDZERO(dDot))
{if(!IsPointOnPlane(vPlanePt,g_vVec2,vLinePt,-1.0)){bResult=true;}
else{g_vVec3.Copy(vLinePt);}}
else
{var dFactor=(ADFVec3Dot(g_vVec2,vPlanePt)-ADFVec3Dot(g_vVec2,vLinePt))/dDot;g_vVec3.Copy(g_vVec1);g_vVec3.Mul(dFactor);g_vVec3.Add(vLinePt,g_vVec3);}
if(bResult)
{if(pIntersectPt!=null){pIntersectPt.Copy(g_vVec3);}}
return bResult;}
function CalcIntersectOfLineSegTriangle(vLinePt1,vLinePt2,vTriVert1,vTriVert2,vTriVert3,pIntersectPt){g_vVec1.Sub(vTriVert2,vTriVert1);g_vVec2.Sub(vTriVert3,vTriVert2);ADFVec3Cross(g_vVec3,g_vVec1,g_vVec2);var bIsIsPointOnPlane1=IsPointOnPlane(vTriVert1,g_vVec3,vLinePt1,-1.0);var bIsIsPointOnPlane2=IsPointOnPlane(vTriVert1,g_vVec3,vLinePt2,-1.0);if(bIsIsPointOnPlane1&&bIsIsPointOnPlane2){var bIsPtInTri1=IsPointInTriangle(vLinePt1,vTriVert1,vTriVert2,vTriVert3);var bIsPtInTri2=IsPointInTriangle(vLinePt2,vTriVert1,vTriVert2,vTriVert3);if(bIsPtInTri1||bIsPtInTri2){if(pIntersectPt!=null){if(bIsPtInTri1){pIntersectPt.Copy(vLinePt1);}
else{pIntersectPt.Copy(vLinePt2);}}
return true;}
else
{if(ISDEQUALEX(CalcDistanceOfTwoLineSeg(vLinePt1,vLinePt2,vTriVert1,vTriVert2,pIntersectPt),0.0,1e-7)){return true;}
else if(ISDEQUALEX(CalcDistanceOfTwoLineSeg(vLinePt1,vLinePt2,vTriVert2,vTriVert3,pIntersectPt),0.0,1e-7)){return true;}
else if(ISDEQUALEX(CalcDistanceOfTwoLineSeg(vLinePt1,vLinePt2,vTriVert3,vTriVert1,pIntersectPt),0.0,1e-7)){return true;}
else{return false;}}}
else
{if(bIsIsPointOnPlane1)
{if(IsPointInTriangle(vLinePt1,vTriVert1,vTriVert2,vTriVert3))
{if(pIntersectPt!=null){pIntersectPt.Copy(vLinePt1);}
return true;}
else{return false;}}
else if(bIsIsPointOnPlane2)
{if(IsPointInTriangle(vLinePt2,vTriVert1,vTriVert2,vTriVert3))
{if(pIntersectPt!=null){pIntersectPt.Copy(vLinePt2);}
return true;}
else{return false;}}
g_n1.Sub(vLinePt1,vTriVert1);g_n2.Sub(vLinePt2,vTriVert1);var dot1=ADFVec3Dot(g_n1,g_vVec3);var dot2=ADFVec3Dot(g_n2,g_vVec3);if(dot1*dot2>0.0){return false;}
g_vVec4.Sub(vLinePt2,vLinePt1);if(!CalcIntersectOfLinePlane(vLinePt1,g_vVec4,vTriVert1,g_vVec3,g_vVec5)){return false;}
if(IsPointInTriangle(g_vVec5,vTriVert1,vTriVert2,vTriVert3))
{if(pIntersectPt!=null){pIntersectPt.Copy(g_vVec5);}
return true;}
else{return false;}}}