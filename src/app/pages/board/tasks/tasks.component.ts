import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

import { type Task } from '../../../models/task.model';

import { TasksService } from '../../../services/tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  @Input({ required: true }) BoardId!: number;

  tasksService = inject(TasksService);

  isHighPriorityBtnActive: boolean = false;
  isMediumPriorityBtnActive: boolean = false;
  isLowPriorityBtnActive: boolean = false;

  isAddTaskBtnClicked: boolean = false;
  isEditTaskBtnClicked: boolean = false;

  addTaskEnteredDescription!: string;
  addTaskEnteredDueDate!: string;
  addTaskEnteredPriority!: string;

  editTaskEnteredDescription!: string;
  editTaskEnteredDueDate!: string;
  editTaskEnteredPriority!: string;
  taskIdToEdit: number | null = null;

  toggleHighPriorityBtnActive() {
    this.isHighPriorityBtnActive = true;
    this.isMediumPriorityBtnActive = false;
    this.isLowPriorityBtnActive = false;
  }
  toggleMediumPriorityBtnActive() {
    this.isMediumPriorityBtnActive = true;
    this.isHighPriorityBtnActive = false;
    this.isLowPriorityBtnActive = false;
  }
  toggleLowPriorityBtnActive() {
    this.isLowPriorityBtnActive = true;
    this.isHighPriorityBtnActive = false;
    this.isMediumPriorityBtnActive = false;
  }

  get selectedBoardTasks() {
    return this.tasksService.getBoardTasks(this.BoardId);
  }

  onAddTask() {
    this.isAddTaskBtnClicked = true;
  }

  onCloseAddTask() {
    this.isAddTaskBtnClicked = false;
    this.isHighPriorityBtnActive = false;
    this.isMediumPriorityBtnActive = false;
    this.isLowPriorityBtnActive = false;
    this.addTaskEnteredPriority = '';
  }

  onSubmitAddTask(form: NgForm) {
    this.tasksService.addTask(this.BoardId, {
      description: this.addTaskEnteredDescription,
      dueDate: this.addTaskEnteredDueDate,
      priority: this.addTaskEnteredPriority,
    });
    form.resetForm();
    this.onCloseAddTask();
  }

  onEditTask(task: Task) {
    this.taskIdToEdit = task.id;
    this.editTaskEnteredDescription = task.description;
    this.editTaskEnteredDueDate = task.dueDate;
    this.editTaskEnteredPriority = task.priority;
    this.isEditTaskBtnClicked = true;

    this.isHighPriorityBtnActive = task.priority === 'High';
    this.isMediumPriorityBtnActive = task.priority === 'Medium';
    this.isLowPriorityBtnActive = task.priority === 'Low';
  }

  onCloseEditTask() {
    this.isEditTaskBtnClicked = false;
    this.taskIdToEdit = null;
    this.isHighPriorityBtnActive = false;
    this.isMediumPriorityBtnActive = false;
    this.isLowPriorityBtnActive = false;
    this.addTaskEnteredPriority = '';
  }

  onSubmitEditTask(form: NgForm) {
    if (form.valid && this.taskIdToEdit !== null) {
      this.tasksService.editTask(
        this.taskIdToEdit,
        this.editTaskEnteredDescription,
        this.editTaskEnteredDueDate,
        this.editTaskEnteredPriority
      );
      this.onCloseEditTask();
    }
  }

  onRemoveTask(task: Task) {
    this.tasksService.removeTask(task.id);
  }
}
