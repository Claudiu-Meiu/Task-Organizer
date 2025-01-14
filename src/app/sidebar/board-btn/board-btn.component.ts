import { Component, Input, Output, EventEmitter } from '@angular/core';
import { type BoardBtn } from './board-btn.model';

@Component({
  selector: 'app-board-btn',
  standalone: true,
  imports: [],
  templateUrl: './board-btn.component.html',
  styleUrl: './board-btn.component.scss',
})
export class BoardBtnComponent {
  @Input({ required: true }) boardBtn!: BoardBtn;
  @Input() isActive: boolean = false;
  @Output() selectBoard = new EventEmitter<string>();

  onSelectBoard() {
    this.selectBoard.emit(this.boardBtn.boardName);
    this.isActive = true;
  }
}
