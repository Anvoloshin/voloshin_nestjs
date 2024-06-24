import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async update(id: number, taskData): Promise<void> {
    await Task.update(taskData, {
      where: { id },
    });
  }

  async updateCompleted(): Promise<void> {
    const allTasks = await this.taskModel.findAll();
    const isCompleted = allTasks.some(
      (allTasks) => allTasks.completed == false,
    );
    await Task.update(
      {
        completed: isCompleted,
      },
      {
        where: {
          completed: !isCompleted,
        },
      },
    );
  }

  async remove(id: number): Promise<number> {
    return this.taskModel.destroy({ where: { id } });
  }

  async removeCompleted(): Promise<number> {
    return this.taskModel.destroy({ where: { completed: true } });
  }
}
