import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BoardService } from '../_shared/board.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  boardService = inject(BoardService);

  boardName!: string;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const boardId = Number(params.get('id'));
      const selectedBoard = this.boardService.getBoardById(boardId)[0];
      this.boardName = selectedBoard.boardName;
    });
  }
}
