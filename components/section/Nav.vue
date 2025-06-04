<template>
  <nav
    :class="
      cn(
        'w-full h-full flex-col md:flex-row py-40 items-start -top-full fixed md:top-6 left-0 right-0 z-50 md:container mx-auto md:py-6 px-8 flex md:h-auto md:justify-between md:items-center md:rounded-2xl transition-all md:duration-300 duration-500',
        scrolled && 'backdrop-blur-md shadow-sm ',
        menuActive && 'top-0 bg-white md:bg-white/50',
        scrolled &&
          !menuActive &&
          'bg-transparent border-none shadow-none backdrop-blur-none'
      )
    "
  >
    <div
      :class="
        cn(
          'flex flex-col justify-center md:flex-row md:items-center md:gap-12 transition-all duration-300',
          scrolled && !menuActive && 'md:-translate-y-full opacity-0'
        )
      "
    >
      <NuxtLink
        :to="$localePath('index')"
        :class="cn('md:mr-8 fixed left-6 top-6 md:static')"
      >
        <NuxtImg src="/images/logo.png" alt="logo" width="120" />
      </NuxtLink>
      <MotionSimpleText :transition="{ delay: 0.1 }">
        <NuxtLink
          class="font-medium text-5xl md:text-base"
          :to="$localePath('product')"
        >
          {{ $t("nav.product") }}
        </NuxtLink>
      </MotionSimpleText>

      <MotionSimpleText :transition="{ delay: 0.2 }">
        <NuxtLink
          class="font-medium text-5xl md:text-base"
          :to="$localePath('community')"
        >
          {{ $t("nav.community") }}
        </NuxtLink>
      </MotionSimpleText>
    </div>

    <div class="flex flex-col md:flex-row md:gap-6 items-center">
      <div
        :class="
          cn(
            'flex flex-col md:flex-row md:gap-6 md:items-center transition-all duration-300',
            scrolled && !menuActive && '-translate-y-full opacity-0'
          )
        "
      >
        <MotionSimpleText :transition="{ delay: 0.3 }">
          <NuxtLink
            class="font-medium text-5xl md:text-base"
            :to="$localePath('login')"
          >
            {{ $t("nav.login") }}
          </NuxtLink>
        </MotionSimpleText>
        <MotionSimpleText :transition="{ delay: 0.4 }">
          <Select
            v-model="selectedLocale"
            :options="options"
            optionLabel="label"
            optionValue="value"
            size="small"
            class="plain"
          />
        </MotionSimpleText>
      </div>

      <InteractiveHoverButton
        :text="$t('nav.generate')"
        :to="$localePath('generator')"
        :class="
          cn(
            'left-1/2 -translate-x-1/2 bottom-6 md:translate-x-0 md:static',
            menuActive && 'fixed'
          )
        "
      />

      <Button
        :class="
          cn(
            'md:hidden !fixed top-6 right-6 z-50 md:!static',
            !scrolled && 'md:!hidden'
          )
        "
        @click="menuActive = !menuActive"
        severity="contrast"
        rounded
      >
        <Icon v-if="!menuActive" name="solar:hamburger-menu-linear" />
        <Icon v-else name="material-symbols:close-rounded" />
      </Button>
    </div>
  </nav>
</template>

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
