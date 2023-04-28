module.exports = function showMenu(items) {
    if(!items){
        return 'welcome to consolation-showMenu'
    }
    let props = Object.getOwnPropertyNames(items);
    if(props.length === 0){
        return 'welcome to consolation-showMenu'
    }
    let res = props.reduce((acc, item, i) => {
        acc.push(item + '   ' + items[item])
        return acc
    }, []);
    return res.join('\n')
}
