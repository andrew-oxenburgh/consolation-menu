"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var test = require('ava');
var showMenu = require("../calcMenu");
function line(cmd) {
    if (cmd.description && cmd.description.length > 0) {
        return "\u001B[31m[".concat(cmd.key, "]\u001B[39m    ").concat(cmd.command, "\n    \u001B[34m").concat(cmd.description, "\u001B[39m");
    }
    else {
        return "\u001B[31m[".concat(cmd.key, "]\u001B[39m    ").concat(cmd.command);
    }
}
test('first with no calcMenu', function (t) {
    var actual = showMenu([]);
    var expected = "welcome to consolation-calcMenu";
    t.is(actual, expected);
});
test('single calcMenu item', function (t) {
    var cmd = {
        key: 'z',
        command: 'ls -al'
    };
    var actual = showMenu([cmd]);
    var expected = line(cmd);
    t.is(actual, expected);
});
test('single item with description', function (t) {
    var cmd = {
        key: '0',
        command: 'pwd',
        description: 'print working directory'
    };
    var actual = showMenu([cmd]);
    var expected = line(cmd);
    t.is(actual, expected);
});
test('multiple menu items with default hotkeys', function (t) {
    var cmds = [{
            key: '0',
            command: '0'
        }, {
            key: '1',
            command: '1'
        }];
    var actual = showMenu(cmds);
    var expected = line(cmds[0]) + '\n' +
        line(cmds[1]);
    t.deepEqual(actual, expected);
});
