const showMenu = require("../showMenu")

const test = require('ava')
test('foo', t => {
    t.pass();
});
test('bar', t => {
    t.is(1, 1);
});

test('first with no showMenu', t => {
  const actual = showMenu()
  const expected = "welcome to consolation-showMenu"
  t.is(actual, expected)
})

test('first with empty showMenu', t => {
  const actual = showMenu([])
  const expected = "welcome to consolation-showMenu"
  t.is(actual, expected)
})

test('single showMenu item', t => {
  const actual = showMenu(['ls -al'])
  const expected = "ls -al"
  t.is(actual, expected)
})

test('single showMenu item 2', t => {
  const actual = showMenu(['pwd'])
  const expected = "pwd"
  t.is(actual, expected)
})
test('multiple menu items', t => {
  const actual = showMenu(['1', '2'])
  const expected = "1\n2"
  t.is(actual, expected)
})
