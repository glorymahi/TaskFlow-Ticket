import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {

  siteform: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private toastr: ToastrService) { 
    

  }
  success() {
    this.toastr.success('You have Got It Successfully!');
  }
  
  
    ngOnInit() 
    {
      this.siteform = this.formBuilder.group({
        client: ['', Validators.required],
        region: ['', Validators.required],
        branch: ['', Validators.required],

        sitename: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', [Validators.required]],
        pincode: ['', [Validators.required]],
        
    
    });
}
          

  // convenience getter for easy access to form fields
  get f() { return this.siteform.controls; }

  onSubmit() {
      this.submitted = true;
      this.toastr.success(this.siteform.controls['client'].value + 'successfully added!'); 
    
      // stop here if form is invalid
      // if (this.siteform.invalid) {
      //     return;
      // }
console.log(this.siteform.value);
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.siteform.value))
  }
}

