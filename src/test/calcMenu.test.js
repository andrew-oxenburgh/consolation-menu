const test = require('ava')

const showMenu = require("../calcMenu")

function line(shortcut, command) {
    return `\u001b[31m[${shortcut}]\u001b[39m   ${command}`;
}

test('first with no calcMenu', t => {
    const actual = showMenu()
    const expected = "welcome to consolation-calcMenu"
    t.is(actual, expected)
})
test('first with empty calcMenu', t => {
    const actual = showMenu({})
    const expected = "welcome to consolation-calcMenu"
    t.is(actual, expected)
})
test('single calcMenu item', t => {
    const actual = showMenu({'z': 'ls -al'})
    console.log(JSON.stringify(actual, null, 3))
    const expected = line('z', 'ls -al')
    t.is(actual, expected)
})
test('single calcMenu item 2', t => {
    const actual = showMenu({'0': 'pwd'})
    const expected = line('0', 'pwd')
    t.is(actual, expected)
})
test('multiple menu items with default hotkeys', t => {
    const actual = showMenu({
        '0': '0', '1': '1'
    })
    const expected = line('0', '0') + '\n' +
        line('1', '1')
    t.is(actual, expected)
})
