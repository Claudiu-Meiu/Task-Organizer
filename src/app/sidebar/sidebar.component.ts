import { Component } from '@angular/core';

import { BoardBtnComponent } from './board-btn/board-btn.component';
import { BoardsArray } from '../_shared/boards-array';
import { type Boards } from '../_shared/boards.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [BoardBtnComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  isSidebarBtnClicked = false;
  boards: Boards[] = BoardsArray;
  activeBoardName!: string;

  onSideBarBtnClick() {
    this.isSidebarBtnClicked = !this.isSidebarBtnClicked;
  }
}
