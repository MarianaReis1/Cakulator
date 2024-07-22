<template>
  <div
    class="tw-flex tw-gap-2 tw-flex-col tw-w-full sm:tw-flex-row sm:tw-gap-5"
    v-for="(item, index) in ingredients"
    :key="item.id"
  >
    <CustomInputsAutocomplete
      label="Ingredient*"
      :options="props.options"
      :model-value="item.name"
      :selectedIngredients="ingredients"
      @update:model-value="
        (value: string) => handleIngredientSelect(index, value)
      "
    />
    <q-input
      v-model="item.quantity"
      label="Quantity*"
      :rules="[
        (v: string) => isRequired(v),
        (v: number) => isNumber(v),
        (v: number) => isPositiveNumber(v),
      ]"
      outlined
      dense
    />
    <q-input
      v-model="item.unit"
      label="Unit"
      :rules="[(v: string) => isValidIngredientUnit(v)]"
      outlined
      dense
    />
    <q-btn
      v-if="ingredients.length > 1"
      icon="delete"
      size="small"
      class="tw-h-8 -tw-top-5 sm:tw-top-1"
      @click="() => removeIngredient(index)"
      dense
    ></q-btn>
  </div>
  <UtilsBtnPrimary @click="addIngredient">Add Ingredient</UtilsBtnPrimary>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { generateTempId } from "~/utils";
import { type Ingredient } from "~/types";

type IngredientsProps = {
  options: Ingredient[];
  modelValue: Ingredient[];
};

const props = defineProps<IngredientsProps>();
const emit = defineEmits(["update:modelValue"]);

const ingredients = ref<Ingredient[]>([...props.modelValue]);

const addIngredient = () => {
  ingredients.value.push({
    name: "",
    quantity: null,
    unit: "",
    id: generateTempId(),
  });

  emit("update:modelValue", ingredients.value);
};
const removeIngredient = (index: number) => {
  ingredients.value.splice(index, 1);
  emit("update:modelValue", ingredients.value);
};
const handleIngredientSelect = (index: number, value: string) => {
  const selectedIngredients = props.options.find(
    (option) => option.name === value,
  );
  if (selectedIngredients) {
    ingredients.value[index] = {
      ...ingredients.value[index],
      id: selectedIngredients.id,
      name: selectedIngredients.name,
    };
  } else {
    ingredients.value[index] = {
      ...ingredients.value[index],
      id: generateTempId(),
      name: value,
    };
  }
  emit("update:modelValue", ingredients.value);
};
</script>
