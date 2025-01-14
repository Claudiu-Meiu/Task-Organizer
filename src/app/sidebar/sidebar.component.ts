import { Component, Output, EventEmitter, Input } from '@angular/core';
import { BoardsArray } from '../boards-array';
import { BoardBtnComponent } from './board-btn/board-btn.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [BoardBtnComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Output() selectedBoard = new EventEmitter<string>();
  @Input() isSidebarBtnClicked = false;
  @Input() activeBoardName!: string;
  @Input() boards = BoardsArray;

  onSideBarBtnClick() {
    this.isSidebarBtnClicked = !this.isSidebarBtnClicked;
  }

  onSelectedBoard(boardName: string) {
    this.activeBoardName = boardName;
    this.selectedBoard.emit(boardName);
  }
}
