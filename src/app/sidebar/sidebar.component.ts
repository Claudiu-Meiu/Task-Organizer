import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm, FormsModule } from '@angular/forms';

import { BoardService } from '../_shared/board.service';
import { BoardBtnComponent } from './board-btn/board-btn.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, BoardBtnComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  boardService = inject(BoardService);

  isActive: boolean = false;
  isSidebarBtnClicked: boolean = false;
  isAddBtnClicked: boolean = false;
  boardNameInput!: string;

  toggleActive() {
    this.isActive = !this.isActive;
  }

  onSideBarBtnClick() {
    this.isSidebarBtnClicked = !this.isSidebarBtnClicked;
    this.isAddBtnClicked = false;
    this.isActive = false;
  }

  onAddBtnClick() {
    this.isAddBtnClicked = !this.isAddBtnClicked;
  }

  onAddBoard() {
    this.boardService.addBoard(this.boardNameInput);
  }

  onSubmit(form: NgForm) {
    this.onAddBoard();
    form.resetForm();
  }
}
