import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { type Board } from '../app/models/board.model';
import { AppRoutes } from '../app/models/app-routes.enum';
import { BoardsArray } from '../app/models/boards-array';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  router = inject(Router);

  boards: Board[] = BoardsArray;
  existingIds!: any;
  newId!: number;
  newBoard!: Board;

  getBoardById(id: number) {
    return this.boards.filter((board) => board.id === id);
  }

  addBoard(boardName: string) {
    this.existingIds = new Set(this.boards.map((board) => board.id));
    this.newId = 1;
    while (this.existingIds.has(this.newId)) {
      this.newId++;
    }
    this.newBoard = {
      id: this.newId,
      boardName: boardName,
      boardUrl: boardName.toLowerCase().replace(/ /g, '-'),
    };
    this.boards.push(this.newBoard);
    this.router.navigate([AppRoutes.Board, this.newBoard.id, this.newBoard.boardUrl]);
  }

  deleteBoard(boardBtnId: number) {
    return (this.boards = this.boards.filter(
      (board) => board.id !== boardBtnId
    ));
  }
}
