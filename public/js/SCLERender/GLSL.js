// File: GLSL.js

/**
 * @author wujiali
 */
 
//===================================================================================================

// Vertex shader program
const vsSolid = "attribute vec3 a_Position;attribute vec3 a_Vector;attribute vec2 a_UV;uniform mat4 u_MVPMatrix;uniform vec3 u_eyeLocation;uniform float u_power;varying vec4 v_Diffuse;varying vec4 v_Ambient;varying vec4 v_Specular;varying vec2 v_TextureCoord;void main() {gl_Position = u_MVPMatrix * vec4(a_Position, 1.0); v_TextureCoord = a_UV; vec3 u_LightLocation = vec3(0.0, 0.0, 1.0); vec3 u_LightDiffuse = vec3(0.85, 0.85, 0.85);vec3 u_LightAmbient = vec3(0.15, 0.15, 0.15);vec3 u_LightSpecular = vec3(0.85, 0.85, 0.85);vec3 vertexPosition= gl_Position.xyz; vec3 vectorPosition= (u_MVPMatrix * vec4(a_Vector+a_Position, 1.0)).xyz;vec3 normalVector = normalize(vectorPosition - vertexPosition);   vec3 vectorLight = normalize(-u_LightLocation);float factorDiffuse = abs(dot(vectorLight, normalVector));factorDiffuse = clamp(factorDiffuse, 0.0, 1.0);v_Diffuse = vec4(u_LightDiffuse * factorDiffuse, 1.0);    v_Ambient = vec4(u_LightAmbient, 1.0);vec3 eyeVector = normalize(vertexPosition - u_eyeLocation);vec3 reflection = normalize(2.0 * factorDiffuse * normalVector- vectorLight);float factorSpecular = abs(dot(reflection, eyeVector));factorSpecular = pow(factorSpecular, u_power); v_Specular = vec4(factorSpecular * u_LightSpecular, 1.0);}";
// Fragment shader program
const fsSolid = "precision mediump float;varying vec4 v_Diffuse;varying vec4 v_Ambient;varying vec4 v_Specular;varying vec2 v_TextureCoord;uniform int u_FragmentTex;uniform vec4 u_MaterialDiffuse;uniform vec4 u_MaterialAmbient;uniform vec4 u_MaterialSpecular;uniform vec4 u_MaterialEmissive;uniform sampler2D u_TextureUnit;uniform vec4 u_PureColor;void main() {vec3 DiffuseColor = (u_MaterialDiffuse * v_Diffuse).xyz * u_MaterialDiffuse.w; vec3 AmbientColor = (u_MaterialAmbient * v_Ambient).xyz * u_MaterialAmbient.w; vec3 SpecularColor = (u_MaterialSpecular * v_Specular).xyz * u_MaterialSpecular.w;vec3 EmissiveColor = u_MaterialEmissive.xyz;vec4 color; if (u_FragmentTex == 0) {color = vec4(DiffuseColor + AmbientColor + SpecularColor + EmissiveColor, u_MaterialEmissive.w);} else if (u_FragmentTex == 1) {vec3 TexColor = (texture2D(u_TextureUnit, v_TextureCoord)).xyz;color = vec4(TexColor * (DiffuseColor + AmbientColor + SpecularColor + EmissiveColor), u_MaterialEmissive.w); } else {color = vec4(u_PureColor.xyz, u_MaterialEmissive.w);}gl_FragColor = color;}";

const vsPicture = "attribute vec3 a_Position;attribute vec2 a_UV;varying vec2 v_TextureCoord;void main() {v_TextureCoord = a_UV; gl_Position = vec4(a_Position, 1.0);}";

const fsPicture = "precision mediump float;varying vec2 v_TextureCoord;uniform sampler2D u_TextureUnit;void main() {gl_FragColor = texture2D(u_TextureUnit, v_TextureCoord);}";

const vsLine = "attribute vec3 a_Position;uniform mat4 u_MVPMatrix;void main() { gl_Position = u_MVPMatrix * vec4(a_Position, 1.0);}";

const fsLine = "precision mediump float;uniform vec3 u_LineColor;void main() { gl_FragColor = vec4(u_LineColor, 1.0);}";

function initSolidProgramInfo(gl) {
    // Initialize a shader program; this is where all the lighting
    // for the vertices and so forth is established.
    let shaderProgram = initShaderProgram(gl, vsSolid, fsSolid);

    // Collect all the info needed to use the shader program.
    // Look up which attribute our shader program is using
    // for aVertexPosition and look up uniform locations.
    return {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'a_Position'),
            vertexVector: gl.getAttribLocation(shaderProgram, 'a_Vector'),
            vertexUV: gl.getAttribLocation(shaderProgram, 'a_UV'),
        },
        uniformLocations: {
            MVPMatrix: gl.getUniformLocation(shaderProgram, 'u_MVPMatrix'),
            eyeLocation: gl.getUniformLocation(shaderProgram, 'u_eyeLocation'),
            power: gl.getUniformLocation(shaderProgram, 'u_power'),
            fragmentTex: gl.getUniformLocation(shaderProgram, 'u_FragmentTex'),
            materialDiffuse: gl.getUniformLocation(shaderProgram, 'u_MaterialDiffuse'),
            materialAmbient: gl.getUniformLocation(shaderProgram, 'u_MaterialAmbient'),
            materialSpecular: gl.getUniformLocation(shaderProgram, 'u_MaterialSpecular'),
            materialEmissive: gl.getUniformLocation(shaderProgram, 'u_MaterialEmissive'),
            textureUnit: gl.getUniformLocation(shaderProgram, 'u_TextureUnit'),
            pureColor: gl.getUniformLocation(shaderProgram, 'u_PureColor'),
        },
    };
}

function initPictureProgramInfo(gl) {
    let shaderProgram = initShaderProgram(gl, vsPicture, fsPicture);

    return {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'a_Position'),
            vertexUV: gl.getAttribLocation(shaderProgram, 'a_UV'),
        },
        uniformLocations: {
            textureUnit: gl.getUniformLocation(shaderProgram, 'u_TextureUnit'),
        },
    };
}

function initLineProgramInfo(gl) {
    let shaderProgram = initShaderProgram(gl, vsLine, fsLine);

    return {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'a_Position'),
        },
        uniformLocations: {
            MVPMatrix: gl.getUniformLocation(shaderProgram, 'u_MVPMatrix'),
            lineColor: gl.getUniformLocation(shaderProgram, 'u_LineColor'),
        }
    };
}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
    let vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    let fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // Create the shader program
    let shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
        return null;
    }

    return shaderProgram;
}
  
//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    // Send the source to the shader object
    gl.shaderSource(shader, source);

    // Compile the shader program
    gl.compileShader(shader);

    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}