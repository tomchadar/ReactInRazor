/* eslint-disable */

var nodeEnv = `%NODE_ENV%`;
var backendEnv = `%BACKEND_ENV%`;
var reactUrlEnv = `%PUBLIC_URL%`;
var procEnv = {};
if (process) {
    procEnv = process.env;
}
if (procEnv && 'NODE_ENV' in procEnv) {
    nodeEnv = procEnv.NODE_ENV;
}
if (procEnv && 'BACKEND_ENV' in procEnv) {
    backendEnv = procEnv.BACKEND_ENV;
}
if (procEnv && 'BACKEND_ENV' in procEnv) {
    backendEnv = procEnv.BACKEND_ENV;
}
if (procEnv && 'PUBLIC_URL' in procEnv) {
    reactUrlEnv = procEnv.PUBLIC_URL;
}

window.BACKEND_MODE = false;
if (backendEnv && (typeof (backendEnv) === 'object' || typeof (backendEnv) === 'boolean')) {
    window.BACKEND_MODE = true;
}
if (reactUrlEnv && (typeof (reactUrlEnv) === 'string') && reactUrlEnv.length>0) {
    window.REACT_PUBLIC_URL = reactUrlEnv;
}
else {
    window.REACT_PUBLIC_URL = 'FrontEnd/public/';
}

var IS_REACT_DEVELOPMENT = false;
if (!nodeEnv || nodeEnv.toLowerCase() === 'development') {
    IS_REACT_DEVELOPMENT = true;
} else {
    IS_REACT_DEVELOPMENT = false;
}
if (window.BACKEND_MODE) {
    IS_REACT_DEVELOPMENT = false;
}
window.IS_REACT_DEVELOPMENT = IS_REACT_DEVELOPMENT;