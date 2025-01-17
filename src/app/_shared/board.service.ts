import { Injectable } from '@angular/core';

import { BoardsArray } from '../_shared/boards-array';
import { type Board } from '../_shared/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  boards: Board[] = BoardsArray;

  getBoardById(id: number) {
    return this.boards.filter((board) => board.id === id);
  }

  addBoard(board: Board) {
    return this.boards.push(board);
  }
}
