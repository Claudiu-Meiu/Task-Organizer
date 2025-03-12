import { Injectable } from '@angular/core';

import { type Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  TasksArray: Task[] = [
    {
      id: 1,
      boardId: 1,
      taskName: 'Task 1',
      description:
        'Lorem Ipsum is simply dummy text.',
    },
    {
      id: 2,
      boardId: 1,
      taskName: 'Task 2',
      description: 'This is a task',
    },
    {
      id: 3,
      boardId: 2,
      taskName: 'Task 3',
      description: 'This is another task',
    },
  ];

  getBoardTasks(boardId: number) {
    return this.TasksArray.filter((task) => task.boardId === boardId);
  }
}
