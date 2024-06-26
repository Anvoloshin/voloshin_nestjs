import { IsBoolean, IsNotEmpty } from 'class-validator';

export class TaskUpdateCompletedDto {
  @IsNotEmpty()
  @IsBoolean()
  completed: boolean;
}
