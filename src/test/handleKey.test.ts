import {CommandLine} from "../commandLine";

const handleKey = require( "../handleKey");

const test = require('ava')

const items: CommandLine[] = [
    {
        key: '0',
        command: 'zero'
    },
    {
        key: '1',
        command: 'one'
    },
    {
        key: '2',
        command: 'two'
    },
    {
        key: '3',
        command: 'three'
    },
]

test('ctrl c return null - break condition', async t => {
    t.is(null, handleKey({ctrl: true, name: 'c'}, items))
})

test('handle valid number keys', async t => {
    t.is('zero', handleKey('0', items))
    // t.is('one', handleKey('1', items))
    // t.is('GO', handleKey('g', items))
})
test('handle invalid number keys', async t => {
    t.is(-1, handleKey({name: '7'}, items))
    t.is(-1, handleKey({name: '12'}, items))
})
