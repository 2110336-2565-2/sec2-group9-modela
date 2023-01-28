describe('getMock()', () => {
  const MOCK_VALUES = {
    id: 1,
    name: `MILGRAM / Mu - It's Not My Fault [The Second Trial Music Video]`,
    url: 'https://www.youtube.com/watch?v=xl-TuKghSuA',
  }
  const MOCK_MODEL = 'actor'
  const MOCK_OVERRIDE = {
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  }

  const getMocksSpy = jest.fn(() => [MOCK_VALUES])
  jest.doMock('../getMocks', () => ({
    getMocks: getMocksSpy,
  }))

  const { getMock } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create mock correctly', () => {
    expect(getMock(MOCK_MODEL, MOCK_OVERRIDE)).toMatchObject(MOCK_VALUES)
    expect(getMocksSpy).toBeCalledWith(MOCK_MODEL, 1, MOCK_OVERRIDE)
  })
})

export {}
