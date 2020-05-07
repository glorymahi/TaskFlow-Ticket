// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-employee',
//   templateUrl: './employee.component.html',
//   styleUrls: ['./employee.component.css']
// })
// export class EmployeeComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }



import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { ToastrService } from 'ngx-toastr';
import { EmployeeServiceService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  
  registerForm: FormGroup;
  submitted = false;
  hide=true;
  Designation: any = ['Software developer','Testing','Debugging']
  Client: any = ['TVM','ASMINDS','HCL','L&T']
  Site: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan']
  UserRole: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan']
  Block: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan']
  Floor: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan']
  Zone: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan']
  id: any;
  constructor(private Actroute: ActivatedRoute,private router: Router,private empService:EmployeeServiceService,private formBuilder: FormBuilder,private toastr: ToastrService) { }
  success() {
    this.toastr.success('You have Got It Successfully!');
  }


  ngOnInit() {
    this.id = this.Actroute.snapshot.params['id'];
  this.empService.getEmployee(this.id)
  .subscribe(data => {
    this.registerForm.patchValue({
      Block:data.block,
      Client:data.client,
      Designation: data.designation,
      Email: data.email,
      EmployeeID : data.empid,
      FirstName: data.firstName,
      Floor: data.floor,
      LastName: data.lastName,
      MobileNumber: data.mobile,
      Site: data.site,
      UserRole: data.userRole,
      Zone: data.zone,
    }) ;
    console.log(data); // Using SetValue() method, It's a ReactiveForm's API to store intial value of reactive form 
  });
    this.registerForm = this.formBuilder.group({
      EmployeeID: ['', Validators.required],
      Designation: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      MobileNumber: ['', Validators.required],
      Email: ['', Validators.required],
      Client: ['', Validators.required],
      Site: ['', Validators.required],
      UserRole: ['', Validators.required],
      Block: ['', Validators.required],
      Floor: ['', Validators.required],
      Zone: ['', Validators.required],


      
  });

  }
  addEmployee(param){
    console.log(param);
    const parameter={
      "block": this.registerForm.value.Block,
      "client": this.registerForm.value.Client,
      "designation": this.registerForm.value.Designation,
      "email": this.registerForm.value.Email,
      "empid": this.registerForm.value.EmployeeID,
      "firstName": this.registerForm.value.FirstName,
      "floor": this.registerForm.value.Floor,
      "lastName": this.registerForm.value.LastName,
      "mobile": this.registerForm.value.MobileNumber,
      "site": this.registerForm.value.Site,
      "userRole": this.registerForm.value.UserRole,
      "zone": this.registerForm.value.Zone,
    }
    this.empService.createEmployee(parameter).subscribe(
      data => {
        this.toastr.success('You have Created an Employee Successfully!');
      },
      error => console.log(error),
    );
      
  }
  changeDesignation(e) {
    console.log(e.value)
    this.Designation.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeClient(e) {
    console.log(e.value)
    this.Client.setValue(e.target.value, {
      onlySelf: true
    })
  }


  changeSite(e) {
    console.log(e.value)
    this.Site.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeUserRole(e) {
    console.log(e.value)
    this.UserRole.setValue(e.target.value, {
      onlySelf: true
    })
  }
 geBlock(e) {
    console.log(e.value)
    this.Block.setValue(e.target.value, {
      onlySelf: true
    })
  }


  changeFloor(e) {
    console.log(e.value)
    this.Floor.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeZone(e) {
    console.log(e.value)
    this.Zone.setValue(e.target.value, {
      onlySelf: true
    })
  }

  get designation() {
    return this.registerForm.get('Designation');
  }

  get client() {
    return this.registerForm.get('Client');
  }

  get site() {
    return this.registerForm.get('Site');
  }

  get userRole() {
    return this.registerForm.get('UserRole');
  }

  
  get block() {
    return this.registerForm.get('Block');
  }

  get floor() {
    return this.registerForm.get('Floor');
  }

  get zone() {
    return this.registerForm.get('Zone');
  }


  get f() { return this.registerForm.controls; }


  onSubmit() {
    this.submitted = true;
    this.toastr.success(this.registerForm.controls['EmployeeID'].value+" "+ this.registerForm.controls['Zone'].value + ' successfully added!'); 

    this.ResetForm();
    console.log(this.registerForm.value);
    
   alert('Successfully Employee Added!!!');
   this.router.navigateByUrl('/Employee');
  }
  ResetForm() {
    this.submitted=false;
    this.registerForm.reset();
  }
  
}