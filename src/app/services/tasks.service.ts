import { Injectable } from '@angular/core';

import { type Task, type addTaskData } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  TasksArray: Task[] = [
    {
      id: 1,
      boardId: 1,
      description: 'Lorem Ipsum is simply dummy text.',
      dueDate: '2025-03-14',
      priority: 'High',
    },
    {
      id: 2,
      boardId: 1,
      description: 'This is a task',
      dueDate: '2025-03-14',
      priority: 'Medium',
    },
    {
      id: 3,
      boardId: 1,
      description: 'This is another task',
      dueDate: '2025-03-14',
      priority: 'Low',
    },
  ];

  existingIds!: Set<number>;
  newId!: number;
  newTask!: Task;

  getBoardTasks(boardId: number) {
    return this.TasksArray.filter((task) => task.boardId === boardId);
  }

  getTaskById(id: number) {
    return this.TasksArray.find((task) => task.id === id);
  }

  addTask(boardId: number, taskData: addTaskData) {
    this.existingIds = new Set(this.TasksArray.map((task) => task.id));
    this.newId = 1;
    while (this.existingIds.has(this.newId)) {
      this.newId++;
    }
    this.newTask = {
      id: this.newId,
      boardId: boardId,
      description: taskData.description,
      dueDate: taskData.dueDate,
      priority: taskData.priority,
    };
    this.TasksArray.push(this.newTask);
  }

  editTask(
    id: number,
    updatedTaskDescription: string,
    updatedTaskDueDate: string,
    updatedTaskPriority: string
  ) {
    const taskToEdit = this.getTaskById(id);
    if (taskToEdit) {
      taskToEdit.description = updatedTaskDescription;
      taskToEdit.dueDate = updatedTaskDueDate;
      taskToEdit.priority = updatedTaskPriority;
    }
  }

  removeTask(id: number) {
    this.TasksArray = this.TasksArray.filter((task) => task.id !== id);
  }
}
