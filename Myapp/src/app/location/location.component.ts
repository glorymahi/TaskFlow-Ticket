import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  locationform: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private toastr: ToastrService) { 
  }
  success() {
    this.toastr.success('You have Got It Successfully!');
  }

  ngOnInit() 
    {
      this.locationform = this.formBuilder.group({
        client: ['', Validators.required],
        site: ['', Validators.required],
        zone : ['', Validators.required],
        branch: ['', Validators.required],

        
        block: ['', Validators.required],
        floor: ['', Validators.required],
        
    
    });
}
          

  // convenience getter for easy access to form fields
  get f() { return this.locationform.controls; }

  onSubmit() {
      this.submitted = true;
      this.toastr.success(this.locationform.controls['client'].value + ' successfully added!'); 
    
      // stop here if form is invalid
      // if (this.locationform.invalid) {
      //     return;
      // }
console.log(this.locationform.value);
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.locationform.value))
  }
}

