import {CommandLine} from "../commandLine";

const test = require('ava')

const showMenu = require("../calcMenu")

function line(cmd: CommandLine): string {
    if(cmd.description && cmd.description.length > 0){
        return `\u001b[31m[${cmd.key}]\u001b[39m   ${cmd.command}\n    \u001b[34m${cmd.description}\u001b[39m`;
    }else {
        return `\u001b[31m[${cmd.key}]\u001b[39m    ${cmd.command}`;
    }
}

test('first with no calcMenu', t => {
    const actual = showMenu([])
    const expected = "welcome to consolation-calcMenu"
    t.is(actual, expected)
})
test('single calcMenu item', t => {
    const cmd = {
        key: 'z',
        command: 'ls -al'
    };
    const actual = showMenu([cmd])
    const expected = line(cmd)
    t.is(actual, expected)
})
test('single item with description', t => {
    const cmd = {
        key: '0',
        command: 'pwd',
        description: 'print working directory'
    };
    const actual = showMenu([cmd])
    const expected = line(cmd)
    t.is(actual, expected)
})
test('multiple menu items with default hotkeys', t => {
    const cmds: CommandLine[] = [{
        key: '0',
        command: '0'
    },{
        key: '1',
        command: '1'
    }];
    const actual = showMenu(cmds)
    const expected = line(cmds[0]) + '\n' +
        line(cmds[1])
    t.deepEqual(actual, expected)
})
