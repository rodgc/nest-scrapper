import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class PlayersDto {
  @ApiProperty({
    type: String,
    name: 'username',
    description: 'Player Username',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: Number,
    description: 'Current player ACS',
  })
  @IsNumber()
  acs: number;

  @ApiProperty({
    type: String,
    description: 'Player discriminator',
  })
  @IsString()
  @IsNotEmpty()
  discriminator: string;
}
