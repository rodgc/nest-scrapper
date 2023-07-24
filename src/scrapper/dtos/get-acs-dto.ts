import { PlayersDto } from './players.dto';

export class GetACSDto {
  playlist: 'competitive' | 'unrated';
  players: PlayersDto[];
}
