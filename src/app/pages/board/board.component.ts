import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  boardService = inject(BoardService);

  boardTitle!: string;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const boardId = Number(params.get('id'));
      const boardUrl = params.get('boardUrl');
      const selectedBoard = this.boardService.getBoardById(boardId);
      if (!selectedBoard || selectedBoard.boardUrl !== boardUrl) {
        this.router.navigate(['/not-found']);
      } else {
        this.boardTitle = selectedBoard.boardName;
      }
    });
  }
}
