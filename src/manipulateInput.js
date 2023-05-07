module.exports = function maniInput(items) {
    return items.reduce(
        (acc, val, ndx) => {
            // console.log(JSON.stringify(val, null, 3))
            const key = (val.key && (typeof val.key === 'string' || val.key > 0)) ? val.key : ndx
            if(acc[key]){
                console.error('duplicate keys requested')
            }
            val.key = key
            acc[key] = val
            acc[key] = val
            return acc
        }, {}
    );
}
