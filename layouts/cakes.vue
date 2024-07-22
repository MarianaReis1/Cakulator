<template>
  <q-layout>
    <q-page-container class="tw-flex tw-items-center tw-justify-center">
      <div class="tw-max-w-screen-lg tw-mx-auto tw-p-5 tw-w-full md:tw-p-10">
        <section
          class="tw-w-full tw-flex tw-gap-4 tw-justify-between tw-flex-col md:tw-flex-row"
        >
          <NuxtLink to="/" class="block tw-text-white tw-mx-auto md:tw-m-0">
            <q-btn flat icon="home" size="lg" no-caps padding="md lg"
              >Home</q-btn
            >
          </NuxtLink>

          <h1 class="text-h2 tw-font-logo tw-text-center md:tw-text-left">
            {{ props.title }}
          </h1>
        </section>
        <slot />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
const props = useAttrs();
</script>
