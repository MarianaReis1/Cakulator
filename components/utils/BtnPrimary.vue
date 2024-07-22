<template>
  <q-btn :href="props.href" padding="xs xl" size="16px" outline no-caps
    ><slot
  /></q-btn>
</template>
<script setup lang="ts">
const props = defineProps<{
  href?: string;
}>();
</script>
