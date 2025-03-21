<script setup lang="ts">
const props = defineProps<{
  name: string;
  label: string;
}>();

const { value, errorMessage } = useField(() => props.name);
</script>

<template>
  <label>
    {{ props.label }}
  </label>
  <div v-if="errorMessage">{{ errorMessage }}</div>
</template>
