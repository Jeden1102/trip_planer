<script setup lang="ts">
import clsx from "clsx";

const { signIn } = useAuth();

const providers = [
  {
    id: "google",
    name: "Google",
    icon: "mdi:google",
    className: "!bg-[#4285F4] hover:!bg-[#4285F4]/90",
  },
  {
    id: "github",
    name: "Github",
    icon: "mdi:github",
    className: "!bg-zinc-700 hover:!bg-zinc-600",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "mdi:linkedin",
    className: "!bg-blue-600 hover:!bg-blue-500",
  },
];

definePageMeta({
  unauthenticatedOnly: true,
  layout: "auth",
});
</script>

<template>
  <div class="container mx-auto">
    <Card class="mx-auto my-4 max-w-[520px]">
      <template #content>
        <AuthLoginForm />
        <p class="text-center text-sm font-light mt-3">
          {{ $t("login.providers") }}
        </p>
        <div class="flex flex-col gap-2 my-3">
          <Button
            v-for="provider in providers"
            :key="provider.id"
            size="lg"
            @click="signIn(provider.id)"
            :class="clsx(provider.className, '!border-none')"
          >
            <Icon :name="provider.icon" size="20" />
            {{ provider.name }}
          </Button>
        </div>
        <NuxtLinkLocale
          to="/register"
          class="w-fit flex text-secondary hover:underline mx-auto"
          >{{ $t("login.noAccount") }}</NuxtLinkLocale
        >
      </template>
    </Card>
  </div>
</template>
