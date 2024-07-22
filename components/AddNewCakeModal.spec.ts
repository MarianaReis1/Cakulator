import { ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { Quasar, QBtn, QDialog, QCard, QCardSection, QCardActions, QForm, QInput } from 'quasar';
import AddNewCakeModal from './AddNewCakeModal.vue';
import UtilsBtnPrimary from '~/components/utils/BtnPrimary.vue';

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
        UtilsBtnPrimary, CustomInputsImage, CustomInputsIngredients },
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
    attachTo: document.body,
    setup() {
      const newCake = ref({
        name: "",
        img: { file: null, fileName: "" },
        ingredients: [
          {
            id: 0,
            name: "",
            quantity: null,
            unit: "",
          },
        ],
      });
      const dialogShouldShow = ref(false);
      const openDialog = () => (dialogShouldShow.value = true);
      return {
        newCake,
        dialogShouldShow,
        openDialog,
      };
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
      const openButton = wrapper.findComponent(UtilsBtnPrimary);
      await openButton.trigger('click');
      await wrapper.vm.$nextTick();

      const teleportedDialogContent = document.body.querySelector('.q-dialog');
      expect(teleportedDialogContent).not.toBeNull();
  });
  
  // // List of empty tests for future implementation
  // it('closes dialog on close button click', async () => {});

  // it('validates form fields', async () => {});

  // it('emits "newCake" event with correct payload on form submit', async () => {});

  // it('resets form fields after submission', async () => {});
});
