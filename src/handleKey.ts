import {CommandLine} from "./commandLine";

const R = require("ramda");

module.exports = function handleKey(key: string, items: CommandLine[]): string {
    const res = R.find(R.propEq(key, 'key'), items)
    return res ? res.command : ''
}