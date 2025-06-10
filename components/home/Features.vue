<template>
  <div class="flex flex-col overflow-hidden container">
    <ContainerScroll v-for="feature in features">
      <template #title>
        <MotionSimpleText>
          <h1 class="text-4xl md:text-6xl font-semibold">
            {{ $t(feature.title) }}
          </h1>
          <p>{{ $t(feature.subtitle) }}</p>
        </MotionSimpleText>
      </template>
      <template #card>
        <NuxtImg
          src="/images/linear.webp"
          class="mx-auto h-full rounded-2xl object-cover object-left-top"
          alt="hero"
          height="720"
          width="1400"
          loading="lazy"
        />
      </template>
    </ContainerScroll>
  </div>
</template>

<script setup lang="ts">
import ContainerScroll from "../ui/container-scroll/ContainerScroll.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const features = computed(() => {
  const arr: { title: string; subtitle: string }[] = [];

  const keys = [0, 1, 2, 3];

  keys.forEach((key) => {
    arr.push({
      title: t(`features.${key}.title`),
      subtitle: t(`features.${key}.description`),
    });
  });

  return arr;
});
</script>
