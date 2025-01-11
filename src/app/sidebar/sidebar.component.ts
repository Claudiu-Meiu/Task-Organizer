import { Component } from '@angular/core';
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
  sidebarBtnClicked = false;

  onSideBarBtnClick() {
    this.sidebarBtnClicked = !this.sidebarBtnClicked;
  }

  boards = BoardsArray;
}
