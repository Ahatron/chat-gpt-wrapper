import { defineStore } from "pinia"
import { ref } from "vue"

export interface Message {
  role: 'assistant' | 'user'
  content: string
}

export const useChatStore = defineStore('chat', () => {
  const messages = ref<Message[]>([

  ])

  const addMessage = (message: Message) => {
    messages.value.push(message)
  }

  const clearMessages = () => {
    messages.value = []
  }

  return { messages, addMessage, clearMessages }
}
)