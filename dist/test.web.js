/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var react_channel_1 = __webpack_require__(1);
var publisher1 = new react_channel_1.Publisher();
var subscriber1 = new react_channel_1.Subscriber();
var channel1 = new react_channel_1.Channel();
var publisher2 = new react_channel_1.Publisher();
var subscriber2 = new react_channel_1.Subscriber();
var channel2 = new react_channel_1.Channel();
subscriber1.sub(function (a) {
    switch (a.action) {
        case 'number':
            console.assert(a.n === 1);
            publisher2.pub({
                action: 'destroy'
            });
            break;
    }
});
subscriber2.sub(function (a) {
    switch (a.action) {
        case 'destroy':
            publisher1.detach(channel1);
            subscriber1.detach(channel1);
            break;
    }
});
publisher1.attach(channel1);
subscriber1.attach(channel1);
publisher2.attach(channel2);
subscriber2.attach(channel2);
publisher1.pub({
    action: 'number',
    n: 1
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __webpack_require__(2);
var m_channel_1 = __webpack_require__(3);
exports.Publisher = m_channel_1.Publisher;
exports.Subscriber = m_channel_1.Subscriber;
exports.Channel = m_channel_1.Channel;
var ActionComponent = (function (_super) {
    __extends(ActionComponent, _super);
    function ActionComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.publisher = new m_channel_1.Publisher();
        _this.subscriber = new m_channel_1.Subscriber();
        if (typeof _this.props.pub === 'function') {
            _this.props.pub(_this.publisher);
        }
        if (typeof _this.props.sub === 'function') {
            _this.props.sub(_this.subscriber);
        }
        return _this;
    }
    ActionComponent.prototype.componentWillUnmount = function () {
        this.publisher.detach();
        this.subscriber.detach();
    };
    return ActionComponent;
}(react_1.Component));
exports.ActionComponent = ActionComponent;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Publisher = (function () {
    function Publisher() {
        this.channels = new Set();
    }
    Publisher.prototype.add = function (c) {
        this.channels.add(c);
    };
    Publisher.prototype.del = function (c) {
        this.channels.delete(c);
    };
    Publisher.prototype.replace = function (c1, c2) {
        if (this.channels.has(c1)) {
            this.channels.delete(c1);
        }
        this.channels.add(c2);
    };
    Publisher.prototype.has = function (c) {
        return this.channels.has(c);
    };
    Publisher.prototype.items = function () {
        var e_1, _a, _b, _c, c, e_1_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 5, 6, 7]);
                    _b = __values(this.channels), _c = _b.next();
                    _d.label = 1;
                case 1:
                    if (!!_c.done) return [3, 4];
                    c = _c.value;
                    return [4, c];
                case 2:
                    _d.sent();
                    _d.label = 3;
                case 3:
                    _c = _b.next();
                    return [3, 1];
                case 4: return [3, 7];
                case 5:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 7];
                case 6:
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7];
                case 7: return [2];
            }
        });
    };
    Publisher.prototype.pub = function (a) {
        var e_2, _a;
        try {
            for (var _b = __values(this.channels), _c = _b.next(); !_c.done; _c = _b.next()) {
                var c = _c.value;
                c.pub(a);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    Publisher.prototype.attach = function (c) {
        c.attachPublisher(this);
    };
    Publisher.prototype.detach = function (c) {
        var e_3, _a;
        if (c instanceof Channel && this.channels.has(c)) {
            c.detachPublisher();
        }
        else {
            try {
                for (var _b = __values(this.channels), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var c_1 = _c.value;
                    c_1.detachPublisher();
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
    };
    return Publisher;
}());
exports.Publisher = Publisher;
var Channel = (function () {
    function Channel() {
        var _a;
        var actionFilter = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            actionFilter[_i] = arguments[_i];
        }
        this.publisher = null;
        this.subscriber = null;
        this.actionFilter = [];
        (_a = this.actionFilter).push.apply(_a, __spread(actionFilter));
    }
    Channel.prototype.attachPublisher = function (p) {
        if (this.publisher !== null) {
            this.publisher.del(this);
        }
        this.publisher = p;
        p.add(this);
    };
    Channel.prototype.detachPublisher = function () {
        if (this.publisher !== null) {
            this.publisher.del(this);
        }
        this.publisher = null;
    };
    Channel.prototype.attachSubscriber = function (s) {
        if (this.subscriber !== null) {
            this.subscriber.del(this);
        }
        this.subscriber = s;
        s.add(this);
    };
    Channel.prototype.detachSubscriber = function () {
        if (this.subscriber !== null) {
            this.subscriber.del(this);
        }
        this.subscriber = null;
    };
    Channel.prototype.pub = function (a) {
        var e_4, _a;
        if (this.subscriber instanceof Subscriber) {
            if (this.actionFilter.length > 0) {
                try {
                    for (var _b = __values(this.actionFilter), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var f = _c.value;
                        if (a.action === f) {
                            this.subscriber.notify(a);
                            return;
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
            else {
                this.subscriber.notify(a);
            }
        }
    };
    return Channel;
}());
exports.Channel = Channel;
var Subscriber = (function () {
    function Subscriber() {
        this.channels = new Set();
        this.cbs = [];
    }
    Subscriber.prototype.add = function (c) {
        this.channels.add(c);
    };
    Subscriber.prototype.del = function (c) {
        this.channels.delete(c);
    };
    Subscriber.prototype.replace = function (c1, c2) {
        if (this.channels.has(c1)) {
            this.channels.delete(c1);
        }
        this.channels.add(c2);
    };
    Subscriber.prototype.has = function (c) {
        return this.channels.has(c);
    };
    Subscriber.prototype.items = function () {
        var e_5, _a, _b, _c, c, e_5_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 5, 6, 7]);
                    _b = __values(this.channels), _c = _b.next();
                    _d.label = 1;
                case 1:
                    if (!!_c.done) return [3, 4];
                    c = _c.value;
                    return [4, c];
                case 2:
                    _d.sent();
                    _d.label = 3;
                case 3:
                    _c = _b.next();
                    return [3, 1];
                case 4: return [3, 7];
                case 5:
                    e_5_1 = _d.sent();
                    e_5 = { error: e_5_1 };
                    return [3, 7];
                case 6:
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_5) throw e_5.error; }
                    return [7];
                case 7: return [2];
            }
        });
    };
    Subscriber.prototype.notify = function (a) {
        var e_6, _a;
        try {
            for (var _b = __values(this.cbs), _c = _b.next(); !_c.done; _c = _b.next()) {
                var cb = _c.value;
                cb(a);
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_6) throw e_6.error; }
        }
    };
    Subscriber.prototype.sub = function (cb) {
        this.cbs.push(cb);
    };
    Subscriber.prototype.attach = function (c) {
        c.attachSubscriber(this);
    };
    Subscriber.prototype.detach = function (c) {
        var e_7, _a;
        if (c instanceof Channel && this.channels.has(c)) {
            c.detachSubscriber();
        }
        else {
            try {
                for (var _b = __values(this.channels), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var c_2 = _c.value;
                    c_2.detachSubscriber();
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_7) throw e_7.error; }
            }
        }
    };
    return Subscriber;
}());
exports.Subscriber = Subscriber;


/***/ })
/******/ ]);