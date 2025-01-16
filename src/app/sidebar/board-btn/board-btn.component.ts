import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { type Board } from '../../_shared/board.model';

@Component({
  selector: 'app-board-btn',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './board-btn.component.html',
  styleUrl: './board-btn.component.scss',
})
export class BoardBtnComponent {
  @Input({ required: true }) boardBtn!: Board;
}
