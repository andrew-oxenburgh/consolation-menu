import { type CommandLine } from '../types'
const { calcMenu } = require('../calcMenu')

function line (cmd: CommandLine): string[] {
   if (cmd.description && cmd.description.length > 0) {
      return [
         `\u001b[31m[${cmd.key}]\u001b[39m    ${cmd.command}`,
         `    \u001b[34m${cmd.description}\u001b[39m`
      ]
   } else {
      return [
         `\u001b[31m[${cmd.key}]\u001b[39m    ${cmd.command}`
      ]
   }
}

it('first with no calcMenu', () => {
   const actual = calcMenu([])
   const expected = ['welcome to consolation-calcMenu']
   expect(actual).toEqual(expected)
})
it('single calcMenu item', () => {
   const cmd = {
      key: 'z',
      command: 'ls -al'
   }
   const actual = calcMenu([cmd])
   const expected = line(cmd)
    expect(actual).toEqual(expected)
})
it('single item with description', () => {
   const cmd = {
      key: '0',
      command: 'pwd',
      description: 'print working directory'
   }
   const actual = calcMenu([cmd])
   const expected = line(cmd)
    expect(actual).toEqual(expected)
})
it('multiple menu items with default hotkeys', () => {
   const cmds: CommandLine[] = [{
      key: '0',
      command: '0'
   }, {
      key: '1',
      command: '1'
   }]
   const actual = calcMenu(cmds)
   const expected = [].concat(line(cmds[0]), line(cmds[1]))
    expect(actual).toEqual(expected)
})
