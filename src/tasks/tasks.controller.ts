import { Body, Param, Controller, Get, Patch, Post } from '@nestjs/common';
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
    //типизация для taskData и DTO
    return this.tasksService.create(taskData);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() taskData): Promise<[number, Task[]]> {
    return this.tasksService.update(Number(id), taskData);
  }
}
