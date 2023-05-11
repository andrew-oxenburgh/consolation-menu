import * as R from 'ramda'
import { type CommandLine } from './types'
import { decorateMenu } from './decorateMenu'

const chalk = require('chalk')

module.exports = {
  calcMenu,
  showMenu
}

function calcMenu (items: CommandLine[]): string[] {
  if (!items || items.length === 0) {
    return ['welcome to consolation-calcMenu']
  }
  return R.reduce((acc: string[], item: CommandLine) => {
    acc.push(chalk.red(`[${item.key}]`) + '    ' + item.command)
    if (item.description) {
      acc.push(`    ${chalk.blue(item.description)}`)
    }
    return acc
  }, [], items)
}

function showMenu (items: CommandLine[]) {
  return decorateMenu(calcMenu(items)).join('\n')
}
