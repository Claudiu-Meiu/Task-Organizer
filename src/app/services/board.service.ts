import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from '../models/app-routes.enum';
import { TasksService } from './tasks.service';
import { type Board } from '../models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  router = inject(Router);
  tasksService = inject(TasksService);

  boardsArray: Board[] = this.getBoardsFromLocalStorage();
  existingBoardsIds: Set<number> = new Set();
  newId!: number;
  newBoard!: Board;

  getBoardById(id: number) {
    return this.boardsArray.find((board) => board.id === id);
  }

  addBoard(boardName: string) {
    this.existingBoardsIds = new Set(this.boardsArray.map((board) => board.id));
    this.newId = 1;
    while (this.existingBoardsIds.has(this.newId)) {
      this.newId++;
    }
    this.newBoard = {
      id: this.newId,
      boardName: boardName,
      boardUrl: boardName.toLowerCase().replace(/ /g, '-'),
    };
    this.boardsArray.push(this.newBoard);
    this.saveBoardsToLocalStorage(this.boardsArray);
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
      this.saveBoardsToLocalStorage(this.boardsArray);
    }
  }

  removeBoard(boardBtnId: number) {
    const tasksToRemove = this.tasksService.getBoardTasks(boardBtnId);
    tasksToRemove.forEach((task) => this.tasksService.removeTask(task.id));

    this.boardsArray = this.boardsArray.filter(
      (board) => board.id !== boardBtnId
    );
    this.saveBoardsToLocalStorage(this.boardsArray);
    this.router.navigate([AppRoutes.Home]);
  }

  saveBoardsToLocalStorage(array: Board[]) {
    localStorage.setItem('boards', JSON.stringify(array));
  }

  getBoardsFromLocalStorage(): Board[] {
    const storedBoards = localStorage.getItem('boards');
    return storedBoards ? JSON.parse(storedBoards) : [];
  }
}
