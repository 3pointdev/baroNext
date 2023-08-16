"use strict";
exports.id = 409;
exports.ids = [409];
exports.modules = {

/***/ 6409:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _config_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5981);


class MachineStatusModule {
  ToStringStatus(power, mode, execution, isDone, isAlert) {
    if (!power) {
      return "전원꺼짐";
    }

    if (mode !== "AUTOMATIC") {
      return "수정 중";
    }

    if (isAlert) {
      return "알람발생";
    }

    switch (execution) {
      case _config_constants__WEBPACK_IMPORTED_MODULE_0__/* .MachineExecutionType */ .Z9.ACTIVE:
        return "가공중";

      case _config_constants__WEBPACK_IMPORTED_MODULE_0__/* .MachineExecutionType */ .Z9.READY:
        return "READY";

      case _config_constants__WEBPACK_IMPORTED_MODULE_0__/* .MachineExecutionType */ .Z9.TRIGGERED:
        return "비상정지";

      case _config_constants__WEBPACK_IMPORTED_MODULE_0__/* .MachineExecutionType */ .Z9.STOPPED || _config_constants__WEBPACK_IMPORTED_MODULE_0__/* .MachineExecutionType */ .Z9.INTERRUPTED:
        if (isDone) {
          return "가공완료";
        } else {
          return "대기 중";
        }

    }
  }

  ToColorStatus(execution) {
    switch (execution) {
      case _config_constants__WEBPACK_IMPORTED_MODULE_0__/* .MachineExecutionType */ .Z9.ACTIVE:
        return "#6ebd33";

      case _config_constants__WEBPACK_IMPORTED_MODULE_0__/* .MachineExecutionType */ .Z9.OFF:
        return "#d5d7da";

      case _config_constants__WEBPACK_IMPORTED_MODULE_0__/* .MachineExecutionType */ .Z9.TRIGGERED:
        return "#e8661c";

      case _config_constants__WEBPACK_IMPORTED_MODULE_0__/* .MachineExecutionType */ .Z9.STOPPED:
        return "#f5b117";

      case _config_constants__WEBPACK_IMPORTED_MODULE_0__/* .MachineExecutionType */ .Z9.READY:
        return "#f5b117";

      case _config_constants__WEBPACK_IMPORTED_MODULE_0__/* .MachineExecutionType */ .Z9.INTERRUPTED:
        return "#f5b117";

      default:
        return "#d5d7da";
    }
  }

  ToClassStatus(power, mode, execution, isDone, isAlert) {
    if (!power) {
      return _config_constants__WEBPACK_IMPORTED_MODULE_0__/* .MachineStateType */ .V6.OFF;
    }

    if (mode !== "AUTOMATIC") {
      return _config_constants__WEBPACK_IMPORTED_MODULE_0__/* .MachineStateType */ .V6.MODIFY;
    }

    if (isAlert) {
      return _config_constants__WEBPACK_IMPORTED_MODULE_0__/* .MachineStateType */ .V6.ALARM;
    }

    switch (execution) {
      case _config_constants__WEBPACK_IMPORTED_MODULE_0__/* .MachineExecutionType */ .Z9.ACTIVE:
        return _config_constants__WEBPACK_IMPORTED_MODULE_0__/* .MachineStateType */ .V6.RUNNING;

      case _config_constants__WEBPACK_IMPORTED_MODULE_0__/* .MachineExecutionType */ .Z9.READY:
        return _config_constants__WEBPACK_IMPORTED_MODULE_0__/* .MachineStateType */ .V6.READY;

      case _config_constants__WEBPACK_IMPORTED_MODULE_0__/* .MachineExecutionType */ .Z9.TRIGGERED:
        return _config_constants__WEBPACK_IMPORTED_MODULE_0__/* .MachineStateType */ .V6.EMERGENCY_STOP;

      case _config_constants__WEBPACK_IMPORTED_MODULE_0__/* .MachineExecutionType */ .Z9.STOPPED || _config_constants__WEBPACK_IMPORTED_MODULE_0__/* .MachineExecutionType */ .Z9.INTERRUPTED:
        if (isDone) {
          return _config_constants__WEBPACK_IMPORTED_MODULE_0__/* .MachineStateType */ .V6.SUCCESS;
        } else {
          return _config_constants__WEBPACK_IMPORTED_MODULE_0__/* .MachineStateType */ .V6.WAIT;
        }

    }
  }

}

const machineStatusInstance = new MachineStatusModule();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (machineStatusInstance);

/***/ })

};
;