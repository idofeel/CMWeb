// 二维向量(无符号整型)，通过Uint32Array获取，Uint32占4字节
function ADF_BASEUINT2(){
	this.x = 0;					// Uint32
	this.y = 0;					// Uint32

	this.Clear = function () {
		this.x = 0;	
		this.y = 0;	
	}
	this.Clone = function () {
		var newData = new ADF_BASEUINT2();
		newData.x = this.x;
		newData.y = this.y;
		return newData;
	}
	this.Copy = function (data) {
		this.x = data.x;
		this.y = data.y;
	}
}

// 二维向量(单精)，通过Float32Array获取，Float32占4字节
function ADF_BASEFLOAT2(){
	this.x = 0.0;				// Float32
	this.y = 0.0;				// Float32

	this.Clear = function () {
		this.x = 0;	
		this.y = 0;	
	}
	this.Clone = function () {
		var newData = new ADF_BASEFLOAT2();
		newData.x = this.x;
		newData.y = this.y;
		return newData;
	}
	this.Copy = function (data) {
		this.x = data.x;
		this.y = data.y;
	}
}

// 三维向量(单精)
function ADF_BASEFLOAT3(){
	this.x = 0.0;				// Float32
	this.y = 0.0;				// Float32
	this.z = 0.0;				// Float32

	this.Clear = function () {
		this.x = 0;	
		this.y = 0;	
		this.z = 0;
	}
	this.Clone = function () {
		var newData = new ADF_BASEFLOAT3();
		newData.x = this.x;
		newData.y = this.y;
		newData.z = this.z;
		return newData;
	}
	this.Copy = function (data) {
		this.x = data.x;
		this.y = data.y;
		this.z = data.z;
	}
	this.Add = function (data1, data2) {
		this.x = data1.x + data2.x;
		this.y = data1.y + data2.y;
		this.z = data1.z + data2.z;
	}
	this.Sub = function (data1, data2) {
		this.x = data1.x - data2.x;
		this.y = data1.y - data2.y;
		this.z = data1.z - data2.z;
	}
	this.Mul = function (data) {
		this.x = this.x * data;
		this.y = this.y * data;
		this.z = this.z * data;
	}
}

// 四维向量(单精)
function ADF_BASEFLOAT4(){
	this.x = 0.0;				// Float32
	this.y = 0.0;				// Float32
	this.z = 0.0;				// Float32
	this.w = 0.0;				// Float32

	this.Clear = function () {
		this.x = 0;	
		this.y = 0;	
		this.z = 0;	
		this.w = 0;
	}
	this.Clone = function () {
		var newData = new ADF_BASEFLOAT4();
		newData.x = this.x;
		newData.y = this.y;
		newData.z = this.z;
		newData.w = this.w;
		return newData;
	}
	this.Copy = function (data) {
		this.x = data.x;
		this.y = data.y;
		this.z = data.z;
		this.w = data.w;
	}
}

// 三角片(单精)
function ADF_BASETRIANGLE(){
	this.p1 = new ADF_BASEFLOAT3();
	this.p2 = new ADF_BASEFLOAT3();
	this.p3 = new ADF_BASEFLOAT3();

	this.Clear = function () {
		this.p1.Clear();	
		this.p2.Clear();
		this.p3.Clear();		
	}
	this.Clone = function () {
		var newData = new ADF_BASETRIANGLE();
		newData.p1.Copy(this.p1);
		newData.p2.Copy(this.p2);
		newData.p3.Copy(this.p3);
		return newData;
	}
	this.Copy = function (data) {
		this.p1.Copy(data.p1);
		this.p2.Copy(data.p2);
		this.p3.Copy(data.p3);
	}	
}

// 矩阵(单精)
function ADF_BASEMATRIX(){
	this._11 = 1.0;				// Float32
	this._12 = 0.0;				// Float32
	this._13 = 0.0;				// Float32
	this._14 = 0.0;				// Float32

	this._21 = 0.0;				// Float32
	this._22 = 1.0;				// Float32
	this._23 = 0.0;				// Float32
	this._24 = 0.0;				// Float32

	this._31 = 0.0;				// Float32
	this._32 = 0.0;				// Float32
	this._33 = 1.0;				// Float32
	this._34 = 0.0;				// Float32

	this._41 = 0.0;				// Float32	
	this._42 = 0.0;				// Float32
	this._43 = 0.0;				// Float32
	this._44 = 1.0;				// Float32

	this.Clear = function () {
		this._11 = 1.0;				
		this._12 = 0.0;				
		this._13 = 0.0;				
		this._14 = 0.0;				
	
		this._21 = 0.0;				
		this._22 = 1.0;				
		this._23 = 0.0;				
		this._24 = 0.0;				
	
		this._31 = 0.0;				
		this._32 = 0.0;				
		this._33 = 1.0;				
		this._34 = 0.0;				
	
		this._41 = 0.0;					
		this._42 = 0.0;				
		this._43 = 0.0;				
		this._44 = 1.0;				
	}
	this.Clone = function () {
		var newData = new ADF_BASEMATRIX();
		newData._11 = this._11;
		newData._12 = this._12;
		newData._13 = this._13;
		newData._14 = this._14;

		newData._21 = this._21;
		newData._22 = this._22;
		newData._23 = this._23;
		newData._24 = this._24;

		newData._31 = this._31;
		newData._32 = this._32;
		newData._33 = this._33;
		newData._34 = this._34;

		newData._41 = this._41;
		newData._42 = this._42;
		newData._43 = this._43;
		newData._44 = this._44;

		return newData;
	}
	this.Copy = function (data) {
		this._11 = data._11;
		this._12 = data._12;
		this._13 = data._13;
		this._14 = data._14;

		this._21 = data._21;
		this._22 = data._22;
		this._23 = data._23;
		this._24 = data._24;

		this._31 = data._31;
		this._32 = data._32;
		this._33 = data._33;
		this._34 = data._34;

		this._41 = data._41;
		this._42 = data._42;
		this._43 = data._43;
		this._44 = data._44;
	}
}

// 二维向量(双精)，通过Float64Arrayy获取，Float64占8字节
function ADF_BASEDOUBLE2(){
	this.x = 0.0;				// Float64
	this.y = 0.0;				// Float64

	this.Clear = function () {
		this.x = 0;	
		this.y = 0;	
	}
	this.Clone = function () {
		var newData = new ADF_BASEDOUBLE2();
		newData.x = this.x;
		newData.y = this.y;
		return newData;
	}
	this.Copy = function (data) {
		this.x = data.x;
		this.y = data.y;
	}
}

// 三维向量(双精)
function ADF_BASEDOUBLE3(){
	this.x = 0.0;				// Float64
	this.y = 0.0;				// Float64
	this.z = 0.0;				// Float64

	this.Clear = function () {
		this.x = 0;	
		this.y = 0;	
		this.z = 0.0;
	}
	this.Clone = function () {
		var newData = new ADF_BASEDOUBLE3();
		newData.x = this.x;
		newData.y = this.y;
		newData.z = this.z;
		return newData;
	}
	this.Copy = function (data) {
		this.x = data.x;
		this.y = data.y;
		this.z = data.z;
	}
	this.Add = function (data1, data2) {
		this.x = data1.x + data2.x;
		this.y = data1.y + data2.y;
		this.z = data1.z + data2.z;
	}
	this.Sub = function (data1, data2) {
		this.x = data1.x - data2.x;
		this.y = data1.y - data2.y;
		this.z = data1.z - data2.z;
	}
	this.Mul = function (data) {
		this.x = this.x * data;
		this.y = this.y * data;
		this.z = this.z * data;
	}
}

// 四维向量(双精)
function ADF_BASEDOUBLE4(){
	this.x = 0.0;				// Float64
	this.y = 0.0;				// Float64
	this.z = 0.0;				// Float64
	this.w = 0.0;				// Float64

	this.Clear = function () {
		this.x = 0.0;	
		this.y = 0.0;
		this.z = 0.0;	
		this.w = 0.0;	
	}
	this.Clone = function () {
		var newData = new ADF_BASEDOUBLE4();
		newData.x = this.x;
		newData.y = this.y;
		newData.z = this.z;
		newData.w = this.w;
		return newData;
	}
	this.Copy = function (data) {
		this.x = data.x;
		this.y = data.y;
		this.z = data.z;
		this.w = data.w;
	}
}

// 矩阵(双精)
function ADF_BASEMATRIX(){
	this._11 = 1.0;				// Float64
	this._12 = 0.0;				// Float64
	this._13 = 0.0;				// Float64
	this._14 = 0.0;				// Float64

	this._21 = 0.0;				// Float64
	this._22 = 1.0;				// Float64
	this._23 = 0.0;				// Float64
	this._24 = 0.0;				// Float64

	this._31 = 0.0;				// Float64
	this._32 = 0.0;				// Float64
	this._33 = 1.0;				// Float64
	this._34 = 0.0;				// Float64

	this._41 = 0.0;				// Float64	
	this._42 = 0.0;				// Float64
	this._43 = 0.0;				// Float64
	this._44 = 1.0;				// Float64

	this.Clear = function () {
		this._11 = 1.0;	
		this._12 = 0.0;	
		this._13 = 0.0;	
		this._14 = 0.0;	

		this._21 = 0.0;	
		this._22 = 1.0;	
		this._23 = 0.0;	
		this._24 = 0.0;		

		this._31 = 0.0;		
		this._32 = 0.0;	
		this._33 = 1.0;		
		this._34 = 0.0;		

		this._41 = 0.0;		
		this._42 = 0.0;		
		this._43 = 0.0;		
		this._44 = 1.0;			
	}

	this.Clone = function () {
		var newData = new ADF_BASEMATRIX();
		newData._11 = this._11;
		newData._12 = this._12;
		newData._13 = this._13;
		newData._14 = this._14;

		newData._21 = this._21;
		newData._22 = this._22;
		newData._23 = this._23;
		newData._24 = this._24;

		newData._31 = this._31;
		newData._32 = this._32;
		newData._33 = this._33;
		newData._34 = this._34;

		newData._41 = this._41;
		newData._42 = this._42;
		newData._43 = this._43;
		newData._44 = this._44;

		return newData;
	}
	this.Copy = function (data) {
		this._11 = data._11;
		this._12 = data._12;
		this._13 = data._13;
		this._14 = data._14;

		this._21 = data._21;
		this._22 = data._22;
		this._23 = data._23;
		this._24 = data._24;

		this._31 = data._31;
		this._32 = data._32;
		this._33 = data._33;
		this._34 = data._34;

		this._41 = data._41;
		this._42 = data._42;
		this._43 = data._43;
		this._44 = data._44;
	}
}