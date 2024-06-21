import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task)
    private readonly taskModel: typeof Task,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskModel.findAll();
  }

  async create(taskData): Promise<Task> {
    return Task.create(taskData);
  }

  async update(id: number, taskData): Promise<[number, Task[]]> {
    const [affectedCount, affectedRows] = await this.taskModel.update(taskData,{where:{id},returning:true,});
    return [affectedCount, affectedRows as Task[]];
  }

  // изменение статуса выполнения всех записей;
  // удаление одной записи;
  // удаление всех выполненных.
}
