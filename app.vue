<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: "tw-bg-secondary tw-font-body tw-text-base tw-text-dark",
  },
});
</script>
