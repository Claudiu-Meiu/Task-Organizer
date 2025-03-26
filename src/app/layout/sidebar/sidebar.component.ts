import {
  Component,
  inject,
  HostListener,
  ElementRef,
  ViewChild,
  AfterViewChecked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm, FormsModule } from '@angular/forms';
import { BoardService } from '../../services/board.service';
import { BoardBtnComponent } from './board-btn/board-btn.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, BoardBtnComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements AfterViewChecked {
  @ViewChild('addBoardWrapper')
  addBoardWrapper!: ElementRef;
  @ViewChild('addBoardInput') addBoardInput!: ElementRef<HTMLInputElement>;
  @ViewChild('addBoardForm') addBoardForm!: NgForm;

  boardService = inject(BoardService);

  buttonStates = {
    isSidebarBtnClicked: false,
    isAddBtnClicked: false,
  };
  boardNameInput!: string;

  ngAfterViewChecked() {
    this.setFocus();
  }

  setFocus() {
    if (this.buttonStates.isAddBtnClicked && this.addBoardInput) {
      this.addBoardInput.nativeElement.focus();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      this.addBoardWrapper &&
      !this.addBoardWrapper.nativeElement.contains(target)
    ) {
      this.buttonStates.isAddBtnClicked = false;
      this.addBoardForm.resetForm();
    }
  }

  toggleButtonState(
    button: 'sidebarBtn' | 'addBoardBtn' | 'submitAddBoard' | 'closeAddBoard'
  ) {
    switch (button) {
      case 'sidebarBtn':
        this.buttonStates.isSidebarBtnClicked =
          !this.buttonStates.isSidebarBtnClicked;
        break;
      case 'addBoardBtn':
        this.buttonStates.isAddBtnClicked = true;
        break;
      case 'submitAddBoard':
        this.buttonStates.isAddBtnClicked = false;
        break;
      case 'closeAddBoard':
        this.buttonStates.isAddBtnClicked = false;
        break;
    }
  }

  onAddBoard() {
    this.boardService.addBoard(this.boardNameInput);
  }

  onSubmitAddBoard(form: NgForm) {
    this.onAddBoard();
    form.resetForm();
  }
}
