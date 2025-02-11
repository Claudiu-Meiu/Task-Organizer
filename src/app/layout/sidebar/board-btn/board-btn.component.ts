import {
  Component,
  inject,
  Input,
  HostListener,
  ElementRef,
  ViewChild,
  AfterViewChecked,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';

import { type Board } from '../../../models/board.model';
import { AppRoutes } from '../../../models/app-routes.enum';
import { BoardService } from '../../../../services/board.service';

@Component({
  selector: 'app-board-btn',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './board-btn.component.html',
  styleUrl: './board-btn.component.scss',
})
export class BoardBtnComponent implements OnInit, AfterViewChecked {
  @Input({ required: true }) boardBtn!: Board;
  boardService = inject(BoardService);
  router: Router = inject(Router);

  isBoardBtnActionClicked: boolean = false;
  isEditBoardBtnClicked: boolean = false;
  boardNameInput!: string;

  ngOnInit() {
    this.boardNameInput = this.boardBtn.boardName;
  }

  @ViewChild('actionWrapper', { static: false }) actionWrapper!: ElementRef;
  @ViewChild('editBoardWrapper', { static: false })
  editBoardWrapper!: ElementRef;
  @ViewChild('editBoardInput') editBoardInput!: ElementRef<HTMLInputElement>;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      this.actionWrapper &&
      !this.actionWrapper.nativeElement.contains(target)
    ) {
      this.isBoardBtnActionClicked = false;
      this.boardNameInput = this.boardBtn.boardName;
    }
    if (
      this.editBoardWrapper &&
      !this.editBoardWrapper.nativeElement.contains(target)
    ) {
      this.toggleButtonState('closeEditBtn');
      this.isBoardBtnActionClicked = false;
    }
  }

  setFocus() {
    if (this.isEditBoardBtnClicked && this.editBoardInput) {
      this.editBoardInput.nativeElement.focus();
    }
  }

  ngAfterViewChecked() {
    this.setFocus();
  }

  toggleButtonState(
    button: 'actionBtn' | 'editBtn' | 'closeEditBtn' | 'submitBtn'
  ) {
    if (button === 'actionBtn') {
      this.isBoardBtnActionClicked = !this.isBoardBtnActionClicked;
      this.isEditBoardBtnClicked = false;
      this.boardNameInput = this.boardBtn.boardName;
    }
    if (button === 'editBtn') {
      this.isEditBoardBtnClicked = !this.isEditBoardBtnClicked;
    }
    if (button === 'closeEditBtn') {
      this.isEditBoardBtnClicked = !this.isEditBoardBtnClicked;
      this.boardNameInput = this.boardBtn.boardName;
      this.isBoardBtnActionClicked = false;
    }
    if (button === 'submitBtn') {
      this.isEditBoardBtnClicked = !this.isEditBoardBtnClicked;
      this.isBoardBtnActionClicked = !this.isBoardBtnActionClicked;
    }
  }

  onDeleteBoard() {
    this.boardService.deleteBoard(this.boardBtn.id);
    this.router.navigate([AppRoutes.Home]);
  }

  onEditBoard() {
    this.boardBtn.boardName = this.boardNameInput;
    this.boardBtn.boardUrl = this.boardNameInput
      .toLowerCase()
      .replace(/ /g, '-');
  }

  onSubmitEdit(form: NgForm) {
    this.onEditBoard();
    this.router.navigate([
      AppRoutes.Board,
      this.boardBtn.id,
      this.boardBtn.boardUrl,
    ]);
    this.boardNameInput = this.boardBtn.boardName;
  }
}
