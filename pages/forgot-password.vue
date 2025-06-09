<script setup lang="ts">
definePageMeta({
  unauthenticatedOnly: true,
  layout: "auth",
});
</script>

<template>
  <div class="container mx-auto">
    <Card class="mx-auto my-4 max-w-[520px]">
      <template #content>
        <AuthForgotPasswordForm />
      </template>
    </Card>
  </div>
</template>
