import { baseReq } from "./base";

class ChatApi {
  async sendMessage(message: string) {
    return baseReq.tryPost<string>({ url: '/chat', body: { message }, messages: { error: 'Request failed.' } })
  }
}

export const chatApi = new ChatApi()