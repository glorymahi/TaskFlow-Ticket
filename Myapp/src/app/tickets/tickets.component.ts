import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ticketsServiceService } from './ticket-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  ticketform: FormGroup;
  submitted = false;

  constructor(private router: Router,private formBuilder: FormBuilder,private toastr: ToastrService,
    private ticketService:ticketsServiceService) { 
    

  }
  success() {
    this.toastr.success('You have Got It Successfully!');
  }
  
  
    ngOnInit() 
    {
      this.ticketform = this.formBuilder.group({
        ticketid: ['', Validators.required],
        empid: ['', Validators.required],
        severity: ['', Validators.required],
        assignee:['', Validators.required],
        description:['', Validators.required],
        reporty: ['', Validators.required],
        
        
    
    });
}
          

  // convenience getter for easy access to form fields
  get f() { return this.ticketform.controls; }

  onSubmit() {
      this.submitted = true;
    
      const parameter={
        "assignee":this.ticketform.value.assignee,
        "description": this.ticketform.value.description,
        "employee": this.ticketform.value.empid,
        "reportee":this.ticketform.value.reporty,
        "severity":this.ticketform.value.severity,
        "ticketId":this.ticketform.value.ticketid,
      }
      this.ticketService.createtickets(parameter).subscribe(
        data => {
         console.log(data);
        },
        error => console.log(error),
      );
      this.toastr.success('message','You have raised a Ticket Successfully!');
      this.toastr.success(this.ticketform.controls['ticketid'].value + ' successfully added!'); 
      alert('SUCCESS!! You have raised a Ticket Successfully ');
      // stop here if form is invalid
      // if (this.ticketform.invalid) {
      //     return;
      // }
      this.ticketform.reset();
console.log(this.ticketform.value);
this.router.navigateByUrl('/Tickets');
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.ticketform.value))
  }
}

