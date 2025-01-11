import { Component, Input } from '@angular/core';
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
}
