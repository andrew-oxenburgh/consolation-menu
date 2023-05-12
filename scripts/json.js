

let isInitial = true
let stack = []
let stackNames = []
function replacer(key, value) {
    if(isInitial){
        isInitial = false;
        return value;
    }

    let res

    function unwindStackIfNecessary() {
        const currentAddress = stackNames.join('.') + '.' + key
        // console.log(">>>>>     currentAddress = " + currentAddress + ' = ' + value)
        const currentFrame = stack[stack.length - 1]
        if (currentFrame) {
            const index = currentFrame.indexOf(key);
            if (index > -1) { // only splice array when item is found
                currentFrame.splice(index, 1); // 2nd parameter means remove one item only
            }
            if (currentFrame.length === 0) {
                stack.splice(stack.length - 1)
                stackNames.splice(stackNames.length - 1)
            }
        }
    }

    // console.log("key = " + key +  "  " + typeof value )
    if(typeof value === 'object'){
        console.log("stackNames = " + stackNames.join('.'))
        console.log("stack = " + JSON.stringify(stack, null, 3))
        if(stack.length > 0){
            res = '...truncated...'
        }
        const keys = Object.keys(value);
        stack.push(keys)
        stackNames.push(key)
        // console.log("    value.keys() = " + keys)
        res = value
    } else {
        if (typeof value === "string") {
            const maxLength = 10
            const elipsis = (value.length > maxLength ? `... (${value.length})` : '')
            res = value.slice(0, maxLength) + elipsis
        }
        res = value;

    }
    unwindStackIfNecessary();
    return res
}

const foo = {
    month: 7,
    j: {
        k: 11
    },
    thing: {
        more: '55',
        evenMore : {
            h: 88
        }
    },
    thang: {
        jjj: '55'
    }
};
const str = JSON.stringify(foo, replacer, 2);

console.log("str = " + str)
