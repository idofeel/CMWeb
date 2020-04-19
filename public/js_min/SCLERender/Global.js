var g_matLocal=mat4.create();var g_matWorld=mat4.create();var g_matMultiply=mat4.create();function Point2(x,y){this.x=x;this.y=y;this.set=function(xx,yy){this.x=xx;this.y=yy;}}
function Point3(x,y,z){this.x=x;this.y=y;this.z=z;this.set=function(xx,yy,zz){this.x=xx;this.y=yy;this.z=zz;}}
function Vector3(x,y,z){this.x=x;this.y=y;this.z=z;this.set=function(xx,yy,zz){this.x=xx;this.y=yy;this.z=zz;}
this.flip=function(){this.x=-this.x;this.y=-this.y;this.z=-this.z;}
this.normalize=function(){let base=Math.pow(this.x,2)+Math.pow(this.y,2)+Math.pow(this.z,2);this.x=this.x/Math.pow(base,0.5);this.y=this.y/Math.pow(base,0.5);this.z=this.z/Math.pow(base,0.5);}
this.cross=function(b){let x1=this.y*b.z-this.z*b.y;let y1=this.z*b.x-this.x*b.z;let z1=this.x*b.y-this.y*b.x;return new Vector3(x1,y1,z1);}
this.dot=function(b){return this.x*b.x+this.y*b.y+this.z*b.z;}}
function Rect2D(x1,y1,x2,y2){this.min=new Point2(x1,y1);this.max=new Point2(x2,y2);this.set=function(xx1,yy1,xx2,yy2){this.min.x=xx1;this.min.y=yy1;this.max.x=xx2;this.max.y=yy2;}}
function DefaultData(){}
DefaultData.DefaultMaterial=function(){var material=new ADF_MATERIAL();material._eMtlType=ADFMTLTYPE_PHYSICS;material._mtlPhysics.vDiffuse.x=0.7,material._mtlPhysics.vDiffuse.y=0.7,material._mtlPhysics.vDiffuse.z=0.7,material._mtlPhysics.vDiffuse.w=1.0;material._mtlPhysics.vAmbient.x=0.7,material._mtlPhysics.vAmbient.y=0.7,material._mtlPhysics.vAmbient.z=0.7,material._mtlPhysics.vAmbient.w=1.0;material._mtlPhysics.vSpecular.x=0.7,material._mtlPhysics.vSpecular.y=0.7,material._mtlPhysics.vSpecular.z=0.7,material._mtlPhysics.vSpecular.w=1.0;material._mtlPhysics.vEmissive.x=0.0,material._mtlPhysics.vEmissive.y=0.0,material._mtlPhysics.vEmissive.z=0.0,material._mtlPhysics.vEmissive.w=1.0;material._mtlPhysics.fPower=10;return material;}
DefaultData.Red=function(){var material=new ADF_MATERIAL();material._eMtlType=ADFMTLTYPE_PHYSICS;material._mtlPhysics.vDiffuse.x=1.0,material._mtlPhysics.vDiffuse.y=0.0,material._mtlPhysics.vDiffuse.z=0.0,material._mtlPhysics.vDiffuse.w=1.0;material._mtlPhysics.vAmbient.x=1.0,material._mtlPhysics.vAmbient.y=0.0,material._mtlPhysics.vAmbient.z=0.0,material._mtlPhysics.vAmbient.w=1.0;material._mtlPhysics.vSpecular.x=1.0,material._mtlPhysics.vSpecular.y=0.0,material._mtlPhysics.vSpecular.z=0.0,material._mtlPhysics.vSpecular.w=1.0;material._mtlPhysics.vEmissive.x=0.0,material._mtlPhysics.vEmissive.y=0.0,material._mtlPhysics.vEmissive.z=0.0,material._mtlPhysics.vEmissive.w=1.0;material._mtlPhysics.fPower=10;return material;}
DefaultData.Brightgreen=function(){var material=new ADF_MATERIAL();material._eMtlType=ADFMTLTYPE_PHYSICS;material._mtlPhysics.vDiffuse.x=0.5,material._mtlPhysics.vDiffuse.y=1.0,material._mtlPhysics.vDiffuse.z=0.0,material._mtlPhysics.vDiffuse.w=1.0;material._mtlPhysics.vAmbient.x=0.5,material._mtlPhysics.vAmbient.y=1.0,material._mtlPhysics.vAmbient.z=0.0,material._mtlPhysics.vAmbient.w=1.0;material._mtlPhysics.vSpecular.x=0.5,material._mtlPhysics.vSpecular.y=1.0,material._mtlPhysics.vSpecular.z=0.0,material._mtlPhysics.vSpecular.w=1.0;material._mtlPhysics.vEmissive.x=0.0,material._mtlPhysics.vEmissive.y=0.0,material._mtlPhysics.vEmissive.z=0.0,material._mtlPhysics.vEmissive.w=1.0;material._mtlPhysics.fPower=10;return material;}
DefaultData.Blue=function(){var material=new ADF_MATERIAL();material._eMtlType=ADFMTLTYPE_PHYSICS;material._mtlPhysics.vDiffuse.x=0.0,material._mtlPhysics.vDiffuse.y=0.0,material._mtlPhysics.vDiffuse.z=1.0,material._mtlPhysics.vDiffuse.w=1.0;material._mtlPhysics.vAmbient.x=0.0,material._mtlPhysics.vAmbient.y=0.0,material._mtlPhysics.vAmbient.z=1.0,material._mtlPhysics.vAmbient.w=1.0;material._mtlPhysics.vSpecular.x=0.0,material._mtlPhysics.vSpecular.y=0.0,material._mtlPhysics.vSpecular.z=1.0,material._mtlPhysics.vSpecular.w=1.0;material._mtlPhysics.vEmissive.x=0.0,material._mtlPhysics.vEmissive.y=0.0,material._mtlPhysics.vEmissive.z=0.0,material._mtlPhysics.vEmissive.w=1.0;material._mtlPhysics.fPower=10;return material;}
DefaultData.Yellow=function(){var material=new ADF_MATERIAL();material._eMtlType=ADFMTLTYPE_PHYSICS;material._mtlPhysics.vDiffuse.x=1.0,material._mtlPhysics.vDiffuse.y=1.0,material._mtlPhysics.vDiffuse.z=0.0,material._mtlPhysics.vDiffuse.w=1.0;material._mtlPhysics.vAmbient.x=1.0,material._mtlPhysics.vAmbient.y=1.0,material._mtlPhysics.vAmbient.z=0.0,material._mtlPhysics.vAmbient.w=1.0;material._mtlPhysics.vSpecular.x=1.0,material._mtlPhysics.vSpecular.y=1.0,material._mtlPhysics.vSpecular.z=0.0,material._mtlPhysics.vSpecular.w=1.0;material._mtlPhysics.vEmissive.x=0.0,material._mtlPhysics.vEmissive.y=0.0,material._mtlPhysics.vEmissive.z=0.0,material._mtlPhysics.vEmissive.w=1.0;material._mtlPhysics.fPower=10;return material;}
DefaultData.Pink=function(){var material=new ADF_MATERIAL();material._eMtlType=ADFMTLTYPE_PHYSICS;material._mtlPhysics.vDiffuse.x=1.0,material._mtlPhysics.vDiffuse.y=0.75,material._mtlPhysics.vDiffuse.z=0.8,material._mtlPhysics.vDiffuse.w=1.0;material._mtlPhysics.vAmbient.x=1.0,material._mtlPhysics.vAmbient.y=0.75,material._mtlPhysics.vAmbient.z=0.8,material._mtlPhysics.vAmbient.w=1.0;material._mtlPhysics.vSpecular.x=1.0,material._mtlPhysics.vSpecular.y=0.75,material._mtlPhysics.vSpecular.z=0.8,material._mtlPhysics.vSpecular.w=1.0;material._mtlPhysics.vEmissive.x=0.0,material._mtlPhysics.vEmissive.y=0.0,material._mtlPhysics.vEmissive.z=0.0,material._mtlPhysics.vEmissive.w=1.0;material._mtlPhysics.fPower=10;return material;}
DefaultData.CyanGreen=function(){var material=new ADF_MATERIAL();material._eMtlType=ADFMTLTYPE_PHYSICS;material._mtlPhysics.vDiffuse.x=0.25,material._mtlPhysics.vDiffuse.y=0.87,material._mtlPhysics.vDiffuse.z=0.8,material._mtlPhysics.vDiffuse.w=1.0;material._mtlPhysics.vAmbient.x=0.25,material._mtlPhysics.vAmbient.y=0.87,material._mtlPhysics.vAmbient.z=0.8,material._mtlPhysics.vAmbient.w=1.0;material._mtlPhysics.vSpecular.x=0.25,material._mtlPhysics.vSpecular.y=0.87,material._mtlPhysics.vSpecular.z=0.8,material._mtlPhysics.vSpecular.w=1.0;material._mtlPhysics.vEmissive.x=0.0,material._mtlPhysics.vEmissive.y=0.0,material._mtlPhysics.vEmissive.z=0.0,material._mtlPhysics.vEmissive.w=1.0;material._mtlPhysics.fPower=10;return material;}
DefaultData.Black=function(){var material=new ADF_MATERIAL();material._eMtlType=ADFMTLTYPE_PHYSICS;material._mtlPhysics.vDiffuse.x=0.0,material._mtlPhysics.vDiffuse.y=0.0,material._mtlPhysics.vDiffuse.z=0.0,material._mtlPhysics.vDiffuse.w=1.0;material._mtlPhysics.vAmbient.x=0.0,material._mtlPhysics.vAmbient.y=0.0,material._mtlPhysics.vAmbient.z=0.0,material._mtlPhysics.vAmbient.w=1.0;material._mtlPhysics.vSpecular.x=0.0,material._mtlPhysics.vSpecular.y=0.0,material._mtlPhysics.vSpecular.z=0.0,material._mtlPhysics.vSpecular.w=1.0;material._mtlPhysics.vEmissive.x=0.0,material._mtlPhysics.vEmissive.y=0.0,material._mtlPhysics.vEmissive.z=0.0,material._mtlPhysics.vEmissive.w=1.0;material._mtlPhysics.fPower=10;return material;}
DefaultData.White=function(){var material=new ADF_MATERIAL();material._eMtlType=ADFMTLTYPE_PHYSICS;material._mtlPhysics.vDiffuse.x=1.0,material._mtlPhysics.vDiffuse.y=1.0,material._mtlPhysics.vDiffuse.z=1.0,material._mtlPhysics.vDiffuse.w=1.0;material._mtlPhysics.vAmbient.x=1.0,material._mtlPhysics.vAmbient.y=1.0,material._mtlPhysics.vAmbient.z=1.0,material._mtlPhysics.vAmbient.w=1.0;material._mtlPhysics.vSpecular.x=1.0,material._mtlPhysics.vSpecular.y=1.0,material._mtlPhysics.vSpecular.z=1.0,material._mtlPhysics.vSpecular.w=1.0;material._mtlPhysics.vEmissive.x=0.0,material._mtlPhysics.vEmissive.y=0.0,material._mtlPhysics.vEmissive.z=0.0,material._mtlPhysics.vEmissive.w=1.0;material._mtlPhysics.fPower=10;return material;}
DefaultData.Grey=function(){var material=new ADF_MATERIAL();material._eMtlType=ADFMTLTYPE_PHYSICS;material._mtlPhysics.vDiffuse.x=0.5,material._mtlPhysics.vDiffuse.y=0.5,material._mtlPhysics.vDiffuse.z=0.5,material._mtlPhysics.vDiffuse.w=1.0;material._mtlPhysics.vAmbient.x=0.5,material._mtlPhysics.vAmbient.y=0.5,material._mtlPhysics.vAmbient.z=0.5,material._mtlPhysics.vAmbient.w=1.0;material._mtlPhysics.vSpecular.x=0.5,material._mtlPhysics.vSpecular.y=0.5,material._mtlPhysics.vSpecular.z=0.5,material._mtlPhysics.vSpecular.w=1.0;material._mtlPhysics.vEmissive.x=0.0,material._mtlPhysics.vEmissive.y=0.0,material._mtlPhysics.vEmissive.z=0.0,material._mtlPhysics.vEmissive.w=1.0;material._mtlPhysics.fPower=10;return material;}
DefaultData.DarkRed=function(){var material=new ADF_MATERIAL();material._eMtlType=ADFMTLTYPE_PHYSICS;material._mtlPhysics.vDiffuse.x=0.7,material._mtlPhysics.vDiffuse.y=0.1,material._mtlPhysics.vDiffuse.z=0.1,material._mtlPhysics.vDiffuse.w=1.0;material._mtlPhysics.vAmbient.x=0.7,material._mtlPhysics.vAmbient.y=0.1,material._mtlPhysics.vAmbient.z=0.1,material._mtlPhysics.vAmbient.w=1.0;material._mtlPhysics.vSpecular.x=0.7,material._mtlPhysics.vSpecular.y=0.1,material._mtlPhysics.vSpecular.z=0.1,material._mtlPhysics.vSpecular.w=1.0;material._mtlPhysics.vEmissive.x=0.0,material._mtlPhysics.vEmissive.y=0.0,material._mtlPhysics.vEmissive.z=0.0,material._mtlPhysics.vEmissive.w=1.0;material._mtlPhysics.fPower=10;return material;}
DefaultData.Green=function(){var material=new ADF_MATERIAL();material._eMtlType=ADFMTLTYPE_PHYSICS;material._mtlPhysics.vDiffuse.x=0.0,material._mtlPhysics.vDiffuse.y=1.0,material._mtlPhysics.vDiffuse.z=0.0,material._mtlPhysics.vDiffuse.w=1.0;material._mtlPhysics.vAmbient.x=0.0,material._mtlPhysics.vAmbient.y=1.0,material._mtlPhysics.vAmbient.z=0.0,material._mtlPhysics.vAmbient.w=1.0;material._mtlPhysics.vSpecular.x=0.0,material._mtlPhysics.vSpecular.y=1.0,material._mtlPhysics.vSpecular.z=0.0,material._mtlPhysics.vSpecular.w=1.0;material._mtlPhysics.vEmissive.x=0.0,material._mtlPhysics.vEmissive.y=0.0,material._mtlPhysics.vEmissive.z=0.0,material._mtlPhysics.vEmissive.w=1.0;material._mtlPhysics.fPower=10;return material;}
DefaultData.DarkBlue=function(){var material=new ADF_MATERIAL();material._eMtlType=ADFMTLTYPE_PHYSICS;material._mtlPhysics.vDiffuse.x=0.1,material._mtlPhysics.vDiffuse.y=0.1,material._mtlPhysics.vDiffuse.z=0.44,material._mtlPhysics.vDiffuse.w=1.0;material._mtlPhysics.vAmbient.x=0.1,material._mtlPhysics.vAmbient.y=0.1,material._mtlPhysics.vAmbient.z=0.44,material._mtlPhysics.vAmbient.w=1.0;material._mtlPhysics.vSpecular.x=0.1,material._mtlPhysics.vSpecular.y=0.1,material._mtlPhysics.vSpecular.z=0.44,material._mtlPhysics.vSpecular.w=1.0;material._mtlPhysics.vEmissive.x=0.0,material._mtlPhysics.vEmissive.y=0.0,material._mtlPhysics.vEmissive.z=0.0,material._mtlPhysics.vEmissive.w=1.0;material._mtlPhysics.fPower=10;return material;}
DefaultData.DarkYellow=function(){var material=new ADF_MATERIAL();material._eMtlType=ADFMTLTYPE_PHYSICS;material._mtlPhysics.vDiffuse.x=1.0,material._mtlPhysics.vDiffuse.y=0.84,material._mtlPhysics.vDiffuse.z=0.0,material._mtlPhysics.vDiffuse.w=1.0;material._mtlPhysics.vAmbient.x=1.0,material._mtlPhysics.vAmbient.y=0.84,material._mtlPhysics.vAmbient.z=0.0,material._mtlPhysics.vAmbient.w=1.0;material._mtlPhysics.vSpecular.x=1.0,material._mtlPhysics.vSpecular.y=0.84,material._mtlPhysics.vSpecular.z=0.0,material._mtlPhysics.vSpecular.w=1.0;material._mtlPhysics.vEmissive.x=0.0,material._mtlPhysics.vEmissive.y=0.0,material._mtlPhysics.vEmissive.z=0.0,material._mtlPhysics.vEmissive.w=1.0;material._mtlPhysics.fPower=10;return material;}
DefaultData.Violet=function(){var material=new ADF_MATERIAL();material._eMtlType=ADFMTLTYPE_PHYSICS;material._mtlPhysics.vDiffuse.x=0.54,material._mtlPhysics.vDiffuse.y=0.17,material._mtlPhysics.vDiffuse.z=0.89,material._mtlPhysics.vDiffuse.w=1.0;material._mtlPhysics.vAmbient.x=0.54,material._mtlPhysics.vAmbient.y=0.17,material._mtlPhysics.vAmbient.z=0.89,material._mtlPhysics.vAmbient.w=1.0;material._mtlPhysics.vSpecular.x=0.54,material._mtlPhysics.vSpecular.y=0.17,material._mtlPhysics.vSpecular.z=0.89,material._mtlPhysics.vSpecular.w=1.0;material._mtlPhysics.vEmissive.x=0.0,material._mtlPhysics.vEmissive.y=0.0,material._mtlPhysics.vEmissive.z=0.0,material._mtlPhysics.vEmissive.w=1.0;material._mtlPhysics.fPower=10;return material;}
DefaultData.CyanBlue=function(){var material=new ADF_MATERIAL();material._eMtlType=ADFMTLTYPE_PHYSICS;material._mtlPhysics.vDiffuse.x=0.0,material._mtlPhysics.vDiffuse.y=1.0,material._mtlPhysics.vDiffuse.z=1.0,material._mtlPhysics.vDiffuse.w=1.0;material._mtlPhysics.vAmbient.x=0.0,material._mtlPhysics.vAmbient.y=1.0,material._mtlPhysics.vAmbient.z=1.0,material._mtlPhysics.vAmbient.w=1.0;material._mtlPhysics.vSpecular.x=0.0,material._mtlPhysics.vSpecular.y=1.0,material._mtlPhysics.vSpecular.z=1.0,material._mtlPhysics.vSpecular.w=1.0;material._mtlPhysics.vEmissive.x=0.0,material._mtlPhysics.vEmissive.y=0.0,material._mtlPhysics.vEmissive.z=0.0,material._mtlPhysics.vEmissive.w=1.0;material._mtlPhysics.fPower=10;return material;}
DefaultData.Cube=function(){var mesh=[1.0,1.0,1.0,0.0,0.0,-1.0,0.0,0.0,-1.0,1.0,1.0,0.0,0.0,-1.0,0.0,0.0,1.0,-1.0,1.0,0.0,0.0,-1.0,0.0,0.0,-1.0,1.0,1.0,0.0,0.0,-1.0,0.0,0.0,1.0,-1.0,1.0,0.0,0.0,-1.0,0.0,0.0,-1.0,-1.0,1.0,0.0,0.0,-1.0,0.0,0.0,1.0,1.0,-1.0,1.0,0.0,0.0,0.0,0.0,1.0,1.0,1.0,1.0,0.0,0.0,0.0,0.0,1.0,-1.0,-1.0,1.0,0.0,0.0,0.0,0.0,1.0,1.0,1.0,1.0,0.0,0.0,0.0,0.0,1.0,-1.0,-1.0,1.0,0.0,0.0,0.0,0.0,1.0,-1.0,1.0,1.0,0.0,0.0,0.0,0.0,-1.0,1.0,-1.0,0.0,0.0,1.0,0.0,0.0,1.0,1.0,-1.0,0.0,0.0,1.0,0.0,0.0,-1.0,-1.0,-1.0,0.0,0.0,1.0,0.0,0.0,1.0,1.0,-1.0,0.0,0.0,1.0,0.0,0.0,-1.0,-1.0,-1.0,0.0,0.0,1.0,0.0,0.0,1.0,-1.0,-1.0,0.0,0.0,1.0,0.0,0.0,-1.0,1.0,1.0,-1.0,0.0,0.0,0.0,0.0,-1.0,1.0,-1.0,-1.0,0.0,0.0,0.0,0.0,-1.0,-1.0,1.0,-1.0,0.0,0.0,0.0,0.0,-1.0,1.0,-1.0,-1.0,0.0,0.0,0.0,0.0,-1.0,-1.0,1.0,-1.0,0.0,0.0,0.0,0.0,-1.0,-1.0,-1.0,-1.0,0.0,0.0,0.0,0.0,1.0,1.0,-1.0,0.0,1.0,0.0,0.0,0.0,-1.0,1.0,-1.0,0.0,1.0,0.0,0.0,0.0,1.0,1.0,1.0,0.0,1.0,0.0,0.0,0.0,-1.0,1.0,-1.0,0.0,1.0,0.0,0.0,0.0,1.0,1.0,1.0,0.0,1.0,0.0,0.0,0.0,-1.0,1.0,1.0,0.0,1.0,0.0,0.0,0.0,1.0,-1.0,1.0,0.0,-1.0,0.0,0.0,0.0,-1.0,-1.0,1.0,0.0,-1.0,0.0,0.0,0.0,1.0,-1.0,-1.0,0.0,-1.0,0.0,0.0,0.0,-1.0,-1.0,1.0,0.0,-1.0,0.0,0.0,0.0,1.0,-1.0,-1.0,0.0,-1.0,0.0,0.0,0.0,-1.0,-1.0,-1.0,0.0,-1.0,0.0,0.0,0.0,];var subMeshCounts=[6,6,6,6,6,6];return{vertex:mesh,surfaceVertexNum:subMeshCounts,};}
DefaultData.FarPlane=function(){var mesh=[-1.0,-1.0,1.0,1.0,1.0,1.0,-1.0,1.0,0.0,1.0,1.0,1.0,1.0,0.0,0.0,1.0,1.0,1.0,0.0,0.0,-1.0,1.0,1.0,1.0,0.0,-1.0,-1.0,1.0,1.0,1.0];return{vertex:mesh,count:6,};}
function GL_Box(){this._Vertex=new Array(8);this._Vertex[0]=new Point3(0,0,0);this._Vertex[1]=new Point3(0,0,0);this._Vertex[2]=new Point3(0,0,0);this._Vertex[3]=new Point3(0,0,0);this._Vertex[4]=new Point3(0,0,0);this._Vertex[5]=new Point3(0,0,0);this._Vertex[6]=new Point3(0,0,0);this._Vertex[7]=new Point3(0,0,0);this.Copy=function(data){for(let i=0;i<this._Vertex.length;i++){this._Vertex[i]=data._Vertex[i];}}
this.MinVertex=function(minPoint){let minX=this._Vertex[0].x,minY=this._Vertex[0].y,minZ=this._Vertex[0].z;for(let i=1;i<this._Vertex.length;i++){if(this._Vertex[i].x<minX){minX=this._Vertex[i].x;}
if(this._Vertex[i].y<minY){minY=this._Vertex[i].y;}
if(this._Vertex[i].z<minZ){minZ=this._Vertex[i].z;}}
minPoint.x=minX,minPoint.y=minY,minPoint.z=minZ;}
this.MaxVertex=function(maxPoint){let maxX=this._Vertex[0].x,maxY=this._Vertex[0].y,maxZ=this._Vertex[0].z;for(let i=1;i<this._Vertex.length;i++){if(this._Vertex[i].x>maxX){maxX=this._Vertex[i].x;}
if(this._Vertex[i].y>maxY){maxY=this._Vertex[i].y;}
if(this._Vertex[i].z>maxZ){maxZ=this._Vertex[i].z;}}
maxPoint.x=maxX,maxPoint.y=maxY,maxPoint.z=maxZ;}}
function GL_BoxSet(){this._ObjectBox=new GL_Box();this._SurfaceBoxes=new Array();this.Clear=function(){this._SurfaceBoxes.splice(0,this.surfaceBoxes.length);}}
function GL_Vertex_Index(start,end){this._startIndex=start;this._endIndex=end;this.Copy=function(data){this._startIndex=data._startIndex;this._endIndex=data._endIndex;}}
function GL_PARTLODDATA(){this._uLevel=0;this._fZDist=0;this._arrVertex=null;this._arrSubsetPrimitType=null;this._arrSurfaceVertexNum=new Array();this._arrCurveVertexNum=new Array();this._boxset=new GL_BoxSet();this.Clear=function(){if(this._arrVertex!=null){this._arrVertex.splice(0,this._arrVertex.length);}
if(this._arrSubsetPrimitType!=null){this._arrSubsetPrimitType.splice(0,this._arrSubsetPrimitType.length);}
this._arrSurfaceVertexNum.splice(0,this._arrSurfaceVertexNum.length);this._arrCurveVertexNum.splice(0,this._arrCurveVertexNum.length)
this._boxset.Clear();}}
function GL_PART(){this._arrPartLODData=new Array(1);this.Clear=function(){this._arrPartLODData.splice(0,this._arrPartLODData.length);}}
function GL_PARTSET(){this._uLODLevel=0;this._arrPartSet=new Array();this.Clear=function(){this._arrPartSet.splice(0,this._arrPartSet.length);}}
function GL_MATERIALSET(){this._arrMaterialSet=new Array();this.Clear=function(){this._arrMaterialSet.splice(0,this._arrMaterialSet.length);}}
var matAdfOut=new ADF_BASEMATRIX();function GL_OBJECT(){this._uObjectID=0;this._uPartIndex=0;this._uPrimitType=ADFPT_TRIANGLELIST;this._arrSurfaceMaterialIndex=new Array();this._nFillMode=ADFFILL_SOLID;this._nCullMode=ADFCULL_NONE;this._uObjectVertexNum=0;this._matLocal=new ADF_BASEMATRIX();this._matWorld=new ADF_BASEMATRIX();this._matObject=mat4.create();this._objectAnim=new ADF_OBJ_ANIM_SAVEDATA();this.Clear=function(){this._arrSurfaceMaterialIndex.splice(0,this._arrSurfaceMaterialIndex.length);this._objectAnim.Clear();}
this.GetAnimMatrix=function(uFrame,matGlOut){ADFMatrixIdentity(matAdfOut);if(this._objectAnim._arrKeyFrameData.length==0){CalMat4(this._matLocal,g_matLocal);CalMat4(this._matWorld,g_matWorld);mat4.multiply(matGlOut,g_matWorld,g_matLocal);}else{CalculateObjectWldMatrix(uFrame,this._objectAnim,this._matLocal,this._matWorld,matAdfOut);CalMat4(matAdfOut,matGlOut);}}
this.GetAnimTransparent=function(uFrame){return CalculateObjectNoTransparency(uFrame,this._objectAnim);}
this.GetObjectMat=function(){this.GetAnimMatrix(0,this._matObject);}}
function GL_OBJECTSET(){this._uFrameSize=0;this._arrObjectSet=new Array();this.Clear=function(){this._arrObjectSet.splice(0,this._arrObjectSet.length);}}
function GL_CAMERA(){this._DefaultCamera=new ADF_CAMERA();this._arrCameraAnimSaveData=new Array();this.Clear=function(){this._DefaultCamera.Clear();this._arrCameraAnimSaveData.splice(0,this._arrCameraAnimSaveData.length);}
this.Copy=function(data){this._DefaultCamera.Copy(data._DefaultCamera);this._arrCameraAnimSaveData.splice(0,this._arrCameraAnimSaveData.length);for(var i in data._arrCameraAnimSaveData){this._arrCameraAnimSaveData[i]=data._arrCameraAnimSaveData[i];}}
this.GetAnimCamera=function(uFrame,cameraOut){CalculateCameraDataByKeyFrame(uFrame,this._arrCameraAnimSaveData,cameraOut);return cameraOut;}}
function GL_MODELTREENODE(){this._uTreeNodeID=-1;this._uJSTreeID=-1;this._strName="";this._arrNodeParameters=new Array();this._uObjectIndex=-1;this._bVisibleOriginal=true;this._bVisible=true;this._uObjectTriangleCount=-1;this._arrSubNode=new Array();this.Clear=function(){this._arrNodeParameters.splice(0,this._arrNodeParameters.length);this._arrSubNode.splice(0,this._arrSubNode.length);}}
function GL_NODEPARAMETER(){this._strName="";this._strValue="";}
function GL_ANNOTATION(){this._arrComment=new Array();}
const GL_ORIGINAL=0;const GL_USERDEFINE=1;const GL_USERPICKED=2;const GLTRANS_ALL=1;const GLTRANS_PART=2;const GLTRANS_NO=3;const GL_SCENEUPTYPEX=0;const GL_SCENEUPTYPEY=1;const GL_SCENEUPTYPEZ=2;var oldVec=vec3.create();var newVec=vec3.create();function CalTranslatePoint(x,y,z,ObjectMat,newPoint){oldVec[0]=x,oldVec[1]=y,oldVec[2]=z;vec3.transformMat4(newVec,oldVec,ObjectMat);newPoint.x=newVec[0],newPoint.y=newVec[1],newPoint.z=newVec[2];}
function CalMat4(matAdfOut,matGlOut){mat4.set(matGlOut,matAdfOut._11,matAdfOut._12,matAdfOut._13,matAdfOut._14,matAdfOut._21,matAdfOut._22,matAdfOut._23,matAdfOut._24,matAdfOut._31,matAdfOut._32,matAdfOut._33,matAdfOut._34,matAdfOut._41,matAdfOut._42,matAdfOut._43,matAdfOut._44);}
function CalADFMat(matrix){let adfMat=new ADF_BASEMATRIX();adfMat._11=matrix[0],adfMat._12=matrix[1],adfMat._13=matrix[2],adfMat._14=matrix[3];adfMat._21=matrix[4],adfMat._22=matrix[5],adfMat._23=matrix[6],adfMat._24=matrix[7];adfMat._31=matrix[8],adfMat._32=matrix[9],adfMat._33=matrix[10],adfMat._34=matrix[11];adfMat._41=matrix[12],adfMat._42=matrix[13],adfMat._43=matrix[14],adfMat._44=matrix[15];return adfMat;}
var djb2Code=function(id){return id%1000;}
function HashMap(){var map=[];var keyValPair=function(key,value){this.key=key;this.value=value;}
this.put=function(key,value){var position=djb2Code(key);if(map[position]==undefined){map[position]=new LinkedList();}
map[position].append(new keyValPair(key,value));}
this.get=function(key){var position=djb2Code(key);if(map[position]!=undefined){var current=map[position].getHead();while(current.next){if(current.element.key===key){return current.element.value;}
current=current.next;}
if(current.element.key===key){return current.element.value;}}
return undefined;}
this.remove=function(key){var position=djb2Code(key);if(map[position]!=undefined){var current=map[position].getHead();while(current.next){if(current.element.key===key){map[position].remove(current.element);if(map[position].isEmpty()){map[position]==undefined;}
return true;}
current=current.next;}
if(current.element.key===key){map[position].remove(current.element);if(map[position].isEmpty()){map[position]==undefined;}
return true;}}}
this.isEmpty=function(){if(map.length==0){return true;}else{return false;}}}
function LinkedList(){var Node=function(element){this.element=element;this.next=null;};var length=0;var head=null;this.append=function(element){var node=new Node(element);var current;if(head===null){head=node;}else{current=head;while(current.next){current=current.next;}
current.next=node;}
length++;}
this.removeAt=function(position){if(position>-1&&position<length){var current=head;var index=0;var previous;if(position==0){head=current.next;}else{while(index++<position){previous=current;current=current.next;}
previous.next=current.next;}
length--;return current.element;}else{return null;}}
this.insert=function(position,element){if(position>-1&&position<=length){var node=new Node(element);current=head;var index=0;var previous;if(position==0){node.next=current;head=node;}else{while(index++<position){previous=current;current=current.next;}
previous.next=node;node.next=current;}
length++;return true;}else{return false;}}
this.toString=function(){var current=head;var string='';while(current){string+=','+current.element;current=current.next;}
return string;}
this.indexOf=function(element){var current=head;var index=-1;while(current){if(element===current.element){return index;}
index++;current=current.next;}
return-1;}
this.getLength=function(){return length;}
this.getHead=function(){return head;}
this.isEmpty=function(){return length==0;}}