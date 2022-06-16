import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewToDoItemComponent } from './new-to-do-item/new-to-do-item.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';

const routes: Routes = [
  {path: "", redirectTo: 'home', pathMatch:'full'},
  {path: 'home', component: ToDoListComponent, children: [{path: "note", component: NewToDoItemComponent, pathMatch:'full'}]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
