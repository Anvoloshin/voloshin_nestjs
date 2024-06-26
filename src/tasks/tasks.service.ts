import { Injectable } from '@nestjs/common';
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

  async updateCompleted(taskData: TaskUpdateDto): Promise<string> {
    const [countTask] = await Task.update(taskData, {
      where: { completed: !taskData.completed },
    });
    if (countTask === 0) {
      throw new Error('Data cannot be changed!');
    }
    return 'Update successfully!';
  }

  async remove(id: number): Promise<string> {
    const deletedTask = await this.taskModel.destroy({ where: { id } });
    if (deletedTask !== 1) {
      throw new Error('Tasks List empty or this "id" does not exist!');
    }
    return 'Task deleted by "id" successfully!';
  }

  async removeCompleted(): Promise<string> {
    const deletedTasks = await this.taskModel.destroy({
      where: { completed: true },
    });
    if (deletedTasks === 0) {
      throw new Error('Tasks List empty or no completed tasks!');
    }
    return 'Completed tasks deleted!';
  }
}
