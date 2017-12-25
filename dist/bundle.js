webpackJsonp([0],[
/* 0 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_export.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var core = __webpack_require__(/*! ./_core */ 23);
var hide = __webpack_require__(/*! ./_hide */ 14);
var redefine = __webpack_require__(/*! ./_redefine */ 15);
var ctx = __webpack_require__(/*! ./_ctx */ 20);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 1 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_an-object.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 2 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_global.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_fails.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 4 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-object.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 5 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_wks.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ 53)('wks');
var uid = __webpack_require__(/*! ./_uid */ 34);
var Symbol = __webpack_require__(/*! ./_global */ 2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 6 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_descriptors.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ 3)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 7 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dp.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ 1);
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 93);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 24);
var dP = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ 6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 8 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-length.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ 26);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 9 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-object.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ 25);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 10 */,
/* 11 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_a-function.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 12 */
/*!*************************!*\
  !*** ./src/settings.js ***!
  \*************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by ss on 30.11.2017.
 */

function Global() {
    var tuneTip = {
        // подсказки
        //сдвиг px
        offset: 5,
        // длительность дрожания
        duration: 100,
        // повторы
        repeat: 4
    };
    var tuneFall = {
        //падение
        duration: 250
    };
    var tuneRemove = {
        // пропадение блоков
        duration: 250
    };

    return {
        SELECT: 1,
        UNSELECT: 0,
        INITIALSTATE: 0,
        CHANGEPOSITION: 1,
        STEP: 1,
        SPEEDGEMREMOVEBYALPHA: 250,
        tuneTip: tuneTip,
        tuneFall: tuneFall,
        tuneRemove: tuneRemove
    };
}

var settings = {
    logicWidth: 800,
    logicHeight: 1280,
    calcWidth: 0,
    calcHeight: 0,
    rate: 800 / 1280,
    initGemSize: 100,
    calcGemSize: 0,
    topGame: 0.3125,
    offsetGemsField: 0,
    scale: 1,
    fieldRow: 0,
    fieldCol: 0,
    color: 0,
    level: null,
    boards: null,
    ball: 20,
    score1: 2000,
    score2: 4000,
    score3: 6000,
    goal: 2
};

exports.Global = Global;
exports.settings = settings;

/***/ }),
/* 13 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_has.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 14 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_hide.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ 7);
var createDesc = __webpack_require__(/*! ./_property-desc */ 33);
module.exports = __webpack_require__(/*! ./_descriptors */ 6) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 15 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var hide = __webpack_require__(/*! ./_hide */ 14);
var has = __webpack_require__(/*! ./_has */ 13);
var SRC = __webpack_require__(/*! ./_uid */ 34)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(/*! ./_core */ 23).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 16 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_string-html.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var fails = __webpack_require__(/*! ./_fails */ 3);
var defined = __webpack_require__(/*! ./_defined */ 25);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),
/* 17 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-iobject.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ 49);
var defined = __webpack_require__(/*! ./_defined */ 25);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 18 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopd.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(/*! ./_object-pie */ 50);
var createDesc = __webpack_require__(/*! ./_property-desc */ 33);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 24);
var has = __webpack_require__(/*! ./_has */ 13);
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 93);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ 6) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 19 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gpo.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ 13);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ 69)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 20 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_ctx.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 21 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_cof.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 22 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_strict-method.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(/*! ./_fails */ 3);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),
/* 23 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_core.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 24 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_to-primitive.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ 4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 25 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_defined.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 26 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-integer.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 27 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-sap.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(/*! ./_export */ 0);
var core = __webpack_require__(/*! ./_core */ 23);
var fails = __webpack_require__(/*! ./_fails */ 3);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 28 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-methods.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(/*! ./_ctx */ 20);
var IObject = __webpack_require__(/*! ./_iobject */ 49);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var asc = __webpack_require__(/*! ./_array-species-create */ 86);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 29 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_typed-array.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__(/*! ./_descriptors */ 6)) {
  var LIBRARY = __webpack_require__(/*! ./_library */ 35);
  var global = __webpack_require__(/*! ./_global */ 2);
  var fails = __webpack_require__(/*! ./_fails */ 3);
  var $export = __webpack_require__(/*! ./_export */ 0);
  var $typed = __webpack_require__(/*! ./_typed */ 63);
  var $buffer = __webpack_require__(/*! ./_typed-buffer */ 92);
  var ctx = __webpack_require__(/*! ./_ctx */ 20);
  var anInstance = __webpack_require__(/*! ./_an-instance */ 41);
  var propertyDesc = __webpack_require__(/*! ./_property-desc */ 33);
  var hide = __webpack_require__(/*! ./_hide */ 14);
  var redefineAll = __webpack_require__(/*! ./_redefine-all */ 43);
  var toInteger = __webpack_require__(/*! ./_to-integer */ 26);
  var toLength = __webpack_require__(/*! ./_to-length */ 8);
  var toIndex = __webpack_require__(/*! ./_to-index */ 119);
  var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 37);
  var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 24);
  var has = __webpack_require__(/*! ./_has */ 13);
  var classof = __webpack_require__(/*! ./_classof */ 51);
  var isObject = __webpack_require__(/*! ./_is-object */ 4);
  var toObject = __webpack_require__(/*! ./_to-object */ 9);
  var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ 83);
  var create = __webpack_require__(/*! ./_object-create */ 38);
  var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19);
  var gOPN = __webpack_require__(/*! ./_object-gopn */ 39).f;
  var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ 85);
  var uid = __webpack_require__(/*! ./_uid */ 34);
  var wks = __webpack_require__(/*! ./_wks */ 5);
  var createArrayMethod = __webpack_require__(/*! ./_array-methods */ 28);
  var createArrayIncludes = __webpack_require__(/*! ./_array-includes */ 54);
  var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 61);
  var ArrayIterators = __webpack_require__(/*! ./es6.array.iterator */ 88);
  var Iterators = __webpack_require__(/*! ./_iterators */ 46);
  var $iterDetect = __webpack_require__(/*! ./_iter-detect */ 58);
  var setSpecies = __webpack_require__(/*! ./_set-species */ 40);
  var arrayFill = __webpack_require__(/*! ./_array-fill */ 87);
  var arrayCopyWithin = __webpack_require__(/*! ./_array-copy-within */ 109);
  var $DP = __webpack_require__(/*! ./_object-dp */ 7);
  var $GOPD = __webpack_require__(/*! ./_object-gopd */ 18);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),
/* 30 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_metadata.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(/*! ./es6.map */ 114);
var $export = __webpack_require__(/*! ./_export */ 0);
var shared = __webpack_require__(/*! ./_shared */ 53)('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(/*! ./es6.weak-map */ 117))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),
/* 31 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_meta.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(/*! ./_uid */ 34)('meta');
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var has = __webpack_require__(/*! ./_has */ 13);
var setDesc = __webpack_require__(/*! ./_object-dp */ 7).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(/*! ./_fails */ 3)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 32 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_add-to-unscopables.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(/*! ./_wks */ 5)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(/*! ./_hide */ 14)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 33 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_property-desc.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 34 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_uid.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 35 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_library.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 36 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ 95);
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 70);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 37 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_to-absolute-index.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ 26);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 38 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-create.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var dPs = __webpack_require__(/*! ./_object-dps */ 96);
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 70);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ 69)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ 67)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ 71).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 39 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ 95);
var hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ 70).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 40 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_set-species.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 2);
var dP = __webpack_require__(/*! ./_object-dp */ 7);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 6);
var SPECIES = __webpack_require__(/*! ./_wks */ 5)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 41 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_an-instance.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 42 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_for-of.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ 20);
var call = __webpack_require__(/*! ./_iter-call */ 107);
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ 83);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ 85);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 43 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine-all.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(/*! ./_redefine */ 15);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 44 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-to-string-tag.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ 7).f;
var has = __webpack_require__(/*! ./_has */ 13);
var TAG = __webpack_require__(/*! ./_wks */ 5)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 45 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_string-trim.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var defined = __webpack_require__(/*! ./_defined */ 25);
var fails = __webpack_require__(/*! ./_fails */ 3);
var spaces = __webpack_require__(/*! ./_string-ws */ 73);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),
/* 46 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iterators.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 47 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_validate-collection.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 48 */,
/* 49 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_iobject.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ 21);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 50 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-pie.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 51 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_classof.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(/*! ./_cof */ 21);
var TAG = __webpack_require__(/*! ./_wks */ 5)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 52 */
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var centerGameObjects = exports.centerGameObjects = function centerGameObjects(objects) {
    objects.forEach(function (object) {
        object.anchor.setTo(0.5);
    });
};

// todo надо передавать массив с опциями, изображения и прочее
var addMenuOption = exports.addMenuOption = function addMenuOption(x, y, text, callback, scale) {
    var txt = void 0;
    txt = game.add.text(x, y, text);
    txt.fill = '#ff0000';
    // txt.anchor.setTo(0.0);
    txt.scale.setTo(scale);
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback);
    txt.events.onInputOver.add(function (target) {
        target.fill = '#ffffff';
    });
    txt.events.onInputOut.add(function (target) {
        target.fill = '#ff0000';
    });
};

/***/ }),
/* 53 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_shared.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 54 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-includes.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 37);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 55 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gops.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 56 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(/*! ./_cof */ 21);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 57 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-regexp.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var cof = __webpack_require__(/*! ./_cof */ 21);
var MATCH = __webpack_require__(/*! ./_wks */ 5)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),
/* 58 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-detect.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(/*! ./_wks */ 5)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 59 */
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_flags.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(/*! ./_an-object */ 1);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 60 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_fix-re-wks.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__(/*! ./_hide */ 14);
var redefine = __webpack_require__(/*! ./_redefine */ 15);
var fails = __webpack_require__(/*! ./_fails */ 3);
var defined = __webpack_require__(/*! ./_defined */ 25);
var wks = __webpack_require__(/*! ./_wks */ 5);

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),
/* 61 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_species-constructor.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var SPECIES = __webpack_require__(/*! ./_wks */ 5)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 62 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_collection.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 2);
var $export = __webpack_require__(/*! ./_export */ 0);
var redefine = __webpack_require__(/*! ./_redefine */ 15);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 43);
var meta = __webpack_require__(/*! ./_meta */ 31);
var forOf = __webpack_require__(/*! ./_for-of */ 42);
var anInstance = __webpack_require__(/*! ./_an-instance */ 41);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var fails = __webpack_require__(/*! ./_fails */ 3);
var $iterDetect = __webpack_require__(/*! ./_iter-detect */ 58);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 44);
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 74);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 63 */
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_typed.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var hide = __webpack_require__(/*! ./_hide */ 14);
var uid = __webpack_require__(/*! ./_uid */ 34);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};


/***/ }),
/* 64 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-forced-pam.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(/*! ./_library */ 35) || !__webpack_require__(/*! ./_fails */ 3)(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete __webpack_require__(/*! ./_global */ 2)[K];
});


/***/ }),
/* 65 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-collection-of.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(/*! ./_export */ 0);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 66 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-collection-from.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(/*! ./_export */ 0);
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var ctx = __webpack_require__(/*! ./_ctx */ 20);
var forOf = __webpack_require__(/*! ./_for-of */ 42);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 67 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_dom-create.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
var document = __webpack_require__(/*! ./_global */ 2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 68 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-define.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var core = __webpack_require__(/*! ./_core */ 23);
var LIBRARY = __webpack_require__(/*! ./_library */ 35);
var wksExt = __webpack_require__(/*! ./_wks-ext */ 94);
var defineProperty = __webpack_require__(/*! ./_object-dp */ 7).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 69 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_shared-key.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ 53)('keys');
var uid = __webpack_require__(/*! ./_uid */ 34);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 70 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-bug-keys.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 71 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_html.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ./_global */ 2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 72 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_set-proto.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(/*! ./_ctx */ 20)(Function.call, __webpack_require__(/*! ./_object-gopd */ 18).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 73 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-ws.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 74 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_inherit-if-required.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
var setPrototypeOf = __webpack_require__(/*! ./_set-proto */ 72).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),
/* 75 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_string-repeat.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(/*! ./_to-integer */ 26);
var defined = __webpack_require__(/*! ./_defined */ 25);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),
/* 76 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-sign.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),
/* 77 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-expm1.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),
/* 78 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-at.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ 26);
var defined = __webpack_require__(/*! ./_defined */ 25);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 79 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-define.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ 35);
var $export = __webpack_require__(/*! ./_export */ 0);
var redefine = __webpack_require__(/*! ./_redefine */ 15);
var hide = __webpack_require__(/*! ./_hide */ 14);
var has = __webpack_require__(/*! ./_has */ 13);
var Iterators = __webpack_require__(/*! ./_iterators */ 46);
var $iterCreate = __webpack_require__(/*! ./_iter-create */ 80);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 44);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19);
var ITERATOR = __webpack_require__(/*! ./_wks */ 5)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 80 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-create.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(/*! ./_object-create */ 38);
var descriptor = __webpack_require__(/*! ./_property-desc */ 33);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 44);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ 14)(IteratorPrototype, __webpack_require__(/*! ./_wks */ 5)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 81 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_string-context.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(/*! ./_is-regexp */ 57);
var defined = __webpack_require__(/*! ./_defined */ 25);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),
/* 82 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_fails-is-regexp.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(/*! ./_wks */ 5)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),
/* 83 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array-iter.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(/*! ./_iterators */ 46);
var ITERATOR = __webpack_require__(/*! ./_wks */ 5)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 84 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_create-property.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(/*! ./_object-dp */ 7);
var createDesc = __webpack_require__(/*! ./_property-desc */ 33);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 85 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/core.get-iterator-method.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./_classof */ 51);
var ITERATOR = __webpack_require__(/*! ./_wks */ 5)('iterator');
var Iterators = __webpack_require__(/*! ./_iterators */ 46);
module.exports = __webpack_require__(/*! ./_core */ 23).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 86 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-create.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(/*! ./_array-species-constructor */ 224);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 87 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_array-fill.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 37);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 88 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.iterator.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ 32);
var step = __webpack_require__(/*! ./_iter-step */ 110);
var Iterators = __webpack_require__(/*! ./_iterators */ 46);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(/*! ./_iter-define */ 79)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 89 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_task.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ 20);
var invoke = __webpack_require__(/*! ./_invoke */ 100);
var html = __webpack_require__(/*! ./_html */ 71);
var cel = __webpack_require__(/*! ./_dom-create */ 67);
var global = __webpack_require__(/*! ./_global */ 2);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(/*! ./_cof */ 21)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 90 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_microtask.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var macrotask = __webpack_require__(/*! ./_task */ 89).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(/*! ./_cof */ 21)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if (Observer) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 91 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/_new-promise-capability.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(/*! ./_a-function */ 11);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 92 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_typed-buffer.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 2);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 6);
var LIBRARY = __webpack_require__(/*! ./_library */ 35);
var $typed = __webpack_require__(/*! ./_typed */ 63);
var hide = __webpack_require__(/*! ./_hide */ 14);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 43);
var fails = __webpack_require__(/*! ./_fails */ 3);
var anInstance = __webpack_require__(/*! ./_an-instance */ 41);
var toInteger = __webpack_require__(/*! ./_to-integer */ 26);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var toIndex = __webpack_require__(/*! ./_to-index */ 119);
var gOPN = __webpack_require__(/*! ./_object-gopn */ 39).f;
var dP = __webpack_require__(/*! ./_object-dp */ 7).f;
var arrayFill = __webpack_require__(/*! ./_array-fill */ 87);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 44);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),
/* 93 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_ie8-dom-define.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ 6) && !__webpack_require__(/*! ./_fails */ 3)(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ 67)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 94 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-ext.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(/*! ./_wks */ 5);


/***/ }),
/* 95 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys-internal.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ 13);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);
var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ 54)(false);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ 69)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 96 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dps.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ 7);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var getKeys = __webpack_require__(/*! ./_object-keys */ 36);

module.exports = __webpack_require__(/*! ./_descriptors */ 6) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 97 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn-ext.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);
var gOPN = __webpack_require__(/*! ./_object-gopn */ 39).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 98 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-assign.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(/*! ./_object-keys */ 36);
var gOPS = __webpack_require__(/*! ./_object-gops */ 55);
var pIE = __webpack_require__(/*! ./_object-pie */ 50);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var IObject = __webpack_require__(/*! ./_iobject */ 49);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(/*! ./_fails */ 3)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 99 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_bind.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var invoke = __webpack_require__(/*! ./_invoke */ 100);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),
/* 100 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_invoke.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 101 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_parse-int.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(/*! ./_global */ 2).parseInt;
var $trim = __webpack_require__(/*! ./_string-trim */ 45).trim;
var ws = __webpack_require__(/*! ./_string-ws */ 73);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 102 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_parse-float.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(/*! ./_global */ 2).parseFloat;
var $trim = __webpack_require__(/*! ./_string-trim */ 45).trim;

module.exports = 1 / $parseFloat(__webpack_require__(/*! ./_string-ws */ 73) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),
/* 103 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_a-number-value.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(/*! ./_cof */ 21);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),
/* 104 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-integer.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 105 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-log1p.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),
/* 106 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_math-fround.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(/*! ./_math-sign */ 76);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),
/* 107 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-call.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(/*! ./_an-object */ 1);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 108 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_array-reduce.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var IObject = __webpack_require__(/*! ./_iobject */ 49);
var toLength = __webpack_require__(/*! ./_to-length */ 8);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),
/* 109 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-copy-within.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 37);
var toLength = __webpack_require__(/*! ./_to-length */ 8);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),
/* 110 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-step.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 111 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.flags.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(/*! ./_descriptors */ 6) && /./g.flags != 'g') __webpack_require__(/*! ./_object-dp */ 7).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(/*! ./_flags */ 59)
});


/***/ }),
/* 112 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_perform.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 113 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_promise-resolve.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ 1);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ 91);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 114 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/es6.map.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ 115);
var validate = __webpack_require__(/*! ./_validate-collection */ 47);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(/*! ./_collection */ 62)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 115 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-strong.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(/*! ./_object-dp */ 7).f;
var create = __webpack_require__(/*! ./_object-create */ 38);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 43);
var ctx = __webpack_require__(/*! ./_ctx */ 20);
var anInstance = __webpack_require__(/*! ./_an-instance */ 41);
var forOf = __webpack_require__(/*! ./_for-of */ 42);
var $iterDefine = __webpack_require__(/*! ./_iter-define */ 79);
var step = __webpack_require__(/*! ./_iter-step */ 110);
var setSpecies = __webpack_require__(/*! ./_set-species */ 40);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 6);
var fastKey = __webpack_require__(/*! ./_meta */ 31).fastKey;
var validate = __webpack_require__(/*! ./_validate-collection */ 47);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 116 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/es6.set.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ 115);
var validate = __webpack_require__(/*! ./_validate-collection */ 47);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(/*! ./_collection */ 62)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 117 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.weak-map.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each = __webpack_require__(/*! ./_array-methods */ 28)(0);
var redefine = __webpack_require__(/*! ./_redefine */ 15);
var meta = __webpack_require__(/*! ./_meta */ 31);
var assign = __webpack_require__(/*! ./_object-assign */ 98);
var weak = __webpack_require__(/*! ./_collection-weak */ 118);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var fails = __webpack_require__(/*! ./_fails */ 3);
var validate = __webpack_require__(/*! ./_validate-collection */ 47);
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(/*! ./_collection */ 62)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),
/* 118 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-weak.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(/*! ./_redefine-all */ 43);
var getWeak = __webpack_require__(/*! ./_meta */ 31).getWeak;
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var anInstance = __webpack_require__(/*! ./_an-instance */ 41);
var forOf = __webpack_require__(/*! ./_for-of */ 42);
var createArrayMethod = __webpack_require__(/*! ./_array-methods */ 28);
var $has = __webpack_require__(/*! ./_has */ 13);
var validate = __webpack_require__(/*! ./_validate-collection */ 47);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),
/* 119 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_to-index.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(/*! ./_to-integer */ 26);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};


/***/ }),
/* 120 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_own-keys.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(/*! ./_object-gopn */ 39);
var gOPS = __webpack_require__(/*! ./_object-gops */ 55);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var Reflect = __webpack_require__(/*! ./_global */ 2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),
/* 121 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_flatten-into-array.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = __webpack_require__(/*! ./_is-array */ 56);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var ctx = __webpack_require__(/*! ./_ctx */ 20);
var IS_CONCAT_SPREADABLE = __webpack_require__(/*! ./_wks */ 5)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;


/***/ }),
/* 122 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-pad.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var repeat = __webpack_require__(/*! ./_string-repeat */ 75);
var defined = __webpack_require__(/*! ./_defined */ 25);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 123 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-to-array.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(/*! ./_object-keys */ 36);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);
var isEnum = __webpack_require__(/*! ./_object-pie */ 50).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 124 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-to-json.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(/*! ./_classof */ 51);
var from = __webpack_require__(/*! ./_array-from-iterable */ 125);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 125 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-from-iterable.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(/*! ./_for-of */ 42);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 126 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-scale.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};


/***/ }),
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */
/*!***************************!*\
  !*** ./src/game/Field.js ***!
  \***************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 10);

var _phaser2 = _interopRequireDefault(_phaser);

var _settings = __webpack_require__(/*! ../settings */ 12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ss on 13.12.2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * This class describe field under gem.
 * It is simple class positions itself on display according
 * to size and type (desktop, mobile).
 *
 */
var Field = function (_Phaser$Group) {
    _inherits(Field, _Phaser$Group);

    function Field() {
        _classCallCheck(this, Field);

        var _this = _possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).call(this, game));

        _this.y = _settings.settings.offsetGemsField;
        _this.bg = _this.create(0, 0, 'field');
        _this.bg.alpha = 0.5;
        _this.bg.scale.setTo(_settings.settings.scale);

        _this.layer1;
        _this.layer2;
        _this.layer3;

        _this.init();

        return _this;
    }

    _createClass(Field, [{
        key: 'init',
        value: function init() {
            var layer1 = game.add.group();
            var layer2 = game.add.group();
            var layer3 = game.add.group();

            this.layer1 = this.add(layer1, true, 1);
            this.layer2 = this.add(layer2, true, 2);
            this.layer3 = this.add(layer3, true, 3);
        }

        // create(){
        //     let row;
        //
        //     // let rect = new Phaser.Graphics(game);
        //     let line = new Phaser.Graphics(game);
        //     //this.addChild(rect);
        //     this.addChild(line);
        //
        //     // rect.beginFill(0xeeeeee, 0.4);
        //     // rect.drawRect(this.x, this.y, game.world.width, game.world.width);
        //     // rect.endFill();
        //
        //     line.beginFill(0x027a71);
        //     line.lineStyle(2, 0xcccccc, 1);
        //     for(row = 0; row <= settings.fieldRow; row++){
        //
        //         line.moveTo(this.x, this.y + settings.initGemSize*row);
        //         console.log(this.y);
        //         line.lineTo(this.x + game.world.width, this.y + settings.initGemSize*row);
        //         line.moveTo(this.x + (row * settings.initGemSize), this.y);
        //         line.lineTo(this.x + (row * settings.initGemSize), this.y + game.world.width);
        //
        //     }
        //     line.endFill();
        //     console.dir(this);
        //
        //
        // }

    }, {
        key: 'update',
        value: function update() {}
    }]);

    return Field;
}(_phaser2.default.Group);
// context.beginPath();
// context.lineWidth = 10;
// context.strokeStyle = "rgb(0, 0, 0)";
// context.arc(200, 233, 150, 0, 2 * Math.PI, true);
// context.stroke();


exports.default = Field;

/***/ }),
/* 131 */
/*!******************************************!*\
  !*** multi babel-polyfill ./src/main.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! babel-polyfill */132);
module.exports = __webpack_require__(/*! E:\Web\ThreeInRow\www\src\main.js */334);


/***/ }),
/* 132 */
/*!**************************************************!*\
  !*** ./node_modules/babel-polyfill/lib/index.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(/*! core-js/shim */ 133);

__webpack_require__(/*! regenerator-runtime/runtime */ 330);

__webpack_require__(/*! core-js/fn/regexp/escape */ 331);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 48)))

/***/ }),
/* 133 */
/*!**************************************!*\
  !*** ./node_modules/core-js/shim.js ***!
  \**************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./modules/es6.symbol */ 134);
__webpack_require__(/*! ./modules/es6.object.create */ 136);
__webpack_require__(/*! ./modules/es6.object.define-property */ 137);
__webpack_require__(/*! ./modules/es6.object.define-properties */ 138);
__webpack_require__(/*! ./modules/es6.object.get-own-property-descriptor */ 139);
__webpack_require__(/*! ./modules/es6.object.get-prototype-of */ 140);
__webpack_require__(/*! ./modules/es6.object.keys */ 141);
__webpack_require__(/*! ./modules/es6.object.get-own-property-names */ 142);
__webpack_require__(/*! ./modules/es6.object.freeze */ 143);
__webpack_require__(/*! ./modules/es6.object.seal */ 144);
__webpack_require__(/*! ./modules/es6.object.prevent-extensions */ 145);
__webpack_require__(/*! ./modules/es6.object.is-frozen */ 146);
__webpack_require__(/*! ./modules/es6.object.is-sealed */ 147);
__webpack_require__(/*! ./modules/es6.object.is-extensible */ 148);
__webpack_require__(/*! ./modules/es6.object.assign */ 149);
__webpack_require__(/*! ./modules/es6.object.is */ 150);
__webpack_require__(/*! ./modules/es6.object.set-prototype-of */ 152);
__webpack_require__(/*! ./modules/es6.object.to-string */ 153);
__webpack_require__(/*! ./modules/es6.function.bind */ 154);
__webpack_require__(/*! ./modules/es6.function.name */ 155);
__webpack_require__(/*! ./modules/es6.function.has-instance */ 156);
__webpack_require__(/*! ./modules/es6.parse-int */ 157);
__webpack_require__(/*! ./modules/es6.parse-float */ 158);
__webpack_require__(/*! ./modules/es6.number.constructor */ 159);
__webpack_require__(/*! ./modules/es6.number.to-fixed */ 160);
__webpack_require__(/*! ./modules/es6.number.to-precision */ 161);
__webpack_require__(/*! ./modules/es6.number.epsilon */ 162);
__webpack_require__(/*! ./modules/es6.number.is-finite */ 163);
__webpack_require__(/*! ./modules/es6.number.is-integer */ 164);
__webpack_require__(/*! ./modules/es6.number.is-nan */ 165);
__webpack_require__(/*! ./modules/es6.number.is-safe-integer */ 166);
__webpack_require__(/*! ./modules/es6.number.max-safe-integer */ 167);
__webpack_require__(/*! ./modules/es6.number.min-safe-integer */ 168);
__webpack_require__(/*! ./modules/es6.number.parse-float */ 169);
__webpack_require__(/*! ./modules/es6.number.parse-int */ 170);
__webpack_require__(/*! ./modules/es6.math.acosh */ 171);
__webpack_require__(/*! ./modules/es6.math.asinh */ 172);
__webpack_require__(/*! ./modules/es6.math.atanh */ 173);
__webpack_require__(/*! ./modules/es6.math.cbrt */ 174);
__webpack_require__(/*! ./modules/es6.math.clz32 */ 175);
__webpack_require__(/*! ./modules/es6.math.cosh */ 176);
__webpack_require__(/*! ./modules/es6.math.expm1 */ 177);
__webpack_require__(/*! ./modules/es6.math.fround */ 178);
__webpack_require__(/*! ./modules/es6.math.hypot */ 179);
__webpack_require__(/*! ./modules/es6.math.imul */ 180);
__webpack_require__(/*! ./modules/es6.math.log10 */ 181);
__webpack_require__(/*! ./modules/es6.math.log1p */ 182);
__webpack_require__(/*! ./modules/es6.math.log2 */ 183);
__webpack_require__(/*! ./modules/es6.math.sign */ 184);
__webpack_require__(/*! ./modules/es6.math.sinh */ 185);
__webpack_require__(/*! ./modules/es6.math.tanh */ 186);
__webpack_require__(/*! ./modules/es6.math.trunc */ 187);
__webpack_require__(/*! ./modules/es6.string.from-code-point */ 188);
__webpack_require__(/*! ./modules/es6.string.raw */ 189);
__webpack_require__(/*! ./modules/es6.string.trim */ 190);
__webpack_require__(/*! ./modules/es6.string.iterator */ 191);
__webpack_require__(/*! ./modules/es6.string.code-point-at */ 192);
__webpack_require__(/*! ./modules/es6.string.ends-with */ 193);
__webpack_require__(/*! ./modules/es6.string.includes */ 194);
__webpack_require__(/*! ./modules/es6.string.repeat */ 195);
__webpack_require__(/*! ./modules/es6.string.starts-with */ 196);
__webpack_require__(/*! ./modules/es6.string.anchor */ 197);
__webpack_require__(/*! ./modules/es6.string.big */ 198);
__webpack_require__(/*! ./modules/es6.string.blink */ 199);
__webpack_require__(/*! ./modules/es6.string.bold */ 200);
__webpack_require__(/*! ./modules/es6.string.fixed */ 201);
__webpack_require__(/*! ./modules/es6.string.fontcolor */ 202);
__webpack_require__(/*! ./modules/es6.string.fontsize */ 203);
__webpack_require__(/*! ./modules/es6.string.italics */ 204);
__webpack_require__(/*! ./modules/es6.string.link */ 205);
__webpack_require__(/*! ./modules/es6.string.small */ 206);
__webpack_require__(/*! ./modules/es6.string.strike */ 207);
__webpack_require__(/*! ./modules/es6.string.sub */ 208);
__webpack_require__(/*! ./modules/es6.string.sup */ 209);
__webpack_require__(/*! ./modules/es6.date.now */ 210);
__webpack_require__(/*! ./modules/es6.date.to-json */ 211);
__webpack_require__(/*! ./modules/es6.date.to-iso-string */ 212);
__webpack_require__(/*! ./modules/es6.date.to-string */ 214);
__webpack_require__(/*! ./modules/es6.date.to-primitive */ 215);
__webpack_require__(/*! ./modules/es6.array.is-array */ 217);
__webpack_require__(/*! ./modules/es6.array.from */ 218);
__webpack_require__(/*! ./modules/es6.array.of */ 219);
__webpack_require__(/*! ./modules/es6.array.join */ 220);
__webpack_require__(/*! ./modules/es6.array.slice */ 221);
__webpack_require__(/*! ./modules/es6.array.sort */ 222);
__webpack_require__(/*! ./modules/es6.array.for-each */ 223);
__webpack_require__(/*! ./modules/es6.array.map */ 225);
__webpack_require__(/*! ./modules/es6.array.filter */ 226);
__webpack_require__(/*! ./modules/es6.array.some */ 227);
__webpack_require__(/*! ./modules/es6.array.every */ 228);
__webpack_require__(/*! ./modules/es6.array.reduce */ 229);
__webpack_require__(/*! ./modules/es6.array.reduce-right */ 230);
__webpack_require__(/*! ./modules/es6.array.index-of */ 231);
__webpack_require__(/*! ./modules/es6.array.last-index-of */ 232);
__webpack_require__(/*! ./modules/es6.array.copy-within */ 233);
__webpack_require__(/*! ./modules/es6.array.fill */ 234);
__webpack_require__(/*! ./modules/es6.array.find */ 235);
__webpack_require__(/*! ./modules/es6.array.find-index */ 236);
__webpack_require__(/*! ./modules/es6.array.species */ 237);
__webpack_require__(/*! ./modules/es6.array.iterator */ 88);
__webpack_require__(/*! ./modules/es6.regexp.constructor */ 238);
__webpack_require__(/*! ./modules/es6.regexp.to-string */ 239);
__webpack_require__(/*! ./modules/es6.regexp.flags */ 111);
__webpack_require__(/*! ./modules/es6.regexp.match */ 240);
__webpack_require__(/*! ./modules/es6.regexp.replace */ 241);
__webpack_require__(/*! ./modules/es6.regexp.search */ 242);
__webpack_require__(/*! ./modules/es6.regexp.split */ 243);
__webpack_require__(/*! ./modules/es6.promise */ 244);
__webpack_require__(/*! ./modules/es6.map */ 114);
__webpack_require__(/*! ./modules/es6.set */ 116);
__webpack_require__(/*! ./modules/es6.weak-map */ 117);
__webpack_require__(/*! ./modules/es6.weak-set */ 245);
__webpack_require__(/*! ./modules/es6.typed.array-buffer */ 246);
__webpack_require__(/*! ./modules/es6.typed.data-view */ 247);
__webpack_require__(/*! ./modules/es6.typed.int8-array */ 248);
__webpack_require__(/*! ./modules/es6.typed.uint8-array */ 249);
__webpack_require__(/*! ./modules/es6.typed.uint8-clamped-array */ 250);
__webpack_require__(/*! ./modules/es6.typed.int16-array */ 251);
__webpack_require__(/*! ./modules/es6.typed.uint16-array */ 252);
__webpack_require__(/*! ./modules/es6.typed.int32-array */ 253);
__webpack_require__(/*! ./modules/es6.typed.uint32-array */ 254);
__webpack_require__(/*! ./modules/es6.typed.float32-array */ 255);
__webpack_require__(/*! ./modules/es6.typed.float64-array */ 256);
__webpack_require__(/*! ./modules/es6.reflect.apply */ 257);
__webpack_require__(/*! ./modules/es6.reflect.construct */ 258);
__webpack_require__(/*! ./modules/es6.reflect.define-property */ 259);
__webpack_require__(/*! ./modules/es6.reflect.delete-property */ 260);
__webpack_require__(/*! ./modules/es6.reflect.enumerate */ 261);
__webpack_require__(/*! ./modules/es6.reflect.get */ 262);
__webpack_require__(/*! ./modules/es6.reflect.get-own-property-descriptor */ 263);
__webpack_require__(/*! ./modules/es6.reflect.get-prototype-of */ 264);
__webpack_require__(/*! ./modules/es6.reflect.has */ 265);
__webpack_require__(/*! ./modules/es6.reflect.is-extensible */ 266);
__webpack_require__(/*! ./modules/es6.reflect.own-keys */ 267);
__webpack_require__(/*! ./modules/es6.reflect.prevent-extensions */ 268);
__webpack_require__(/*! ./modules/es6.reflect.set */ 269);
__webpack_require__(/*! ./modules/es6.reflect.set-prototype-of */ 270);
__webpack_require__(/*! ./modules/es7.array.includes */ 271);
__webpack_require__(/*! ./modules/es7.array.flat-map */ 272);
__webpack_require__(/*! ./modules/es7.array.flatten */ 273);
__webpack_require__(/*! ./modules/es7.string.at */ 274);
__webpack_require__(/*! ./modules/es7.string.pad-start */ 275);
__webpack_require__(/*! ./modules/es7.string.pad-end */ 276);
__webpack_require__(/*! ./modules/es7.string.trim-left */ 277);
__webpack_require__(/*! ./modules/es7.string.trim-right */ 278);
__webpack_require__(/*! ./modules/es7.string.match-all */ 279);
__webpack_require__(/*! ./modules/es7.symbol.async-iterator */ 280);
__webpack_require__(/*! ./modules/es7.symbol.observable */ 281);
__webpack_require__(/*! ./modules/es7.object.get-own-property-descriptors */ 282);
__webpack_require__(/*! ./modules/es7.object.values */ 283);
__webpack_require__(/*! ./modules/es7.object.entries */ 284);
__webpack_require__(/*! ./modules/es7.object.define-getter */ 285);
__webpack_require__(/*! ./modules/es7.object.define-setter */ 286);
__webpack_require__(/*! ./modules/es7.object.lookup-getter */ 287);
__webpack_require__(/*! ./modules/es7.object.lookup-setter */ 288);
__webpack_require__(/*! ./modules/es7.map.to-json */ 289);
__webpack_require__(/*! ./modules/es7.set.to-json */ 290);
__webpack_require__(/*! ./modules/es7.map.of */ 291);
__webpack_require__(/*! ./modules/es7.set.of */ 292);
__webpack_require__(/*! ./modules/es7.weak-map.of */ 293);
__webpack_require__(/*! ./modules/es7.weak-set.of */ 294);
__webpack_require__(/*! ./modules/es7.map.from */ 295);
__webpack_require__(/*! ./modules/es7.set.from */ 296);
__webpack_require__(/*! ./modules/es7.weak-map.from */ 297);
__webpack_require__(/*! ./modules/es7.weak-set.from */ 298);
__webpack_require__(/*! ./modules/es7.global */ 299);
__webpack_require__(/*! ./modules/es7.system.global */ 300);
__webpack_require__(/*! ./modules/es7.error.is-error */ 301);
__webpack_require__(/*! ./modules/es7.math.clamp */ 302);
__webpack_require__(/*! ./modules/es7.math.deg-per-rad */ 303);
__webpack_require__(/*! ./modules/es7.math.degrees */ 304);
__webpack_require__(/*! ./modules/es7.math.fscale */ 305);
__webpack_require__(/*! ./modules/es7.math.iaddh */ 306);
__webpack_require__(/*! ./modules/es7.math.isubh */ 307);
__webpack_require__(/*! ./modules/es7.math.imulh */ 308);
__webpack_require__(/*! ./modules/es7.math.rad-per-deg */ 309);
__webpack_require__(/*! ./modules/es7.math.radians */ 310);
__webpack_require__(/*! ./modules/es7.math.scale */ 311);
__webpack_require__(/*! ./modules/es7.math.umulh */ 312);
__webpack_require__(/*! ./modules/es7.math.signbit */ 313);
__webpack_require__(/*! ./modules/es7.promise.finally */ 314);
__webpack_require__(/*! ./modules/es7.promise.try */ 315);
__webpack_require__(/*! ./modules/es7.reflect.define-metadata */ 316);
__webpack_require__(/*! ./modules/es7.reflect.delete-metadata */ 317);
__webpack_require__(/*! ./modules/es7.reflect.get-metadata */ 318);
__webpack_require__(/*! ./modules/es7.reflect.get-metadata-keys */ 319);
__webpack_require__(/*! ./modules/es7.reflect.get-own-metadata */ 320);
__webpack_require__(/*! ./modules/es7.reflect.get-own-metadata-keys */ 321);
__webpack_require__(/*! ./modules/es7.reflect.has-metadata */ 322);
__webpack_require__(/*! ./modules/es7.reflect.has-own-metadata */ 323);
__webpack_require__(/*! ./modules/es7.reflect.metadata */ 324);
__webpack_require__(/*! ./modules/es7.asap */ 325);
__webpack_require__(/*! ./modules/es7.observable */ 326);
__webpack_require__(/*! ./modules/web.timers */ 327);
__webpack_require__(/*! ./modules/web.immediate */ 328);
__webpack_require__(/*! ./modules/web.dom.iterable */ 329);
module.exports = __webpack_require__(/*! ./modules/_core */ 23);


/***/ }),
/* 134 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es6.symbol.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(/*! ./_global */ 2);
var has = __webpack_require__(/*! ./_has */ 13);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 6);
var $export = __webpack_require__(/*! ./_export */ 0);
var redefine = __webpack_require__(/*! ./_redefine */ 15);
var META = __webpack_require__(/*! ./_meta */ 31).KEY;
var $fails = __webpack_require__(/*! ./_fails */ 3);
var shared = __webpack_require__(/*! ./_shared */ 53);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 44);
var uid = __webpack_require__(/*! ./_uid */ 34);
var wks = __webpack_require__(/*! ./_wks */ 5);
var wksExt = __webpack_require__(/*! ./_wks-ext */ 94);
var wksDefine = __webpack_require__(/*! ./_wks-define */ 68);
var enumKeys = __webpack_require__(/*! ./_enum-keys */ 135);
var isArray = __webpack_require__(/*! ./_is-array */ 56);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 24);
var createDesc = __webpack_require__(/*! ./_property-desc */ 33);
var _create = __webpack_require__(/*! ./_object-create */ 38);
var gOPNExt = __webpack_require__(/*! ./_object-gopn-ext */ 97);
var $GOPD = __webpack_require__(/*! ./_object-gopd */ 18);
var $DP = __webpack_require__(/*! ./_object-dp */ 7);
var $keys = __webpack_require__(/*! ./_object-keys */ 36);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(/*! ./_object-gopn */ 39).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(/*! ./_object-pie */ 50).f = $propertyIsEnumerable;
  __webpack_require__(/*! ./_object-gops */ 55).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(/*! ./_library */ 35)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ 14)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 135 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-keys.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(/*! ./_object-keys */ 36);
var gOPS = __webpack_require__(/*! ./_object-gops */ 55);
var pIE = __webpack_require__(/*! ./_object-pie */ 50);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 136 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.create.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(/*! ./_object-create */ 38) });


/***/ }),
/* 137 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.define-property.js ***!
  \********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ 6), 'Object', { defineProperty: __webpack_require__(/*! ./_object-dp */ 7).f });


/***/ }),
/* 138 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.define-properties.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ 6), 'Object', { defineProperties: __webpack_require__(/*! ./_object-dps */ 96) });


/***/ }),
/* 139 */
/*!********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-own-property-descriptor.js ***!
  \********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);
var $getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 18).f;

__webpack_require__(/*! ./_object-sap */ 27)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 140 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-prototype-of.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var $getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19);

__webpack_require__(/*! ./_object-sap */ 27)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 141 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.keys.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var $keys = __webpack_require__(/*! ./_object-keys */ 36);

__webpack_require__(/*! ./_object-sap */ 27)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 142 */
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-own-property-names.js ***!
  \***************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(/*! ./_object-sap */ 27)('getOwnPropertyNames', function () {
  return __webpack_require__(/*! ./_object-gopn-ext */ 97).f;
});


/***/ }),
/* 143 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.freeze.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var meta = __webpack_require__(/*! ./_meta */ 31).onFreeze;

__webpack_require__(/*! ./_object-sap */ 27)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 144 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.seal.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var meta = __webpack_require__(/*! ./_meta */ 31).onFreeze;

__webpack_require__(/*! ./_object-sap */ 27)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),
/* 145 */
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.prevent-extensions.js ***!
  \***********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var meta = __webpack_require__(/*! ./_meta */ 31).onFreeze;

__webpack_require__(/*! ./_object-sap */ 27)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),
/* 146 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-frozen.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);

__webpack_require__(/*! ./_object-sap */ 27)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),
/* 147 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-sealed.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);

__webpack_require__(/*! ./_object-sap */ 27)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),
/* 148 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-extensible.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);

__webpack_require__(/*! ./_object-sap */ 27)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),
/* 149 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.assign.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(/*! ./_object-assign */ 98) });


/***/ }),
/* 150 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(/*! ./_export */ 0);
$export($export.S, 'Object', { is: __webpack_require__(/*! ./_same-value */ 151) });


/***/ }),
/* 151 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_same-value.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),
/* 152 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.set-prototype-of.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(/*! ./_export */ 0);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(/*! ./_set-proto */ 72).set });


/***/ }),
/* 153 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.to-string.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(/*! ./_classof */ 51);
var test = {};
test[__webpack_require__(/*! ./_wks */ 5)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(/*! ./_redefine */ 15)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 154 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.bind.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Function', { bind: __webpack_require__(/*! ./_bind */ 99) });


/***/ }),
/* 155 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.name.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ 7).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(/*! ./_descriptors */ 6) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),
/* 156 */
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.has-instance.js ***!
  \*******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(/*! ./_is-object */ 4);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19);
var HAS_INSTANCE = __webpack_require__(/*! ./_wks */ 5)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(/*! ./_object-dp */ 7).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),
/* 157 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.parse-int.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseInt = __webpack_require__(/*! ./_parse-int */ 101);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),
/* 158 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.parse-float.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseFloat = __webpack_require__(/*! ./_parse-float */ 102);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),
/* 159 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.constructor.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 2);
var has = __webpack_require__(/*! ./_has */ 13);
var cof = __webpack_require__(/*! ./_cof */ 21);
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 74);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 24);
var fails = __webpack_require__(/*! ./_fails */ 3);
var gOPN = __webpack_require__(/*! ./_object-gopn */ 39).f;
var gOPD = __webpack_require__(/*! ./_object-gopd */ 18).f;
var dP = __webpack_require__(/*! ./_object-dp */ 7).f;
var $trim = __webpack_require__(/*! ./_string-trim */ 45).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(/*! ./_object-create */ 38)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(/*! ./_descriptors */ 6) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(/*! ./_redefine */ 15)(global, NUMBER, $Number);
}


/***/ }),
/* 160 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.to-fixed.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toInteger = __webpack_require__(/*! ./_to-integer */ 26);
var aNumberValue = __webpack_require__(/*! ./_a-number-value */ 103);
var repeat = __webpack_require__(/*! ./_string-repeat */ 75);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(/*! ./_fails */ 3)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),
/* 161 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.to-precision.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $fails = __webpack_require__(/*! ./_fails */ 3);
var aNumberValue = __webpack_require__(/*! ./_a-number-value */ 103);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


/***/ }),
/* 162 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.epsilon.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),
/* 163 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-finite.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(/*! ./_export */ 0);
var _isFinite = __webpack_require__(/*! ./_global */ 2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),
/* 164 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-integer.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', { isInteger: __webpack_require__(/*! ./_is-integer */ 104) });


/***/ }),
/* 165 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-nan.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 166 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-safe-integer.js ***!
  \********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(/*! ./_export */ 0);
var isInteger = __webpack_require__(/*! ./_is-integer */ 104);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),
/* 167 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.max-safe-integer.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),
/* 168 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.min-safe-integer.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),
/* 169 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.parse-float.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseFloat = __webpack_require__(/*! ./_parse-float */ 102);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),
/* 170 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.parse-int.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseInt = __webpack_require__(/*! ./_parse-int */ 101);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),
/* 171 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.acosh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var log1p = __webpack_require__(/*! ./_math-log1p */ 105);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),
/* 172 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.asinh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),
/* 173 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.atanh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),
/* 174 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.cbrt.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var sign = __webpack_require__(/*! ./_math-sign */ 76);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),
/* 175 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.clz32.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),
/* 176 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.cosh.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),
/* 177 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.expm1.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var $expm1 = __webpack_require__(/*! ./_math-expm1 */ 77);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),
/* 178 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.fround.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { fround: __webpack_require__(/*! ./_math-fround */ 106) });


/***/ }),
/* 179 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.hypot.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(/*! ./_export */ 0);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),
/* 180 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.imul.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(/*! ./_export */ 0);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),
/* 181 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.log10.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),
/* 182 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.log1p.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { log1p: __webpack_require__(/*! ./_math-log1p */ 105) });


/***/ }),
/* 183 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.log2.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 184 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.sign.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { sign: __webpack_require__(/*! ./_math-sign */ 76) });


/***/ }),
/* 185 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.sinh.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var expm1 = __webpack_require__(/*! ./_math-expm1 */ 77);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),
/* 186 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.tanh.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var expm1 = __webpack_require__(/*! ./_math-expm1 */ 77);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),
/* 187 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.trunc.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),
/* 188 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.from-code-point.js ***!
  \********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 37);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),
/* 189 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.raw.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);
var toLength = __webpack_require__(/*! ./_to-length */ 8);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),
/* 190 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.trim.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(/*! ./_string-trim */ 45)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),
/* 191 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.iterator.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(/*! ./_string-at */ 78)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(/*! ./_iter-define */ 79)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 192 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.code-point-at.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $at = __webpack_require__(/*! ./_string-at */ 78)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 193 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.ends-with.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(/*! ./_export */ 0);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var context = __webpack_require__(/*! ./_string-context */ 81);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 82)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),
/* 194 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.includes.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(/*! ./_export */ 0);
var context = __webpack_require__(/*! ./_string-context */ 81);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 82)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 195 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.repeat.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(/*! ./_string-repeat */ 75)
});


/***/ }),
/* 196 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.starts-with.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(/*! ./_export */ 0);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var context = __webpack_require__(/*! ./_string-context */ 81);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 82)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),
/* 197 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.anchor.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(/*! ./_string-html */ 16)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),
/* 198 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.big.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(/*! ./_string-html */ 16)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),
/* 199 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.blink.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(/*! ./_string-html */ 16)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),
/* 200 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.bold.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(/*! ./_string-html */ 16)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),
/* 201 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.fixed.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(/*! ./_string-html */ 16)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),
/* 202 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.fontcolor.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(/*! ./_string-html */ 16)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),
/* 203 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.fontsize.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(/*! ./_string-html */ 16)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),
/* 204 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.italics.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(/*! ./_string-html */ 16)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});


/***/ }),
/* 205 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.link.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(/*! ./_string-html */ 16)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),
/* 206 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.small.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(/*! ./_string-html */ 16)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),
/* 207 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.strike.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(/*! ./_string-html */ 16)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),
/* 208 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.sub.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(/*! ./_string-html */ 16)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),
/* 209 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.sup.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(/*! ./_string-html */ 16)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),
/* 210 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.now.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),
/* 211 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-json.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 24);

$export($export.P + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),
/* 212 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-iso-string.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(/*! ./_export */ 0);
var toISOString = __webpack_require__(/*! ./_date-to-iso-string */ 213);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),
/* 213 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_date-to-iso-string.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(/*! ./_fails */ 3);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),
/* 214 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-string.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(/*! ./_redefine */ 15)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 215 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-primitive.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(/*! ./_wks */ 5)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(/*! ./_hide */ 14)(proto, TO_PRIMITIVE, __webpack_require__(/*! ./_date-to-primitive */ 216));


/***/ }),
/* 216 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_date-to-primitive.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 24);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};


/***/ }),
/* 217 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.is-array.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Array', { isArray: __webpack_require__(/*! ./_is-array */ 56) });


/***/ }),
/* 218 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.from.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(/*! ./_ctx */ 20);
var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var call = __webpack_require__(/*! ./_iter-call */ 107);
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ 83);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var createProperty = __webpack_require__(/*! ./_create-property */ 84);
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ 85);

$export($export.S + $export.F * !__webpack_require__(/*! ./_iter-detect */ 58)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 219 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.of.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var createProperty = __webpack_require__(/*! ./_create-property */ 84);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),
/* 220 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.join.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(/*! ./_export */ 0);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(/*! ./_iobject */ 49) != Object || !__webpack_require__(/*! ./_strict-method */ 22)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 221 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.slice.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var html = __webpack_require__(/*! ./_html */ 71);
var cof = __webpack_require__(/*! ./_cof */ 21);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 37);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),
/* 222 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.sort.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var fails = __webpack_require__(/*! ./_fails */ 3);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(/*! ./_strict-method */ 22)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 223 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.for-each.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $forEach = __webpack_require__(/*! ./_array-methods */ 28)(0);
var STRICT = __webpack_require__(/*! ./_strict-method */ 22)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 224 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-constructor.js ***!
  \********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
var isArray = __webpack_require__(/*! ./_is-array */ 56);
var SPECIES = __webpack_require__(/*! ./_wks */ 5)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 225 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.map.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $map = __webpack_require__(/*! ./_array-methods */ 28)(1);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 22)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 226 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.filter.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $filter = __webpack_require__(/*! ./_array-methods */ 28)(2);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 22)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 227 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.some.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $some = __webpack_require__(/*! ./_array-methods */ 28)(3);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 22)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 228 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.every.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $every = __webpack_require__(/*! ./_array-methods */ 28)(4);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 22)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 229 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.reduce.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $reduce = __webpack_require__(/*! ./_array-reduce */ 108);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 22)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),
/* 230 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.reduce-right.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $reduce = __webpack_require__(/*! ./_array-reduce */ 108);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 22)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),
/* 231 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.index-of.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $indexOf = __webpack_require__(/*! ./_array-includes */ 54)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ 22)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),
/* 232 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.last-index-of.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);
var toInteger = __webpack_require__(/*! ./_to-integer */ 26);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ 22)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),
/* 233 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.copy-within.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Array', { copyWithin: __webpack_require__(/*! ./_array-copy-within */ 109) });

__webpack_require__(/*! ./_add-to-unscopables */ 32)('copyWithin');


/***/ }),
/* 234 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.fill.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Array', { fill: __webpack_require__(/*! ./_array-fill */ 87) });

__webpack_require__(/*! ./_add-to-unscopables */ 32)('fill');


/***/ }),
/* 235 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.find.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ 0);
var $find = __webpack_require__(/*! ./_array-methods */ 28)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ 32)(KEY);


/***/ }),
/* 236 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.find-index.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ 0);
var $find = __webpack_require__(/*! ./_array-methods */ 28)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ 32)(KEY);


/***/ }),
/* 237 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.species.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_set-species */ 40)('Array');


/***/ }),
/* 238 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.constructor.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 74);
var dP = __webpack_require__(/*! ./_object-dp */ 7).f;
var gOPN = __webpack_require__(/*! ./_object-gopn */ 39).f;
var isRegExp = __webpack_require__(/*! ./_is-regexp */ 57);
var $flags = __webpack_require__(/*! ./_flags */ 59);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(/*! ./_descriptors */ 6) && (!CORRECT_NEW || __webpack_require__(/*! ./_fails */ 3)(function () {
  re2[__webpack_require__(/*! ./_wks */ 5)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(/*! ./_redefine */ 15)(global, 'RegExp', $RegExp);
}

__webpack_require__(/*! ./_set-species */ 40)('RegExp');


/***/ }),
/* 239 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.to-string.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(/*! ./es6.regexp.flags */ 111);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var $flags = __webpack_require__(/*! ./_flags */ 59);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 6);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(/*! ./_redefine */ 15)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(/*! ./_fails */ 3)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),
/* 240 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.match.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(/*! ./_fix-re-wks */ 60)('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});


/***/ }),
/* 241 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.replace.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(/*! ./_fix-re-wks */ 60)('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});


/***/ }),
/* 242 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.search.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(/*! ./_fix-re-wks */ 60)('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});


/***/ }),
/* 243 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.split.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(/*! ./_fix-re-wks */ 60)('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = __webpack_require__(/*! ./_is-regexp */ 57);
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});


/***/ }),
/* 244 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/es6.promise.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ 35);
var global = __webpack_require__(/*! ./_global */ 2);
var ctx = __webpack_require__(/*! ./_ctx */ 20);
var classof = __webpack_require__(/*! ./_classof */ 51);
var $export = __webpack_require__(/*! ./_export */ 0);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var anInstance = __webpack_require__(/*! ./_an-instance */ 41);
var forOf = __webpack_require__(/*! ./_for-of */ 42);
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 61);
var task = __webpack_require__(/*! ./_task */ 89).set;
var microtask = __webpack_require__(/*! ./_microtask */ 90)();
var newPromiseCapabilityModule = __webpack_require__(/*! ./_new-promise-capability */ 91);
var perform = __webpack_require__(/*! ./_perform */ 112);
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ 113);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(/*! ./_wks */ 5)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  if (promise._h == 1) return false;
  var chain = promise._a || promise._c;
  var i = 0;
  var reaction;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
  } return true;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(/*! ./_redefine-all */ 43)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(/*! ./_set-to-string-tag */ 44)($Promise, PROMISE);
__webpack_require__(/*! ./_set-species */ 40)(PROMISE);
Wrapper = __webpack_require__(/*! ./_core */ 23)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(/*! ./_iter-detect */ 58)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 245 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.weak-set.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(/*! ./_collection-weak */ 118);
var validate = __webpack_require__(/*! ./_validate-collection */ 47);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(/*! ./_collection */ 62)(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);


/***/ }),
/* 246 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.array-buffer.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $typed = __webpack_require__(/*! ./_typed */ 63);
var buffer = __webpack_require__(/*! ./_typed-buffer */ 92);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 37);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var ArrayBuffer = __webpack_require__(/*! ./_global */ 2).ArrayBuffer;
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 61);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var final = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < final) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(/*! ./_set-species */ 40)(ARRAY_BUFFER);


/***/ }),
/* 247 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.data-view.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
$export($export.G + $export.W + $export.F * !__webpack_require__(/*! ./_typed */ 63).ABV, {
  DataView: __webpack_require__(/*! ./_typed-buffer */ 92).DataView
});


/***/ }),
/* 248 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.int8-array.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 29)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 249 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint8-array.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 29)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 250 */
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint8-clamped-array.js ***!
  \***********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 29)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),
/* 251 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.int16-array.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 29)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 252 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint16-array.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 29)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 253 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.int32-array.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 29)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 254 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint32-array.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 29)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 255 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.float32-array.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 29)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 256 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.float64-array.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 29)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 257 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.apply.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(/*! ./_export */ 0);
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var rApply = (__webpack_require__(/*! ./_global */ 2).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(/*! ./_fails */ 3)(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),
/* 258 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.construct.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(/*! ./_export */ 0);
var create = __webpack_require__(/*! ./_object-create */ 38);
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var fails = __webpack_require__(/*! ./_fails */ 3);
var bind = __webpack_require__(/*! ./_bind */ 99);
var rConstruct = (__webpack_require__(/*! ./_global */ 2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),
/* 259 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.define-property.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(/*! ./_object-dp */ 7);
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 24);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 260 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.delete-property.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(/*! ./_export */ 0);
var gOPD = __webpack_require__(/*! ./_object-gopd */ 18).f;
var anObject = __webpack_require__(/*! ./_an-object */ 1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),
/* 261 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.enumerate.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__(/*! ./_iter-create */ 80)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),
/* 262 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.get.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(/*! ./_object-gopd */ 18);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19);
var has = __webpack_require__(/*! ./_has */ 13);
var $export = __webpack_require__(/*! ./_export */ 0);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var anObject = __webpack_require__(/*! ./_an-object */ 1);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),
/* 263 */
/*!*********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js ***!
  \*********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(/*! ./_object-gopd */ 18);
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),
/* 264 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.get-prototype-of.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(/*! ./_export */ 0);
var getProto = __webpack_require__(/*! ./_object-gpo */ 19);
var anObject = __webpack_require__(/*! ./_an-object */ 1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),
/* 265 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.has.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),
/* 266 */
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.is-extensible.js ***!
  \*******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),
/* 267 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.own-keys.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(/*! ./_own-keys */ 120) });


/***/ }),
/* 268 */
/*!************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.prevent-extensions.js ***!
  \************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 269 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.set.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(/*! ./_object-dp */ 7);
var gOPD = __webpack_require__(/*! ./_object-gopd */ 18);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19);
var has = __webpack_require__(/*! ./_has */ 13);
var $export = __webpack_require__(/*! ./_export */ 0);
var createDesc = __webpack_require__(/*! ./_property-desc */ 33);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var isObject = __webpack_require__(/*! ./_is-object */ 4);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),
/* 270 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.set-prototype-of.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(/*! ./_export */ 0);
var setProto = __webpack_require__(/*! ./_set-proto */ 72);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 271 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.array.includes.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(/*! ./_export */ 0);
var $includes = __webpack_require__(/*! ./_array-includes */ 54)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ 32)('includes');


/***/ }),
/* 272 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.array.flat-map.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = __webpack_require__(/*! ./_export */ 0);
var flattenIntoArray = __webpack_require__(/*! ./_flatten-into-array */ 121);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var arraySpeciesCreate = __webpack_require__(/*! ./_array-species-create */ 86);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ 32)('flatMap');


/***/ }),
/* 273 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.array.flatten.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = __webpack_require__(/*! ./_export */ 0);
var flattenIntoArray = __webpack_require__(/*! ./_flatten-into-array */ 121);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var toInteger = __webpack_require__(/*! ./_to-integer */ 26);
var arraySpeciesCreate = __webpack_require__(/*! ./_array-species-create */ 86);

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ 32)('flatten');


/***/ }),
/* 274 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.at.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(/*! ./_export */ 0);
var $at = __webpack_require__(/*! ./_string-at */ 78)(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 275 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.pad-start.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(/*! ./_export */ 0);
var $pad = __webpack_require__(/*! ./_string-pad */ 122);

$export($export.P, 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),
/* 276 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.pad-end.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(/*! ./_export */ 0);
var $pad = __webpack_require__(/*! ./_string-pad */ 122);

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),
/* 277 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.trim-left.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(/*! ./_string-trim */ 45)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');


/***/ }),
/* 278 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.trim-right.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(/*! ./_string-trim */ 45)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');


/***/ }),
/* 279 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.match-all.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export = __webpack_require__(/*! ./_export */ 0);
var defined = __webpack_require__(/*! ./_defined */ 25);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var isRegExp = __webpack_require__(/*! ./_is-regexp */ 57);
var getFlags = __webpack_require__(/*! ./_flags */ 59);
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

__webpack_require__(/*! ./_iter-create */ 80)($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});


/***/ }),
/* 280 */
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.symbol.async-iterator.js ***!
  \*******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ 68)('asyncIterator');


/***/ }),
/* 281 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.symbol.observable.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ 68)('observable');


/***/ }),
/* 282 */
/*!*********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.get-own-property-descriptors.js ***!
  \*********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(/*! ./_export */ 0);
var ownKeys = __webpack_require__(/*! ./_own-keys */ 120);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);
var gOPD = __webpack_require__(/*! ./_object-gopd */ 18);
var createProperty = __webpack_require__(/*! ./_create-property */ 84);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),
/* 283 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.values.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ 0);
var $values = __webpack_require__(/*! ./_object-to-array */ 123)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 284 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.entries.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ 0);
var $entries = __webpack_require__(/*! ./_object-to-array */ 123)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 285 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.define-getter.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var $defineProperty = __webpack_require__(/*! ./_object-dp */ 7);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(/*! ./_descriptors */ 6) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 64), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 286 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.define-setter.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var $defineProperty = __webpack_require__(/*! ./_object-dp */ 7);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(/*! ./_descriptors */ 6) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 64), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 287 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.lookup-getter.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 24);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19);
var getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 18).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(/*! ./_descriptors */ 6) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 64), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 288 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.lookup-setter.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 24);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19);
var getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 18).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(/*! ./_descriptors */ 6) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 64), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 289 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.map.to-json.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(/*! ./_collection-to-json */ 124)('Map') });


/***/ }),
/* 290 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.set.to-json.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(/*! ./_collection-to-json */ 124)('Set') });


/***/ }),
/* 291 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es7.map.of.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(/*! ./_set-collection-of */ 65)('Map');


/***/ }),
/* 292 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es7.set.of.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(/*! ./_set-collection-of */ 65)('Set');


/***/ }),
/* 293 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-map.of.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(/*! ./_set-collection-of */ 65)('WeakMap');


/***/ }),
/* 294 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-set.of.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
__webpack_require__(/*! ./_set-collection-of */ 65)('WeakSet');


/***/ }),
/* 295 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es7.map.from.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(/*! ./_set-collection-from */ 66)('Map');


/***/ }),
/* 296 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es7.set.from.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(/*! ./_set-collection-from */ 66)('Set');


/***/ }),
/* 297 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-map.from.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(/*! ./_set-collection-from */ 66)('WeakMap');


/***/ }),
/* 298 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-set.from.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
__webpack_require__(/*! ./_set-collection-from */ 66)('WeakSet');


/***/ }),
/* 299 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es7.global.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.G, { global: __webpack_require__(/*! ./_global */ 2) });


/***/ }),
/* 300 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.system.global.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'System', { global: __webpack_require__(/*! ./_global */ 2) });


/***/ }),
/* 301 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.error.is-error.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(/*! ./_export */ 0);
var cof = __webpack_require__(/*! ./_cof */ 21);

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});


/***/ }),
/* 302 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.clamp.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});


/***/ }),
/* 303 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.deg-per-rad.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });


/***/ }),
/* 304 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.degrees.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});


/***/ }),
/* 305 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.fscale.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);
var scale = __webpack_require__(/*! ./_math-scale */ 126);
var fround = __webpack_require__(/*! ./_math-fround */ 106);

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});


/***/ }),
/* 306 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.iaddh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});


/***/ }),
/* 307 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.isubh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});


/***/ }),
/* 308 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.imulh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});


/***/ }),
/* 309 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.rad-per-deg.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });


/***/ }),
/* 310 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.radians.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});


/***/ }),
/* 311 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.scale.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { scale: __webpack_require__(/*! ./_math-scale */ 126) });


/***/ }),
/* 312 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.umulh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});


/***/ }),
/* 313 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.signbit.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// http://jfbastien.github.io/papers/Math.signbit.html
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });


/***/ }),
/* 314 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.promise.finally.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(/*! ./_export */ 0);
var core = __webpack_require__(/*! ./_core */ 23);
var global = __webpack_require__(/*! ./_global */ 2);
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 61);
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ 113);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 315 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.promise.try.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(/*! ./_export */ 0);
var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ 91);
var perform = __webpack_require__(/*! ./_perform */ 112);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 316 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.define-metadata.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 30);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),
/* 317 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.delete-metadata.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 30);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),
/* 318 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-metadata.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 30);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19);
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 319 */
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-metadata-keys.js ***!
  \***********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(/*! ./es6.set */ 116);
var from = __webpack_require__(/*! ./_array-from-iterable */ 125);
var metadata = __webpack_require__(/*! ./_metadata */ 30);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 320 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-own-metadata.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 30);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 321 */
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-own-metadata-keys.js ***!
  \***************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 30);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 322 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.has-metadata.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 30);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 323 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.has-own-metadata.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 30);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 324 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.metadata.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $metadata = __webpack_require__(/*! ./_metadata */ 30);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),
/* 325 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/es7.asap.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = __webpack_require__(/*! ./_export */ 0);
var microtask = __webpack_require__(/*! ./_microtask */ 90)();
var process = __webpack_require__(/*! ./_global */ 2).process;
var isNode = __webpack_require__(/*! ./_cof */ 21)(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});


/***/ }),
/* 326 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.observable.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export = __webpack_require__(/*! ./_export */ 0);
var global = __webpack_require__(/*! ./_global */ 2);
var core = __webpack_require__(/*! ./_core */ 23);
var microtask = __webpack_require__(/*! ./_microtask */ 90)();
var OBSERVABLE = __webpack_require__(/*! ./_wks */ 5)('observable');
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var anInstance = __webpack_require__(/*! ./_an-instance */ 41);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 43);
var hide = __webpack_require__(/*! ./_hide */ 14);
var forOf = __webpack_require__(/*! ./_for-of */ 42);
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

__webpack_require__(/*! ./_set-species */ 40)('Observable');


/***/ }),
/* 327 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/web.timers.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(/*! ./_global */ 2);
var $export = __webpack_require__(/*! ./_export */ 0);
var navigator = global.navigator;
var slice = [].slice;
var MSIE = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});


/***/ }),
/* 328 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/web.immediate.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $task = __webpack_require__(/*! ./_task */ 89);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),
/* 329 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom.iterable.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(/*! ./es6.array.iterator */ 88);
var getKeys = __webpack_require__(/*! ./_object-keys */ 36);
var redefine = __webpack_require__(/*! ./_redefine */ 15);
var global = __webpack_require__(/*! ./_global */ 2);
var hide = __webpack_require__(/*! ./_hide */ 14);
var Iterators = __webpack_require__(/*! ./_iterators */ 46);
var wks = __webpack_require__(/*! ./_wks */ 5);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 330 */
/*!*********************************************************************************!*\
  !*** ./node_modules/babel-polyfill/node_modules/regenerator-runtime/runtime.js ***!
  \*********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 48)))

/***/ }),
/* 331 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/fn/regexp/escape.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/core.regexp.escape */ 332);
module.exports = __webpack_require__(/*! ../../modules/_core */ 23).RegExp.escape;


/***/ }),
/* 332 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/core.regexp.escape.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(/*! ./_export */ 0);
var $re = __webpack_require__(/*! ./_replacer */ 333)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });


/***/ }),
/* 333 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_replacer.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};


/***/ }),
/* 334 */
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! pixi */ 127);

__webpack_require__(/*! p2 */ 128);

var _phaser = __webpack_require__(/*! phaser */ 10);

var _phaser2 = _interopRequireDefault(_phaser);

var _Boot = __webpack_require__(/*! ./states/Boot */ 339);

var _Boot2 = _interopRequireDefault(_Boot);

var _Splash = __webpack_require__(/*! ./states/Splash */ 340);

var _Splash2 = _interopRequireDefault(_Splash);

var _Menu = __webpack_require__(/*! ./states/Menu */ 341);

var _Menu2 = _interopRequireDefault(_Menu);

var _Game = __webpack_require__(/*! ./states/Game */ 342);

var _Game2 = _interopRequireDefault(_Game);

var _Levels = __webpack_require__(/*! ./states/Levels */ 354);

var _Levels2 = _interopRequireDefault(_Levels);

var _settings = __webpack_require__(/*! ./settings */ 12);

var _config = __webpack_require__(/*! ./config */ 355);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Game = function (_Phaser$Game) {
    _inherits(Game, _Phaser$Game);

    function Game() {
        _classCallCheck(this, Game);

        var docElement = document.documentElement;
        var width = void 0,
            height = void 0;

        // todo добавить проверку соотношений должна быть близка к базовой
        // rate надо просмореть для разных устройств выбрать среднее
        var rateUp = _settings.settings.rate + 0.05;
        var rateDown = _settings.settings.rate - 0.05;
        var curRate = docElement.clientWidth / docElement.clientHeight;
        //console.log('curRate: ', curRate);
        //console.log('rateUp: ', rateUp);
        if (curRate > rateUp) {}
        console.log(docElement.clientWidth, docElement.clientHeight);
        if (docElement.clientWidth > _settings.settings.logicWidth) {
            if (docElement.clientHeight > _settings.settings.logicHeight) {
                //console.log('im in 1 if');
                width = _settings.settings.logicWidth;
                height = _settings.settings.logicHeight;
            } else {
                //console.log('im in 1 else');
                height = docElement.clientHeight;
                width = height * _settings.settings.rate;
            }
        } else if (curRate > rateUp) {
            //console.log('im in curRate > rateUp');
            height = docElement.clientHeight;
            width = height * _settings.settings.rate;
        } else {
            //console.log('im in after curRate > rateUp');
            width = docElement.clientWidth;
            height = docElement.clientHeight > _settings.settings.logicHeight ? _settings.settings.logicHeight : docElement.clientHeight;
        }

        //
        // const width = docElement.clientWidth > settings.logicWidth ? settings.logicWidth : docElement.clientWidth;
        // const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight;


        var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, width, height, _phaser2.default.CANVAS, 'content', null));

        _this.state.add('Boot', _Boot2.default, false);
        _this.state.add('Splash', _Splash2.default, false);
        _this.state.add('Menu', _Menu2.default, false);
        _this.state.add('Game', _Game2.default, false);
        _this.state.add('Levels', _Levels2.default, false);

        // with Cordova with need to wait that the device is ready so we will call the Boot state in another file
        //   if (!window.cordova) {
        _this.state.start('Boot');
        //   }
        return _this;
    }

    return Game;
}(_phaser2.default.Game);

window.game = new Game();
window.Gl = (0, _settings.Global)();

// if (window.cordova) {
//   var app = {
//     initialize: function () {
//       document.addEventListener(
//         'deviceready',
//         this.onDeviceReady.bind(this),
//         false
//       )
//     },
//
//     // deviceready Event Handler
//     //
//     onDeviceReady: function () {
//       this.receivedEvent('deviceready')
//
//       // When the device is ready, start Phaser Boot state.
//       window.game.state.start('Boot')
//     },
//
//     receivedEvent: function (id) {
//       console.log('Received Event: ' + id)
//     }
//   }
//
//   app.initialize()
// }

/***/ }),
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */
/*!****************************!*\
  !*** ./src/states/Boot.js ***!
  \****************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 10);

var _phaser2 = _interopRequireDefault(_phaser);

var _webfontloader = __webpack_require__(/*! webfontloader */ 129);

var _webfontloader2 = _interopRequireDefault(_webfontloader);

var _settings = __webpack_require__(/*! ../settings */ 12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'init',
    value: function init() {
      this.stage.backgroundColor = '#oooooo';
      this.fontsReady = false;
      this.fontsLoaded = this.fontsLoaded.bind(this);
    }
  }, {
    key: 'preload',
    value: function preload() {
      _webfontloader2.default.load({
        google: {
          families: ['Bangers']
        },
        active: this.fontsLoaded
      });

      var text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' });
      text.anchor.setTo(0.5, 0.5);

      this.load.image('loaderBg', './assets/images/loader-bg.png');
      this.load.image('loaderBar', './assets/images/loader-bar.png');
    }
  }, {
    key: 'create',
    value: function create() {
      this.input.maxPointers = 1;
      this.stage.disableVisibilityChange = true;

      if (!this.game.device.desktop && window.innerWidth < _settings.settings.logicWidth) {
        this.scale.forceOrientation(false, true);
        this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
        this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
      }

      //game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
      //game.scale.setMinMax(400, 640, 800, 1280);
      // game.scale.forceLandscape = true;
      game.scale.pageAlignHorizontally = true;

      this.calculateSettings();

      this.scale.refresh();
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.fontsReady) {
        this.state.start('Splash');
      }
    }
  }, {
    key: 'fontsLoaded',
    value: function fontsLoaded() {
      this.fontsReady = true;
    }
  }, {
    key: 'enterIncorrectOrientation',
    value: function enterIncorrectOrientation() {
      document.getElementById('orientation').style.display = 'block';
    }
  }, {
    key: 'leaveIncorrectOrientation',
    value: function leaveIncorrectOrientation() {
      document.getElementById('orientation').style.display = 'none';
    }
  }, {
    key: 'calculateSettings',
    value: function calculateSettings() {
      _settings.settings.scale = game.width / _settings.settings.logicWidth;
      _settings.settings.calcGemSize = Math.floor(_settings.settings.scale * 100);
      _settings.settings.offsetGemsField = _settings.settings.topGame * game.width << 0;
      _settings.settings.calcWidth = game.width;
      _settings.settings.calcHeight = game.height;
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 340 */
/*!******************************!*\
  !*** ./src/states/Splash.js ***!
  \******************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 10);

var _phaser2 = _interopRequireDefault(_phaser);

var _utils = __webpack_require__(/*! ../utils */ 52);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'init',
    value: function init() {}
  }, {
    key: 'preload',
    value: function preload() {
      this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
      this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
      (0, _utils.centerGameObjects)([this.loaderBg, this.loaderBar]);

      this.load.setPreloadSprite(this.loaderBar);
      //
      // load your assets
      //
      game.load.image('starfield', 'assets/images/starfield.jpg');
      this.load.image('smoke', 'assets/images/smokecolors.png');
      this.load.spritesheet('gems', 'assets/images/gems100x100.png', 100, 100, 16);
      this.load.image('field', 'assets/images/field.png');
    }
  }, {
    key: 'create',
    value: function create() {
      // выключим обновление update() при ппотере фокуса
      this.stage.disableVisibilityChange = false;
      this.state.start('Menu');
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 341 */
/*!****************************!*\
  !*** ./src/states/Menu.js ***!
  \****************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 10);

var _phaser2 = _interopRequireDefault(_phaser);

var _utils = __webpack_require__(/*! ../utils */ 52);

var _settings = __webpack_require__(/*! ../settings */ 12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuState = function (_Phaser$State) {
    _inherits(MenuState, _Phaser$State);

    function MenuState() {
        _classCallCheck(this, MenuState);

        return _possibleConstructorReturn(this, (MenuState.__proto__ || Object.getPrototypeOf(MenuState)).call(this));
    }

    _createClass(MenuState, [{
        key: 'init',
        value: function init() {}
    }, {
        key: 'preload',
        value: function preload() {}
    }, {
        key: 'create',
        value: function create() {
            var bannerText = 'Меню';
            var banner = this.add.text(this.world.centerX - 100, 50, bannerText);
            banner.font = 'Bangers';
            banner.padding.set(10, 16);
            banner.fontSize = 40;
            banner.scale.setTo(_settings.settings.scale);
            banner.fill = '#77BFA3';
            banner.smoothed = false;
            banner.setShadow(3, 3, 'rgba(7,7,7,0.5)', 5);

            (0, _utils.addMenuOption)(this.world.centerX - 100, this.world.height / 2 - 200, 'Играть', function () {
                game.state.start('Levels');
            }, _settings.settings.scale);
            (0, _utils.addMenuOption)(this.world.centerX - 100, game.height / 2 - 150, 'Настройки', function () {
                game.state.start('Settings');
            }, _settings.settings.scale);
            (0, _utils.addMenuOption)(this.world.centerX - 100, game.height / 2 - 100, 'Авторы', function () {
                game.state.start('Credits');
            }, _settings.settings.scale);
        }

        /**
         *
         */

    }, {
        key: 'update',
        value: function update() {}
    }, {
        key: 'render',
        value: function render() {
            if (true) {
                //this.game.debug.spriteInfo(this.mushroom, 32, 32)
            }
        }
    }], [{
        key: 'saySomething',
        value: function saySomething() {
            console.log('Это метод MainMenuState');
        }
    }]);

    return MenuState;
}(_phaser2.default.State);

exports.default = MenuState;

/***/ }),
/* 342 */
/*!****************************!*\
  !*** ./src/states/Game.js ***!
  \****************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 10);

var _phaser2 = _interopRequireDefault(_phaser);

var _GameController = __webpack_require__(/*! ../game/GameController */ 343);

var _GameController2 = _interopRequireDefault(_GameController);

var _utils = __webpack_require__(/*! ../utils */ 52);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals __DEV__ */


var _class = function (_Phaser$State) {
    _inherits(_class, _Phaser$State);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
        key: 'init',
        value: function init() {}
    }, {
        key: 'preload',
        value: function preload() {}
    }, {
        key: 'create',
        value: function create() {
            this.bg = game.add.tileSprite(0, 0, 800, 1280, 'starfield');
            this.GC = new _GameController2.default();
            this.GC.create();
        }
    }, {
        key: 'render',
        value: function render() {
            if (true) {
                // this.game.debug.spriteInfo(this.mushroom, 32, 32)
            }
        }
    }, {
        key: 'update',
        value: function update() {
            this.GC.update();
        }
    }, {
        key: 'createTestText',
        value: function createTestText() {
            var bannerText = 'Игровой экран';
            var banner = this.add.text(this.world.centerX, 50, bannerText);
            banner.font = 'Bangers';
            banner.padding.set(10, 16);
            banner.fontSize = 40;
            banner.fill = '#77BFA3';
            banner.smoothed = false;
            banner.anchor.setTo(0.5);

            // this.game.add.existing(this.mushroom);
            (0, _utils.addMenuOption)(400, 360, 'Выбрать уровень', function () {
                game.state.start('Levels');
            });
        }
    }]);

    return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 343 */
/*!************************************!*\
  !*** ./src/game/GameController.js ***!
  \************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by ss on 27.11.2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _GemsController = __webpack_require__(/*! ./gems/GemsController */ 344);

var _GemsController2 = _interopRequireDefault(_GemsController);

var _UserActions = __webpack_require__(/*! ./UserActions */ 350);

var _UserActions2 = _interopRequireDefault(_UserActions);

var _Progress = __webpack_require__(/*! ./Progress */ 351);

var _Progress2 = _interopRequireDefault(_Progress);

var _BoardController = __webpack_require__(/*! ./board/BoardController */ 352);

var _BoardController2 = _interopRequireDefault(_BoardController);

var _Field = __webpack_require__(/*! ./Field */ 130);

var _Field2 = _interopRequireDefault(_Field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameController = function () {
    function GameController() {
        _classCallCheck(this, GameController);

        this.field = new _Field2.default();
        this.gemsController = new _GemsController2.default(this.field);
        this.userAction = new _UserActions2.default();
        this.progress = new _Progress2.default();
        this.boardController = new _BoardController2.default(this.field);
    }

    _createClass(GameController, [{
        key: 'init',
        value: function init() {}

        /**
         * создаем уровень
         */

    }, {
        key: 'create',
        value: function create() {
            this.gemsController.create();
            this.progress.create();
            this.boardController.create();

            this.userAction.signalToGemController.add(this.gemsController.onSignalFromTraker, this.gemsController);
            this.gemsController.signalToTraker.add(this.userAction.onActionWithGem, this.userAction);

            this.gemsController.signalToProgress.add(this.progress.onSignalFromGemsController, this.progress);

            this.gemsController.signalToBoardController.add(this.boardController.onSignalFromGemsController, this.boardController);

            this.progress.signalToGemsController.add(this.gemsController.onSignalFromProgress, this.gemsController);

            this.boardController.signalToProgress.add(this.progress.onSignalFromBoardController, this.progress);
        }

        /**
         * вызывается для игрового цикла
         */

    }, {
        key: 'update',
        value: function update() {
            this.progress.update();
        }
    }, {
        key: 'render',
        value: function render() {
            console.log('render GameCotroller');
        }
    }]);

    return GameController;
}();

exports.default = GameController;

/***/ }),
/* 344 */
/*!*****************************************!*\
  !*** ./src/game/gems/GemsController.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by ss on 29.11.2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _phaser = __webpack_require__(/*! phaser */ 10);

var _phaser2 = _interopRequireDefault(_phaser);

var _Gem = __webpack_require__(/*! ./Gem */ 345);

var _Gem2 = _interopRequireDefault(_Gem);

var _Stone = __webpack_require__(/*! ./Stone */ 346);

var _Stone2 = _interopRequireDefault(_Stone);

var _Acorn = __webpack_require__(/*! ./Acorn */ 347);

var _Acorn2 = _interopRequireDefault(_Acorn);

var _Ice = __webpack_require__(/*! ./Ice */ 357);

var _Ice2 = _interopRequireDefault(_Ice);

var _processArrayGem = __webpack_require__(/*! ./processArrayGem */ 348);

var _settings = __webpack_require__(/*! ../../settings */ 12);

var _Field = __webpack_require__(/*! ../Field */ 130);

var _Field2 = _interopRequireDefault(_Field);

var _ServiceGem = __webpack_require__(/*! ./ServiceGem */ 349);

var _ServiceGem2 = _interopRequireDefault(_ServiceGem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* Постоянные для схемы уровня*/
// клетка без элемента игры
var EMPTY = 1024;
//гем любого цвета
var GEM = 7;
// камень 0b10000
var STONE = 64;
// доска под гемом 0b100000
var BOARD = 32;
//желудь 0b1000000
var ACORN = 16;
// лед
var ICE = 128;
//клетка не отсящаяся к игровому полю
var NOTFIELD = 512;
//какой нибудь цвет
var COLORGEM = 1016; //11111000
//желудь в цветовом массиве
var COLORACORN = 14;
//камень в ассете
var COLORSTONE = 15;
//доска в ассете
var COLORBOARD = 43;
//color not field temporary
var COLORNOTFIELD = 0;
// особые элементы
var SPECIAL = 1008; // 11 1111 0000
// кадры и таблицы спрайтов
var FRAME = 15; //00001111


var GemsController = function () {
    function GemsController(field) {
        _classCallCheck(this, GemsController);

        this.gemArray = [];
        this.selectedGem = null;

        this.traker;
        this.removeMap = [];
        this.swapEndGem = null;

        this.signalToGem = [];

        /**
         * вспомгательный гем, что бы при отсутсвии последнего гема
         * при обработке массва, который должен отправит сигнал завершения
         * сигнал отправляет сервисный гем.
         */
        this.serviceGem;

        /**
         * сигнал к вспомогательному гему
         * @type {Phaser.Signal}
         */
        this.signalToServiceGem = new _phaser2.default.Signal();

        /**
         * Сигнал к UserAction
         * @type {Phaser.Signal}
         */
        this.signalToTraker = new _phaser2.default.Signal();

        /**
         * Сигнал к Progress класс котрый занимается ослеживанием прохождения уровня
         * очки, и прочие задания которые надо выполнить по ходду игры
         * @type {Phaser.Signal}
         */
        this.signalToProgress = new _phaser2.default.Signal();

        /**
         * сигнал к упраляещему досками
         * @type {Phaser.Signal}
         */
        this.signalToBoardController = new _phaser2.default.Signal();

        /**
         * link to the playing field
         */
        this.field = field;

        /**
         * массив для хранения информации о клетках поля
         * в виде битовых значений
         * @type {Array}
         */
        this.schemeLevel = [];

        /**
         * хранилище для удаленных с поля камней
         * @type {Array}
         */
        this.storageGems = [];

        this.storageStone = [];

        /**
         * Для дополнительного прохода по диагонали
         * @type {Array}
         */
        this.emptyAfterFall = [];

        /**
         * после прохода по диагонали проверяем
         * @type {Array}
         */
        this.emptyAfterFallDiagonally = false;

        /**
         * _state of recognizer
         * @type {number}
         */
        this._state = 0;

        /**
         * {string} name of _state
         * @type {Array}
         */
        this.strState = [];
        this.strState[0] = 'wait';
        this.strState[1] = 'swap';
        this.strState[2] = 'swapEnd1';
        this.strState[4] = 'swapEnd2';

        this.queue = [];

        //this.allowAction = true;
    }

    _createClass(GemsController, [{
        key: 'create',
        value: function create() {

            this.serviceGem = new _ServiceGem2.default();
            this.serviceGem.signalToGemController.add(this.onSignalFromGem, this);
            this.signalToServiceGem.add(this.serviceGem.onSignal, this.serviceGem);

            this.createSchemeLevel();
            this.createLevel();

            //this.traker = new UserActions();

            //this.signalToTraker.add(this.traker.onActionWithGem, this.traker);
            //this.traker.signalToGemController.add(this.onSignalFromTraker, this);
        }

        //

    }, {
        key: 'createSchemeLevel',
        value: function createSchemeLevel() {
            var row = void 0,
                col = void 0;

            for (row = 0; row < _settings.settings.fieldRow; row++) {
                this.schemeLevel[row] = [];
                for (col = 0; col < _settings.settings.fieldCol; col++) {
                    this.schemeLevel[row][col] = EMPTY;
                    if (!(_settings.settings.level[row][col] & COLORGEM)) {
                        this.schemeLevel[row][col] = _settings.settings.level[row][col] & GEM;
                    } else if (_settings.settings.level[row][col] & ICE) {
                        this.schemeLevel[row][col] = _settings.settings.level[row][col] & (GEM | ICE);
                    } else if (_settings.settings.level[row][col] & NOTFIELD) {
                        this.schemeLevel[row][col] = NOTFIELD;
                        //осеиваем высшие биты указывающие на дополнительные параметры
                    } else if ((_settings.settings.level[row][col] & FRAME) == COLORACORN) {
                        this.schemeLevel[row][col] = ACORN;
                    } else if ((_settings.settings.level[row][col] & FRAME) == COLORSTONE) {
                        this.schemeLevel[row][col] = STONE;
                    }
                    //todo скорее всего доски отдельным уровнем и выставлять первыми
                    if ((_settings.settings.level[row][col] & BOARD) == BOARD) {
                        this.schemeLevel[row][col] = this.schemeLevel[row][col] ^ BOARD;
                    }
                }
            }
        }

        /**
         * создание уровня
         */
        // todo при создании уровня надо сразу создвать все камни или
        // todo досоздавть, после этого ставим на поле
        // todo камни должны создавться только по необходимости

    }, {
        key: 'createLevel',
        value: function createLevel() {
            var col = void 0,
                row = void 0;

            //this.gemGroup = game.add.group();
            this.removeMap.length = null;
            for (row = 0; row < _settings.settings.fieldRow; row++) {
                this.removeMap[row] = [];
                for (col = 0; col < _settings.settings.fieldCol; col++) {
                    this.removeMap[row].push(0);
                }
            }

            for (row = 0; row < _settings.settings.fieldRow; row++) {
                this.gemArray[row] = [];
                // несколько лишних объектов в хранилище

                for (col = 0; col < _settings.settings.fieldCol; col++) {
                    //let gem = game.add.sprite(GEMSIZE * col + GEMSIZE / 2, GEMSIZE * row + GEMSIZE / 2, "gems");
                    this.gemArray[row][col] = 0;
                    var gem = new _Gem2.default(game, col, row, "gems");
                    var signalToGem = new _phaser2.default.Signal();
                    signalToGem.add(gem.onSignal, gem);

                    gem.signalToGemController.add(this.onSignalFromGem, this);

                    var gemObject = {
                        gemColor: 0,
                        gemSprite: gem,
                        signalToGem: signalToGem,
                        burden: 0
                    };

                    this.field.layer3.add(gem);
                    // если это не клетка игрового поля
                    if (_settings.settings.level[row][col] & NOTFIELD) {

                        this.storageGems.push(gemObject);
                        gem.visible = false;
                        continue;
                    }
                    if (this.schemeLevel[row][col] & STONE) {
                        this.storageGems.push(gemObject);

                        gem.visible = false;
                        // создаем камень
                        var stone = new _Stone2.default(game, col, row, "gems");
                        var signalToStone = new _phaser2.default.Signal();
                        signalToStone.add(stone.onSignal, stone);

                        stone.signalToGemController.add(this.onSignalFromGem, this);
                        var color = _settings.settings.level[row][col] & FRAME;
                        stone.frame = color;
                        var specialObject = {
                            gemColor: 0,
                            gemSprite: stone,
                            signalToGem: signalToStone,
                            burden: 0
                        };
                        this.field.layer2.add(stone);
                        this.gemArray[row][col] = specialObject;
                        this.gemArray[row][col].gemColor = color;
                        continue;
                    }

                    if (this.schemeLevel[row][col] & ICE) {
                        //this.storageGems.push(gemObject);
                        //gem.visible = false;
                        //debugger;
                        //назначаем времнно спрятанному гему цвет
                        gem.frame = this.schemeLevel[row][col] & GEM;
                        gemObject.gemColor = this.schemeLevel[row][col] & GEM;

                        // создаем лед
                        var ice = new _Ice2.default(game, col, row, "gems", gemObject);
                        var signalToIce = new _phaser2.default.Signal();
                        signalToIce.add(ice.onSignal, ice);

                        ice.signalToGemController.add(this.onSignalFromGem, this);
                        // let color = settings.level[row][col] & GEM;
                        // ice.frame = color;
                        var _specialObject = {
                            gemColor: 0,
                            gemSprite: ice,
                            signalToGem: signalToIce,
                            burden: 0
                        };
                        this.field.layer2.add(ice);
                        this.gemArray[row][col] = _specialObject;
                        this.gemArray[row][col].gemColor = ICE;
                        continue;
                    }

                    // желудь
                    if (this.schemeLevel[row][col] & ACORN) {
                        this.storageGems.push(gemObject);
                        gem.visible = false;
                        // создаем камень
                        var acorn = new _Acorn2.default(game, col, row, "gems");
                        var signalToAcorn = new _phaser2.default.Signal();
                        signalToAcorn.add(acorn.onSignal, acorn);

                        acorn.signalToGemController.add(this.onSignalFromGem, this);
                        var _color = _settings.settings.level[row][col] & FRAME;
                        acorn.frame = _color;
                        var _specialObject2 = {
                            gemColor: 0,
                            gemSprite: acorn,
                            signalToGem: signalToAcorn,
                            burden: 0
                        };
                        this.field.layer3.add(acorn);
                        this.gemArray[row][col] = _specialObject2;
                        this.gemArray[row][col].gemColor = _color;
                        continue;
                    }

                    //установка по уровню
                    if (_settings.settings.level) {
                        var _color2 = _settings.settings.level[row][col] & FRAME;
                        gem.frame = _color2;
                        this.gemArray[row][col] = gemObject;
                        this.gemArray[row][col].gemColor = _color2;
                    } else {
                        do {
                            // перебираем цвета пока isMatch = правда
                            var randomColor = game.rnd.between(1, _settings.settings.color - 1);
                            gem.frame = randomColor;
                            this.gemArray[row][col] = gemObject;
                            this.gemArray[row][col].gemColor = randomColor;
                        } while (this.isMatch(row, col));
                    }
                }
            }
            _processArrayGem.processArray.init(_settings.settings.color, _settings.settings.fieldRow, _settings.settings.fieldCol, this.signalToServiceGem);
            _processArrayGem.processArray.createArrayNumberFromGemArray(this.gemArray);
        }

        /**
         * получает сигнал от UserAction и отправляет его
         * к камню, камень имеет два состояния которые меняются
         * при поступленнии этого сигнала
         * В ответ от камня приходит оповещения в каком он состоянии
         * @param row
         * @param col
         */

    }, {
        key: 'onDown',
        value: function onDown(row, col) {
            var currentGem = this.cellAtField(row, col);
            if (currentGem) {
                this.gemArray[row][col].signalToGem.dispatch('onDown');
            }
            console.log('on down');
        }

        /**
         * handeler signal from gem
         * метод для осуществления вызова методоов при
         * сигнале от камня
         * @param {string} action
         * @param {Gem} gem
         */

    }, {
        key: 'onSignalFromGem',
        value: function onSignalFromGem(action, gem) {
            this[action](gem);
        }

        /**
        * handeler signal from gem
        * метод для осуществления вызова методоов при
        * сигнале от тракера (UserAction)
        * @param {string} action
        * @param {Gem} gem
        */

    }, {
        key: 'onSignalFromTraker',
        value: function onSignalFromTraker(action, row, col) {
            this[action](row, col);
        }
    }, {
        key: 'onSignalFromProgress',
        value: function onSignalFromProgress(action) {
            console.log('gemController ' + action);
        }

        /**
         * sets selectedGem
         * вызывается при сигнале от камня select
         * @param {gem} gem
         */

    }, {
        key: 'select',
        value: function select(currentGem) {
            if (!this.selectedGem) {
                this.selectedGem = currentGem;
                this.signalToTraker.dispatch('onSelectGem');
            } else if (this.standsNext(this.selectedGem, currentGem)) {
                this.swap(this.selectedGem, currentGem);
                this.selectedGem = null;
            } else {
                var row = this.selectedGem.getRow();
                var col = this.selectedGem.getColumn();
                this.gemArray[row][col].signalToGem.dispatch('onSelectNext');
                this.selectedGem = currentGem;
            }
        }

        /**
         * unsets selected gem
         */

    }, {
        key: 'unselect',
        value: function unselect() {
            if (this.selectedGem) {
                this.selectedGem = null;
                this.signalToTraker.dispatch('onUnselectGem');
            }
        }

        /**
         * если складываются условия для обмена
         * оповещаем тракер. оповещаем камни
         * @param {Gem} gems1
         * @param {Gem} gems2
         */

    }, {
        key: 'swap',
        value: function swap(gem1, gem2) {
            this.signalToTraker.dispatch('disableSelection');
            //this.allowAction = false;
            // получили колонки и строки камней
            var gem1Row = gem1.getRow();
            var gem1Col = gem1.getColumn();
            var gem2Row = gem2.getRow();
            var gem2Col = gem2.getColumn();
            // получили ссылки на объекты в массиве
            var objGem1InArray = this.gemArray[gem1Row][gem1Col];
            var objGem2InArray = this.gemArray[gem2Row][gem2Col];

            var tmpRecordShemeLevel = this.schemeLevel[gem1Row][gem1Col];
            //послали уведомление камням об обмене
            objGem1InArray.signalToGem.dispatch('swap', gem2Row, gem2Col);
            objGem2InArray.signalToGem.dispatch('swap', gem1Row, gem1Col);
            // переписали их в массиве
            this.gemArray[gem1Row][gem1Col] = objGem2InArray;
            this.gemArray[gem2Row][gem2Col] = objGem1InArray;

            this.schemeLevel[gem1Row][gem1Col] = this.schemeLevel[gem2Row][gem2Col];
            this.schemeLevel[gem2Row][gem2Col] = tmpRecordShemeLevel;
        }

        /**
         * при направильном обмене
         * возвращаем камни назад
         * @param gem1
         * @param gem2
         */

    }, {
        key: 'swapBack',
        value: function swapBack(gem1, gem2) {
            // получили колонки и строки камней
            var gem1Row = gem1.getRow();
            var gem1Col = gem1.getColumn();
            var gem2Row = gem2.getRow();
            var gem2Col = gem2.getColumn();
            // получили ссылки на объекты в массиве
            var objGem1InArray = this.gemArray[gem1Row][gem1Col];
            var objGem2InArray = this.gemArray[gem2Row][gem2Col];

            var tmpRecordShemeLevel = this.schemeLevel[gem1Row][gem1Col];

            //послали уведомление камням об обмене
            objGem1InArray.signalToGem.dispatch('swapBack', gem2Row, gem2Col);
            objGem2InArray.signalToGem.dispatch('swapBack', gem1Row, gem1Col);
            // переписали их в массиве
            this.gemArray[gem1Row][gem1Col] = objGem2InArray;
            this.gemArray[gem2Row][gem2Col] = objGem1InArray;

            this.schemeLevel[gem1Row][gem1Col] = this.schemeLevel[gem2Row][gem2Col];
            this.schemeLevel[gem2Row][gem2Col] = tmpRecordShemeLevel;

            this.signalToTraker.dispatch('enableSelection');
            // this.allowAction = true;
        }

        /**
         * Получает сначала сигнал от одного камня
         * затем от второго, полсе этого инициирует проверку
         * на совпадения
         * @param {Gem} gem
         */

    }, {
        key: 'swapEnd',
        value: function swapEnd(gem) {
            if (!this.swapEndGem) {
                this.swapEndGem = gem;
            } else if (this.isBinaryMatch()) {
                // todo функцию местой проверки сделать
                this.swapEndGem = null;
                this.handleFields();
            } else {
                this.swapBack(this.swapEndGem, gem);
                this.swapEndGem = null;
            }
        }

        // todo вообще часть элементов расставит остальные приткнуть на свободные места

    }, {
        key: 'vortex',
        value: function vortex() {
            var row = void 0,
                col = void 0;
            var lastGem = void 0;
            this.signalToTraker.dispatch('doVortex');
            //this.gemArray = process.doRandomSwap(this.gemArray, this.schemeLevel);
            _processArrayGem.processArray.doRandomSwap(this.gemArray, this.schemeLevel);
            //debugger;
            for (row = 0; row < _settings.settings.fieldRow; row++) {
                for (col = 0; col < _settings.settings.fieldCol; col++) {
                    if (this.gemArray[row][col] && !(this.schemeLevel[row][col] & (STONE | NOTFIELD | ACORN))) {
                        lastGem = this.gemArray[row][col];
                        lastGem.signalToGem.dispatch('doVortex', row, col);
                    }
                }
            }
            lastGem.signalToGem.dispatch('responseVortexTweenComplete');
        }
    }, {
        key: 'vortexTweenComplete',
        value: function vortexTweenComplete() {
            this.afterChangeOnField();
        }

        /**
         * агрегатор
         */

    }, {
        key: 'handleFields',
        value: function handleFields() {
            this.signalToProgress.dispatch('handleFields');
            this.handleHorizontalMatches();
            this.handleVerticalMatches();
            this.removeItems();
        }

        /**
         * Находим горизонтальные линии
         * и заполение массива removeMap
         */

    }, {
        key: 'handleHorizontalMatches',
        value: function handleHorizontalMatches() {
            var col = void 0,
                row = void 0;
            var LASTCOL = _settings.settings.fieldCol - 1;
            for (row = 0; row < _settings.settings.fieldRow; row++) {
                // цветная линия
                var colorLine = 1;
                //текущий цвет
                var currentColor = -1;
                //начало линии
                var startLine = 0;
                for (col = 0; col < _settings.settings.fieldCol; col++) {

                    var currentGem = this.gemArray[row][col];
                    // если цвет камня равен текущему цвету
                    if (currentGem && currentGem.gemColor == currentColor) {
                        colorLine++;
                    }
                    if (col == LASTCOL || !currentGem || currentGem.gemColor != currentColor || this.schemeLevel[row][col] & (STONE | NOTFIELD | EMPTY | ACORN)) {
                        if (colorLine >= 3) {
                            switch (colorLine) {
                                case 4:
                                    this.signalToProgress.dispatch('four', row, startLine);
                                    break;
                                case 5:
                                    this.signalToProgress.dispatch('five', row, startLine);
                                    break;
                                default:
                                    break;
                            }
                            for (var k = 0; k < colorLine; k++) {
                                this.removeMap[row][startLine + k] = 1;
                            }
                        }
                        startLine = col;
                        colorLine = 1;
                        // todo добавлять доп элементы
                        if (this.schemeLevel[row][col] & (STONE | NOTFIELD | EMPTY | ACORN)) {
                            currentColor = -1;
                        } else if (currentGem) {
                            currentColor = currentGem.gemColor;
                        }
                    }
                }
            }
        }

        /**
         * Находим вертикальные линии
         * и заполение массива removeMap
         */

    }, {
        key: 'handleVerticalMatches',
        value: function handleVerticalMatches() {
            var col = void 0,
                row = void 0,
                k = void 0;
            var LASTROW = _settings.settings.fieldRow - 1;
            for (col = 0; col < _settings.settings.fieldCol; col++) {
                // цветная линия
                var colorLine = 1;
                //текущий цвет
                var currentColor = -1;
                //начало линии
                var startLine = 0;
                for (row = 0; row < _settings.settings.fieldRow; row++) {
                    var currentGem = this.gemArray[row][col];
                    // если цвет камня равен текущему цвету
                    //todo здесь можно немного улучшить код сократить условия
                    if (currentGem && currentGem.gemColor == currentColor) {
                        colorLine++;
                    }
                    if (row == LASTROW || !currentGem || currentGem.gemColor != currentColor || this.schemeLevel[row][col] & (STONE | NOTFIELD | EMPTY | ACORN)) {
                        if (colorLine >= 3) {
                            switch (colorLine) {
                                case 4:
                                    this.signalToProgress.dispatch('four', startLine, col);
                                    break;
                                case 5:
                                    this.signalToProgress.dispatch('five', startLine, col);
                                    break;
                                default:
                                    break;
                            }
                            for (k = 0; k < colorLine; k++) {
                                this.removeMap[startLine + k][col] = 1;
                            }
                        }
                        startLine = row;
                        colorLine = 1;
                        if (this.schemeLevel[row][col] & (STONE | NOTFIELD | EMPTY | ACORN)) {
                            currentColor = -1;
                        } else if (currentGem) {
                            currentColor = currentGem.gemColor;
                        }
                    }
                }
            }
        }

        /**
         * удаление камней по карте
         */

    }, {
        key: 'removeItems',
        value: function removeItems() {
            //todo при проходе в цикле проверим есть под удаляеммыми гемами доска
            _processArrayGem.processArray.processingSpecialItems(this.gemArray, this.removeMap, this.schemeLevel);
            this.signalToBoardController.dispatch('removeGems', this.removeMap);

            var row = void 0,
                col = void 0;
            var lastGem = 0;

            for (row = 0; row < _settings.settings.fieldRow; row++) {
                for (col = 0; col < _settings.settings.fieldCol; col++) {
                    if (this.removeMap[row][col]) {
                        // последний камень нужен что бы дать команду на отправку
                        // сигнала окончания анимации
                        if (this.gemArray[row][col]) {}
                        lastGem = this.gemArray[row][col];
                        //todo проверять обременения и в завсимости от этого пихать в хранилеще
                        if (!lastGem) {
                            debugger;
                        }
                        this.storageGems.push(lastGem);
                        if (lastGem) {
                            lastGem.signalToGem.dispatch('remove');
                        }
                        //todo в условии надо разделить удаляем элемент или снимаем обременение
                        this.signalToProgress.dispatch('remove', this.gemArray[row][col].gemColor, this.gemArray[row][col].burden);
                        this.removeMap[row][col] = 0;
                        this.gemArray[row][col] = 0;

                        ///////////////////////////////
                        this.schemeLevel[row][col] = EMPTY;
                    }
                }
            }
            //this.signalToProgress.dispatch('score');
            if (lastGem) {
                lastGem.signalToGem.dispatch('responseRemoveTweenComplete');
            }
        }

        // removeAcorn(){
        //
        // }

        /**
         * сигнал от последнег камня об окнчании анимации удаления
         */

    }, {
        key: 'removeTweenComplete',
        value: function removeTweenComplete() {
            /*if(have bonus){
              }*/
            //this.gemsFall();
            if (this.queue.length && this.queue[this.queue.length - 1] == 'acornReachBorder') {
                this.acornReachBorder();
            }
            _processArrayGem.processArray.gemsFall(this.gemArray, this.schemeLevel, this.storageGems, this.emptyAfterFall);
        }

        /**
         * обработка при достижении желудем нижней границы
         */

    }, {
        key: 'acornReachBorder',
        value: function acornReachBorder() {
            this.signalToProgress.dispatch('acornReachBorder');
        }

        // addToQueue(action){
        //     this.queue.unshift(action);
        // }

        /**
         * добавляет на поле бонус (бомбу) вертикальную, горизонтальноую и просто
         * todo должен создать новый объект или получит из хранилища если есть
         */

    }, {
        key: 'addBonus',
        value: function addBonus() {}

        /**
         * не совсем коректное название, так как метод назодит
         * дырки и элемент который должен заполнить его.
         * Так же если его нет на поле он берется из хранилища камней
         * только после этого камням раздается сигнал на падение
         */

    }, {
        key: 'gemsFall',
        value: function gemsFall() {
            var row = 0;
            var col = 0;
            var tmpRow = 0;
            var tmpArrayForFallGem = [];
            var lastGem = void 0;
            for (row = _settings.settings.fieldRow - 1; row >= 0; row--) {
                for (col = 0; col < _settings.settings.fieldCol; col++) {
                    if (!this.gemArray[row][col]) {
                        tmpRow = row - 1;
                        // если вышли за верхнюю границу извлекаем камень из хранилища
                        if (tmpRow == -1) {
                            var gem = this.storageGems.pop();
                            var randomColor = game.rnd.between(0, _settings.settings.color - 1);
                            gem.gemSprite.frame = randomColor;
                            gem.gemSprite.setPosition(-1, col);
                            gem.gemColor = randomColor;
                            this.gemArray[row][col] = gem;
                        } else {
                            // пока клетка пустая и временная строка Ю 0 умееньшаем
                            while (this.gemArray[tmpRow][col] == 0 && tmpRow > 0) {
                                tmpRow--;
                            }
                            //когда попали на каемнь переписываем его поизицию
                            if (this.gemArray[tmpRow][col]) {
                                this.gemArray[row][col] = this.gemArray[tmpRow][col];
                                this.gemArray[tmpRow][col] = 0;
                            } else {
                                var _gem = this.storageGems.pop();
                                var _randomColor = game.rnd.between(0, _settings.settings.color - 1);
                                _gem.gemSprite.frame = _randomColor;
                                _gem.gemSprite.setPosition(-1, col);
                                _gem.gemColor = _randomColor;
                                this.gemArray[row][col] = _gem;
                            }
                        }
                        //шлем камню сообщение об изменнии позиции
                        this.gemArray[row][col].signalToGem.dispatch('fall', row, col);
                        lastGem = this.gemArray[row][col];
                    }
                }
            }
            // шлем последднему камню задание что бы он оповестил после окончания анимации
            lastGem.signalToGem.dispatch('responseFallTweenComplete');
        }

        /**
         * действие по окнчанию падения
         * вызывается проверка на совпадение
         * и если нет сигнал трекеру включить выбор камней
         */

    }, {
        key: 'fallTweenComplete',
        value: function fallTweenComplete() {
            this.afterChangeOnField();
        }

        /**
         * вызывается после окончния анимации после смены позиций камней
         */

    }, {
        key: 'afterChangeOnField',
        value: function afterChangeOnField() {
            _processArrayGem.processArray.createArrayNumberFromGemArray(this.gemArray);
            //если пусто полсе падения то вызовем диагонально пермещение
            if (this.emptyAfterFall.length) {
                this.emptyAfterFallDiagonally = _processArrayGem.processArray.fallDiagonally(this.gemArray, this.schemeLevel, this.emptyAfterFall);
                //если пусто после перемещешия по диагонали то запускаем прямое падение
            } else if (this.emptyAfterFallDiagonally) {
                this.emptyAfterFallDiagonally = false;
                _processArrayGem.processArray.gemsFall(this.gemArray, this.schemeLevel, this.storageGems, this.emptyAfterFall);
                // если все дыры заполнены то ищем совпадения на поле
            } else if (_processArrayGem.processArray.isMatches()) {
                this.handleFields();
            } else if (_processArrayGem.processArray.checkAcorn(this.gemArray, this.schemeLevel)) {
                _processArrayGem.processArray.gemsFall(this.gemArray, this.schemeLevel, this.storageGems, this.emptyAfterFall);
                //иначе ищем потенциальные комбинации
            } else if (!_processArrayGem.processArray.findAllPotentialMatches()) {
                this.vortex();
            } else {
                // если они есть разрешаем выбор и ждем действий пользователя
                this.signalToProgress.dispatch('end');
                this.signalToTraker.dispatch('enableSelection');
            }
        }

        /**
         * запуск бинарного сравнения
         */

    }, {
        key: 'fireBinaryMatch',
        value: function fireBinaryMatch() {
            _processArrayGem.processArray.createArrayNumberFromGemArray(this.gemArray);
            return _processArrayGem.processArray.findAllPotentialMatches(this.gemArray);
        }
    }, {
        key: 'isBinaryMatch',
        value: function isBinaryMatch() {
            _processArrayGem.processArray.createArrayNumberFromGemArray(this.gemArray);
            return _processArrayGem.processArray.isMatches();
        }

        /**
         * показать подсказки
         * todo в процессе разработки
         * @returns {boolean}
         */

    }, {
        key: 'showTip',
        value: function showTip() {
            var count = this.fireBinaryMatch();

            var randomNumber = game.rnd.between(0, count - 1);
            var result = _processArrayGem.processArray.extractGemsForTip(this.gemArray, randomNumber);
            var last = 0;
            if (result) {
                while (result.length) {
                    last = result.pop();
                    last.signalToGem.dispatch('showTip');
                }
            }
            last.signalToGem.dispatch('responseShowTipTweenComplete');
        }
    }, {
        key: 'showTipTweenComplete',
        value: function showTipTweenComplete() {
            this.signalToTraker.dispatch('endTip');
        }

        /**
         * сравнение совпадений на доске
         * todo скорее всего больше не нужен будет замене на более быстрый бинарный метод
         * todo но находит существующие совпадение а не потенциальны, мой конечно будет быстрее, но
         * todo может хрен с ним.
         * @returns {boolean}
         */

    }, {
        key: 'matchInBoard',
        value: function matchInBoard() {
            for (var row = 0; row < _settings.settings.fieldRow; row++) {
                for (var col = 0; col < _settings.settings.fieldCol; col++) {
                    if (this.isMatch(row, col)) {
                        return true;
                    }
                }
            }
            return false;
        }

        //если есть совпадения по горизонтали или вертикали то true

    }, {
        key: 'isMatch',
        value: function isMatch(row, col) {
            return this.isHorizontalMatch(row, col) || this.isVerticalMatch(row, col);
        }

        // если нет совпадений слева два раза подряд правда

    }, {
        key: 'isHorizontalMatch',
        value: function isHorizontalMatch(row, col) {
            return this.cellAtField(row, col).gemColor == this.cellAtField(row, col - 1).gemColor && this.cellAtField(row, col).gemColor == this.cellAtField(row, col - 2).gemColor;
        }

        // еслм нет совпадений сверху два раза подряд

    }, {
        key: 'isVerticalMatch',
        value: function isVerticalMatch(row, col) {
            return this.cellAtField(row, col).gemColor == this.cellAtField(row - 1, col).gemColor && this.cellAtField(row, col).gemColor == this.cellAtField(row - 2, col).gemColor;
        }

        // если проверяемая клетка не выходит за пределы поля

    }, {
        key: 'cellAtField',
        value: function cellAtField(row, col) {
            if (row < 0 || row >= _settings.settings.fieldRow || col < 0 || col >= _settings.settings.fieldCol || this.schemeLevel[row][col] & (EMPTY | STONE | NOTFIELD | ICE)) {
                return 0;
            }
            return this.gemArray[row][col];
        }
        /* конец блока создания уровня*/
        /**
         *
         * @param {Gem} gem1
         * @param {Gem} gem2
         * @returns {boolean}
         */

    }, {
        key: 'standsNext',
        value: function standsNext(gem1, gem2) {
            return Math.abs(gem1.getRow() - gem2.getRow()) + Math.abs(gem1.getColumn() - gem2.getColumn()) == 1;
        }
    }]);

    return GemsController;
}();

exports.default = GemsController;

/***/ }),
/* 345 */
/*!******************************!*\
  !*** ./src/game/gems/Gem.js ***!
  \******************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 10);

var _phaser2 = _interopRequireDefault(_phaser);

var _settings = __webpack_require__(/*! ../../settings */ 12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ss on 29.11.2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var SCALE = 0.8;
var SELECTEDSCALE = 0.6;
var STEP = 1;
var INITIALSTATE = 0;

/**
 * class Gem describes gem(stones)
 * todo надо создать базовый класс возможно, посмотри по итогам или возможно рсширять этот.
 */

var Gem = function (_Phaser$Sprite) {
    _inherits(Gem, _Phaser$Sprite);

    function Gem(game, col, row, assets) {
        _classCallCheck(this, Gem);

        var _this = _possibleConstructorReturn(this, (Gem.__proto__ || Object.getPrototypeOf(Gem)).call(this, game, col * _settings.settings.calcGemSize, row * _settings.settings.calcGemSize, assets));

        _this.scale.setTo(_settings.settings.scale);
        //this.anchor.setTo(0.5);
        /**
         * _state of recognizer
         * @type {number}
         */
        _this._state = 0;

        /**
         * {string} name of _state
         * @type {Array}
         */
        _this.strState = [];
        _this.strState[0] = 'wait';
        _this.strState[1] = 'select';
        _this.strState[2] = 'unselect';
        _this.strState[3] = 'swapBack';
        _this.strState[4] = 'unselect';

        /**
         * показ рамки при выборе элемента
         */
        _this._focus = new _phaser2.default.Sprite(game, 0, 0, 'gems', 9);
        _this.addChild(_this._focus);
        _this._focus.visible = false;

        /**
         * сигнал к GemController
         * @type {Phaser.Signal}
         */
        _this.signalToGemController = new _phaser2.default.Signal();

        /**
         * координаты камня строка колонка
         * @type {{row: *, col: *}}
         * @private
         */
        _this._position = {
            row: row,
            col: col
        };

        _this._gem = null;

        _this.burden = 'none';
        return _this;
    }

    _createClass(Gem, [{
        key: 'createIce',
        value: function createIce() {
            this._gem = new _phaser2.default.Sprite(game, 0, 0, 'gems', 7);
            var scale = this.scale += 0.1;
            this._gem.scale.setTo(scale);
            this._gem.alpha = 0.5;
            this.addChild(this._gem);
            this.burden = 'ice';
        }

        /**
         * при выборе элемента по сигналу от контроллера onDown
         * через смену состяний
         */

    }, {
        key: 'select',
        value: function select() {
            this._state = this._state + STEP;
            //this.scale.setTo(SELECTEDSCALE);
            game.world.bringToTop(this);
            this._focus.visible = true;
            this.signalToGemController.dispatch('select', this);
        }

        /**
         * при выборе элемента по сигналу от контроллера onDown
         */

    }, {
        key: 'unselect',
        value: function unselect() {
            this._focus.visible = false;
            this._state = this._state & INITIALSTATE;
            this.signalToGemController.dispatch('unselect', this);
        }
    }, {
        key: 'toInitial',
        value: function toInitial() {}

        /**
         * вызывается на все сигналы от котроллера
         * signalToGem.add(gem.onSignal, gem);
         * @param {string} action this action must be run
         * @param row
         * @param col
         */

    }, {
        key: 'onSignal',
        value: function onSignal(action, row, col) {
            this[action](row, col);
        }
    }, {
        key: 'onDown',
        value: function onDown() {
            this[this.strState[this._state + 1]]();
        }

        /**
         * если выбран другой
         */

    }, {
        key: 'onSelectNext',
        value: function onSelectNext() {
            this._state = this._state & INITIALSTATE;
            this._focus.visible = false;
        }

        /**
         * fire animation swap of gem and set new position
         * @param row
         * @param col
         */

    }, {
        key: 'swap',
        value: function swap(row, col) {
            this._state = this._state + 1;
            this._focus.visible = false;
            this.tween = game.add.tween(this).to({ x: col * _settings.settings.calcGemSize, y: row * _settings.settings.calcGemSize }, 250, _phaser2.default.Easing.Linear.None, true);
            this.tween.onComplete.addOnce(this.onSwapTweenComplete, this);
            this.setRow(row);
            this.setColumn(col);
            this._state = this._state & INITIALSTATE;
        }

        /**
         * сигнал контроллеру по завершения обмена
         */

    }, {
        key: 'onSwapTweenComplete',
        value: function onSwapTweenComplete() {
            this.signalToGemController.dispatch('swapEnd', this);
        }

        /**
         * swap back
         * @param row
         * @param col
         */

    }, {
        key: 'swapBack',
        value: function swapBack(row, col) {
            this.tween = game.add.tween(this).to({ x: col * _settings.settings.calcGemSize, y: row * _settings.settings.calcGemSize }, 250, _phaser2.default.Easing.Linear.None, true);
            this.setRow(row);
            this.setColumn(col);
        }

        /**
         * animation after remove the gem
         */

    }, {
        key: 'remove',
        value: function remove() {
            if (this.burden != 'none') {
                switch (this.burden) {
                    case 'ice':
                        this.removeIce();
                        break;
                    case 'web':
                        this.removeWeb();
                        break;
                }
            } else {
                this.tween = game.add.tween(this).to({ alpha: 0 }, Gl.tuneRemove.duration, _phaser2.default.Easing.Linear.None, true);
                this.visible = false;
            }
        }
    }, {
        key: 'removeIce',
        value: function removeIce() {
            console.log('removeIce');
        }
    }, {
        key: 'removeWeb',
        value: function removeWeb() {
            console.log('remove web');
        }

        /**
         * ответ подписывается только последний из камней
         */

    }, {
        key: 'responseRemoveTweenComplete',
        value: function responseRemoveTweenComplete() {
            this.tween.onComplete.addOnce(this.onRemoveTweenComplete, this);
        }

        /**
         * сигнал контроллеру по завершения удаления
         */

    }, {
        key: 'onRemoveTweenComplete',
        value: function onRemoveTweenComplete() {
            this.signalToGemController.dispatch('removeTweenComplete');
        }

        /**
         * animation in duration fall the gem
         * @param row
         * @param col
         */

    }, {
        key: 'fall',
        value: function fall(row, col) {
            this.x = this.getColumn() * _settings.settings.calcGemSize;
            this.y = this.getRow() * _settings.settings.calcGemSize;
            this.alpha = 1;
            this.visible = true;
            this.setPosition(row, col);
            this.tween = game.add.tween(this).to({ x: col * _settings.settings.calcGemSize, y: row * _settings.settings.calcGemSize }, Gl.tuneFall.duration, _phaser2.default.Easing.Linear.None, true);
        }

        /**
         * ответ подписывается только последний из камней
         */

    }, {
        key: 'responseFallTweenComplete',
        value: function responseFallTweenComplete() {
            this.tween.onComplete.addOnce(this.onFallTweenComplete, this);
        }

        /**
         * сигнал контроллеру по завершения падения
         */

    }, {
        key: 'onFallTweenComplete',
        value: function onFallTweenComplete() {
            this.signalToGemController.dispatch('fallTweenComplete');
        }

        /**
         * show animation - quake for tip
         */

    }, {
        key: 'showTip',
        value: function showTip() {
            var prop = { x: this.x + 5 };
            this.tween = game.add.tween(this).to(prop, Gl.tuneTip.duration, _phaser2.default.Easing.Bounce.InOut, true, 0, Gl.tuneTip.repeat, true);
        }
    }, {
        key: 'responseShowTipTweenComplete',
        value: function responseShowTipTweenComplete() {
            this.tween.onComplete.addOnce(this.onShowTipTweenComplete, this);
        }
    }, {
        key: 'onShowTipTweenComplete',
        value: function onShowTipTweenComplete() {
            this.signalToGemController.dispatch('showTipTweenComplete');
        }
    }, {
        key: 'doVortex',
        value: function doVortex(row, col) {
            this.unselect();
            var x = _settings.settings.calcWidth / 2;
            var y = _settings.settings.calcWidth / 2;
            var delay = game.rnd.between(0, 200);
            this.tween = game.add.tween(this).to({ x: [x, col * _settings.settings.calcGemSize],
                y: [y, row * _settings.settings.calcGemSize] }, 1500, _phaser2.default.Easing.Linear.In, true, delay, 0);
            game.add.tween(this).to({ angle: 720 }, 2000, _phaser2.default.Easing.Cubic.InOut, true, 0, 0);
            this.setPosition(row, col);
        }
    }, {
        key: 'responseVortexTweenComplete',
        value: function responseVortexTweenComplete() {
            this.tween.onComplete.addOnce(this.onVortexTweenComplete, this);
        }
    }, {
        key: 'onVortexTweenComplete',
        value: function onVortexTweenComplete() {
            this.signalToGemController.dispatch('vortexTweenComplete');
        }
    }, {
        key: 'getRow',
        value: function getRow() {
            return this._position.row;
        }
    }, {
        key: 'getColumn',
        value: function getColumn() {
            return this._position.col;
        }
    }, {
        key: 'setRow',
        value: function setRow(row) {
            this._position.row = row;
        }
    }, {
        key: 'setColumn',
        value: function setColumn(col) {
            this._position.col = col;
        }
    }, {
        key: 'setPosition',
        value: function setPosition(row, col) {
            this.setRow(row);
            this.setColumn(col);
        }
    }]);

    return Gem;
}(_phaser2.default.Sprite);

exports.default = Gem;

/***/ }),
/* 346 */
/*!********************************!*\
  !*** ./src/game/gems/Stone.js ***!
  \********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 10);

var _phaser2 = _interopRequireDefault(_phaser);

var _settings = __webpack_require__(/*! ../../settings */ 12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ss on 20.12.2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Created by ss on 29.11.2017.
 */


var SCALE = 0.8;
var SELECTEDSCALE = 0.6;
var STEP = 1;
var INITIALSTATE = 0;

/**
 * class Gem describes gem(stones)
 * todo надо создать базовый класс возможно, посмотри по итогам или возможно рсширять этот.
 */

var Stone = function (_Phaser$Sprite) {
    _inherits(Stone, _Phaser$Sprite);

    function Stone(game, col, row, assets) {
        _classCallCheck(this, Stone);

        var _this = _possibleConstructorReturn(this, (Stone.__proto__ || Object.getPrototypeOf(Stone)).call(this, game, col * _settings.settings.calcGemSize, row * _settings.settings.calcGemSize, assets));

        _this.scale.setTo(_settings.settings.scale);
        //this.anchor.setTo(0.5);

        /**
         * сигнал к GemController
         * @type {Phaser.Signal}
         */
        _this.signalToGemController = new _phaser2.default.Signal();

        /**
         * координаты камня строка колонка
         * @type {{row: *, col: *}}
         * @private
         */
        _this._position = {
            row: row,
            col: col
        };
        return _this;
    }

    /**
     * вызывается на все сигналы от котроллера
     * signalToGem.add(gem.onSignal, gem);
     * @param {string} action this action must be run
     * @param row
     * @param col
     */


    _createClass(Stone, [{
        key: 'onSignal',
        value: function onSignal(action, row, col) {
            this[action](row, col);
        }

        /**
         * animation after remove the gem
         */

    }, {
        key: 'remove',
        value: function remove() {
            console.log('stone remove');
            this.tween = game.add.tween(this).to({ alpha: 0 }, Gl.tuneRemove.duration, _phaser2.default.Easing.Linear.None, true);
            this.visible = false;
        }

        /**
         * ответ подписывается только последний из камней
         */

    }, {
        key: 'responseRemoveTweenComplete',
        value: function responseRemoveTweenComplete() {
            this.tween.onComplete.addOnce(this.onRemoveTweenComplete, this);
        }

        /**
         * сигнал контроллеру по завершения удаления
         */

    }, {
        key: 'onRemoveTweenComplete',
        value: function onRemoveTweenComplete() {
            this.signalToGemController.dispatch('removeTweenComplete');
        }
    }, {
        key: 'getStatus',
        value: function getStatus() {
            return 'stone';
        }
    }, {
        key: 'getRow',
        value: function getRow() {
            return this._position.row;
        }
    }, {
        key: 'getColumn',
        value: function getColumn() {
            return this._position.col;
        }
    }, {
        key: 'setRow',
        value: function setRow(row) {
            this._position.row = row;
        }
    }, {
        key: 'setColumn',
        value: function setColumn(col) {
            this._position.col = col;
        }
    }, {
        key: 'setPosition',
        value: function setPosition(row, col) {
            this.setRow(row);
            this.setColumn(col);
        }
    }]);

    return Stone;
}(_phaser2.default.Sprite);

exports.default = Stone;

/***/ }),
/* 347 */
/*!********************************!*\
  !*** ./src/game/gems/Acorn.js ***!
  \********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 10);

var _phaser2 = _interopRequireDefault(_phaser);

var _settings = __webpack_require__(/*! ../../settings */ 12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ss on 29.11.2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var STEP = 1;
var INITIALSTATE = 0;

/**
 * class Gem describes gem(stones)
 * todo надо создать базовый класс возможно, посмотри по итогам или возможно рсширять этот.
 */

var Acorn = function (_Phaser$Sprite) {
    _inherits(Acorn, _Phaser$Sprite);

    function Acorn(game, col, row, assets) {
        _classCallCheck(this, Acorn);

        var _this = _possibleConstructorReturn(this, (Acorn.__proto__ || Object.getPrototypeOf(Acorn)).call(this, game, col * _settings.settings.calcGemSize, row * _settings.settings.calcGemSize, assets));

        _this.scale.setTo(_settings.settings.scale);

        /**
         * _state of recognizer
         * @type {number}
         */
        _this._state = 0;

        /**
         * {string} name of _state
         * @type {Array}
         */
        _this.strState = [];
        _this.strState[0] = 'wait';
        _this.strState[1] = 'select';
        _this.strState[2] = 'unselect';
        _this.strState[3] = 'swapBack';
        _this.strState[4] = 'unselect';

        /**
         * показ рамки при выборе элемента
         */
        _this._focus = new _phaser2.default.Sprite(game, 0, 0, 'gems', 9);
        _this.addChild(_this._focus);
        _this._focus.visible = false;

        /**
         * сигнал к GemController
         * @type {Phaser.Signal}
         */
        _this.signalToGemController = new _phaser2.default.Signal();

        /**
         * координаты камня строка колонка
         * @type {{row: *, col: *}}
         * @private
         */
        _this._position = {
            row: row,
            col: col
        };

        _this.timerId = 0;
        return _this;
    }

    /**
     * при выборе элемента по сигналу от контроллера onDown
     * через смену состяний
     */


    _createClass(Acorn, [{
        key: 'select',
        value: function select() {
            this._state = this._state + STEP;
            //this.scale.setTo(SELECTEDSCALE);
            game.world.bringToTop(this);
            this._focus.visible = true;
            this.signalToGemController.dispatch('select', this);
        }

        /**
         * при выборе элемента по сигналу от контроллера onDown
         */

    }, {
        key: 'unselect',
        value: function unselect() {
            this._focus.visible = false;
            this._state = this._state & INITIALSTATE;
            this.signalToGemController.dispatch('unselect', this);
        }

        /**
         * вызывается на все сигналы от котроллера
         * signalToGem.add(gem.onSignal, gem);
         * @param {string} action this action must be run
         * @param row
         * @param col
         */

    }, {
        key: 'onSignal',
        value: function onSignal(action, row, col) {
            this[action](row, col);
        }

        /**
         * при получениии сиганала нажатия
         */

    }, {
        key: 'onDown',
        value: function onDown() {
            this[this.strState[this._state + 1]]();
        }

        /**
         * если выбран другой
         */

    }, {
        key: 'onSelectNext',
        value: function onSelectNext() {
            this._state = this._state & INITIALSTATE;
            this._focus.visible = false;
        }

        /**
         * fire animation swap of gem and set new position
         * @param row
         * @param col
         */

    }, {
        key: 'swap',
        value: function swap(row, col) {
            this._state = this._state + 1;
            this._focus.visible = false;
            this.tween = game.add.tween(this).to({ x: col * _settings.settings.calcGemSize, y: row * _settings.settings.calcGemSize }, 250, _phaser2.default.Easing.Linear.None, true);
            this.tween.onComplete.addOnce(this.onSwapTweenComplete, this);
            this.setRow(row);
            this.setColumn(col);
            this._state = this._state & INITIALSTATE;
        }

        /**
         * сигнал контроллеру по завершения обмена
         */

    }, {
        key: 'onSwapTweenComplete',
        value: function onSwapTweenComplete() {
            this.signalToGemController.dispatch('swapEnd', this);

            //todo строка 154 нужна эта проверка или нет
            // нужна для выхода из потока тем временем должна быть произведена проверка
            // на совпадения
            //this.timerId = setTimeout(this.checkPosition.bind(this), 1);
        }

        /**
         * swap back
         * @param row
         * @param col
         */

    }, {
        key: 'swapBack',
        value: function swapBack(row, col) {
            this.tween = game.add.tween(this).to({ x: col * _settings.settings.calcGemSize, y: row * _settings.settings.calcGemSize }, 250, _phaser2.default.Easing.Linear.None, true);
            this.setRow(row);
            this.setColumn(col);

            //todo
            //clearTimeout(this.timerId);
        }

        /**
         * animation after remove the gem
         */

    }, {
        key: 'remove',
        value: function remove() {
            // this.tween = game.add.tween(this).to(
            //     {alpha: 0}, Gl.tuneRemove.duration,
            //     Phaser.Easing.Linear.None,
            //     true
            // );
            // this.visible = false;

            this.flyToGoal();
        }
    }, {
        key: 'checkPosition',
        value: function checkPosition() {
            if (this._position.row == _settings.settings.fieldRow - 1) {
                this.signalToGemController.dispatch('acornReachBorder', this);
                this.flyToGoal();
            }
        }

        /**
         * ответ подписывается только последний из камней
         */

    }, {
        key: 'responseRemoveTweenComplete',
        value: function responseRemoveTweenComplete() {
            this.tween.onComplete.addOnce(this.onRemoveTweenComplete, this);
        }

        /**
         * сигнал контроллеру по завершения удаления
         */

    }, {
        key: 'onRemoveTweenComplete',
        value: function onRemoveTweenComplete() {
            this.signalToGemController.dispatch('removeTweenComplete');
        }

        /**
         * animation in duration fall the gem
         * @param row
         * @param col
         */

    }, {
        key: 'fall',
        value: function fall(row, col) {
            this.x = this.getColumn() * _settings.settings.calcGemSize;
            this.y = this.getRow() * _settings.settings.calcGemSize;
            this.alpha = 1;
            this.visible = true;
            this.setPosition(row, col);
            this.tween = game.add.tween(this).to({ x: col * _settings.settings.calcGemSize, y: row * _settings.settings.calcGemSize }, Gl.tuneFall.duration, _phaser2.default.Easing.Linear.None, true);
            // this.tween.onComplete.addOnce(this.checkPosition, this);
        }

        /**
         * ответ на падение вызывается после падения
         */

    }, {
        key: 'responseFallTweenComplete',
        value: function responseFallTweenComplete() {
            this.tween.onComplete.addOnce(this.onFallTweenComplete, this);
        }

        /**
         * сигнал контроллеру по завершения падения
         */

    }, {
        key: 'onFallTweenComplete',
        value: function onFallTweenComplete() {
            this.signalToGemController.dispatch('fallTweenComplete');
        }

        // if(this._position.row == settings.fieldRow - 1){
        //     this.signalToGemController.dispatch('acornReachBorder', this);
        //     this.flyToGoal();
        // }else {

    }, {
        key: 'flyToGoal',
        value: function flyToGoal() {
            this.parent.removeChild(this);
            game.world.addChild(this);
            this.x = this.world.x;
            this.y = this.world.y;
            var goalX = 20;
            var goalY = 10;
            var pathX = [this.x - (this.x - goalX) / 2, goalX, goalX];
            var pathY = [this.y + 2 * _settings.settings.calcGemSize, this.y + _settings.settings.calcGemSize, goalY];

            var t1 = game.add.tween(this).to({
                y: this.y + _settings.settings.calcGemSize
            }, 100, _phaser2.default.Easing.Linear.None, true);

            var scaleTween = game.add.tween(this.scale).to({ x: 0.4, y: 0.4 }, 500, _phaser2.default.Easing.Linear.None, true, 100);

            var t2 = game.add.tween(this).to({
                x: pathX,
                y: pathY
            }, 600);
            t2.interpolation(function (v, k) {
                return _phaser2.default.Math.bezierInterpolation(v, k);
            });

            t1.chain(t2);
            t2.onComplete.addOnce(this.onAfterFlyToGoal, this);
        }
    }, {
        key: 'onAfterFlyToGoal',
        value: function onAfterFlyToGoal() {
            this.signalToGemController.dispatch('acornReachBorder');
            this.parent.removeChild(this);
        }
    }, {
        key: 'getRow',
        value: function getRow() {
            return this._position.row;
        }
    }, {
        key: 'getColumn',
        value: function getColumn() {
            return this._position.col;
        }
    }, {
        key: 'setRow',
        value: function setRow(row) {
            this._position.row = row;
        }
    }, {
        key: 'setColumn',
        value: function setColumn(col) {
            this._position.col = col;
        }
    }, {
        key: 'setPosition',
        value: function setPosition(row, col) {
            this.setRow(row);
            this.setColumn(col);
        }
    }]);

    return Acorn;
}(_phaser2.default.Sprite);

exports.default = Acorn;

/***/ }),
/* 348 */
/*!******************************************!*\
  !*** ./src/game/gems/processArrayGem.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.processArray = undefined;

var _settings = __webpack_require__(/*! ../../settings */ 12);

var EMPTY = 1024;
//гем любого цвета
/**
 * Created by ss on 04.12.2017.
 */
var GEM = 7;
// камень 0b10000
var ACORN = 16;
// доска под гемом 0b100000
var BOARD = 32;
//желудь 0b1000000
var STONE = 64;
// лед
var ICE = 128;
//клетка не отсящаяся к игровому полю
var NOTFIELD = 512;
//какой нибудь цвет
var COLORGEM = 1016; //11111000
//желудь в цветовом массиве
var COLORACORN = 14;
//камень в ассете
var COLORSTONE = 15;
//доска в ассете
var COLORBOARD = 43;
//color not field temporary
var COLORNOTFIELD = 0;
// особые элементы
var SPECIAL = 1008; // 11 1111 0000
// кадры и таблицы спрайтов
var FRAME = 15; //00001111

var processArray = {
    serviceGem: 0,
    gemType: 0,
    commonArray: [],
    numberArray: [],
    potentialMatch: [],
    fieldRow: 0,
    fieldCol: 0,
    horizontal3: 32,
    horizontal4: 64,
    vertical3: 128,
    vertical4: 256,

    init: function init(gemType, fieldRow, fieldCol, signalToServiceGem) {
        this.signalToServiceGem = signalToServiceGem;
        this.gemType = gemType;
        this.fieldRow = fieldRow;
        this.fieldCol = fieldCol;
    },
    /**
     * создание числовых массивов из массива камней
     * Подготовка для поиска потенциальных переходов
     * @param gemArray
     */
    createArrayNumberFromGemArray: function createArrayNumberFromGemArray(gemsArray) {

        var numberArray = [];
        var numberColumn = [];
        var number = 0;

        var color = 0;
        var row = 0;
        var col = 0;

        for (color = 0; color < this.gemType; color++) {
            for (col = 0; col < this.fieldCol; col++) {
                numberColumn[col] = 0;
            }
            numberArray[color] = [];
            for (row = this.fieldRow - 1; row >= 0; row--) {
                number = 0;
                for (col = this.fieldCol - 1; col >= 0; col--) {
                    if (gemsArray[row][col] && gemsArray[row][col].gemColor == color) {
                        number = number + (1 << col);
                        numberColumn[col] = numberColumn[col] + (1 << row);
                    }
                }
                numberArray[color][row] = number;
            }
            numberArray[color] = numberArray[color].concat(numberColumn);
        }
        this.numberArray = numberArray;
    },

    /**
     * нахождние возмжных правильных переходов
     * основано на двоичных числах и масках
     * числа хранятся подряд снасала строки потом колоники
     * первые ячейки массива являются младшими битами
     * соответственно первые ячейки колонок явл младшими битами
     * @param {boolean} find matches for tip or check field on match for
     * @return {boolen}
     */
    findAllPotentialMatches: function findAllPotentialMatches(gemsArray) {

        var count = 0;
        /**
         * набор битовых массивов для сравнений
         * @type {Array}
         */
        var numArray = this.numberArray;

        /**
         * массив потенциальных совпадений
         * @type {Array}
         */
        var potentialMatch = [];

        var len = this.gemType;
        var fieldRow = this.fieldRow;
        var fieldCol = this.fieldCol;

        var MASK3 = 7;
        var MASK2_1 = 11;
        var MASK1_2 = 13;

        var mask3 = 0;
        var mask2_1 = 0;
        var mask1_2 = 0;

        var checkLine = void 0;
        var color = 0;
        var row = 0;
        var shift = 0;
        var tempAr = [];
        for (color = 0; color < len; color++) {
            var ar = numArray[color];
            //проверка строк
            for (row = 0; row < fieldRow; row++) {
                checkLine = row < fieldRow - 1 ? ar[row] | ar[row + 1] : 0;
                for (shift = 0; shift < fieldCol - 2; shift++) {
                    mask3 = MASK3 << shift;
                    mask2_1 = MASK2_1 << shift;
                    mask1_2 = MASK1_2 << shift;

                    if ((checkLine & mask3) == mask3) {
                        count++;
                        potentialMatch.push([row, shift, this.horizontal3, color]);
                    }
                    if ((ar[row] & mask1_2) == mask1_2) {
                        count++;
                        potentialMatch.push([row, shift, this.horizontal4, color]);
                    }
                    if ((ar[row] & mask2_1) == mask2_1) {
                        count++;
                        potentialMatch.push([row, shift, this.horizontal4, color]);
                    }
                }
            }
            //прооверка колонок так как они идут ниже то
            //для получения колонок нужно отнять строки
            var commonRow = fieldRow + fieldCol;
            for (row = fieldRow; row < commonRow; row++) {
                checkLine = row < commonRow - 1 ? ar[row] | ar[row + 1] : 0;

                for (shift = 0; shift < fieldRow - 2; shift++) {
                    mask3 = MASK3 << shift;
                    mask2_1 = MASK2_1 << shift;
                    mask1_2 = MASK1_2 << shift;

                    if ((checkLine & mask3) == mask3) {
                        count++;
                        potentialMatch.push([shift, row - fieldRow, this.vertical3, color]);
                    }
                    if ((ar[row] & mask1_2) == mask1_2) {
                        count++;
                        potentialMatch.push([shift, row - fieldRow, this.vertical4, color]);
                    }
                    if ((ar[row] & mask2_1) == mask2_1) {
                        count++;
                        potentialMatch.push([shift, row - fieldRow, this.vertical4, color]);
                    }
                }
            }
        }
        this.potentialMatch = potentialMatch;
        return count;
    },

    /**
     * extract random gems for tip
     * @param randomNumber
     * @returns {Array}
     */
    extractGemsForTip: function extractGemsForTip(gemsArray, randomNumber) {

        var ar = this.potentialMatch[randomNumber];
        var row = ar[0];
        var col = ar[1];
        var code = ar[2];
        var color = ar[3];
        var partRow = 0;
        var partCol = 0;

        var gemsForTip = [];

        switch (code) {
            case this.horizontal3:
                partCol = col + 3;
                for (col; col < partCol; col++) {
                    if (gemsArray[row][col].gemColor == color) {
                        gemsForTip.push(gemsArray[row][col]);
                    } else if (gemsArray[row + 1][col].gemColor == color) {
                        gemsForTip.push(gemsArray[row + 1][col]);
                    }
                }
                break;
            case this.vertical3:
                partRow = row + 3;
                for (row; row < partRow; row++) {
                    if (gemsArray[row][col].gemColor == color) {
                        gemsForTip.push(gemsArray[row][col]);
                    } else if (gemsArray[row][col + 1].gemColor == color) {
                        gemsForTip.push(gemsArray[row][col + 1]);
                    }
                }
                break;
            case this.horizontal4:
                partCol = col + 4;
                for (col; col < partCol; col++) {
                    if (gemsArray[row][col].gemColor == color) {
                        gemsForTip.push(gemsArray[row][col]);
                    }
                }
                break;
            case this.vertical4:
                partRow = row + 4;
                for (row; row < partRow; row++) {
                    if (gemsArray[row][col].gemColor == color) {
                        gemsForTip.push(gemsArray[row][col]);
                    }
                }
                break;

        }
        return gemsForTip;
    },


    /**
     * find while no match
     * необходимо держать массив this.numberArray в актуальном состоянии
     * @returns {boolean}
     */
    isMatches: function isMatches() {
        var numArray = this.numberArray;
        var len = numArray.length;

        var MASK3 = 7;
        var mask3 = 0;
        var color = 0;

        for (color = 0; color < len; color++) {
            var ar = numArray[color];
            var row = 0;
            var shift = 0;
            //проверка строк
            for (row = 0; row < this.fieldRow; row++) {
                for (shift = 0; shift < this.fieldCol - 2; shift++) {
                    mask3 = MASK3 << shift;
                    if ((ar[row] & mask3) == mask3) {
                        return true;
                    }
                }
            }
            //прооверка колонок
            var commonRow = this.fieldRow + this.fieldCol;
            var col = 0;
            for (col = this.fieldRow; col < commonRow; col++) {
                for (shift = 0; shift < this.fieldRow - 2; shift++) {
                    mask3 = MASK3 << shift;
                    if ((ar[col] & mask3) == mask3) {
                        return true;
                    }
                }
            }
        }
        return false;
    },

    singleGemFall: function singleGemFall(gemArray, schemeLevel, storageGems, emptyAfterFall, row, col) {
        var tmpRow = row;
        if (schemeLevel[row][col] & EMPTY) {
            // пока клетка пустая и временная строка пустая умееньшаем
            do {
                tmpRow--;
            } while (tmpRow >= 0 && schemeLevel[tmpRow][col] == EMPTY);

            // если вышла за пределы поля то
            if (tmpRow == -1) {
                var gem = storageGems.pop();
                var randomColor = game.rnd.between(1, _settings.settings.color - 1);
                if (!gem) {
                    debugger;
                }
                gem.gemSprite.frame = randomColor;
                gem.gemSprite.setPosition(-1, col);
                gem.gemColor = randomColor;

                gemArray[row][col] = gem;
                schemeLevel[row][col] = randomColor;

                gemArray[row][col].signalToGem.dispatch('fall', row, col);
                return gemArray[row][col];
            }

            // если это не поле или это камень  и если поле сразу под непроходимым
            if (schemeLevel[tmpRow][col] & (NOTFIELD | STONE | ICE) && schemeLevel[row - 1][col] & (NOTFIELD | STONE | ICE)) {
                while (schemeLevel[row][col] & EMPTY) {
                    // если у него есть возможность заполнения
                    if (col - 1 >= 0 && schemeLevel[row - 1][col - 1] & (GEM | ACORN | EMPTY) || col + 1 < _settings.settings.fieldCol && schemeLevel[row - 1][col + 1] & (GEM | ACORN | EMPTY)) {
                        emptyAfterFall.push([row, col]);
                        break;
                    }
                    row++;
                }

                return false;
            }

            //если это гем или желудь то перемещаем его
            if (schemeLevel[tmpRow][col] & (GEM | ACORN)) {
                gemArray[row][col] = gemArray[tmpRow][col];
                schemeLevel[row][col] = schemeLevel[tmpRow][col];
                gemArray[tmpRow][col] = 0;
                schemeLevel[tmpRow][col] = EMPTY;

                gemArray[row][col].signalToGem.dispatch('fall', row, col);
                return gemArray[row][col];
            }

            // если она в крайнем ряду и пустая то
            if (schemeLevel[tmpRow][col] & EMPTY) {
                var _gem = storageGems.pop();
                var _randomColor = game.rnd.between(1, _settings.settings.color - 1);

                _gem.gemSprite.frame = _randomColor;
                _gem.gemSprite.setPosition(-1, col);
                _gem.gemColor = _randomColor;

                gemArray[row][col] = _gem;
                schemeLevel[row][col] = _randomColor;

                gemArray[row][col].signalToGem.dispatch('fall', row, col);
                return gemArray[row][col];
            }
        }
    },


    /**
     *
     * не совсем коректное название, так как метод назодит
     * дырки и элемент который должен заполнить его.
     * Так же если его нет на поле он берется из хранилища камней
     * только после этого камням раздается сигнал на падение
     *
     * @param gemArray
     * @param schemeLevel
     * @param storageGems
     * @param emptyAfterFall
     */
    gemsFall: function gemsFall(gemArray, schemeLevel, storageGems, emptyAfterFall) {
        var row = 0;
        var col = 0;
        var tmpRow = 0;
        var lastGem = void 0;
        for (row = _settings.settings.fieldRow - 1; row >= 0; row--) {
            for (col = 0; col < _settings.settings.fieldCol; col++) {
                lastGem = this.singleGemFall(gemArray, schemeLevel, storageGems, emptyAfterFall, row, col);
            }
        }
        // шлем последднему камню задание что бы он оповестил после окончания анимации
        if (lastGem) {
            lastGem.signalToGem.dispatch('responseFallTweenComplete');
        } else {
            this.signalToServiceGem.dispatch('responseFallTweenComplete');
        }
    },
    fallDiagonally: function fallDiagonally(gemArray, schemeLevel, emptyAfterFall) {

        var position = void 0,
            row = void 0,
            col = void 0;
        var lastGem = 0;

        //пока что то есть в массиве
        while (emptyAfterFall.length) {

            position = emptyAfterFall.pop();

            row = position[0];
            col = position[1];

            if (row - 1 >= 0 && col - 1 >= 0 && schemeLevel[row - 1][col - 1] & (GEM | ACORN)) {
                schemeLevel[row][col] = schemeLevel[row - 1][col - 1];
                schemeLevel[row - 1][col - 1] = EMPTY;

                gemArray[row][col] = gemArray[row - 1][col - 1];
                gemArray[row - 1][col - 1] = 0;

                gemArray[row][col].signalToGem.dispatch('fall', row, col);
                lastGem = gemArray[row][col];
                continue;
            }
            if (row - 1 >= 0 && col + 1 < _settings.settings.fieldCol && schemeLevel[row - 1][col + 1] & (GEM | ACORN)) {
                schemeLevel[row][col] = schemeLevel[row - 1][col + 1];
                schemeLevel[row - 1][col + 1] = EMPTY;

                gemArray[row][col] = gemArray[row - 1][col + 1];
                gemArray[row - 1][col + 1] = 0;

                gemArray[row][col].signalToGem.dispatch('fall', row, col);
                lastGem = gemArray[row][col];
            }
        }
        if (lastGem) {
            lastGem.signalToGem.dispatch('responseFallTweenComplete');
            return true;
        } else {
            this.signalToServiceGem.dispatch('responseFallTweenComplete');
            return false;
        }
    },


    /**
     * проверка естл ли рядом доски лед и отдельно проверка для желудей
     * @param gemArray
     * @param removeMap
     * @param schemeLevel
     */
    processingSpecialItems: function processingSpecialItems(gemArray, removeMap, schemeLevel) {
        var row = void 0,
            col = void 0;
        for (row = 0; row < _settings.settings.fieldRow; row++) {
            for (col = 0; col < _settings.settings.fieldCol; col++) {
                if (removeMap[row][col]) {
                    if (col - 1 >= 0 && schemeLevel[row][col - 1] & (STONE | ICE)) {
                        // здесь можно узнать свойство элемента
                        // оправляется запрос на удаление
                        // получаем как среагировал элемент на запрос


                        schemeLevel[row][col - 1] = EMPTY;
                        gemArray[row][col - 1].signalToGem.dispatch('remove');
                        gemArray[row][col - 1] = 0;
                    }
                    if (col + 1 < _settings.settings.fieldCol && schemeLevel[row][col + 1] & STONE) {
                        schemeLevel[row][col + 1] = EMPTY;
                        gemArray[row][col + 1].signalToGem.dispatch('remove');
                        gemArray[row][col + 1] = 0;
                    }
                    if (row - 1 >= 0 && schemeLevel[row - 1][col] & STONE) {
                        schemeLevel[row - 1][col] = EMPTY;
                        gemArray[row - 1][col].signalToGem.dispatch('remove');
                        gemArray[row - 1][col] = 0;
                    }
                    if (row + 1 < _settings.settings.fieldRow && schemeLevel[row + 1][col] & STONE) {
                        schemeLevel[row + 1][col] = EMPTY;
                        gemArray[row + 1][col].signalToGem.dispatch('remove');
                        gemArray[row + 1][col] = 0;
                    }
                }
                this.checkAcorn(gemArray, schemeLevel);
            }
        }

        // row--;
        // for(col = 0; col < settings.fieldCol; col++){
        //     if
        // }
    },


    /**
     * проверка желудя на нижней линии
     */
    checkAcorn: function checkAcorn(gemArray, schemeLevel) {
        var col = void 0;
        var acorn = 0;
        var row = _settings.settings.fieldRow - 1;
        for (col = 0; col < _settings.settings.fieldCol; col++) {
            if (row == 7 && schemeLevel[row][col] & ACORN) {
                schemeLevel[row][col] = EMPTY;
                //removeMap[row][col] = 1;
                gemArray[row][col].signalToGem.dispatch('remove');
                gemArray[row][col] = 0;
                acorn++;
            }
        }
        return acorn ? true : false;
    },
    localMatch: function localMatch(gem1, gem2, gemArray) {
        var row = void 0,
            col = void 0;
        var gem1Row = gem1.getRow();
        var gem1Col = gem1.getColumn();
        var gem2Row = gem2.getRow();
        var gem2Col = gem2.getColumn();
        var color1 = gem1.gemColor;
        var color2 = gem2.gemColor;

        //если гемы на одной строке
        if (gem1Row == gem2Col) {} else {}
    },
    localMatchAfterSwap: function localMatchAfterSwap(gem1, gem2, gemArray, schemeLevel, removeMap) {
        var row = void 0,
            col = void 0;
        var beginCol = void 0,
            beginRow = void 0,
            endCol = void 0,
            endRow = void 0;
        var gem1Row = gem1.getRow();
        var gem1Col = gem1.getColumn();
        var gem2Row = gem2.getRow();
        var gem2Col = gem2.getColumn();
        var color1 = gem1.gemColor;
        var color2 = gem2.gemColor;

        //начало конец строк
        // if(gem1Row >= gem2Row){
        //     beginRow = gem2Row - 2 < 0 ? 0 : gem2Row - 2;
        //     endRow = gem1Row + 3 > settings.fieldRow? settings.fieldRow: gem1Row + 3;
        // }else{
        //     beginRow = gem1Row - 2 < 0? 0 : gem1Row - 2;
        //     endRow = gem2Row + 3 > settings.fieldRow? settings.fieldRow : gem2Row + 3;
        // }
        // //начало конец колонок
        // if(gem1Col >= gem2Col){
        //     beginCol = gem2Col - 2 < 0 ? 0 : gem2Col - 2;
        //     endCol = gem1Col + 3 > settings.fieldCol? settings.fieldCol : gem1Col + 3;
        // }else{
        //     beginCol = gem1Col - 2 < 0? 0 : gem1Col - 2;
        //     endRow = gem2Col + 3 > settings.fieldCol? settings.fieldCol : gem2Col + 3;
        // }

        //проверяем две колонки и одну строку
        if (gem1Row == gem2Row) {
            // цветная линия
            var colorLine = 1;
            //текущий цвет
            var currentColor = -1;
            //начало линии
            var startLine = 0;

            var check = false;
            //одна строка
            for (col = 0; col < _settings.settings.fieldCol; col++) {
                if ((schemeLevel[gem1Row][col] & FRAME) == GEM) {
                    var currentGem = gemArray[gem1Row][col];
                    // todo так же проверить на бомбу она подходит ко всему
                    if (currentGem.gemColor != color1 || currentGem.gemColor != color2) {
                        check = true;
                    } else if (currentGem.gemColor == currentColor) {
                        colorLine++;
                        check = false;
                    } else {
                        currentColor = currentGem.gemColor;
                        check = true;
                    }
                    if (col == _settings.settings.col - 1) check = true;
                } else {
                    check = true;
                }

                if (check) {
                    if (colorLine >= 3) {
                        switch (colorLine) {
                            case 4:
                                this.signalToProgress.dispatch('four', gem1Row, startLine);
                                break;
                            case 5:
                                this.signalToProgress.dispatch('five', gem1Row, startLine);
                                break;
                            default:
                                break;
                        }
                        for (var k = 0; k < colorLine; k++) {
                            removeMap[gem1Row][startLine + k] = 1;
                        }
                    }
                    startLine = col;
                    colorLine = 1;
                    check = false;
                }
            }

            // две колонки
            startLine = row;
            currentColor = -1;
            colorLine = 1;
            check = false;
            col = gem1Col;
            for (var a = 0; a < 2; a++) {
                if (a) col = gem2Col;
                for (row = 0; row < _settings.settings.fieldRow; row++) {
                    if ((schemeLevel[row][col] & FRAME) == GEM) {
                        var _currentGem = gemArray[row][col];
                        // todo так же проверить на бомбу она подходит ко всему
                        if (_currentGem.gemColor != color1 || _currentGem.gemColor != color2) {
                            check = true;
                        } else if (_currentGem.gemColor == currentColor) {
                            colorLine++;
                            check = false;
                        } else {
                            currentColor = _currentGem.gemColor;
                            check = true;
                        }
                        if (row == _settings.settings.row - 1) check = true;
                    } else {
                        check = true;
                    }

                    if (check) {
                        if (colorLine >= 3) {
                            switch (colorLine) {
                                case 4:
                                    this.signalToProgress.dispatch('four', startLine, col);
                                    break;
                                case 5:
                                    this.signalToProgress.dispatch('five', startLine, col);
                                    break;
                                default:
                                    break;
                            }
                            for (var _k = 0; _k < colorLine; _k++) {
                                removeMap[startLine + _k][col] = 1;
                            }
                        }
                        startLine = row;
                        colorLine = 1;
                        check = false;
                    }
                }
            }
        } else {
            // две строки и одну колонку
            // цветная линия
            var _colorLine = 1;
            //текущий цвет
            var _currentColor = -1;
            //начало линии
            var _startLine = 0;

            var _check = false;
            //две строки
            for (var _a = 0; _a < 2; _a++) {
                if (_a) col = gem2Col;
                for (col = 0; col < _settings.settings.fieldCol; col++) {
                    if ((schemeLevel[gem1Row][col] & FRAME) == GEM) {
                        var _currentGem2 = gemArray[gem1Row][col];
                        // todo так же проверить на бомбу она подходит ко всему
                        if (_currentGem2.gemColor != color1 || _currentGem2.gemColor != color2) {
                            _check = true;
                        } else if (_currentGem2.gemColor == _currentColor) {
                            _colorLine++;
                            _check = false;
                        } else {
                            _currentColor = _currentGem2.gemColor;
                            _check = true;
                        }
                        if (col == _settings.settings.col - 1) _check = true;
                    } else {
                        _check = true;
                    }

                    if (_check) {
                        if (_colorLine >= 3) {
                            switch (_colorLine) {
                                case 4:
                                    this.signalToProgress.dispatch('four', gem1Row, _startLine);
                                    break;
                                case 5:
                                    this.signalToProgress.dispatch('five', gem1Row, _startLine);
                                    break;
                                default:
                                    break;
                            }
                            for (var _k2 = 0; _k2 < _colorLine; _k2++) {
                                removeMap[gem1Row][_startLine + _k2] = 1;
                            }
                        }
                        _startLine = col;
                        _colorLine = 1;
                        _check = false;
                    }
                }
            }

            // одна колонка
            _startLine = row;
            _currentColor = -1;
            _colorLine = 1;
            _check = false;
            col = gem1Col;

            for (row = 0; row < _settings.settings.fieldRow; row++) {
                if ((schemeLevel[row][col] & FRAME) == GEM) {
                    var _currentGem3 = gemArray[row][col];
                    // todo так же проверить на бомбу она подходит ко всему
                    if (_currentGem3.gemColor != color1 || _currentGem3.gemColor != color2) {
                        _check = true;
                    } else if (_currentGem3.gemColor == _currentColor) {
                        _colorLine++;
                        _check = false;
                    } else {
                        _currentColor = _currentGem3.gemColor;
                        _check = true;
                    }
                    if (row == _settings.settings.row - 1) _check = true;
                } else {
                    _check = true;
                }

                if (_check) {
                    if (_colorLine >= 3) {
                        switch (_colorLine) {
                            case 4:
                                this.signalToProgress.dispatch('four', _startLine, col);
                                break;
                            case 5:
                                this.signalToProgress.dispatch('five', _startLine, col);
                                break;
                            default:
                                break;
                        }
                        for (var _k3 = 0; _k3 < _colorLine; _k3++) {
                            removeMap[_startLine + _k3][col] = 1;
                        }
                    }
                    _startLine = row;
                    _colorLine = 1;
                    _check = false;
                }
            }
        }
    },


    doRandomSwap: function doRandomSwap(gemsArray, schemeLevel) {
        var tempArray = [];

        /**
         * для хранения камней в виде одномерного массива
         * @type {Array}
         */
        var storage = [];

        var randomRow = void 0;
        var randomCol = void 0;
        //let next = false;
        var row = 0,
            col = 0,
            a = 0;
        var color = void 0;
        /**
         * количество клеток которые будут заполнены случайно
         * @type {number}
         */
        var randomNumber = 0;

        // копируем все элементы в хранилище и создаем новый массив
        for (row = 0; row < this.fieldRow; row++) {
            for (col = 0; col < this.fieldCol; col++) {
                if (gemsArray[row][col] && !(schemeLevel[row][col] & (STONE | NOTFIELD | ACORN))) {
                    storage.push(gemsArray[row][col]);
                    gemsArray[row][col] = 0;
                    randomNumber++;
                }
            }
        }

        randomNumber -= 10;
        //заполняем какое то количнство случайно
        while (a < randomNumber) {
            do {
                randomRow = game.rnd.between(0, this.fieldRow - 1);
                randomCol = game.rnd.between(0, this.fieldCol - 1);
                if (!gemsArray[randomRow][randomCol] && !(schemeLevel[randomRow][randomCol] & (STONE | NOTFIELD | EMPTY | ACORN))) {
                    gemsArray[randomRow][randomCol] = storage.pop();
                    color = gemsArray[randomRow][randomCol].gemColor;
                    schemeLevel[randomRow][randomCol] = schemeLevel[randomRow][randomCol] & COLORGEM | color;
                    break;
                }
            } while (1);
            //next = false;
            a++;
        }
        // остатки допихиваем по циклу в свободные клетки
        for (row = 0; row < this.fieldRow; row++) {
            for (col = 0; col < this.fieldCol; col++) {
                if (!gemsArray[row][col] && !(schemeLevel[row][col] & (STONE | NOTFIELD | EMPTY | ACORN))) {
                    gemsArray[row][col] = storage.pop();
                    color = gemsArray[row][col].gemColor;
                    schemeLevel[row][col] = schemeLevel[row][col] & COLORGEM | color;
                }
            }
        }
        //return tempArray;
    }

};
exports.processArray = processArray;

/***/ }),
/* 349 */
/*!*************************************!*\
  !*** ./src/game/gems/ServiceGem.js ***!
  \*************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by ss on 18.12.2017.
 */

/**
 * class ServiceGem
 * нужен для отсылки сигнала когда нет последних камней
 * и что бы не усложнать структуру кода отправим сигнал от
 * служебного гема.
 * от.
 */
var ServiceGem = function () {
    function ServiceGem() {
        _classCallCheck(this, ServiceGem);

        /**
         * сигнал к GemController
         * @type {Phaser.Signal}
         */
        this.signalToGemController = new Phaser.Signal();
    }

    /**
     * вызывается на все сигналы от котроллера
     * signalToGem.add(gem.onSignal, gem);
     * @param {string} action this action must be run
     * @param row
     * @param col
     */


    _createClass(ServiceGem, [{
        key: 'onSignal',
        value: function onSignal(action, row, col) {
            this[action](row, col);
        }

        /**
         * ответ подписывается только последний из камней
         */

    }, {
        key: 'responseRemoveTweenComplete',
        value: function responseRemoveTweenComplete() {
            this.tween.onComplete.addOnce(this.onRemoveTweenComplete, this);
        }

        /**
         * сигнал контроллеру по завершения удаления
         */

    }, {
        key: 'onRemoveTweenComplete',
        value: function onRemoveTweenComplete() {
            this.signalToGemController.dispatch('removeTweenComplete');
        }

        /**
         * ответ подписывается только последний из камней
         */

    }, {
        key: 'responseFallTweenComplete',
        value: function responseFallTweenComplete() {
            this.onFallTweenComplete();
        }

        /**
         * сигнал контроллеру по завершения падения
         */

    }, {
        key: 'onFallTweenComplete',
        value: function onFallTweenComplete() {
            this.signalToGemController.dispatch('fallTweenComplete');
        }
    }, {
        key: 'responseShowTipTweenComplete',
        value: function responseShowTipTweenComplete() {
            this.tween.onComplete.addOnce(this.onShowTipTweenComplete, this);
        }
    }, {
        key: 'onShowTipTweenComplete',
        value: function onShowTipTweenComplete() {
            this.signalToGemController.dispatch('showTipTweenComplete');
        }
    }]);

    return ServiceGem;
}();

exports.default = ServiceGem;

/***/ }),
/* 350 */
/*!*********************************!*\
  !*** ./src/game/UserActions.js ***!
  \*********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by ss on 30.11.2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _phaser = __webpack_require__(/*! phaser */ 10);

var _phaser2 = _interopRequireDefault(_phaser);

var _utils = __webpack_require__(/*! ../utils */ 52);

var _settings = __webpack_require__(/*! ../settings */ 12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserAction = function () {
    function UserAction(row, col) {
        _classCallCheck(this, UserAction);

        this.curPosition = {};
        this.nextPosition = {
            column: 0,
            row: 0
        };

        /**
         * во время обработки  и анимации запретить выбор камней
         * @type {number}
         */
        this.allow = 1;

        /**
         * время бездействия пользователя
         * @type {number}
         */
        this.timerId;

        this.state = 1;

        this.strState = [];
        //множитель для оценки приоритета пути
        //this.multiplier = 0;
        this.intermediateFunction = 'wait';

        this.strState[0] = 'wait';
        this.strState[1] = 'select';
        this.strState[2] = 'waitNext';
        this.strState[5] = 'success';
        this.strState[6] = 'fail';

        this.signalToGemController = new _phaser2.default.Signal();
        game.input.onDown.add(this.onDown.bind(this));
        game.input.onUp.add(this.onUp.bind(this));

        (0, _utils.addMenuOption)(100, _settings.settings.calcHeight - 50, 'вихрь', this.onVortex.bind(this), _settings.settings.scale);
        (0, _utils.addMenuOption)(200, _settings.settings.calcHeight - 50, 'уровни', this.toLevels.bind(this), _settings.settings.scale);

        this.allowAction();
    }

    _createClass(UserAction, [{
        key: 'toLevels',
        value: function toLevels() {
            game.state.start('Levels');
        }

        /**
         * при действии  пользоватедя
         * @param event
         */

    }, {
        key: 'onDown',
        value: function onDown(event) {
            if (this.allow && this.isOverField(event.y)) {
                var row = Math.floor((event.y - _settings.settings.offsetGemsField) / _settings.settings.calcGemSize);
                var col = Math.floor(event.x / _settings.settings.calcGemSize);
                this.signalToGemController.dispatch('onDown', row, col);
            }
        }

        /**
         * разрешить выбор запустить подсказку
         */

    }, {
        key: 'enableSelection',
        value: function enableSelection() {
            this.allowAction();
        }

        /**
         * запретить выбор сбросить таймер посказки
         */

    }, {
        key: 'disableSelection',
        value: function disableSelection() {
            this.notAllowAction();
        }

        // todo нужен при протягивнии, пока этот функционал на работает

    }, {
        key: 'onUp',
        value: function onUp() {}
    }, {
        key: 'allowAction',
        value: function allowAction() {
            this.allow = 1;
            this.setTimerTip();
        }
    }, {
        key: 'notAllowAction',
        value: function notAllowAction() {
            this.allow = 0;
            this.resetTimerTip();
        }
    }, {
        key: 'setTimerTip',
        value: function setTimerTip() {
            this.timerId = setTimeout(this.showTip.bind(this), 6000);
        }
    }, {
        key: 'resetTimerTip',
        value: function resetTimerTip() {
            clearTimeout(this.timerId);
        }
    }, {
        key: 'showTip',
        value: function showTip() {
            if (this.allow) {
                this.notAllowAction();
                this.signalToGemController.dispatch('showTip');
            }
        }
    }, {
        key: 'endTip',
        value: function endTip() {
            if (!this.allow) {
                this.allowAction();
            }
        }
    }, {
        key: 'onVortex',
        value: function onVortex() {
            if (this.allow) {
                this.signalToGemController.dispatch('vortex');
            }
        }
    }, {
        key: 'doVortex',
        value: function doVortex() {
            this.notAllowAction();
        }

        // возможно уже не нужно

    }, {
        key: 'endVortex',
        value: function endVortex() {
            if (!this.allow) {
                this.allowAction();
            }
        }

        /**
         *
         * @param {object} position
         */

    }, {
        key: 'onActionWithGem',
        value: function onActionWithGem(action, position) {
            this[action]();
        }

        // todo нужен при протягивнии, пока этот функционал на работает

    }, {
        key: 'onSelectGem',
        value: function onSelectGem() {}
        //game.input.addMoveCallback(this.waitNext.bind(this));
        //game.input.onUp.add(this.onUp.bind(this));

        // todo нужен при протягивнии, пока этот функционал на работает

    }, {
        key: 'onUnselectGem',
        value: function onUnselectGem() {
            // game.input.deleteMoveCallback(this.waitNext);
            // console.log('monitor: unselect gem');
        }
    }, {
        key: 'isOverField',
        value: function isOverField(y) {
            if (y > _settings.settings.offsetGemsField && y < _settings.settings.offsetGemsField + _settings.settings.calcWidth) {
                return true;
            }
            return false;
        }
    }]);

    return UserAction;
}();
// this.button = game.add.button(
//     game.world.width - 100, 250,
//     'gems',
//     this.actionOnClick,
//     this,
//     11, 15, 11
// );
// this.button.scale.setTo(0.5);


exports.default = UserAction;

/***/ }),
/* 351 */
/*!******************************!*\
  !*** ./src/game/Progress.js ***!
  \******************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by ss on 15.12.2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _phaser = __webpack_require__(/*! phaser */ 10);

var _phaser2 = _interopRequireDefault(_phaser);

var _settings = __webpack_require__(/*! ../settings */ 12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Progress = function () {
    function Progress() {
        _classCallCheck(this, Progress);

        this.deltaScore = 0;

        this.score = 0;

        this.goal = 0;

        this.progressBar;

        this.percent;

        this.signalToGemsController = new _phaser2.default.Signal();

        this.txtScore;

        this.txtGoal;

        this.combo = 1;

        this.star;
    }

    _createClass(Progress, [{
        key: 'create',
        value: function create() {
            //this.progressBar = new Phaser.Sprite(game, 0, 0, '')
            this.txtScore = game.add.text(game.world.width / 2, _settings.settings.offsetGemsField - 40, this.score);
            this.txtScore.font = 'Bangers';
            this.txtScore.scale.setTo(_settings.settings.scale);
            this.txtScore.padding.set(10, 16);
            this.txtScore.fontSize = 40;
            this.txtScore.fill = '#77BFA3';
            this.txtScore.smoothed = false;

            this.txtGoal = game.add.text(20, 10, 'Goal: ' + this.goal);
            this.txtGoal.font = 'Bangers';
            this.txtGoal.scale.setTo(_settings.settings.scale);
            this.txtGoal.padding.set(10, 16);
            this.txtGoal.fontSize = 40;
            this.txtGoal.fill = '#77BFA3';
            this.txtGoal.smoothed = false;

            this.star1 = game.add.sprite(game.world.width - 150, _settings.settings.offsetGemsField - 40, 'gems', 3);
            this.star1.scale.setTo(0.4);
            this.star1.visible = false;

            this.star2 = game.add.sprite(game.world.width - 100, _settings.settings.offsetGemsField - 40, 'gems', 3);
            this.star2.scale.setTo(0.4);
            this.star2.visible = false;

            this.star3 = game.add.sprite(game.world.width - 50, _settings.settings.offsetGemsField - 40, 'gems', 3);
            this.star3.scale.setTo(0.4);
            this.star3.visible = false;
        }
    }, {
        key: 'update',
        value: function update() {
            // обновление очков с бегущими числами
            if (this.deltaScore) {
                var delta = game.time.elapsed << 0;
                var dif = this.deltaScore >= delta ? delta : this.deltaScore;
                this.deltaScore -= dif;
                this.score += dif;
                this.txtScore.setText(this.score);
            }
        }
    }, {
        key: 'onSignalFromGemsController',
        value: function onSignalFromGemsController(action) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            //console.log(action);
            var params = [];
            for (var i = 0; i < arguments.length; i++) {
                params.push(arguments[i + 1]);
            }
            this[action](params);
        }
    }, {
        key: 'onSignalFromBoardController',
        value: function onSignalFromBoardController(action) {
            this[action]();
        }
    }, {
        key: 'removeBoard',
        value: function removeBoard() {
            console.log('removeBoard');
        }
    }, {
        key: 'handleFields',
        value: function handleFields() {
            this.combo += 1;
        }
    }, {
        key: 'remove',
        value: function remove(params) {
            // в параметрах тип камня gemColor и обремеенение burden
            // возможно нужно будет при расчте очков
            //сначала очки записывыются в промежуточную переменную, что  бы
            // красиво их увеличить
            this.deltaScore += _settings.settings.ball * this.combo;
            this.checkConditionsAfterChange();
        }

        /**
         * при достижении желудем границы
         */

    }, {
        key: 'acornReachBorder',
        value: function acornReachBorder() {
            this.deltaScore += _settings.settings.ball * this.combo;
            this.goal += 1;
            this.txtGoal.setText('Goal: ' + this.goal);
            this.checkConditionsAfterChange();
        }
    }, {
        key: 'checkConditionsAfterChange',
        value: function checkConditionsAfterChange() {
            if (this.score > _settings.settings.score1 && !this.star1.visible) {
                this.star1.visible = true;
                return true;
            }
            if (this.score > _settings.settings.score2 && !this.star2.visible) {
                this.star2.visible = true;
                return true;
            }
            if (this.score > _settings.settings.score3 && !this.star3.visible) {
                this.star3.visible = true;
                return true;
            }
            if (this.goal == _settings.settings.goal) {
                var txtGoal = game.add.text(game.world.centerX, game.world.centerY, 'Ура вы выиграли');
                txtGoal.anchor.setTo(0.5);
                txtGoal.font = 'Bangers';
                txtGoal.scale.setTo(_settings.settings.scale);
                txtGoal.padding.set(10, 16);
                txtGoal.fontSize = 60;
                txtGoal.fill = '#cc0000';
                txtGoal.smoothed = false;
                setTimeout(this.exit.bind(this), 2000);
            }
        }
    }, {
        key: 'end',
        value: function end() {
            this.combo = 1;
        }
    }, {
        key: 'four',
        value: function four() {}
    }, {
        key: 'five',
        value: function five() {}
    }, {
        key: 'showScore',
        value: function showScore() {}
    }, {
        key: 'star',
        value: function star() {}
    }, {
        key: 'exit',
        value: function exit() {
            game.state.start('Levels');
        }

        // this.score += 20;
        // this.showScore.setText(this.score);
        // this.signalToGemsController.dispatch('do something');

    }]);

    return Progress;
}();

exports.default = Progress;

/***/ }),
/* 352 */
/*!*******************************************!*\
  !*** ./src/game/board/BoardController.js ***!
  \*******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 10);

var _phaser2 = _interopRequireDefault(_phaser);

var _settings = __webpack_require__(/*! ../../settings */ 12);

var _Board = __webpack_require__(/*! ./Board */ 353);

var _Board2 = _interopRequireDefault(_Board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ss on 21.12.2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var BoardController = function (_Phaser$Group) {
    _inherits(BoardController, _Phaser$Group);

    function BoardController(field) {
        _classCallCheck(this, BoardController);

        var _this = _possibleConstructorReturn(this, (BoardController.__proto__ || Object.getPrototypeOf(BoardController)).call(this, game));

        _this.y = _settings.settings.offsetGemsField;

        _this.signalToProgress = new _phaser2.default.Signal();

        _this.field = field;

        _this.boards = [];

        _this.countBoards = 0;

        return _this;
    }

    _createClass(BoardController, [{
        key: 'create',
        value: function create() {
            this.createBoards();
        }
    }, {
        key: 'createBoards',
        value: function createBoards() {
            var row = void 0,
                col = void 0;
            for (row = 0; row < _settings.settings.fieldRow; row++) {
                this.boards[row] = [];
                for (col = 0; col < _settings.settings.fieldCol; col++) {
                    if (_settings.settings.boards[row][col]) {
                        var board = new _Board2.default(row, col);
                        var signalToBoard = new _phaser2.default.Signal();
                        signalToBoard.add(board.onSignalFromBoardController, board);
                        board.signalToBoardController.add(this.onSignalFromBoard, this);
                        this.field.layer1.add(board);
                        var boardObject = {
                            signalToBoard: signalToBoard,
                            board: board
                        };
                        this.boards[row][col] = boardObject;
                        this.countBoards++;
                    } else {
                        this.boards[row][col] = 0;
                    }
                }
            }
        }
    }, {
        key: 'removeBoardFromField',
        value: function removeBoardFromField(removeMap) {
            var row = void 0,
                col = void 0;
            if (this.countBoards) {
                for (row = 0; row < _settings.settings.fieldRow; row++) {
                    for (col = 0; col < _settings.settings.fieldCol; col++) {
                        if (removeMap[row][col] && this.boards[row][col]) {
                            this.boards[row][col].signalToBoard.dispatch('remove');
                            this.signalToProgress.dispatch('removeBoard');
                            this.countBoards--;
                            this.boards[row][col] = 0;
                        }
                    }
                }
            }
        }
    }, {
        key: 'onSignalFromBoard',
        value: function onSignalFromBoard(action) {
            this[action]();
        }
    }, {
        key: 'onSignalFromGemsController',
        value: function onSignalFromGemsController(action, params) {
            this[action](params);
        }
    }, {
        key: 'removeGems',
        value: function removeGems(removeMap) {
            this.removeBoardFromField(removeMap);
        }
    }]);

    return BoardController;
}(_phaser2.default.Group);

exports.default = BoardController;

/***/ }),
/* 353 */
/*!*********************************!*\
  !*** ./src/game/board/Board.js ***!
  \*********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 10);

var _phaser2 = _interopRequireDefault(_phaser);

var _settings = __webpack_require__(/*! ../../settings */ 12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ss on 21.12.2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Board = function (_Phaser$Sprite) {
    _inherits(Board, _Phaser$Sprite);

    function Board(row, col) {
        _classCallCheck(this, Board);

        var _this = _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).call(this, game, col * _settings.settings.calcGemSize, row * _settings.settings.calcGemSize, 'gems'));

        _this.scale.setTo(_settings.settings.scale);

        _this.frame = 11;

        _this.live = 1;

        _this.signalToBoardController = new _phaser2.default.Signal();
        return _this;
    }

    _createClass(Board, [{
        key: 'remove',
        value: function remove() {
            this.live -= 1;
            var fade = game.add.tween(this).to({ alpha: 0 }, 200, _phaser2.default.Easing.Linear.None, true);
            fade.onComplete.addOnce(this.onEndRemove, this);
        }
    }, {
        key: 'onEndRemove',
        value: function onEndRemove() {
            this.visible = false;
            this.parent.removeChild(this);
            console.log('end remove');
        }
    }, {
        key: 'onSignalFromBoardController',
        value: function onSignalFromBoardController(action) {
            console.log(action);
            this[action]();
        }
    }]);

    return Board;
}(_phaser2.default.Sprite);

exports.default = Board;

/***/ }),
/* 354 */
/*!******************************!*\
  !*** ./src/states/Levels.js ***!
  \******************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 10);

var _phaser2 = _interopRequireDefault(_phaser);

var _utils = __webpack_require__(/*! ../utils */ 52);

var _settings = __webpack_require__(/*! ../settings */ 12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals __DEV__ */


var _class = function (_Phaser$State) {
    _inherits(_class, _Phaser$State);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
        key: 'init',
        value: function init() {}

        // preload () {
        //
        // }

    }, {
        key: 'create',
        value: function create() {
            var bannerText = 'Уровни';
            var banner = this.add.text(this.world.centerX - 80, 50, bannerText);
            banner.font = 'Bangers';
            banner.scale.setTo(_settings.settings.scale);
            banner.padding.set(10, 16);
            banner.fontSize = 40;
            banner.fill = '#77BFA3';
            banner.smoothed = false;

            (0, _utils.addMenuOption)(this.world.centerX - 100, game.world.height - 100, 'К игре', function () {
                game.state.start('Game');
            }, _settings.settings.scale);
            (0, _utils.addMenuOption)(this.world.centerX - 160, 200, '1', this.loadLevel.bind(this, 1), _settings.settings.scale);
            (0, _utils.addMenuOption)(this.world.centerX - 80, 200, '2', this.loadLevel.bind(this, 2), _settings.settings.scale);
            (0, _utils.addMenuOption)(this.world.centerX, 200, '3', this.loadLevel.bind(this, 3), _settings.settings.scale);
            (0, _utils.addMenuOption)(this.world.centerX + 80, 200, '4', this.loadLevel.bind(this, 4), _settings.settings.scale);
            (0, _utils.addMenuOption)(this.world.centerX + 160, 200, '5', this.loadLevel.bind(this, 5), _settings.settings.scale);
        }
    }, {
        key: 'render',
        value: function render() {
            if (true) {
                //this.game.debug.spriteInfo(this.mushroom, 32, 32)
            }
        }
    }, {
        key: 'loadLevel',
        value: function loadLevel(num) {
            // this.text2 = game.add.text(300, 250, 'Loading...', { fill: '#ffffff' });
            game.load.onLoadStart.add(this.start, this);
            game.load.onLoadComplete.add(this.loadComplete, this);
            var res = "https://budashon.github.io/levels/level" + num + ".json";
            game.load.json('level', res);
            game.load.start();
            //game.load.onLoadStart.add(loadStart, this);
            // game.load.onFileComplete.add(fileComplete, this);

        }
    }, {
        key: 'start',
        value: function start() {
            this.text2 = game.add.text(300, 250, 'Loading...', { fill: '#ffffff' });
        }
    }, {
        key: 'loadComplete',
        value: function loadComplete() {

            this.text2.setText("Loading Completed.");
            var json = game.cache.getJSON('level');

            _settings.settings.level = json.level;
            _settings.settings.fieldRow = json.row;
            _settings.settings.fieldCol = json.col;
            _settings.settings.color = json.color;
            _settings.settings.boards = json.boards;
            _settings.settings.goal = json.goal;

            game.state.start('Game');
        }
    }]);

    return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 355 */
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  gameWidth: 800,
  gameHeight: 1280,
  localStorageName: 'threeinrow'
};

/***/ }),
/* 356 */,
/* 357 */
/*!******************************!*\
  !*** ./src/game/gems/Ice.js ***!
  \******************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 10);

var _phaser2 = _interopRequireDefault(_phaser);

var _settings = __webpack_require__(/*! ../../settings */ 12);

var _Stone2 = __webpack_require__(/*! ./Stone */ 346);

var _Stone3 = _interopRequireDefault(_Stone2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ss on 25.12.2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Ice = function (_Stone) {
        _inherits(Ice, _Stone);

        function Ice(game, row, col, assets, gemObject) {
                _classCallCheck(this, Ice);

                // this.alpha = 0.6;

                var _this = _possibleConstructorReturn(this, (Ice.__proto__ || Object.getPrototypeOf(Ice)).call(this, game, row, col, assets));

                _this.gemObject = gemObject;

                _this.gemObject.gemSprite.visible = false;

                _this.frame = 12;

                _this._gem = null;

                _this.createIce();
                return _this;
        }

        _createClass(Ice, [{
                key: 'createIce',
                value: function createIce() {
                        this._gem = new _phaser2.default.Sprite(game, 0, 0, 'gems', this.gemObject.gemColor);
                        this._gem.alpha = 0.5;
                        this.addChild(this._gem);
                }
        }]);

        return Ice;
}(_Stone3.default);

exports.default = Ice;

/***/ })
],[131]);
//# sourceMappingURL=bundle.js.map