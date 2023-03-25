import { act, render } from '@testing-library/react'
import { mockRouter } from 'common/utils/testing/mockRouter'

describe('<ResultModalBody />', () => {
  const { replaceSpy } = mockRouter(true)

  const { default: ResultModalBody } = require('.') as typeof import('.')

  it('should be defined', () => {
    expect(ResultModalBody).toBeDefined()
  })

  describe('normal behavior', () => {
    it('should render correctly', () => {
      const { queryByText } = render(<ResultModalBody jobId="12" />)

      const el = queryByText('ยืนยัน') as HTMLButtonElement
      expect(el).toBeDefined()

      act(() => {
        el.click()
      })

      expect(replaceSpy).toHaveBeenCalledWith('/job/12/actor')
    })
  })
})
