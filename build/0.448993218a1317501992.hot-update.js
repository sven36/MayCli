exports.id = 0;
exports.modules = {

/***/ "./react-server/controllers/info.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__("babel-runtime/regenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_views_info_routers__ = __webpack_require__("./src/pages/info/routers.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router_dom__ = __webpack_require__("react-router-dom");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_dom_server__ = __webpack_require__("react-dom/server");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__layout_layout__ = __webpack_require__("./react-server/layout/layout.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_node_fetch__ = __webpack_require__("node-fetch");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_node_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_node_fetch__);


var _jsxFileName = 'f:\\NodeSrc\\MayCli\\react-server\\controllers\\info.js',
    _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }








var TEST_URL = 'https://news-at.zhihu.com/api/4/news/latest';

/* harmony default export */ __webpack_exports__["a"] = ((function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee(ctx, next) {
		return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						next();
						_context.next = 3;
						return __WEBPACK_IMPORTED_MODULE_6_node_fetch___default()(TEST_URL).then(function (data) {
							return data.json();
						}).then(function (data) {
							console.log(data);
							var bundle = 'info';
							var markup = Object(__WEBPACK_IMPORTED_MODULE_4_react_dom_server__["renderToString"])(__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
								__WEBPACK_IMPORTED_MODULE_3_react_router_dom__["StaticRouter"],
								{ location: ctx.url, context: {}, __source: {
										fileName: _jsxFileName,
										lineNumber: 18
									},
									__self: _this
								},
								__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_views_info_routers__["a" /* default */], {
									__source: {
										fileName: _jsxFileName,
										lineNumber: 19
									},
									__self: _this
								})
							));
							ctx.body = Object(__WEBPACK_IMPORTED_MODULE_5__layout_layout__["a" /* default */])(markup, bundle);
						});

					case 3:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, _this);
	}));

	return function (_x, _x2) {
		return _ref.apply(this, arguments);
	};
})());

/***/ })

};
//# sourceMappingURL=0.448993218a1317501992.hot-update.js.map