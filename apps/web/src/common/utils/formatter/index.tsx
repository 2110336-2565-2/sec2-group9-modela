import dayjs from 'dayjs'

//format Date to dd/mm/yy format
export const formatDate = (date: Date): string => {
  return dayjs(date).format('DD/MM/YY')
}

//format Date to hh:mm format
export const formatTime = (time: Date): string => {
  return dayjs(time).format('HH:mm')
}
