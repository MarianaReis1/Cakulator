import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { Quasar, QFile, QIcon } from 'quasar';
import ImageInput from './Image.vue';

describe('ImageInput.vue', () => {
  const wrapperFactory = (propsData = {}) => mount(ImageInput, {
    global: {
      plugins: [Quasar],
      components: { QFile, QIcon },
    },
    props: {
      ...propsData,
    },
  });

  it('renders the QFile component with the correct label', () => {
    const wrapper = wrapperFactory();
    const ImageInput = wrapper.findComponent(QFile);
    expect(ImageInput.exists()).toBe(true);
    expect(ImageInput.props('label')).toBe('Select Image');
  });

    // // List of empty tests for future implementation
    // it('accepts only image files', () => {});

    // it('emits "input" event with the selected file', async () => {});

    // it('updates the model value when a file is selected', async () => {});
});
