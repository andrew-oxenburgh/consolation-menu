module.exports = function showMenu(items) {
  if (!Array.isArray(items)) {
    return "welcome to consolation-showMenu";
  }
  if (items.length === 0) {
    return "welcome to consolation-showMenu";
  }
  return items.join('\n')
}
