import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { type Board } from '../models/board.model';
import { AppRoutes } from '../models/app-routes.enum';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  router = inject(Router);

  BoardsArray: Board[] = this.getBoardsFromLocalStorage();
  existingIds!: Set<number>;
  newId!: number;
  newBoard!: Board;

  getBoardById(id: number) {
    return this.BoardsArray.find((board) => board.id === id);
  }

  addBoard(boardName: string) {
    this.existingIds = new Set(this.BoardsArray.map((board) => board.id));
    this.newId = 1;
    while (this.existingIds.has(this.newId)) {
      this.newId++;
    }
    this.newBoard = {
      id: this.newId,
      boardName: boardName,
      boardUrl: boardName.toLowerCase().replace(/ /g, '-'),
    };
    this.BoardsArray.push(this.newBoard);
    this.saveArrayToLocalStorage(this.BoardsArray);
    this.router.navigate([
      AppRoutes.Board,
      this.newBoard.id,
      this.newBoard.boardUrl,
    ]);
  }

  editBoard(id: number, updatedBoardName: string) {
    const boardToEdit = this.getBoardById(id);
    if (boardToEdit) {
      boardToEdit.boardName = updatedBoardName;
      boardToEdit.boardUrl = updatedBoardName.toLowerCase().replace(/ /g, '-');
      this.saveArrayToLocalStorage(this.BoardsArray);
    }
  }

  removeBoard(boardBtnId: number) {
    this.BoardsArray = this.BoardsArray.filter(
      (board) => board.id !== boardBtnId
    );
    this.saveArrayToLocalStorage(this.BoardsArray);
    this.router.navigate([AppRoutes.Home]);
  }

  saveArrayToLocalStorage(array: Board[]) {
    localStorage.setItem('boards', JSON.stringify(array));
  }

  getBoardsFromLocalStorage(): Board[] {
    const storedBoards = localStorage.getItem('boards');
    return storedBoards ? JSON.parse(storedBoards) : [];
  }
}
