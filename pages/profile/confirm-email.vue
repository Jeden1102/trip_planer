<script setup lang="ts">
const { t } = useI18n();

const route = useRoute();

const code = route.query.code as string;

const responseMessage = ref("");
const isError = ref(true);

if (!code) {
  useRouter().push("/");
}

const confirmEmail = async () => {
  try {
    const response = await $fetch("/api/user/confirm-email", {
      method: "POST",
      body: {
        code,
      },
    });

    responseMessage.value = response.message;
    isError.value = false;
  } catch (error: any) {
    isError.value = true;
    if (error.data && error.data.statusMessage) {
      responseMessage.value = t(error.data.statusMessage);
    } else {
      responseMessage.value = "Something went wrong. Please try again.";
    }
  }
};

confirmEmail();
</script>
<template>
  <main>
    <MoleculesHero
      :cta="{ href: '/login', text: $t('nav.login') }"
      :title="$t(responseMessage)"
    />
  </main>
</template>
