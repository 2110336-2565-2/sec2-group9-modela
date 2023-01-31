//format Date to dd/mm/yy format
export const formatDate = (date: Date): string => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = (date.getFullYear() + 543).toString().slice(2)
  return `${day}/${month}/${year}`
}

//format Date to hh:mm format
export const formatTime = (time: Date): string => {
  const hour = time.getHours()
  const minute = time.getMinutes()
  return `${hour}:${minute}`
}
