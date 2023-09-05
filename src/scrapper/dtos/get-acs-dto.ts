import { ArrayMinSize, IsArray, IsIn, ValidateNested } from 'class-validator';
import { PlayersDto } from './players.dto';
import { Type } from 'class-transformer';

export type Playlists = 'competitive' | 'unrated';
const playlistEnum: Playlists[] = ['unrated', 'competitive'];

export class GetACSDto {
  @IsIn(playlistEnum)
  playlist: Playlists;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => PlayersDto)
  players: PlayersDto[];
}
