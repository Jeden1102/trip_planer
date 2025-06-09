<script setup lang="ts">
import { ref } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { resetPasswordSchema } from "./resetPasswordSchema";
import { useI18n, useRoute } from "#imports";

const { t } = useI18n();
const route = useRoute();

const formSchema = toTypedSchema(resetPasswordSchema);

const isError = ref(false);
const isLoading = ref(false);
const responseMessage = ref("");
isLoading.value = false;

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: route.query.email as string,
    code: route.query.code as string,
  },
});

const { handleSubmit, errors, defineField } = form;

const [password, passwordAttrs] = defineField("password");
const [passwordRepeat, passwordRepeatAttrs] = defineField("passwordRepeat");

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;
  try {
    const response = await $fetch("/api/user/reset-password", {
      method: "POST",
      body: {
        password: values.password,
        passwordRepeat: values.passwordRepeat,
        code: route.query.code,
        email: route.query.email,
      },
    });

    responseMessage.value = t(response.statusMessage);
    isError.value = false;
  } catch (error: any) {
    isError.value = true;
    if (error?.data?.statusMessage) {
      responseMessage.value = t(error.data.statusMessage);
    } else {
      responseMessage.value = "Something went wrong. Please try again.";
    }
  }
  isLoading.value = false;
});
</script>

<template>
  <form @submit.prevent="onSubmit" class="flex flex-col gap-4">
    <div class="flex flex-col gap-1">
      <label for="password">{{ $t("auth.password") }}</label>
      <Password
        id="password"
        v-model="password"
        v-bind="passwordAttrs"
        toggleMask
        promptLabel=""
        placeholder="********"
        class="[&>input]:w-full"
      />
      <small v-if="errors.password" class="text-red-500">{{
        errors.password
      }}</small>
    </div>

    <div class="flex flex-col gap-1">
      <label for="passwordRepeat">{{ $t("auth.passwordRepeat") }}</label>
      <Password
        id="passwordRepeat"
        v-model="passwordRepeat"
        v-bind="passwordRepeatAttrs"
        toggleMask
        promptLabel=""
        placeholder="********"
        class="[&>input]:w-full"
      />
      <small v-if="errors.passwordRepeat" class="text-red-500">{{
        errors.passwordRepeat
      }}</small>
    </div>

    <Button
      type="submit"
      :loading="isLoading"
      :disabled="isLoading"
      :label="$t('auth.resetPassword')"
      class="mt-2 w-full"
    />

    <Message
      v-if="responseMessage"
      :severity="isError ? 'error' : 'success'"
      class="mt-4"
    >
      {{ responseMessage }}
    </Message>
  </form>
</template>
