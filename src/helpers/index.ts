import { ErrorType } from '../redux-toolkits/user/user.type'

const formatCurrency = (amount: string | number): string => {
  return new Intl.NumberFormat('en-NG', {
    currency: 'NGN',
    style: 'currency',
  }).format(Number(amount))
}

const formatNumber = (count: number): string => {
  return new Intl.NumberFormat('en-IN', {
    maximumSignificantDigits: 3,
  }).format(count)
}

const getErrorMessage = (error: ErrorType) => {
  return error.error?.data?.error ?? 'Something went wrong, try again later.'
}

export { formatCurrency, formatNumber, getErrorMessage }

export const removeElementAtIndex = (array: any[], index: number) => {
  // Check if the index is within bounds
  if (index >= 0 && index < array.length) {
    array.splice(index, 1)
  }
  return array
}
