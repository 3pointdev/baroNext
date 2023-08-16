(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 9305:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ DoneMachine)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _warning_isEmpty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3132);
/* harmony import */ var _progress_progressCircle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4538);
/* harmony import */ var _src_modules_time_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5893);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_warning_isEmpty__WEBPACK_IMPORTED_MODULE_2__]);
_warning_isEmpty__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];








function DoneMachine({
  list
}) {
  const {
    0: doneMachine,
    1: setDoneMachine
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const newMachine = [];

    for (let index = 0; index < list.length; index++) {
      if (list[index].doneTime > 0 && list[index].doneTime <= 3600000) {
        newMachine.push(list[index]);
      }
    }

    setDoneMachine(newMachine.sort((a, b) => a.doneTime - b.doneTime));
  }, [list]);
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(Container, {
    children: doneMachine.length > 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(_progress_progressCircle__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
        maxValue: 3600000,
        minValue: 0,
        value: 3600000 - doneMachine[0]?.doneTime,
        innerText: _src_modules_time_module__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z.msToHHMM(doneMachine[0]?.doneTime)
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(SoonList, {
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("thead", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("tr", {
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("th", {
              className: "table_head_machine_no",
              children: "\uD638\uAE30"
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("th", {
              align: "left",
              children: "\uAE30\uACC4\uBA85"
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("th", {
              children: "\uB0A8\uC740\uC2DC\uAC04"
            })]
          })
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("tbody", {
          children: doneMachine.map((soonMachine, index) => {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("tr", {
              children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("td", {
                children: soonMachine?.machineNo
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("td", {
                align: "left",
                children: soonMachine?.mid
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("td", {
                children: _src_modules_time_module__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z.msToHHMM(soonMachine?.doneTime)
              })]
            }, `done_soon_machine_${index}`);
          })
        })]
      })]
    }) : /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(_warning_isEmpty__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
      title: "\uD604\uC7AC 1\uC2DC\uAC04 \uBBF8\uB9CC\uC758 \uACF5\uC815 \uC784\uBC15 \uAE30\uACC4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."
    })
  });
}
const Container = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_1___default().div.withConfig({
  displayName: "DoneSoonList__Container",
  componentId: "sc-bhlh1p-0"
})(["height:100%;width:100%;display:flex;flex-direction:column;gap:32px;align-items:center;"]);
const SoonList = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_1___default().table.withConfig({
  displayName: "DoneSoonList__SoonList",
  componentId: "sc-bhlh1p-1"
})(["border-collapse:collapse;width:100%;& *{font-size:12px;font-weight:500;}& thead{height:32px;border-bottom:1px solid #d5d7da;}& .table_head_machine_no{width:56px;}& tbody tr{height:32px;text-align:center;}& tbody tr td{font-size:14px;font-weight:700;}& tbody tr:first-child td{color:#3a79ec;font-size:14px;font-weight:700;}"]);
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2433:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ RealTimeMachineItem)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
;// CONCATENATED MODULE: ./public/images/icons/factoryIcon.tsx


function FactoryIcon({
  color
}) {
  return /*#__PURE__*/jsx_runtime.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "50",
    height: "41",
    fill: "none",
    viewBox: "0 0 50 41",
    children: /*#__PURE__*/(0,jsx_runtime.jsxs)("g", {
      fill: color,
      children: [/*#__PURE__*/jsx_runtime.jsx("path", {
        d: "M48.296 0h-3.28v25.956h-21.99V0H3.916A3.885 3.885 0 0 0 0 3.822v37.086h50V1.592A1.704 1.704 0 0 0 48.296 0ZM19.73 24.618H3.121V7.102h16.608v17.516Z"
      }), /*#__PURE__*/jsx_runtime.jsx("path", {
        d: "M17.85 8.933H5v4.937h12.85V8.933Zm-10.27 6.8H5v2.58h2.58v-2.58Zm5.143 0h-2.58v2.58h2.58v-2.58ZM7.58 20.175H5v2.58h2.58v-2.58Zm5.143 0h-2.58v2.58h2.58v-2.58ZM42.468 0H25.573v23.408h16.895V0ZM39.92 19.745a1.13 1.13 0 0 1-1.114 1.115h-9.554a1.115 1.115 0 0 1-1.115-1.115v-9.697a1.115 1.115 0 0 1 1.115-1.115h9.554a1.114 1.114 0 0 1 1.114 1.115v9.697Z"
      })]
    })
  });
}
// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(7518);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./src/modules/time.module.ts
var time_module = __webpack_require__(1786);
// EXTERNAL MODULE: ./src/modules/machineStatus.module.ts
var machineStatus_module = __webpack_require__(6409);
;// CONCATENATED MODULE: ./components/machine/RealTimeMachineItem.tsx







function RealTimeMachineItem(props) {
  const {
    data
  } = props;
  const {
    0: color,
    1: setColor
  } = (0,external_react_.useState)("red");
  (0,external_react_.useEffect)(() => {
    console.log(data.execution);
    setColor(machineStatus_module/* default */.Z.ToColorStatus(data.execution));
  }, [data]);
  return /*#__PURE__*/(0,jsx_runtime.jsxs)(Container, {
    children: [/*#__PURE__*/jsx_runtime.jsx(Item.MidTitle, {
      children: data.mid
    }), /*#__PURE__*/(0,jsx_runtime.jsxs)(RowFlex, {
      children: [/*#__PURE__*/(0,jsx_runtime.jsxs)(ColFlex, {
        children: [/*#__PURE__*/jsx_runtime.jsx(Item.MachineNumber, {
          color: color,
          children: data.machineNo
        }), /*#__PURE__*/jsx_runtime.jsx(FactoryIcon, {
          color: color
        })]
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)(ColFlex, {
        children: [/*#__PURE__*/(0,jsx_runtime.jsxs)(RowFlex, {
          children: [/*#__PURE__*/jsx_runtime.jsx(Item.Title, {
            children: "\uACF5 \uC815 \uBA85"
          }), /*#__PURE__*/jsx_runtime.jsx(Item.Desc, {
            children: data.program
          })]
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)(RowFlex, {
          children: [/*#__PURE__*/jsx_runtime.jsx(Item.Title, {
            children: "\uC218 \uB7C9"
          }), /*#__PURE__*/jsx_runtime.jsx(Item.Desc, {
            children: `${data.partCount}/${data.planCount}`
          })]
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)(RowFlex, {
          children: [/*#__PURE__*/jsx_runtime.jsx(Item.Title, {
            children: "\uB0A8\uC740\uC2DC\uAC04"
          }), /*#__PURE__*/jsx_runtime.jsx(Item.Desc, {
            children: +data.doneTime > 0 ? time_module/* default */.Z.msToHHMM(+data.doneTime) : "-"
          })]
        })]
      })]
    })]
  });
}
const Container = /*#__PURE__*/external_styled_components_default().div.withConfig({
  displayName: "RealTimeMachineItem__Container",
  componentId: "sc-p20sja-0"
})(["width:230px;height:140px;padding:12px 18px;border-radius:8px;background-color:#f4f4f4;display:flex;flex-direction:column;gap:24px;& img{margin-left:8px;}"]);
const RowFlex = /*#__PURE__*/external_styled_components_default().div.withConfig({
  displayName: "RealTimeMachineItem__RowFlex",
  componentId: "sc-p20sja-1"
})(["display:flex;gap:16px;"]);
const ColFlex = /*#__PURE__*/external_styled_components_default().div.withConfig({
  displayName: "RealTimeMachineItem__ColFlex",
  componentId: "sc-p20sja-2"
})(["display:flex;flex-direction:column;justify-content:space-around;gap:6px;"]);
const Item = {
  MidTitle: external_styled_components_default().p.withConfig({
    displayName: "RealTimeMachineItem__MidTitle",
    componentId: "sc-p20sja-3"
  })(["width:100%;background:rgba(255,255,255,0.6);height:28px;line-height:2;text-align:center;font-weight:700;font-size:14px;border:8px;"]),
  MachineNumber: external_styled_components_default().p.withConfig({
    displayName: "RealTimeMachineItem__MachineNumber",
    componentId: "sc-p20sja-4"
  })(["width:100%;text-align:center;color:", ";margin-left:4px;"], ({
    color
  }) => color),
  Title: external_styled_components_default().p.withConfig({
    displayName: "RealTimeMachineItem__Title",
    componentId: "sc-p20sja-5"
  })(["flex-shrink:0;display:inline-block;font-size:10px;width:36px;color:#666666;text-align:justify;text-align-last:justify;-moz-text-align-last:justify;word-break:keep-all;"]),
  Desc: external_styled_components_default().p.withConfig({
    displayName: "RealTimeMachineItem__Desc",
    componentId: "sc-p20sja-6"
  })(["width:calc(100% - 40px);color:rgba(0,0,0,0.87);font-size:12px;font-weight:400;word-break:break-all;"])
};

/***/ }),

/***/ 4538:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ ProgressCircle)
});

;// CONCATENATED MODULE: external "react-circular-progressbar"
const external_react_circular_progressbar_namespaceObject = require("react-circular-progressbar");
// EXTERNAL MODULE: ./node_modules/react-circular-progressbar/dist/styles.css
var styles = __webpack_require__(1121);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
;// CONCATENATED MODULE: ./components/tools/separator.tsx

function Separator({
  turns,
  style
}) {
  return /*#__PURE__*/jsx_runtime.jsx("div", {
    style: {
      position: "absolute",
      height: "100%",
      transform: `rotate(${turns}turn)`
    },
    children: /*#__PURE__*/jsx_runtime.jsx("div", {
      style: style
    })
  });
}
;// CONCATENATED MODULE: external "lodash"
const external_lodash_namespaceObject = require("lodash");
var external_lodash_default = /*#__PURE__*/__webpack_require__.n(external_lodash_namespaceObject);
// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(7518);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);
;// CONCATENATED MODULE: ./components/progress/progressCircle.tsx






function ProgressCircle({
  maxValue,
  minValue,
  value,
  innerText
}) {
  return /*#__PURE__*/jsx_runtime.jsx(Container, {
    children: /*#__PURE__*/jsx_runtime.jsx(external_react_circular_progressbar_namespaceObject.CircularProgressbarWithChildren, {
      value: value,
      text: innerText,
      minValue: minValue,
      maxValue: maxValue,
      styles: (0,external_react_circular_progressbar_namespaceObject.buildStyles)({
        strokeLinecap: "butt",
        textColor: "#3A79EC",
        pathColor: "#3A79EC",
        trailColor: "#d5d7da"
      }),
      strokeWidth: 10,
      children: external_lodash_default().range(10).map(index => {
        return /*#__PURE__*/jsx_runtime.jsx(Separator, {
          turns: index * 0.1,
          style: {
            background: "#fff",
            width: "2px",
            // This needs to be equal to props.strokeWidth
            height: `${10}%`
          }
        }, `range_${index}`);
      })
    })
  });
}
const Container = /*#__PURE__*/external_styled_components_default().div.withConfig({
  displayName: "progressCircle__Container",
  componentId: "sc-jefd7r-0"
})(["width:160px;"]);

/***/ }),

/***/ 3132:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ IsEmpty)
/* harmony export */ });
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4563);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7197);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5893);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_0__]);
_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





function IsEmpty({
  title
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(Container, {
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__.FontAwesomeIcon, {
      icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_0__.faTriangleExclamation,
      size: "lg"
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("p", {
      children: title
    })]
  });
}
const Container = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_2___default().div.withConfig({
  displayName: "isEmpty__Container",
  componentId: "sc-1uquj3w-0"
})(["height:100%;display:flex;flex-direction:column;justify-content:center;gap:8px;& path{color:#ff4d49;}& p{font-size:12px;color:#ff4d49;line-height:2;margin-top:10px;}"]);
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 835:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2062);
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mobx_react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3767);
/* harmony import */ var react_chartjs_2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(738);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2245);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_machine_RealTimeMachineItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2433);
/* harmony import */ var _components_container_pageContainer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7667);
/* harmony import */ var _components_machine_DoneSoonList__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9305);
/* harmony import */ var _components_layout_cardLayout__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7357);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(5893);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([chart_js__WEBPACK_IMPORTED_MODULE_2__, react_chartjs_2__WEBPACK_IMPORTED_MODULE_3__, _components_machine_DoneSoonList__WEBPACK_IMPORTED_MODULE_8__]);
([chart_js__WEBPACK_IMPORTED_MODULE_2__, react_chartjs_2__WEBPACK_IMPORTED_MODULE_3__, _components_machine_DoneSoonList__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);













chart_js__WEBPACK_IMPORTED_MODULE_2__.Chart.register(chart_js__WEBPACK_IMPORTED_MODULE_2__.CategoryScale, chart_js__WEBPACK_IMPORTED_MODULE_2__.LinearScale, chart_js__WEBPACK_IMPORTED_MODULE_2__.BarElement, chart_js__WEBPACK_IMPORTED_MODULE_2__.Title, chart_js__WEBPACK_IMPORTED_MODULE_2__.Tooltip, chart_js__WEBPACK_IMPORTED_MODULE_2__.Legend);

function MainView(props) {
  const machineViewModel = props.machineViewModel;
  const {
    0: time,
    1: setTime
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");

  const getFormattedTime = () => {
    return moment__WEBPACK_IMPORTED_MODULE_5___default()().format("YYYY.MM.DD HH:mm:ss");
  };

  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setTime(getFormattedTime());
    const interval = setInterval(() => {
      setTime(getFormattedTime());
    }, 1000);

    const initialize = async () => {
      await machineViewModel.getMachineList();
      machineViewModel.getProcessedQuantity();
    };

    initialize();
    return () => {
      clearInterval(interval);

      if (machineViewModel.socket?.socket?.readyState === WebSocket.OPEN) {
        machineViewModel.socket.disconnect();
      }
    };
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_components_container_pageContainer__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(Container.Time, {
      children: time
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(Container.RowFlex, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_components_layout_cardLayout__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
        style: {
          width: " 690px",
          height: "410px",
          alignItems: "center",
          justifyContent: "space-between",
          padding: " 24px"
        },
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(SectionTitle, {
          children: "\uAE30\uACC4\uBCC4 \uAC00\uACF5 \uC218\uB7C9"
        }), machineViewModel.processChart ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(react_chartjs_2__WEBPACK_IMPORTED_MODULE_3__.Bar, {
          options: machineViewModel.processChart.options,
          data: machineViewModel.processChart.data
        }) : /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx("div", {
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(SectionTitle, {
            children: "\uAC00\uACF5 \uAE30\uACC4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_components_layout_cardLayout__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
        style: {
          minWidth: "382px",
          gap: "32px",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px"
        },
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(SectionTitle, {
          children: "\uACF5\uC815 \uC784\uBC15 \uAE30\uACC4"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(_components_machine_DoneSoonList__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
          list: machineViewModel.machines
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_components_layout_cardLayout__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
      style: {
        margin: "0 auto",
        width: "1152px",
        alignItems: "center",
        gap: "32px",
        padding: "24px"
      },
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(SectionTitle, {
        children: "\uC804\uCCB4 \uACF5\uC815 \uD604\uD669"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(MachineWrap, {
        children: machineViewModel.machines.map((machine, key) => {
          return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(_components_machine_RealTimeMachineItem__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
            data: machine
          }, `real_time_machine_${key}`);
        })
      })]
    })]
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,mobx_react__WEBPACK_IMPORTED_MODULE_0__.inject)("machineViewModel")((0,mobx_react__WEBPACK_IMPORTED_MODULE_0__.observer)(MainView)));
const Container = {
  RowFlex: styled_components__WEBPACK_IMPORTED_MODULE_4___default().div.withConfig({
    displayName: "pages__RowFlex",
    componentId: "sc-u1kke2-0"
  })(["margin:0 auto;display:flex;gap:32px;& canvas{max-width:690px !important;max-height:428px !important;margin:-12px 0 0 -12px;}"]),
  Time: styled_components__WEBPACK_IMPORTED_MODULE_4___default().p.withConfig({
    displayName: "pages__Time",
    componentId: "sc-u1kke2-1"
  })(["width:100%;height:24px;text-align:center;font-size:20px;font-weight:600;margin-bottom:-16px;"])
};
const SectionTitle = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_4___default().p.withConfig({
  displayName: "pages__SectionTitle",
  componentId: "sc-u1kke2-2"
})(["width:100%;font-weight:600;text-align:center;"]);
const MachineWrap = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_4___default().div.withConfig({
  displayName: "pages__MachineWrap",
  componentId: "sc-u1kke2-3"
})(["display:grid;grid-template-rows:repeat(2,1fr);grid-template-columns:repeat(4,1fr);gap:24px;"]);
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1496:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   config: () => (/* binding */ config),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getServerSideProps: () => (/* binding */ getServerSideProps),
/* harmony export */   getStaticPaths: () => (/* binding */ getStaticPaths),
/* harmony export */   getStaticProps: () => (/* binding */ getStaticProps),
/* harmony export */   reportWebVitals: () => (/* binding */ reportWebVitals),
/* harmony export */   routeModule: () => (/* binding */ routeModule),
/* harmony export */   unstable_getServerProps: () => (/* binding */ unstable_getServerProps),
/* harmony export */   unstable_getServerSideProps: () => (/* binding */ unstable_getServerSideProps),
/* harmony export */   unstable_getStaticParams: () => (/* binding */ unstable_getStaticParams),
/* harmony export */   unstable_getStaticPaths: () => (/* binding */ unstable_getStaticPaths),
/* harmony export */   unstable_getStaticProps: () => (/* binding */ unstable_getStaticProps)
/* harmony export */ });
/* harmony import */ var next_dist_server_future_route_modules_pages_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3185);
/* harmony import */ var next_dist_server_future_route_modules_pages_module__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_pages_module__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5244);
/* harmony import */ var next_dist_build_webpack_loaders_next_route_loader_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7182);
/* harmony import */ var private_next_pages_document_tsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5539);
/* harmony import */ var private_next_pages_app_tsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3376);
/* harmony import */ var private_next_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(835);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([private_next_pages_app_tsx__WEBPACK_IMPORTED_MODULE_4__, private_next_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__]);
([private_next_pages_app_tsx__WEBPACK_IMPORTED_MODULE_4__, private_next_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
// @ts-ignore this need to be imported from next/dist to be external



// Import the app and document modules.
// @ts-expect-error - replaced by webpack/turbopack loader

// @ts-expect-error - replaced by webpack/turbopack loader

// Import the userland code.
// @ts-expect-error - replaced by webpack/turbopack loader

const PagesRouteModule = next_dist_server_future_route_modules_pages_module__WEBPACK_IMPORTED_MODULE_0__.PagesRouteModule;
// Re-export the component (should be the default export).
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_dist_build_webpack_loaders_next_route_loader_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .l)(private_next_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__, "default"));
// Re-export methods.
const getStaticProps = (0,next_dist_build_webpack_loaders_next_route_loader_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .l)(private_next_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__, "getStaticProps");
const getStaticPaths = (0,next_dist_build_webpack_loaders_next_route_loader_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .l)(private_next_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__, "getStaticPaths");
const getServerSideProps = (0,next_dist_build_webpack_loaders_next_route_loader_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .l)(private_next_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__, "getServerSideProps");
const config = (0,next_dist_build_webpack_loaders_next_route_loader_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .l)(private_next_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__, "config");
const reportWebVitals = (0,next_dist_build_webpack_loaders_next_route_loader_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .l)(private_next_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__, "reportWebVitals");
// Re-export legacy methods.
const unstable_getStaticProps = (0,next_dist_build_webpack_loaders_next_route_loader_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .l)(private_next_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__, "unstable_getStaticProps");
const unstable_getStaticPaths = (0,next_dist_build_webpack_loaders_next_route_loader_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .l)(private_next_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__, "unstable_getStaticPaths");
const unstable_getStaticParams = (0,next_dist_build_webpack_loaders_next_route_loader_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .l)(private_next_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__, "unstable_getStaticParams");
const unstable_getServerProps = (0,next_dist_build_webpack_loaders_next_route_loader_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .l)(private_next_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__, "unstable_getServerProps");
const unstable_getServerSideProps = (0,next_dist_build_webpack_loaders_next_route_loader_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .l)(private_next_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__, "unstable_getServerSideProps");
// Create and export the route module that will be consumed.
const routeModule = new PagesRouteModule({
    definition: {
        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__/* .RouteKind */ .x.PAGES,
        page: "/index",
        pathname: "/",
        // The following aren't used in production.
        bundlePath: "",
        filename: ""
    },
    components: {
        App: private_next_pages_app_tsx__WEBPACK_IMPORTED_MODULE_4__["default"],
        Document: private_next_pages_document_tsx__WEBPACK_IMPORTED_MODULE_3__["default"]
    },
    userland: private_next_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__
});

//# sourceMappingURL=pages.js.map
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1121:
/***/ (() => {



/***/ }),

/***/ 7197:
/***/ ((module) => {

"use strict";
module.exports = require("@fortawesome/react-fontawesome");

/***/ }),

/***/ 136:
/***/ ((module) => {

"use strict";
module.exports = require("class-transformer");

/***/ }),

/***/ 6211:
/***/ ((module) => {

"use strict";
module.exports = require("mobx");

/***/ }),

/***/ 2062:
/***/ ((module) => {

"use strict";
module.exports = require("mobx-react");

/***/ }),

/***/ 2245:
/***/ ((module) => {

"use strict";
module.exports = require("moment");

/***/ }),

/***/ 3076:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/future/route-modules/route-module.js");

/***/ }),

/***/ 4140:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/get-page-files.js");

/***/ }),

/***/ 9716:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/htmlescape.js");

/***/ }),

/***/ 3100:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/render.js");

/***/ }),

/***/ 6368:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/utils.js");

/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 6724:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/constants.js");

/***/ }),

/***/ 8743:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/html-context.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 1109:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-local-url.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 7782:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-href.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 3236:
/***/ ((module) => {

"use strict";
module.exports = require("reflect-metadata");

/***/ }),

/***/ 1571:
/***/ ((module) => {

"use strict";
module.exports = require("sha256");

/***/ }),

/***/ 7518:
/***/ ((module) => {

"use strict";
module.exports = require("styled-components");

/***/ }),

/***/ 271:
/***/ ((module) => {

"use strict";
module.exports = require("sweetalert2");

/***/ }),

/***/ 2765:
/***/ ((module) => {

"use strict";
module.exports = import("@fortawesome/free-regular-svg-icons");;

/***/ }),

/***/ 4563:
/***/ ((module) => {

"use strict";
module.exports = import("@fortawesome/free-solid-svg-icons");;

/***/ }),

/***/ 9648:
/***/ ((module) => {

"use strict";
module.exports = import("axios");;

/***/ }),

/***/ 3767:
/***/ ((module) => {

"use strict";
module.exports = import("chart.js");;

/***/ }),

/***/ 738:
/***/ ((module) => {

"use strict";
module.exports = import("react-chartjs-2");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [783,746,700,409], () => (__webpack_exec__(1496)));
module.exports = __webpack_exports__;

})();