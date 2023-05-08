import {decorateMenu} from "../decorateMenu";
import {MenuOptions} from "../types"

const test = require('ava')


test('empty menu - with usage', t => {
    const actual = decorateMenu([], {usage: 'showing usage'})
    const expected = [
        'showing usage',
    ]
    t.deepEqual(actual, expected)
})
test('empty menu - no usage', t => {
    const actual = decorateMenu([])
    const expected = [
        'SHOW HELP',
    ]
    t.deepEqual(actual, expected)
})
test('wrap with border', t => {
    const actual = decorateMenu(['1', '2'])
    const expected = [
        '+----+',
        '| 1  |',
        '| 2  |',
        '+----+',
    ]
    t.deepEqual(actual, expected)
})
test('wrap with border 1 line', t => {
    const actual = decorateMenu(['z'], {})
    const expected = [
        '+----+',
        '| z  |',
        '+----+',
    ]
    t.deepEqual(actual, expected)
})
