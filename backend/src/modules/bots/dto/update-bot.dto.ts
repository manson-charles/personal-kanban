import { IsString, MinLength, MaxLength, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBotDto {
  @ApiProperty({ example: 'Updated Bot Name', required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name?: string;

  @ApiProperty({ example: 'Updated description', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiProperty({ example: 'active', required: false })
  @IsOptional()
  @IsString()
  @IsIn(['draft', 'active', 'paused', 'archived'])
  status?: string;
}
