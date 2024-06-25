import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Task } from './task.model';
import { TaskUpdateDto } from './dto/taskUpdate.dto';
import { TaskCreateDto } from './dto/taskCreate.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task)
    private readonly taskModel: typeof Task,
  ) {}

  findAll(): Promise<Task[]> {
    return this.taskModel.findAll();
  }

  create(taskData: TaskCreateDto): Promise<Task> {
    return Task.create(taskData);
  }

  async update(id: number, taskData: TaskUpdateDto): Promise<Task> {
    const [countTask, updatedTask] = await Task.update(taskData, {
      where: { id },
      returning: true,
    });
    if (countTask === 0) {
      throw new Error('Tasks List empty or this "id" does not exist!');
    }
    return updatedTask[0];
  }

  async updateCompleted(taskData: TaskUpdateDto): Promise<void> {
    await Task.update(taskData, {
      where: { completed: !taskData.completed },
    });
    throw new HttpException('Update successfully!', HttpStatus.OK);
  }

  remove(id: number): Promise<void> {
    this.taskModel.destroy({ where: { id } });
    throw new HttpException(
      'Remove by id complete successfully!',
      HttpStatus.OK,
    );
  }

  removeCompleted(): Promise<void> {
    this.taskModel.destroy({ where: { completed: true } });
    throw new HttpException('Completed tasks deleted!', HttpStatus.OK);
  }
}
