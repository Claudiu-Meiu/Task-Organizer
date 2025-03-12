import { Component, inject, OnInit, Input, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TasksComponent } from './tasks/tasks.component';

import { AppRoutes } from '../../models/app-routes.enum';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [TasksComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  boardService = inject(BoardService);

  boardId!: number;
  boardTitle!: string;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.boardId = Number(params.get('id'));
      const boardUrl = params.get('boardUrl');
      const selectedBoard = this.boardService.getBoardById(this.boardId);
      if (!selectedBoard || selectedBoard.boardUrl !== boardUrl) {
        this.router.navigate([AppRoutes.NotFound]);
      } else {
        this.boardTitle = selectedBoard.boardName;
      }
    });
  }
}
