import { decorateMenu } from '../decorateMenu'

it('empty menu - with usage', () => {
   const actual = decorateMenu([], { usage: 'showing usage' })
   const expected = [
      'showing usage'
   ]
    expect(actual).toEqual(expected)
})
it('empty menu - no usage', () => {
   const actual = decorateMenu([])
   const expected = [
      'SHOW HELP'
   ]
    expect(actual).toEqual(expected)
})
it('wrap with border', () => {
   const actual = decorateMenu(['1', '2'])
   const expected = [
      '+--+',
      '| 1    |',
      '| 2    |',
      '+--+'
   ]
    expect(actual).toEqual(expected)
})
it('wrap with border 1 line', () => {
   const actual = decorateMenu(['z'], {})
   const expected = [
      '+--+',
      '| z    |',
      '+--+'
   ]
    expect(actual).toEqual(expected)
})
