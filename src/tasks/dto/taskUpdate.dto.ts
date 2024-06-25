import { IsBoolean, IsEmpty, IsString, Max } from 'class-validator';

export class TaskUpdateDto {
  @IsEmpty()
  @IsString()
  @Max(255)
  readonly name: string;

  @IsEmpty()
  @IsBoolean()
  readonly completed: boolean;
}
