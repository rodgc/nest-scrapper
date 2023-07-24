import { Body, Controller, Get } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';
import { PlayersDto } from './dtos/players.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Scrapper')
@Controller('scrapper')
export class ScrapperController {
  constructor(private scrapperService: ScrapperService) {}

  @Get()
  valorantACS(@Body() body: PlayersDto[]) {
    return this.scrapperService.getValorantACS(body);
  }
}
