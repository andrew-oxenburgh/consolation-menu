module.exports = function handleKey(key, items) {
    // break on control-c
    if (key.ctrl && key.name === 'c')
        return null;

    // ignore all control keys
    if (key.ctrl) {
        return -1
    }

    // get command from associative array
    if (key.name && items[key.name]) {
        return items[key.name]
    }

    return -1
}
