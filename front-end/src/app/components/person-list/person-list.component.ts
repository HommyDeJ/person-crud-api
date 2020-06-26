import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})

export class PersonListComponent implements OnInit {
  
  Persons:any = [];

  constructor(private apiService: ApiService) { 
    this.readPersons();
  }

  ngOnInit() {}

  readPersons(){
    this.apiService.getPersons().subscribe((data) => {
      console.log("hola");
      debugger;
     this.Persons = data;
    })    
  }

  removePerson(Persons, index) {
    if(window.confirm('Seguro que desea eliminar el registro?')) {
        this.apiService.deletePerson(Persons._id).subscribe((data) => {
          this.Persons.splice(index, 1);
        }
      )    
    }
  }

}