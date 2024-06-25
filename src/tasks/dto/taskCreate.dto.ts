import { IsEmpty, IsString, Max } from 'class-validator';

export class TaskCreateDto {
  @IsEmpty()
  @IsString()
  @Max(255)
  readonly name: string;
}
