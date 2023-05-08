import {CommandLine} from "./commandLine";

const R = require("ramda");

module.exports = function handleKey(key: string, items: CommandLine[]): string {
    console.log(JSON.stringify(items, null, 3))
    console.log(JSON.stringify(key, null, 3))
    // break on control-c
    // if (key.ctrl && key.name === 'c')
    //     return null;
    //
    // // ignore all control keys
    // if (key.ctrl) {
    //     return -1
    // }

    // get command from associative array
    const res = R.find(R.propEq(key, 'key'), items)
    return res ? res.command : ''
}
