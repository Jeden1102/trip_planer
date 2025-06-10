<template>
  <div
    class="container relative w-full overflow-hidden rounded-lg bg-background my-40"
  >
    <div class="flex justify-center">
      <MotionSimpleText>
        <UiTestimonialSlider :testimonials="testimonials" />
      </MotionSimpleText>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const testimonials = computed(() => {
  const arr: { quote: string; name: string; role: string; img: string }[] = [];
  const keys = [0, 1, 2];

  keys.forEach((key) => {
    arr.push({
      quote: t(`testimonials.${key}.quote`),
      name: t(`testimonials.${key}.name`),
      role: t(`testimonials.${key}.role`),
      img: t(`testimonials.${key}.img`),
    });
  });

  return arr;
});
</script>
