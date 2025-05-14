import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class ChatService {
  private readonly openai = new OpenAI({
    apiKey: this.config.get('OPENAI_API_KEY'),
  });

  constructor(private readonly config: ConfigService) {}

  async getChatResponse(message: string) {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  }
}
