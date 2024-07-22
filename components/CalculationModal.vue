<template>
  <UtilsBtnPrimary size="xl" @click="openDialog">Calculator</UtilsBtnPrimary>

  <q-dialog v-model="dialogShouldShow" backdrop-filter="blur(4px)">
    <q-card>
      <q-card-section class="text-h6 tw-flex tw-justify-between tw-font-bold">
        Your cakulation is ready!
        <q-btn icon="close" v-close-popup flat size="small"></q-btn>
      </q-card-section>

      <q-card-section>
        <section class="tw-max-w-[460px] tw-w-full">
          <p class="tw-text-center tw-mb-5">
            Here you can see the total list of ingredients necessary to bake the
            cakes you selected.
          </p>
          <div class="tw-rounded-5 tw-bg-secondary tw-rounded-xl">
            <div class="tw-flex tw-justify-end tw-border-b-2 tw-border-white">
              <q-btn
                icon="content_copy"
                flat
                @click="() => handleCopy(ingredientsToBuy)"
              ></q-btn>
              <q-btn
                icon="print"
                flat
                @click="() => handlePrint(ingredientsToBuy)"
              ></q-btn>
            </div>
            <ul class="tw-p-5 tw-text-center">
              <li
                v-for="ingredient in ingredientsToBuy"
                :key="ingredient.name + ingredient.unit"
              >
                {{ ingredient.quantity }} {{ ingredient.unit }} -
                {{ ingredient.name }}
              </li>
            </ul>
          </div>
        </section>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { type Ingredient, type Cake } from "~/types";
import { handleCopy, handlePrint } from "~/utils";

const allCakes = defineModel();

const ingredientsToBuy = computed(() => {
  const ingredientMap = new Map<string, Ingredient>();

  (allCakes.value as Cake[]).forEach((cake) => {
    cake.ingredients.forEach((ingredient) => {
      const key = `${ingredient.name}-${ingredient.unit}`;
      const quantity = parseFloat(ingredient.quantity as unknown as string);
      if (ingredientMap.has(key)) {
        ingredientMap.get(key)!.quantity += quantity;
      } else {
        ingredientMap.set(key, { ...ingredient, quantity });
      }
    });
  });

  return Array.from(ingredientMap.values());
});

const dialogShouldShow = ref(false);
const openDialog = () => (dialogShouldShow.value = true);
</script>
