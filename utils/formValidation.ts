import type { Ingredient } from "~/types";

const ingredientPattern = /(?:\[[^\[\]]+\]\s*\*\s*\[\d+(g|ml)?\])|(?:\[\d+(g|ml)?\]\s*\*\s*\[[^\[\]]+\])/g;

export function isRequired(value: string) {
  return (value && value.length > 0) || 'Item must be filled in.';
}

export function isValidIngredientUnit(value: string) {
  return ['g', 'ml', ''].includes(value);
}

export function isPositiveNumber(value: number) {
  return value > 0 || 'Item must be positive number';
}

export function isNumber(value: number) {
  return !isNaN(value) || 'Item must be a number';
}

export const isValidFormula = (value: string): true | string => {
  // Check if the formula starts with a dash and a name followed by an equal sign (optional spaces)
  const startsWithDash = /^-\s*[a-zA-Z]+\s*=\s*/.test(value);
  if (!startsWithDash) {
    return 'Formula should start with a dash followed by a name and an equal sign.';
  }

  // Check for unclosed square brackets
  const unclosedBrackets = value.split('[').length !== value.split(']').length;
  if (unclosedBrackets) {
    return 'Unclosed square brackets detected.';
  }

  // Check for empty square brackets
  const emptyBrackets = /\[\s*?\]/.test(value);
  if (emptyBrackets) {
    return 'Square brackets cannot be empty.';
  }

  // Check for valid ingredient format
  const isValidFormat = isValidIngredientFormat(value);
  if (isValidFormat !== true) {
    return isValidFormat;
  }

  return true;
};

const isValidIngredientFormat = (value: string): true | string => {
  const ingredientPart = value.split('=')[1]?.trim();
  if (!ingredientPart) {
    return 'There should be at least one pair of ingredient added to the formula.';
  }

  // Check for patters like [number] * [string]
  const matches = [...ingredientPart.matchAll(ingredientPattern)];

  if (matches.length === 0) {
    return 'Invalid ingredient format. Each ingredient pair should be one string and one number.';
  }

  for (const match of matches) {
    const isValidPair = validatePair(match[0]);
    if (isValidPair !== true) {
      return isValidPair;
    }
  }

  return true;
};
const validatePair = (pair: string): true | string => {
  const parts = pair.split('*').map((part) => part.trim());
  if (parts.length !== 2) {
    console.log('Invalid pair length:', parts);
    return 'Invalid ingredient format. Each ingredient pair should be one string and one number.';
  }

  const [firstPart, secondPart] = parts;
  const isFirstPartString = isBracketedString(firstPart);
  const isSecondPartString = isBracketedString(secondPart);
  const isFirstPartNumber = isBracketedNumber(firstPart);
  const isSecondPartNumber = isBracketedNumber(secondPart);

  if (
    (isFirstPartString && isSecondPartNumber) ||
    (isFirstPartNumber && isSecondPartString)
  ) {
    return true;
  }

  return 'Invalid ingredient format. Each ingredient pair should be one string and one number.';
};


const isBracketedString = (part: string): boolean => {
  return /^\[[^\d\[\]]+\]$/.test(part);
};

const isBracketedNumber = (part: string): boolean => {
  return /^\[\d+(g|ml)?\]$/.test(part);
};

export const parseIngredients = (formula: string): Ingredient[] => {
  const matches = [...formula.matchAll(ingredientPattern)];
  return matches.map((match) => {
    const parts = match[0].split('*').map(part => part.trim());
    if (isBracketedNumber(parts[0]) && isBracketedString(parts[1])) {
      return {
        id: Math.random(),
        quantity: Number(parts[0].slice(1, -1).replace('g', '').replace('ml', '')),
        unit: parts[0].includes('g') ? 'g' : parts[0].includes('ml') ? 'ml' : '',
        name: parts[1].slice(1, -1),
      };
    } else {
      return {
        id: Math.random(),
        quantity: Number(parts[1].slice(1, -1).replace('g', '').replace('ml', '')),
        unit: parts[1].includes('g') ? 'g' : parts[1].includes('ml') ? 'ml' : '',
        name: parts[0].slice(1, -1),
      };
    }
  });
};

export const parseCakeName = (formula: string): string => {
  const match = formula.match(/^-\s*([a-zA-Z\s]+?)\s*=/);
  if (match && match[1]) {
    return match[1].trim();
  }
  return '';
}
