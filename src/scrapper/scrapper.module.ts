import { Module, ValidationPipe } from '@nestjs/common';
import { ScrapperController } from './scrapper.controller';
import { ScrapperService } from './scrapper.service';
import { APP_PIPE } from '@nestjs/core';

@Module({
  controllers: [ScrapperController],
  providers: [
    ScrapperService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class ScrapperModule {}
