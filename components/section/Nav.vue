<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useWindowScroll } from "@vueuse/core";
import InteractiveHoverButton from "../ui/interactive-hover-button/InteractiveHoverButton.vue";
import { cn } from "~/lib/utils";

const { locales, locale, setLocale } = useI18n();

const options = computed(() =>
  locales.value.map((l) => ({ label: l.name, value: l.code }))
);

const selectedLocale = ref(locale.value);
const menuActive = ref(false);

watch(selectedLocale, (newLocale) => {
  setLocale(newLocale);
});

const { y } = useWindowScroll();
const scrolled = computed(() => y.value > 20);
</script>

<template>
  <nav
    :class="
      cn(
        'fixed top-6 left-0 right-0 z-50 container mx-auto py-6 px-8 flex items-center justify-between rounded-2xl transition-all duration-300',
        'backdrop-blur-md shadow-sm bg-white/50',
        scrolled &&
          !menuActive &&
          'bg-transparent border-none shadow-none backdrop-blur-none'
      )
    "
  >
    <div
      :class="
        cn(
          'flex items-center gap-12 transition-all duration-300',
          scrolled && !menuActive && '-translate-y-full opacity-0'
        )
      "
    >
      <NuxtLink :to="$localePath('index')" class="mr-8">
        <NuxtImg src="/images/logo.png" alt="logo" width="120" />
      </NuxtLink>
      <NuxtLink class="font-medium" :to="$localePath('product')">
        {{ $t("nav.product") }}
      </NuxtLink>
      <NuxtLink class="font-medium" :to="$localePath('about')">
        {{ $t("nav.about") }}
      </NuxtLink>
    </div>

    <div class="flex gap-6 items-center">
      <div
        :class="
          cn(
            'flex gap-6 items-center transition-all duration-300',
            scrolled && !menuActive && '-translate-y-full opacity-0'
          )
        "
      >
        <NuxtLink class="font-medium" :to="$localePath('login')">
          {{ $t("nav.login") }}
        </NuxtLink>
        <Select
          v-model="selectedLocale"
          :options="options"
          optionLabel="label"
          optionValue="value"
          size="small"
        />
      </div>

      <InteractiveHoverButton
        :text="$t('nav.generate')"
        :to="$localePath('generator')"
      />

      <Button
        @click="menuActive = !menuActive"
        v-if="scrolled"
        severity="contrast"
        rounded
      >
        <Icon name="solar:hamburger-menu-linear" />
      </Button>
    </div>
  </nav>
</template>
