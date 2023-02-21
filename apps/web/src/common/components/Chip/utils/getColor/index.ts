export const getBaseColor = (color: string) => {
  switch (color) {
    case 'orange':
      return '#D28A1D33'
    case 'green':
      return '#E0ECE3'
    case 'red':
      return '#EEDEDE'
    case 'black':
      return '#CDCDCD'
  }
}

export const getTextColor = (color: string) => {
  switch (color) {
    case 'orange':
      return '#D28A1D'
    case 'green':
      return '#66A373'
    case 'red':
      return '##AA5B5B'
    case 'black':
      return '#000000'
  }
}
