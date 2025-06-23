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
import { AppRoutes } from '../../../models/app-routes.enum';
import { BoardService } from '../../../services/board.service';
import { type Board } from '../../../models/board.model';

@Component({
  selector: 'app-board-btn',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './board-btn.component.html',
  styleUrls: ['./board-btn.component.scss'],
})
export class BoardBtnComponent implements OnInit, AfterViewChecked {
  @Input({ required: true }) boardBtn!: Board;

  @ViewChild('actionWrapper', { static: false })
  actionWrapper!: ElementRef;
  @ViewChild('editBoardWrapper', { static: false })
  editBoardWrapper!: ElementRef;
  @ViewChild('editBoardInput') editBoardInput!: ElementRef<HTMLInputElement>;
  @ViewChild('deleteWrapper', { static: false }) deleteWrapper!: ElementRef;

  boardService = inject(BoardService);
  router = inject(Router);

  buttonStates = {
    isBoardBtnActionClicked: false,
    isEditBoardBtnClicked: false,
    isDeleteBoardBtnClicked: false,
  };

  enteredBoardName!: string;

  ngOnInit() {
    this.enteredBoardName = this.boardBtn.boardName;
  }

  ngAfterViewChecked() {
    this.setFocus();
  }

  private setFocus() {
    if (this.buttonStates.isEditBoardBtnClicked && this.editBoardInput) {
      this.editBoardInput.nativeElement.focus();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      this.actionWrapper &&
      !this.actionWrapper.nativeElement.contains(target)
    ) {
      this.buttonStates.isBoardBtnActionClicked = false;
      this.buttonStates.isEditBoardBtnClicked = false;
      this.enteredBoardName = this.boardBtn.boardName;
    }
    if (
      this.editBoardWrapper &&
      !this.editBoardWrapper.nativeElement.contains(target)
    ) {
      this.toggleButtonState('closeEditBtn');
    }
    if (
      this.deleteWrapper &&
      !this.deleteWrapper.nativeElement.contains(target)
    ) {
      this.buttonStates.isDeleteBoardBtnClicked = false;
      this.buttonStates.isBoardBtnActionClicked = false;
    }
  }

  toggleButtonState(
    button:
      | 'actionBtn'
      | 'editBtn'
      | 'closeEditBtn'
      | 'confirmEditBtn'
      | 'deleteBtn'
      | 'closeDeleteBtn'
  ) {
    switch (button) {
      case 'actionBtn':
        this.buttonStates.isBoardBtnActionClicked =
          !this.buttonStates.isBoardBtnActionClicked;
        this.enteredBoardName = this.boardBtn.boardName;
        break;
      case 'editBtn':
        this.buttonStates.isEditBoardBtnClicked = true;
        break;
      case 'closeEditBtn':
        this.buttonStates.isEditBoardBtnClicked = false;
        this.enteredBoardName = this.boardBtn.boardName;
        this.buttonStates.isBoardBtnActionClicked = false;
        break;
      case 'confirmEditBtn':
        this.buttonStates.isEditBoardBtnClicked = false;
        this.buttonStates.isBoardBtnActionClicked = false;
        break;
      case 'deleteBtn':
        this.buttonStates.isDeleteBoardBtnClicked = true;
        break;
      case 'closeDeleteBtn':
        this.buttonStates.isDeleteBoardBtnClicked = false;
        this.buttonStates.isBoardBtnActionClicked = false;
        break;
    }
  }

  onSubmitEdit(form: NgForm) {
    this.boardService.editBoard(this.boardBtn.id, this.enteredBoardName);
    this.router.navigate([
      AppRoutes.Board,
      this.boardBtn.id,
      this.boardBtn.boardUrl,
    ]);
    this.enteredBoardName = this.boardBtn.boardName;
  }

  onRemoveBoard() {
    this.boardService.removeBoard(this.boardBtn.id);
  }
}
