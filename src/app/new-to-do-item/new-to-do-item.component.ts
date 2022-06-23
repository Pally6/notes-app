import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Note } from '../note.model';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-new-to-do-item',
  templateUrl: './new-to-do-item.component.html',
  styleUrls: ['./new-to-do-item.component.scss']
})
export class NewToDoItemComponent implements OnInit, OnDestroy {
  noteSub: Subscription | any;
  editedNote: Note | any;
  editedNoteIndex: number | any = undefined;
  isEdit: boolean | any = true;
  isValid: boolean = true;
  noteForm: FormGroup;
  
  constructor(private noteService: NoteService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {

    this.noteForm = this.fb.group({  
      name: new FormControl('', [
        Validators.required,
      ]), 
      tasks: this.fb.array([])   
    });
    
  }

  ngOnInit(): void {

    this.noteSub = this.noteService.editedItem.subscribe((index: number) => {
      this.editedNoteIndex = index;
      this.editedNote = this.noteService.getEditNote(index);
      if(this.editedNoteIndex >= 0) {
        this.noteForm.patchValue({name: this.editedNote.name});
        this.editedNote.tasks.map((v: string, i: number) => {
          this.displayTask(i);
        });
      };
      if(this.editedNoteIndex === undefined) {
        this.isEdit = false;
      };
    });

  }

  tasks() : FormArray {  
    return this.noteForm.get("tasks") as FormArray  
  };  
     
  newTask(): FormGroup {  
    return this.fb.group({  
      task: '' 
    });  
  };
  
  addTask() {  
    this.tasks().push(this.newTask());  
  };

  addExistingTask(i: number): FormGroup { 
    return this.fb.group({  
      task:  [this.editedNote.tasks[i]]
    });  
  };
  
  displayTask(i: number) {  
    this.tasks().push(this.addExistingTask(i));  
  };
     
  removeTask(i:number) {  
    this.tasks().removeAt(i);  
  };  

  onSubmit() {
    if(this.isEdit) {
      if(!this.noteForm.valid) {
        this.isValid = false;
      }
      
      if(this.noteForm.valid) {
        this.editedNote = this.noteForm.value;
        this.noteService.updateNote(this.editedNoteIndex, this.editedNote);
        this.router.navigate([''], {relativeTo: this.route});
      };
    };
    
    if(!this.isEdit) {
      if(!this.noteForm.valid) {
        this.isValid = false;
      }

      if(this.noteForm.valid) {
        let note: Note = this.noteForm.value;
        this.noteService.addNote(note.name, note.tasks);
        this.router.navigate([''], {relativeTo: this.route});
      };
    };
  };

  onCancel() {
    this.router.navigate(['']);
  };

  ngOnDestroy(): void {
    this.noteSub.unsubscribe();
  };

}
