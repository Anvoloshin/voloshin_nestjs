import {
  Body,
  Param,
  Controller,
  Get,
  Patch,
  Post,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Post()
  create(@Body() taskData): Promise<Task> {
    return this.tasksService.create(taskData);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() taskData): Promise<void> {
    return this.tasksService.update(Number(id), taskData);
  }

  @Patch()
  updateCompleted(): Promise<void> {
    return this.tasksService.updateCompleted();
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<number> {
    return this.tasksService.remove(Number(id));
  }

  @Delete()
  removeCompleted(): Promise<number> {
    return this.tasksService.removeCompleted();
  }
}
