import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateShopDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ type: 'file' })
  readonly logo: string;
}
