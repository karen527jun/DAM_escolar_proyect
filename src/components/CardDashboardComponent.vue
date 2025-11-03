<template>
  <div
    :class="class"
    class="w-full flex flex-col justify-center items-center gap-10 shadow-3xl bg-white rounded-3xl p-10 shadow-xl border border-gray-100"
  >
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  class: {
    type: String,
    default: "",
  },
});
</script>
