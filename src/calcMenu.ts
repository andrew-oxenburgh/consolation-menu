import * as R from 'ramda'
const chalk = require("chalk");

import {CommandLine} from "./commandLine";

module.exports = function calcMenu(items: CommandLine[]) {
    if(!items || items.length === 0){
        return 'welcome to consolation-calcMenu'
    }
    const res: string[] = R.reduce((acc: string[], item: CommandLine) => {
        let line = chalk.red(`[${item.key}]`) + '    ' + item.command;
        if(item.description){
            line += `\n    ${chalk.blue(item.description)}`
        }
        acc.push(line)
        return acc
    }, [], items);
    return res.join('\n')
}
