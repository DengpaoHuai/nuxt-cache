<script setup lang="ts">
import useErrorStore from "~/store/useErrorStore";
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="flex-1 flex flex-col min-h-screen">
      <main class="flex-1 p-4 lg:p-8 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>
