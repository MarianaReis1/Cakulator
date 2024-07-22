<template>
  <UtilsBtnPrimary size="xl" @click="openDialog" data-testid="add-cake-btn"
    >Add Cake</UtilsBtnPrimary
  >

  <q-dialog v-model="dialogShouldShow" backdrop-filter="blur(4px)">
    <q-card
      class="tw-bg-primary tw-min-w-[340px]"
      data-testid="add-cake-dialog"
    >
      <q-card-section
        class="text-h6 tw-flex tw-justify-between tw-font-bold tw-flex-col-reverse sm:tw-flex-row"
      >
        <p class="tw-text-center sm:tw-text-left">New Cake Recipe</p>
        <q-btn icon="close" v-close-popup flat size="small"></q-btn>
      </q-card-section>

      <q-form ref="form" @submit="handleFormSubmit">
        <q-card-section class="tw-relative">
          <div class="tw-flex tw-flex-col tw-gap-y-2 tw-items-start">
            <q-input
              autofocus
              v-model="newCake.name"
              label="Name*"
              :rules="[(val) => isRequired(val)]"
              outlined
              dense
              class="tw-w-full"
            />
            <CustomInputsImage
              @input="(file: File) => (newCake.img.file = file)"
            />
            <CustomInputsIngredients
              :options="ingredientOptions"
              :modelValue="newCake.ingredients"
              @update:model-value="handleUpdateIngredients"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <UtilsBtnPrimary label="Save" type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { type Cake, type Ingredient } from "../types";
import { ingredientOptions } from "~/assets/data/ingredients";
import { handleFileUpload } from "~/utils/handleFileUpload.js";

const emit = defineEmits(["newCake"]);

const initialState: Cake = {
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
};
const newCake = ref<Cake>(structuredClone(initialState));

const handleFormReset = () => (newCake.value = structuredClone(initialState));

const handleUpdateIngredients = (values: Ingredient[]) => {
  newCake.value.ingredients = [...values];
};

const handleFormSubmit = async () => {
  const fileName = await handleFileUpload(newCake.value.img.file);
  newCake.value.img.fileName = fileName;

  emit("newCake", newCake.value);
  closeDialog();
  handleFormReset();
};

const dialogShouldShow = ref(false);
const openDialog = () => (dialogShouldShow.value = true);
const closeDialog = () => (dialogShouldShow.value = false);
</script>
