<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: "tw-bg-primary tw-font-body tw-text-base tw-text-dark",
  },
});
</script>
