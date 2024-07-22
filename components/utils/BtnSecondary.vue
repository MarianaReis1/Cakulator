<template>
  <q-btn :href="props.href" padding="xs xl" size="16px" flat no-caps stack>
    <slot />
    <q-icon name="keyboard_arrow_down" class="tw-animate-bounce"></q-icon>
  </q-btn>
</template>
<script setup lang="ts">
const props = defineProps<{
  href?: string;
}>();
</script>
