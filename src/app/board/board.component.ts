import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardsArray } from '../_shared/boards-array';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  boardName!: string | null;

  boards = BoardsArray;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const boardId = Number(params.get('id'));
      const selectedBoard = this.getBoardById(boardId);
      this.boardName = selectedBoard.boardName || '';
    });
  }

  getBoardById(id: number) {
    return this.boards.filter((board) => board.id === id)[0];
  }
}
