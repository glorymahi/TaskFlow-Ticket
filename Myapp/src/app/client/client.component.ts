import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { clientServiceService } from '../client-add/client.service';
import { ExcelServicesService } from '../services/excel-services.service';



@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clients: any;
  p: number = 1;
  recordCount: any;
  searchText: any;
 
  constructor(private excelService:ExcelServicesService,private router: Router,private clientService:clientServiceService) 
  {  
     
  }  
  
  ngOnInit() {
    this.viewAllClents();
  }
  exportAsXLSX():void {  
    this.excelService.exportAsExcelFile(this.clients, 'Client-List');  
 } 
  viewAllClents(){
    this.clientService.getClientsList().subscribe(
      data => {
        console.log(data);
       this.clients=data;
       console.log(this.clients);
     this.recordCount=data.length;
      },
      error => console.log(error),
    );
      
      }
      ondeleteClick(clientid){
        console.log(clientid);
        this.clientService.deleteclient(clientid).subscribe();
        alert("Successfully deleted " +clientid);
        this.viewAllClents();
    
      }
  add()
  {
    this.router.navigateByUrl('/ClientAdd');
  }

}
