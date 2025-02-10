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

import { BoardService } from '../_shared/board.service';
import { BoardBtnComponent } from './board-btn/board-btn.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, BoardBtnComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements AfterViewChecked {
  boardService = inject(BoardService);

  isSidebarBtnClicked: boolean = false;
  isAddBtnClicked: boolean = false;
  boardNameInput!: string;

  @ViewChild('addBoardWrapper') addBoardWrapper!: ElementRef;
  @ViewChild('addBoardInput') addBoardInput!: ElementRef<HTMLInputElement>;
  @ViewChild('addBoardForm') addBoardForm!: NgForm;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      this.addBoardWrapper &&
      !this.addBoardWrapper.nativeElement.contains(target)
    ) {
      this.isAddBtnClicked = false;
      this.addBoardForm.resetForm();
    }
  }

  setFocus() {
    if (this.isAddBtnClicked && this.addBoardInput) {
      this.addBoardInput.nativeElement.focus();
    }
  }

  ngAfterViewChecked() {
    this.setFocus();
  }

  toggleButtonState(
    button: 'sidebarBtn' | 'addBoardBtn' | 'submitAddBoard' | 'closeAddBoard'
  ) {
    if (button === 'sidebarBtn') {
      this.isSidebarBtnClicked = !this.isSidebarBtnClicked;
    }
    if (button === 'addBoardBtn') {
      this.isAddBtnClicked = true;
    }
    if (button === 'submitAddBoard') {
      this.isAddBtnClicked = false;
    }
    if (button === 'closeAddBoard') {
      this.isAddBtnClicked = false;
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
