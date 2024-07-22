<template>
  <div class="tw-relative">
    <q-input
      :model-value="selectedIngredientName"
      @update:model-value="(value) => handleInput(value as string)"
      :rules="[(val) => isRequired(val)]"
      :label="props.label"
      type="text"
      autofocus
      outlined
      dense
    />
    <ul
      v-if="showOptions"
      class="tw-w-full tw-rounded tw-bg-white tw-border tw-border-gray-300 tw-px-4 tw-py-2 tw-space-y-1 tw-absolute tw-top-10 tw-z-10"
    >
      <li
        v-for="ingredient in filteredOptions"
        :key="ingredient.id"
        @click="handleSelectOption(ingredient)"
        class="tw-cursor-pointer hover:tw-bg-gray-100 tw-p-1"
      >
        {{ ingredient.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { type Ingredient } from "~/types";

type AutocompleteProps = {
  options: Ingredient[];
  label: string;
  modelValue: string;
  selectedIngredients: Ingredient[];
};

const props = defineProps<AutocompleteProps>();
const emit = defineEmits(["update:modelValue"]);

const selectedIngredientName = ref(props.modelValue);
const handleInput = (value: string) => {
  selectedIngredientName.value = value;

  emit("update:modelValue", value);
};

const showOptions = computed(() => filteredOptions.value.length > 0);
const filteredOptions = computed(() => {
  if (selectedIngredientName.value === "") {
    return [];
  }

  let matches = 0;

  return props.options.filter((ing) => {
    const isAlreadySelected = props.selectedIngredients.some(
      (selected) => selected.id === ing.id,
    );

    if (
      !isAlreadySelected &&
      ing.name
        .toLowerCase()
        .includes(selectedIngredientName.value.toLowerCase()) &&
      matches < 10
    ) {
      matches++;
      return ing;
    }
  });
});

const handleSelectOption = (ingredient: Ingredient) => {
  selectedIngredientName.value = ingredient.name;

  emit("update:modelValue", ingredient.name);
};
</script>
