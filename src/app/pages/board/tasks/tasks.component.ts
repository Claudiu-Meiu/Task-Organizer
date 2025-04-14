import {
  Component,
  inject,
  Input,
  HostListener,
  ElementRef,
  ViewChild,
  AfterViewChecked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { TasksService } from '../../../services/tasks.service';
import { type Task } from '../../../models/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements AfterViewChecked {
  @Input({ required: true }) BoardId!: number;

  @ViewChild('addTaskDescriptionInput')
  addTaskDescriptionInput!: ElementRef<HTMLInputElement>;
  @ViewChild('editTaskDescriptionInput')
  editTaskDescriptionInput!: ElementRef<HTMLInputElement>;
  @ViewChild('actionWrapper', { static: false })
  actionWrapper!: ElementRef;

  tasksService = inject(TasksService);

  buttonStates: {
    taskPriority: {
      high: boolean;
      medium: boolean;
      low: boolean;
    };
    isFilterTasksBtnClicked: boolean;
    isAddTaskBtnClicked: boolean;
    isEditTaskBtnClicked: boolean;
    isDeleteTaskBtnClicked: { [taskId: number]: boolean };
    [taskId: number]: boolean;
  } = {
    taskPriority: {
      high: false,
      medium: false,
      low: false,
    },
    isFilterTasksBtnClicked: false,
    isAddTaskBtnClicked: false,
    isEditTaskBtnClicked: false,
    isDeleteTaskBtnClicked: {},
  };

  addTaskEnteredDescription!: string;
  addTaskEnteredDueDate!: string;
  addTaskEnteredPriority!: string;

  editTaskEnteredDescription!: string;
  editTaskEnteredDueDate!: string;
  editTaskEnteredPriority!: string;
  taskIdToEdit: number | null = null;

  taskFinished: boolean = false;

  ngAfterViewChecked() {
    this.setFocus();
  }

  setFocus() {
    if (this.addTaskDescriptionInput) {
      this.addTaskDescriptionInput.nativeElement.focus();
    }
    if (
      this.buttonStates.isEditTaskBtnClicked &&
      this.editTaskDescriptionInput
    ) {
      this.editTaskDescriptionInput.nativeElement.focus();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      this.actionWrapper &&
      !this.actionWrapper.nativeElement.contains(target)
    ) {
      for (const taskId in this.buttonStates.isDeleteTaskBtnClicked) {
        this.buttonStates.isDeleteTaskBtnClicked[taskId] = false;
      }
    }
  }

  toggleButtonState(button: string, taskId?: number) {
    switch (button) {
      case 'toggleHighPriorityBtnActive':
        this.setTaskPriorityButtonState('High');
        break;
      case 'toggleMediumPriorityBtnActive':
        this.setTaskPriorityButtonState('Medium');
        break;
      case 'toggleLowPriorityBtnActive':
        this.setTaskPriorityButtonState('Low');
        break;
      case 'addTaskBtn':
        this.buttonStates.isAddTaskBtnClicked = true;
        break;
      case 'closeAddTaskBtn':
        this.closeAddTask();
        break;
      case 'closeEditTaskBtn':
        this.closeEditTask();
        break;
      case 'toggleDeleteTaskBtn':
        if (taskId !== undefined) {
          this.buttonStates.isDeleteTaskBtnClicked[taskId] =
            !this.buttonStates.isDeleteTaskBtnClicked[taskId];
        }
        break;
      case 'toggleFilter':
        this.buttonStates.isFilterTasksBtnClicked =
          !this.buttonStates.isFilterTasksBtnClicked;
        break;
    }
  }

  private setTaskPriorityButtonState(taskPriority: string) {
    this.buttonStates.taskPriority.high = taskPriority === 'High';
    this.buttonStates.taskPriority.medium = taskPriority === 'Medium';
    this.buttonStates.taskPriority.low = taskPriority === 'Low';
  }

  private resetPriorityButtons() {
    this.buttonStates.taskPriority.high = false;
    this.buttonStates.taskPriority.medium = false;
    this.buttonStates.taskPriority.low = false;
  }

  private closeAddTask() {
    this.buttonStates.isAddTaskBtnClicked = false;
    this.resetPriorityButtons();
    this.addTaskEnteredPriority = '';
  }

  private closeEditTask() {
    this.buttonStates.isEditTaskBtnClicked = false;
    this.taskIdToEdit = null;
    this.resetPriorityButtons();
    this.addTaskEnteredPriority = '';
  }

  onSubmitAddTask(form: NgForm) {
    this.tasksService.addTask(this.BoardId, {
      description: this.addTaskEnteredDescription,
      dueDate: this.addTaskEnteredDueDate,
      priority: this.addTaskEnteredPriority,
      finished: this.taskFinished,
    });
    form.resetForm();
    this.toggleButtonState('closeAddTaskBtn');
  }

  onEditTask(task: Task) {
    this.taskIdToEdit = task.id;
    this.editTaskEnteredDescription = task.description;
    this.editTaskEnteredDueDate = task.dueDate;
    this.editTaskEnteredPriority = task.priority;
    this.buttonStates.isEditTaskBtnClicked = true;

    this.setTaskPriorityButtonState(task.priority);
  }

  onSubmitEditTask(form: NgForm) {
    if (form.valid && this.taskIdToEdit !== null) {
      this.tasksService.editTask(
        this.taskIdToEdit,
        this.editTaskEnteredDescription,
        this.editTaskEnteredDueDate,
        this.editTaskEnteredPriority
      );
      this.toggleButtonState('closeEditTaskBtn');
    }
  }

  onSetTaskStatus(task: Task) {
    this.tasksService.setTaskStatus(task, this.taskIdToEdit);
  }

  onRemoveTask(task: Task) {
    this.tasksService.removeTask(task.id);
  }

  get filteredTasks() {
    return this.tasksService.filterTasks(this.BoardId);
  }
}
