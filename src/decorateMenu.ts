
import { type MenuOptions } from './types'
import * as R from 'ramda'

function ansiRegex ({ onlyFirst = false } = {}) {
   const pattern = [
      '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
      '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))'
   ].join('|')

   return new RegExp(pattern, onlyFirst ? undefined : 'g')
}

const defaultMenuOptions: MenuOptions = {
   usage: 'SHOW HELP',
   header: 'Consolation Menu',
   footer: 'Select an option, or [q] to quit'
}

export function termLength (val: string): number {
   const noSpecs = val.replace(ansiRegex(), '')
   return noSpecs.length
}

export function decorateMenu (s: string[], options?: MenuOptions): string[] {
   let width = R.reduce((acc, val) => {
      const noSpecialChars = val.replace(/[^a-zA-Z0-9 ]/g, '')
      acc = Math.max(acc, noSpecialChars.length)
      return acc
   }, 0, s)
   width += 4

   options = {
      ...defaultMenuOptions,
      ...options
   }
   if (s.length < 1) {
      return [options.usage]
   }
   let header = '+'
   header = header.padEnd(width - 2, '-')
   header += '+'
   return [
      header,
      ...R.map((val) => {
         const length = termLength(val)
         const padded = '| ' + val + ''.padEnd(width - length - 1, ' ')
         return padded + ' |'
      }, s),
      header
   ]
}
