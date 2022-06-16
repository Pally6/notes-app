import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {
  itemIndex: number | any = undefined;
  
  constructor(private noteService: NoteService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onAddNote() {
    this.router.navigate(['note'], {relativeTo: this.route});
    this.noteService.editedItem.next(this.itemIndex);
  };
  
}
