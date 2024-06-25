import {
  Body,
  Param,
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { TaskUpdateDto } from './dto/taskUpdate.dto';
import { TaskCreateDto } from './dto/taskCreate.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Post()
  create(@Body() taskData: TaskCreateDto): Promise<Task> {
    return this.tasksService.create(taskData);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() taskData: TaskUpdateDto,
  ): Promise<Task> {
    return this.tasksService.update(id, taskData);
  }

  @Patch()
  updateCompleted(@Body() taskData: TaskUpdateDto): Promise<void> {
    return this.tasksService.updateCompleted(taskData);
  }

  @Delete('clear')
  removeCompleted(): Promise<void> {
    return this.tasksService.removeCompleted();
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.remove(id);
  }
}
