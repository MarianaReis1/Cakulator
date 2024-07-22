<template>
  <NuxtLayout
    name="cakes"
    :title="hasCakes ? 'Your Cakes!' : `Let's add new cakes`"
  >
    <section class="tw-max-w-[560px] tw-mx-auto">
      <div
        class="tw-flex tw-gap-5 tw-p-4 tw-justify-center tw-mt-10 tw-flex-wrap tw-text-white"
      >
        <AddNewCakeModal @new-cake="handleSaveCake" />
        <CalculationModal v-if="hasCakes" v-model="allCakes" />
      </div>

      <ul
        v-if="hasCakes"
        class="tw-flex tw-flex-col tw-gap-10 tw-items-center tw-p-3 tw-mt-10 md:tw-p-6"
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
            <h1 class="text-h4 tw-font-bold tw-uppercase">{{ cake.name }}</h1>
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
import { type Cake } from "~/types";
import { pluralize } from "~/utils";

const allCakes = ref<Cake[]>([]);

const hasCakes = computed(() => allCakes.value.length > 0);

const handleSaveCake = (cake: Cake) => {
  allCakes.value = [...allCakes.value, cake];
};
</script>
