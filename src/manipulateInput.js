module.exports = function maniInput(items) {
    return items.reduce(
        (acc, val, ndx)=>{
            if(typeof val === 'string'){
                acc[ndx] = val
            } else if (typeof val === 'object'){
                acc[val.key] = val.command
            }
            return acc
        }, {}
    );
}
