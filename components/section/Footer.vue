<template>
  <footer class="flex flex-col bg-zinc-950 text-gray-300">
    <div
      class="container px-4 mx-auto flex flex-col gap-4 py-8 md:flex-row md:gap-36"
    >
      <div>
        <NuxtLink to="/">
          <NuxtImg
            src="/images/logo.png"
            alt="logo"
            width="120"
            loading="lazy"
          />
        </NuxtLink>
      </div>
      <div class="flex flex-col gap-2">
        <p class="mb-2 text-lg font-semibold">
          {{ $t("footer.navigationTitle") }}
        </p>
        <NuxtLink to="/">{{ $t("nav.home") }}</NuxtLink>
        <NuxtLink to="/product">{{ $t("nav.product") }}</NuxtLink>
        <NuxtLink to="/recruiter">{{ $t("nav.generate") }}</NuxtLink>
      </div>
      <div class="flex flex-col gap-2">
        <p class="mb-2 text-lg font-semibold">{{ $t("footer.aboutTitle") }}</p>
        <NuxtLink to="/terms">{{ $t("footer.terms") }}</NuxtLink>
        <NuxtLink to="/privacy">{{ $t("footer.privacy") }}</NuxtLink>
      </div>
    </div>
    <div class="container mx-auto border-t border-gray-300 py-4 md:pb-8">
      <p class="text-center text-sm">
        © {{ currentYear }} {{ $t("footer.createdBy") }}
        <NuxtLink to="https://github.com/Jeden1102">jeden1102</NuxtLink>
      </p>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const currentYear = new Date().getFullYear();
</script>
