const chalk = require("chalk");
module.exports = function calcMenu(items) {
    if(!items){
        return 'welcome to consolation-calcMenu'
    }
    let props = Object.getOwnPropertyNames(items);
    if(props.length === 0){
        return 'welcome to consolation-calcMenu'
    }
    let res = props.reduce((acc, item, i) => {
        acc.push(chalk.red(`[${items[item].key}]`) + '   ' + items[item].command)
        return acc
    }, []);
    return res.join('\n')
}
