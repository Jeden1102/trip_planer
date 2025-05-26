<template>
  <div class="w-full bg-white py-20 dark:bg-black">
    <div class="mx-auto max-w-7xl text-center">
      <MotionSimpleText>
        <p class="text-xl font-bold text-black md:text-4xl dark:text-white">
          {{ $t("aboveFooter.title") }}
        </p>
        <p class="mx-auto max-w-2xl py-4 text-sm text-neutral-500 md:text-lg">
          {{ $t("aboveFooter.subtitle") }}
        </p>
      </MotionSimpleText>
    </div>
    <WorldMap :dots="dots" map-color="#FFFFFF40" map-bg-color="black" />
  </div>
</template>

<script lang="ts" setup>
import WorldMap from "@/components/ui/world-map/WorldMap.vue";

const dots = [
  {
    start: {
      lat: 64.2008,
      lng: -149.4937,
    }, // Alaska (Fairbanks)
    end: {
      lat: 34.0522,
      lng: -118.2437,
    }, // Los Angeles
  },
  {
    start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
    end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
  },
  {
    start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
    end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
  },
  {
    start: { lat: 51.5074, lng: -0.1278 }, // London
    end: { lat: 28.6139, lng: 77.209 }, // New Delhi
  },
  {
    start: { lat: 28.6139, lng: 77.209 }, // New Delhi
    end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
  },
  {
    start: { lat: 28.6139, lng: 77.209 }, // New Delhi
    end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
  },
  {
    start: { lat: 47.49835, lng: 19.04045 }, // Budapest
    end: { lat: 29.56278, lng: 106.55278 }, // Chongqing
  },
];
</script>
