<script setup lang="ts">
const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <div class="p-4 space-y-4">
    <div
      v-for="(item, itemIndex) in data"
      :key="itemIndex"
      class="shadow-lg p-5 bg-white mb-0"
    >
      <div
        v-for="(header, hIndex) in headers"
        :key="header.field"
        class="flex flex-col gap-1 pb-3 pt-1 border-b border-gray-200"
      >
        <div
          class="flex justify-between min-w-[300px] max-w-[300px] overflow-x-hidden"
        >
          <span class="text-sm font-semibold text-gray-500 pr-4">
            {{ header.header }}
          </span>

          <div class="text-base text-gray-800 text-right">
            <template v-if="header.field === 'acciones'">
              <slot name="acciones" :item="item"></slot>
            </template>
            <template v-else>
              {{ item[header.field] }}
            </template>
          </div>
        </div>

        <hr v-if="hIndex < headers.length - 1" class="mt-2 border-gray-200" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
