import { Component, inject, Input } from '@angular/core';

import { TasksService } from '../../../services/tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  @Input({ required: true }) BoardId!: number;

  tasksService = inject(TasksService);

  get selectedBoardTasks() {
    return this.tasksService.getBoardTasks(this.BoardId);
  }
}
