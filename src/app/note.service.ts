import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Note } from "./note.model";

@Injectable({providedIn: 'root'})
export class NoteService {
  itemIndex!: number | any;
  editedItem = new BehaviorSubject<number | any>(this.itemIndex);
  taskValue: {}[] | any = []

  items: Note[] | any = [
    {
      name: 'title for test',
      tasks: ['just for test']
    },
    {
      name: 'another title for test',
      tasks: ['just for test again', 'again a task', 'yet another task']
    },
  ];

  

    addNote(noteName: string, noteTask: [] | any) {
      noteTask.map((v: {} | any, i: number) => {
        if(v.task.length === 0) {
          return;
        }
        else {
          this.taskValue.push(v.task);
        }
      });
      this.items.push({
        name: noteName, tasks: this.taskValue
      });
      this.taskValue = [];
    };

    updateNote(index: number, editedNote: Note) {
      editedNote.tasks.map((v: {} | any, i: number) => {
        if(v.task.length === 0) {
          return;
        }
        else {
          this.taskValue.push(v.task);
        }
      });
      this.items[index] = {name: editedNote.name, tasks: this.taskValue}
      this.taskValue = [];
    };

    editNote(index: number) {
      this.itemIndex = index;
      this.editedItem.next(this.itemIndex);

    };

    getEditNote(index: number) {
      return this.items[index];
    };

    onDeleteTask(noteId: number, taskId: number) {
      this.items[noteId].tasks.splice(taskId, 1);
    };

    onDeleteNote(noteId: number) {
      this.items.splice(noteId, 1);
    };

}