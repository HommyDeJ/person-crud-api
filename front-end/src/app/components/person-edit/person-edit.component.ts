import { Person } from '../../models/person';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})

export class PersonEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  personData: Person[];

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.updatePerson();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getPerson(id);
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      cellphone_number: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  getPerson(id) {
    this.apiService.getPerson(id).subscribe(data => {
      this.editForm.setValue({
        name: data['name'],
        last_name: data['last_name'],
        email: data['email'],
        cellphone_number: data['cellphone_number']
      });
    });
  }

  updatePerson() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      cellphone_number: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Seguro que desea actualizar?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updatePerson(id, this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/persons-list');
            console.log('Actualizado correctamente!')
          }, (error) => {
            console.log(error)
          })
      }
    }
  }

}