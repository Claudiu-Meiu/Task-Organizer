import { Component, Output, EventEmitter } from '@angular/core';

import { BoardBtnComponent } from './board-btn/board-btn.component';
import { BoardsArray } from '../boards-array';
import { type Boards } from '../boards.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [BoardBtnComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Output() selectedBoard = new EventEmitter<string>();
  isSidebarBtnClicked = false;
  boards: Boards[] = BoardsArray;
  activeBoardName!: string;

  onSideBarBtnClick() {
    this.isSidebarBtnClicked = !this.isSidebarBtnClicked;
  }

  onSelectedBoard(boardName: string) {
    this.activeBoardName = boardName;
    this.selectedBoard.emit(boardName);
  }
}
