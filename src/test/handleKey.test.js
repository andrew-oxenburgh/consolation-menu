const handleKey = require( "../handleKey");

const test = require('ava')

const items = {
    '0': 'zero',
    '1': 'one',
    '2': 'two',
    'g': 'GO',
}

test('ctrl c return null - break condition', async t => {
    t.is(null, handleKey({ctrl: true, name: 'c'}, items))
})

test('handle valid number keys', async t => {
    t.is('zero', handleKey({name: '0'}, items))
    t.is('one', handleKey({name: '1'}, items))
    t.is('GO', handleKey({name: 'g'}, items))
})
test('handle invalid number keys', async t => {
    t.is(-1, handleKey({name: '7'}, items))
    t.is(-1, handleKey({name: '12'}, items))
})
