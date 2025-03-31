import { Injectable } from '@angular/core';
import { type Task, type TaskData } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasksArray: Task[] = this.getTasksFromLocalStorage();
  existingTasksIds: Set<number> = new Set();
  newId!: number;
  newTask!: Task;

  selectedPriorities: Set<string> = new Set();
  selectedStatus: Set<string> = new Set();

  sortTasksByDueDate() {
    this.tasksArray.sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return dateA.getTime() - dateB.getTime();
    });
  }

  getBoardTasks(boardId: number) {
    return this.tasksArray.filter((task) => task.boardId === boardId);
  }

  getTaskById(id: number) {
    return this.tasksArray.find((task) => task.id === id);
  }

  addTask(boardId: number, taskData: TaskData) {
    this.existingTasksIds = new Set(this.tasksArray.map((task) => task.id));
    this.newId = 1;
    while (this.existingTasksIds.has(this.newId)) {
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
    this.tasksArray.push(this.newTask);
    this.sortTasksByDueDate();
    this.saveTasksToLocalStorage(this.tasksArray);
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
    this.saveTasksToLocalStorage(this.tasksArray);
  }

  setTaskStatus(task: Task, taskIdToEdit: number | null = null) {
    taskIdToEdit = task.id;
    task.finished = !task.finished;
    this.saveTasksToLocalStorage(this.tasksArray);
  }

  removeTask(id: number) {
    this.tasksArray = this.tasksArray.filter((task) => task.id !== id);
    this.saveTasksToLocalStorage(this.tasksArray);
  }

  filterTasks(boardId: number) {
    return this.getBoardTasks(boardId).filter((task) => {
      const priorityMatch =
        this.selectedPriorities.size === 0 ||
        this.selectedPriorities.has(task.priority);
      const statusMatch =
        this.selectedStatus.size === 0 ||
        (this.selectedStatus.has('Finished') && task.finished) ||
        (this.selectedStatus.has('In progress') && !task.finished);
      return priorityMatch && statusMatch;
    });
  }

  setTaskStatusFilter(status: 'Finished' | 'In progress') {
    if (this.selectedStatus.has(status)) {
      this.selectedStatus.delete(status);
    } else {
      this.selectedStatus.add(status);
    }
  }

  setTaskPriorityFilter(priority: string) {
    if (this.selectedPriorities.has(priority)) {
      this.selectedPriorities.delete(priority);
    } else {
      this.selectedPriorities.add(priority);
    }
  }

  saveTasksToLocalStorage(array: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(array));
  }

  getTasksFromLocalStorage(): Task[] {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  }
}
