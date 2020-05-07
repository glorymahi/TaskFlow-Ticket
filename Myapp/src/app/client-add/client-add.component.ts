// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-client-add',
//   templateUrl: './client-add.component.html',
//   styleUrls: ['./client-add.component.css']
// })
// export class ClientAddComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { ToastrService } from 'ngx-toastr';
import { clientServiceService } from './client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})
export class ClientAddComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  hide=true;
  Group: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan']
  City:  any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan']
  State: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan']
  

  constructor(private formBuilder: FormBuilder,private toastr: ToastrService,private clientService:clientServiceService) { }
  success() {
    this.toastr.success('You have Got It Successfully!');
  }



  

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Address: ['', Validators.required],
      Group: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      MobileNumber:['', Validators.required],
      Email: ['', Validators.required],
      City: ['', Validators.required],
      State: ['', Validators.required],
      Pincode: ['', Validators.required]


      
  });

  }

  changeGroup(e) {
    console.log(e.value)
    this.Group.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeCity(e) {
    console.log(e.value)
    this.City.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeState(e) {
    console.log(e.value)
    this.State.setValue(e.target.value, {
      onlySelf: true
    })
  }

  get group() {
    return this.registerForm.get('Group');
  }


  get city() {
    return this.registerForm.get('City');
  }

  get state() {
    return this.registerForm.get('State');
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;
      this.toastr.success(this.registerForm.controls['Name'].value+" "+ this.registerForm.controls['Email'].value + ' successfully added!'); 
      const parameter={
         "address": {
          "city": this.registerForm.value.City,
          "pincode": this.registerForm.value.Pincode,
          "state": this.registerForm.value.State,
        },
        "clientName": this.registerForm.value.Name,
        
        "email": this.registerForm.value.Email,
        "firstName": this.registerForm.value.FirstName,
        "groupName": this.registerForm.value.Group,
        "lastName": this.registerForm.value.LastName,
        "mobile": this.registerForm.value.MobileNumber,
      }
      this.clientService.createclient(parameter).subscribe(  );
       
        alert("Successfully " +this.registerForm.value.Name +"is added!!!");
    
      // stop here if form is invalid
      // if (this.registerForm.invalid) {
      //     return;
      // }
      this.ResetForm();
console.log(this.registerForm.value);

   // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }
  ResetForm() {
    this.registerForm.reset();
  }
}

