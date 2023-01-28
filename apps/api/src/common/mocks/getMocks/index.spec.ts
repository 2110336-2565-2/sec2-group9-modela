describe('getMocks()', () => {
  const MOCK_MODEL = 'actor'
  const MOCK_VALUES = [
    {
      id: 1,
      name: `MILGRAM / Mu - It's Not My Fault [The Second Trial Music Video]`,
      url: 'https://www.youtube.com/watch?v=xl-TuKghSuA',
    },
    {
      id: 2,
      name: `Life hates us now. / Mafumafu 【Sang It】`,
      url: 'https://www.youtube.com/watch?v=eq8r1ZTma08',
    },
  ]

  const getBaseMockSpy = jest.fn((model, idx) => MOCK_VALUES[idx - 1])
  jest.doMock('../getBaseMock', () => ({
    getBaseMock: getBaseMockSpy,
  }))

  const { getMocks } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create mock correctly', () => {
    expect(getMocks(MOCK_MODEL, 2)).toMatchObject(MOCK_VALUES)
    expect(getBaseMockSpy).toBeCalledWith(MOCK_MODEL, 1, true)
    expect(getBaseMockSpy).toBeCalledWith(MOCK_MODEL, 2, true)
  })

  it('should override value correctly', () => {
    expect(
      getMocks(MOCK_MODEL, 2, {
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      }),
    ).toMatchObject(
      MOCK_VALUES.map((val) => ({
        ...val,
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      })),
    )
  })
})

export {}
