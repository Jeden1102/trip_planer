export default defineNuxtRouteMiddleware((to, from) => {
  const { status } = useAuth();

  if (to.meta.auth && status.value === "unauthenticated") {
    return navigateTo("/login");
  }

  if (to.meta.unauthenticatedOnly && status.value === "authenticated") {
    return navigateTo("/profile");
  }
});
