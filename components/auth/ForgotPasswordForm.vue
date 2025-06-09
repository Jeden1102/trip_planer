<script setup lang="ts">
import { ref } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { forgotPasswordSchema } from "./forgotPasswordSchema";
import { useI18n } from "#imports";

const { t } = useI18n();

const formSchema = toTypedSchema(forgotPasswordSchema);

const isError = ref(false);
const responseMessage = ref("");
const isLoading = ref(false);

const form = useForm({
  validationSchema: formSchema,
});

const { handleSubmit, errors, defineField } = form;

const [email, emailAttrs] = defineField("email");

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;
  try {
    const response = await $fetch("/api/user/forgot-password", {
      method: "POST",
      body: values,
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
      <label for="email">Email</label>
      <InputText
        id="email"
        type="email"
        v-model="email"
        v-bind="emailAttrs"
        class="p-inputtext-sm"
        placeholder="john@doe.com"
      />
      <small v-if="errors.email" class="text-red-500">{{ errors.email }}</small>
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
