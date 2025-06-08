<script setup lang="ts">
const { data } = useAuth();
</script>
<template>
  <main v-if="data && data.user">
    <h1>Hello, {{ data?.user.email }}</h1>
  </main>
</template>
