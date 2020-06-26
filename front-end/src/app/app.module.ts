import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonCreateComponent } from './components/person-create/person-create.component';
import { PersonEditComponent } from './components/person-edit/person-edit.component';
import { PersonListComponent } from './components/person-list/person-list.component';
import { ApiService } from './service/api.service';

@NgModule({
  declarations: [
    AppComponent,
    PersonCreateComponent,
    PersonEditComponent,
    PersonListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
