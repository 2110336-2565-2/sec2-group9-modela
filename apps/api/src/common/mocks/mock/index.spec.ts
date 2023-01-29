import { Resume } from '@prisma/client'

describe('mock()', () => {
  const MOCK_VALUES: Resume[] = [
    {
      resumeId: 1,
      actorId: 2,
      name: `MILGRAM / Mu - It's Not My Fault [The Second Trial Music Video]`,
      resumeUrl: 'https://www.youtube.com/watch?v=xl-TuKghSuA',
    },
    {
      resumeId: 2,
      actorId: 3,
      name: `Life hates us now. / Mafumafu 【Sang It】`,
      resumeUrl: 'https://www.youtube.com/watch?v=eq8r1ZTma08',
    },
  ]

  const getBaseMockSpy = jest.fn((model, idx) => MOCK_VALUES[idx - 1])
  jest.doMock('../getBaseMock', () => ({
    getBaseMock: getBaseMockSpy,
  }))

  const { mock } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('get', () => {
    it('should get mock value correctly', () => {
      const result = mock('resume').get()
      expect(result).toEqual(MOCK_VALUES[0])
    })

    it('should get array of mock value correctly', () => {
      const result1 = mock('resume').get(1)
      expect(result1).toEqual([MOCK_VALUES[0]])

      const result2 = mock('resume').get(2)
      expect(result2).toEqual(MOCK_VALUES)
    })
  })

  describe('omit', () => {
    it('should omit properties correctly', () => {
      const result = mock('resume').omit(['resumeId', 'actorId']).get()
      expect(result).toEqual({
        name: MOCK_VALUES[0].name,
        resumeUrl: MOCK_VALUES[0].resumeUrl,
      })
    })
  })

  describe('override', () => {
    it('should override properties correctly', () => {
      const result = mock('resume')
        .override({
          resumeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        })
        .get()
      expect(result).toEqual({
        ...MOCK_VALUES[0],
        resumeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      })
    })
  })
})
