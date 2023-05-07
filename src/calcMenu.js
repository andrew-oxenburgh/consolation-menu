var chalk = require("chalk");
module.exports = function calcMenu(items) {
    if (!items) {
        return 'welcome to consolation-calcMenu';
    }
    var props = Object.getOwnPropertyNames(items);
    if (props.length === 0) {
        return 'welcome to consolation-calcMenu';
    }
    var res = props.reduce(function (acc, item, i) {
        acc.push(chalk.red("[".concat(items[item].key, "]")) + '   ' + items[item].command);
        return acc;
    }, []);
    return res.join('\n');
};
