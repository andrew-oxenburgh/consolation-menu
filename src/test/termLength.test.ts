const { termLength } = require('../decorateMenu')
const test = require('ava')
const chalk = require('chalk')

test('length, no special characters', async t => {
   t.is(4, termLength('    '))
})
test('length, ignoring special characters', async t => {
   const val = chalk.red('   ')
   console.log('val = ' + val.slice(''))
   const l = termLength(val)
   t.is(3, l)
})
