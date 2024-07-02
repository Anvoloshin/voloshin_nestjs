import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Task } from './task.model';
import { TaskUpdateDto } from './dto/update-task.dto';
import { TaskCreateDto } from './dto/create-task.dto';
import { TaskUpdateCompletedDto } from './dto/update-completed-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task)
    private readonly taskModel: typeof Task,
  ) {}

  findAll(): Promise<Task[]> {
    return this.taskModel.findAll({
      attributes: ['id', 'name', 'isCompleted'],
      order: ['createdAt'],
    });
  }

  create(taskData: TaskCreateDto): Promise<Task> {
    return this.taskModel.create(taskData);
  }

  async update(id: number, taskData: TaskUpdateDto): Promise<Task> {
    const [countTask, updatedTask] = await this.taskModel.update(taskData, {
      where: { id },
      returning: true,
    });
    if (countTask === 0) {
      throw new BadRequestException(
        'Tasks List empty or this "id" does not exist!',
      );
    }
    return updatedTask[0];
  }

  async updateCompleted(taskData: TaskUpdateCompletedDto): Promise<string> {
    const [countTask] = await this.taskModel.update(taskData, {
      where: { isCompleted: !taskData.isCompleted },
    });
    if (countTask === 0) {
      throw new BadRequestException('Data cannot be changed!');
    }
    return 'Update successfully!';
  }

  async remove(id: number): Promise<string> {
    const deletedTask = await this.taskModel.destroy({ where: { id } });
    if (deletedTask === 0) {
      throw new BadRequestException(
        'Tasks List empty or this "id" does not exist!',
      );
    }
    return 'Task deleted by "id" successfully!';
  }

  async removeCompleted(): Promise<string> {
    const deletedTasks = await this.taskModel.destroy({
      where: { isCompleted: true },
    });
    if (deletedTasks === 0) {
      throw new BadRequestException('Tasks List empty or no completed tasks!');
    }
    return 'Completed tasks deleted!';
  }
}
