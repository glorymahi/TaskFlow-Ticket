import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.css']
})
export class JobAddComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  hide=true;

  Schedule: any = ['daily','once','weekly']


  arrayInputs = [{controlerInputName1 : ['a',Validators.required]}];

  formName =this.fb.group({
    controllerArray: this.fb.array([])
  })  

  constructor(private fb: FormBuilder,private toastr: ToastrService) { }
  success() {
    this.toastr.success('You have Got It Successfully!');
  }
  setArrayInputs(arrayInputs) {
    const arrayFG = arrayInputs.map(address => this.fb.group(address));
    const formArray = this.fb.array(arrayFG);
    this.formName.setControl('controllerArray', formArray);
  }


  ngOnInit() {this.setArrayInputs(this.arrayInputs)}
  addInput() {(this.formName.get('controllerArray') as FormArray).push(this.fb.group({controlerInputName1:''})) }

  removeInput(index) { this.formName.controls.controllerArray["controls"].splice(index,1) }
}


