<template>
  <MotionSimpleText class="text-center">
    <h3 class="text-4xl md:text-6xl font-semibold my-2">{{ title }}</h3>
    <p>{{ desc }}</p>
  </MotionSimpleText>
</template>

<script setup lang="ts">
defineProps<{ title: string; desc: string }>();
</script>
