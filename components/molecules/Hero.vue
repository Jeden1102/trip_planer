<template>
  <AuroraBackground>
    <Motion
      as="div"
      :initial="{ opacity: 0, y: 40, filter: 'blur(10px)' }"
      :while-in-view="{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      }"
      :inViewOptions="{ once: true }"
      :transition="{
        delay: 0.3,
        duration: 0.8,
        ease: 'easeInOut',
      }"
      class="relative flex flex-col items-center justify-center gap-4 px-4 max-w-200"
    >
      <div class="text-center text-5xl font-bold md:text-7xl">
        {{ title }}
      </div>
      <div
        class="py-4 text-xl font-extralight md:text-4xl leading-tight"
        v-if="subtitle"
      >
        {{ subtitle }}
      </div>
      <UiInteractiveHoverButton v-if="cta" :to="cta.href" :text="cta.text" />
    </Motion>
  </AuroraBackground>
</template>

<script setup lang="ts">
import { Motion } from "motion-v";
import AuroraBackground from "@/components/ui/aurora-background/AuroraBackground.vue";

defineProps<{
  title: string;
  subtitle?: string;
  cta?: {
    text: string;
    href: string;
  };
}>();
</script>
