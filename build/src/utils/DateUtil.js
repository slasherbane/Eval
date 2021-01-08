"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtil = void 0;
var DateUtil = /** @class */ (function () {
    function DateUtil() {
    }
    DateUtil.isValidDate = function (d) {
        var reg = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
        return (reg.test(d.toLowerCase().trim()));
    };
    DateUtil.formatDate = function (date) {
        var datetime = new Date(date);
        return DateUtil.isValidDate(date) ? DateUtil.formatDatetime(datetime, 'yyyy-mm-dd hh:ii:ss') : '';
    };
    DateUtil.formatDatetime = function (date, format) {
        var _padStart = function (value) { return value.toString().padStart(2, '0'); };
        return format
            .replace(/yyyy/g, _padStart(date.getFullYear()))
            .replace(/dd/g, _padStart(date.getDate()))
            .replace(/mm/g, _padStart(date.getMonth() + 1))
            .replace(/hh/g, _padStart(date.getHours()))
            .replace(/ii/g, _padStart(date.getMinutes()))
            .replace(/ss/g, _padStart(date.getSeconds()));
    };
    return DateUtil;
}());
exports.DateUtil = DateUtil;
//# sourceMappingURL=DateUtil.js.map