<template>
  <div
    class="d-flex mb-4"
    :class="message.role === 'assistant' ? 'justify-start' : 'justify-end'"
    style="overflow-wrap: break-word"
  >
    <p v-if="message.role === 'assistant'">
      {{ message.content }}
    </p>
    <v-sheet
      v-else
      class="px-3 py-2 border-md rounded-be-shaped text-end"
      color="blue-darken-4"
      max-width="500"
      border
      rounded="xl"
    >
      {{ message.content }}
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import type { Message } from "@/stores/chat";

const props = defineProps<{
  message: Message;
}>();
</script>
