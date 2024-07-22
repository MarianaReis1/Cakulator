import { describe, it, expect } from 'vitest';
import { isValidFormula, parseCakeName } from '~/utils/formValidation';

describe('isValidFormula', () => {
  it('should pass for valid formula with string and number pairs', () => {
    const validFormulas = [
      '- cake = [200g] * [flour] + [150g] * [butter] + [3] * [egg] + [100g] * [walnut] + [150g] * [sugar]',
      '- brownie = [3] * [egg] + [100g] * [chocolate]',
      '- bread = [500g] * [flour] + [300ml] * [water]',
      '- cake = [egg] * [3] + [4] * [sugar]',
    ];

    validFormulas.forEach((formula) => {
      expect(isValidFormula(formula)).toBe(true);
    });
  });

  it('should fail if the formula does not start with a dash followed by a name and equal sign', () => {
    const invalidFormula = 'cake = [200g] * [flour]';
    expect(isValidFormula(invalidFormula)).toBe('Formula should start with a dash followed by a name and an equal sign.');
  });

  it('should fail for formulas with unclosed square brackets', () => {
    const invalidFormulas = [
      '- cake = [200g * [flour]',
      '- cake = [200g] * [flour',
      '- cake = 200g] * [flour]',
    ];

    invalidFormulas.forEach((formula) => {
      expect(isValidFormula(formula)).toBe('Unclosed square brackets detected.');
    });
  });

  it('should fail for formulas with empty square brackets', () => {
    const invalidFormulas = [
      '- cake = [] * [flour]',
      '- cake = [200g] * []',
    ];

    invalidFormulas.forEach((formula) => {
      expect(isValidFormula(formula)).toBe('Square brackets cannot be empty.');
    });
  });

  it('should fail for formulas with pairs that are not one string and one number', () => {
    const invalidFormulas = [
      '- cake = [2] * [2]',
      '- cake = [egg] * [milk]',
      '- cake = [100g] * [200g]',
      '- cake = [egg] * [flour] * [butter]',
    ];

    invalidFormulas.forEach((formula) => {
      expect(isValidFormula(formula)).toBe('Invalid ingredient format. Each ingredient pair should be one string and one number.');
    });
  });

  it('should fail for formulas with no elements after the equal sign', () => {
    const invalidFormulas = ['- cake = '];

    invalidFormulas.forEach((formula) => {
      expect(isValidFormula(formula)).toBe('There should be at least one pair of ingredient added to the formula.');
    });
  });
});

describe('parseCakeName', () => {
  it('should correctly extract the cake name from the formula', () => {
    const formulas = [
      { formula: '- cake = [200g] * [flour] + [150g] * [butter]', expectedName: 'cake' },
      { formula: '- brownie = [3] * [egg] + [100g] * [chocolate]', expectedName: 'brownie' },
      { formula: '- bread = [500g] * [flour] + [300ml] * [water]', expectedName: 'bread' },
      { formula: '- muffin = [100g] * [sugar] + [200g] * [flour]', expectedName: 'muffin' },
      { formula: '- ice cake = [100g] * [sugar] + [200g] * [flour]', expectedName: 'ice cake' },
    ];

    formulas.forEach(({ formula, expectedName }) => {
      expect(parseCakeName(formula)).toBe(expectedName);
    });
  });

  it('should return an empty string if no cake name is found', () => {
    const invalidFormulas = [
      'cake = [200g] * [flour]',
      '- = [3] * [egg]',
      '-cake [200g] * [flour]',
    ];

    invalidFormulas.forEach((formula) => {
      expect(parseCakeName(formula)).toBe('');
    });
  });
});
