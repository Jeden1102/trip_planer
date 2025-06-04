<template>
  <main>
    <MoleculesHero
      :cta="{ href: '/generator', text: $t('common.generateATrip') }"
      :title="$t('home.hero.title')"
      :subtitle="$t('home.hero.subtitle')"
    />
    <HomeFeatures />
    <HomeTestimonials />
  </main>
</template>

<script setup lang="ts"></script>

<style scoped></style>
