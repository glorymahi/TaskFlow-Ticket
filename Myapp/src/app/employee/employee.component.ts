import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeServiceService } from '../employee-add/employee.service';
import * as XLSX from 'xlsx';
import { ExcelServicesService } from '../services/excel-services.service';
type AOA = any[][];
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  recordCount: any;
  p: number = 1;
  searchText: any;
  data: AOA = [];
  mode;
  src: any;
  constructor(private excelService:ExcelServicesService,private router: Router, private empService: EmployeeServiceService) { }

  employees: any;
  ngOnInit() {
    this.viewAllEmployees();
    // this.empService.download(5).subscribe(
    //   datas=>{
    //   this.src=datas;
    //   }
    
    // );
  }
  onEditClick(empid){
    this.router.navigate(['employeeEdit', empid]);
    this.mode="edit";
  }
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'EmployeeList');
    XLSX.writeFile(wb, 'Employee.xlsx');
  }
  exportAsXLSX():void {  
    this.excelService.exportAsExcelFile(this.employees, 'Employees-List');  
 } 
 

 onFileChange(evt: any) {
  /* wire up file reader */
  const target: DataTransfer = <DataTransfer>(evt.target);
  if (target.files.length !== 1) throw new Error('Cannot use multiple files');
  const reader: FileReader = new FileReader();
  reader.onload = (e: any) => {
    /* read workbook */
    const bstr: string = e.target.result;
    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

    /* grab first sheet */
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    /* save data */
    this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
    console.log(this.data);
  };
  reader.readAsBinaryString(target.files[0]);
}


  viewAllEmployees() {
    this.empService.getEmployeesList().subscribe(
      data => {
        console.log("Employee data " + data);
        this.employees = data.list;
        console.log(this.employees);
        this.recordCount = data.recordCount;
      },
      error => console.log(error),
    );

  }
  add() {
    this.router.navigateByUrl('/employeeAdd');
  }
  ondeleteClick(empid) {
    this.empService.deleteEmployee(empid).subscribe();
    alert("Successfully deleted " + empid);
    this.viewAllEmployees();

  }
}
