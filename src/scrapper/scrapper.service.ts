import { Injectable, Logger } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { GetACSDto } from './dtos/get-acs-dto';

@Injectable()
export class ScrapperService {
  private readonly logger = new Logger(ScrapperService.name);
  async getValorantACS({ playlist, players }: GetACSDto) {
    this.logger.log(`Getting information for ${playlist} playlist`);
    for (const player of players) {
      this.logger.log(
        `Getting ${player.username} #${player.discriminator} ACS`,
      );
      const URL = `https://tracker.gg/valorant/profile/riot/${player.username}%23${player.discriminator}/overview?playlist=${playlist}`;
      const browser = await puppeteer.launch({
        headless: 'new',
      });

      const page = await browser.newPage();
      await page.goto(URL, {
        waitUntil: 'networkidle2',
      });

      const results = await page.evaluate(() => {
        let acs = 0;

        document.querySelectorAll('[title="ACS"] + span').forEach((span) => {
          acs = +span.innerHTML;
        });

        return acs;
      });
      player.acs = results;
      const acsMessage = `${player.acs} ACS obtained for ${player.username} #${player.discriminator}`;
      if (player.acs > 0) {
        this.logger.log(acsMessage);
      } else {
        this.logger.warn(acsMessage);
      }

      await browser.close();
    }
    players.sort((a, b) => b.acs - a.acs);
    this.logger.log(`All player has been processed`);
    return players;
  }
}
