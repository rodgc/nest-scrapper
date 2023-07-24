import { Body, Controller, Get } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';
import { ApiTags } from '@nestjs/swagger';
import { GetACSDto } from './dtos/get-acs-dto';

@ApiTags('Scrapper')
@Controller('scrapper')
export class ScrapperController {
  constructor(private scrapperService: ScrapperService) {}

  @Get()
  valorantACS(@Body() body: GetACSDto) {
    return this.scrapperService.getValorantACS(body);
  }
}
