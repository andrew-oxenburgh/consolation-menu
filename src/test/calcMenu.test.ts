import { type CommandLine } from '../types'

const test = require('ava')

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

test('first with no calcMenu', t => {
  const actual = calcMenu([])
  const expected = ['welcome to consolation-calcMenu']
  t.deepEqual(actual, expected)
})
test('single calcMenu item', t => {
  const cmd = {
    key: 'z',
    command: 'ls -al'
  }
  const actual = calcMenu([cmd])
  const expected = line(cmd)
  t.deepEqual(actual, expected)
})
test('single item with description', t => {
  const cmd = {
    key: '0',
    command: 'pwd',
    description: 'print working directory'
  }
  const actual = calcMenu([cmd])
  const expected = line(cmd)
  t.deepEqual(actual, expected)
})
test('multiple menu items with default hotkeys', t => {
  const cmds: CommandLine[] = [{
    key: '0',
    command: '0'
  }, {
    key: '1',
    command: '1'
  }]
  const actual = calcMenu(cmds)
  const expected = [].concat(line(cmds[0]), line(cmds[1]))
  t.deepEqual(actual, expected)
})
