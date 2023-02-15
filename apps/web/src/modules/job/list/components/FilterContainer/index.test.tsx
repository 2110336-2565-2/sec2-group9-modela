import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { fireEvent, render } from '@testing-library/react'
import { mockRouter } from 'common/utils/testing/mockRouter'
import { initialIFilter } from 'modules/job/list/pages/types'
import React from 'react'
describe('<FilterContainer/>', () => {
  const state = initialIFilter
  mockRouter()

  const { default: FilterContainer } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('normal behavior', () => {
    it('should render FilterContainer correctly', () => {
      const { getByText, getByLabelText } = render(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <FilterContainer
            state={state}
            setState={jest.fn()}
            isTitle={false}
            filterData={jest.fn()}
          />
        </LocalizationProvider>,
      )
      expect(getByText('การถ่ายทำ')).toBeDefined()
      expect(getByLabelText('วันเริ่มการถ่ายทำ')).toBeDefined()
      expect(getByLabelText('วันสิ้นสุดถ่ายทำ')).toBeDefined()
      expect(getByLabelText('เวลาเริ่มต้นการถ่ายทำ')).toBeDefined()
      expect(getByLabelText('เวลาสิ้นสุดการถ่ายทำ')).toBeDefined()
      expect(getByText('อายุนักแสดง')).toBeDefined()
      expect(getByLabelText('กรอกอายุนักแสดง')).toBeDefined()
      expect(getByText('ค่าจ้าง')).toBeDefined()
      expect(getByText('+- ไม่เกิน')).toBeDefined()
      expect(getByText('สถานะการเปิดรับสมัคร')).toBeDefined()
      expect(getByText('เปิดรับสมัคร')).toBeDefined()
      expect(getByText('ปิดรับสมัคร')).toBeDefined()
      expect(getByText('เพศ')).toBeDefined()
      expect(getByText('ชาย')).toBeDefined()
      expect(getByText('หญิง')).toBeDefined()
      expect(getByText('อื่นๆ')).toBeDefined()
    })
    it('should call filterData when submit is triggered', () => {
      const filterDataMock = jest.fn()
      const { getByText } = render(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <FilterContainer
            state={state}
            setState={jest.fn()}
            isTitle={false}
            filterData={filterDataMock}
          />
        </LocalizationProvider>,
      )
      const applyButton = getByText('Submit')
      fireEvent.click(applyButton)
      expect(filterDataMock).toBeCalled()
    })
  })
})
