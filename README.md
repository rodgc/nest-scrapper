# NestJS Scrapper

NestJS Scrapper is a [NestJS](https://github.com/nestjs/nest) playground to learn scrapping.

## Installation

```bash
# Install Dependencies
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## ScrapperService

### Summary

The `ScrapperService` class is responsible for scraping the ACS (Average Combat Score) of players in the game Valorant. It uses the Puppeteer library to automate web browsing and retrieve the ACS data from a website. The class takes a `GetACSDto` object as input, which contains the playlist and a list of players. It then iterates over each player, retrieves their ACS from the website, and updates the player object with the obtained ACS value. Finally, it sorts the players based on their ACS and returns the updated list.

### Example Usage

```javascript
const scrapperService = new ScrapperService();
const getACSDto: GetACSDto = {
  playlist: 'competitive',
  players: [
    {
      username: 'player1',
      acs: 0,
      tagline: '1234',
    },
    {
      username: 'player2',
      acs: 0,
      tagline: '5678',
    },
  ],
};

const updatedPlayers = await scrapperService.getValorantACS(getACSDto);
console.log(updatedPlayers);
```

In this example, we create an instance of the `ScrapperService` class and provide a `GetACSDto` object as input. The `GetACSDto` object specifies the playlist as 'competitive' and includes two players with their usernames and taglines. The `getValorantACS` method is then called to retrieve the ACS for each player. The updated list of players with their ACS values is logged to the console.

### Code Analysis

#### Main functionalities

- Scraping the ACS of players in the game Valorant.
- Automating web browsing using Puppeteer.
- Updating the player objects with the obtained ACS values.
- Sorting the players based on their ACS.

---

#### Methods

- `constructURL(username: string, tagline: string, playlist: Playlists): string`: Constructs the URL for scraping player ACS data based on the username, tagline, and playlist.

- `getValorantACS({ playlist, players }: GetACSDto): Promise<PlayersDto[]>`: This method takes a `GetACSDto` object as input and returns a promise that resolves to an array of `PlayersDto` objects. It iterates over each player in the `players` array, retrieves their ACS from a website using Puppeteer, and updates the player object with the obtained ACS value. Finally, it sorts the players based on their ACS and returns the updated list.

## License

[MIT](https://choosealicense.com/licenses/mit/)
