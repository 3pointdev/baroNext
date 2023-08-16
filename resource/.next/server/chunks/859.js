exports.id = 859;
exports.ids = [859];
exports.modules = {

/***/ 7667:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ PageContainer)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5893);


function PageContainer({
  style,
  children
}) {
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(Container, {
    style: style,
    children: children
  });
}
const Container = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "pageContainer__Container",
  componentId: "sc-sctx8k-0"
})(["margin:0 auto;width:calc(100vw - 32px);height:calc(100vh - 176px);background:#f7f7f9;padding:24px 16px;display:flex;flex-direction:column;gap:32px;min-width:604px;"]);

/***/ }),

/***/ 306:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ RangeDatePicker)
/* harmony export */ });
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4563);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7197);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_datepicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(983);
/* harmony import */ var react_datepicker__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_datepicker__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_datepicker_dist_react_datepicker_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5994);
/* harmony import */ var react_datepicker_dist_react_datepicker_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_datepicker_dist_react_datepicker_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var date_fns_locale_ko__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(129);
/* harmony import */ var date_fns_locale_ko__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(date_fns_locale_ko__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2765);
/* harmony import */ var _config_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5981);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5893);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_0__, _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_6__]);
([_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_0__, _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










function RangeDatePicker({
  start,
  end,
  onChange
}) {
  const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

  const getDayName = date => {
    return date.toLocaleDateString("ko-KR", {
      weekday: "long"
    }).substr(0, 1);
  };

  const createDate = date => {
    return new Date(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0));
  };

  const handleStartDate = date => {
    onChange(date, _config_constants__WEBPACK_IMPORTED_MODULE_7__/* .DatePickerRangeType */ .wg.START);
  };

  const handleEndDate = date => {
    onChange(date, _config_constants__WEBPACK_IMPORTED_MODULE_7__/* .DatePickerRangeType */ .wg.END);
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(Container, {
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(StartCalendarIcon, {
      icon: _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_6__.faCalendar
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(Picker, {
      selectsStart: true,
      endDate: new Date(end),
      dateFormat: "yyyy-MM-dd",
      onKeyDown: e => e.preventDefault(),
      locale: (date_fns_locale_ko__WEBPACK_IMPORTED_MODULE_5___default()),
      showPopperArrow: false,
      fixedHeight: true,
      selected: new Date(start),
      onChange: handleStartDate,
      maxDate: new Date(),
      dayClassName: date => {
        const dayName = getDayName(createDate(date));
        return dayName === "토" ? "saturday" : dayName === "일" ? "sunday" : "";
      },
      renderCustomHeader: ({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled
      }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(Calendar.Header, {
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(Calendar.Button, {
          onClick: decreaseMonth,
          disabled: prevMonthButtonDisabled,
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__.FontAwesomeIcon, {
            icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_0__.faAngleLeft
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "custom-month",
          children: [date.getFullYear(), "\uB144 ", months[date.getMonth()]]
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(Calendar.Button, {
          onClick: increaseMonth,
          disabled: nextMonthButtonDisabled,
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__.FontAwesomeIcon, {
            icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_0__.faAngleRight
          })
        })]
      })
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("p", {
      children: "~"
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(EndCalendarIcon, {
      icon: _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_6__.faCalendar
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(Picker, {
      selectsEnd: true,
      startDate: new Date(start),
      minDate: new Date(start),
      dateFormat: "yyyy-MM-dd",
      onKeyDown: e => e.preventDefault(),
      locale: (date_fns_locale_ko__WEBPACK_IMPORTED_MODULE_5___default()),
      showPopperArrow: false,
      fixedHeight: true,
      selected: new Date(end),
      onChange: handleEndDate,
      maxDate: new Date(),
      dayClassName: date => {
        const dayName = getDayName(createDate(date));
        return dayName === "토" ? "saturday" : dayName === "일" ? "sunday" : "";
      },
      renderCustomHeader: ({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled
      }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(Calendar.Header, {
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(Calendar.Button, {
          onClick: decreaseMonth,
          disabled: prevMonthButtonDisabled,
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__.FontAwesomeIcon, {
            icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_0__.faAngleLeft
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "custom-month",
          children: [date.getFullYear(), "\uB144 ", months[date.getMonth()]]
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(Calendar.Button, {
          onClick: increaseMonth,
          disabled: nextMonthButtonDisabled,
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__.FontAwesomeIcon, {
            icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_0__.faAngleRight
          })
        })]
      })
    })]
  });
}
const Container = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_4___default().div.withConfig({
  displayName: "rangeDatePicker__Container",
  componentId: "sc-1o94o81-0"
})(["position:relative;display:flex;gap:16px;align-items:center;& .react-datepicker__tab-loop{z-index:101;position:absolute;& .react-datepicker{box-shadow:0 2px 8px rgba(76,78,100,0.22);border:0;}}& .react-datepicker__header{background:none;border:0;height:52px;& .react-datepicker__day-names{height:36px;display:flex;align-items:end;justify-content:center;}}& .react-datepicker__day-names *{color:gray;}& .react-datepicker__day{&.saturday{color:blue;}&.sunday{color:red;}&[aria-disabled=\"true\"]{opacity:0.5;}&.react-datepicker__day--outside-month{color:lightgray !important;}}"]);
const IconSetting = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_4___default()(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__.FontAwesomeIcon).withConfig({
  displayName: "rangeDatePicker__IconSetting",
  componentId: "sc-1o94o81-1"
})(["z-index:1;position:absolute;top:50%;width:16px;height:16px;font-size:16px;transform:translate(0,-50%);"]);
const StartCalendarIcon = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_4___default()(IconSetting).withConfig({
  displayName: "rangeDatePicker__StartCalendarIcon",
  componentId: "sc-1o94o81-2"
})(["left:8px;"]);
const EndCalendarIcon = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_4___default()(IconSetting).withConfig({
  displayName: "rangeDatePicker__EndCalendarIcon",
  componentId: "sc-1o94o81-3"
})(["right:156px;"]);
const Picker = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_4___default()((react_datepicker__WEBPACK_IMPORTED_MODULE_2___default())).withConfig({
  displayName: "rangeDatePicker__Picker",
  componentId: "sc-1o94o81-4"
})(["border:1px solid #d8d8dd;border-radius:8px;padding:6px 10px;height:28px;width:160px;background:#f2f2f2;font-size:16px;font-weight:400;line-height:24px;cursor:pointer;outline:none;caret-color:transparent;text-align:right;"]);
const Calendar = {
  Header: styled_components__WEBPACK_IMPORTED_MODULE_4___default().div.withConfig({
    displayName: "rangeDatePicker__Header",
    componentId: "sc-1o94o81-5"
  })(["display:flex;align-items:center;justify-content:space-around;font-size:16px;height:32px;"]),
  Button: styled_components__WEBPACK_IMPORTED_MODULE_4___default().button.withConfig({
    displayName: "rangeDatePicker__Button",
    componentId: "sc-1o94o81-6"
  })(["background:0;border:0;font-size:16px;cursor:pointer;&:disabled *{color:lightgray;cursor:default;}"])
};
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3945:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ RangeDatePickHeader)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _datePicker_rangeDatePicker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(306);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5893);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_datePicker_rangeDatePicker__WEBPACK_IMPORTED_MODULE_1__]);
_datePicker_rangeDatePicker__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




function RangeDatePickHeader({
  start,
  end,
  onChange,
  title,
  children,
  style,
  childrenStyle
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(Container, {
    style: style,
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(LeftSide.Wrap, {
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_datePicker_rangeDatePicker__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
        start: start,
        end: end,
        onChange: onChange
      })
    }), title && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(Title, {
      children: title
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(RightSide.Wrap, {
      style: childrenStyle,
      children: children
    })]
  });
}
const Container = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "rangeDatePickHeader__Container",
  componentId: "sc-9gw5yh-0"
})(["position:relative;flex-shrink:0;width:calc(100% - 32px);background:#fff;box-shadow:0 2px 8px rgba(76,78,100,0.22);border-radius:8px;height:70px;padding:0 16px;display:flex;align-items:center;justify-content:space-between;"]);
const LeftSide = {
  Wrap: styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
    displayName: "rangeDatePickHeader__Wrap",
    componentId: "sc-9gw5yh-1"
  })(["height:100%;display:flex;align-items:center;& span{text-align:center;width:110px;font-size:20px;font-weight:600;color:#4c4e64;}"])
};
const RightSide = {
  Wrap: styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
    displayName: "rangeDatePickHeader__Wrap",
    componentId: "sc-9gw5yh-2"
  })(["display:flex;gap:16px;"])
};
const Title = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_0___default().h2.withConfig({
  displayName: "rangeDatePickHeader__Title",
  componentId: "sc-9gw5yh-3"
})(["position:absolute;transform:translate(-50%,-50%);left:50%;top:50%;"]);
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8491:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ DefaultTable)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5893);





function DefaultTable({
  header,
  data,
  recordRef,
  isRowSpan = true,
  resultCount
}) {
  const {
    0: mergedCells,
    1: setMergedCells
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]); // 연속된 셀들을 찾는 함수 정의

  const findConsecutiveCells = columnName => {
    const mergedCells = [];
    let count = 1;

    for (let i = data.length - 1; i > 0; i--) {
      if (data[i][columnName] === data[i - 1][columnName]) {
        count++;
        mergedCells.push(0);
      } else {
        mergedCells.push(count);
        count = 1;
      }
    }

    mergedCells.push(count);
    return mergedCells;
  };

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isRowSpan) {
      const mergedArray = findConsecutiveCells(header[0].column);
      setMergedCells(mergedArray);
    }
  }, [data]);
  if (data.length < 1) return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {});
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(Table.Container, {
    ref: recordRef,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(Table.Head, {
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("tr", {
        children: header.map((head, key) => {
          return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("th", {
            align: head.align,
            style: {
              width: head.size
            },
            children: head.title
          }, `table_header_${head.title}_${key}`);
        })
      }), resultCount && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(ChildrenWrap, {
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("td", {
          children: resultCount
        })
      })]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(Table.Body, {
      children: data.map((item, key) => {
        return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("tr", {
          children: header.map((head, inkey) => {
            const isFirstData = head.column === header[0].column;
            const thisMergeCount = mergedCells[mergedCells.length - 1 - key];
            const shoudSkip = isFirstData && thisMergeCount === 0;
            if (shoudSkip) return;
            const shouldMerge = isFirstData && thisMergeCount > 0;
            return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("td", {
              align: head.align,
              rowSpan: isRowSpan && shouldMerge ? thisMergeCount : 1,
              className: head.column === header[0].column ? "first_child" : "",
              children: `${item[head.column]}`
            }, `table_body_row_data_${inkey}`);
          })
        }, `table_body_rows_${key}`);
      })
    })]
  });
}
const Table = {
  Container: styled_components__WEBPACK_IMPORTED_MODULE_1___default().table.withConfig({
    displayName: "defaultTable__Container",
    componentId: "sc-1cwgrwt-0"
  })(["border-collapse:collapse;width:100%;height:100%;"]),
  Head: styled_components__WEBPACK_IMPORTED_MODULE_1___default().thead.withConfig({
    displayName: "defaultTable__Head",
    componentId: "sc-1cwgrwt-1"
  })(["position:sticky;top:0;z-index:100;& tr{height:48px;background:rgb(216,228,251);font-size:14px;color:black;}& tr th{padding:0 16px;}"]),
  Body: styled_components__WEBPACK_IMPORTED_MODULE_1___default().tbody.withConfig({
    displayName: "defaultTable__Body",
    componentId: "sc-1cwgrwt-2"
  })(["& tr{height:38px;border-bottom:thin solid rgba(0,0,0,0.12);font-size:14px;font-weight:400;&:hover{background:rgb(230,230,230);font-weight:600;& td.first_child{background:rgb(213,220,233);}}}& tr td{padding:0 16px;}& tr:last-child{border-bottom:0;}& tr td.first_child{background:rgb(235,242,253);}"])
};
const ChildrenWrap = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_1___default().tr.withConfig({
  displayName: "defaultTable__ChildrenWrap",
  componentId: "sc-1cwgrwt-3"
})(["background:none !important;position:absolute;right:16px;top:4px;z-index:111;font-weight:600;font-size:16px;line-height:42px;"]);

/***/ }),

/***/ 5994:
/***/ (() => {



/***/ })

};
;