"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("ramda");
module.exports = function handleKey(key, items) {
    var res = R.find(R.propEq(key, 'key'), items);
    return res ? res.command : '';
};
