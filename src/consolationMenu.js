"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require('readline');
var manipulateInput = require('./manipulateInput');
var handleKey = require('./handleKey');
var showMenu = require('./calcMenu');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
module.exports = function menu(_items) {
    var items = manipulateInput(_items);
    process.stdout.write(showMenu(items));
    process.stdout.write('\n');
    process.stdout.write('\n');
    // readline.cursorTo(process.stdout, 0, 0)
    return new Promise(function (resolve, reject) {
        var handleKeyPress = function (chunk, key) {
            if (chunk === 'q' || (key && key.ctrl && key.name === 'c')) {
                process.stdin.removeListener('keypress', handleKeyPress);
                process.stdin.setRawMode(false);
                process.exit();
            }
            var command = handleKey({ name: chunk || key.name }, items);
            if (command !== -1) {
                readline.clearScreenDown(process.stdout);
                resolve(command);
            }
            else {
                process.stdout.write(showMenu(items));
            }
        };
        process.stdin.addListener('keypress', handleKeyPress);
    });
};
