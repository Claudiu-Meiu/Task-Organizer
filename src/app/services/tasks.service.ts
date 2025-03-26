import { Injectable } from '@angular/core';
import { type Task, type TaskData } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  TasksArray: Task[] = [
    {
      id: 1,
      boardId: 1,
      description: 'Lorem Ipsum is simply dummy text.',
      dueDate: '2025-03-24',
      priority: 'Medium',
      finished: false,
    },
    {
      id: 2,
      boardId: 1,
      description: 'This is a task',
      dueDate: '2025-03-25',
      priority: 'High',
      finished: true,
    },
    {
      id: 3,
      boardId: 1,
      description: 'This is another task',
      dueDate: '2025-03-26',
      priority: 'Low',
      finished: false,
    },
    {
      id: 4,
      boardId: 2,
      description: 'Lorem Ipsum is simply dummy text.',
      dueDate: '2025-03-24',
      priority: 'Low',
      finished: true,
    },
    {
      id: 5,
      boardId: 2,
      description: 'This is a task Lorem Ipsum is simply dummy text.',
      dueDate: '2025-03-25',
      priority: 'High',
      finished: true,
    },
    {
      id: 6,
      boardId: 2,
      description: 'This is another task',
      dueDate: '2025-03-26',
      priority: 'Medium',
      finished: false,
    },
  ];

  existingIds!: Set<number>;
  newId!: number;
  newTask!: Task;

  sortTasksByDueDate() {
    this.TasksArray.sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return dateA.getTime() - dateB.getTime();
    });
  }

  getBoardTasks(boardId: number) {
    return this.TasksArray.filter((task) => task.boardId === boardId);
  }

  getTaskById(id: number) {
    return this.TasksArray.find((task) => task.id === id);
  }

  addTask(boardId: number, taskData: TaskData) {
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
      finished: taskData.finished,
    };
    this.TasksArray.push(this.newTask);
    this.sortTasksByDueDate();
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
      this.sortTasksByDueDate();
    }
  }

  removeTask(id: number) {
    this.TasksArray = this.TasksArray.filter((task) => task.id !== id);
  }
}
