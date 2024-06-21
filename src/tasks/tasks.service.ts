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

  async update(id: number, taskData): Promise<[number, Task[]]> {
    const [affectedCount, affectedRows] = await this.taskModel.update(
      taskData,
      { where: { id }, returning: true },
    );
    return [affectedCount, affectedRows as Task[]];
  }

  async updateCompleted(): Promise<void | never> {
    const allTasks = await this.taskModel.findAll();
    if (allTasks.length === 0) throw new Error('Error!');
    const isCompleted = allTasks.some((allTasks) => allTasks.completed == false);
    allTasks.forEach((elem) => {
      elem.completed = isCompleted;
      elem.save();
    });
    throw new HttpException('data fields updated successfully', HttpStatus.OK);
  }

  async remove(id: number): Promise<number> {
    if ((await this.taskModel.findAll()).length === 0) throw new Error('Error!');
    return this.taskModel.destroy({ where: { id } });
  }

  async removeCompleted(): Promise<number> {
    return this.taskModel.destroy({ where: { completed: true } });
  }
}
