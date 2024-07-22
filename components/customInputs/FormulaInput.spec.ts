import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { Quasar, QInput } from 'quasar';
import FormulaInput from '~/components/customInputs/FormulaInput.vue';

describe('FormulaInput.vue', () => {
  const wrapperFactory = () => mount(FormulaInput, {
    global: {
      plugins: [Quasar],
      components: { QInput },
      mocks: {
        $q: {
          platform: {
            has: {
              touch: false,
            },
          },
        },
      },
    },    
  });

  it('renders the component', () => {
    const wrapper = wrapperFactory();
    expect(wrapper.exists()).toBe(true);
  });

  it('displays autocomplete options when typing an ingredient', async () => {
    const wrapper = wrapperFactory()
    const vm = wrapper.vm as any;

    const input = wrapper.findComponent(QInput).find('input');
    await input.setValue('- cake = [fl');
    await input.trigger('keyup');
    await wrapper.vm.$nextTick();

    expect(vm.selectedIngredientName).toBe('fl');
    expect(vm.showOptions).toBe(true);
    expect(wrapper.findAll('li').length).toBeGreaterThan(0);
  });
});
