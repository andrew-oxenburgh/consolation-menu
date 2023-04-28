var readline = require('readline');
const manipulateInput = require('./manipulateInput')
const handleKey = require('./handleKey')
const showMenu = require('./showMenu')

readline.emitKeypressEvents(process.stdin);

process.stdin.setRawMode(true);


module.exports = function menu(_items) {
    const items = manipulateInput(_items)
    console.log(showMenu(items))
    return new Promise(function (resolve, reject) {
        let handleKeyPress = function (chunk, key) {
            if (chunk === 'q' || (key && key.ctrl && key.name === 'c')) {
                process.stdin.removeListener('keypress', handleKeyPress);
                process.stdin.setRawMode(false);
                process.exit()
            }
            let command = handleKey({name: chunk}, items);
            if(command !== -1){
                resolve(command)
            }else{
                console.log(showMenu(items))
            }
        };
        process.stdin.addListener('keypress', handleKeyPress);
    })
}
