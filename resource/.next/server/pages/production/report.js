"use strict";
(() => {
var exports = {};
exports.id = 663;
exports.ids = [663];
exports.modules = {

/***/ 7114:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ InformationBadge)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5893);



function InformationBadge({
  title,
  desc,
  style
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(Container, {
    style: style,
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(Title, {
      children: title
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(Desc, {
      children: desc
    })]
  });
}
const Container = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "informationBadge__Container",
  componentId: "sc-3fd637-0"
})(["border-radius:6px;overflow:hidden;font-size:14px !important;"]);
const Title = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_0___default().p.withConfig({
  displayName: "informationBadge__Title",
  componentId: "sc-3fd637-1"
})(["padding:4px 12px;background:#e7effd;text-align:center;font-weight:700 !important;"]);
const Desc = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_0___default().p.withConfig({
  displayName: "informationBadge__Desc",
  componentId: "sc-3fd637-2"
})(["padding:4px 12px;background:#f5f8fe;color:#4c4e64;text-align:center;font-weight:400 !important;"]);

/***/ }),

/***/ 5450:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ LotBarChart)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_chartjs_2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(738);
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3767);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _src_modules_chart_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8356);
/* harmony import */ var _src_modules_time_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5893);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_chartjs_2__WEBPACK_IMPORTED_MODULE_1__, chart_js__WEBPACK_IMPORTED_MODULE_2__]);
([react_chartjs_2__WEBPACK_IMPORTED_MODULE_1__, chart_js__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








chart_js__WEBPACK_IMPORTED_MODULE_2__.Chart.register(chart_js__WEBPACK_IMPORTED_MODULE_2__.LinearScale, chart_js__WEBPACK_IMPORTED_MODULE_2__.CategoryScale, chart_js__WEBPACK_IMPORTED_MODULE_2__.BarElement, chart_js__WEBPACK_IMPORTED_MODULE_2__.PointElement, chart_js__WEBPACK_IMPORTED_MODULE_2__.LineElement, chart_js__WEBPACK_IMPORTED_MODULE_2__.Tooltip, chart_js__WEBPACK_IMPORTED_MODULE_2__.LineController, chart_js__WEBPACK_IMPORTED_MODULE_2__.BarController);
function LotBarChart({
  data = [],
  averageLotTime
}) {
  //교체시간을 달성율로 변환하는 함수
  const calculateProgressPercent = (numbers, criteria) => {
    const progressPercent = numbers.map(time => {
      const percent = criteria / time * 100;
      return Math.round(percent);
    });
    return progressPercent;
  }; //ms의 시간을 sec로 변환


  const dataArray = data.map(lot => lot.idle / 1000); //infinite를 제거하고 달성율 변환

  const persents = calculateProgressPercent(dataArray.filter(value => Number.isFinite(value)), averageLotTime); // Bar의 배경색을 결정하는 함수

  const getBarBackgroundColor = value => {
    return value > 100 ? "rgb(125, 134, 153)" : "rgb(255, 77, 73)";
  };

  const chartData = {
    labels: persents.map((_, index) => index + 1),
    datasets: [{
      label: "Data",
      data: persents,
      backgroundColor: persents.map(value => getBarBackgroundColor(value))
    }]
  };
  const chartOptions = _src_modules_chart_module__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z.setChart({
    tooltip: {
      callbacks: {
        title: () => "",
        label: context => {
          const target = data[context.dataIndex];
          const labelA = `교체시점 : ${target.end}`;
          const labelB = `교체준비시간 : ${_src_modules_time_module__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z.msToHHMM(target.idle)}`;
          const labelC = `교체효율 : ${persents[context.dataIndex]}%`;
          return [labelA, labelB, labelC];
        }
      }
    },
    x: {
      display: false,
      grid: {
        display: false
      },
      ticks: {
        display: false
      },
      max: 45,
      // 축의 최대값을 강제합니다.
      min: 0 // 축의 최소값을 강제합니다.

    },
    y: {
      display: false,
      grid: {
        display: false
      },
      ticks: {
        display: false
      },
      beginAtZero: true,
      max: 200,
      min: 0
    },
    aspect: false
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(Container, {
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx(TitleBadge, {
      children: "\uC900\uBE44\uAD50\uCCB4 \uADF8\uB798\uD504"
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx(CrossLine, {}), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx(ChartWrap, {
      count: data.length,
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx(react_chartjs_2__WEBPACK_IMPORTED_MODULE_1__.Bar, {
        data: chartData,
        options: chartOptions
      })
    })]
  });
}
const Container = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_3___default().div.withConfig({
  displayName: "lotBarChart__Container",
  componentId: "sc-dcvhoo-0"
})(["position:relative;"]);
const ChartWrap = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_3___default().div.withConfig({
  displayName: "lotBarChart__ChartWrap",
  componentId: "sc-dcvhoo-1"
})(["position:relative;overflow-y:hidden;overflow-x:auto;height:104px;max-width:100%;margin-top:32px;& canvas{position:relative;width:100% !important;min-width:", "px !important;max-height:100%;}"], ({
  count
}) => count * 6);
const CrossLine = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_3___default().div.withConfig({
  displayName: "lotBarChart__CrossLine",
  componentId: "sc-dcvhoo-2"
})(["position:absolute;top:61%;z-index:1;width:100%;border:1px dashed orange;"]);
const TitleBadge = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_3___default().div.withConfig({
  displayName: "lotBarChart__TitleBadge",
  componentId: "sc-dcvhoo-3"
})(["position:absolute;right:16px;top:0px;border:1px solid #eaeaec;background:none;border-radius:8px;padding:4px 16px;font-size:14px;font-weight:700;"]);
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 15:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ ReportCard)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _button_defaultButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7173);
/* harmony import */ var _src_modules_time_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1786);
/* harmony import */ var _badge_informationBadge__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7114);
/* harmony import */ var _progress_progressBar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(862);
/* harmony import */ var _chart_lotBarChart__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5450);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7197);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4563);
/* harmony import */ var _layout_cardLayout__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7357);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(5893);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_chart_lotBarChart__WEBPACK_IMPORTED_MODULE_5__, _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_8__]);
([_chart_lotBarChart__WEBPACK_IMPORTED_MODULE_5__, _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);













function ReportCard({
  data,
  lot,
  active,
  onClickLotToggle
}) {
  const {
    0: notWorkTime,
    1: setNotWorkTime
  } = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(0);
  (0,react__WEBPACK_IMPORTED_MODULE_6__.useEffect)(() => {
    setNotWorkTime(_src_modules_time_module__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.getTimeDifferenceInMs(data.data[active].start, data.data[active].end) - data.data[active].total);
  }, [active]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(Container, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(Title.Wrap, {
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(Title.MachineNumber, {
        children: data.machineNo
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(Title.MachineName, {
        children: data.name
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_layout_cardLayout__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(LayoutTitle, {
        children: "\uC624\uB298\uC758 \uC870\uC5C5\uC2DC\uAC04"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx("p", {
        children: `시작시간 : ${data.data[0].start}`
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx("p", {
        children: `종료시간 : ${data.data[data.data.length - 1].end}`
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_layout_cardLayout__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(LayoutTitle, {
        children: "LOT \uBCC0\uACBD"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.Fragment, {
        children: data.data.map((settingData, key) => {
          const isNotFirst = key !== 0;
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
            children: [isNotFirst && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(LotChange.Item, {
              className: "is_not_first",
              children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(LotChange.Program, {
                children: "\uC138\uD305\uBCC0\uACBD \uC2DC\uAC04"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(LotChange.Time, {
                children: `${data.data[key - 1].end} ~ ${settingData.start}`
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(LotChange.Item, {
              children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(LotChange.Program, {
                children: settingData.program
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(LotChange.Time, {
                children: `${settingData.start} ~ ${settingData.end}`
              })]
            })]
          }, `lot_item_${key}`);
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_layout_cardLayout__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(ManageCycleTime.ButtonWrap, {
        children: data.data.map((settingData, key) => {
          console.log(active, key, active === key);
          return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(_button_defaultButton__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
            title: settingData.program.split("(")[0],
            onClick: onClickLotToggle,
            dataId: data.machineNo,
            value: key,
            isActive: +active === key,
            dynamic: true,
            alwaysHandling: true,
            style: {
              width: "80px",
              height: "38px",
              fontSize: "14px",
              fontWeight: "500"
            },
            activeColor: "#3A79EC",
            disableColor: "#63657860"
          }, `program_data_button_${key}`);
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(ManageCycleTime.CycleMonitor, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(ManageCycleTime.Time, {
            children: _src_modules_time_module__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.secToMMSS(data.data[active].active + data.data[active].idle)
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(ManageCycleTime.Title, {
            children: "\uC2E4 Cycle Time"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(ManageCycleTime.BadgeWrap, {
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(_badge_informationBadge__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
            title: "\uD45C\uC900\uC2DC\uAC04",
            desc: "00:02:01"
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(_badge_informationBadge__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
            title: "\uC131\uCDE8\uC728",
            desc: "97%"
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(ManageCycleTime.OperationCount, {
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(ManageCycleTime.Title, {
          children: "\uAC00\uACF5\uAC1C\uC218"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(ManageCycleTime.Title, {
          children: `${data.data[active].count} / ${data.data[active].plan}`
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(_progress_progressBar__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
          value: data.data[active].count / data.data[active].plan * 100
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(ManageCycleTime.DoneTime, {
          children: "\uAC00\uACF5\uC644\uB8CC \uC608\uC815\uC2DC\uAC04 : 0000"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(ManageCycleTime.AverageItem, {
          className: "production_time",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx("p", {
            children: "\uD3C9\uADE0\uB2E8\uD488 \uAC00\uACF5"
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx("p", {
            children: _src_modules_time_module__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.secToMMSS(data.data[active].active)
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(ManageCycleTime.AverageItem, {
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx("p", {
            children: "\uD3C9\uADE0\uAD50\uCCB4 \uC900\uBE44"
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx("p", {
            children: _src_modules_time_module__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.secToMMSS(data.data[active].idle)
          })]
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_layout_cardLayout__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
      children: [lot && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(_chart_lotBarChart__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
        data: lot[data.data[active].lot],
        averageLotTime: data.data[active].idle
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(_progress_progressBar__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
        value: Math.round(data.data[active].total / (data.data[active].total + notWorkTime) * 10000) / 100,
        baseColor: "red"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(Graph.PercentWrap, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(Graph.MachineWorkIcon, {
              icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_8__.faGear,
              className: "work"
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx("p", {
              children: "\uAC00\uB3D9\uC2DC\uAC04"
            })]
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(Graph.Percent, {
            className: "work",
            children: `${Math.round(data.data[active].total / (data.data[active].total + notWorkTime) * 10000) / 100}%`
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(Graph.Time, {
            children: _src_modules_time_module__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.msToHHMM(data.data[active].total)
          })]
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(Graph.VersusWrap, {
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx("p", {
            children: "vs"
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(Graph.MachineWorkIcon, {
              icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_8__.faBuildingCircleXmark,
              className: "not_work"
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx("p", {
              children: "\uBE44\uAC00\uB3D9\uC2DC\uAC04"
            })]
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(Graph.Percent, {
            className: "not_work",
            children: `${Math.round(notWorkTime / (data.data[active].total + notWorkTime) * 10000) / 100}%`
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(Graph.Time, {
            children: _src_modules_time_module__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.msToHHMM(notWorkTime)
          })]
        })]
      })]
    })]
  });
}
const Container = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "reportCard__Container",
  componentId: "sc-f60qd1-0"
})(["padding:8px;background:#fff;border-radius:8px;box-shadow:0 2px 8px rgba(76,78,100,0.22);transition:all 0.4s ease;display:flex;flex-direction:column;gap:12px;height:fit-content;margin-bottom:16px;"]);
const LayoutTitle = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_0___default().h4.withConfig({
  displayName: "reportCard__LayoutTitle",
  componentId: "sc-f60qd1-1"
})(["font-size:18px;font-weight:700;"]);
const Title = {
  Wrap: styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
    displayName: "reportCard__Wrap",
    componentId: "sc-f60qd1-2"
  })(["display:flex;align-items:center;gap:10px;"]),
  MachineNumber: styled_components__WEBPACK_IMPORTED_MODULE_0___default().p.withConfig({
    displayName: "reportCard__MachineNumber",
    componentId: "sc-f60qd1-3"
  })(["width:32px;height:32px;background:#6ebd33;color:#fff;font-weight:600;font-size:20px;line-height:32px;text-align:center;border-radius:4px;"]),
  MachineName: styled_components__WEBPACK_IMPORTED_MODULE_0___default().p.withConfig({
    displayName: "reportCard__MachineName",
    componentId: "sc-f60qd1-4"
  })(["padding-top:6px;font-size:28px;font-weight:600;line-height:32px;"])
};
const LotChange = {
  Item: styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
    displayName: "reportCard__Item",
    componentId: "sc-f60qd1-5"
  })(["display:flex;align-items:center;justify-content:space-between;margin-top:-4px;padding-bottom:8px;border-bottom:1px solid #eaeaec;& *{color:#4c4e64;word-break:break-word;}&.is_not_first{margin-bottom:16px;}"]),
  Program: styled_components__WEBPACK_IMPORTED_MODULE_0___default().p.withConfig({
    displayName: "reportCard__Program",
    componentId: "sc-f60qd1-6"
  })(["font-weight:400;font-size:14px;width:100%;letter-spacing:0.6px;"]),
  Time: styled_components__WEBPACK_IMPORTED_MODULE_0___default().p.withConfig({
    displayName: "reportCard__Time",
    componentId: "sc-f60qd1-7"
  })(["width:100%;font-weight:400;font-size:14px;text-align:right;"])
};
const ManageCycleTime = {
  ButtonWrap: styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
    displayName: "reportCard__ButtonWrap",
    componentId: "sc-f60qd1-8"
  })(["display:flex;gap:12px;"]),
  CycleMonitor: styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
    displayName: "reportCard__CycleMonitor",
    componentId: "sc-f60qd1-9"
  })(["display:flex;align-items:center;justify-content:space-between;"]),
  Time: styled_components__WEBPACK_IMPORTED_MODULE_0___default().p.withConfig({
    displayName: "reportCard__Time",
    componentId: "sc-f60qd1-10"
  })(["font-size:40px;font-weight:600 !important;line-height:1;"]),
  Title: styled_components__WEBPACK_IMPORTED_MODULE_0___default().p.withConfig({
    displayName: "reportCard__Title",
    componentId: "sc-f60qd1-11"
  })(["font-size:16px;font-weight:700 !important;line-height:1;"]),
  BadgeWrap: styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
    displayName: "reportCard__BadgeWrap",
    componentId: "sc-f60qd1-12"
  })(["display:flex;gap:8px;"]),
  OperationCount: styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
    displayName: "reportCard__OperationCount",
    componentId: "sc-f60qd1-13"
  })(["display:flex;flex-direction:column;gap:4px;"]),
  DoneTime: styled_components__WEBPACK_IMPORTED_MODULE_0___default().p.withConfig({
    displayName: "reportCard__DoneTime",
    componentId: "sc-f60qd1-14"
  })(["padding:8px 0;font-size:14px;font-weight:400;color:#4c4e64;"]),
  AverageItem: styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
    displayName: "reportCard__AverageItem",
    componentId: "sc-f60qd1-15"
  })(["display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #eaeaec;padding:8px 0;& p{font-weight:400;font-size:14px;color:#4c4e64;}&.production_time{border-top:1px solid #eaeaec;}"])
};
const Graph = {
  PercentWrap: styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
    displayName: "reportCard__PercentWrap",
    componentId: "sc-f60qd1-16"
  })(["display:flex;align-items:center;justify-content:space-between;& > div{display:flex;flex-direction:column;& > div{display:flex;align-items:center;gap:8px;font-size:14px;font-weight:400 !important;color:#4c4e64 !important;margin-bottom:8px;}}& > div:first-child{align-items:start;}& > div:last-child{align-items:end;}"]),
  MachineWorkIcon: styled_components__WEBPACK_IMPORTED_MODULE_0___default()(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__.FontAwesomeIcon).withConfig({
    displayName: "reportCard__MachineWorkIcon",
    componentId: "sc-f60qd1-17"
  })(["width:16px;height:16px;padding:6px;display:flex;align-itmes:center;justify-content:center;border-radius:4px;&.work{& path{fill:rgba(58,121,236,100);}background:rgb(225 236 255);}&.not_work{& path{fill:rgba(255,58,58,54);}background:rgb(255 236 236);}"]),
  Percent: styled_components__WEBPACK_IMPORTED_MODULE_0___default().p.withConfig({
    displayName: "reportCard__Percent",
    componentId: "sc-f60qd1-18"
  })(["font-size:20px;&.work{color:#3a79ec;}&.not_work{color:#ff4d49;}"]),
  Time: styled_components__WEBPACK_IMPORTED_MODULE_0___default().p.withConfig({
    displayName: "reportCard__Time",
    componentId: "sc-f60qd1-19"
  })(["font-weight:400;font-size:12px;color:#4c4e64 !important;"]),
  VersusWrap: styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
    displayName: "reportCard__VersusWrap",
    componentId: "sc-f60qd1-20"
  })(["position:relative;height:74px;border:0.8px solid #eaeaec;opacity:0.8;& p{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:#eaeaec;border-radius:50%;width:20px;height:20px;line-height:20px;font-weight:400;text-align:center;font-size:14px;color:#4c4e64;}"])
};
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 862:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ ProgressBar)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5893);


function ProgressBar({
  value = 0,
  activeColor = "rgb(58, 121, 236)",
  baseColor = "#edeff1"
}) {
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(Progress, {
    baseColor: baseColor,
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(Dealt, {
      value: value > 100 ? 100 : value,
      activeColor: activeColor
    })
  });
}
const Progress = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "progressBar__Progress",
  componentId: "sc-7cgpns-0"
})(["width:100%;height:10px;background-color:", " !important;border-radius:8px;"], ({
  baseColor
}) => baseColor);
const Dealt = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "progressBar__Dealt",
  componentId: "sc-7cgpns-1"
})(["border-radius:8px;background-color:", " !important;width:", ";height:100%;transition:all 0.4s ease;"], ({
  activeColor
}) => activeColor, props => props.value + "%");

/***/ }),

/***/ 46:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_container_pageContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7667);
/* harmony import */ var _components_header_singleDatePickHeader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8681);
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2062);
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(mobx_react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_machine_reportCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(15);
/* harmony import */ var _components_input_selector__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7498);
/* harmony import */ var _components_input_selectorOption__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9383);
/* harmony import */ var react_masonry_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7125);
/* harmony import */ var react_masonry_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_masonry_css__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5893);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_header_singleDatePickHeader__WEBPACK_IMPORTED_MODULE_2__, _components_machine_reportCard__WEBPACK_IMPORTED_MODULE_5__]);
([_components_header_singleDatePickHeader__WEBPACK_IMPORTED_MODULE_2__, _components_machine_reportCard__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);













function ReportView(props) {
  const reportViewModel = props.reportViewModel;
  const breakPointColsObject = {
    default: 3,
    1440: 2,
    820: 1
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    reportViewModel.InsertProductList();
    return () => {
      reportViewModel.dataReset();
    };
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_components_container_pageContainer__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
    style: {
      gap: "16px",
      overflow: "auto"
    },
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(_components_header_singleDatePickHeader__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
      value: reportViewModel.productModel.day,
      onChange: reportViewModel.handleChangeDay,
      onClick: reportViewModel.handleClickDay,
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(_components_input_selector__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
        onChange: reportViewModel.handleChangeFilter,
        style: {
          backgroundImage: `linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%)`,
          backgroundPosition: `calc(100% - 20px) calc(1em + 2px),
    calc(100% - 12px) calc(1em + 2px), calc(100% - 2.5em) 0.5em`,
          width: "182px",
          height: "42px"
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.Fragment, {
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(_components_input_selectorOption__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
            title: "\uC804\uCCB4\uBCF4\uAE30",
            value: 0,
            selected: true
          }), reportViewModel.products.map((product, key) => {
            return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(_components_input_selectorOption__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
              title: `${product.machineNo}. ${product.name}`,
              value: product.machineNo
            }, `filter_options_${product.name}_${key}`);
          })]
        })
      })
    }), reportViewModel.lotList && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(ReportCardWrap, {
      breakpointCols: breakPointColsObject,
      className: "report_cards_grid",
      columnClassName: "report_cards_column_grid",
      children: reportViewModel.products.map((product, key) => {
        const isFiltered = reportViewModel.filterTarget === 0 ? false : reportViewModel.filterTarget !== +product.machineNo ? true : false;
        if (!isFiltered) return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(_components_machine_reportCard__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
          data: product,
          lot: reportViewModel.lotList[product.machineNo],
          onClickLotToggle: reportViewModel.handleClickLotToggle,
          active: product.toggle
        }, `report_card_${product.name}_${key}`);
      })
    })]
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,mobx_react__WEBPACK_IMPORTED_MODULE_3__.inject)("reportViewModel")((0,mobx_react__WEBPACK_IMPORTED_MODULE_3__.observer)(ReportView)));
const ReportCardWrap = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_4___default()((react_masonry_css__WEBPACK_IMPORTED_MODULE_8___default())).withConfig({
  displayName: "report__ReportCardWrap",
  componentId: "sc-iezymz-0"
})(["display:flex;gap:16px;"]);
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1491:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var private_next_pages_production_report_tsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(46);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([private_next_pages_app_tsx__WEBPACK_IMPORTED_MODULE_4__, private_next_pages_production_report_tsx__WEBPACK_IMPORTED_MODULE_5__]);
([private_next_pages_app_tsx__WEBPACK_IMPORTED_MODULE_4__, private_next_pages_production_report_tsx__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
// @ts-ignore this need to be imported from next/dist to be external



// Import the app and document modules.
// @ts-expect-error - replaced by webpack/turbopack loader

// @ts-expect-error - replaced by webpack/turbopack loader

// Import the userland code.
// @ts-expect-error - replaced by webpack/turbopack loader

const PagesRouteModule = next_dist_server_future_route_modules_pages_module__WEBPACK_IMPORTED_MODULE_0__.PagesRouteModule;
// Re-export the component (should be the default export).
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_dist_build_webpack_loaders_next_route_loader_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .l)(private_next_pages_production_report_tsx__WEBPACK_IMPORTED_MODULE_5__, "default"));
// Re-export methods.
const getStaticProps = (0,next_dist_build_webpack_loaders_next_route_loader_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .l)(private_next_pages_production_report_tsx__WEBPACK_IMPORTED_MODULE_5__, "getStaticProps");
const getStaticPaths = (0,next_dist_build_webpack_loaders_next_route_loader_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .l)(private_next_pages_production_report_tsx__WEBPACK_IMPORTED_MODULE_5__, "getStaticPaths");
const getServerSideProps = (0,next_dist_build_webpack_loaders_next_route_loader_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .l)(private_next_pages_production_report_tsx__WEBPACK_IMPORTED_MODULE_5__, "getServerSideProps");
const config = (0,next_dist_build_webpack_loaders_next_route_loader_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .l)(private_next_pages_production_report_tsx__WEBPACK_IMPORTED_MODULE_5__, "config");
const reportWebVitals = (0,next_dist_build_webpack_loaders_next_route_loader_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .l)(private_next_pages_production_report_tsx__WEBPACK_IMPORTED_MODULE_5__, "reportWebVitals");
// Re-export legacy methods.
const unstable_getStaticProps = (0,next_dist_build_webpack_loaders_next_route_loader_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .l)(private_next_pages_production_report_tsx__WEBPACK_IMPORTED_MODULE_5__, "unstable_getStaticProps");
const unstable_getStaticPaths = (0,next_dist_build_webpack_loaders_next_route_loader_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .l)(private_next_pages_production_report_tsx__WEBPACK_IMPORTED_MODULE_5__, "unstable_getStaticPaths");
const unstable_getStaticParams = (0,next_dist_build_webpack_loaders_next_route_loader_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .l)(private_next_pages_production_report_tsx__WEBPACK_IMPORTED_MODULE_5__, "unstable_getStaticParams");
const unstable_getServerProps = (0,next_dist_build_webpack_loaders_next_route_loader_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .l)(private_next_pages_production_report_tsx__WEBPACK_IMPORTED_MODULE_5__, "unstable_getServerProps");
const unstable_getServerSideProps = (0,next_dist_build_webpack_loaders_next_route_loader_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .l)(private_next_pages_production_report_tsx__WEBPACK_IMPORTED_MODULE_5__, "unstable_getServerSideProps");
// Create and export the route module that will be consumed.
const routeModule = new PagesRouteModule({
    definition: {
        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__/* .RouteKind */ .x.PAGES,
        page: "/production/report",
        pathname: "/production/report",
        // The following aren't used in production.
        bundlePath: "",
        filename: ""
    },
    components: {
        App: private_next_pages_app_tsx__WEBPACK_IMPORTED_MODULE_4__["default"],
        Document: private_next_pages_document_tsx__WEBPACK_IMPORTED_MODULE_3__["default"]
    },
    userland: private_next_pages_production_report_tsx__WEBPACK_IMPORTED_MODULE_5__
});

//# sourceMappingURL=pages.js.map
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7197:
/***/ ((module) => {

module.exports = require("@fortawesome/react-fontawesome");

/***/ }),

/***/ 136:
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),

/***/ 129:
/***/ ((module) => {

module.exports = require("date-fns/locale/ko");

/***/ }),

/***/ 6211:
/***/ ((module) => {

module.exports = require("mobx");

/***/ }),

/***/ 2062:
/***/ ((module) => {

module.exports = require("mobx-react");

/***/ }),

/***/ 2245:
/***/ ((module) => {

module.exports = require("moment");

/***/ }),

/***/ 3076:
/***/ ((module) => {

module.exports = require("next/dist/server/future/route-modules/route-module.js");

/***/ }),

/***/ 4140:
/***/ ((module) => {

module.exports = require("next/dist/server/get-page-files.js");

/***/ }),

/***/ 9716:
/***/ ((module) => {

module.exports = require("next/dist/server/htmlescape.js");

/***/ }),

/***/ 3100:
/***/ ((module) => {

module.exports = require("next/dist/server/render.js");

/***/ }),

/***/ 6368:
/***/ ((module) => {

module.exports = require("next/dist/server/utils.js");

/***/ }),

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 6724:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/constants.js");

/***/ }),

/***/ 8743:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/html-context.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 1109:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-local-url.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 7782:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-href.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 983:
/***/ ((module) => {

module.exports = require("react-datepicker");

/***/ }),

/***/ 7125:
/***/ ((module) => {

module.exports = require("react-masonry-css");

/***/ }),

/***/ 3236:
/***/ ((module) => {

module.exports = require("reflect-metadata");

/***/ }),

/***/ 1571:
/***/ ((module) => {

module.exports = require("sha256");

/***/ }),

/***/ 7518:
/***/ ((module) => {

module.exports = require("styled-components");

/***/ }),

/***/ 271:
/***/ ((module) => {

module.exports = require("sweetalert2");

/***/ }),

/***/ 2765:
/***/ ((module) => {

module.exports = import("@fortawesome/free-regular-svg-icons");;

/***/ }),

/***/ 4563:
/***/ ((module) => {

module.exports = import("@fortawesome/free-solid-svg-icons");;

/***/ }),

/***/ 9648:
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ 3767:
/***/ ((module) => {

module.exports = import("chart.js");;

/***/ }),

/***/ 738:
/***/ ((module) => {

module.exports = import("react-chartjs-2");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [783,746,700,92,681], () => (__webpack_exec__(1491)));
module.exports = __webpack_exports__;

})();