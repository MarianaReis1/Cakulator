import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { Quasar, QBtn, QDialog, QCard, QCardSection, QCardActions, QForm, QInput } from 'quasar';
import AddNewCakeModal from './AddNewCakeModal.vue';
import BtnPrimary from './utils/BtnPrimary.vue'

const CustomInputsImage = {
  template: '<div></div>'
};
const CustomInputsIngredients = {
  template: '<div></div>'
};

describe('AddNewCakeModal.vue', () => {
   const wrapperFactory = () => mount(AddNewCakeModal, {
    global: {
      plugins: [Quasar],
      components: {  QBtn, QDialog, QCard, QCardSection, QCardActions, QForm, QInput,
        BtnPrimary, CustomInputsImage, CustomInputsIngredients },
      mocks: {
        $q: {
          platform: {
            has: {
              touch: false,
            },
          },
          notify: vi.fn(),
          dialog: vi.fn(),
        },
      },
    },
  });

  it('renders the component', () => {
    const wrapper = wrapperFactory();
    expect(wrapper.exists()).toBe(true);
  });

  it('dialog is not visible initially', () => {
    const wrapper = wrapperFactory();
    const dialog = wrapper.findComponent(QDialog);
    expect(dialog.isVisible()).toBe(false);
  });

  it('opens dialog on "Add Cake" button click', async () => {
    const wrapper = wrapperFactory();
    const addButton = wrapper.find('[data-testid="add-cake-btn"]');
    await addButton.trigger('click');

    const dialog = wrapper.findComponent(QDialog);
    expect(dialog.isVisible()).toBe(true);
  });

  it('closes dialog on close button click', async () => {
     const wrapper = wrapperFactory();
     wrapper.setData({dialogShouldShow: true})
  });

//   it('validates form fields', async () => {
//      const wrapper = wrapperFactory();
//     const addButton = wrapper.find('[data-testid="add-cake-btn"]');
//     await addButton.trigger('click');

//     const form = wrapper.findComponent(QForm);
//     const input = wrapper.findComponent(QInput);

//     await input.setValue('');
//     await wrapper.vm.$nextTick(); 
//     expect(form.vm.validate()).toBe(false);

//     await input.setValue('Chocolate Cake');
//     expect(form.vm.validate()).toBe(true);
//   });

//   it('emits "newCake" event with correct payload on form submit', async () => {
//     const wrapper = wrapperFactory();
//     await wrapper.setData({ dialogShouldShow: true });
//     const input = wrapper.findComponent(QInput);
//     await input.setValue('Chocolate Cake');

//     const form = wrapper.findComponent(QForm);
//     await form.trigger('submit.prevent');

//     expect(wrapper.emitted('newCake')).toBeTruthy();
//     expect(wrapper.emitted('newCake')?.[0]?.[0]).toEqual({
//       name: 'Chocolate Cake',
//       img: { file: null, fileName: '' },
//       ingredients: [
//         {
//           id: 0,
//           name: '',
//           quantity: 0,
//           unit: '',
//         },
//       ],
//     });
//   });

//   it('resets form fields after submission', async () => {
//     const wrapper = wrapperFactory();
//     await wrapper.setData({ dialogShouldShow: true });
//     const input = wrapper.findComponent(QInput);
//     await input.setValue('Chocolate Cake');

//     const form = wrapper.findComponent(QForm);
//     await form.trigger('submit.prevent');

//     expect(wrapper.vm.onNewCake?.name).toBe('');
//   });
});
