export const getDescription = (description: string) =>
  description.length > 200 ? description.slice(0, 200) + '...' : description

export const getTitle = (title: string) =>
  title.length > 50 ? title.slice(0, 50) + '...' : title
