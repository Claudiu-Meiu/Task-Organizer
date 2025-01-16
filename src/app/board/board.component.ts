import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  boardName!: string | null;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.boardName = params.get('boardName');
    });
  }
}
