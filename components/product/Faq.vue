<template>
  <div class="container max-w-200 my-24 flex flex-col gap-16">
    <MoleculesHeadingDesc
      :title="$t('product.faq.title')"
      :desc="$t('product.faq.desc')"
    />
    <Accordion>
      <AccordionPanel
        class="bg-transparent"
        v-for="(item, key) in questions"
        :key="item.title"
        :value="key"
      >
        <AccordionHeader class="!bg-transparent">{{
          item.title
        }}</AccordionHeader>
        <AccordionContent class="[&>div]:!bg-transparent">
          <p class="m-0">{{ item.content }}</p>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "#imports";

const { t } = useI18n();

const questions = computed(() => {
  const arr: { title: string; content: string }[] = [];

  const keys = [0, 1, 2, 3, 4, 5, 6, 7];

  keys.forEach((key) => {
    arr.push({
      title: t(`product.faq.questions.${key}.question`),
      content: t(`product.faq.questions.${key}.answer`),
    });
  });

  return arr;
});
</script>
