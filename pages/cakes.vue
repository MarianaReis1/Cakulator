<template>
  <NuxtLayout
    name="cakes"
    :title="hasCakes ? 'Your Cakes!' : `Let's add new cakes`"
  >
    <section class="tw-w-full md:tw-w-1/2">
      <div
        class="tw-flex tw-gap-5 tw-p-4 tw-justify-center tw-mb-14 tw-flex-wrap tw-max-w-[560px] tw-mx-auto"
      >
        <AddNewCakeModal @new-cake="handleSaveCake" />
        <CalculationModal v-if="hasCakes" v-model="allCakes" />
      </div>

      <ul
        v-if="hasCakes"
        class="tw-flex tw-flex-col tw-gap-5 tw-p-3 tw-mt-10 tw-max-w-[560px] tw-mx-auto md:tw-p-6"
      >
        <li v-for="cake in allCakes" :key="cake.name" class="tw-flex tw-gap-5">
          <img
            v-if="cake.img.fileName"
            :src="cake.img.fileName"
            alt="cake image"
            class="tw-w-20 tw-h-20 tw-object-cover"
          />
          <q-icon v-else name="cake" size="80px"></q-icon>
          <div class="tw-flex tw-flex-col tw-gap-1">
            <h1 class="text-h4 tw-font-bold">{{ cake.name }}</h1>
            <h2 class="text-h6">
              {{ cake.ingredients.length }}
              {{ pluralize("ingredient", cake.ingredients.length) }}
            </h2>
          </div>
        </li>
      </ul>
    </section>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { type Cake } from "../types";
import { pluralize } from "~/utils";

const allCakes = ref<Cake[]>([
  // {
  //   name: "test",
  //   img: { file: null, fileName: "" },
  //   ingredients: [
  //     {
  //       name: "egg",
  //       unit: "",
  //       quantity: 12,
  //       id: 2,
  //     },
  //     {
  //       name: "flour",
  //       unit: "g",
  //       quantity: 200,
  //       id: 3,
  //     },
  //   ],
  // },
  // {
  //   name: "test 2",
  //   img: { file: null, fileName: "" },
  //   ingredients: [
  //     {
  //       name: "egg",
  //       unit: "",
  //       quantity: 12,
  //       id: 2,
  //     },
  //     {
  //       name: "flour",
  //       unit: "g",
  //       quantity: 200,
  //       id: 3,
  //     },
  //   ],
  // },
]);

const hasCakes = computed(() => allCakes.value.length > 0);

const handleSaveCake = (cake: Cake) => {
  allCakes.value = [...allCakes.value, cake];
  console.log(
    "cakes, all cakes",
    cake.ingredients,
    allCakes.value[0].ingredients,
  );
};
</script>
