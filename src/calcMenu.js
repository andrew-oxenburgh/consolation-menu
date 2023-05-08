"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("ramda");
var chalk = require("chalk");
module.exports = function calcMenu(items) {
    if (!items) {
        return 'welcome to consolation-calcMenu';
    }
    var res = R.reduce(function (acc, item) {
        acc.push(chalk.red("[".concat(item.key, "]")) + '   ' + item.command);
        return acc;
    }, [], items);
    return res.join('\n');
};
