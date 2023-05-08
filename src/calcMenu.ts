import {CommandLine} from "./commandLine";
import * as R from 'ramda'

const chalk = require("chalk");
module.exports = function calcMenu(items: CommandLine[]) {
    if(!items || items.length === 0){
        return 'welcome to consolation-calcMenu'
    }
    const res: string[] = R.reduce((acc: string[], item: CommandLine) => {
        acc.push(chalk.red(`[${item.key}]`) + '   ' + item.command)
        return acc
    }, [], items);
    return res.join('\n')
}
