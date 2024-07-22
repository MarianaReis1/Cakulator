import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { Quasar, QInput, QBtn } from 'quasar';
import IngredientsInput from './Ingredients.vue';
import UtilsBtnPrimary from '~/components/utils/BtnPrimary.vue';
import CustomInputsAutocomplete from '~/components/customInputs/Autocomplete.vue';

describe('IngredientsInput.vue', () => {
  const wrapperFactory = (propsData = {}) => mount(IngredientsInput, {
    global: {
      plugins: [Quasar],
      components: { QInput, QBtn, UtilsBtnPrimary, CustomInputsAutocomplete },
    },
    props: {
      options: [
        { id: 1, name: 'Flour' },
        { id: 2, name: 'Sugar' },
        { id: 3, name: 'Butter' },
      ],
      modelValue: [
        { id: 1, name: 'Flour', quantity: 500, unit: 'g' },
      ],
      ...propsData,
    },
  });

  it('renders the first ingredient with correct values', () => {
    const wrapper = wrapperFactory();
    const inputFields = wrapper.findAllComponents(QInput);
    expect(inputFields.length).toBe(3);

    const ingredientNameInput = wrapper.findComponent(CustomInputsAutocomplete);
    expect(ingredientNameInput.exists()).toBe(true);

    expect(inputFields[0].props('modelValue')).toBe('Flour');
    expect(inputFields[1].props('modelValue')).toBe(500);
    expect(inputFields[2].props('modelValue')).toBe('g');
  });

    // // List of empty tests for future implementation
    // it('adds a new ingredient when "Add Ingredient" button is clicked', () => {});

    // it('removes an ingredient when delete button is clicked', () => {});

    // it('emits "update:modelValue" with the updated ingredients list when an ingredient is added', () => {});

    // it('emits "update:modelValue" with the updated ingredients list when an ingredient is removed', () => {});

    // it('updates the model value when an ingredient name is selected from the autocomplete', () => {});

    // it('validates the quantity input correctly', () => {});

    // it('validates the unit input correctly', () => {});
});
