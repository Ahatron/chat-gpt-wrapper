<template>
  <div class="d-flex border-lg rounded-lg">
    <v-textarea
      v-model="message"
      :disabled="alertStore.loading"
      placeholder="Who is John Galt?"
      rows="1"
      max-rows="11"
      auto-grow
      bg-color="blue-darken-4"
      variant="plain"
      hide-details
      class="ps-4"
      @keydown.enter="sendMessage"
    >
    </v-textarea>
    <v-btn
      :disabled="!message.trim() || alertStore.loading"
      variant="tonal"
      ripple
      width="56"
      height="56"
      class="rounded text-h5"
      icon="mdi-chevron-right"
      @click="sendMessage"
    ></v-btn>
  </div>
</template>

<script setup lang="ts">
import { chatApi } from "@/api/chat";
import { useAlertStore } from "@/stores/alert";
import { useChatStore } from "@/stores/chat";
import { ref } from "vue";

const message = ref("");
const chatStore = useChatStore();
const alertStore = useAlertStore();

async function sendMessage() {
  if (message.value.trim()) {
    chatStore.addMessage({ role: "user", content: message.value });
    const response = await chatApi.sendMessage(message.value);

    message.value = "";

    chatStore.addMessage({
      role: "assistant",
      content: response || "",
    });
  }
}
</script>
