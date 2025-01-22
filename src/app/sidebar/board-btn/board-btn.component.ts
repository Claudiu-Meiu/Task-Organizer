import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';

import { type Board } from '../../_shared/board.model';
import { BoardService } from '../../_shared/board.service';

@Component({
  selector: 'app-board-btn',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './board-btn.component.html',
  styleUrl: './board-btn.component.scss',
})
export class BoardBtnComponent {
  @Input({ required: true }) boardBtn!: Board;
  boardService = inject(BoardService);
  router = inject(Router);

  isBoardBtnActionActive: boolean = false;
  isEditBtnActive: boolean = false;
  isBoardBtnActionClicked: boolean = false;
  isEditBoardBtnClicked: boolean = false;
  boardNameInput!: string;

  toggleBoardBtnActionActive() {
    this.isBoardBtnActionActive = !this.isBoardBtnActionActive;
  }

  toggleEditBoardBtnActive() {
    this.isEditBtnActive = !this.isEditBtnActive;
  }

  onBoardBtnActionClicked() {
    this.isBoardBtnActionClicked = !this.isBoardBtnActionClicked;
  }

  onEditBoardBtnClicked() {
    this.isEditBoardBtnClicked = !this.isEditBoardBtnClicked;
  }

  onDeleteBoard() {
    this.boardService.deleteBoard(this.boardBtn.id);
    this.router.navigate(['/']);
  }

  onEditBoard() {
    this.boardBtn.boardName = this.boardNameInput;
    this.boardBtn.boardUrl = this.boardNameInput
      .toLowerCase()
      .replace(/ /g, '-');
  }

  onSubmitEdit(form: NgForm) {
    this.onEditBoard();
    form.resetForm();
    this.router.navigate(['/board', this.boardBtn.id, this.boardBtn.boardUrl]);
  }
}
