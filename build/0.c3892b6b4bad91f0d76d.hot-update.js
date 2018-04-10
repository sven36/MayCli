exports.id = 0;
exports.modules = {

/***/ "./react-server/server.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_views_index_containers_Home_Home__ = __webpack_require__("./src/pages/index/containers/Home/Home.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__("react-router-dom");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_dom_server__ = __webpack_require__("react-dom/server");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_dom_server__);
var _jsxFileName = 'c:\\work\\MayCli\\react-server\\server.js',
    _this = this;






var Koa = __webpack_require__("koa");
var Router = __webpack_require__("koa-router");
var app = new Koa();
var router = new Router();

router.get('/', function (ctx, next) {
    var markup = Object(__WEBPACK_IMPORTED_MODULE_3_react_dom_server__["renderToString"])(__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_react_router_dom__["StaticRouter"],
        {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 14
            },
            __self: _this
        },
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_views_index_containers_Home_Home__["a" /* default */], {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 15
            },
            __self: _this
        })
    ));
    console.log('restarted4');
    ctx.body = markup + '66';
});

app.use(router.routes()).use(router.allowedMethods());

/* harmony default export */ __webpack_exports__["default"] = (app);

/***/ })

};
//# sourceMappingURL=0.c3892b6b4bad91f0d76d.hot-update.js.map