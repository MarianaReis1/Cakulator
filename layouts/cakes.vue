<template>
  <q-layout>
    <q-page-container
      class="tw-flex tw-items-center tw-justify-center tw-text-dark tw-bg-secondary"
    >
      <div
        class="tw-max-w-screen-lg tw-mx-auto tw-w-[95dvw] tw-flex tw-flex-col md:tw-flex-row"
      >
        <section
          class="tw-w-full tw-flex tw-flex-col tw-text-center md:tw-w-1/2 md:tw-text-left"
        >
          <nav>
            <NuxtLink to="/" class="inline-block">
              <q-btn flat icon="home" size="lg" no-caps padding="md lg"
                >Home</q-btn
              >
            </NuxtLink>
          </nav>

          <h1 class="text-h1 tw-font-logo tw-p-3 tw-mt-10 md:tw-p-6">
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
