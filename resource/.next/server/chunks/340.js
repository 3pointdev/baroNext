"use strict";
exports.id = 340;
exports.ids = [340];
exports.modules = {

/***/ 6340:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ DefaultInput)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5981);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5893);




function DefaultInput({
  type,
  value,
  name = "",
  placeholder = "",
  useLabel = false,
  onChange,
  onClick,
  requied = false,
  readOnly = false,
  reference,
  children,
  onKeyDown,
  boxstyle,
  style,
  validState = _config_constants__WEBPACK_IMPORTED_MODULE_1__/* .ValidType */ .WB.PASS,
  validText
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(InputWrap, {
    style: boxstyle,
    onClick: onClick,
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(InputColumn, {
      style: style,
      type: type,
      value: value,
      name: name,
      onChange: onChange,
      required: requied,
      readOnly: readOnly,
      ref: reference,
      onKeyDown: onKeyDown,
      id: name,
      placeholder: useLabel ? "" : placeholder,
      isOnValue: value.length > 0,
      autoComplete: "new-password",
      className: readOnly ? "readonly" : ""
    }), useLabel && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(Placeholder, {
      htmlFor: name,
      className: readOnly ? "readonly" : "",
      children: placeholder
    }), validText && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(ValidLabel, {
      htmlFor: name,
      isViewAble: validState > _config_constants__WEBPACK_IMPORTED_MODULE_1__/* .ValidType */ .WB.PASS,
      className: validState === _config_constants__WEBPACK_IMPORTED_MODULE_1__/* .ValidType */ .WB.FAIL ? readOnly ? "readonly fail" : "fail" : "",
      children: validText
    }), children && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(ChildrenWrap, {
      children: children
    })]
  });
}
const InputWrap = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "defaultInput__InputWrap",
  componentId: "sc-1eg1px6-0"
})(["height:56px;width:100%;position:relative;flex-shrink:0;display:flex;justify-content:space-between;align-items:center;& .view_password_icon{width:24px;height:24px;& path{color:rgb(155,155,155);}}"]);
const ChildrenWrap = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_0___default().p.withConfig({
  displayName: "defaultInput__ChildrenWrap",
  componentId: "sc-1eg1px6-1"
})(["position:absolute;width:32px;height:32px;right:12px;top:50%;transform:translate(0,-50%);cursor:pointer;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:all 0.4s;&:hover{background:rgba(222,222,222,0.4);}"]);
const InputColumn = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_0___default().input.withConfig({
  displayName: "defaultInput__InputColumn",
  componentId: "sc-1eg1px6-2"
})(["background:#fff;border:1px solid #d8d8dd !important;border-radius:8px;height:38px;width:calc(100% - 22px);padding:8px 10px;font-size:16px;font-weight:400;&:active + label,&:focus + label{left:8px;top:-8px;color:#3a79ec !important;}& + label{", "}&:-webkit-autofill,&:-webkit-autofill:hover,&:-webkit-autofill:focus,&:-webkit-autofill:active{-webkit-box-shadow:0 0 0 30px white inset !important;}&.readonly{background:#d9d9d9;}"], ({
  isOnValue
}) => isOnValue ? `left: 8px;
      top: -8px;
      color: #3a79ec !important;` : ``);
const Placeholder = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_0___default().label.withConfig({
  displayName: "defaultInput__Placeholder",
  componentId: "sc-1eg1px6-3"
})(["position:absolute;top:12px;left:12px;font-size:12px;color:#bfbfbf;transition:all 0.4s ease;cursor:text;background:#fff;padding:0 8px;border-radius:8px;&.readonly{background:#d9d9d9;color:#a0a0a0;}"]);
const ValidLabel = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_0___default().label.withConfig({
  displayName: "defaultInput__ValidLabel",
  componentId: "sc-1eg1px6-4"
})(["position:absolute;top:-8px;right:4px;font-size:12px;color:#bfbfbf;transition:all 0.4s ease;cursor:text;background:#fff;padding:0 8px;border-radius:8px;opacity:", ";&.readonly{background:#d9d9d9;color:#a0a0a0;}&.fail{color:red;}"], ({
  isViewAble
}) => isViewAble ? "1" : "0");

/***/ })

};
;