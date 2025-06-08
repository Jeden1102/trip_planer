<script setup lang="ts">
import { reactive } from "vue";
import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const toast = useToast();
const router = useRouter();
const { t } = useI18n();
const { signIn } = useAuth();

const isLoading = ref(false);
const responseError = ref("");

const initialValues = reactive({
  email: "",
  password: "",
});

const resolver = ({ values }: any) => {
  const errors: Record<string, { message: string }[]> = {};

  if (!values.email) {
    errors.email = [{ message: t("validation.required", { field: "Email" }) }];
  }

  if (!values.password) {
    errors.password = [
      { message: t("validation.required", { field: t("auth.password") }) },
    ];
  }

  return {
    values,
    errors,
  };
};

const onFormSubmit = async ({ valid, values }: any) => {
  if (!valid) return;

  isLoading.value = true;
  responseError.value = "";

  const result = await signIn("credentials", {
    ...values,
    redirect: false,
  });

  if (result?.error) {
    responseError.value = t(result.error);
  } else {
    router.push("/profile");
  }

  isLoading.value = false;
};
</script>

<template>
  <div class="card flex justify-center">
    <Form
      v-slot="$form"
      :initialValues="initialValues"
      :resolver="resolver"
      @submit="onFormSubmit"
      class="flex flex-col gap-4 w-full"
    >
      <div class="flex flex-col gap-1">
        <label for="email" class="font-medium">Email</label>
        <InputText
          name="email"
          type="email"
          placeholder="john@doe.com"
          class="w-full"
        />
        <Message
          v-if="$form.email?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form.email?.error?.message }}
        </Message>
      </div>

      <div class="flex flex-col gap-1 min-w-full">
        <label for="password" class="font-medium">{{
          t("auth.password")
        }}</label>
        <InputText
          name="password"
          type="password"
          placeholder="*********"
          class="w-full"
        />
        <Message
          v-if="$form.password?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form.password?.error?.message }}
        </Message>
      </div>

      <Button
        type="submit"
        :loading="isLoading"
        :disabled="isLoading"
        label="Login"
        class="w-full"
      />

      <p v-if="responseError" class="text-center text-red-500">
        {{ responseError }}
      </p>
    </Form>
  </div>
</template>
