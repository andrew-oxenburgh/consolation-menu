"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("ramda");
var chalk = require("chalk");
module.exports = function calcMenu(items) {
    if (!items || items.length === 0) {
        return 'welcome to consolation-calcMenu';
    }
    var res = R.reduce(function (acc, item) {
        var line = chalk.red("[".concat(item.key, "]")) + '    ' + item.command;
        if (item.description) {
            line += "\n    ".concat(chalk.blue(item.description));
        }
        acc.push(line);
        return acc;
    }, [], items);
    return res.join('\n');
};
