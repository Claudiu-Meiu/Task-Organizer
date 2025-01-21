import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { type Board } from '../../_shared/board.model';
import { BoardService } from '../../_shared/board.service';

@Component({
  selector: 'app-board-btn',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './board-btn.component.html',
  styleUrl: './board-btn.component.scss',
})
export class BoardBtnComponent {
  @Input({ required: true }) boardBtn!: Board;
  boardService = inject(BoardService);

  isActive: boolean = false;
  isBoardBtnActionClicked: boolean = false;

  toggleActive() {
    this.isActive = !this.isActive;
  }

  onBoardBtnActionClicked() {
    this.isBoardBtnActionClicked = !this.isBoardBtnActionClicked;
  }

  onDeleteBoard() {
    return this.boardService.deleteBoard(this.boardBtn.id);
  }
}
