<template>
  <div class="flex flex-col overflow-hidden">
    <ContainerScroll>
      <template #title>
        <h1 class="text-4xl font-semibold">
          Unleash the power of <br />
          <span class="mt-1 text-4xl font-bold leading-none md:text-[6rem]">
            Scroll Animations
          </span>
        </h1>
      </template>
      <template #card>
        <NuxtImg
          src="/images/linear.webp"
          class="mx-auto h-full rounded-2xl object-cover object-left-top"
          alt="hero"
          height="720"
          width="1400"
        />
      </template>
    </ContainerScroll>
  </div>
</template>

<script setup lang="ts">
import ContainerScroll from "../ui/container-scroll/ContainerScroll.vue";
</script>

<style scoped></style>
