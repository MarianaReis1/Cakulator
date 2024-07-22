import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { Quasar, QInput } from 'quasar';
import Autocomplete from './Autocomplete.vue';
import type { Ingredient } from '~/types';

describe('Autocomplete.vue', () => {
    const options: Ingredient[] = [
        { id: 1, name: 'Flour' },
        { id: 2, name: 'Sugar' },
        { id: 3, name: 'Butter' },
    ];

    const wrapperFactory = (propsData = {}) => mount(Autocomplete, {
        global: {
        plugins: [Quasar],
        components: { QInput },
        },
        props: {
        options,
        label: 'Ingredient',
        modelValue: '',
        selectedIngredients: [],
        ...propsData,
        },
    });

    it('renders the input with the correct label', () => {
        const wrapper = wrapperFactory();
        const input = wrapper.findComponent(QInput);
        expect(input.exists()).toBe(true);
        expect(input.props('label')).toBe('Ingredient');
    });

    // // List of empty tests for future implementation
    // it('updates the model value on input', () => {});

    // it('filters options based on input', () => {});

    // it('displays filtered options list when input is focused', () => {});

    // it('emits the selected option name when an option is clicked', () => {});

    // it('does not show already selected options', () => {});

    // it('limits the number of displayed options to 10', () => {});

    // it('shows no options when the input is empty', () => {});
});
