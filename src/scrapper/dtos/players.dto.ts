import { ApiProperty } from '@nestjs/swagger';

export class PlayersDto {
  @ApiProperty({
    type: String,
    name: 'username',
    description: 'Player Username',
  })
  username: string;

  @ApiProperty({
    type: Number,
    description: 'Current player ACS',
  })
  acs: number;
}
