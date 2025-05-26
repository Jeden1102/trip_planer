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

const { messages, locale } = useI18n();

const testimonials = computed(() => {
  const arr: { quote: string; name: string; role: string; img: string }[] = [];
  const currentMessages: any = messages.value[locale.value].testimonials;

  Object.keys(currentMessages).forEach((key) => {
    arr.push({
      quote: currentMessages[key].quote.body.static,
      name: currentMessages[key].name.body.static,
      role: currentMessages[key].role.body.static,
      img: currentMessages[key].img.body.static,
    });
  });

  return arr;
});
</script>
