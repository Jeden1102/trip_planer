<template>
  <div class="aurora-bg">
    <div class="aurora-stripes"></div>
    <slot />
  </div>
</template>

<style scoped>
@import "tailwindcss";

.aurora-bg {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f172a;
  text-align: center;
  z-index: 0;
  @apply bg-gray-200;
}

.aurora-stripes {
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 100%;
  background: repeating-linear-gradient(
    90deg,
    rgba(59, 130, 246, 0.05) 0%,
    rgba(34, 211, 238, 0.08) 10%,
    rgba(52, 211, 153, 0.08) 20%,
    rgba(59, 130, 246, 0.15) 30%
  );
  background-size: 200% 100%;
  animation: moveAurora 20s linear infinite;
  filter: blur(60px);
  pointer-events: none;
  z-index: -1;
}

@keyframes moveAurora {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
