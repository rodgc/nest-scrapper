import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { GetACSDto } from './dtos/get-acs-dto';

@Injectable()
export class ScrapperService {
  async getValorantACS({ playlist, players }: GetACSDto) {
    console.log(`Getting information for ${playlist} playlist`);
    for (const player of players) {
      console.log(`Getting ${player.username} ACS`);
      const URL = `https://tracker.gg/valorant/profile/riot/${player.username}%23LAN/overview?playlist=${playlist}`;
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
      console.log(`${player.acs} ACS obtained for ${player.username}`);
      await browser.close();
    }
    players.sort((a, b) => b.acs - a.acs);
    console.log(`All player has been processed`);
    return players;
  }
}
