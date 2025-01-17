import { Component, inject } from '@angular/core';

import { BoardService } from '../_shared/board.service';
import { BoardBtnComponent } from './board-btn/board-btn.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [BoardBtnComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  isSidebarBtnClicked = false;
  private boardService = inject(BoardService);
  boards = this.boardService.boards;

  onSideBarBtnClick() {
    this.isSidebarBtnClicked = !this.isSidebarBtnClicked;
  }
}
