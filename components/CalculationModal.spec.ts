import { ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Quasar, QBtn, QDialog, QCard, QCardSection } from 'quasar';
import CakulatorModal from './CalculationModal.vue';
import UtilsBtnPrimary from '~/components/utils/BtnPrimary.vue';

describe('CakulatorModal.vue', () => {
    const wrapperFactory = () => mount(CakulatorModal, {
        global: {
        plugins: [Quasar],
        components: { QBtn, QDialog, QCard, QCardSection, UtilsBtnPrimary },
        mocks: {
            $q: {
            platform: {
                has: {
                touch: false,
                },
            },
            notify: vi.fn(),
            },
        },
        },
        attachTo: document.body,
        setup() {
            const dialogShouldShow = ref(false);
            const openDialog = () => (dialogShouldShow.value = true);
            return {
                dialogShouldShow,
                openDialog,
                ingredientsToBuy: [
                { name: 'Flour', quantity: 500, unit: 'g' },
                { name: 'Sugar', quantity: 200, unit: 'g' },
                ],
            };
        },
    });

    it('displays correct list of ingredients', async () => {
        const wrapper = wrapperFactory();
        const vm = wrapper.vm as any;

        vm.dialogShouldShow = true;
        await wrapper.vm.$nextTick();

        const teleportedDialogContent = document.body.querySelector('.q-dialog');
        expect(teleportedDialogContent).not.toBeNull();

        const ingredientsList = teleportedDialogContent?.querySelectorAll('[data-testid="ingredient"]');
        expect(ingredientsList?.length).toBe(2);
        expect(ingredientsList?.[0].textContent).toBe('500 g - Flour');
        expect(ingredientsList?.[1].textContent).toBe('200 g - Sugar');
    });

    it('renders the component', () => {
        const wrapper = wrapperFactory();
        expect(wrapper.exists()).toBe(true);
    });

    it('dialog is not visible initially', () => {
        const wrapper = wrapperFactory();
        const vm = wrapper.vm as any;
        expect(vm.dialogShouldShow).toBe(false);
    });

    it('opens dialog on "Cakulator" button click', async () => {
        const wrapper = wrapperFactory();
        const openButton = wrapper.findComponent(UtilsBtnPrimary);
        await openButton.trigger('click');
        await wrapper.vm.$nextTick();

        const teleportedDialogContent = document.body.querySelector('.q-dialog');
        expect(teleportedDialogContent).not.toBeNull();
    });

    // // List of empty tests for future implementation
    // it('closes dialog on close button click', async () => {});

    // it('copies ingredients list to clipboard on copy button click', async () => {});

    // it('prints ingredients list on print button click', async () => {});
});
