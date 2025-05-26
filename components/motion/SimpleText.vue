<template>
  <Motion
    :initial="{ opacity: 0, y: 40, filter: 'blur(10px)' }"
    :while-in-view="{
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
    }"
    :transition="{
      duration: 0.8,
      ease: 'easeInOut',
      ...transition,
    }"
  >
    <slot />
  </Motion>
</template>

<script setup lang="ts">
import { Motion } from "motion-v";

defineProps<{
  transition?: Record<string, string | number>;
}>();
</script>
