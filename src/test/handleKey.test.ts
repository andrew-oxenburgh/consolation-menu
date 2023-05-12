import { type CommandLine } from '../types'

const handleKey = require('../handleKey')

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
   {
      key: 'g',
      command: 'GO'
   }
]
it('handle valid number keys', () => {
   expect('zero').toEqual(handleKey('0', items))
   expect('one').toEqual(handleKey('1', items))
   expect('GO').toEqual(handleKey('g', items))
   // t.is('one', handleKey('1', items))
   // t.is('GO', handleKey('g', items))
})
it('handle invalid number keys', () => {
   expect('').toEqual(handleKey({ name: '7' }, items))
   expect('').toEqual(handleKey({ name: '12' }, items))
})
