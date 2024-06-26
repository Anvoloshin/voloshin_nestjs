import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class TaskUpdateDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @Transform(({ value }) => value.trim())
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  completed?: boolean;
}
