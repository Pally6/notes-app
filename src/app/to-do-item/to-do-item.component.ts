import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from '../note.model';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.scss']
})
export class ToDoItemComponent implements OnInit {
  items: Note[] = [];
  taskForTextDecoration: any;
 
  constructor(private noteService: NoteService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.items = this.noteService.items;
  }

  taskToggle(itemIndex: number, taskIndex: number) { 
    let selectedTask = document.getElementById('task-p' + itemIndex + '-' + taskIndex);
    this.taskForTextDecoration = selectedTask;
    this.changeTxtDecoration();
  };

  private changeTxtDecoration() {
    let currentStyle = this.taskForTextDecoration.style.textDecoration;
    if(currentStyle == 'none') {
      this.taskForTextDecoration.setAttribute('style', 'text-decoration: line-through');
    }
    else {
      this.taskForTextDecoration.setAttribute('style', 'text-decoration: none');
    }
  };

  onNavigate(index: number) {
    this.router.navigate(['note'], {relativeTo: this.route});
    this.noteService.editNote(index);
  };

  onDeleteTask(noteId: number, taskId: number) {
    this.noteService.onDeleteTask(noteId, taskId);
  };

  onDeleteNote(noteId: number) {
    this.noteService.onDeleteNote(noteId);
  };

}
