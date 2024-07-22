export function isRequired(value: string) {
  return (value && value.length > 0) || 'Item must be filled in.'
}

export function isValidIngredientUnit(value: string) {
  return ['g', 'ml', ''].includes(value)
}

export function isPositiveNumber(value: number) {
  return value > 0 || 'Item must be positive number';
}

export function isNumber(value: number) {
  return !isNaN(value) || 'Item must be a number';
}
  