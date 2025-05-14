<template>
  <v-app>
    <v-main class="pb-0">
      <div class="d-flex h-100 pt-4">
        <v-spacer v-if="!xs" />
        <v-col
          class="d-flex flex-column justify-space-between position-relative pb-0"
          sm="9"
          md="7"
          lg="6"
          xl="5"
        >
          <HelloText v-if="!chatStore.messages.length" />
          <div v-else class="w-100 text-body-1 px-4 mb-8">
            <ChatMessage
              v-for="(message, index) in chatStore.messages"
              :key="index"
              :message="message"
            />
          </div>
          <div
            class="position-sticky pb-10"
            style="bottom: 0rem; left: 0; right: 0; background-color: #0d47a1"
          >
            <InteractionToolbar />
          </div>
        </v-col>
        <v-spacer v-if="!xs" />
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";
import ChatMessage from "./components/ChatMessage.vue";
import HelloText from "./components/HelloText.vue";
import InteractionToolbar from "./components/InteractionToolbar.vue";
import { useChatStore } from "./stores/chat";
const { xs } = useDisplay();
const chatStore = useChatStore();
</script>
