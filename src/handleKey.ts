import * as R from 'ramda'
import { type CommandLine } from './types'

module.exports = function handleKey (key: string, items: CommandLine[]): string {
   const res = R.find(R.propEq(key, 'key'), items)
   return res ? res.command : ''
}
