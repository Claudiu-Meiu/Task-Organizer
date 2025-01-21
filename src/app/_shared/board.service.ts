import { Injectable } from '@angular/core';

import { BoardsArray } from '../_shared/boards-array';
import { type Board } from '../_shared/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
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
  }

  deleteBoard(boardBtnId: number) {
    return (this.boards = this.boards.filter(
      (board) => board.id !== boardBtnId
    ));
  }
}
