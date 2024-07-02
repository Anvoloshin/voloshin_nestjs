import { IsBoolean, IsNotEmpty } from 'class-validator';

export class TaskUpdateCompletedDto {
  @IsNotEmpty()
  @IsBoolean()
  isCompleted: boolean;
}
