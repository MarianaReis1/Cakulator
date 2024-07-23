import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import CakesPage from '~/pages/cakes.vue';
import { type Cake } from '~/types';
import { Quasar, QIcon } from 'quasar';
import NuxtLayout from '~/layouts/cakes.vue'

const AddNewCakeModal = {
  template: '<div></div>'
};

const CalculationModal = {
  template: '<div></div>'
};
const NuxtLink = {
  template: '<a></a>'
};


describe('CakesPage.vue', () => {
    const wrapperFactory = () => mount(CakesPage, {
    global: {
      plugins: [Quasar],
      components: { AddNewCakeModal, CalculationModal, NuxtLayout, NuxtLink, QIcon },
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

  it('should display "Let\'s add new cakes" when there are no cakes', () => {
    const wrapper = wrapperFactory()
    
    expect(wrapper.text()).toContain("Let's add new cakes")
  })

  it('should display "Your Cakes!" when there are cakes', async () => {
    const wrapper = wrapperFactory()
    const vm = wrapper.vm as any;

    const cake: Cake = {
      name: 'Test Cake',
      img: { file: null, fileName: '' },
      ingredients: [],
    }
    
    await vm.handleSaveCake(cake)
    await wrapper.vm.$nextTick();
    
    expect(wrapper.text()).toContain('Your Cakes!')
  })

  it('should add a new cake when handleSaveCake is called', async () => {
    const wrapper = wrapperFactory()
    const vm = wrapper.vm as any;
    
    const cake: Cake = {
      name: 'Chocolate Cake',
      img: { file: null, fileName: '' },
      ingredients: [{ id: 1, name: 'flour', quantity: 200, unit: 'g' }],
    }
    
    await vm.handleSaveCake(cake);
    await wrapper.vm.$nextTick();
    
    expect(vm.allCakes).toContainEqual(cake)
  })

  it('should render cake details correctly', async () => {
    const wrapper = wrapperFactory()
    const vm = wrapper.vm as any;
    
    const cake: Cake = {
      name: 'Strawberry Cake',
      img: { file: null, fileName: '' },
      ingredients: [
        { id: 1, name: 'strawberry', quantity: 100, unit: 'g' },
        { id: 2, name: 'sugar', quantity: 50, unit: 'g' },
      ],
    }
    
    await vm.handleSaveCake(cake)
    
    const cakeItem = wrapper.find('li')
    expect(cakeItem.text()).toContain('Strawberry Cake')
    expect(cakeItem.text()).toContain('2 ingredients')
  })

  // TODO: Test if the CalculationModal is displayed when there are cakes
  // TODO: Test if the AddNewCakeModal is functional
  // TODO: Test if the image is displayed correctly when img.fileName is present
  // TODO: Test if the q-icon is displayed when img.fileName is not present
})
