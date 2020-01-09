export const padNumber = n => `${n < 10 ? '0' : ''}${n}`
export const formatDate = date => `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}-${padNumber(date.getDate())}`
