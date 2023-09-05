import { Injectable, Logger } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { GetACSDto } from './dtos/get-acs-dto';
import { PlayersDto } from './dtos/players.dto';

@Injectable()
export class ScrapperService {
  private readonly logger = new Logger(ScrapperService.name);

  async getValorantACS({
    playlist,
    players,
  }: GetACSDto): Promise<PlayersDto[]> {
    this.logger.log(`Getting information for ${playlist} playlist`);

    for (const player of players) {
      this.logger.log(`Getting ${player.username} #${player.tagline} ACS`);

      const URL = `https://tracker.gg/valorant/profile/riot/${player.username}%23${player.tagline}/overview?playlist=${playlist}`;
      const browser = await puppeteer.launch({
        headless: 'new',
      });

      try {
        const page = await browser.newPage();
        await page.goto(URL, {
          waitUntil: 'domcontentloaded',
        });

        const results = await page.evaluate(() => {
          const acsElement = document.querySelector('[title="ACS"] + span');
          return acsElement ? +acsElement.innerHTML : 0;
        });

        player.acs = results;
        const acsMessage = `${player.acs} ACS obtained for ${player.username} #${player.tagline}`;

        if (player.acs > 0) {
          this.logger.log(acsMessage);
        } else {
          this.logger.warn(acsMessage);
        }
      } catch (error) {
        this.logger.error(
          `Error scraping ACS for ${player.username} #${player.tagline}: ${error.message}`,
        );
      } finally {
        await browser.close();
      }
    }

    players.sort((a, b) => b.acs - a.acs);
    this.logger.log(`All players have been processed`);

    return players;
  }
}
