const test = require('ava')

const showMenu = require("../showMenu")
test('first with no showMenu', t => {
    const actual = showMenu()
    const expected = "welcome to consolation-showMenu"
    t.is(actual, expected)
})
test('first with empty showMenu', t => {
    const actual = showMenu({})
    const expected = "welcome to consolation-showMenu"
    t.is(actual, expected)
})
test('single showMenu item', t => {
    const actual = showMenu({'z': 'ls -al'})
    const expected = "z   ls -al"
    t.is(actual, expected)
})
test('single showMenu item 2', t => {
    const actual = showMenu({'0':'pwd'})
    const expected = "0   pwd"
    t.is(actual, expected)
})
test('multiple menu items with default hotkeys', t => {
    const actual = showMenu({ '0': '0', '1': '1'
})
    const expected = "0   0\n1   1"
    t.is(actual, expected)
})
