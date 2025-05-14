import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GptModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.cwd() + `/.env`,
    }),
    GptModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
