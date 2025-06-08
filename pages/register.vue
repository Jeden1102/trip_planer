<script setup lang="ts">
import clsx from "clsx";

const { signIn } = useAuth();

definePageMeta({
  unauthenticatedOnly: true,
  layout: "auth",
});
</script>

<template>
  <div class="container mx-auto">
    <Card class="mx-auto my-4 max-w-[520px]">
      <template #content>
        <AuthRegisterForm />
        <NuxtLinkLocale
          to="/login"
          class="w-fit flex text-secondary hover:underline mx-auto mt-2"
          >{{ $t("register.haveAccount") }}</NuxtLinkLocale
        >
      </template>
    </Card>
  </div>
</template>
