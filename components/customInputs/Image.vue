<template>
  <q-file
    v-if="config.public.showImageInput"
    v-model="modal"
    accept="image/*"
    class="tw-w-full tw-mb-5"
    label="Select Image"
    outlined
    dense
  >
    <template v-slot:prepend>
      <q-icon name="attach_file" />
    </template>
  </q-file>
</template>

<script lang="ts" setup>
const modal = defineModel({ type: File });

const config = useRuntimeConfig();
</script>
