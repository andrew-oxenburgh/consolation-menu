const test = require('ava')
const manipulateInput = require('../manipulateInput')
test('array of strings > associative array', t => {
    const items = [
        'zero', 'one', 'two'
    ]
    t.deepEqual({
        '0': 'zero',
        '1': 'one',
        '2': 'two',
    }, manipulateInput(items))
})
test('array of objects > associative array', t => {
    const items = [
        {
            key: 'k',
            command: 'keep'
        }
    ]
    t.deepEqual({
        k: {
            key: 'k',
            command: 'keep'
        }
    }, manipulateInput(items))
})

