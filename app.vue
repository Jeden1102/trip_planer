<template>
  <div class="">
    Testing
    <div class="flex flex-col gap-4 p-20" style="transform-style: preserve-3d">
      <Button label="Verify" class="w-fit" />
      <Checkbox v-model="checked" binary />
      <DatePicker v-model="date" class="w-fit" />
      <HomeHero />
    </div>
  </div>
</template>

<script lang="ts" setup>
const checked = ref(true);

const date = ref(null);
</script>
