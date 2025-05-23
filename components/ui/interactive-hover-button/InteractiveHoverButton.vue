<template>
  <component
    :is="props.to ? NuxtLink : 'button'"
    :to="props.to"
    ref="buttonRef"
    :class="
      cn(
        'group relative w-auto cursor-pointer overflow-hidden rounded-full  bg-black text-white p-2 px-6 text-center font-semibold',
        props.class
      )
    "
  >
    <div class="flex items-center gap-2">
      <span
        class="inline-block whitespace-nowrap transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0"
      >
        {{ text }}
      </span>
    </div>

    <div
      class="absolute top-0 z-10 flex size-full translate-x-12 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100"
    >
      <span class="whitespace-nowrap">{{ text }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-arrow-right"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </div>
  </component>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { cn } from "@/lib/utils";
import { NuxtLink } from "#components";

interface Props {
  text?: string;
  class?: string;
  to?: string;
}

const props = withDefaults(defineProps<Props>(), {
  text: "Button",
});

const buttonRef = ref<HTMLButtonElement | null>(null);
</script>
