<template>
  <div class="tw-relative tw-w-full">
    <q-input
      ref="ingredientInput"
      :model-value="inputedFormula"
      @update:model-value="handleEmit"
      @keyup="handleKeyUp"
      label="Formula*"
      :rules="[
        (val: string) => isRequired(val),
        (val: string) => isValidFormula(val),
      ]"
      outlined
      dense
      class="tw-w-full"
      placeholder="- brownie = [200g] * [flour] + [150g] * [butter]"
      validate-on-blur
      lazy-rules
    />
    <ul
      v-if="showOptions"
      class="tw-w-full tw-rounded tw-bg-tertiary tw-border tw-border-tertiary tw-px-4 tw-py-2 tw-space-y-1 tw-absolute tw-top-10 tw-z-10"
    >
      <li
        v-for="ingredient in filteredOptions"
        :key="ingredient.id"
        @click="handleSelectOption(ingredient)"
        class="tw-cursor-pointer hover:tw-bg-secondary tw-p-1"
      >
        {{ ingredient.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { type Ingredient } from "~/types";
import { ingredientOptions } from "~/assets/data/ingredients";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const inputedFormula = ref<string>(props.modelValue);
const selectedIngredientName = ref<string>("");

const showOptions = computed(() => filteredOptions.value.length > 0);
const filteredOptions = computed(() => {
  if (selectedIngredientName.value === "") {
    return [];
  }

  let matches = 0;

  return ingredientOptions.filter((ing) => {
    if (
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

const handleEmit = (value: string | number | null) => {
  inputedFormula.value = value as string;
  emit("update:modelValue", inputedFormula.value);
};

const handleKeyUp = (event: KeyboardEvent) => {
  const value = (event.target as HTMLInputElement).value;
  const match = value.match(/\[(.*?)\]?$/);
  if (match) {
    selectedIngredientName.value = match[1];
  } else {
    selectedIngredientName.value = "";
  }
  emit("update:modelValue", inputedFormula.value);
};

const handleSelectOption = (ingredient: Ingredient) => {
  const formulaValue = inputedFormula.value.replace(
    /\[(.*?)\]?$/,
    `[${ingredient.name}]`,
  );
  inputedFormula.value = formulaValue;
  selectedIngredientName.value = "";
  emit("update:modelValue", formulaValue);
};
</script>
