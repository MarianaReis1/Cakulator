<template>
  <q-file
    @update:model-value="handleImageChange"
    :model-value="file"
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
import { ref } from "vue";

const emit = defineEmits(["input"]);

const file = ref<File>();

const handleImageChange = (item: File) => {
  file.value = item;
  emit("input", file.value);
};
</script>
