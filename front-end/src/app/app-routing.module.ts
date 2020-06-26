import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonCreateComponent } from './components/person-create/person-create.component';
import { PersonEditComponent } from './components/person-edit/person-edit.component';
import { PersonListComponent } from './components/person-list/person-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'create-person'},
  { path: 'create-person', component: PersonCreateComponent},
  { path: 'edit-person/:id', component: PersonEditComponent },
  { path: 'persons-list', component: PersonListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
