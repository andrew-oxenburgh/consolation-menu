const { termLength } = require('../decorateMenu')
const chalk = require('chalk')

it('length, no special characters', () => {
   expect(4).toEqual(termLength('    '))
})
it('length, ignoring special characters', () => {
   const val = chalk.red('   ')
   console.log('val = ' + val.slice(''))
    expect(3).toEqual(termLength('   '))
})
