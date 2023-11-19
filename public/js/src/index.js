(()=>{var e,t,r,n,o,i,s="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{};function a(e,t,r,n){Object.defineProperty(e,t,{get:r,set:n,enumerable:!0,configurable:!0})}function u(e,t){return function(){return e.apply(t,arguments)}}// utils is a library of generic helper functions non-specific to axios
let{toString:l}=Object.prototype,{getPrototypeOf:f}=Object,c=(e=Object.create(null),t=>{let r=l.call(t);return e[r]||(e[r]=r.slice(8,-1).toLowerCase())}),h=e=>(e=e.toLowerCase(),t=>c(t)===e),p=e=>t=>typeof t===e,{isArray:d}=Array,y=p("undefined"),g=h("ArrayBuffer"),m=p("string"),b=p("function"),w=p("number"),E=e=>null!==e&&"object"==typeof e,v=e=>{if("object"!==c(e))return!1;let t=f(e);return(null===t||t===Object.prototype||null===Object.getPrototypeOf(t))&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},A=h("Date"),O=h("File"),S=h("Blob"),R=h("FileList"),T=h("URLSearchParams");/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 *
 * @param {Boolean} [allOwnKeys = false]
 * @returns {any}
 */function B(e,t,{allOwnKeys:r=!1}={}){let n,o;// Don't bother if no value provided
if(null!=e){if("object"!=typeof e&&/*eslint no-param-reassign:0*/(e=[e]),d(e))for(n=0,o=e.length;n<o;n++)t.call(null,e[n],n,e);else{let o;// Iterate over object keys
let i=r?Object.getOwnPropertyNames(e):Object.keys(e),s=i.length;for(n=0;n<s;n++)o=i[n],t.call(null,e[o],o,e)}}}function U(e,t){let r;t=t.toLowerCase();let n=Object.keys(e),o=n.length;for(;o-- >0;)if(t===(r=n[o]).toLowerCase())return r;return null}let C=/*eslint no-undef:0*/"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:s,x=e=>!y(e)&&e!==C,L=(t="undefined"!=typeof Uint8Array&&f(Uint8Array),e=>t&&e instanceof t),j=h("HTMLFormElement"),P=(({hasOwnProperty:e})=>(t,r)=>e.call(t,r))(Object.prototype),N=h("RegExp"),I=(e,t)=>{let r=Object.getOwnPropertyDescriptors(e),n={};B(r,(r,o)=>{let i;!1!==(i=t(r,o,e))&&(n[o]=i||r)}),Object.defineProperties(e,n)},k="abcdefghijklmnopqrstuvwxyz",F="0123456789",_={DIGIT:F,ALPHA:k,ALPHA_DIGIT:k+k.toUpperCase()+F},D=h("AsyncFunction");var M={isArray:d,isArrayBuffer:g,isBuffer:/**
 * Determine if a value is a Buffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Buffer, otherwise false
 */function(e){return null!==e&&!y(e)&&null!==e.constructor&&!y(e.constructor)&&b(e.constructor.isBuffer)&&e.constructor.isBuffer(e)},isFormData:e=>{let t;return e&&("function"==typeof FormData&&e instanceof FormData||b(e.append)&&("formdata"===(t=c(e))||// detect form-data instance
"object"===t&&b(e.toString)&&"[object FormData]"===e.toString()))},isArrayBufferView:/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&g(e.buffer)},isString:m,isNumber:w,isBoolean:e=>!0===e||!1===e,isObject:E,isPlainObject:v,isUndefined:y,isDate:A,isFile:O,isBlob:S,isRegExp:N,isFunction:b,isStream:e=>E(e)&&b(e.pipe),isURLSearchParams:T,isTypedArray:L,isFileList:R,forEach:B,merge:/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 *
 * @returns {Object} Result of all merge properties
 */function e(){let{caseless:t}=x(this)&&this||{},r={},n=(n,o)=>{let i=t&&U(r,o)||o;v(r[i])&&v(n)?r[i]=e(r[i],n):v(n)?r[i]=e({},n):d(n)?r[i]=n.slice():r[i]=n};for(let e=0,t=arguments.length;e<t;e++)arguments[e]&&B(arguments[e],n);return r},extend:(e,t,r,{allOwnKeys:n}={})=>(B(t,(t,n)=>{r&&b(t)?e[n]=u(t,r):e[n]=t},{allOwnKeys:n}),e),trim:e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,""),stripBOM:e=>(65279===e.charCodeAt(0)&&(e=e.slice(1)),e),inherits:(e,t,r,n)=>{e.prototype=Object.create(t.prototype,n),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),r&&Object.assign(e.prototype,r)},toFlatObject:(e,t,r,n)=>{let o,i,s;let a={};// eslint-disable-next-line no-eq-null,eqeqeq
if(t=t||{},null==e)return t;do{for(i=(o=Object.getOwnPropertyNames(e)).length;i-- >0;)s=o[i],(!n||n(s,e,t))&&!a[s]&&(t[s]=e[s],a[s]=!0);e=!1!==r&&f(e)}while(e&&(!r||r(e,t))&&e!==Object.prototype)return t},kindOf:c,kindOfTest:h,endsWith:(e,t,r)=>{e=String(e),(void 0===r||r>e.length)&&(r=e.length),r-=t.length;let n=e.indexOf(t,r);return -1!==n&&n===r},toArray:e=>{if(!e)return null;if(d(e))return e;let t=e.length;if(!w(t))return null;let r=Array(t);for(;t-- >0;)r[t]=e[t];return r},forEachEntry:(e,t)=>{let r;let n=e&&e[Symbol.iterator],o=n.call(e);for(;(r=o.next())&&!r.done;){let n=r.value;t.call(e,n[0],n[1])}},matchAll:(e,t)=>{let r;let n=[];for(;null!==(r=e.exec(t));)n.push(r);return n},isHTMLForm:j,hasOwnProperty:P,hasOwnProp:P,reduceDescriptors:I,freezeMethods:e=>{I(e,(t,r)=>{// skip restricted props in strict mode
if(b(e)&&-1!==["arguments","caller","callee"].indexOf(r))return!1;let n=e[r];if(b(n)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+r+"'")})}})},toObjectSet:(e,t)=>{let r={};return(e=>{e.forEach(e=>{r[e]=!0})})(d(e)?e:String(e).split(t)),r},toCamelCase:e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(e,t,r){return t.toUpperCase()+r}),noop:()=>{},toFiniteNumber:(e,t)=>Number.isFinite(e=+e)?e:t,findKey:U,global:C,isContextDefined:x,ALPHABET:_,generateString:(e=16,t=_.ALPHA_DIGIT)=>{let r="",{length:n}=t;for(;e--;)r+=t[Math.random()*n|0];return r},isSpecCompliantForm:/**
 * If the thing is a FormData object, return true, otherwise return false.
 *
 * @param {unknown} thing - The thing to check.
 *
 * @returns {boolean}
 */function(e){return!!(e&&b(e.append)&&"FormData"===e[Symbol.toStringTag]&&e[Symbol.iterator])},toJSONObject:e=>{let t=Array(10),r=(e,n)=>{if(E(e)){if(t.indexOf(e)>=0)return;if(!("toJSON"in e)){t[n]=e;let o=d(e)?[]:{};return B(e,(e,t)=>{let i=r(e,n+1);y(i)||(o[t]=i)}),t[n]=void 0,o}}return e};return r(e,0)},isAsyncFn:D,isThenable:e=>e&&(E(e)||b(e))&&b(e.then)&&b(e.catch)};/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 *
 * @returns {Error} The created error.
 */function q(e,t,r,n,o){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=Error().stack,this.message=e,this.name="AxiosError",t&&(this.code=t),r&&(this.config=r),n&&(this.request=n),o&&(this.response=o)}M.inherits(q,Error,{toJSON:function(){return{// Standard
message:this.message,name:this.name,// Microsoft
description:this.description,number:this.number,// Mozilla
fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,// Axios
config:M.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});let z=q.prototype,H={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(e=>{H[e]={value:e}}),Object.defineProperties(q,H),Object.defineProperty(z,"isAxiosError",{value:!0}),// eslint-disable-next-line func-names
q.from=(e,t,r,n,o,i)=>{let s=Object.create(z);return M.toFlatObject(e,s,function(e){return e!==Error.prototype},e=>"isAxiosError"!==e),q.call(s,e.message,t,r,n,o),s.cause=e,s.name=e.name,i&&Object.assign(s,i),s},n=function(e){// go through the array every three bytes, we'll deal with trailing stuff later
for(var t,r=e.length,n=r%3// if we have 1 byte left, pad 2 bytes
,o=[],i=0,s=r-n;i<s;i+=16383// must be multiple of 3
)o.push(function(e,t,r){for(var n,o=[],i=t;i<r;i+=3)o.push(J[(n=(e[i]<<16&16711680)+(e[i+1]<<8&65280)+(255&e[i+2]))>>18&63]+J[n>>12&63]+J[n>>6&63]+J[63&n]);return o.join("")}(e,i,i+16383>s?s:i+16383));return 1===n?o.push(J[(t=e[r-1])>>2]+J[t<<4&63]+"=="):2===n&&o.push(J[(t=(e[r-2]<<8)+e[r-1])>>10]+J[t>>4&63]+J[t<<2&63]+"="),o.join("")};for(var J=[],V=[],W="undefined"!=typeof Uint8Array?Uint8Array:Array,K="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",$=0,G=K.length;$<G;++$)J[$]=K[$],V[K.charCodeAt($)]=$;// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
V["-".charCodeAt(0)]=62,V["_".charCodeAt(0)]=63,o=function(e,t,r,n,o){var i,s,a=8*o-n-1,u=(1<<a)-1,l=u>>1,f=-7,c=r?o-1:0,h=r?-1:1,p=e[t+c];for(c+=h,i=p&(1<<-f)-1,p>>=-f,f+=a;f>0;i=256*i+e[t+c],c+=h,f-=8);for(s=i&(1<<-f)-1,i>>=-f,f+=n;f>0;s=256*s+e[t+c],c+=h,f-=8);if(0===i)i=1-l;else{if(i===u)return s?NaN:(p?-1:1)*(1/0);s+=Math.pow(2,n),i-=l}return(p?-1:1)*s*Math.pow(2,i-n)},i=function(e,t,r,n,o,i){var s,a,u,l=8*i-o-1,f=(1<<l)-1,c=f>>1,h=23===o?5960464477539062e-23:0,p=n?0:i-1,d=n?1:-1,y=t<0||0===t&&1/t<0?1:0;for(isNaN(t=Math.abs(t))||t===1/0?(a=isNaN(t)?1:0,s=f):(s=Math.floor(Math.log(t)/Math.LN2),t*(u=Math.pow(2,-s))<1&&(s--,u*=2),s+c>=1?t+=h/u:t+=h*Math.pow(2,1-c),t*u>=2&&(s++,u/=2),s+c>=f?(a=0,s=f):s+c>=1?(a=(t*u-1)*Math.pow(2,o),s+=c):(a=t*Math.pow(2,c-1)*Math.pow(2,o),s=0));o>=8;e[r+p]=255&a,p+=d,a/=256,o-=8);for(s=s<<o|a,l+=o;l>0;e[r+p]=255&s,p+=d,s/=256,l-=8);e[r+p-d]|=128*y};var Y="function"==typeof Symbol&&"function"// eslint-disable-line dot-notation
==typeof Symbol.for?Symbol.for("nodejs.util.inspect.custom")// eslint-disable-line dot-notation
:null;function X(e){if(e>2147483647)throw RangeError('The value "'+e+'" is invalid for option "size"');// Return an augmented `Uint8Array` instance
var t=new Uint8Array(e);return Object.setPrototypeOf(t,Z.prototype),t}/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */function Z(e,t,r){// Common case.
if("number"==typeof e){if("string"==typeof t)throw TypeError('The "string" argument must be of type string. Received type number');return et(e)}return Q(e,t,r)}function Q(e,t,r){if("string"==typeof e)return function(e,t){if(("string"!=typeof t||""===t)&&(t="utf8"),!Z.isEncoding(t))throw TypeError("Unknown encoding: "+t);var r=0|ei(e,t),n=X(r),o=n.write(e,t);return o!==r&&// cause everything after the first invalid character to be ignored. (e.g.
// 'abxxcd' will be treated as 'ab')
(n=n.slice(0,o)),n}(e,t);if(ArrayBuffer.isView(e))return function(e){if(eE(e,Uint8Array)){var t=new Uint8Array(e);return en(t.buffer,t.byteOffset,t.byteLength)}return er(e)}(e);if(null==e)throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e);if(eE(e,ArrayBuffer)||e&&eE(e.buffer,ArrayBuffer)||"undefined"!=typeof SharedArrayBuffer&&(eE(e,SharedArrayBuffer)||e&&eE(e.buffer,SharedArrayBuffer)))return en(e,t,r);if("number"==typeof e)throw TypeError('The "value" argument must not be of type number. Received type number');var n=e.valueOf&&e.valueOf();if(null!=n&&n!==e)return Z.from(n,t,r);var o=function(e){if(Z.isBuffer(e)){var t,r=0|eo(e.length),n=X(r);return 0===n.length||e.copy(n,0,0,r),n}return void 0!==e.length?"number"!=typeof e.length||(t=e.length)!=t// eslint-disable-line no-self-compare
?X(0):er(e):"Buffer"===e.type&&Array.isArray(e.data)?er(e.data):void 0}(e);if(o)return o;if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof e[Symbol.toPrimitive])return Z.from(e[Symbol.toPrimitive]("string"),t,r);throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e)}function ee(e){if("number"!=typeof e)throw TypeError('"size" argument must be of type number');if(e<0)throw RangeError('The value "'+e+'" is invalid for option "size"')}function et(e){return ee(e),X(e<0?0:0|eo(e))}function er(e){for(var t=e.length<0?0:0|eo(e.length),r=X(t),n=0;n<t;n+=1)r[n]=255&e[n];return r}function en(e,t,r){var n;if(t<0||e.byteLength<t)throw RangeError('"offset" is outside of buffer bounds');if(e.byteLength<t+(r||0))throw RangeError('"length" is outside of buffer bounds');return(// Return an augmented `Uint8Array` instance
Object.setPrototypeOf(n=void 0===t&&void 0===r?new Uint8Array(e):void 0===r?new Uint8Array(e,t):new Uint8Array(e,t,r),Z.prototype),n)}function eo(e){// Note: cannot use `length < K_MAX_LENGTH` here because that fails when
// length is NaN (which is otherwise coerced to zero.)
if(e>=2147483647)throw RangeError("Attempt to allocate Buffer larger than maximum size: 0x7fffffff bytes");return 0|e}function ei(e,t){if(Z.isBuffer(e))return e.length;if(ArrayBuffer.isView(e)||eE(e,ArrayBuffer))return e.byteLength;if("string"!=typeof e)throw TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof e);var r=e.length,n=arguments.length>2&&!0===arguments[2];if(!n&&0===r)return 0;for(// Use a for loop to avoid recursion
var o=!1;;)switch(t){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":return em(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return eb(e).length;default:if(o)return n?-1:em(e).length// assume utf8
;t=(""+t).toLowerCase(),o=!0}}function es(e,t,r){var o,i,s=!1;// Return early if start > this.length. Done here to prevent potential uint32
// coercion fail below.
if((void 0===t||t<0)&&(t=0),t>this.length||((void 0===r||r>this.length)&&(r=this.length),r<=0||// Force coercion to uint32. This will also coerce falsey/NaN values to 0.
(r>>>=0)<=(t>>>=0)))return"";for(e||(e="utf8");;)switch(e){case"hex":return function(e,t,r){var n=e.length;(!t||t<0)&&(t=0),(!r||r<0||r>n)&&(r=n);for(var o="",i=t;i<r;++i)o+=ev[e[i]];return o}(this,t,r);case"utf8":case"utf-8":return ef(this,t,r);case"ascii":return function(e,t,r){var n="";r=Math.min(e.length,r);for(var o=t;o<r;++o)n+=String.fromCharCode(127&e[o]);return n}(this,t,r);case"latin1":case"binary":return function(e,t,r){var n="";r=Math.min(e.length,r);for(var o=t;o<r;++o)n+=String.fromCharCode(e[o]);return n}(this,t,r);case"base64":return o=t,i=r,0===o&&i===this.length?n(this):n(this.slice(o,i));case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return function(e,t,r){// If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
for(var n=e.slice(t,r),o="",i=0;i<n.length-1;i+=2)o+=String.fromCharCode(n[i]+256*n[i+1]);return o}(this,t,r);default:if(s)throw TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),s=!0}}function ea(e,t,r){var n=e[t];e[t]=e[r],e[r]=n}// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function eu(e,t,r,n,o){var i;// Empty buffer means no match
if(0===e.length)return -1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),(i=r=+r// Coerce to Number.
)!=i&&(r=o?0:e.length-1),r<0&&(r=e.length+r),r>=e.length){if(o)return -1;r=e.length-1}else if(r<0){if(!o)return -1;r=0}// Finally, search either indexOf (if dir is true) or lastIndexOf
if("string"==typeof t&&(t=Z.from(t,n)),Z.isBuffer(t))return(// Special case: looking for empty string/buffer always fails
0===t.length?-1:el(e,t,r,n,o));if("number"==typeof t)return(t&=255// Search for a byte value [0-255]
,"function"==typeof Uint8Array.prototype.indexOf)?o?Uint8Array.prototype.indexOf.call(e,t,r):Uint8Array.prototype.lastIndexOf.call(e,t,r):el(e,[t],r,n,o);throw TypeError("val must be string, number or Buffer")}function el(e,t,r,n,o){var i,s=1,a=e.length,u=t.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(e.length<2||t.length<2)return -1;s=2,a/=2,u/=2,r/=2}function l(e,t){return 1===s?e[t]:e.readUInt16BE(t*s)}if(o){var f=-1;for(i=r;i<a;i++)if(l(e,i)===l(t,-1===f?0:i-f)){if(-1===f&&(f=i),i-f+1===u)return f*s}else -1!==f&&(i-=i-f),f=-1}else for(r+u>a&&(r=a-u),i=r;i>=0;i--){for(var c=!0,h=0;h<u;h++)if(l(e,i+h)!==l(t,h)){c=!1;break}if(c)return i}return -1}function ef(e,t,r){r=Math.min(e.length,r);for(var n=[],o=t;o<r;){var i,s,a,u,l=e[o],f=null,c=l>239?4:l>223?3:l>191?2:1;if(o+c<=r)switch(c){case 1:l<128&&(f=l);break;case 2:(192&(i=e[o+1]))==128&&(u=(31&l)<<6|63&i)>127&&(f=u);break;case 3:i=e[o+1],s=e[o+2],(192&i)==128&&(192&s)==128&&(u=(15&l)<<12|(63&i)<<6|63&s)>2047&&(u<55296||u>57343)&&(f=u);break;case 4:i=e[o+1],s=e[o+2],a=e[o+3],(192&i)==128&&(192&s)==128&&(192&a)==128&&(u=(15&l)<<18|(63&i)<<12|(63&s)<<6|63&a)>65535&&u<1114112&&(f=u)}null===f?(// we did not generate a valid codePoint so insert a
// replacement char (U+FFFD) and advance only 1 byte
f=65533,c=1):f>65535&&(// encode to utf16 (surrogate pair dance)
f-=65536,n.push(f>>>10&1023|55296),f=56320|1023&f),n.push(f),o+=c}return function(e){var t=e.length;if(t<=4096)return String.fromCharCode.apply(String,e)// avoid extra slice()
;for(// Decode in chunks to avoid "call stack size exceeded".
var r="",n=0;n<t;)r+=String.fromCharCode.apply(String,e.slice(n,n+=4096));return r}(n)}/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */function ec(e,t,r){if(e%1!=0||e<0)throw RangeError("offset is not uint");if(e+t>r)throw RangeError("Trying to access beyond buffer length")}function eh(e,t,r,n,o,i){if(!Z.isBuffer(e))throw TypeError('"buffer" argument must be a Buffer instance');if(t>o||t<i)throw RangeError('"value" argument is out of bounds');if(r+n>e.length)throw RangeError("Index out of range")}function ep(e,t,r,n,o,i){if(r+n>e.length||r<0)throw RangeError("Index out of range")}function ed(e,t,r,n,o){return t=+t,r>>>=0,o||ep(e,t,r,4,34028234663852886e22,-34028234663852886e22),i(e,t,r,n,23,4),r+4}function ey(e,t,r,n,o){return t=+t,r>>>=0,o||ep(e,t,r,8,17976931348623157e292,-17976931348623157e292),i(e,t,r,n,52,8),r+8}/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */Z.TYPED_ARRAY_SUPPORT=function(){// Can typed array instances can be augmented?
try{var e=new Uint8Array(1),t={foo:function(){return 42}};return Object.setPrototypeOf(t,Uint8Array.prototype),Object.setPrototypeOf(e,t),42===e.foo()}catch(e){return!1}}(),Z.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(Z.prototype,"parent",{enumerable:!0,get:function(){if(Z.isBuffer(this))return this.buffer}}),Object.defineProperty(Z.prototype,"offset",{enumerable:!0,get:function(){if(Z.isBuffer(this))return this.byteOffset}}),Z.poolSize=8192// not used by this implementation
,/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/Z.from=function(e,t,r){return Q(e,t,r)},// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Z.prototype,Uint8Array.prototype),Object.setPrototypeOf(Z,Uint8Array),/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/Z.alloc=function(e,t,r){return(ee(e),e<=0)?X(e):void 0!==t?"string"==typeof r?X(e).fill(t,r):X(e).fill(t):X(e)},/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */Z.allocUnsafe=function(e){return et(e)},/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */Z.allocUnsafeSlow=function(e){return et(e)},Z.isBuffer=function(e){return null!=e&&!0===e._isBuffer&&e!==Z.prototype// so Buffer.isBuffer(Buffer.prototype) will be false
},Z.compare=function(e,t){if(eE(e,Uint8Array)&&(e=Z.from(e,e.offset,e.byteLength)),eE(t,Uint8Array)&&(t=Z.from(t,t.offset,t.byteLength)),!Z.isBuffer(e)||!Z.isBuffer(t))throw TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(e===t)return 0;for(var r=e.length,n=t.length,o=0,i=Math.min(r,n);o<i;++o)if(e[o]!==t[o]){r=e[o],n=t[o];break}return r<n?-1:n<r?1:0},Z.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},Z.concat=function(e,t){if(!Array.isArray(e))throw TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return Z.alloc(0);if(void 0===t)for(r=0,t=0;r<e.length;++r)t+=e[r].length;var r,n=Z.allocUnsafe(t),o=0;for(r=0;r<e.length;++r){var i=e[r];if(eE(i,Uint8Array))o+i.length>n.length?Z.from(i).copy(n,o):Uint8Array.prototype.set.call(n,i,o);else if(Z.isBuffer(i))i.copy(n,o);else throw TypeError('"list" argument must be an Array of Buffers');o+=i.length}return n},Z.byteLength=ei,// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Z.prototype._isBuffer=!0,Z.prototype.swap16=function(){var e=this.length;if(e%2!=0)throw RangeError("Buffer size must be a multiple of 16-bits");for(var t=0;t<e;t+=2)ea(this,t,t+1);return this},Z.prototype.swap32=function(){var e=this.length;if(e%4!=0)throw RangeError("Buffer size must be a multiple of 32-bits");for(var t=0;t<e;t+=4)ea(this,t,t+3),ea(this,t+1,t+2);return this},Z.prototype.swap64=function(){var e=this.length;if(e%8!=0)throw RangeError("Buffer size must be a multiple of 64-bits");for(var t=0;t<e;t+=8)ea(this,t,t+7),ea(this,t+1,t+6),ea(this,t+2,t+5),ea(this,t+3,t+4);return this},Z.prototype.toString=function(){var e=this.length;return 0===e?"":0==arguments.length?ef(this,0,e):es.apply(this,arguments)},Z.prototype.toLocaleString=Z.prototype.toString,Z.prototype.equals=function(e){if(!Z.isBuffer(e))throw TypeError("Argument must be a Buffer");return this===e||0===Z.compare(this,e)},Z.prototype.inspect=function(){var e="";return e=this.toString("hex",0,50).replace(/(.{2})/g,"$1 ").trim(),this.length>50&&(e+=" ... "),"<Buffer "+e+">"},Y&&(Z.prototype[Y]=Z.prototype.inspect),Z.prototype.compare=function(e,t,r,n,o){if(eE(e,Uint8Array)&&(e=Z.from(e,e.offset,e.byteLength)),!Z.isBuffer(e))throw TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof e);if(void 0===t&&(t=0),void 0===r&&(r=e?e.length:0),void 0===n&&(n=0),void 0===o&&(o=this.length),t<0||r>e.length||n<0||o>this.length)throw RangeError("out of range index");if(n>=o&&t>=r)return 0;if(n>=o)return -1;if(t>=r)return 1;if(t>>>=0,r>>>=0,n>>>=0,o>>>=0,this===e)return 0;for(var i=o-n,s=r-t,a=Math.min(i,s),u=this.slice(n,o),l=e.slice(t,r),f=0;f<a;++f)if(u[f]!==l[f]){i=u[f],s=l[f];break}return i<s?-1:s<i?1:0},Z.prototype.includes=function(e,t,r){return -1!==this.indexOf(e,t,r)},Z.prototype.indexOf=function(e,t,r){return eu(this,e,t,r,!0)},Z.prototype.lastIndexOf=function(e,t,r){return eu(this,e,t,r,!1)},Z.prototype.write=function(e,t,r,n){// Buffer#write(string)
if(void 0===t)n="utf8",r=this.length,t=0;else if(void 0===r&&"string"==typeof t)n=t,r=this.length,t=0;else if(isFinite(t))t>>>=0,isFinite(r)?(r>>>=0,void 0===n&&(n="utf8")):(n=r,r=void 0);else throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");var o,i,s,a,u,l,f,c,h=this.length-t;if((void 0===r||r>h)&&(r=h),e.length>0&&(r<0||t<0)||t>this.length)throw RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var p=!1;;)switch(n){case"hex":return function(e,t,r,n){r=Number(r)||0;var o=e.length-r;n?(n=Number(n))>o&&(n=o):n=o;var i=t.length;n>i/2&&(n=i/2);for(var s=0;s<n;++s){var a=parseInt(t.substr(2*s,2),16);if(a!=a)break;e[r+s]=a}return s}(this,e,t,r);case"utf8":case"utf-8":return o=t,i=r,ew(em(e,this.length-o),this,o,i);case"ascii":case"latin1":case"binary":return s=t,a=r,ew(function(e){for(var t=[],r=0;r<e.length;++r)t.push(255&e.charCodeAt(r));return t}(e),this,s,a);case"base64":// Warning: maxLength not taken into account in base64Write
return u=t,l=r,ew(eb(e),this,u,l);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return f=t,c=r,ew(function(e,t){for(var r,n,o=[],i=0;i<e.length&&!((t-=2)<0);++i)n=(r=e.charCodeAt(i))>>8,o.push(r%256),o.push(n);return o}(e,this.length-f),this,f,c);default:if(p)throw TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),p=!0}},Z.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},Z.prototype.slice=function(e,t){var r=this.length;e=~~e,t=void 0===t?r:~~t,e<0?(e+=r)<0&&(e=0):e>r&&(e=r),t<0?(t+=r)<0&&(t=0):t>r&&(t=r),t<e&&(t=e);var n=this.subarray(e,t);return(// Return an augmented `Uint8Array` instance
Object.setPrototypeOf(n,Z.prototype),n)},Z.prototype.readUintLE=Z.prototype.readUIntLE=function(e,t,r){e>>>=0,t>>>=0,r||ec(e,t,this.length);for(var n=this[e],o=1,i=0;++i<t&&(o*=256);)n+=this[e+i]*o;return n},Z.prototype.readUintBE=Z.prototype.readUIntBE=function(e,t,r){e>>>=0,t>>>=0,r||ec(e,t,this.length);for(var n=this[e+--t],o=1;t>0&&(o*=256);)n+=this[e+--t]*o;return n},Z.prototype.readUint8=Z.prototype.readUInt8=function(e,t){return e>>>=0,t||ec(e,1,this.length),this[e]},Z.prototype.readUint16LE=Z.prototype.readUInt16LE=function(e,t){return e>>>=0,t||ec(e,2,this.length),this[e]|this[e+1]<<8},Z.prototype.readUint16BE=Z.prototype.readUInt16BE=function(e,t){return e>>>=0,t||ec(e,2,this.length),this[e]<<8|this[e+1]},Z.prototype.readUint32LE=Z.prototype.readUInt32LE=function(e,t){return e>>>=0,t||ec(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},Z.prototype.readUint32BE=Z.prototype.readUInt32BE=function(e,t){return e>>>=0,t||ec(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},Z.prototype.readIntLE=function(e,t,r){e>>>=0,t>>>=0,r||ec(e,t,this.length);for(var n=this[e],o=1,i=0;++i<t&&(o*=256);)n+=this[e+i]*o;return n>=(o*=128)&&(n-=Math.pow(2,8*t)),n},Z.prototype.readIntBE=function(e,t,r){e>>>=0,t>>>=0,r||ec(e,t,this.length);for(var n=t,o=1,i=this[e+--n];n>0&&(o*=256);)i+=this[e+--n]*o;return i>=(o*=128)&&(i-=Math.pow(2,8*t)),i},Z.prototype.readInt8=function(e,t){return(e>>>=0,t||ec(e,1,this.length),128&this[e])?-((255-this[e]+1)*1):this[e]},Z.prototype.readInt16LE=function(e,t){e>>>=0,t||ec(e,2,this.length);var r=this[e]|this[e+1]<<8;return 32768&r?4294901760|r:r},Z.prototype.readInt16BE=function(e,t){e>>>=0,t||ec(e,2,this.length);var r=this[e+1]|this[e]<<8;return 32768&r?4294901760|r:r},Z.prototype.readInt32LE=function(e,t){return e>>>=0,t||ec(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},Z.prototype.readInt32BE=function(e,t){return e>>>=0,t||ec(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},Z.prototype.readFloatLE=function(e,t){return e>>>=0,t||ec(e,4,this.length),o(this,e,!0,23,4)},Z.prototype.readFloatBE=function(e,t){return e>>>=0,t||ec(e,4,this.length),o(this,e,!1,23,4)},Z.prototype.readDoubleLE=function(e,t){return e>>>=0,t||ec(e,8,this.length),o(this,e,!0,52,8)},Z.prototype.readDoubleBE=function(e,t){return e>>>=0,t||ec(e,8,this.length),o(this,e,!1,52,8)},Z.prototype.writeUintLE=Z.prototype.writeUIntLE=function(e,t,r,n){if(e=+e,t>>>=0,r>>>=0,!n){var o=Math.pow(2,8*r)-1;eh(this,e,t,r,o,0)}var i=1,s=0;for(this[t]=255&e;++s<r&&(i*=256);)this[t+s]=e/i&255;return t+r},Z.prototype.writeUintBE=Z.prototype.writeUIntBE=function(e,t,r,n){if(e=+e,t>>>=0,r>>>=0,!n){var o=Math.pow(2,8*r)-1;eh(this,e,t,r,o,0)}var i=r-1,s=1;for(this[t+i]=255&e;--i>=0&&(s*=256);)this[t+i]=e/s&255;return t+r},Z.prototype.writeUint8=Z.prototype.writeUInt8=function(e,t,r){return e=+e,t>>>=0,r||eh(this,e,t,1,255,0),this[t]=255&e,t+1},Z.prototype.writeUint16LE=Z.prototype.writeUInt16LE=function(e,t,r){return e=+e,t>>>=0,r||eh(this,e,t,2,65535,0),this[t]=255&e,this[t+1]=e>>>8,t+2},Z.prototype.writeUint16BE=Z.prototype.writeUInt16BE=function(e,t,r){return e=+e,t>>>=0,r||eh(this,e,t,2,65535,0),this[t]=e>>>8,this[t+1]=255&e,t+2},Z.prototype.writeUint32LE=Z.prototype.writeUInt32LE=function(e,t,r){return e=+e,t>>>=0,r||eh(this,e,t,4,4294967295,0),this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e,t+4},Z.prototype.writeUint32BE=Z.prototype.writeUInt32BE=function(e,t,r){return e=+e,t>>>=0,r||eh(this,e,t,4,4294967295,0),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},Z.prototype.writeIntLE=function(e,t,r,n){if(e=+e,t>>>=0,!n){var o=Math.pow(2,8*r-1);eh(this,e,t,r,o-1,-o)}var i=0,s=1,a=0;for(this[t]=255&e;++i<r&&(s*=256);)e<0&&0===a&&0!==this[t+i-1]&&(a=1),this[t+i]=(e/s>>0)-a&255;return t+r},Z.prototype.writeIntBE=function(e,t,r,n){if(e=+e,t>>>=0,!n){var o=Math.pow(2,8*r-1);eh(this,e,t,r,o-1,-o)}var i=r-1,s=1,a=0;for(this[t+i]=255&e;--i>=0&&(s*=256);)e<0&&0===a&&0!==this[t+i+1]&&(a=1),this[t+i]=(e/s>>0)-a&255;return t+r},Z.prototype.writeInt8=function(e,t,r){return e=+e,t>>>=0,r||eh(this,e,t,1,127,-128),e<0&&(e=255+e+1),this[t]=255&e,t+1},Z.prototype.writeInt16LE=function(e,t,r){return e=+e,t>>>=0,r||eh(this,e,t,2,32767,-32768),this[t]=255&e,this[t+1]=e>>>8,t+2},Z.prototype.writeInt16BE=function(e,t,r){return e=+e,t>>>=0,r||eh(this,e,t,2,32767,-32768),this[t]=e>>>8,this[t+1]=255&e,t+2},Z.prototype.writeInt32LE=function(e,t,r){return e=+e,t>>>=0,r||eh(this,e,t,4,2147483647,-2147483648),this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24,t+4},Z.prototype.writeInt32BE=function(e,t,r){return e=+e,t>>>=0,r||eh(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},Z.prototype.writeFloatLE=function(e,t,r){return ed(this,e,t,!0,r)},Z.prototype.writeFloatBE=function(e,t,r){return ed(this,e,t,!1,r)},Z.prototype.writeDoubleLE=function(e,t,r){return ey(this,e,t,!0,r)},Z.prototype.writeDoubleBE=function(e,t,r){return ey(this,e,t,!1,r)},// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Z.prototype.copy=function(e,t,r,n){if(!Z.isBuffer(e))throw TypeError("argument should be a Buffer");// Copy 0 bytes; we're done
if(r||(r=0),n||0===n||(n=this.length),t>=e.length&&(t=e.length),t||(t=0),n>0&&n<r&&(n=r),n===r||0===e.length||0===this.length)return 0;// Fatal error conditions
if(t<0)throw RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw RangeError("Index out of range");if(n<0)throw RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),e.length-t<n-r&&(n=e.length-t+r);var o=n-r;return this===e&&"function"==typeof Uint8Array.prototype.copyWithin?this.copyWithin(t,r,n):Uint8Array.prototype.set.call(e,this.subarray(r,n),t),o},// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Z.prototype.fill=function(e,t,r,n){// Handle string cases:
if("string"==typeof e){if("string"==typeof t?(n=t,t=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),void 0!==n&&"string"!=typeof n)throw TypeError("encoding must be a string");if("string"==typeof n&&!Z.isEncoding(n))throw TypeError("Unknown encoding: "+n);if(1===e.length){var o,i=e.charCodeAt(0);("utf8"===n&&i<128||"latin1"===n)&&(e=i)}}else"number"==typeof e?e&=255:"boolean"==typeof e&&(e=Number(e));// Invalid ranges are not set to a default, so can range check early.
if(t<0||this.length<t||this.length<r)throw RangeError("Out of range index");if(r<=t)return this;if(t>>>=0,r=void 0===r?this.length:r>>>0,e||(e=0),"number"==typeof e)for(o=t;o<r;++o)this[o]=e;else{var s=Z.isBuffer(e)?e:Z.from(e,n),a=s.length;if(0===a)throw TypeError('The value "'+e+'" is invalid for argument "value"');for(o=0;o<r-t;++o)this[o+t]=s[o%a]}return this};// HELPER FUNCTIONS
// ================
var eg=/[^+/0-9A-Za-z-_]/g;function em(e,t){t=t||1/0;for(var r,n=e.length,o=null,i=[],s=0;s<n;++s){// is surrogate component
if((r=e.charCodeAt(s))>55295&&r<57344){// last char was a lead
if(!o){// no lead yet
if(r>56319||s+1===n){// unexpected trail
(t-=3)>-1&&i.push(239,191,189);continue}// valid lead
o=r;continue}// 2 leads in a row
if(r<56320){(t-=3)>-1&&i.push(239,191,189),o=r;continue}// valid surrogate pair
r=(o-55296<<10|r-56320)+65536}else o&&(t-=3)>-1&&i.push(239,191,189);// encode utf8
if(o=null,r<128){if((t-=1)<0)break;i.push(r)}else if(r<2048){if((t-=2)<0)break;i.push(r>>6|192,63&r|128)}else if(r<65536){if((t-=3)<0)break;i.push(r>>12|224,r>>6&63|128,63&r|128)}else if(r<1114112){if((t-=4)<0)break;i.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}else throw Error("Invalid code point")}return i}function eb(e){return function(e){var t,r,n=function(e){var t=e.length;if(t%4>0)throw Error("Invalid string. Length must be a multiple of 4");// Trim off extra bytes after placeholder bytes are found
// See: https://github.com/beatgammit/base64-js/issues/42
var r=e.indexOf("=");-1===r&&(r=t);var n=r===t?0:4-r%4;return[r,n]}(e),o=n[0],i=n[1],s=new W((o+i)*3/4-i),a=0,u=i>0?o-4:o;for(r=0;r<u;r+=4)t=V[e.charCodeAt(r)]<<18|V[e.charCodeAt(r+1)]<<12|V[e.charCodeAt(r+2)]<<6|V[e.charCodeAt(r+3)],s[a++]=t>>16&255,s[a++]=t>>8&255,s[a++]=255&t;return 2===i&&(t=V[e.charCodeAt(r)]<<2|V[e.charCodeAt(r+1)]>>4,s[a++]=255&t),1===i&&(t=V[e.charCodeAt(r)]<<10|V[e.charCodeAt(r+1)]<<4|V[e.charCodeAt(r+2)]>>2,s[a++]=t>>8&255,s[a++]=255&t),s}(function(e){// Node converts strings with length < 2 to ''
if(// Node strips out invalid characters like \n and \t from the string, base64-js does not
(e=// Node takes equal signs as end of the Base64 encoding
(e=e.split("=")[0]).trim().replace(eg,"")).length<2)return"";// Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
for(;e.length%4!=0;)e+="=";return e}(e))}function ew(e,t,r,n){for(var o=0;o<n&&!(o+r>=t.length)&&!(o>=e.length);++o)t[o+r]=e[o];return o}// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function eE(e,t){return e instanceof t||null!=e&&null!=e.constructor&&null!=e.constructor.name&&e.constructor.name===t.name}// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
var ev=function(){for(var e="0123456789abcdef",t=Array(256),r=0;r<16;++r)for(var n=16*r,o=0;o<16;++o)t[n+o]=e[r]+e[o];return t}();/**
 * Determines if the given thing is a array or js object.
 *
 * @param {string} thing - The object or array to be visited.
 *
 * @returns {boolean}
 */function eA(e){return M.isPlainObject(e)||M.isArray(e)}/**
 * It removes the brackets from the end of a string
 *
 * @param {string} key - The key of the parameter.
 *
 * @returns {string} the key without the brackets.
 */function eO(e){return M.endsWith(e,"[]")?e.slice(0,-2):e}/**
 * It takes a path, a key, and a boolean, and returns a string
 *
 * @param {string} path - The path to the current key.
 * @param {string} key - The key of the current object being iterated over.
 * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
 *
 * @returns {string} The path to the current key.
 */function eS(e,t,r){return e?e.concat(t).map(function(e,t){return(// eslint-disable-next-line no-param-reassign
e=eO(e),!r&&t?"["+e+"]":e)}).join(r?".":""):t}let eR=M.toFlatObject(M,{},null,function(e){return/^is[A-Z]/.test(e)});var eT=/**
 * Convert a data object to FormData
 *
 * @param {Object} obj
 * @param {?Object} [formData]
 * @param {?Object} [options]
 * @param {Function} [options.visitor]
 * @param {Boolean} [options.metaTokens = true]
 * @param {Boolean} [options.dots = false]
 * @param {?Boolean} [options.indexes = false]
 *
 * @returns {Object}
 **//**
 * It converts an object into a FormData object
 *
 * @param {Object<any, any>} obj - The object to convert to form data.
 * @param {string} formData - The FormData object to append to.
 * @param {Object<string, any>} options
 *
 * @returns
 */function(e,t,r){if(!M.isObject(e))throw TypeError("target must be an object");// eslint-disable-next-line no-param-reassign
t=t||new FormData,// eslint-disable-next-line no-param-reassign
r=M.toFlatObject(r,{metaTokens:!0,dots:!1,indexes:!1},!1,function(e,t){// eslint-disable-next-line no-eq-null,eqeqeq
return!M.isUndefined(t[e])});let n=r.metaTokens,o=r.visitor||f,i=r.dots,s=r.indexes,a=r.Blob||"undefined"!=typeof Blob&&Blob,u=a&&M.isSpecCompliantForm(t);if(!M.isFunction(o))throw TypeError("visitor must be a function");function l(e){if(null===e)return"";if(M.isDate(e))return e.toISOString();if(!u&&M.isBlob(e))throw new q("Blob is not supported. Use a Buffer instead.");return M.isArrayBuffer(e)||M.isTypedArray(e)?u&&"function"==typeof Blob?new Blob([e]):Z.from(e):e}/**
   * Default visitor.
   *
   * @param {*} value
   * @param {String|Number} key
   * @param {Array<String|Number>} path
   * @this {FormData}
   *
   * @returns {boolean} return true to visit the each prop of the value recursively
   */function f(e,r,o){let a=e;if(e&&!o&&"object"==typeof e){if(M.endsWith(r,"{}"))// eslint-disable-next-line no-param-reassign
r=n?r:r.slice(0,-2),// eslint-disable-next-line no-param-reassign
e=JSON.stringify(e);else{var u;if(M.isArray(e)&&(u=e,M.isArray(u)&&!u.some(eA))||(M.isFileList(e)||M.endsWith(r,"[]"))&&(a=M.toArray(e)))return(// eslint-disable-next-line no-param-reassign
r=eO(r),a.forEach(function(e,n){M.isUndefined(e)||null===e||t.append(!0===s?eS([r],n,i):null===s?r:r+"[]",l(e))}),!1)}}return!!eA(e)||(t.append(eS(o,r,i),l(e)),!1)}let c=[],h=Object.assign(eR,{defaultVisitor:f,convertValue:l,isVisitable:eA});if(!M.isObject(e))throw TypeError("data must be an object");return!function e(r,n){if(!M.isUndefined(r)){if(-1!==c.indexOf(r))throw Error("Circular reference detected in "+n.join("."));c.push(r),M.forEach(r,function(r,i){let s=!(M.isUndefined(r)||null===r)&&o.call(t,r,M.isString(i)?i.trim():i,n,h);!0===s&&e(r,n?n.concat(i):[i])}),c.pop()}}(e),t};/**
 * It encodes a string by replacing all characters that are not in the unreserved set with
 * their percent-encoded equivalents
 *
 * @param {string} str - The string to encode.
 *
 * @returns {string} The encoded string.
 */function eB(e){let t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\x00"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(e){return t[e]})}/**
 * It takes a params object and converts it to a FormData object
 *
 * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
 * @param {Object<string, any>} options - The options object passed to the Axios constructor.
 *
 * @returns {void}
 */function eU(e,t){this._pairs=[],e&&eT(e,this,t)}let eC=eU.prototype;/**
 * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
 * URI encoded counterparts
 *
 * @param {string} val The value to be encoded.
 *
 * @returns {string} The encoded value.
 */function ex(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function eL(e,t,r){let n;/*eslint no-param-reassign:0*/if(!t)return e;let o=r&&r.encode||ex,i=r&&r.serialize;if(n=i?i(t,r):M.isURLSearchParams(t)?t.toString():new eU(t,r).toString(o)){let t=e.indexOf("#");-1!==t&&(e=e.slice(0,t)),e+=(-1===e.indexOf("?")?"?":"&")+n}return e}eC.append=function(e,t){this._pairs.push([e,t])},eC.toString=function(e){let t=e?function(t){return e.call(this,t,eB)}:eB;return this._pairs.map(function(e){return t(e[0])+"="+t(e[1])},"").join("&")};var ej=class{constructor(){this.handlers=[]}/**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */use(e,t,r){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!r&&r.synchronous,runWhen:r?r.runWhen:null}),this.handlers.length-1}/**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */eject(e){this.handlers[e]&&(this.handlers[e]=null)}/**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */clear(){this.handlers&&(this.handlers=[])}/**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */forEach(e){M.forEach(this.handlers,function(t){null!==t&&e(t)})}},eP={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},eN="undefined"!=typeof URLSearchParams?URLSearchParams:eU,eI="undefined"!=typeof FormData?FormData:null,ek="undefined"!=typeof Blob?Blob:null,eF={};a(eF,"hasBrowserEnv",()=>e_),a(eF,"hasStandardBrowserEnv",()=>eD),a(eF,"hasStandardBrowserWebWorkerEnv",()=>eM);let e_="undefined"!=typeof window&&"undefined"!=typeof document,eD=(r="undefined"!=typeof navigator&&navigator.product,e_&&0>["ReactNative","NativeScript","NS"].indexOf(r)),eM="undefined"!=typeof WorkerGlobalScope&&// eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope&&"function"==typeof self.importScripts;var eq={...eF,isBrowser:!0,classes:{URLSearchParams:eN,FormData:eI,Blob:ek},protocols:["http","https","file","blob","url","data"]},ez=/**
 * It takes a FormData object and returns a JavaScript object
 *
 * @param {string} formData The FormData object to convert to JSON.
 *
 * @returns {Object<string, any> | null} The converted object.
 */function(e){if(M.isFormData(e)&&M.isFunction(e.entries)){let t={};return M.forEachEntry(e,(e,r)=>{!function e(t,r,n,o){let i=t[o++],s=Number.isFinite(+i),a=o>=t.length;if(i=!i&&M.isArray(n)?n.length:i,a)return M.hasOwnProp(n,i)?n[i]=[n[i],r]:n[i]=r,!s;n[i]&&M.isObject(n[i])||(n[i]=[]);let u=e(t,r,n[i],o);return u&&M.isArray(n[i])&&(n[i]=/**
 * Convert an array to an object.
 *
 * @param {Array<any>} arr - The array to convert to an object.
 *
 * @returns An object with the same keys and values as the array.
 */function(e){let t,r;let n={},o=Object.keys(e),i=o.length;for(t=0;t<i;t++)n[r=o[t]]=e[r];return n}(n[i])),!s}(M.matchAll(/\w+|\[(\w*)]/g,e).map(e=>"[]"===e[0]?"":e[1]||e[0]),r,t,0)}),t}return null};let eH={transitional:eP,adapter:["xhr","http"],transformRequest:[function(e,t){let r;let n=t.getContentType()||"",o=n.indexOf("application/json")>-1,i=M.isObject(e);i&&M.isHTMLForm(e)&&(e=new FormData(e));let s=M.isFormData(e);if(s)return o&&o?JSON.stringify(ez(e)):e;if(M.isArrayBuffer(e)||M.isBuffer(e)||M.isStream(e)||M.isFile(e)||M.isBlob(e))return e;if(M.isArrayBufferView(e))return e.buffer;if(M.isURLSearchParams(e))return t.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();if(i){if(n.indexOf("application/x-www-form-urlencoded")>-1){var a,u;return(a=e,u=this.formSerializer,eT(a,new eq.classes.URLSearchParams,Object.assign({visitor:function(e,t,r,n){return eq.isNode&&M.isBuffer(e)?(this.append(t,e.toString("base64")),!1):n.defaultVisitor.apply(this,arguments)}},u))).toString()}if((r=M.isFileList(e))||n.indexOf("multipart/form-data")>-1){let t=this.env&&this.env.FormData;return eT(r?{"files[]":e}:e,t&&new t,this.formSerializer)}}return i||o?(t.setContentType("application/json",!1),/**
 * It takes a string, tries to parse it, and if it fails, it returns the stringified version
 * of the input
 *
 * @param {any} rawValue - The value to be stringified.
 * @param {Function} parser - A function that parses a string into a JavaScript object.
 * @param {Function} encoder - A function that takes a value and returns a string.
 *
 * @returns {string} A stringified version of the rawValue.
 */function(e,t,r){if(M.isString(e))try{return(0,JSON.parse)(e),M.trim(e)}catch(e){if("SyntaxError"!==e.name)throw e}return(0,JSON.stringify)(e)}(e)):e}],transformResponse:[function(e){let t=this.transitional||eH.transitional,r=t&&t.forcedJSONParsing,n="json"===this.responseType;if(e&&M.isString(e)&&(r&&!this.responseType||n)){let r=t&&t.silentJSONParsing;try{return JSON.parse(e)}catch(e){if(!r&&n){if("SyntaxError"===e.name)throw q.from(e,q.ERR_BAD_RESPONSE,this,null,this.response);throw e}}}return e}],/**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:eq.classes.FormData,Blob:eq.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};M.forEach(["delete","get","head","post","put","patch"],e=>{eH.headers[e]={}});// RawAxiosHeaders whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
let eJ=M.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]);var /**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} rawHeaders Headers needing to be parsed
 *
 * @returns {Object} Headers parsed into an object
 */eV=e=>{let t,r,n;let o={};return e&&e.split("\n").forEach(function(e){n=e.indexOf(":"),t=e.substring(0,n).trim().toLowerCase(),r=e.substring(n+1).trim(),!t||o[t]&&eJ[t]||("set-cookie"===t?o[t]?o[t].push(r):o[t]=[r]:o[t]=o[t]?o[t]+", "+r:r)}),o};let eW=Symbol("internals");function eK(e){return e&&String(e).trim().toLowerCase()}function e$(e){return!1===e||null==e?e:M.isArray(e)?e.map(e$):String(e)}let eG=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function eY(e,t,r,n,o){if(M.isFunction(n))return n.call(this,t,r);if(o&&(t=r),M.isString(t)){if(M.isString(n))return -1!==t.indexOf(n);if(M.isRegExp(n))return n.test(t)}}class eX{constructor(e){e&&this.set(e)}set(e,t,r){let n=this;function o(e,t,r){let o=eK(t);if(!o)throw Error("header name must be a non-empty string");let i=M.findKey(n,o);i&&void 0!==n[i]&&!0!==r&&(void 0!==r||!1===n[i])||(n[i||t]=e$(e))}let i=(e,t)=>M.forEach(e,(e,r)=>o(e,r,t));return M.isPlainObject(e)||e instanceof this.constructor?i(e,t):M.isString(e)&&(e=e.trim())&&!eG(e)?i(eV(e),t):null!=e&&o(t,e,r),this}get(e,t){if(e=eK(e)){let r=M.findKey(this,e);if(r){let e=this[r];if(!t)return e;if(!0===t)return function(e){let t;let r=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;for(;t=n.exec(e);)r[t[1]]=t[2];return r}(e);if(M.isFunction(t))return t.call(this,e,r);if(M.isRegExp(t))return t.exec(e);throw TypeError("parser must be boolean|regexp|function")}}}has(e,t){if(e=eK(e)){let r=M.findKey(this,e);return!!(r&&void 0!==this[r]&&(!t||eY(this,this[r],r,t)))}return!1}delete(e,t){let r=this,n=!1;function o(e){if(e=eK(e)){let o=M.findKey(r,e);o&&(!t||eY(r,r[o],o,t))&&(delete r[o],n=!0)}}return M.isArray(e)?e.forEach(o):o(e),n}clear(e){let t=Object.keys(this),r=t.length,n=!1;for(;r--;){let o=t[r];(!e||eY(this,this[o],o,e,!0))&&(delete this[o],n=!0)}return n}normalize(e){let t=this,r={};return M.forEach(this,(n,o)=>{let i=M.findKey(r,o);if(i){t[i]=e$(n),delete t[o];return}let s=e?o.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(e,t,r)=>t.toUpperCase()+r):String(o).trim();s!==o&&delete t[o],t[s]=e$(n),r[s]=!0}),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){let t=Object.create(null);return M.forEach(this,(r,n)=>{null!=r&&!1!==r&&(t[n]=e&&M.isArray(r)?r.join(", "):r)}),t}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([e,t])=>e+": "+t).join("\n")}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e,...t){let r=new this(e);return t.forEach(e=>r.set(e)),r}static accessor(e){let t=this[eW]=this[eW]={accessors:{}},r=t.accessors,n=this.prototype;function o(e){let t=eK(e);r[t]||(!function(e,t){let r=M.toCamelCase(" "+t);["get","set","has"].forEach(n=>{Object.defineProperty(e,n+r,{value:function(e,r,o){return this[n].call(this,t,e,r,o)},configurable:!0})})}(n,e),r[t]=!0)}return M.isArray(e)?e.forEach(o):o(e),this}}function eZ(e,t){let r=this||eH,n=t||r,o=eX.from(n.headers),i=n.data;return M.forEach(e,function(e){i=e.call(r,i,o.normalize(),t?t.status:void 0)}),o.normalize(),i}function eQ(e){return!!(e&&e.__CANCEL__)}/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @param {string=} message The message.
 * @param {Object=} config The config.
 * @param {Object=} request The request.
 *
 * @returns {CanceledError} The created error.
 */function e0(e,t,r){q.call(this,null==e?"canceled":e,q.ERR_CANCELED,t,r),this.name="CanceledError"}eX.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]),M.reduceDescriptors(eX.prototype,({value:e},t)=>{let r=t[0].toUpperCase()+t.slice(1);// map `set` => `Set`
return{get:()=>e,set(e){this[r]=e}}}),M.freezeMethods(eX),M.inherits(e0,q,{__CANCEL__:!0});var e1=eq.hasStandardBrowserEnv?{write(e,t,r,n,o,i){let s=[e+"="+encodeURIComponent(t)];M.isNumber(r)&&s.push("expires="+new Date(r).toGMTString()),M.isString(n)&&s.push("path="+n),M.isString(o)&&s.push("domain="+o),!0===i&&s.push("secure"),document.cookie=s.join("; ")},read(e){let t=document.cookie.match(RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove(e){this.write(e,"",Date.now()-864e5)}}:{write(){},read:()=>null,remove(){}};function e2(e,t){return e&&!/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)?t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e:t}var e6=eq.hasStandardBrowserEnv?// whether the request URL is of the same origin as current location.
function(){let e;let t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");/**
    * Parse a URL to discover its components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */function n(e){let n=e;// urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
return t&&(// IE needs attribute set twice to normalize properties
r.setAttribute("href",n),n=r.href),r.setAttribute("href",n),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}/**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */return e=n(window.location.href),function(t){let r=M.isString(t)?n(t):t;return r.protocol===e.protocol&&r.host===e.host}}():function(){return!0},e5=/**
 * Calculate data maxRate
 * @param {Number} [samplesCount= 10]
 * @param {Number} [min= 1000]
 * @returns {Function}
 */function(e,t){let r;e=e||10;let n=Array(e),o=Array(e),i=0,s=0;return t=void 0!==t?t:1e3,function(a){let u=Date.now(),l=o[s];r||(r=u),n[i]=a,o[i]=u;let f=s,c=0;for(;f!==i;)c+=n[f++],f%=e;if((i=(i+1)%e)===s&&(s=(s+1)%e),u-r<t)return;let h=l&&u-l;return h?Math.round(1e3*c/h):void 0}};function e8(e,t){let r=0,n=e5(50,250);return o=>{let i=o.loaded,s=o.lengthComputable?o.total:void 0,a=i-r,u=n(a),l=i<=s;r=i;let f={loaded:i,total:s,progress:s?i/s:void 0,bytes:a,rate:u||void 0,estimated:u&&s&&l?(s-i)/u:void 0,event:o};f[t?"download":"upload"]=!0,e(f)}}let e4="undefined"!=typeof XMLHttpRequest;var e3=e4&&function(e){return new Promise(function(t,r){let n,o,i=e.data,s=eX.from(e.headers).normalize(),{responseType:a,withXSRFToken:u}=e;function l(){e.cancelToken&&e.cancelToken.unsubscribe(n),e.signal&&e.signal.removeEventListener("abort",n)}if(M.isFormData(i)){if(eq.hasStandardBrowserEnv||eq.hasStandardBrowserWebWorkerEnv)s.setContentType(!1);// Let the browser set it
else if(!1!==(o=s.getContentType())){// fix semicolon duplication issue for ReactNative FormData implementation
let[e,...t]=o?o.split(";").map(e=>e.trim()).filter(Boolean):[];s.setContentType([e||"multipart/form-data",...t].join("; "))}}let f=new XMLHttpRequest;// HTTP basic authentication
if(e.auth){let t=e.auth.username||"",r=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";s.set("Authorization","Basic "+btoa(t+":"+r))}let c=e2(e.baseURL,e.url);function h(){if(!f)return;// Prepare the response
let n=eX.from("getAllResponseHeaders"in f&&f.getAllResponseHeaders()),o=a&&"text"!==a&&"json"!==a?f.response:f.responseText,i={data:o,status:f.status,statusText:f.statusText,headers:n,config:e,request:f};!function(e,t,r){let n=r.config.validateStatus;!r.status||!n||n(r.status)?e(r):t(new q("Request failed with status code "+r.status,[q.ERR_BAD_REQUEST,q.ERR_BAD_RESPONSE][Math.floor(r.status/100)-4],r.config,r.request,r))}(function(e){t(e),l()},function(e){r(e),l()},i),// Clean up request
f=null}// Add xsrf header
// This is only done if running in a standard browser environment.
// Specifically not if we're in a web worker, or react-native.
if(f.open(e.method.toUpperCase(),eL(c,e.params,e.paramsSerializer),!0),// Set the request timeout in MS
f.timeout=e.timeout,"onloadend"in f?f.onloadend=h:f.onreadystatechange=function(){f&&4===f.readyState&&(0!==f.status||f.responseURL&&0===f.responseURL.indexOf("file:"))&&// readystate handler is calling before onerror or ontimeout handlers,
// so we should call onloadend on the next 'tick'
setTimeout(h)},// Handle browser request cancellation (as opposed to a manual cancellation)
f.onabort=function(){f&&(r(new q("Request aborted",q.ECONNABORTED,e,f)),// Clean up request
f=null)},// Handle low level network errors
f.onerror=function(){// Real errors are hidden from us by the browser
// onerror should only fire if it's a network error
r(new q("Network Error",q.ERR_NETWORK,e,f)),// Clean up request
f=null},// Handle timeout
f.ontimeout=function(){let t=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded",n=e.transitional||eP;e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),r(new q(t,n.clarifyTimeoutError?q.ETIMEDOUT:q.ECONNABORTED,e,f)),// Clean up request
f=null},eq.hasStandardBrowserEnv&&(u&&M.isFunction(u)&&(u=u(e)),u||!1!==u&&e6(c))){// Add xsrf header
let t=e.xsrfHeaderName&&e.xsrfCookieName&&e1.read(e.xsrfCookieName);t&&s.set(e.xsrfHeaderName,t)}// Remove Content-Type if data is undefined
void 0===i&&s.setContentType(null),"setRequestHeader"in f&&M.forEach(s.toJSON(),function(e,t){f.setRequestHeader(t,e)}),M.isUndefined(e.withCredentials)||(f.withCredentials=!!e.withCredentials),a&&"json"!==a&&(f.responseType=e.responseType),"function"==typeof e.onDownloadProgress&&f.addEventListener("progress",e8(e.onDownloadProgress,!0)),"function"==typeof e.onUploadProgress&&f.upload&&f.upload.addEventListener("progress",e8(e.onUploadProgress)),(e.cancelToken||e.signal)&&(// Handle cancellation
// eslint-disable-next-line func-names
n=t=>{f&&(r(!t||t.type?new e0(null,e,f):t),f.abort(),f=null)},e.cancelToken&&e.cancelToken.subscribe(n),e.signal&&(e.signal.aborted?n():e.signal.addEventListener("abort",n)));let p=function(e){let t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}(c);if(p&&-1===eq.protocols.indexOf(p)){r(new q("Unsupported protocol "+p+":",q.ERR_BAD_REQUEST,e));return}// Send the request
f.send(i||null)})};let e7={http:null,xhr:e3};M.forEach(e7,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch(e){// eslint-disable-next-line no-empty
}Object.defineProperty(e,"adapterName",{value:t})}});let e9=e=>`- ${e}`,te=e=>M.isFunction(e)||null===e||!1===e;var tt={getAdapter:e=>{let t,r;e=M.isArray(e)?e:[e];let{length:n}=e,o={};for(let i=0;i<n;i++){let n;if(r=t=e[i],!te(t)&&void 0===(r=e7[(n=String(t)).toLowerCase()]))throw new q(`Unknown adapter '${n}'`);if(r)break;o[n||"#"+i]=r}if(!r){let e=Object.entries(o).map(([e,t])=>`adapter ${e} `+(!1===t?"is not supported by the environment":"is not available in the build")),t=n?e.length>1?"since :\n"+e.map(e9).join("\n"):" "+e9(e[0]):"as no adapter specified";throw new q("There is no suitable adapter to dispatch the request "+t,"ERR_NOT_SUPPORT")}return r},adapters:e7};/**
 * Throws a `CanceledError` if cancellation has been requested.
 *
 * @param {Object} config The config that is to be used for the request
 *
 * @returns {void}
 */function tr(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new e0(null,e)}function tn(e){tr(e),e.headers=eX.from(e.headers),// Transform request data
e.data=eZ.call(e,e.transformRequest),-1!==["post","put","patch"].indexOf(e.method)&&e.headers.setContentType("application/x-www-form-urlencoded",!1);let t=tt.getAdapter(e.adapter||eH.adapter);return t(e).then(function(t){return tr(e),// Transform response data
t.data=eZ.call(e,e.transformResponse,t),t.headers=eX.from(t.headers),t},function(t){return!eQ(t)&&(tr(e),t&&t.response&&(t.response.data=eZ.call(e,e.transformResponse,t.response),t.response.headers=eX.from(t.response.headers))),Promise.reject(t)})}let to=e=>e instanceof eX?e.toJSON():e;function ti(e,t){// eslint-disable-next-line no-param-reassign
t=t||{};let r={};function n(e,t,r){return M.isPlainObject(e)&&M.isPlainObject(t)?M.merge.call({caseless:r},e,t):M.isPlainObject(t)?M.merge({},t):M.isArray(t)?t.slice():t}// eslint-disable-next-line consistent-return
function o(e,t,r){return M.isUndefined(t)?M.isUndefined(e)?void 0:n(void 0,e,r):n(e,t,r)}// eslint-disable-next-line consistent-return
function i(e,t){if(!M.isUndefined(t))return n(void 0,t)}// eslint-disable-next-line consistent-return
function s(e,t){return M.isUndefined(t)?M.isUndefined(e)?void 0:n(void 0,e):n(void 0,t)}// eslint-disable-next-line consistent-return
function a(r,o,i){return i in t?n(r,o):i in e?n(void 0,r):void 0}let u={url:i,method:i,data:i,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,withXSRFToken:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,beforeRedirect:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:a,headers:(e,t)=>o(to(e),to(t),!0)};return M.forEach(Object.keys(Object.assign({},e,t)),function(n){let i=u[n]||o,s=i(e[n],t[n],n);M.isUndefined(s)&&i!==a||(r[n]=s)}),r}let ts="1.6.2",ta={};// eslint-disable-next-line func-names
["object","boolean","number","function","string","symbol"].forEach((e,t)=>{ta[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});let tu={};/**
 * Transitional option validator
 *
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 *
 * @returns {function}
 */ta.transitional=function(e,t,r){function n(e,t){return"[Axios v"+ts+"] Transitional option '"+e+"'"+t+(r?". "+r:"")}// eslint-disable-next-line func-names
return(r,o,i)=>{if(!1===e)throw new q(n(o," has been removed"+(t?" in "+t:"")),q.ERR_DEPRECATED);return t&&!tu[o]&&(tu[o]=!0,// eslint-disable-next-line no-console
console.warn(n(o," has been deprecated since v"+t+" and will be removed in the near future"))),!e||e(r,o,i)}};var tl={assertOptions:/**
 * Assert object's properties type
 *
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 *
 * @returns {object}
 */function(e,t,r){if("object"!=typeof e)throw new q("options must be an object",q.ERR_BAD_OPTION_VALUE);let n=Object.keys(e),o=n.length;for(;o-- >0;){let i=n[o],s=t[i];if(s){let t=e[i],r=void 0===t||s(t,i,e);if(!0!==r)throw new q("option "+i+" must be "+r,q.ERR_BAD_OPTION_VALUE);continue}if(!0!==r)throw new q("Unknown option "+i,q.ERR_BAD_OPTION)}},validators:ta};let tf=tl.validators;/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 *
 * @return {Axios} A new instance of Axios
 */class tc{constructor(e){this.defaults=e,this.interceptors={request:new ej,response:new ej}}/**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */request(e,t){let r,n;"string"==typeof e?(t=t||{}).url=e:t=e||{},t=ti(this.defaults,t);let{transitional:o,paramsSerializer:i,headers:s}=t;void 0!==o&&tl.assertOptions(o,{silentJSONParsing:tf.transitional(tf.boolean),forcedJSONParsing:tf.transitional(tf.boolean),clarifyTimeoutError:tf.transitional(tf.boolean)},!1),null!=i&&(M.isFunction(i)?t.paramsSerializer={serialize:i}:tl.assertOptions(i,{encode:tf.function,serialize:tf.function},!0)),// Set config.method
t.method=(t.method||this.defaults.method||"get").toLowerCase();// Flatten headers
let a=s&&M.merge(s.common,s[t.method]);s&&M.forEach(["delete","get","head","post","put","patch","common"],e=>{delete s[e]}),t.headers=eX.concat(a,s);// filter out skipped interceptors
let u=[],l=!0;this.interceptors.request.forEach(function(e){("function"!=typeof e.runWhen||!1!==e.runWhen(t))&&(l=l&&e.synchronous,u.unshift(e.fulfilled,e.rejected))});let f=[];this.interceptors.response.forEach(function(e){f.push(e.fulfilled,e.rejected)});let c=0;if(!l){let e=[tn.bind(this),void 0];for(e.unshift.apply(e,u),e.push.apply(e,f),n=e.length,r=Promise.resolve(t);c<n;)r=r.then(e[c++],e[c++]);return r}n=u.length;let h=t;for(c=0;c<n;){let e=u[c++],t=u[c++];try{h=e(h)}catch(e){t.call(this,e);break}}try{r=tn.call(this,h)}catch(e){return Promise.reject(e)}for(c=0,n=f.length;c<n;)r=r.then(f[c++],f[c++]);return r}getUri(e){e=ti(this.defaults,e);let t=e2(e.baseURL,e.url);return eL(t,e.params,e.paramsSerializer)}}M.forEach(["delete","get","head","options"],function(e){/*eslint func-names:0*/tc.prototype[e]=function(t,r){return this.request(ti(r||{},{method:e,url:t,data:(r||{}).data}))}}),M.forEach(["post","put","patch"],function(e){/*eslint func-names:0*/function t(t){return function(r,n,o){return this.request(ti(o||{},{method:e,headers:t?{"Content-Type":"multipart/form-data"}:{},url:r,data:n}))}}tc.prototype[e]=t(),tc.prototype[e+"Form"]=t(!0)});/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @param {Function} executor The executor function.
 *
 * @returns {CancelToken}
 */class th{constructor(e){let t;if("function"!=typeof e)throw TypeError("executor must be a function.");this.promise=new Promise(function(e){t=e});let r=this;// eslint-disable-next-line func-names
this.promise.then(e=>{if(!r._listeners)return;let t=r._listeners.length;for(;t-- >0;)r._listeners[t](e);r._listeners=null}),// eslint-disable-next-line func-names
this.promise.then=e=>{let t;// eslint-disable-next-line func-names
let n=new Promise(e=>{r.subscribe(e),t=e}).then(e);return n.cancel=function(){r.unsubscribe(t)},n},e(function(e,n,o){r.reason||(r.reason=new e0(e,n,o),t(r.reason))})}/**
   * Throws a `CanceledError` if cancellation has been requested.
   */throwIfRequested(){if(this.reason)throw this.reason}/**
   * Subscribe to the cancel signal
   */subscribe(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]}/**
   * Unsubscribe from the cancel signal
   */unsubscribe(e){if(!this._listeners)return;let t=this._listeners.indexOf(e);-1!==t&&this._listeners.splice(t,1)}/**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */static source(){let e;let t=new th(function(t){e=t});return{token:t,cancel:e}}}let tp={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(tp).forEach(([e,t])=>{tp[t]=e});// Create the default instance to be exported
let td=/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 *
 * @returns {Axios} A new instance of Axios
 */function e(t){let r=new tc(t),n=u(tc.prototype.request,r);return M.extend(n,tc.prototype,r,{allOwnKeys:!0}),M.extend(n,r,null,{allOwnKeys:!0}),// Factory for creating new instances
n.create=function(r){return e(ti(t,r))},n}(eH);// Expose Axios class to allow class inheritance
td.Axios=tc,// Expose Cancel & CancelToken
td.CanceledError=e0,td.CancelToken=th,td.isCancel=eQ,td.VERSION=ts,td.toFormData=eT,// Expose AxiosError class
td.AxiosError=q,// alias for CanceledError for backward compatibility
td.Cancel=td.CanceledError,// Expose all/spread
td.all=function(e){return Promise.all(e)},td.spread=function(e){return function(t){return e.apply(null,t)}},// Expose isAxiosError
td.isAxiosError=function(e){return M.isObject(e)&&!0===e.isAxiosError},// Expose mergeConfig
td.mergeConfig=ti,td.AxiosHeaders=eX,td.formToJSON=e=>ez(M.isHTMLForm(e)?new FormData(e):e),td.getAdapter=tt.getAdapter,td.HttpStatusCode=tp,td.default=td;// This module is intended to unwrap Axios default export as named.
// Keep top-level export same with static properties
// so that it can keep same with es module or cjs
let{Axios:ty,AxiosError:tg,CanceledError:tm,isCancel:tb,CancelToken:tw,VERSION:tE,all:tv,Cancel:tA,isAxiosError:tO,spread:tS,toFormData:tR,AxiosHeaders:tT,HttpStatusCode:tB,formToJSON:tU,getAdapter:tC,mergeConfig:tx}=td,tL=()=>{let e=document.querySelector(".alert");e&&e.parentElement.removeChild(e)},tj=(e,t,r=7)=>{tL();let n=`<div class="alert alert--${e}">${t}</div>`;document.querySelector("body").insertAdjacentHTML("afterbegin",n),window.setTimeout(tL,1e3*r)},tP=async(e,t)=>{try{let r=await td({method:"POST",url:"http://localhost:3000/api/v1/users/login",data:{email:e,password:t}});"success"===r.data.status&&(tj("success","You have been succesfully logged in"),window.setTimeout(()=>{location.assign("/")},1500))}catch(e){tj("error",e.response.data.message)}},tN=async()=>{try{let e=await td({method:"GET",url:"http://localhost:3000/api/v1/users/logout"});"success"===e.data.status&&location.reload(!0)}catch(e){tj("error","Error logging out! Try Again."),console.error(e)}},tI=async(e,t)=>{try{let r=await td({method:"PATCH",url:"password"===t?"http://localhost:3000/api/v1/users/updateMyPassword":"http://localhost:3000/api/v1/users/updateMe",data:e});"success"===r.data.status&&tj("success",` ${t.toUpperCase()} updated successfully`)}catch(e){tj("error",e.response.data.message)}};Stripe("pk_test_51O3TxHIkjI9eOA45hfqQxUuULNbJBHWvaNULoIwe7ua0aqPnJo7sLDrFn1MZbeBuLpHG0OTl4LrlHMNJhmp2P26a00jb2RcQIk");let tk=async e=>{try{let t=await td.post(`http://localhost:3000/api/v1/bookings/checkout-session/${e}`);// console.log(response.data.session.url);
location.href=t.data.session.url}catch(e){tj("error",e)}},tF=document.getElementById("map"),t_=document.querySelector(".form--login"),tD=document.querySelector(".nav__el--logout"),tM=document.querySelector(".form-user-data"),tq=document.querySelector(".form-user-password"),tz=document.getElementById("book-tour");// const bookBtn = document.getElementById('book-tour');
// DELEGATION
if(tF){let e=JSON.parse(tF.dataset.locations);(e=>{mapboxgl.accessToken="pk.eyJ1IjoiY3BlcmV6bGVjYXJvcyIsImEiOiJjbG42Y2JqYnowZHk5MmlxejFpbHFxaHVzIn0.bPLGX8Alcs_V6sUE7oOHMw";var t=new mapboxgl.Map({container:"map",style:"mapbox://styles/cperezlecaros/cln6wqn1f006x01r7fl04a462",scrollZoom:!1});let r=new mapboxgl.LngLatBounds;e.forEach(e=>{//crear marcador
let n=document.createElement("div");n.className="marker",//añadir marcador
new mapboxgl.Marker({element:n,anchor:"bottom"}).setLngLat(e.coordinates).addTo(t),//añadir popup
new mapboxgl.Popup({offset:30}).setLngLat(e.coordinates).setHTML(`<p>Day ${e.day}: ${e.description}</p>`).addTo(t),//extender map bound para incluir la ubicación actual
r.extend(e.coordinates)}),t.fitBounds(r,{padding:{top:200,bottom:150,left:100,right:100}})})(e)}t_&&t_.addEventListener("submit",e=>{e.preventDefault();let t=document.getElementById("email").value,r=document.getElementById("password").value;tP(t,r)}),tD&&tD.addEventListener("click",tN),tM&&tM.addEventListener("submit",e=>{e.preventDefault();let t=new FormData;t.append("name",document.getElementById("name").value),t.append("email",document.getElementById("email").value),t.append("photo",document.getElementById("photo").files[0]),tI(t,"data"),window.setTimeout(()=>{location.assign("/me")},1e3)}),tq&&tq.addEventListener("submit",async e=>{e.preventDefault(),document.querySelector(".btn--save-password").textContent="Updating...";let t=document.getElementById("password-current").value,r=document.getElementById("password").value,n=document.getElementById("password-confirm").value;await tI({passwordCurrent:t,password:r,passwordConfirm:n},"password"),document.querySelector(".btn--save-password").textContent="Save password",document.getElementById("password-current").value="",document.getElementById("password").value="",document.getElementById("password-confirm").value=""}),tz&&tz.addEventListener("click",e=>{e.target.textContent="Processing...";let{tourId:t}=e.target.dataset;tk(t)});let tH=document.querySelector("body").dataset.alert;tH&&tj("success",tH,20)})();//# sourceMappingURL=index.js.map

//# sourceMappingURL=index.js.map
