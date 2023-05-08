const test = require('ava')
import * as R from 'ramda'
import { MenuOptions } from "../types"

const defaultMenuOptions: MenuOptions = {
    usage: "SHOW HELP"
}


function addBorder(s: string[], options?: MenuOptions): string[] {
    options = {
        ...defaultMenuOptions,
        ...options,
    }
    if(s.length < 1){
        return [options.usage]
    }
    return [
        '+---+',
        ...R.map((val)=>{
                return '| ' + val + ' |'
            }, s),
        '+---+',
    ];
}

test('empty menu - with usage', t => {
    const actual = addBorder([], {usage: 'showing usage'})
    const expected = [
        'showing usage',
    ]
    t.deepEqual(actual, expected)
})
test('empty menu - no usage', t => {
    const actual = addBorder([])
    const expected = [
        'SHOW HELP',
    ]
    t.deepEqual(actual, expected)
})
test('wrap with border', t => {
    const actual = addBorder(['1', '2'])
    const expected = [
        '+---+',
        '| 1 |',
        '| 2 |',
        '+---+',
    ]
    t.deepEqual(actual, expected)
})
test('wrap with border 1 line', t => {
    const actual = addBorder(['z'], {})
    const expected = [
        '+---+',
        '| z |',
        '+---+',
    ]
    t.deepEqual(actual, expected)
})
