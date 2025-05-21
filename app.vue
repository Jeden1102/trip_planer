<template>
  <div>
    Testing
    <div class="flex flex-col gap-4 p-20">
      <Button label="Verify" class="w-fit" />
      <Checkbox v-model="checked" binary />
      <DatePicker v-model="date" class="w-fit" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const checked = ref(true);

const date = ref(null);
</script>
