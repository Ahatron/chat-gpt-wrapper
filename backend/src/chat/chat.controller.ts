import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  sendMessage(@Body() dto: { message: string }) {
    return this.chatService.getChatResponse(dto.message);
  }
}
