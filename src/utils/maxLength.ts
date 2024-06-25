const maxLength = (max: number) => (value: string) =>
  value.length > max ? value.slice(0, max) + '...' : value

export default maxLength
