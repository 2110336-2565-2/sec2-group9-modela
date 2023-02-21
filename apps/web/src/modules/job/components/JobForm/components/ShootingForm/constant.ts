import { IFormControllerProps } from 'common/components/FormController/types'

import { IPostJobSchemaType } from '../../hooks/useJobForm/schema'

export const formLayout = (
  index: number,
): IFormControllerProps<IPostJobSchemaType>[] => [
  {
    type: 'textField',
    label: 'สถานที่ถ่ายทำ',
    name: `shooting.${index}.shootingLocation`,
  },
  {
    type: 'date',
    label: 'วันที่เริ่มถ่ายทำ',
    name: `shooting.${index}.startDate`,
    sm: 6,
    xs: 6,
  },
  {
    type: 'date',
    label: 'วันที่สิ้นสุดถ่ายทำ',
    name: `shooting.${index}.endDate`,
    sm: 6,
    xs: 6,
  },
  {
    type: 'time',
    label: 'เวลาเริ่มถ่ายทำในแต่ละวัน',
    name: `shooting.${index}.startTime`,
    sm: 6,
    xs: 6,
  },
  {
    type: 'time',
    label: 'เวลาสิ้นสุดถ่ายทำในแต่ละวัน',
    name: `shooting.${index}.endTime`,
    sm: 6,
    xs: 6,
  },
]
